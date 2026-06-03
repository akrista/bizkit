<?php

declare(strict_types=1);

namespace App\Http\Controllers\Svelte;

use App\Actions\Teams\CreateTeam;
use App\Enums\TeamRole;
use App\Models\Membership;
use App\Models\Team;
use App\Models\TeamInvitation;
use App\Models\User;
use App\Rules\TeamName;
use App\Rules\UniqueTeamInvitation;
use Carbon\CarbonInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

final class TeamController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        assert($user instanceof User);

        $teams = $user->toUserTeams(includeCurrent: true)->map(fn ($userTeam): array => [
            'id' => $userTeam->id,
            'name' => $userTeam->name,
            'slug' => $userTeam->slug,
            'isPersonal' => $userTeam->isPersonal,
            'role' => $userTeam->role,
            'roleLabel' => $userTeam->roleLabel,
            'isCurrent' => $userTeam->isCurrent,
        ]);

        return Inertia::render('teams/index', [
            'teams' => $teams,
        ]);
    }

    public function store(Request $request, CreateTeam $createTeam): RedirectResponse
    {
        $user = $request->user();
        assert($user instanceof User);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', new TeamName],
        ]);
        /** @var array<string, mixed> $validated */
        $teamName = $validated['name'] ?? '';
        assert(is_string($teamName));

        $team = $createTeam->handle($user, $teamName);

        return to_route('svelte.teams.edit', ['team' => $team->slug])
            ->with('success', __('Team created.'));
    }

    public function edit(Request $request, Team $team): Response
    {
        Gate::authorize('view', $team);

        $user = $request->user();
        assert($user instanceof User);
        $permissions = $user->toTeamPermissions($team);

        $members = $team->members()->get()->map(function ($member): array {
            $pivot = $member->getAttribute('pivot');
            assert($pivot instanceof Membership);

            return [
                'id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
                'role' => $pivot->role->value,
                'roleLabel' => $pivot->role->label(),
            ];
        })->values()->all();

        $invitations = $team->invitations()
            ->whereNull('accepted_at')
            ->get()
            ->map(fn ($invitation): array => [
                'code' => $invitation->code,
                'email' => $invitation->email,
                'role' => $invitation->role->value,
                'roleLabel' => $invitation->role->label(),
                'createdAt' => ($invitation->created_at instanceof CarbonInterface) ? $invitation->created_at->toISOString() : '',
            ])
            ->values()
            ->all();

        return Inertia::render('teams/edit', [
            'team' => [
                'id' => $team->id,
                'name' => $team->name,
                'slug' => $team->slug,
                'isPersonal' => $team->is_personal,
            ],
            'members' => $members,
            'invitations' => $invitations,
            'availableRoles' => TeamRole::assignable(),
            'permissions' => [
                'canUpdateTeam' => $permissions->canUpdateTeam,
                'canDeleteTeam' => $permissions->canDeleteTeam,
                'canAddMember' => $permissions->canAddMember,
                'canUpdateMember' => $permissions->canUpdateMember,
                'canRemoveMember' => $permissions->canRemoveMember,
                'canCreateInvitation' => $permissions->canCreateInvitation,
                'canCancelInvitation' => $permissions->canCancelInvitation,
            ],
            'isCurrentTeam' => $user->isCurrentTeam($team),
        ]);
    }

    public function update(Request $request, Team $team): RedirectResponse
    {
        Gate::authorize('update', $team);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', new TeamName],
        ]);
        /** @var array<string, mixed> $validated */
        $team = DB::transaction(function () use ($team, $validated) {
            $team = Team::query()->whereKey($team->id)->lockForUpdate()->firstOrFail();
            $team->update(['name' => $validated['name']]);

            return $team;
        });

        return to_route('svelte.teams.edit', ['team' => $team->fresh()?->slug])
            ->with('success', __('Team updated.'));
    }

    public function destroy(Request $request, Team $team): RedirectResponse
    {
        Gate::authorize('delete', $team);

        $user = $request->user();
        assert($user instanceof User);

        DB::transaction(function () use ($team, $user): void {
            $team->memberships()->delete();
            $team->invitations()->delete();
            $team->delete();

            if ($user->current_team_id === $team->id) {
                $fallback = $user->fallbackTeam($team);
                if ($fallback instanceof Team) {
                    $user->switchTeam($fallback);
                }
            }
        });

        return to_route('svelte.teams.index')
            ->with('success', __('Team deleted.'));
    }

    public function updateMember(Request $request, Team $team, int $userId): RedirectResponse
    {
        Gate::authorize('updateMember', $team);

        $validated = $request->validate([
            'role' => ['required', 'string', Rule::enum(TeamRole::class)],
        ]);
        /** @var array<string, mixed> $validated */
        $role = $validated['role'] ?? '';
        assert(is_string($role));

        $team->memberships()
            ->where('user_id', $userId)
            ->firstOrFail()
            ->update(['role' => TeamRole::from($role)]);

        return back()->with('success', __('Member role updated.'));
    }

    public function removeMember(Request $request, Team $team, int $userId): RedirectResponse
    {
        Gate::authorize('removeMember', $team);

        $membership = $team->memberships()->where('user_id', $userId)->firstOrFail();
        $membership->delete();

        return back()->with('success', __('Member removed.'));
    }

    public function invite(Request $request, Team $team): RedirectResponse
    {
        Gate::authorize('inviteMember', $team);

        $user = $request->user();
        assert($user instanceof User);

        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255', new UniqueTeamInvitation($team)],
            'role' => ['required', 'string', Rule::enum(TeamRole::class)],
        ]);
        /** @var array<string, mixed> $validated */
        $email = $validated['email'] ?? '';
        $role = $validated['role'] ?? '';
        assert(is_string($email));
        assert(is_string($role));

        $team->invitations()->create([
            'email' => $email,
            'role' => TeamRole::from($role),
            'invited_by' => $user->id,
            'expires_at' => now()->addDays(7),
        ]);

        return back()->with('success', __('Invitation sent.'));
    }

    public function cancelInvitation(Request $request, Team $team, string $code): RedirectResponse
    {
        Gate::authorize('cancelInvitation', $team);

        $invitation = $team->invitations()
            ->where('code', $code)
            ->whereNull('accepted_at')
            ->firstOrFail();

        $invitation->delete();

        return back()->with('success', __('Invitation cancelled.'));
    }

    public function acceptInvitation(Request $request, TeamInvitation $invitation): RedirectResponse
    {
        $user = $request->user();
        assert($user instanceof User);

        $this->validateInvitation($user, $invitation);

        DB::transaction(function () use ($user, $invitation): void {
            $team = $invitation->team;
            assert($team instanceof Team);

            $team->memberships()->firstOrCreate(
                ['user_id' => $user->id],
                ['role' => $invitation->role],
            );

            $invitation->update(['accepted_at' => now()]);

            $user->switchTeam($team);
        });

        return to_route('svelte.dashboard')
            ->with('success', __('You have joined the team.'));
    }

    public function switch(Request $request, Team $team): RedirectResponse
    {
        $user = $request->user();
        assert($user instanceof User);

        abort_unless($user->belongsToTeam($team), 403);
        $user->switchTeam($team);

        return back();
    }

    /**
     * @throws ValidationException
     */
    private function validateInvitation(User $user, TeamInvitation $invitation): void
    {
        if ($invitation->isAccepted()) {
            throw ValidationException::withMessages([
                'invitation' => [__('This invitation has already been accepted.')],
            ]);
        }

        if ($invitation->isExpired()) {
            throw ValidationException::withMessages([
                'invitation' => [__('This invitation has expired.')],
            ]);
        }

        if (mb_strtolower($invitation->email) !== mb_strtolower($user->email)) {
            throw ValidationException::withMessages([
                'invitation' => [__('This invitation was sent to a different email address.')],
            ]);
        }
    }
}

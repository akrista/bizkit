<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\Team;
use App\Models\User;
use App\Support\UserTeam;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Middleware;

final class HandleInertiaRequests extends Middleware
{
    public function rootView(Request $request): string
    {
        if ($request->is('react') || $request->is('react/*')) {
            return 'react-app';
        }

        if ($request->is('vue') || $request->is('vue/*')) {
            return 'vue-app';
        }

        return 'svelte-app';
    }

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $this->resolveUser($request),
            ],
            'sidebarOpen' => false,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'current_team' => fn (): ?array => $this->resolveCurrentTeam($request),
            'teams' => fn (): Collection => $this->resolveTeams($request),
            'membership' => fn (): ?array => $this->resolveMembership($request),
        ];
    }

    /**
     * @return array<string, mixed>|null
     */
    private function resolveUser(Request $request): ?array
    {
        $user = $request->user();

        if (! $user instanceof User) {
            return null;
        }

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'initials' => $user->initials(),
            'email_verified_at' => ($user->email_verified_at instanceof CarbonInterface) ? $user->email_verified_at->toISOString() : null,
            'two_factor_enabled' => $user->hasEnabledTwoFactorAuthentication(),
            'current_team_id' => $user->current_team_id,
        ];
    }

    /**
     * @return array<string, mixed>|null
     */
    private function resolveCurrentTeam(Request $request): ?array
    {
        $user = $request->user();

        if (! $user instanceof User) {
            return null;
        }

        $team = $user->currentTeam;

        if (! $team instanceof Team) {
            return null;
        }

        return $this->formatTeam($user, $team);
    }

    /**
     * @return Collection<int, array<string, mixed>>
     */
    private function resolveTeams(Request $request): Collection
    {
        $user = $request->user();

        if (! $user instanceof User) {
            /** @var Collection<int, array<string, mixed>> $emptyCollection */
            $emptyCollection = collect();

            return $emptyCollection;
        }

        /** @var Collection<int, array<string, mixed>> $resolvedTeams */
        $resolvedTeams = $user->toUserTeams(includeCurrent: true)->map(fn (UserTeam $userTeam): array => [
            'id' => $userTeam->id,
            'name' => $userTeam->name,
            'slug' => $userTeam->slug,
            'isPersonal' => $userTeam->isPersonal,
            'role' => $userTeam->role,
            'roleLabel' => $userTeam->roleLabel,
            'isCurrent' => $userTeam->isCurrent,
        ]);

        return $resolvedTeams;
    }

    /**
     * @return array<string, mixed>|null
     */
    private function resolveMembership(Request $request): ?array
    {
        $user = $request->user();

        if (! $user instanceof User) {
            return null;
        }

        $team = $user->currentTeam;

        if (! $team instanceof Team) {
            return null;
        }

        $permissions = $user->toTeamPermissions($team);

        return [
            'role' => $user->teamRole($team)?->value,
            'roleLabel' => $user->teamRole($team)?->label(),
            'permissions' => [
                'canUpdateTeam' => $permissions->canUpdateTeam,
                'canDeleteTeam' => $permissions->canDeleteTeam,
                'canAddMember' => $permissions->canAddMember,
                'canUpdateMember' => $permissions->canUpdateMember,
                'canRemoveMember' => $permissions->canRemoveMember,
                'canCreateInvitation' => $permissions->canCreateInvitation,
                'canCancelInvitation' => $permissions->canCancelInvitation,
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function formatTeam(User $user, Team $team): array
    {
        return [
            'id' => $team->id,
            'name' => $team->name,
            'slug' => $team->slug,
            'isPersonal' => $team->is_personal,
            'role' => $user->teamRole($team)?->value,
            'roleLabel' => $user->teamRole($team)?->label(),
        ];
    }
}

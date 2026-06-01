<script lang="ts">
    import { router } from '@inertiajs/svelte';
    import Button from '@/components/ui/Button.svelte';
    import Badge from '@/components/ui/Badge.svelte';
    import Input from '@/components/ui/Input.svelte';
    import Label from '@/components/ui/Label.svelte';
    import Separator from '@/components/ui/Separator.svelte';
    import type { Team, TeamMember, TeamInvitation, TeamPermissions } from '@/types';

    let team = $state<Team | null>(null);
    let teamName = $state('');
    let members = $state<TeamMember[]>([]);
    let invitations = $state<TeamInvitation[]>([]);
    let permissions = $state<TeamPermissions | null>(null);
    let isCurrentTeam = $state(false);
    let availableRoles = $state<Array<{ value: string; label: string }>>([]);

    let inviteEmail = $state('');
    let inviteRole = $state('');
    let processing = $state(false);

    let {
        team: initialTeam,
        members: initialMembers,
        invitations: initialInvitations,
        permissions: initialPermissions,
        isCurrentTeam: initialIsCurrentTeam,
        availableRoles: initialAvailableRoles,
    }: {
        team: Team;
        members: TeamMember[];
        invitations: TeamInvitation[];
        permissions: TeamPermissions;
        isCurrentTeam: boolean;
        availableRoles: Array<{ value: string; label: string }>;
    } = $props();

    $effect(() => {
        team = initialTeam;
        teamName = initialTeam.name;
        members = initialMembers;
        invitations = initialInvitations;
        permissions = initialPermissions;
        isCurrentTeam = initialIsCurrentTeam;
        availableRoles = initialAvailableRoles;
        if (availableRoles.length > 0) {
            inviteRole = availableRoles[0].value;
        }
    });

    function updateTeam(e: Event): void {
        e.preventDefault();
        if (!team) return;
        processing = true;
        router.put(`/svelte/settings/teams/${team.slug}`, { name: teamName }, {
            preserveScroll: true,
            onFinish: () => { processing = false; },
        });
    }

    function deleteTeam(): void {
        if (!team) return;
        if (!confirm('Are you sure you want to delete this team? This action cannot be undone.')) return;
        router.delete(`/svelte/settings/teams/${team.slug}`);
    }

    function updateMemberRole(member: TeamMember, role: string): void {
        if (!team) return;
        router.put(`/svelte/settings/teams/${team.slug}/members/${member.id}`, { role });
    }

    function removeMember(member: TeamMember): void {
        if (!team) return;
        if (!confirm(`Remove ${member.name} from the team?`)) return;
        router.delete(`/svelte/settings/teams/${team.slug}/members/${member.id}`);
    }

    function sendInvitation(e: Event): void {
        e.preventDefault();
        if (!team) return;
        processing = true;
        router.post(`/svelte/settings/teams/${team.slug}/invitations`, {
            email: inviteEmail,
            role: inviteRole,
        }, {
            preserveScroll: true,
            onFinish: () => {
                processing = false;
                inviteEmail = '';
            },
        });
    }

    function cancelInvitation(code: string): void {
        if (!team) return;
        router.delete(`/svelte/settings/teams/${team.slug}/invitations/${code}`);
    }
</script>
{#if team}
<div class="space-y-8">
    <div class="space-y-0.5">
        <h2 class="text-xl font-semibold tracking-tight text-foreground">{team.name}</h2>
        <p class="text-sm text-muted-foreground">Manage team settings and members</p>
    </div>

    {#if permissions?.canUpdateTeam}
    <div>
        <Separator class="my-6" />
        <div class="space-y-0.5">
            <h3 class="text-lg font-medium text-foreground">Team Name</h3>
            <p class="text-sm text-muted-foreground">The team's name and slug</p>
        </div>

        <Separator class="my-6" />

        <form onsubmit={updateTeam} class="flex gap-2">
            <div class="flex-1 space-y-2">
                <Label for="team-name">Name</Label>
                <Input id="team-name" type="text" bind:value={teamName} required />
            </div>
            <div class="flex items-end">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </form>
    </div>
    {/if}

    {#if permissions?.canAddMember}
    <div>
        <Separator class="my-6" />
        <div class="space-y-0.5">
            <h3 class="text-lg font-medium text-foreground">Invite Member</h3>
            <p class="text-sm text-muted-foreground">Add a new member to the team</p>
        </div>

        <Separator class="my-6" />

        <form onsubmit={sendInvitation} class="flex gap-2">
            <div class="flex-1 space-y-2">
                <Label for="invite-email">Email</Label>
                <Input id="invite-email" type="email" bind:value={inviteEmail} placeholder="user@example.com" required />
            </div>
            <div class="space-y-2">
                <Label for="invite-role">Role</Label>
                <select id="invite-role" bind:value={inviteRole} class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    {#each availableRoles as role}
                        <option value={role.value}>{role.label}</option>
                    {/each}
                </select>
            </div>
            <div class="flex items-end">
                <Button type="submit" disabled={processing || !inviteEmail}>
                    {processing ? 'Sending...' : 'Invite'}
                </Button>
            </div>
        </form>
    </div>
    {/if}

    <div>
        <Separator class="my-6" />
        <div class="space-y-0.5">
            <h3 class="text-lg font-medium text-foreground">Team Members ({members.length})</h3>
        </div>

        <Separator class="my-6" />

        <div class="space-y-2">
            {#each members as member (member.id)}
                <div class="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                        <p class="font-medium text-foreground">{member.name}</p>
                        <p class="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <Badge variant="outline">{member.roleLabel}</Badge>
                        {#if permissions?.canUpdateMember}
                            <select
                                class="flex h-8 rounded-md border border-input bg-background px-2 text-sm"
                                value={member.role}
                                onchange={(e) => updateMemberRole(member, e.currentTarget.value)}
                            >
                                {#each availableRoles as role}
                                    <option value={role.value}>{role.label}</option>
                                {/each}
                            </select>
                        {/if}
                        {#if permissions?.canRemoveMember}
                            <Button variant="ghost" size="sm" class="text-destructive" onclick={() => removeMember(member)}>
                                Remove
                            </Button>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>

    {#if invitations.length > 0}
    <div>
        <Separator class="my-6" />
        <div class="space-y-0.5">
            <h3 class="text-lg font-medium text-foreground">Pending Invitations ({invitations.length})</h3>
        </div>

        <Separator class="my-6" />

        <div class="space-y-2">
            {#each invitations as invitation (invitation.code)}
                <div class="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                        <p class="font-medium text-foreground">{invitation.email}</p>
                        <p class="text-sm text-muted-foreground">Role: {invitation.roleLabel}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <Badge variant="secondary">Pending</Badge>
                        {#if permissions?.canCancelInvitation}
                            <Button variant="ghost" size="sm" onclick={() => cancelInvitation(invitation.code)}>
                                Cancel
                            </Button>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
    {/if}

    {#if permissions?.canDeleteTeam && !team.isPersonal}
    <div>
        <Separator class="my-6" />
        <div class="space-y-0.5">
            <h3 class="text-lg font-medium text-destructive">Delete Team</h3>
            <p class="text-sm text-muted-foreground">Permanently delete this team and all its data</p>
        </div>

        <Separator class="my-6" />

        <Button variant="destructive" onclick={deleteTeam}>
            Delete Team
        </Button>
    </div>
    {/if}
</div>
{/if}

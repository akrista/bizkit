<script lang="ts">
    import { router } from '@inertiajs/svelte';
    import Button from '@/components/ui/Button.svelte';
    import Badge from '@/components/ui/Badge.svelte';
    import Input from '@/components/ui/Input.svelte';
    import Label from '@/components/ui/Label.svelte';
    import Separator from '@/components/ui/Separator.svelte';
    import type { Team } from '@/types';

    let teams = $state<Team[]>([]);
    let newTeamName = $state('');
    let creating = $state(false);

    let { teams: initialTeams }: { teams: Team[] } = $props();

    $effect(() => {
        teams = initialTeams;
    });

    function createTeam(e: Event): void {
        e.preventDefault();
        creating = true;
        router.post('/svelte/settings/teams', { name: newTeamName }, {
            onFinish: () => {
                creating = false;
                newTeamName = '';
            },
        });
    }
</script>
<div>
    <div class="space-y-0.5">
        <h2 class="text-xl font-semibold tracking-tight text-foreground">Teams</h2>
        <p class="text-sm text-muted-foreground">Manage your team memberships</p>
    </div>

    <Separator class="my-6" />

    <div class="space-y-6">
        <div class="space-y-4">
            <h3 class="text-lg font-medium text-foreground">Your Teams</h3>

            {#if teams.length === 0}
                <p class="text-sm text-muted-foreground">You don't belong to any teams yet.</p>
            {:else}
                <div class="space-y-2">
                    {#each teams as team (team.id)}
                        <div class="flex items-center justify-between rounded-lg border border-border p-4">
                            <div class="space-y-1">
                                <div class="flex items-center gap-2">
                                    <span class="font-medium text-foreground">{team.name}</span>
                                    {#if team.isPersonal}
                                        <Badge variant="secondary">Personal</Badge>
                                    {/if}
                                    {#if team.isCurrent}
                                        <Badge>Current</Badge>
                                    {/if}
                                </div>
                                <p class="text-sm text-muted-foreground">Role: {team.roleLabel || 'Member'}</p>
                            </div>

                            <div class="flex gap-2">
                                <Button variant="outline" size="sm" onclick={() => router.visit(`/svelte/settings/teams/${team.slug}`)}>
                                    Settings
                                </Button>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>

        <div class="space-y-4">
            <h3 class="text-lg font-medium text-foreground">Create New Team</h3>

            <form onsubmit={createTeam} class="flex gap-2">
                <div class="flex-1 space-y-2">
                    <Label for="team-name">Team Name</Label>
                    <Input id="team-name" type="text" bind:value={newTeamName} placeholder="Acme Corp" required />
                </div>
                <div class="flex items-end">
                    <Button type="submit" disabled={creating || !newTeamName}>
                        {creating ? 'Creating...' : 'Create'}
                    </Button>
                </div>
            </form>
        </div>
    </div>
</div>

<script lang="ts">
    import { page } from '@inertiajs/svelte';
    import type { User, Team } from '@/types';

    const user = $derived(page.props.auth.user as User);
    const currentTeam = $derived(page.props.current_team as Team | null);
</script>
<div class="space-y-6">
    <div>
        <h1 class="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p class="mt-2 text-muted-foreground">Welcome back, {user?.name}!</p>
    </div>

    {#if currentTeam}
        <div class="rounded-lg border border-border bg-card p-6">
            <h2 class="text-xl font-semibold text-foreground">Current Team: {currentTeam.name}</h2>
            <p class="mt-1 text-sm text-muted-foreground">You're viewing the dashboard for {currentTeam.name}</p>
        </div>
    {/if}

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-lg border border-border bg-card p-6">
            <h3 class="text-sm font-medium text-muted-foreground">Profile</h3>
            <p class="mt-2 text-2xl font-bold text-foreground">{user?.name}</p>
            <p class="text-sm text-muted-foreground">{user?.email}</p>
        </div>

        <div class="rounded-lg border border-border bg-card p-6">
            <h3 class="text-sm font-medium text-muted-foreground">Teams</h3>
            <p class="mt-2 text-2xl font-bold text-foreground">{page.props.teams?.length || 0}</p>
            <p class="text-sm text-muted-foreground">Team memberships</p>
        </div>

        <div class="rounded-lg border border-border bg-card p-6">
            <h3 class="text-sm font-medium text-muted-foreground">Status</h3>
            <p class="mt-2 text-2xl font-bold text-foreground">
                {user?.email_verified_at ? 'Verified' : 'Unverified'}
            </p>
            <p class="text-sm text-muted-foreground">Email status</p>
        </div>
    </div>
</div>

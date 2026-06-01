<script lang="ts">
    import { Link } from '@inertiajs/svelte';
    import type { Snippet } from 'svelte';
    import { currentUrlState, toUrl } from '@/lib/utils';
    import type { NavItem } from '@/types';

    let { children }: { children?: Snippet } = $props();

    const sidebarNavItems: NavItem[] = [
        { title: 'Profile', href: '/svelte/settings/profile' },
        { title: 'Security', href: '/svelte/settings/security' },
        { title: 'Teams', href: '/svelte/settings/teams' },
    ];

    const url = currentUrlState();
</script>

<div class="px-4 py-6">
    <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight text-foreground">Settings</h2>
        <p class="text-muted-foreground">Manage your profile and account settings</p>
    </div>

    <div class="mt-8 flex flex-col lg:flex-row lg:space-x-12">
        <aside class="w-full max-w-xl lg:w-48">
            <nav class="flex flex-col space-y-1" aria-label="Settings">
                {#each sidebarNavItems as item (toUrl(item.href))}
                    <Link
                        href={toUrl(item.href)}
                        class="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors {url.isCurrentOrParentUrl(item.href, url.currentUrl) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
                    >
                        {item.title}
                    </Link>
                {/each}
            </nav>
        </aside>

        <div class="my-6 h-px bg-border lg:hidden"></div>

        <div class="flex-1 md:max-w-2xl">
            <section class="max-w-xl space-y-12">
                {@render children?.()}
            </section>
        </div>
    </div>
</div>

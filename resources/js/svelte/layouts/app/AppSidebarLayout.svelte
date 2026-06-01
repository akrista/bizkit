<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Toaster } from 'svelte-sonner';
    import type { BreadcrumbItem } from '@/types';

    let {
        breadcrumbs = [],
        children,
    }: {
        breadcrumbs?: BreadcrumbItem[];
        children?: Snippet;
    } = $props();
</script>

<div class="min-h-screen bg-background">
    <header class="border-b border-border bg-card">
        <div class="mx-auto flex h-16 max-w-7xl items-center px-4">
            <nav class="flex items-center gap-2 text-sm">
                {#each breadcrumbs as item}
                    {#if item.href}
                        <a href={item.href} class="text-muted-foreground hover:text-foreground transition-colors">
                            {item.title}
                        </a>
                        <span class="text-muted-foreground">/</span>
                    {:else}
                        <span class="font-medium text-foreground">{item.title}</span>
                    {/if}
                {/each}
            </nav>
        </div>
    </header>

    <main class="mx-auto max-w-7xl px-4 py-6">
        {@render children?.()}
    </main>

    <Toaster />
</div>

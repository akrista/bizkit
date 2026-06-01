<script lang="ts">
    import type { Snippet } from 'svelte';

    let {
        title = '',
        description = '',
        children,
    }: {
        title?: string;
        description?: string;
        children?: Snippet;
    } = $props();
</script>

<div class="flex min-h-screen items-center justify-center bg-background p-4">
    <div class="w-full max-w-md space-y-6">
        {#if title}
            <div class="space-y-2 text-center">
                <h1 class="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
                {#if description}
                    <p class="text-sm text-muted-foreground">{description}</p>
                {/if}
            </div>
        {/if}

        {@render children?.()}
    </div>
</div>

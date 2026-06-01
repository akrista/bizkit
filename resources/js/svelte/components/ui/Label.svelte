<script lang="ts">
    import { cn } from '@/lib/utils';
    import type { Snippet } from 'svelte';

    let {
        class: className,
        children,
        ...restProps
    }: {
        class?: string;
        children: Snippet;
    } = $props();
</script>

<label
    class={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground',
        className,
    )}
    {...restProps}
>
    {@render children()}
</label>

<script lang="ts">
    import { cn } from '@/lib/utils';
    import { type Variant, button } from '@/components/ui/button-variants';
    import type { Snippet } from 'svelte';

    let {
        variant = 'default',
        size = 'default',
        class: className,
        children,
        ...restProps
    }: {
        variant?: Variant;
        size?: 'default' | 'sm' | 'lg' | 'icon';
        class?: string;
        children: Snippet;
    } = $props();
</script>

<button class={cn(button({ variant, size }), className)} {...restProps}>
    {@render children()}
</button>

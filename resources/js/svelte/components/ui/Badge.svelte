<script lang="ts">
    import { cn } from '@/lib/utils';
    import type { Snippet } from 'svelte';

    let {
        variant = 'default',
        class: className,
        children,
    }: {
        variant?: 'default' | 'secondary' | 'destructive' | 'outline';
        class?: string;
        children: Snippet;
    } = $props();

    const variants: Record<string, string> = {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-input bg-background text-foreground',
    };
</script>

<span
    class={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className,
    )}
>
    {@render children()}
</span>

<script lang="ts">
    import { cn } from '@/lib/utils';

    let {
        class: className,
        ...restProps
    }: {
        class?: string;
    } = $props();
</script>

<div class={cn('h-px w-full bg-border', className)} {...restProps}></div>

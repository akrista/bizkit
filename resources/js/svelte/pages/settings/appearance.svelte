<script lang="ts">
    import Separator from '@/components/ui/Separator.svelte';

    type Theme = 'light' | 'dark' | 'system';
    let selectedTheme = $state<Theme>('system');

    $effect(() => {
        const stored = localStorage.getItem('theme') as Theme | null;
        if (stored) {
            selectedTheme = stored;
        }
    });

    function setTheme(theme: Theme): void {
        selectedTheme = theme;
        localStorage.setItem('theme', theme);

        const html = document.documentElement;
        if (theme === 'dark') {
            html.classList.add('dark');
        } else if (theme === 'light') {
            html.classList.remove('dark');
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
        }
    }
</script>
<div>
    <div class="space-y-0.5">
        <h2 class="text-xl font-semibold tracking-tight text-foreground">Appearance</h2>
        <p class="text-sm text-muted-foreground">Customize the look and feel</p>
    </div>

    <Separator class="my-6" />

    <div class="space-y-6">
        <div class="space-y-2">
            <h3 class="text-lg font-medium text-foreground">Theme</h3>
            <p class="text-sm text-muted-foreground">Select the preferred theme for the application</p>
        </div>

        <div class="grid grid-cols-3 gap-4">
            {#each [
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'System' },
            ] as option (option.value)}
                <button
                    type="button"
                    class="rounded-lg border-2 p-4 text-center transition-colors {selectedTheme === option.value ? 'border-primary bg-accent-shadcn' : 'border-border hover:border-muted'}"
                    onclick={() => setTheme(option.value as Theme)}
                >
                    <span class="block text-sm font-medium text-foreground">{option.label}</span>
                </button>
            {/each}
        </div>
    </div>
</div>

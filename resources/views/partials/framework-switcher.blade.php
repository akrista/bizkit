{{-- Framework Switcher Widget --}}
<div x-data="frameworkSwitcher()" x-cloak class="fixed bottom-4 right-4 z-[9999]">
    {{-- Toggle Button --}}
    <button
        @click="open = !open"
        class="flex items-center justify-center w-10 h-10 rounded-full shadow-lg backdrop-blur-md bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 transition-all duration-200"
        title="Switch Framework"
    >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
    </button>

    {{-- Switcher Panel --}}
    <div
        x-show="open"
        x-transition:enter="transition ease-out duration-200"
        x-transition:enter-start="opacity-0 translate-y-2 scale-95"
        x-transition:enter-end="opacity-100 translate-y-0 scale-100"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="opacity-100 translate-y-0 scale-100"
        x-transition:leave-end="opacity-0 translate-y-2 scale-95"
        @click.outside="open = false"
        class="absolute bottom-14 right-0 w-48 rounded-xl shadow-xl backdrop-blur-lg bg-white/90 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 overflow-hidden"
    >
        <div class="px-3 py-2 border-b border-zinc-200 dark:border-zinc-700">
            <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Framework</span>
        </div>
        <div class="py-1">
            <template x-for="fw in frameworks" :key="fw.key">
                <a
                    :href="fw.url"
                    class="flex items-center gap-2.5 px-3 py-2 text-sm transition-colors duration-150"
                    :class="fw.active
                        ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white font-medium'
                        : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/50'"
                >
                    <span
                        class="flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold"
                        :class="fw.badgeClass"
                        x-text="fw.badge"
                    ></span>
                    <span x-text="fw.label"></span>
                    <svg x-show="fw.active" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-auto text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </a>
            </template>
        </div>
    </div>
</div>

<script>
    function frameworkSwitcher() {
        return {
            open: false,
            get frameworks() {
                const path = window.location.pathname;

                // Detect current framework
                let current = 'livewire';
                if (path.startsWith('/react')) current = 'react';
                else if (path.startsWith('/svelte')) current = 'svelte';
                else if (path.startsWith('/vue')) current = 'vue';

                // Extract the page segment (e.g., "dashboard", "settings/profile")
                let page = '';
                if (current === 'react') {
                    page = path.replace(/^\/react\/?/, '');
                } else if (current === 'svelte') {
                    page = path.replace(/^\/svelte\/?/, '');
                } else if (current === 'vue') {
                    page = path.replace(/^\/vue\/?/, '');
                } else {
                    // Livewire: handle /{team}/dashboard and /settings/*
                    if (path.match(/^\/settings\//)) {
                        page = path.replace(/^\//, '');
                    } else if (path.match(/^\/[^\/]+\/dashboard/)) {
                        page = 'dashboard';
                    } else {
                        page = '';
                    }
                }

                // Build target URLs for each framework
                const buildUrl = (fw) => {
                    if (fw === 'livewire') {
                        if (page === 'dashboard') return '/personal/dashboard';
                        if (page.startsWith('settings/')) return '/' + page;
                        return '/';
                    }
                    return '/' + fw + (page ? '/' + page : '');
                };

                return [
                    {
                        key: 'livewire',
                        label: 'Livewire',
                        badge: 'LW',
                        badgeClass: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/50 dark:text-fuchsia-300',
                        active: current === 'livewire',
                        url: buildUrl('livewire'),
                    },
                    {
                        key: 'react',
                        label: 'React',
                        badge: 'Re',
                        badgeClass: 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300',
                        active: current === 'react',
                        url: buildUrl('react'),
                    },
                    {
                        key: 'svelte',
                        label: 'Svelte',
                        badge: 'Sv',
                        badgeClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
                        active: current === 'svelte',
                        url: buildUrl('svelte'),
                    },
                    {
                        key: 'vue',
                        label: 'Vue',
                        badge: 'Vu',
                        badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
                        active: current === 'vue',
                        url: buildUrl('vue'),
                    },
                ];
            },
        };
    }
</script>

<style>
    [x-cloak] { display: none !important; }
</style>

export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    const html = document.documentElement;

    function applyTheme(): void {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark') {
            html.classList.add('dark');
        } else if (stored === 'light') {
            html.classList.remove('dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }

    applyTheme();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
}

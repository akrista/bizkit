import { router } from '@inertiajs/svelte';
import { toast } from 'svelte-sonner';

export function initializeFlashToast(): void {
    if (typeof window === 'undefined') {
        return;
    }

    router.on('navigate', (event) => {
        const page = event.detail.page;
        const props = page.props as Record<string, unknown>;
        const flash = props.flash as { success?: string | null; error?: string | null } | undefined;

        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    });
}

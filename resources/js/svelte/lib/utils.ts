import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: string | { toString(): string }): string {
    return url.toString();
}

export function currentUrlState(): { currentUrl: string; isCurrentOrParentUrl: (url: string, current: string) => boolean } {
    let currentUrl = '';

    if (typeof window !== 'undefined') {
        currentUrl = window.location.pathname;
    }

    function isCurrentOrParentUrl(url: string, current: string): boolean {
        if (!current) {
            current = currentUrl;
        }
        if (current === url) {
            return true;
        }
        return current.startsWith(url + '/');
    }

    return { currentUrl, isCurrentOrParentUrl };
}

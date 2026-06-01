<script lang="ts">
    import { router } from '@inertiajs/svelte';
    import { page } from '@inertiajs/svelte';
    import Button from '@/components/ui/Button.svelte';
    import Input from '@/components/ui/Input.svelte';
    import Label from '@/components/ui/Label.svelte';
    import Separator from '@/components/ui/Separator.svelte';
    import type { User } from '@/types';

    let name = $state('');
    let email = $state('');
    let processing = $state(false);

    let {
        mustVerifyEmail = false,
        hasUnverifiedEmail = false,
        status,
    }: {
        mustVerifyEmail?: boolean;
        hasUnverifiedEmail?: boolean;
        status?: string | null;
    } = $props();

    const user = $derived(page.props.auth.user as User);

    $effect(() => {
        if (user) {
            name = user.name;
            email = user.email;
        }
    });

    function submit(e: Event): void {
        e.preventDefault();
        processing = true;
        router.put('/svelte/settings/profile', { name, email }, {
            preserveScroll: true,
            onFinish: () => { processing = false; },
        });
    }

    function sendVerification(): void {
        router.post('/svelte/settings/email/verification-notification', {}, {
            preserveScroll: true,
        });
    }
</script>
<div>
    <div class="space-y-0.5">
        <h2 class="text-xl font-semibold tracking-tight text-foreground">Profile</h2>
        <p class="text-sm text-muted-foreground">Update your name and email address</p>
    </div>

    <Separator class="my-6" />

    <form onsubmit={submit} class="space-y-6">
        <div class="space-y-2">
            <Label for="name">Name</Label>
            <Input id="name" type="text" bind:value={name} required autocomplete="name" />
        </div>

        <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" bind:value={email} required autocomplete="email" />
        </div>

        {#if mustVerifyEmail && hasUnverifiedEmail}
            <div class="space-y-2">
                <p class="text-sm text-muted-foreground">
                    Your email address is unverified.
                    <button type="button" class="text-foreground hover:underline" onclick={sendVerification}>
                        Click here to re-send the verification email.
                    </button>
                </p>

                {#if status === 'Verification link sent!'}
                    <p class="text-sm text-green-600 dark:text-green-400">A new verification link has been sent.</p>
                {/if}
            </div>
        {/if}

        <div class="flex items-center gap-4">
            <Button type="submit" disabled={processing}>
                {processing ? 'Saving...' : 'Save'}
            </Button>
        </div>
    </form>
</div>

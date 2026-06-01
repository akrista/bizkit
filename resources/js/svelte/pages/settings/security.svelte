<script lang="ts">
    import { router } from '@inertiajs/svelte';
    import { page } from '@inertiajs/svelte';
    import Button from '@/components/ui/Button.svelte';
    import Input from '@/components/ui/Input.svelte';
    import Label from '@/components/ui/Label.svelte';
    import Separator from '@/components/ui/Separator.svelte';
    import type { User } from '@/types';

    let currentPassword = $state('');
    let password = $state('');
    let passwordConfirmation = $state('');
    let processing = $state(false);

    const user = $derived(page.props.auth.user as User);

    function updatePassword(e: Event): void {
        e.preventDefault();
        processing = true;
        router.put('/svelte/settings/password', {
            current_password: currentPassword,
            password,
            password_confirmation: passwordConfirmation,
        }, {
            preserveScroll: true,
            onFinish: () => {
                processing = false;
                currentPassword = '';
                password = '';
                passwordConfirmation = '';
            },
        });
    }
</script>
<div class="space-y-8">
    <div>
        <div class="space-y-0.5">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">Update Password</h2>
            <p class="text-sm text-muted-foreground">Ensure your account is using a long, random password</p>
        </div>

        <Separator class="my-6" />

        <form onsubmit={updatePassword} class="space-y-6">
            <div class="space-y-2">
                <Label for="current_password">Current Password</Label>
                <Input id="current_password" type="password" bind:value={currentPassword} required autocomplete="current-password" />
            </div>

            <div class="space-y-2">
                <Label for="password">New Password</Label>
                <Input id="password" type="password" bind:value={password} required autocomplete="new-password" />
            </div>

            <div class="space-y-2">
                <Label for="password_confirmation">Confirm Password</Label>
                <Input id="password_confirmation" type="password" bind:value={passwordConfirmation} required autocomplete="new-password" />
            </div>

            <div class="flex items-center gap-4">
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </form>
    </div>

    <div>
        <div class="space-y-0.5">
            <h2 class="text-xl font-semibold tracking-tight text-foreground">Two-Factor Authentication</h2>
            <p class="text-sm text-muted-foreground">Add additional security to your account</p>
        </div>

        <Separator class="my-6" />

        <p class="text-sm text-muted-foreground">
            Two-factor authentication is managed through your account security settings.
            Visit the main settings page to configure 2FA.
        </p>
    </div>
</div>

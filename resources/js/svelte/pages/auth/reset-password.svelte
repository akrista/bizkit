<script lang="ts">
    import { router } from '@inertiajs/svelte';
    import Button from '@/components/ui/Button.svelte';
    import Input from '@/components/ui/Input.svelte';
    import Label from '@/components/ui/Label.svelte';

    let email = $state('');
    let password = $state('');
    let passwordConfirmation = $state('');
    let processing = $state(false);

    let { token }: { token: string } = $props();

    function submit(e: Event): void {
        e.preventDefault();
        processing = true;
        router.post('/reset-password', {
            email,
            password,
            password_confirmation: passwordConfirmation,
            token,
        }, {
            onFinish: () => {
                processing = false;
                password = '';
                passwordConfirmation = '';
            },
        });
    }
</script>
<form onsubmit={submit} class="space-y-4">
    <div class="space-y-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" bind:value={email} required autofocus autocomplete="email" />
    </div>

    <div class="space-y-2">
        <Label for="password">New Password</Label>
        <Input id="password" type="password" bind:value={password} required autocomplete="new-password" />
    </div>

    <div class="space-y-2">
        <Label for="password_confirmation">Confirm Password</Label>
        <Input id="password_confirmation" type="password" bind:value={passwordConfirmation} required autocomplete="new-password" />
    </div>

    <Button type="submit" class="w-full" disabled={processing}>
        {processing ? 'Resetting...' : 'Reset Password'}
    </Button>
</form>

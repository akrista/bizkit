<script lang="ts">
    import { Link, router } from '@inertiajs/svelte';
    import Button from '@/components/ui/Button.svelte';
    import Input from '@/components/ui/Input.svelte';
    import Label from '@/components/ui/Label.svelte';

    let name = $state('');
    let email = $state('');
    let password = $state('');
    let passwordConfirmation = $state('');
    let processing = $state(false);

    function submit(e: Event): void {
        e.preventDefault();
        processing = true;
        router.post('/register', { name, email, password, password_confirmation: passwordConfirmation }, {
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
        <Label for="name">Name</Label>
        <Input id="name" type="text" bind:value={name} required autofocus />
    </div>

    <div class="space-y-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" bind:value={email} required autocomplete="email" />
    </div>

    <div class="space-y-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" bind:value={password} required autocomplete="new-password" />
    </div>

    <div class="space-y-2">
        <Label for="password_confirmation">Confirm Password</Label>
        <Input id="password_confirmation" type="password" bind:value={passwordConfirmation} required autocomplete="new-password" />
    </div>

    <Button type="submit" class="w-full" disabled={processing}>
        {processing ? 'Creating account...' : 'Register'}
    </Button>

    <p class="text-center text-sm text-muted-foreground">
        Already have an account?
        <Link href="/login" class="text-foreground hover:underline">Log in</Link>
    </p>
</form>

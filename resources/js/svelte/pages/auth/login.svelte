<script lang="ts">
    import { Link, router } from '@inertiajs/svelte';
    import Button from '@/components/ui/Button.svelte';
    import Input from '@/components/ui/Input.svelte';
    import Label from '@/components/ui/Label.svelte';

    let email = $state('');
    let password = $state('');
    let remember = $state(false);
    let processing = $state(false);

    function submit(e: Event): void {
        e.preventDefault();
        processing = true;
        router.post('/login', { email, password, remember }, {
            onFinish: () => {
                processing = false;
                password = '';
            },
        });
    }
</script>
<form onsubmit={submit} class="space-y-4">
    <div class="space-y-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" bind:value={email} required autocomplete="email" autofocus />
    </div>

    <div class="space-y-2">
        <div class="flex items-center justify-between">
            <Label for="password">Password</Label>
            <Link href="/forgot-password" class="text-sm text-muted-foreground hover:text-foreground">
                Forgot password?
            </Link>
        </div>
        <Input id="password" type="password" bind:value={password} required autocomplete="current-password" />
    </div>

    <div class="flex items-center gap-2">
        <input type="checkbox" id="remember" bind:checked={remember} class="rounded border-border" />
        <Label for="remember" class="text-sm font-normal">Remember me</Label>
    </div>

    <Button type="submit" class="w-full" disabled={processing}>
        {processing ? 'Logging in...' : 'Log in'}
    </Button>

    <p class="text-center text-sm text-muted-foreground">
        Don't have an account?
        <Link href="/register" class="text-foreground hover:underline">Register</Link>
    </p>
</form>

<script lang="ts">
    import { Link, router } from '@inertiajs/svelte';
    import Button from '@/components/ui/Button.svelte';
    import Input from '@/components/ui/Input.svelte';
    import Label from '@/components/ui/Label.svelte';

    let email = $state('');
    let processing = $state(false);
    let status = $state('');

    function submit(e: Event): void {
        e.preventDefault();
        processing = true;
        router.post('/forgot-password', { email }, {
            onFinish: () => {
                processing = false;
            },
        });
    }
</script>
<form onsubmit={submit} class="space-y-4">
    <div class="space-y-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" bind:value={email} required autofocus autocomplete="email" />
    </div>

    <Button type="submit" class="w-full" disabled={processing}>
        {processing ? 'Sending...' : 'Email password reset link'}
    </Button>

    <p class="text-center text-sm text-muted-foreground">
        <Link href="/login" class="text-foreground hover:underline">Back to login</Link>
    </p>
</form>

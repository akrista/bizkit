<script lang="ts">
    import { router } from '@inertiajs/svelte';
    import Button from '@/components/ui/Button.svelte';
    import Input from '@/components/ui/Input.svelte';
    import Label from '@/components/ui/Label.svelte';

    let password = $state('');
    let processing = $state(false);

    function submit(e: Event): void {
        e.preventDefault();
        processing = true;
        router.post('/user/confirm-password', { password }, {
            onFinish: () => {
                processing = false;
                password = '';
            },
        });
    }
</script>
<form onsubmit={submit} class="space-y-4">
    <div class="space-y-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" bind:value={password} required autofocus autocomplete="current-password" />
    </div>

    <Button type="submit" class="w-full" disabled={processing}>
        {processing ? 'Confirming...' : 'Confirm Password'}
    </Button>
</form>

<script lang="ts">
    import { router } from '@inertiajs/svelte';
    import Button from '@/components/ui/Button.svelte';
    import Input from '@/components/ui/Input.svelte';
    import Label from '@/components/ui/Label.svelte';

    let code = $state('');
    let recovery = $state(false);
    let processing = $state(false);

    function submit(e: Event): void {
        e.preventDefault();
        processing = true;
        if (recovery) {
            router.post('/two-factor-challenge', { recovery_code: code }, {
                onFinish: () => { processing = false; },
            });
        } else {
            router.post('/two-factor-challenge', { code }, {
                onFinish: () => { processing = false; },
            });
        }
    }
</script>
<form onsubmit={submit} class="space-y-4">
    <div class="space-y-2">
        <Label for="code">{recovery ? 'Recovery Code' : 'Authentication Code'}</Label>
        <Input id="code" type="text" bind:value={code} required autofocus />
    </div>

    <button type="button" class="text-sm text-muted-foreground hover:text-foreground" onclick={() => { recovery = !recovery; code = ''; }}>
        {recovery ? 'Use authentication code' : 'Use recovery code'}
    </button>

    <Button type="submit" class="w-full" disabled={processing}>
        {processing ? 'Verifying...' : 'Login'}
    </Button>
</form>

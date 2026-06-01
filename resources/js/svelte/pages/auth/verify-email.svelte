<script lang="ts">
    import { Link, router } from '@inertiajs/svelte';
    import Button from '@/components/ui/Button.svelte';
    import { page } from '@inertiajs/svelte';
    import type { User } from '@/types';

    let processing = $state(false);

    const user = $derived(page.props.auth.user as User);

    function sendVerification(): void {
        processing = true;
        router.post('/svelte/settings/email/verification-notification', {}, {
            onFinish: () => { processing = false; },
        });
    }
</script>
<div class="space-y-4">
    <p class="text-sm text-muted-foreground">
        Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
    </p>

    {#if user?.email_verified_at}
        <div class="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
            Your email address has been verified.
        </div>
    {/if}

    <div class="flex gap-2">
        <Button onclick={sendVerification} disabled={processing}>
            {processing ? 'Sending...' : 'Resend Verification Email'}
        </Button>

        <Link href="/svelte/settings/profile">
            <Button variant="outline">Edit Profile</Button>
        </Link>
    </div>

    <form method="POST" action="/logout">
        <input type="hidden" name="_token" value="" />
        <Button type="submit" variant="ghost" class="text-sm">Log Out</Button>
    </form>
</div>

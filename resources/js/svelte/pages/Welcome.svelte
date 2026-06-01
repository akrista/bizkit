<script lang="ts">
    import { Link } from '@inertiajs/svelte';
    import Button from '@/components/ui/Button.svelte';
</script>
<div class="flex min-h-screen flex-col items-center justify-center bg-background">
    <div class="mx-auto max-w-3xl px-4 text-center">
        <h1 class="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            Bizkit
        </h1>
        <p class="mt-6 text-lg text-muted-foreground">
            A modern business management application built with Laravel, Livewire, and Svelte.
        </p>
        <div class="mt-10 flex justify-center gap-4">
            <Link href="/login">
                <Button size="lg">Log in</Button>
            </Link>
            <Link href="/register">
                <Button variant="outline" size="lg">Register</Button>
            </Link>
            <Link href="/svelte/dashboard">
                <Button variant="secondary" size="lg">Svelte Dashboard</Button>
            </Link>
        </div>
    </div>
</div>

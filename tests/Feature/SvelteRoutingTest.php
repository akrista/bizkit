<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class SvelteRoutingTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_visit_svelte_welcome_page(): void
    {
        $response = $this->get(route('svelte.welcome'));

        $response->assertOk();
        $this->assertEquals('Welcome', $response->inertiaPage()['component']);
    }

    public function test_authenticated_user_can_visit_svelte_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get(route('svelte.dashboard'));

        $response->assertOk();
        $this->assertEquals('Dashboard', $response->inertiaPage()['component']);
    }
}

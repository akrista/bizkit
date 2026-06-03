<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class ReactRoutingTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_visit_react_welcome_page(): void
    {
        $response = $this->get(route('react.welcome'));

        $response->assertOk();
        $this->assertEquals('welcome', $response->inertiaPage()['component']);
    }

    public function test_authenticated_user_can_visit_react_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get(route('react.dashboard'));

        $response->assertOk();
        $this->assertEquals('dashboard', $response->inertiaPage()['component']);
    }
}

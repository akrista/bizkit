<?php

declare(strict_types=1);

use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::view('/', 'welcome')->name('home');

Route::get('{current_team}/dashboard', fn () => view('dashboard'))
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->where('current_team', '(?!react/|svelte/)(?!react$|svelte$)[a-zA-Z0-9\-]+')
    ->name('dashboard');

Route::middleware(['auth'])->group(function (): void {
    Route::livewire('invitations/{invitation}/accept', 'pages::teams.accept-invitation')->name('invitations.accept');
});

require __DIR__.'/settings.php';

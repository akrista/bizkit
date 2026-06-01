<?php

declare(strict_types=1);

use App\Http\Controllers\Svelte\DashboardController;
use App\Http\Controllers\Svelte\ProfileController;
use App\Http\Controllers\Svelte\SecurityController;
use App\Http\Controllers\Svelte\TeamController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::prefix('svelte')->name('svelte.')->group(function (): void {
    Route::get('/', function () {
        return \Inertia\Inertia::render('Welcome');
    })->name('welcome');

    Route::middleware(['auth', 'verified'])->group(function (): void {
        Route::get('dashboard', DashboardController::class)->name('dashboard');

        Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::put('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::post('settings/email/verification-notification', [ProfileController::class, 'sendVerification'])
            ->middleware('throttle:6,1')
            ->name('verification.send');

        Route::get('settings/security', [SecurityController::class, 'edit'])->name('security.edit');
        Route::put('settings/password', [SecurityController::class, 'updatePassword'])->name('password.update');

        if (Features::canManageTwoFactorAuthentication()) {
            Route::post('settings/two-factor/disable', [SecurityController::class, 'disableTwoFactor'])
                ->middleware('password.confirm')
                ->name('two-factor.disable');
        }

        Route::get('settings/teams', [TeamController::class, 'index'])->name('teams.index');
        Route::post('settings/teams', [TeamController::class, 'store'])->name('teams.store');

        Route::middleware(EnsureTeamMembership::class)->group(function (): void {
            Route::get('settings/teams/{team}', [TeamController::class, 'edit'])->name('teams.edit');
            Route::put('settings/teams/{team}', [TeamController::class, 'update'])->name('teams.update');
            Route::delete('settings/teams/{team}', [TeamController::class, 'destroy'])->name('teams.destroy');
            Route::put('settings/teams/{team}/members/{userId}', [TeamController::class, 'updateMember'])->name('teams.members.update');
            Route::delete('settings/teams/{team}/members/{userId}', [TeamController::class, 'removeMember'])->name('teams.members.destroy');
            Route::post('settings/teams/{team}/invitations', [TeamController::class, 'invite'])->name('teams.invitations.store');
            Route::delete('settings/teams/{team}/invitations/{code}', [TeamController::class, 'cancelInvitation'])->name('teams.invitations.destroy');
        });

        Route::get('invitations/{invitation}/accept', [TeamController::class, 'acceptInvitation'])
            ->name('invitations.accept');
    });
});

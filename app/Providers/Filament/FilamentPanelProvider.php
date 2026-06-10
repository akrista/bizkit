<?php

declare(strict_types=1);

namespace App\Providers\Filament;

use App\Enums\FilamentMode;
use Filament\Auth\MultiFactor\App\AppAuthentication;
use Filament\Auth\MultiFactor\Email\EmailAuthentication;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

final class FilamentPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('filament')
            ->path(FilamentMode::fromConfig()->panelPath())
            ->profile(
                // page: EditProfile::class,
                isSimple: false
            )
            ->multiFactorAuthentication([
                AppAuthentication::make()
                    ->brandName(config('app.name'))
                    ->codeWindow(6)
                    ->recoverable()
                    ->regenerableRecoveryCodes(),
                EmailAuthentication::make()
                    ->codeExpiryMinutes(4),
            ], isRequired: false)
            ->login(
            // action: Login::class
            )
            ->loginRouteSlug('login')
            ->registration(
            // action: Register::class
            )
            ->registrationRouteSlug('register')
            ->passwordReset()
            // ->passwordResetRoutePrefix('password-reset')
            // ->passwordResetRequestRouteSlug('request')
            // ->passwordResetRouteSlug('reset')
            ->emailVerification()
            ->emailVerificationRouteSlug('verify')
            ->emailVerificationRoutePrefix('email-verification')
            ->emailVerificationPromptRouteSlug('prompt')
            // ->emailChangeVerification()
            // ->emailChangeVerificationRoutePrefix('email-change-verification')
            // ->emailChangeVerificationRouteSlug('verify')
            ->revealablePasswords(true)
            ->colors([
                'primary' => Color::Amber,
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                AccountWidget::class,
                FilamentInfoWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                PreventRequestForgery::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}

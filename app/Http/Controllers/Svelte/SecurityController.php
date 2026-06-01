<?php

declare(strict_types=1);

namespace App\Http\Controllers\Svelte;

use App\Concerns\PasswordValidationRules;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Actions\DisableTwoFactorAuthentication;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;

final class SecurityController extends Controller
{
    use PasswordValidationRules;

    public function edit(Request $request): Response
    {
        $user = $request->user();

        $twoFactorData = null;

        if (Features::canManageTwoFactorAuthentication()) {
            $twoFactorEnabled = $user->hasEnabledTwoFactorAuthentication();

            if (Fortify::confirmsTwoFactorAuthentication() && is_null($user->two_factor_confirmed_at)) {
                $twoFactorEnabled = false;
            }

            $twoFactorData = [
                'enabled' => $twoFactorEnabled,
                'requiresConfirmation' => Features::optionEnabled(Features::twoFactorAuthentication(), 'confirm'),
                'recoveryCodes' => $twoFactorEnabled
                    ? json_decode(decrypt($user->two_factor_recovery_codes), true)
                    : null,
            ];
        }

        $passkeysData = null;

        if (Features::canManagePasskeys()) {
            $passkeysData = $user->passkeys()
                ->select(['id', 'name', 'credential', 'created_at', 'last_used_at'])
                ->latest()
                ->get()
                ->map(fn ($passkey) => [
                    'id' => $passkey->id,
                    'name' => $passkey->name,
                    'authenticator' => $passkey->authenticator,
                    'created_at' => $passkey->created_at->toISOString(),
                    'last_used_at' => $passkey->last_used_at?->toISOString(),
                ])
                ->values()
                ->all();
        }

        return Inertia::render('settings/security', [
            'twoFactor' => $twoFactorData,
            'passkeys' => $passkeysData,
        ]);
    }

    /**
     * @throws ValidationException
     */
    public function updatePassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => $this->currentPasswordRules(),
            'password' => $this->passwordRules(),
        ]);

        Auth::user()->update([
            'password' => $validated['password'],
        ]);

        return back()->with('success', __('Password updated.'));
    }

    public function disableTwoFactor(
        Request $request,
        DisableTwoFactorAuthentication $disableTwoFactor,
    ): RedirectResponse {
        $disableTwoFactor($request->user());

        return back()->with('success', __('Two-factor authentication disabled.'));
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Controllers\React;

use App\Concerns\PasswordValidationRules;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
        assert($user instanceof User);

        $twoFactorData = null;

        if (Features::canManageTwoFactorAuthentication()) {
            $twoFactorEnabled = $user->hasEnabledTwoFactorAuthentication();

            if (Fortify::confirmsTwoFactorAuthentication() && is_null($user->two_factor_confirmed_at)) {
                $twoFactorEnabled = false;
            }

            $recoveryCodesRaw = is_string($user->two_factor_recovery_codes)
                ? decrypt($user->two_factor_recovery_codes)
                : null;

            $twoFactorData = [
                'enabled' => $twoFactorEnabled,
                'requiresConfirmation' => Features::optionEnabled(Features::twoFactorAuthentication(), 'confirm'),
                'recoveryCodes' => ($twoFactorEnabled && is_string($recoveryCodesRaw))
                    ? json_decode($recoveryCodesRaw, true)
                    : null,
            ];
        }

        $passkeysData = null;

        if (Features::canManagePasskeys()) {
            $passkeysData = $user->passkeys()
                ->select(['id', 'name', 'credential', 'created_at', 'last_used_at'])
                ->latest()
                ->get()
                ->map(function ($passkey): array {
                    $createdAt = $passkey->getAttribute('created_at');
                    $lastUsedAt = $passkey->getAttribute('last_used_at');

                    return [
                        'id' => $passkey->getAttribute('id'),
                        'name' => $passkey->getAttribute('name'),
                        'authenticator' => $passkey->getAttribute('authenticator'),
                        'created_at' => ($createdAt instanceof Carbon) ? $createdAt->toISOString() : '',
                        'last_used_at' => ($lastUsedAt instanceof Carbon) ? $lastUsedAt->toISOString() : null,
                    ];
                })
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
        $user = $request->user();
        assert($user instanceof User);

        $validated = $request->validate([
            'current_password' => $this->currentPasswordRules(),
            'password' => $this->passwordRules(),
        ]);
        /** @var array<string, mixed> $validated */
        $password = $validated['password'] ?? '';
        assert(is_string($password));

        $user->update([
            'password' => $password,
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

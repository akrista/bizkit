<?php

declare(strict_types=1);

namespace App\Http\Controllers\Svelte;

use App\Concerns\ProfileValidationRules;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

final class ProfileController extends Controller
{
    use ProfileValidationRules;

    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'status' => Session::get('status'),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'hasUnverifiedEmail' => $request->user() instanceof MustVerifyEmail
                && ! $request->user()->hasVerifiedEmail(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate($this->profileRules($user->id));

        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return back()->with('success', __('Profile updated.'));
    }

    public function sendVerification(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return back();
        }

        $user->sendEmailVerificationNotification();

        return back()->with('success', __('Verification link sent.'));
    }
}

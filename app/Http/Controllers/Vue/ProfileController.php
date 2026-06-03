<?php

declare(strict_types=1);

namespace App\Http\Controllers\Vue;

use App\Concerns\ProfileValidationRules;
use App\Models\User;
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
        $user = $request->user();
        $tempUser = $user;
        assert($user instanceof User);

        $mustVerify = in_array(MustVerifyEmail::class, class_implements($user), true);

        /** @var MustVerifyEmail $verifiedUser */
        $verifiedUser = $tempUser;

        return Inertia::render('settings/Profile', [
            'status' => Session::get('status'),
            'mustVerifyEmail' => $mustVerify,
            'hasUnverifiedEmail' => $mustVerify && ! $verifiedUser->hasVerifiedEmail(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();
        assert($user instanceof User);

        $validated = $request->validate($this->profileRules($user->id));
        /** @var array<string, mixed> $validated */
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
        $tempUser = $user;
        assert($user instanceof User);

        /** @var MustVerifyEmail $verifiedUser */
        $verifiedUser = $tempUser;

        if ($verifiedUser->hasVerifiedEmail()) {
            return back();
        }

        $verifiedUser->sendEmailVerificationNotification();

        return back()->with('success', __('Verification link sent.'));
    }
}

<?php

declare(strict_types=1);

namespace App\Filament\Pages\Auth;

use Filament\Auth\Pages\EditProfile as BaseEditProfile;
use Filament\Facades\Filament;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

final class EditProfile extends BaseEditProfile
{
    public function mount(): void
    {
        parent::mount();

        if (Filament::getTenant() === null && auth()->check()) {
            $user = auth()->user();
            $tenant = $user->currentTeam ?? $user->personalTeam() ?? $user->teams()->first();
            if ($tenant) {
                Filament::setTenant($tenant);
            }
        }
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                FileUpload::make('avatar_url')
                    ->label(__('Avatar'))
                    ->avatar()
                    ->image()
                    ->disk('public')
                    ->directory('avatars')
                    ->columnSpan(2),
                TextInput::make('username')
                    ->label(__('Username'))
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true)
                    ->validationMessages([
                        'unique' => __('This username is already taken.'),
                    ])
                    ->columnSpan(2),
                TextInput::make('firstname')
                    ->label('First Name')
                    ->required()
                    ->maxLength(255)
                    ->columnSpan(2),
                TextInput::make('lastname')
                    ->label('Last Name')
                    ->required()
                    ->maxLength(255)
                    ->columnSpan(2),
                TextInput::make('email')
                    ->email()
                    ->required()
                    ->label(__('filament-panels::auth/pages/edit-profile.form.email.label'))
                    ->columnSpan(2)
                    ->maxLength(255)
                    ->unique(ignoreRecord: true)
                    ->validationMessages([
                        'unique' => __('Este correo electrónico ya está registrado.'),
                    ]),
                $this->getPasswordFormComponent()->columnSpan(2),
                $this->getPasswordConfirmationFormComponent()->columnSpan(2),
            ])
            ->columns(2);
    }
}

<?php

declare(strict_types=1);

namespace App\Filament\Pages\Tenancy;

use App\Actions\Teams\CreateTeam;
use App\Models\Team;
use Filament\Forms\Components\TextInput;
use Filament\Pages\Tenancy\RegisterTenant;
use Filament\Schemas\Schema;

final class RegisterTeam extends RegisterTenant
{
    public static function getLabel(): string
    {
        return __('New Team');
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label(__('Team Name'))
                    ->required()
                    ->maxLength(255),
            ]);
    }

    protected function handleRegistration(array $data): Team
    {
        $createTeam = resolve(CreateTeam::class);

        return $createTeam->handle(auth()->user(), $data['name'], isPersonal: false);
    }
}

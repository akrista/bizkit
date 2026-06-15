<?php

declare(strict_types=1);

namespace App\Filament\Resources\Users\Widgets;

use App\Models\User;
use Filament\Support\Icons\Heroicon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

final class UserStatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total de Usuarios', User::withTrashed()->count())
                ->description('Todos los usuarios registrados')
                ->descriptionIcon(Heroicon::OutlinedUserGroup)
                ->color('primary'),
            Stat::make('Usuarios Activos', User::query()->count())
                ->description('Usuarios no eliminados')
                ->descriptionIcon(Heroicon::OutlinedCheckCircle)
                ->color('success'),
            Stat::make('Usuarios Eliminados', User::onlyTrashed()->count())
                ->description('Usuarios en papelera')
                ->descriptionIcon(Heroicon::OutlinedTrash)
                ->color('danger'),
        ];
    }
}

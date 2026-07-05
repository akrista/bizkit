<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\User;
use Carbon\CarbonImmutable;
use Filament\Actions\CreateAction;
use Filament\Actions\ExportAction;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\DevCommands;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Sleep;
use Illuminate\Validation\Rules\Password;
use Laravel\Pennant\Feature;
use Throwable;

final class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->configureDevCommands();
        $this->configureFilament();
        $this->configureGates();

        Feature::define('example-beta-access', fn(User $user): bool => str_ends_with($user->email, '@example.com'));
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    private function configureDefaults(): void
    {
        Vite::useAggressivePrefetching();

        Model::automaticallyEagerLoadRelationships();

        Sleep::fake();

        if (app()->isProduction()) {
            URL::forceHttps();
        }

        Date::use(CarbonImmutable::class);
        Http::preventStrayRequests();

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(
            fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );

        Model::shouldBeStrict();

        Model::unguard();
    }

    private function configureDevCommands(): void
    {
        $config = config('dev');

        if ($only = $config['only'] ?? []) {
            DevCommands::only(...$only);

            return;
        }

        if ($except = $config['except'] ?? []) {
            DevCommands::except(...$except);
        }

        foreach ($config['processes'] ?? [] as $name => $spec) {
            match ($spec['type']) {
                'artisan' => DevCommands::artisan($spec['command'], $name),
                'node' => DevCommands::node($spec['command'], $name),
                'node-exec' => DevCommands::nodeExec($spec['command'], $name),
                default => DevCommands::register($spec['command'], $name),
            };
        }
    }

    private function configureFilament(): void
    {
        Table::configureUsing(function (Table $table): void {
            $table
                ->emptyStateHeading(__('app.no_data'))
                ->emptyStateDescription(__('app.empty_list'))
                ->emptyStateActions([
                    CreateAction::make('create')
                        ->label(__('app.create'))
                        ->icon(Heroicon::Plus)
                        ->button(),
                ])
                ->striped()
                ->poll('10s')
                ->defaultPaginationPageOption(6)
                ->paginated([6, 24, 64, 86, 'all'])
                ->extremePaginationLinks()
                ->deferLoading()
                ->persistFiltersInSession()
                ->defaultSort('created_at', 'desc');
        });
        ExportAction::configureUsing(fn (ExportAction $action): ExportAction => $action->fileDisk('s3'));
    }

    private function configureGates(): void
    {
        Gate::before(function (User $user, string $ability): ?bool {
            if ($user->email === config('bizkit.admin_email')) {
                return true;
            }

            if (config('permission.teams') && $user->current_team_id !== null && function_exists('setPermissionsTeamId')) {
                setPermissionsTeamId($user->current_team_id);
            }

            try {
                if ($user->hasRole('admin')) {
                    return true;
                }
            } catch (Throwable) {
                // Roles table might not be migrated/seeded yet
            }

            return null;
        });

        Gate::define('viewPulse', function (?User $user = null): bool {
            if (!$user instanceof User) {
                return false;
            }

            if (app()->environment('local')) {
                return true;
            }

            if ($user->email === config('bizkit.admin_email')) {
                return true;
            }

            if (config('permission.teams') && $user->current_team_id !== null && function_exists('setPermissionsTeamId')) {
                setPermissionsTeamId($user->current_team_id);
            }

            try {
                return $user->hasPermissionTo('view_pulse');
            } catch (Throwable) {
                return false;
            }
        });

        Gate::define('viewApiDocs', function (?User $user = null): bool {
            if (!$user instanceof User) {
                return false;
            }

            if ($user->email === config('bizkit.admin_email')) {
                return true;
            }

            if (config('permission.teams') && $user->current_team_id !== null && function_exists('setPermissionsTeamId')) {
                setPermissionsTeamId($user->current_team_id);
            }

            try {
                return $user->hasPermissionTo('view_api_docs');
            } catch (Throwable) {
                return false;
            }
        });
    }
}

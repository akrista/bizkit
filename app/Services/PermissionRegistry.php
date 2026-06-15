<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Str;
use Symfony\Component\Finder\Finder;

final class PermissionRegistry
{
    /**
     * @var array<string, array<string, string>>|null
     */
    private ?array $resources = null;

    /**
     * Get all discoverable Filament resources and their associated permissions.
     *
     * @return array<string, array<string, string>>
     */
    public function getResources(): array
    {
        if ($this->resources !== null) {
            return $this->resources;
        }

        $this->resources = [];
        $resourcesPath = app_path('Filament/Resources');

        if (is_dir($resourcesPath)) {
            $finder = new Finder();
            $finder->files()->in($resourcesPath)->name('*Resource.php');

            foreach ($finder as $file) {
                $relativePath = str_replace(
                    ['/', '.php'],
                    ['\\', ''],
                    $file->getRelativePathname()
                );

                $className = 'App\Filament\Resources\\' . $relativePath;

                if (class_exists($className)) {
                    /** @var string $modelClass */
                    $modelClass = $className::getModel();
                    $modelName = Str::snake(class_basename($modelClass));

                    $this->resources[$className] = [
                        'view_any_' . $modelName => 'View Any ' . Str::headline($modelName),
                        'view_' . $modelName => 'View ' . Str::headline($modelName),
                        'create_' . $modelName => 'Create ' . Str::headline($modelName),
                        'update_' . $modelName => 'Update ' . Str::headline($modelName),
                        'delete_' . $modelName => 'Delete ' . Str::headline($modelName),
                        'delete_any_' . $modelName => 'Delete Any ' . Str::headline($modelName),
                        'force_delete_' . $modelName => 'Force Delete ' . Str::headline($modelName),
                        'force_delete_any_' . $modelName => 'Force Delete Any ' . Str::headline($modelName),
                        'restore_' . $modelName => 'Restore ' . Str::headline($modelName),
                        'restore_any_' . $modelName => 'Restore Any ' . Str::headline($modelName),
                    ];
                }
            }
        }

        return $this->resources;
    }

    /**
     * Get all discoverable Filament pages and their associated permissions.
     *
     * @return array<string, string>
     */
    public function getPages(): array
    {
        return [
            // 'view_dashboard' => 'View Dashboard',
        ];
    }

    /**
     * Get all discoverable Filament widgets and their associated permissions.
     *
     * @return array<string, string>
     */
    public function getWidgets(): array
    {
        return [
            // 'view_user_stats_overview' => 'View User Stats Overview',
        ];
    }

    /**
     * Get all custom permissions.
     *
     * @return array<string, string>
     */
    public function getCustomPermissions(): array
    {
        return [
            'view_horizon' => 'View Horizon Dashboard',
            'view_pulse' => 'View Pulse Dashboard',
        ];
    }

    /**
     * Get all permission keys for a specific tab.
     *
     * @return array<int, string>
     */
    public function getPermissionsForTab(string $tab): array
    {
        return match ($tab) {
            'pages_tab' => array_keys($this->getPages()),
            'widgets_tab' => array_keys($this->getWidgets()),
            'custom_permissions_tab' => array_keys($this->getCustomPermissions()),
            default => [],
        };
    }
}

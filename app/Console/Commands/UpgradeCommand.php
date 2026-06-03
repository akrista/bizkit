<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Console\Commands\Upgrade\FileClassifier;
use App\Console\Commands\Upgrade\FileStatus;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Process;
use Symfony\Component\Console\Attribute\AsCommand;
use ZipArchive;

use function Laravel\Prompts\confirm;
use function Laravel\Prompts\error;
use function Laravel\Prompts\info;
use function Laravel\Prompts\note;
use function Laravel\Prompts\outro;
use function Laravel\Prompts\select;
use function Laravel\Prompts\spin;
use function Laravel\Prompts\warning;

#[AsCommand(name: 'bizkit:upgrade')]
#[Description('Upgrade your project by pulling in changes from the upstream bizkit skeleton.')]
#[Signature('bizkit:upgrade
                            {--dev : Compare against HEAD instead of a stable tag}
                            {--dry-run : Show what would change without applying anything}')]
final class UpgradeCommand extends Command
{
    /**
     * The upstream GitHub repository slug.
     */
    private const string UPSTREAM_REPO = 'akrista/bizkit';

    /**
     * The local version tracking file.
     */
    private const string VERSION_FILE = 'bizkit.json';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        Http::allowStrayRequests();

        info('🚀 bizkit upgrade');
        note('Comparing your project against the upstream skeleton at '.self::UPSTREAM_REPO);

        if (! $this->passesPreflight()) {
            return self::FAILURE;
        }

        $currentVersion = $this->readCurrentVersion();
        $targetRef = $this->resolveTargetRef($currentVersion);

        if ($targetRef === null) {
            return self::FAILURE;
        }

        $upstreamFiles = spin(
            fn (): array => $this->fetchUpstreamFiles($targetRef),
            'Fetching upstream files from '.self::UPSTREAM_REPO.'@'.$targetRef.'…',
        );

        if ($upstreamFiles === []) {
            error('Could not fetch upstream files. Check your internet connection and that `gh` is authenticated.');

            return self::FAILURE;
        }

        $classifier = new FileClassifier($upstreamFiles, base_path());
        $classified = $classifier->classify();

        $this->printSummary($classified);

        if ($this->option('dry-run')) {
            outro('Dry run complete. No changes were made.');

            return self::SUCCESS;
        }

        if (! confirm('Proceed with applying changes?', default: true)) {
            outro('Aborted. No changes were made.');

            return self::SUCCESS;
        }

        $this->applyChanges($classified, $upstreamFiles);
        $this->updateVersionFile($targetRef);

        outro('✅ Upgrade complete! Review applied changes with `git diff HEAD`.');

        return self::SUCCESS;
    }

    /**
     * Run preflight checks: git available, clean working tree.
     */
    private function passesPreflight(): bool
    {
        // Check git is available
        if (! $this->commandExists('git')) {
            error('`git` is not available. Please install git and try again.');

            return false;
        }

        // Check for clean working tree
        $statusCheck = Process::run(['git', 'status', '--porcelain']);
        if (! $statusCheck->successful()) {
            error('Could not determine git status. Are you inside a git repository?');

            return false;
        }

        if (mb_trim($statusCheck->output()) !== '') {
            error('Your working tree has uncommitted changes. Please commit or stash them before upgrading.');
            $this->line($statusCheck->output());

            return false;
        }

        return true;
    }

    /**
     * Read the currently pinned version from bizkit.json.
     */
    private function readCurrentVersion(): ?string
    {
        $versionFile = base_path(self::VERSION_FILE);

        if (! file_exists($versionFile)) {
            warning(self::VERSION_FILE.' not found. Assuming this is a fresh project with no pinned version.');

            return null;
        }

        /** @var array{version?: string, repository?: string} $data */
        $data = json_decode((string) file_get_contents($versionFile), associative: true) ?? [];

        return $data['version'] ?? null;
    }

    /**
     * Resolve the upstream git ref to compare against.
     * Uses the latest tag by default, or HEAD when --dev is passed.
     */
    private function resolveTargetRef(?string $currentVersion): ?string
    {
        if ($this->option('dev')) {
            info('Using HEAD (--dev flag set).');

            return 'HEAD';
        }

        $tags = spin(
            function (): array {
                $response = Http::withHeaders(array_merge([
                    'User-Agent' => 'bizkit-upgrader/1.0',
                    'Accept' => 'application/vnd.github+json',
                ], $this->getAuthHeader()))->get('https://api.github.com/repos/'.self::UPSTREAM_REPO.'/tags');

                if (! $response->successful()) {
                    return [];
                }

                /** @var array<array{name: string}> $data */
                $data = $response->json() ?? [];

                return array_column($data, 'name');
            },
            'Fetching available upstream tags…',
        );

        if ($tags === []) {
            error('No tags found on '.self::UPSTREAM_REPO.'. Use --dev to compare against HEAD.');

            return null;
        }

        // Latest tag is first in the GitHub response
        $latestTag = reset($tags);

        if ($currentVersion !== null && $currentVersion === $latestTag) {
            outro(sprintf("You're already on the latest version (%s). Nothing to upgrade.", $latestTag));

            return null;
        }

        if ($currentVersion !== null) {
            info(sprintf('Current version: %s → Latest: %s', $currentVersion, $latestTag));
        } else {
            info('Latest upstream tag: '.$latestTag);
        }

        return $latestTag;
    }

    /**
     * Fetch all files from the upstream repo at the given ref via the GitHub API.
     *
     * @return array<string, string> Map of relative path => raw content.
     */
    private function fetchUpstreamFiles(string $ref): array
    {
        $url = 'https://api.github.com/repos/'.self::UPSTREAM_REPO.'/zipball/'.$ref;

        $response = Http::withHeaders(array_merge([
            'User-Agent' => 'bizkit-upgrader/1.0',
        ], $this->getAuthHeader()))->get($url);

        if (! $response->successful()) {
            return [];
        }

        $tempFile = tempnam(sys_get_temp_dir(), 'bizkit_zip_');
        file_put_contents($tempFile, $response->body());

        $zip = new ZipArchive;
        $files = [];

        if ($zip->open($tempFile) === true) {
            for ($i = 0; $i < $zip->numFiles; $i++) {
                $stat = $zip->statIndex($i);
                $zipPath = $stat['name'];

                $parts = explode('/', str_replace('\\', '/', $zipPath));
                if (count($parts) <= 1) {
                    continue;
                }

                array_shift($parts);
                $relativePath = implode('/', $parts);

                if (str_ends_with($zipPath, '/')) {
                    continue;
                }

                if ($this->shouldSkipPath($relativePath)) {
                    continue;
                }

                $content = $zip->getFromIndex($i);
                if ($content !== false) {
                    $files[$relativePath] = $content;
                }
            }
            $zip->close();
        }

        @unlink($tempFile);

        return $files;
    }

    /**
     * Whether a path should be excluded from classification entirely.
     */
    private function shouldSkipPath(string $path): bool
    {
        $skippedPrefixes = [
            'vendor/',
            'node_modules/',
            '.git/',
        ];

        $skippedFiles = [
            'composer.lock',
            'bun.lock',
            'package-lock.json',
            'yarn.lock',
            'pnpm-lock.yaml',
        ];

        foreach ($skippedPrefixes as $prefix) {
            if (str_starts_with($path, $prefix)) {
                return true;
            }
        }

        return in_array($path, $skippedFiles, strict: true);
    }

    /**
     * Print a summary table of classified files.
     *
     * @param  array<string, FileStatus>  $classified
     */
    private function printSummary(array $classified): void
    {
        $grouped = [];
        foreach ($classified as $path => $status) {
            $grouped[$status->value][] = $path;
        }

        $newCount = count($grouped[FileStatus::New->value] ?? []);
        $differsCount = count($grouped[FileStatus::Differs->value] ?? []);
        $alreadyCount = count($grouped[FileStatus::AlreadyPresent->value] ?? []);
        $deletedCount = count($grouped[FileStatus::DeletedUpstream->value] ?? []);

        $this->newLine();
        info(sprintf(
            'Summary: %d new · %d differs · %d already present · %d deleted upstream',
            $newCount,
            $differsCount,
            $alreadyCount,
            $deletedCount,
        ));
        $this->newLine();

        if ($newCount > 0) {
            $this->line('<fg=green>New files (will be applied automatically):</>');
            foreach ($grouped[FileStatus::New->value] as $path) {
                $this->line('  + '.$path);
            }

            $this->newLine();
        }

        if ($differsCount > 0) {
            $this->line('<fg=yellow>Files that differ (you will decide for each):</>');
            foreach ($grouped[FileStatus::Differs->value] as $path) {
                $this->line('  ~ '.$path);
            }

            $this->newLine();
        }

        if ($deletedCount > 0) {
            $this->line('<fg=red>Deleted upstream (you will decide for each):</>');
            foreach ($grouped[FileStatus::DeletedUpstream->value] as $path) {
                $this->line('  - '.$path);
            }

            $this->newLine();
        }
    }

    /**
     * Apply new files automatically and walk user through differing files.
     *
     * @param  array<string, FileStatus>  $classified
     * @param  array<string, string>  $upstreamFiles
     */
    private function applyChanges(array $classified, array $upstreamFiles): void
    {
        foreach ($classified as $path => $status) {
            match ($status) {
                FileStatus::New => $this->applyNewFile($path, $upstreamFiles[$path]),
                FileStatus::Differs => $this->walkUserThroughDiff($path, $upstreamFiles[$path]),
                FileStatus::DeletedUpstream => $this->walkUserThroughDeletion($path),
                FileStatus::AlreadyPresent => null, // nothing to do
            };
        }
    }

    /**
     * Write a new file from upstream into the local project.
     */
    private function applyNewFile(string $relativePath, string $content): void
    {
        $localPath = base_path($relativePath);
        $directory = dirname($localPath);

        if (! is_dir($directory)) {
            mkdir($directory, 0755, recursive: true);
        }

        file_put_contents($localPath, $content);
        $this->line('<fg=green>  ✓ Applied new file:</> '.$relativePath);
    }

    /**
     * Show the diff for a changed file and let the user decide.
     */
    private function walkUserThroughDiff(string $relativePath, string $upstreamContent): void
    {
        $this->newLine();
        $this->line('<fg=yellow>  ~ Differs:</> '.$relativePath);

        // Write upstream content to a temp file for diffing
        $tempFile = tempnam(sys_get_temp_dir(), 'bizkit_upstream_');
        file_put_contents($tempFile, $upstreamContent);

        $diff = Process::run([
            'git',
            'diff',
            '--no-index',
            '--',
            base_path($relativePath),
            $tempFile,
        ]);
        $this->line($diff->output());

        @unlink($tempFile);

        $choice = select(
            label: sprintf('What would you like to do with %s?', $relativePath),
            options: [
                'keep' => 'Keep my version (skip)',
                'take' => 'Take upstream version (overwrites your changes)',
            ],
            default: 'keep',
        );

        if ($choice === 'take') {
            file_put_contents(base_path($relativePath), $upstreamContent);
            $this->line('<fg=green>  ✓ Took upstream version:</> '.$relativePath);
        } else {
            $this->line('<fg=gray>  – Kept local version:</> '.$relativePath);
        }
    }

    /**
     * Surface a file that was deleted upstream and let the user decide.
     */
    private function walkUserThroughDeletion(string $relativePath): void
    {
        $this->newLine();
        warning(sprintf('  %s was deleted upstream.', $relativePath));

        $shouldDelete = confirm(
            label: sprintf('Delete %s from your project?', $relativePath),
            default: false,
        );

        if ($shouldDelete) {
            @unlink(base_path($relativePath));
            $this->line('<fg=red>  ✓ Deleted:</> '.$relativePath);
        } else {
            $this->line('<fg=gray>  – Kept local file:</> '.$relativePath);
        }
    }

    /**
     * Pin the newly applied version into bizkit.json.
     */
    private function updateVersionFile(string $newVersion): void
    {
        $versionFile = base_path(self::VERSION_FILE);

        $data = [
            'version' => $newVersion,
            'repository' => self::UPSTREAM_REPO,
        ];

        file_put_contents($versionFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)."\n");
        $this->line('<fg=green>  ✓ Updated</> '.self::VERSION_FILE.(' to '.$newVersion));
    }

    /**
     * Get the Authorization header for GitHub API requests if available.
     *
     * @return array<string, string>
     */
    private function getAuthHeader(): array
    {
        $token = env('GITHUB_TOKEN');

        if (! $token && $this->commandExists('gh')) {
            $tokenResult = Process::run(['gh', 'auth', 'token']);
            if ($tokenResult->successful()) {
                $token = mb_trim($tokenResult->output());
            }
        }

        if ($token) {
            return ['Authorization' => 'Bearer '.$token];
        }

        return [];
    }

    /**
     * Check whether a shell command is available on the system.
     */
    private function commandExists(string $command): bool
    {
        $check = Process::run(PHP_OS_FAMILY === 'Windows' ? ['where', $command] : ['which', $command]);

        return $check->successful();
    }
}

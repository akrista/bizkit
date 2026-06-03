<?php

declare(strict_types=1);

namespace App\Console\Commands\Upgrade;

/**
 * Classifies a local file relative to its upstream counterpart.
 *
 * Status meanings:
 *   - new:              file does not exist locally; safe to add.
 *   - already-present:  file exists and is byte-identical to upstream.
 *   - differs:          file exists but content differs from upstream.
 *   - deleted-upstream: file exists locally but was removed upstream.
 */
final readonly class FileClassifier
{
    /**
     * @param  array<string, string>  $upstreamFiles  Map of relative path => raw content from upstream.
     * @param  string  $localBasePath  Absolute path to the local project root.
     */
    public function __construct(
        private array $upstreamFiles,
        private string $localBasePath,
    ) {}

    /**
     * Classify all upstream files and return a status map.
     *
     * @return array<string, FileStatus>
     */
    public function classify(): array
    {
        $results = [];

        foreach ($this->upstreamFiles as $relativePath => $upstreamContent) {
            $results[$relativePath] = $this->classifyFile($relativePath, $upstreamContent);
        }

        return $results;
    }

    /**
     * Classify a single file against its upstream content.
     */
    public function classifyFile(string $relativePath, string $upstreamContent): FileStatus
    {
        $localPath = $this->localBasePath.DIRECTORY_SEPARATOR.$relativePath;

        if (! file_exists($localPath)) {
            return FileStatus::New;
        }

        $localContent = file_get_contents($localPath);

        if ($localContent === $upstreamContent) {
            return FileStatus::AlreadyPresent;
        }

        return FileStatus::Differs;
    }

    /**
     * Find local files that no longer exist upstream (deleted upstream).
     *
     * @param  string[]  $localRelativePaths
     * @return string[]
     */
    public function findDeletedUpstream(array $localRelativePaths): array
    {
        return array_filter(
            $localRelativePaths,
            fn (string $path): bool => ! array_key_exists($path, $this->upstreamFiles),
        );
    }
}

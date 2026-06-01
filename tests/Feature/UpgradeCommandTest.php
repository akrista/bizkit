<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Console\Commands\Upgrade\FileClassifier;
use App\Console\Commands\Upgrade\FileStatus;
use Illuminate\Support\Facades\Process;
use Tests\TestCase;

final class UpgradeCommandTest extends TestCase
{
    // -------------------------------------------------------------------------
    // FileClassifier unit-level coverage (no process calls needed)
    // -------------------------------------------------------------------------

    public function test_classifier_marks_missing_file_as_new(): void
    {
        $classifier = new FileClassifier(
            upstreamFiles: ['some/new-file.php' => '<?php echo "hello";'],
            localBasePath: sys_get_temp_dir(),
        );

        $result = $classifier->classifyFile('some/new-file.php', '<?php echo "hello";');

        $this->assertSame(FileStatus::New, $result);
    }

    public function test_classifier_marks_identical_file_as_already_present(): void
    {
        $tmpFile = tempnam(sys_get_temp_dir(), 'bizkit_test_');
        file_put_contents($tmpFile, 'identical content');

        $relativePath = basename($tmpFile);

        $classifier = new FileClassifier(
            upstreamFiles: [$relativePath => 'identical content'],
            localBasePath: dirname($tmpFile),
        );

        $result = $classifier->classifyFile($relativePath, 'identical content');

        $this->assertSame(FileStatus::AlreadyPresent, $result);

        @unlink($tmpFile);
    }

    public function test_classifier_marks_modified_file_as_differs(): void
    {
        $tmpFile = tempnam(sys_get_temp_dir(), 'bizkit_test_');
        file_put_contents($tmpFile, 'local content');

        $relativePath = basename($tmpFile);

        $classifier = new FileClassifier(
            upstreamFiles: [$relativePath => 'upstream content'],
            localBasePath: dirname($tmpFile),
        );

        $result = $classifier->classifyFile($relativePath, 'upstream content');

        $this->assertSame(FileStatus::Differs, $result);

        @unlink($tmpFile);
    }

    public function test_classifier_detects_files_deleted_upstream(): void
    {
        $classifier = new FileClassifier(
            upstreamFiles: ['remaining.php' => '<?php'],
            localBasePath: sys_get_temp_dir(),
        );

        $deletedFiles = $classifier->findDeletedUpstream(['remaining.php', 'removed-upstream.php']);

        $this->assertContains('removed-upstream.php', $deletedFiles);
        $this->assertNotContains('remaining.php', $deletedFiles);
    }

    public function test_classifier_classify_returns_status_for_all_upstream_files(): void
    {
        $tmpFile = tempnam(sys_get_temp_dir(), 'bizkit_test_');
        file_put_contents($tmpFile, 'same');

        $classifier = new FileClassifier(
            upstreamFiles: [
                basename($tmpFile) => 'same',
                'nonexistent-file.php' => '<?php',
            ],
            localBasePath: dirname($tmpFile),
        );

        $results = $classifier->classify();

        $this->assertArrayHasKey(basename($tmpFile), $results);
        $this->assertArrayHasKey('nonexistent-file.php', $results);
        $this->assertSame(FileStatus::AlreadyPresent, $results[basename($tmpFile)]);
        $this->assertSame(FileStatus::New, $results['nonexistent-file.php']);

        @unlink($tmpFile);
    }

    // -------------------------------------------------------------------------
    // FileStatus enum behaviour
    // -------------------------------------------------------------------------

    public function test_file_status_requires_user_decision_for_differs(): void
    {
        $this->assertTrue(FileStatus::Differs->requiresUserDecision());
        $this->assertTrue(FileStatus::DeletedUpstream->requiresUserDecision());
        $this->assertFalse(FileStatus::New->requiresUserDecision());
        $this->assertFalse(FileStatus::AlreadyPresent->requiresUserDecision());
    }

    // -------------------------------------------------------------------------
    // UpgradeCommand — preflight failures (process calls faked)
    // -------------------------------------------------------------------------

    public function test_upgrade_command_fails_when_working_tree_is_dirty(): void
    {
        Process::fake([
            'git status --porcelain' => Process::result(output: ' M some/file.php', exitCode: 0),
            '*' => Process::result(output: '', exitCode: 0),
        ]);

        $this->artisan('bizkit:upgrade')
            ->assertFailed();
    }

    public function test_upgrade_command_fails_when_gh_is_not_authenticated(): void
    {
        Process::fake([
            'gh auth status' => Process::result(output: '', exitCode: 1),
            '*' => Process::result(output: '', exitCode: 0),
        ]);

        $this->artisan('bizkit:upgrade')
            ->assertFailed();
    }
}

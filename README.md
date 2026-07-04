# Bizkit

[![Laravel Version](https://img.shields.io/badge/laravel-13.x-red.svg)](https://laravel.com)
[![PHP Version](https://img.shields.io/badge/php-8.5-blue.svg)](https://php.net)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.md)

**Bizkit** is a batteries-included Laravel starter kit based on [Laravel Starter Kits](https://laravel.com/starter-kits). It is designed to serve as a complete and robust baseline to rapidly bootstrap both complex and simple Laravel applications.

Bizkit is a personal Laravel starter kit built for visual excellence, modern reactivity, and developer ergonomics. While built primarily as a personal foundation, contributions are welcome, and the project is fully licensed under the MIT license.

---

## Key Features

### 🚀 Performance & Real-time
- **Octane with FrankenPHP**: Pre-configured high-performance application serving with FrankenPHP.
- **Reverb**: Native, lightning-fast WebSockets for real-time Laravel broadcasting.
- **Horizon**: Beautiful Redis queue monitor dashboard to oversee job processing.
- **Pulse**: Real-time application performance and resource monitoring. **Database support:** MySQL, MariaDB, or PostgreSQL only — Pulse is not compatible with SQLite/MSSQL.

### 🛡️ Authentication & Security
- **Robust Authentication**: Powered by **Laravel Fortify** featuring secure registration, email verification, and password resets.
- **Passkey/WebAuthn**: Out-of-the-box native passwordless authentication.
- **Two-Factor Authentication (2FA)**: One-Time Password (OTP) verification with TOTP & recovery codes.
- **Granular Permissions & Roles**: Tenancy-aware database-driven authorization powered by **Spatie Laravel Permission**, featuring automatic policy generation and dynamic permissions synchronization.

### 🛠️ Developer Experience & Architecture
- **Interactive UI**: Powered by **Livewire v4** and beautiful **Flux UI** components.
- **API Routing & Documentation**: Integrated API routing with automatic interactive documentation via **Dedoc Scramble** and **Scalar**.
- **S3 Filesystem**: Pre-configured support for AWS S3 file storage.
- **Production-Ready Docker**: Containerized with a multi-stage Alpine Linux image running FrankenPHP, Supervisor, and Supercronic scheduler.
- **Feature Flags**: Native feature flagging and targeting built with **Laravel Pennant**.
- **Quality Baseline**: Pre-configured linting, analysis, and testing using **Pint**, **Rector**, **Larastan**, and **Pest PHP**.

---

## Authorization & Roles

Bizkit uses a hybrid, team-scoped authorization layer built on top of **Spatie Laravel Permission**.

### Architecture
- **Gate-Level Scoping**: Dynamically registers a `Gate::before` callback that scopes all authorization checks (e.g. `$user->can()`) to the active team (`current_team_id`).
- **Super Admin Bypass**: Allows administrators matching `config('bizkit.admin_email')` or possessing the Spatie `admin` role to bypass policy checks.
- **Dynamic Fallbacks**: Checks database-configured roles/permissions first and falls back to static `TeamRole` / `TeamPermission` enums if not found in the DB.

### Artisan Commands
- **Sync Permissions**: Seed all registered permissions (resources, pages, widgets, custom) and automatically map them to any `admin` role:
  ```bash
  php artisan bizkit:sync-permissions
  ```
- **Generate Policies**: Scaffold policies for your models using a predefined stub mapping Eloquent resource actions to Spatie permissions:
  ```bash
  php artisan bizkit:generate-policies [--force]
  ```

---

## Upstream Upgrade System

To ensure that projects started with Bizkit can receive upstream template updates with minimal friction, Bizkit features an interactive self-updating CLI tool. It compares your local code against the lighthouse repository and lets you selectively merge improvements.

### Usage Commands

Ensure your Git working tree is clean before running upgrades:

```bash
# 1. Dry run (preview pending changes only)
php artisan bizkit:upgrade --dry-run

# 2. Perform interactive merge comparing against the latest stable release
php artisan bizkit:upgrade

# 3. Pull bleeding-edge updates from the development branch
php artisan bizkit:upgrade --dev
```

When file differences are detected, the command runs an interactive diff selection where you can choose whether to keep your custom code or adopt the upstream version. The sync state is recorded in `bizkit.json`.

---

## Installation & Setup

### Prerequisites

Ensure you have **PHP 8.5+**, **Composer**, **Git**, and **Bun** installed globally.

> [!IMPORTANT]
> **Windows Users**: Because **Laravel Horizon** requires `pcntl` and `posix` extensions (which are not natively supported on Windows), you should append `--ignore-platform-reqs` to Composer commands (such as `composer require`, `composer update`, or `composer install`).

### Quick Start

1. **Bootstrap the project**:
   ```bash
   composer create-project akrista/bizkit my-awesome-app
   cd my-awesome-app
   ```

2. **Initialize services and build assets**:
   ```bash
   composer run setup
   ```

3. **Start the local development environment**:
   ```bash
   composer run dev
   ```

### Git Hooks (Husky)

Bizkit uses **Husky** to automate code style checks before commits are finalized. The pre-commit hook automatically runs **Laravel Pint** (`composer lint:check`) on staged files.

These hooks are configured automatically during `composer run setup` (which calls `bun install`), but you can also manually set them up or re-enable them by running:

```bash
bun run prepare
```

#### Troubleshooting: Git Hooks / Husky on Windows (Laravel Herd)

If you encounter `composer: command not found` or `php: command not found` errors during `git commit` (caused by Husky executing in a bash environment that cannot natively run Windows `.bat` files), create extensionless shell wrappers in your Herd bin directory (`C:\Users\<YourUser>\.config\herd\bin`):

* **Composer Wrapper** (`composer`):
  ```bash
  #!/bin/sh
  php "$(dirname "$0")/composer.phar" "$@"
  ```

* **PHP Wrapper** (`php`):
  ```bash
  #!/bin/sh
  PHP_EXE=$(grep -o '"[^"]*"' "$(dirname "$0")/php.bat" | head -n 1 | tr -d '"')
  exec "$PHP_EXE" "$@"
  ```

---

## Future Roadmap

The following features are planned for future releases of Bizkit:
- 📖 **Application Documentation**: A comprehensive documentation site/viewer built into the kit.
- 🔗 **Webhooks**: Outbound webhooks and subscription management for integrations.
- 🔑 **Permissions & Roles** (Completed): Advanced granular access control out of the box.

---

## Project Structure

```
├── app/
│   ├── Actions/Fortify/              # Fortify registration and 2FA logic
│   ├── Http/Responses/               # Custom Fortify response overrides
│   ├── Livewire/                     # Interactive Livewire components
│   ├── Models/                       # Core Eloquent models (User, Team, Membership)
│   └── Console/Commands/Upgrade/     # Downstream upgrade system code
├── config/                           # Application configuration overrides
├── database/migrations/              # Fortify, Passkeys, Pulse, and Teams tables
├── deployment/                       # Docker deployment configs (Caddyfile, supervisord)
├── resources/views/                  # Blade views and Flux UI layouts
└── bizkit.json                       # Local upgrade status receipt
```

---

## License

Bizkit is open-sourced software licensed under the [MIT license](LICENSE.md).

---

## TODO

A consolidated backlog of work for this project. Items are grouped by status and source so contributors can pick up where scaffolding left off.

### Declared Roadmap (from "Future Roadmap" section)

- [ ] **Application Documentation** — Build an in-app documentation site/viewer for the kit (routes, components, and a renderer that scans the codebase to produce reference pages).
- [ ] **Webhooks** — Implement outbound webhook delivery and a subscription management UI so apps can broadcast events to third parties with retries, signing, and logs.
- [x] **Permissions & Roles** — Add an advanced, granular access-control layer on top of the existing `TeamPermission` / `TeamRole` enums, including a `Permission` table, gate definitions, and a policy generator.

### Partially Implemented (scaffolding present, finish needed)

- [ ] **AI / Agent scaffolding** — Stubs exist in `stubs/` (`agent.stub`, `structured-agent.stub`, `tool.stub`, `agent-middleware.stub`) and the `agent_conversations` migration is shipped, but there is no `make:agent` Artisan command, no example agents under `app/Ai/`, and no `agent_conversations` model/relations. Wire these up so the kit can actually generate and run agents.
- [ ] **Filament admin panel** — `app/Providers/Filament/AdminPanelProvider.php` and `config/filament.php` are present, but no `app/Filament/` Resources, Pages, or Widgets are committed. Add a baseline admin shell (e.g., `UserResource`, `TeamResource`) and document how to extend it.
- [ ] **Upstream upgrade CLI** — `php artisan bizkit:upgrade` is wired through `app/Console/Commands/UpgradeCommand.php` with `FileClassifier` + `FileStatus`, but `bizkit.json` currently only tracks `{version, repository}`. Add a per-file sync state map and a `--status` / `--reset` subcommand to introspect or clear it.
- [ ] **API surface** — `routes/api.php` only exposes the default `/user` Sanctum endpoint. Add versioned API routes (`routes/api/v1.php`) with a token-issuing endpoint, and configure Scramble + Scalar to document them.
- [ ] **Dashboard page** — `resources/views/dashboard.blade.php` is the only authenticated landing page and currently shows the placeholder. Build a real dashboard view (stats cards, recent activity) that demonstrates the layout.
- [ ] **Welcome page polish** — `resources/views/welcome.blade.php` is a marketing surface; add the hero, feature grid, and footer sections referenced in the kit's design language.

### Auth, Security & Teams (extending what exists)

- [ ] **Passkey UX tests** — Only the `SecurityTest` covers 2FA. Add feature tests for passkey registration, passkey login, and passkey removal flows.
- [ ] **Team invitations** — `TeamInvitationTest` exists, but there is no test for invitation expiry, reuse-after-acceptance, or email throttling. Cover these edge cases.
- [ ] **Team-switcher component** — `resources/views/components/⚡team-switcher.blade.php` is present; verify it works end-to-end with the team-scoped routes and `SetTeamUrlDefaults` middleware, then add a regression test.
- [ ] **Session/device management** — Add a "Sessions" section under `settings/security` listing and revoking active sessions/devices.

### Quality, Tooling & CI

- [ ] **Bring CI in line with composer** — `composer.json` requires PHP `^8.3`, but `boost.json` and the README claim 8.5, and `tests.yml` only matrixes 8.3/8.4/8.5. Pin a single supported floor (8.3) in docs and align the matrix.
- [ ] **Bun vs npm in CI** — `.github/workflows/tests.yml` uses `npm i` / `npm run build`, but the project depends on Bun (per README and `composer.json` scripts). Switch CI to `bun install` / `bun run build` to match local development.
- [ ] **Lint workflow coverage** — `.github/workflows/lint.yml` only runs Pint via `composer lint`; it skips Rector, Larastan, and Pest. Wire the full `composer test` script into CI (or add a separate `ci.yml`) so type coverage and static analysis are gated.
- [ ] **Type coverage gate** — `composer.json` exposes `test:type-coverage` at 100%, but the gate isn't enforced in CI. Add a `composer ci:check` job.
- [ ] **Browser tests** — `pestphp/pest-plugin-browser` is a dev dependency but no `tests/Browser/` directory exists. Add at least one smoke test (e.g., login → dashboard) to validate JS-rendered flows.
- [ ] **Filament tests** — No tests exist for the (planned) Filament resources. When added, include `arch()` coverage so admin classes follow the kit's conventions.

### Deployment & Infrastructure

- [ ] **Compose example** — `compose.example.yml` exists, but there's no published `compose.yml` for Laravel Cloud / local Docker Compose workflows. Promote it and document the env vars.
- [ ] **Laravel Cloud readiness** — `boost.json` enables `cloud: true`; add a `cloud` workflow file (or document the deploy command) and verify `herd.yml` works for Laravel Cloud.
- [ ] **Nightwatch toggle** — `boost.json` has `nightwatch: false`; add a contributor note for when to flip it and which `NIGHTWATCH_*` env vars must be set.
- [ ] **FrankenPHP supervisor profiles** — `deployment/` has split files (`supervisord.frankenphp.conf`, `.horizon.conf`, `.reverb.conf`, `.scheduler.conf`, `.worker.conf`, `.services.conf`, `.inertia.conf`). Consolidate the README's "Production-Ready Docker" section to list exactly which supervisord configs ship and in which combinations.

### Developer Experience

- [ ] **`composer run setup` smoke test** — Confirm the setup script works on a fresh clone (creates `.env`, generates key, migrates, installs Bun packages, builds assets) and capture any missing prerequisites (Bun, Node) in a `CONTRIBUTING` troubleshooting table.
- [ ] **`bizkit:upgrade` documentation** — Document the interactive diff UI, the `bizkit.json` schema, and the conflict-resolution rules in the README.
- [ ] **Local Octane guide** — Octane is installed but no `composer run octane` script exists. Add one (e.g., `php artisan octane:start --watch`) and a one-paragraph guide.
- [ ] **Reverb dev recipe** — Add `php artisan reverb:start` to the `dev` script alongside the queue, vite, and pail watchers.
- [ ] **Pint preset** — `pint.json` exists; document the rule overrides and add a `pint.json` comment block explaining which Laravel preset is used.

### Documentation

- [ ] **Architecture decision records** — Create `docs/adr/` (or similar) covering: Octane+FrankenPHP choice, team-scoped routing, Pennant for feature flags, and AI SDK integration shape.
- [ ] **Stubs reference** — Document each stub in `stubs/` (what command consumes it, what gets generated, and an example of the produced class).
- [ ] **README badges** — Add CI status, code coverage, and Packagist download badges near the existing version badges.
- [ ] **License file** — README links to `LICENSE.md` but only `LICENSE` is present. Either rename or update the link.
- [ ] **CONTRIBUTING guide** — `CONTRIBUTING` file exists (no extension); rename to `CONTRIBUTING.md` so GitHub renders it.

### Nice-to-have

- [ ] **Activity log integration** — `spatie/laravel-activitylog` is not installed; if team actions need an audit trail, add it as an opt-in package with a migration stub.
- [ ] **Billing / Cashier** — Decide whether Stripe / Paddle integration is in scope; if yes, ship a `composer require laravel/cashier` recipe.
- [ ] **Marketing site generator** — Provide a `php artisan bizkit:make:landing` command that scaffolds a `pages/marketing/*.blade.php` set using Flux UI primitives.
- [ ] **Theming** — Add dark/light theme tokens in `resources/css/` (Tailwind v4) and document how to brand a Bizkit app.

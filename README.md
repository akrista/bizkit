# bizkit

[![Laravel Version](https://img.shields.io/badge/laravel-13.x-red.svg)](https://laravel.com)
[![PHP Version](https://img.shields.io/badge/php-8.5-blue.svg)](https://php.net)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.md)

**bizkit** is a premium, fully batteries-included, state-of-the-art starter kit for Laravel 13+. It brings together the absolute best of modern client-side and server-side interactive technologies, providing a state-of-the-art foundation for production-ready applications.

Unlike standard starter kits, **bizkit** features a built-in, interactive **upgrade system** allowing you to pull upstream improvements and bug fixes seamlessly without breaking your custom modifications.

---

## Key Features

- **Double-Engine Reactivity**: Seamlessly combines **Svelte 5** (via Inertia.js v3) and **Livewire v4** with **Flux UI** components for ultimate layout and interactive flexibility.
- **Robust Authentication**: Fully managed authentication powered by **Laravel Fortify**, including:
  - Secure Login & Registration
  - Email Verification & Password Reset
  - Two-Factor Authentication (2FA) with TOTP & Recovery Codes
  - Native **Passkey/WebAuthn** support out of the box
- **Premium Scaffolding**: Built-in **Teams management** (`Team`, `Membership`, and `TeamInvitation` models) with pre-configured policies and invitation flows.
- **Developer Experience**:
  - Pre-configured linting & static analysis with **Pint**, **Rector**, and **Larastan**.
  - Modern compilation pipeline via **Vite** and **TailwindCSS v4**.
  - Robust test baseline utilizing **Pest PHP** with custom feature tests.

---

## The Upstream Upgrade System

To keep your template codebase fresh, **bizkit** includes a byte-by-byte downstream comparator that fetches upstream changes and lets you merge them selectively.

### How It Works

```
                        [ akrista/bizkit ] (Upstream Lighthouse Repo)
                                │
                        git fetch upstream
                                │
                 [ php artisan bizkit:upgrade ]
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
   [New Files]             [Diffing Files]      [Deleted Upstream]
   Automatically           Interactive Diff     Interactive Prompt
     applied                  selection             to delete
```

### Usage Commands

Ensure your Git working tree is clean before running upgrades:

```bash
# 1. Preview changes only (Dry Run)
php artisan bizkit:upgrade --dry-run

# 2. Perform interactive upgrade comparing against latest stable tag
php artisan bizkit:upgrade

# 3. Pull latest bleeding-edge commits (HEAD)
php artisan bizkit:upgrade --dev
```

When files differ, the command launches an interactive terminal diff allowing you to choose whether to **keep your local version** or **adopt the upstream counterpart**. Your version state is recorded securely inside `bizkit.json`.

---

## Installation & Setup

### Prerequisites

Ensure you have **Git**, **PHP 8.5+**, **Composer**, and **Bun** installed globally on your machine.

### Quick Start

1. **Bootstrap the project**:
   ```bash
   composer create-project akrista/bizkit my-awesome-app
   cd my-awesome-app
   ```

2. **Initialize services**:
   ```bash
   composer run setup
   ```

3. **Start the local development server**:
   ```bash
   composer run dev
   ```

---

## Project Structure

```
├── app/
│   ├── Console/Commands/Upgrade/     # Upgrade system (Classifier & Status Enum)
│   ├── Http/Responses/               # Fortify frontend-agnostic auth overrides
│   ├── Models/                       # Core Eloquent models (User, Team, Membership)
│   └── Support/                      # Team permission helpers
├── bizkit.json                       # Local version tracking receipt
├── config/                           # Application configuration overrides
├── database/migrations/              # Fortify, Passkeys, and Teams tables
├── resources/js/svelte/              # Svelte 5 application layouts, forms, and pages
└── resources/views/                  # Blade entrypoints & Flux UI templates
```

---

## License

The **bizkit** starter kit is open-sourced software licensed under the [MIT license](LICENSE.md).

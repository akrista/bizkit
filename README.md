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
- **Pulse**: Real-time application performance and resource monitoring.

### 🛡️ Authentication & Security
- **Robust Authentication**: Powered by **Laravel Fortify** featuring secure registration, email verification, and password resets.
- **Passkey/WebAuthn**: Out-of-the-box native passwordless authentication.
- **Two-Factor Authentication (2FA)**: One-Time Password (OTP) verification with TOTP & recovery codes.

### 🛠️ Developer Experience & Architecture
- **Interactive UI**: Powered by **Livewire v4** and beautiful **Flux UI** components.
- **API Routing & Documentation**: Integrated API routing with automatic interactive documentation via **Dedoc Scramble** and **Scalar**.
- **S3 Filesystem**: Pre-configured support for AWS S3 file storage.
- **Production-Ready Docker**: Containerized with a multi-stage Alpine Linux image running FrankenPHP, Supervisor, and Supercronic scheduler.
- **Feature Flags**: Native feature flagging and targeting built with **Laravel Pennant**.
- **Quality Baseline**: Pre-configured linting, analysis, and testing using **Pint**, **Rector**, **Larastan**, and **Pest PHP**.

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
> **Windows Users**: Because **Laravel Horizon** requires `pcntl` and `posix` extensions (which are not natively supported on Windows), you should append `--ignore-platform-req=ext-pcntl --ignore-platform-req=ext-posix` to Composer commands (such as `composer require`, `composer update`, or `composer install`).

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

---

## Future Roadmap

The following features are planned for future releases of Bizkit:
- 📖 **Application Documentation**: A comprehensive documentation site/viewer built into the kit.
- 🔗 **Webhooks**: Outbound webhooks and subscription management for integrations.
- 🔑 **Permissions & Roles**: Advanced granular access control out of the box.

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

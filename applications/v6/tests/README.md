# E2E Test Module

This folder contains a standalone black-box end-to-end suite for the Weekly Planning application. The suite validates observable browser behavior and uses the public API only for deterministic setup and cleanup.

## Prerequisites

- Node.js 20+ and npm 10+
- A running application reachable through `BASE_URL`
- A bootstrap admin account that can authenticate through the login page
- Chromium installed through Playwright

## Installation

From [`/tests`](/c:/tese/app/v6/tests):

```bash
npm install
npx playwright install chromium
```

## Environment Variables

Create `tests/.env` from [`tests/.env.example`](/c:/tese/app/v6/tests/.env.example).

Required variables:

- `BASE_URL`: public application URL. Default in the config is `http://localhost`.
- `ADMIN_USERNAME`: username used by the login form and `/sessions` API.
- `ADMIN_PASSWORD`: admin password.

Example:

```env
BASE_URL=http://localhost
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin12345
```

Note: the authoritative API contract authenticates with `username` and `password`. Even though the requirements document publishes the admin email, the E2E suite needs the actual bootstrap username to log in.

## Run Locally

Headless:

```bash
npm test
```

Headed:

```bash
npm run test:headed
```

Debug mode:

```bash
npm run test:debug
```

HTML report:

```bash
npm run report
```

## Run In CI

Minimal CI flow:

```bash
cd tests
npm install
npx playwright install --with-deps chromium
npm test
```

Recommended CI environment variables:

- `BASE_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `CI=true`

## Testing Strategy

- Browser-first validation for login, navigation, role-based visibility, CRUD flows, planning behavior, and statistics export.
- Public API setup/cleanup for repeatable test data and safe teardown.
- Unique test data for people, projects, tasks, and weeks to avoid collisions.
- Reverse-order cleanup so dependent planning records are removed before projects and people.
- Single-worker execution enforced in [`playwright.config.ts`](/c:/tese/app/v6/tests/playwright.config.ts) to avoid concurrent data races.

## Covered Flows

- Authentication: successful login, failed login, logout, unauthenticated redirect.
- Authorization: viewer visibility restrictions, forbidden mutation attempts, viewer planning scope.
- Core flows: project CRUD, week CRUD, assignment/task lifecycle, persistence after reload.
- Business rules: required fields, invalid week range, duplicate assignment prevention, completed week read-only state.
- Admin-only export: statistics modal and `.xlsx` download.

## Folder Structure

- [`package.json`](/c:/tese/app/v6/tests/package.json): isolated test project and scripts.
- [`playwright.config.ts`](/c:/tese/app/v6/tests/playwright.config.ts): runner configuration, 1 worker, reporters, headless defaults.
- [`specs/`](/c:/tese/app/v6/tests/specs): E2E specifications.
- [`src/api.ts`](/c:/tese/app/v6/tests/src/api.ts): public API helpers for setup, teardown, and authorization probes.
- [`src/ui.ts`](/c:/tese/app/v6/tests/src/ui.ts): browser interaction helpers based on visible labels and roles.
- [`src/data.ts`](/c:/tese/app/v6/tests/src/data.ts): unique test data builders.
- [`src/cleanup.ts`](/c:/tese/app/v6/tests/src/cleanup.ts): reverse-order cleanup stack.

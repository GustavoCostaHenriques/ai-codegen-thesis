# E2E Test Module

This folder contains an isolated Playwright end-to-end suite for the Weekly Planning application.

## Prerequisites

- Node.js 20+ and npm 10+
- Chromium dependencies for Playwright
- Backend, frontend, and infrastructure already running
- Application reachable at `BASE_URL` (default: `http://localhost`)

## Installation

From project root:

```bash
cd tests
npm ci
npx playwright install chromium
```

## Environment Configuration

Create `tests/.env` from `tests/.env.example` and adjust values if needed:

```env
BASE_URL=http://localhost
E2E_ADMIN_EMAIL=admin@weekly.local
E2E_ADMIN_PASSWORD=admin12345
E2E_VIEWER_EMAIL=viewer@example.com
E2E_VIEWER_PASSWORD=viewer12345
```

Variables used by the suite:

- `BASE_URL`: application URL used by browser tests
- `E2E_ADMIN_EMAIL` / `E2E_ADMIN_PASSWORD`: admin test user credentials
- `E2E_VIEWER_EMAIL` / `E2E_VIEWER_PASSWORD`: viewer test user credentials

## Run Locally

```bash
cd tests
npm test
```

Useful variants:

```bash
npm run test:headed
npm run test:ui
npm run test:report
npm run check
```

## Run in CI

Example CI command sequence:

```bash
cd tests
npm ci
npx playwright install chromium
npm test
```

The suite is configured for CI-safe execution:

- headless browser
- retries on CI
- traces/screenshots/videos on failures
- `workers: 1` (single worker, no parallel worker execution)

## Testing Strategy

- Black-box E2E via browser interactions.
- Flows derived from `requirements/requirements.md` and `api/openapi.yaml`.
- Stable selectors by visible labels, modal titles, and input IDs.
- Unique test data per run (`timestamp + random`) to avoid collisions.
- Cleanup paths remove created data while respecting planning invariants:
  - tasks before projects
  - projects before person assignments
  - person assignments before week deletion

Coverage includes:

- Authentication:
  - successful login
  - failed login
  - logout
  - login required-field validation
- Authorization:
  - unauthenticated redirect
  - viewer read-only screens
  - viewer forbidden action controls hidden
  - viewer planning restricted to own card visibility
- Core business flows:
  - project create/list/update/delete
  - persistence check after reload
- Business rules:
  - task required-field rule
  - completed-week read-only planning behavior

## Folder Structure

```text
tests/
  e2e/
    authentication.spec.ts
    authorization.spec.ts
    projects-crud.spec.ts
    planning-business-rules.spec.ts
  support/
    auth.ts
    data.ts
    entities.ts
    env.ts
    ui.ts
  .env.example
  .gitignore
  package.json
  playwright.config.ts
  tsconfig.json
  README.md
```

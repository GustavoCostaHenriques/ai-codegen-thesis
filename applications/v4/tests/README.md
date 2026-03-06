# E2E Test Module (`tests/`)

Automated end-to-end suite for the Weekly Planning web application, implemented as a standalone Playwright module.

This suite validates behavior strictly from:
- `requirements/requirements.md`
- `api/openapi.yaml`
- externally observable UI/API behavior (black-box approach)

## 1) Prerequisites

- Node.js 20+ and npm
- Application stack already running and reachable from `BASE_URL`
- Test users available in the running system
- Chromium dependencies installed (or run `npm run install:browsers`)

## 2) Installation

From the project root:

```bash
cd tests
npm install
npm run install:browsers
```

## 3) Environment Variables

Create `tests/.env` from `tests/.env.example`:

```bash
cp .env.example .env
```

Required variables:

- `BASE_URL`: frontend application URL (example: `http://localhost`)
- `E2E_ADMIN_USERNAME`: admin login username/email
- `E2E_ADMIN_PASSWORD`: admin password
- `E2E_VIEWER_USERNAME`: viewer login username/email
- `E2E_VIEWER_PASSWORD`: viewer password

Recommended:

- `E2E_VIEWER_EMAIL`: viewer email used in UI assertions (required if `E2E_VIEWER_USERNAME` is not an email)
- `API_BASE_URL`: backend API URL used for explicit forbidden-operation checks (default fallback: `<BASE_URL-origin>/api/v1`)

## 4) Run Locally

From `tests/`:

```bash
npm test
```

Other useful commands:

```bash
npm run test:headed
npm run test:ui
```

## 5) Run in CI

Example GitHub Actions steps:

```yaml
- name: Install E2E dependencies
  working-directory: tests
  run: npm ci

- name: Install Chromium
  working-directory: tests
  run: npm run install:browsers

- name: Run E2E
  working-directory: tests
  env:
    BASE_URL: ${{ secrets.BASE_URL }}
    API_BASE_URL: ${{ secrets.API_BASE_URL }}
    E2E_ADMIN_USERNAME: ${{ secrets.E2E_ADMIN_USERNAME }}
    E2E_ADMIN_PASSWORD: ${{ secrets.E2E_ADMIN_PASSWORD }}
    E2E_VIEWER_USERNAME: ${{ secrets.E2E_VIEWER_USERNAME }}
    E2E_VIEWER_EMAIL: ${{ secrets.E2E_VIEWER_EMAIL }}
    E2E_VIEWER_PASSWORD: ${{ secrets.E2E_VIEWER_PASSWORD }}
  run: npm run test:ci
```

## 6) Testing Strategy Overview

- **Framework**: Playwright (`@playwright/test`) for stable CI-friendly browser automation.
- **Execution model**: independent tests, no arbitrary sleeps, explicit waits/expectations.
- **Authentication coverage**:
  - successful login
  - failed login
  - logout
- **Authorization coverage**:
  - anonymous user redirection
  - viewer role UI restrictions (hidden actions)
  - forbidden operation (`403`) validation
  - viewer planning visibility restricted to own cards
- **Core business flows**:
  - project CRUD (create/list/update/delete)
  - planning operations (add/remove person, project, task)
  - persistence after page reload
- **Business rules enforcement**:
  - required field validation
  - duplicate person/project assignment conflict handling
  - completed week read-only behavior

## 7) Folder Structure

```text
tests/
  .env.example
  .gitignore
  package.json
  playwright.config.ts
  tsconfig.json
  README.md
  specs/
    auth.e2e.spec.ts
    authorization.e2e.spec.ts
    admin-flows.e2e.spec.ts
  utils/
    env.ts
    data.ts
    auth.ts
    app-flows.ts
```

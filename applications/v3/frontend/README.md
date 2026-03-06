# Weekly Planning Frontend

Angular 19 frontend for weekly planning with JWT authentication, role-based UI, and strict OpenAPI-aligned integration.

## 1. Prerequisites

- Node.js 20+ (recommended)
- npm 10+
- Backend API running with the contract from `../api/openapi.yaml`

## 2. Installation Steps

```bash
cd frontend
npm install
```

## 3. Run the Development Server

```bash
npm start
```

Then open:

- `http://localhost:4200`

## 4. How to Connect to the Backend

By default, the frontend calls:

- `http://localhost:8080/api/v1`

Make sure your backend is running and reachable at that URL.

Login test users (from requirements):

- ADMIN: `admin@weekly.local` / `admin12345`
- VIEWER: `viewer@example.com` / `viewer12345`

## 5. Environment Configuration

API base URL is configured in:

- `src/environments/environment.ts`

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api/v1',
};
```

If your backend is exposed elsewhere (for example via reverse proxy), update `apiBaseUrl` accordingly.

## 6. How to Test Main Features

1. Login and authentication
- Open `/login`
- Login with admin or viewer credentials
- Validate automatic redirect to weeks page
- Use Logout in top nav

2. Account flows on login page
- Open `Create Account` modal and submit username/email/password
- Open `Change Password` modal and submit the required fields

3. Weeks overview
- ADMIN: create, edit, delete weeks and open planning
- VIEWER: verify no actions column/buttons on weeks table
- Check pagination controls

4. Weekly planning board
- Open a week to `/weeks/:weekId/planning`
- ADMIN in PLANNED week: add/remove person, project, task
- VIEWER or COMPLETED week: verify planning actions are hidden (read-only)

5. Person management
- ADMIN: create/edit/delete persons
- VIEWER: verify table is visible but without actions column

6. Project management
- ADMIN: create/edit/delete projects
- VIEWER: verify table is visible but without actions column

7. Internationalization
- On login screen change language between PT-PT and EN
- Verify labels/text update globally across screens

## 7. Project Structure Overview

```text
src/
  app/
    core/
      guards/         # auth and login route guards
      i18n/           # runtime i18n service and translate pipe
      interceptors/   # auth token interceptor + 401 handling
      models/         # OpenAPI-aligned TypeScript interfaces
      services/
        api/          # domain-specific HTTP services
    features/
      components/
        auth/         # login + create account + change password
        weeks/        # weeks overview and week modals
        planning/     # weekly planning board and planning modals
        persons/      # person management and modals
        projects/     # project management and modals
    shared/
      components/
        modal/        # reusable modal shell
        pagination/   # reusable pagination control
        top-nav       # shared navigation bar
  environments/
    environment.ts    # API base URL
```

## Tests and Build

Run unit tests:

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

Build the app:

```bash
npm run build -- --configuration development
```

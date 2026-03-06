# Weekly Planning Frontend (Angular)

Enterprise frontend for the Weekly Planning system.

## Prerequisites

- Node.js 20.x (or 18.19+)
- npm 10+
- Running backend implementing `api/openapi.yaml`

## Installation

```bash
cd frontend
npm install
```

## Run Development Server

```bash
cd frontend
npm start
```

Default URL:

- `http://localhost:4200`

## Backend Connection

This frontend is API-first and uses real HTTP requests.

Default API base URL:

- `http://localhost:8080/api/v1`

Ensure backend is running before login.

## Environment Configuration

Edit:

- `src/environments/environment.ts`
- `src/environments/environment.development.ts`

Example:

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api/v1'
};
```

## Authentication and Security

- Login/logout implemented with JWT Bearer session flow.
- Token attached via `auth-token.interceptor.ts`.
- Protected routes use guards (`auth.guard.ts`, `role.guard.ts`).
- UI hides restricted actions for non-admin users.
- Token persistence uses session scope (`sessionStorage`) plus in-memory state.

## Testing

Run unit tests:

```bash
cd frontend
npm test
```

Run production build check:

```bash
cd frontend
npm run build
```

## Project Structure

```text
frontend/
  src/
    app/
      core/
        guards/
        interceptors/
        models/
        services/
          api/
      features/
        auth/
        weeks/
        planning/
        persons/
        projects/
      shared/
        components/
        pipes/
        ui/
```

## API Contract Mapping

All API calls are implemented only through Angular services in:

- `src/app/core/services/api/auth-api.service.ts`
- `src/app/core/services/api/accounts-api.service.ts`
- `src/app/core/services/api/persons-api.service.ts`
- `src/app/core/services/api/projects-api.service.ts`
- `src/app/core/services/api/weeks-api.service.ts`
- `src/app/core/services/api/planning-api.service.ts`

These services follow the exact OpenAPI paths, methods, and DTO field names.

## i18n

Runtime language support includes:

- `EN`
- `PT-PT`

Implemented via `I18nService` and `TranslatePipe`.

## Notes

- Viewer role gets read-only management screens (no action buttons).
- Planning write actions are shown only for `ADMIN` and when week status is `PLANNED`.
- Week code display is derived in UI from `weekStart` date because the API week model has no explicit week-code field.

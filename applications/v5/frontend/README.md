# Weekly Planning Frontend

Angular frontend client for the Weekly Planning system, built API-first from:
- `requirements/requirements.md`
- `ui/ui-design.json`
- `api/openapi.yaml`
- `design-system/gra.css`

## Prerequisites
- Node.js `20.x`
- npm `10.x`
- Angular CLI `19.x` (optional, `npm scripts` use local CLI)
- Backend running and reachable at `http://localhost` (or configured API URL)

## Installation
```bash
cd frontend
npm install
```

## Run Development Server
```bash
npm start -- --host 127.0.0.1 --port 4200
```
Open: `http://127.0.0.1:4200`

## Backend Connection
The app calls the backend using real HTTP requests through Angular services only.

Default base URL:
- `src/environments/environment.ts`
- `src/environments/environment.development.ts`

```ts
apiBaseUrl: 'http://localhost'
```

If your backend runs on a different host/port, update `apiBaseUrl` in both files.

## Environment Configuration
Environment files:
- `src/environments/environment.ts`
- `src/environments/environment.development.ts`

Current keys:
- `production`
- `apiBaseUrl`

## Authentication / Authorization (3A on Client)
- Login endpoint: `POST /sessions`
- Logout endpoint: `DELETE /sessions/current`
- Password change endpoint: `POST /password-changes`
- JWT attached by `AuthInterceptor` to protected requests
- Route protection via `AuthGuard` and `GuestGuard`
- Token persistence in `sessionStorage` (not `localStorage`)
- Admin-only actions hidden in UI for non-admin users
- Optional client diagnostics via `EventLogService`

## Design System Integration
- Global stylesheet loaded from `public/assets/gra.css`
- Design-system JS loaded at runtime from `public/assets/main.js` by `DesignSystemService`
- Templates use `gra.css` classes for layout and components

## Testing
Run unit tests:
```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

## Build
```bash
npm run build -- --configuration development
```

## Project Structure
```text
src/
  app/
    core/
      guards/
      interceptors/
      services/
        api/
    shared/
      components/
      models/
      pipes/
      services/
    features/
      auth/
      weeks/
      planning/
      people/
      projects/
      shell/
  environments/
public/
  assets/      (gra.css + design system assets)
  img/
```

## API Coverage
Implemented endpoints include all operations defined in `api/openapi.yaml`, including:
- Sessions/Profile/Password
- People CRUD + pagination
- Projects CRUD + pagination
- Weeks CRUD + duplicate + pagination
- Planning board/day plans/projects/assignments/tasks operations
- Statistics export (`POST /statistics-exports`)

## Notes
- Frontend forms use Angular Reactive Forms with validations aligned to DTO constraints.
- Every async UI request uses loading flags with guaranteed reset on success/error (`finalize`).

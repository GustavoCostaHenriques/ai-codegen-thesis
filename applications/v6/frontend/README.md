# Weekly Planning Frontend

Angular frontend for the weekly planning application defined by:

- [`requirements/requirements.md`](../requirements/requirements.md)
- [`ui/ui-design.json`](../ui/ui-design.json)
- [`api/openapi.yaml`](../api/openapi.yaml)

This project is API-first. All frontend models, routes, services, and write operations follow the OpenAPI contract exactly.

## Prerequisites

- Node.js `20.x`
- npm `10.x`
- Backend API available at `http://localhost`

## Installation

```bash
npm install
```

## Run The Development Server

Verified command:

```bash
npm start -- --host 127.0.0.1 --port 4200
```

The app will be served at `http://127.0.0.1:4200`.

## Connect To The Backend

- Default API base URL: `http://localhost`
- The frontend sends real HTTP requests directly to the backend endpoints declared in [`api/openapi.yaml`](../api/openapi.yaml).
- JWT Bearer tokens are attached by the HTTP interceptor for protected requests.

Default test user from the requirements:

- Email: `admin@weekly.local`
- Password: `admin12345`
- Role: `ADMIN`

## Environment Configuration

Development:

- File: [`src/environments/environment.ts`](./src/environments/environment.ts)
- Key: `apiBaseUrl`

Production:

- File: [`src/environments/environment.production.ts`](./src/environments/environment.production.ts)
- Replaced automatically by the Angular production build.

Example:

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost',
  requestTimeoutMs: 15000,
};
```

## Build

Verified command:

```bash
npm run build
```

## Testing

Verified command:

```bash
npm test -- --watch=false
```

The test suite includes:

- Service tests for authenticated session creation and weeks querying
- Component tests for login validation/submission and weeks overview loading

## Project Structure

```text
src/
  app/
    core/
      guards/
      interceptors/
      models/
      services/
      utils/
    features/
      auth/
      people/
      planning/
      projects/
      statistics/
      weeks/
    layout/
    shared/
      pipes/
      ui/
  environments/
```

## Architectural Notes

- `components` handle view logic only.
- `services` own all API communication.
- `models` mirror the OpenAPI schema names and field names.
- `guards` protect authenticated routes.
- `interceptors` attach the JWT bearer token.
- Forms use reactive validation aligned to the backend DTO constraints.
- Viewer users are read-only in planning and do not see drag-and-drop sidebars.

## Available Screens

- Login with language selector and change-password modal
- Weeks overview with create/edit/duplicate/delete modals
- Weekly planning board with drag-and-drop assignment flow and task modal
- Person management
- Project management
- Statistics export confirmation modal

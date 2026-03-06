# Frontend - Weekly Planning

## 1) Prerequisites

- Node.js 20+
- npm 10+
- Angular CLI (`ng`) 19+
- Java 17+ (for the backend)

## 2) Bootstrap Commands Used

The project was bootstrapped with these exact commands:

```bash
ng new frontend --routing --defaults --skip-git
npm install
ng serve
```

## 3) Run the App

From `frontend/`:

```bash
ng serve
```

Then open `http://localhost:4200`.

The frontend uses a dev proxy so `/api` calls are forwarded to the backend on
`http://localhost:8080`.

## 4) Run the Backend (Local)

From `backend/`:

```powershell
.\mvnw.cmd spring-boot:run
```

- Base URL: `http://localhost:8080`
- API base path: `http://localhost:8080/api`

## 5) Real Backend Integration

- The frontend now calls the real backend API via `HttpClient`.
- API base path is configured as `/api` in:
  - `src/app/development/services/api-paths.ts`
- All URLs are built using OpenAPI-aligned paths from:
  - `src/app/development/services/api-paths.ts`
- Services that issue real HTTP requests:
  - `src/app/development/services/users-api.service.ts`
  - `src/app/development/services/projects-api.service.ts`
  - `src/app/development/services/weeks-api.service.ts`
  - `src/app/development/services/planning-api.service.ts`
- The mock backend remains in the repo for reference/testing only:
  - `src/app/development/services/mock-backend.service.ts`

## 6) API Path Mapping to openapi.yaml

OpenAPI paths are centralized in:

- `src/app/development/services/api-paths.ts`

This file mirrors the OpenAPI resource hierarchy exactly, including:

- `/users`, `/users/{userId}`
- `/projects`, `/projects/{projectId}`
- `/weeks`, `/weeks/{weekId}`, `/weeks/{weekId}/duplicate`
- `/weeks/{weekId}/days/{date}`
- `/weeks/{weekId}/days/{date}/users/{userId}`
- `/weeks/{weekId}/days/{date}/users/{userId}/projects/{projectId}`
- `/weeks/{weekId}/days/{date}/users/{userId}/projects/{projectId}/tasks/{taskId}`

Product routes are defined in:

- `src/app/development/development.routes.ts`

with API-aligned routing patterns such as:

- `weeks/:weekId/days`
- `weeks/:weekId/days/:date`
- `users/:userId`
- `projects/:projectId`

## 7) Verify End-to-End Integration

1. Start the backend (`backend/`):
   - `.\mvnw.cmd spring-boot:run`
2. Start the frontend (`frontend/`):
   - `ng serve`
3. In the browser (`http://localhost:4200`), perform the main flows:
   - Users: list, create, edit, delete
   - Projects: list, create, edit, delete
   - Weeks: list, create, edit, delete, duplicate
   - Planning: add user to day, assign project, add task, remove items
4. Confirm network calls hit `http://localhost:8080/api/...` in DevTools.

If you see `404`, `502`, or CORS errors, verify the backend is running and that
the frontend dev server is using `proxy.conf.json`.

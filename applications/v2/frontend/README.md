# Weekly Planning Frontend

Angular frontend integrated with the real Weekly Planning backend API.

## Integration Status

- Runtime mock backend usage is disabled.
- All API calls use Angular `HttpClient` through `ApiHttpService`.
- API URLs are built from centralized constants in `src/app/development/services/api-paths.ts`.
- API base path comes from environment config (`/api`).
- JWT is sent automatically for authenticated API calls via `src/app/core/interceptors/auth.interceptor.ts`.

## Prerequisites

Frontend:
- Node.js 20+
- npm 10+

Backend:
- Java 17+
- Docker Desktop (or Docker Engine with Compose)

## Run Backend Locally

From `c:\tese\app\v2\backend`:

```bash
docker compose -f src/main/docker/services.yml up -d
.\mvnw.cmd spring-boot:run
```

Expected backend URLs:
- Base URL: `http://localhost:8080`
- API base path: `http://localhost:8080/api`

## Run Frontend Locally

From `c:\tese\app\v2\frontend`:

```bash
npm install
npm run start
```

Expected frontend URL:
- `http://localhost:4200`

The frontend uses a dev proxy (`proxy.conf.json`) so calls to `/api/...` are forwarded to `http://localhost:8080/api/...`.

## API Configuration

- Environment config:
  - `src/environments/environment.ts`
  - `src/environments/environment.development.ts`
- `apiBasePath` is `/api`.
- No service hardcodes full backend URLs.

## End-to-End Verification Steps

1. Open `http://localhost:4200`.
2. In browser DevTools, open the Network tab and filter by `/api`.
3. On Login screen:
   - Create an account (Create Account modal).
   - Login with that account.
   - Confirm `POST /api/accounts` and `POST /api/auth/login` requests.
4. Validate Weeks Overview:
   - Load list, create week, edit week, delete week.
   - Confirm requests under `/api/weeks`.
5. Validate Weekly Planning screen:
   - Open a week and execute all Week Actions:
     - Add Person to Day
     - Add Project to Person
     - Add Task
     - Remove Task from Project
     - Remove Person from Day
     - Remove Project from Person
   - Confirm requests under `/api/weeks/{weekId}/...`.
6. Validate People Management:
   - Create, edit, delete person and list people.
   - Confirm requests under `/api/people`.
7. Validate Project Management:
   - Create, edit, delete project and list projects.
   - Confirm requests under `/api/projects`.

Success criteria:
- UI tables/cards update from backend responses.
- No operation depends on seeded in-memory mock data.
- Failed API calls show readable errors and app remains usable.

## Common Issues

- Backend not running:
  - Network calls fail and UI shows API error messages.
  - Start backend with the commands above.
- Unauthorized (`401`) or Forbidden (`403`):
  - Re-login to refresh JWT.
  - Verify role-based behavior (ADMIN vs VIEWER).
- CORS/proxy mismatch:
  - Run frontend with `npm run start` (uses Angular proxy).
  - Keep service URLs relative to `/api`.
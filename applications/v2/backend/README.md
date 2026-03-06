# Weekly Planning Backend (JHipster + OpenAPI)

This backend is implemented API-first against `../api/openapi.yaml`.
It uses Spring Boot + PostgreSQL + Liquibase and persists all data (including authentication accounts) in PostgreSQL.

## 1. Prerequisites

Required:
- Java 17+
- Docker Desktop (or Docker Engine with Compose v2)
- Maven wrapper (already included as `./mvnw`)

Optional:
- A local PostgreSQL server (only if you do not use Docker Compose)

## 2. Database Setup (Persistent)

### Recommended: Docker Compose PostgreSQL

The backend is configured to use PostgreSQL at `localhost:5432`.

Run from the `backend` folder:

```bash
cd backend
docker compose -f src/main/docker/services.yml up -d
```

What this does:
- Starts PostgreSQL and Redis containers.
- Uses a **named volume** for PostgreSQL data: `weeklyplanning-postgresql-data`.
- Keeps database data across container/app restarts.

Inspect persistence:

```bash
docker volume ls
docker volume inspect weeklyplanning-postgresql-data
```

Stop services (data is kept in the named volume):

```bash
docker compose -f src/main/docker/services.yml down
```

### Alternative: Local PostgreSQL (without Docker)

If you run PostgreSQL locally, configure a database named `weeklyplanning` and ensure:
- host: `localhost`
- port: `5432`
- user: `weeklyplanning` (or adjust config)

In this mode, persistence is handled by your local PostgreSQL data directory.

## 3. Spring Profiles and DB Configuration

Profile normally used for local development:
- `dev`

Where DB settings are defined:
- `src/main/resources/config/application-dev.yml`
- `src/main/resources/config/application-prod.yml`

Key settings:
- `spring.datasource.url`
- `spring.datasource.username`
- `spring.datasource.password`
- `spring.liquibase.contexts`

Notes:
- Liquibase runs on startup and creates/updates schema automatically.
- Hibernate second-level cache is disabled for dev and test profiles to improve debugging/test transparency.

## 4. Run the Backend

From `backend`:

```bash
./mvnw spring-boot:run
```

This starts the API at:
- `http://localhost:8080`

Depends on:
- A reachable PostgreSQL instance (Docker Compose recommended)

## 5. Run Tests

From `backend`:

```bash
./mvnw test
```

This runs unit/integration test classes included in the `test` phase and must complete successfully.

## 6. API Smoke Test (Auth + Planning)

Base URL:
- `http://localhost:8080/api`

### 6.1 Create an Account (public endpoint)

```bash
curl -X POST http://localhost:8080/api/accounts \
  -H "Content-Type: application/json" \
  -d '{"username":"admin_demo","password":"Password123!","role":"ADMIN"}'
```

### 6.2 Login (public endpoint) and get JWT

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin_demo","password":"Password123!"}'
```

Take `accessToken` from the response and set:

```bash
export TOKEN="<accessToken>"
```

### 6.3 Authenticated request example

```bash
curl -X GET http://localhost:8080/api/people \
  -H "Authorization: Bearer $TOKEN"
```

### 6.4 Planning endpoint example

1) Create a week:

```bash
curl -X POST http://localhost:8080/api/weeks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"startDate":"2026-03-02","endDate":"2026-03-06","status":"PLANNED"}'
```

2) Use returned `weekId` to read full planning:

```bash
curl -X GET http://localhost:8080/api/weeks/<weekId>/planning \
  -H "Authorization: Bearer $TOKEN"
```

## 7. What Works in This Iteration

- OpenAPI-defined authentication endpoints:
  - `POST /api/auth/login`
  - `POST /api/accounts`
- OpenAPI-defined People/Projects/Weeks CRUD-style endpoints with role-based access.
- OpenAPI-defined planning endpoints for add/remove person, project, and task.
- Persistent PostgreSQL via Docker named volume.
- Liquibase-managed schema startup.
- `./mvnw test` passing.

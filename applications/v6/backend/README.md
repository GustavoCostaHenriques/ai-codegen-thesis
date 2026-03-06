# Weekly Planning Backend

API-first enterprise backend for the Weekly Planning application, implemented with Java 17, Spring Boot, PostgreSQL, Liquibase, Redis support, JWT security, and strict layered MVC architecture.

## Prerequisites

- Java 17+
- Maven 3.9+
- Docker + Docker Compose (for local infrastructure)
- PostgreSQL 16+ (if running without Docker)

## Technology Stack

- Spring Boot 3.3
- Spring MVC, Spring Security, Spring Data JPA
- PostgreSQL
- Liquibase (versioned migrations)
- Redis (infrastructure integration)
- JWT (short-lived tokens)
- Apache POI (Excel statistics export)
- JUnit 5 + Mockito + Testcontainers

## Project Structure

```text
backend/
  src/main/java/com/example/weeklyplanning/
    config/          # Security/infrastructure/application properties
    domain/          # Entities + domain enums + invariants
    repository/      # Persistence access layer
    service/         # Business logic (method-level security)
    service/dto/     # API boundary DTOs (OpenAPI-aligned)
    service/mapper/  # Entity <-> DTO mapping
    web/rest/        # Thin REST controllers (OpenAPI paths/methods)
    web/rest/errors/ # Exception model and handlers
    security/        # JWT auth filter, principal, current user context
  src/main/resources/
    db/changelog/    # Liquibase migrations
    application.yml
  src/test/java/
    service/         # Unit tests
    web/rest/        # Controller integration tests
```

## Build Instructions

```bash
cd backend
mvn clean package
```

## Database Setup

### Option A: Docker Compose (recommended)

```bash
cd backend
set APP_JWT_SECRET=your-very-long-secret-at-least-32-characters
# PowerShell equivalent: $env:APP_JWT_SECRET='your-very-long-secret-at-least-32-characters'
docker compose up --build
```

This starts:
- PostgreSQL (`weekly-planning-db`)
- Redis (`weekly-planning-redis`)
- Backend (`weekly-planning-backend`) exposed at `http://localhost`

Liquibase runs automatically on startup.

### Option B: Manual PostgreSQL

Create DB/user and export:

- `DB_URL` (example: `jdbc:postgresql://localhost:5432/weekly_planning`)
- `DB_USERNAME`
- `DB_PASSWORD`
- `APP_JWT_SECRET` (required)

Then run `mvn spring-boot:run`.

## Run

```bash
cd backend
mvn spring-boot:run
```

Base URL: `http://localhost`

## Test

```bash
cd backend
mvn test
```

Notes:
- Unit tests cover service logic.
- Integration tests cover controller behavior.
- Integration tests use Testcontainers PostgreSQL (Docker required).

## Default Test User (created at initialization)

- Username: `admin`
- Email: `admin@weekly.local`
- Password: `admin12345`
- Role: `ADMIN`

## Environment Configuration

Key environment variables:

- `APP_JWT_SECRET` (required)
- `APP_JWT_EXPIRATION_SECONDS` (default: `900`)
- `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`
- `REDIS_HOST`, `REDIS_PORT`
- `APP_PASSWORD_MIN_LENGTH`
- `APP_PASSWORD_REQUIRE_UPPERCASE`
- `APP_PASSWORD_REQUIRE_LOWERCASE`
- `APP_PASSWORD_REQUIRE_DIGIT`
- `APP_PASSWORD_REQUIRE_SPECIAL`
- `APP_BRUTE_FORCE_MAX_ATTEMPTS`
- `APP_BRUTE_FORCE_WINDOW_SECONDS`
- `APP_BRUTE_FORCE_LOCK_DURATION_SECONDS`
- `APP_TASK_MIN_LENGTH`

## Security Overview (3A + CIA)

### Authentication

- JWT Bearer authentication
- Short-lived access tokens (default 15 minutes)
- Session persistence with token JTI tracking and revocation endpoint (`DELETE /sessions/current`)
- Configurable password policy
- Brute-force protection on login attempts

### Authorization

- Role model: `ADMIN`, `VIEWER`
- Method-level security (`@PreAuthorize`) in service layer
- Least-privilege enforcement in business operations
- Viewer planning visibility restricted to their own assignments in planning board endpoints

### Accounting / Auditing

- Authentication and critical operations logged in structured form
- Persistent audit records (`audit_log` table)
- Actor and timestamp captured for traceability

### CIA Controls

- Confidentiality: externalized secrets, no JWT secret hardcoded
- Integrity: DTO validation + business invariants + Liquibase schema constraints
- Availability: stateless API, `/actuator/health`, `/actuator/metrics`

## API Testing Quick Start

### 1. Login

```bash
curl -X POST http://localhost/sessions \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin12345"}'
```

### 2. Call secured endpoint

```bash
curl -X GET http://localhost/me \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### 3. Create person (ADMIN)

```bash
curl -X POST http://localhost/people \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Jane Doe",
    "username":"jane",
    "email":"jane@weekly.local",
    "password":"Pass1234",
    "role":"VIEWER",
    "status":"ACTIVE"
  }'
```

## OpenAPI Contract Compliance

Controllers and DTOs were implemented to match `api/openapi.yaml` contracts:
- exact paths
- exact methods
- exact request/response field names
- expected status code semantics

## Notes

- Migrations are versioned and immutable (`db/changelog`).
- This backend is prepared for production hardening (secure config externalization, auditing, RBAC, and stateless auth).

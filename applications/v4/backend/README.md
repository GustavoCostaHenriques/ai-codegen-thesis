# Weekly Planning Backend

API-first Spring Boot backend for weekly planning. The implementation is fully aligned with `api/openapi.yaml` and follows layered MVC with strict DTO boundaries.

## Prerequisites

- Java 17+
- Maven 3.9+
- PostgreSQL 16+ (mandatory)
- Redis 7+
- Docker + Docker Compose (optional, recommended)

## Tech Stack

- Spring Boot (Web, Validation, Security, Data JPA, Actuator, Redis)
- PostgreSQL
- Liquibase migrations
- JWT authentication
- Maven

## Environment Configuration

Create `.env` from `.env.example` and set values:

- `APP_JWT_SECRET` (required, at least 32 chars)
- `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`
- `REDIS_HOST`, `REDIS_PORT`
- Security controls:
  - `APP_JWT_EXPIRATION_SECONDS`
  - `APP_BRUTE_FORCE_MAX_ATTEMPTS`
  - `APP_BRUTE_FORCE_LOCK_MINUTES`
  - password policy variables

## Database Setup

### Option 1: Docker Compose

```bash
docker compose up -d database redis
```

### Option 2: Local PostgreSQL

Create database/user:

```sql
CREATE DATABASE weekly_planning;
CREATE USER weekly WITH PASSWORD 'weekly';
GRANT ALL PRIVILEGES ON DATABASE weekly_planning TO weekly;
```

Liquibase runs automatically at application startup.

## Build

```bash
mvn clean package
```

## Run

```bash
$env:APP_JWT_SECRET="super_secret_key_with_more_than_32_characters"
mvn spring-boot:run
```

App endpoints:

- API base: `http://localhost:8080/api/v1`
- Health: `http://localhost:8080/actuator/health`
- Metrics: `http://localhost:8080/actuator/metrics`

## Run with Docker

```bash
docker compose up --build
```

Docker compose exposes the backend at `http://localhost` (port 80), matching the test infrastructure requirement.

## Test

```bash
mvn test
```

Test coverage includes:

- Service unit tests (`src/test/java/com/example/weeklyplanning/service`)
- Controller integration tests with MockMvc (`src/test/java/com/example/weeklyplanning/web/rest`)

## Security Overview (3A + CIA)

### Authentication

- JWT bearer tokens (`/api/v1/auth/sessions`)
- Short-lived tokens (configurable expiration)
- Passwords hashed with BCrypt
- Brute-force protection with Redis-backed lockout (with in-memory fallback)
- Token revocation/blacklist on logout (`/api/v1/auth/sessions/current`)

### Authorization

- Method-level RBAC (`@PreAuthorize`)
- `ADMIN` required for mutating person/project/week/planning operations
- `VIEWER` restricted to read-only behavior and own planning cards on planning reads

### Accounting / Auditing

- Structured audit logs for authentication and critical entity operations
- Includes user and timestamp fields for external log ingestion

### CIA Controls

- Confidentiality: secrets externalized via env vars; no hardcoded JWT secret
- Integrity: DTO validation + service-layer invariants + Liquibase versioned schema
- Availability: stateless API, actuator health/metrics endpoints

## Predefined Test Users

Created automatically at startup if missing:

- `admin@weekly.local` / `admin12345` (`ADMIN`)
- `viewer@example.com` / `viewer12345` (`VIEWER`)

## Project Structure

- `src/main/java/com/example/weeklyplanning/domain`: entities + enums
- `src/main/java/com/example/weeklyplanning/repository`: persistence repositories
- `src/main/java/com/example/weeklyplanning/service`: business logic
- `src/main/java/com/example/weeklyplanning/service/dto`: API DTO models
- `src/main/java/com/example/weeklyplanning/service/mapper`: entity/DTO mapping
- `src/main/java/com/example/weeklyplanning/web/rest`: REST controllers
- `src/main/java/com/example/weeklyplanning/config`: infrastructure/security/bootstrap
- `src/main/resources/db/changelog`: Liquibase migrations

## API Contract Source of Truth

The backend contract is implemented from:

- `api/openapi.yaml` (absolute API truth)
- `requirements/requirements.md` (non-contract requirements)

No endpoint or schema outside OpenAPI is intentionally exposed by the REST layer.

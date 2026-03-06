# Weekly Planning Backend

Spring Boot backend for weekly planning, implemented API-first from `../api/openapi.yaml` and business rules from `../requirements/requirements.md`.

## Prerequisites

- Java 17+
- Maven 3.9+
- PostgreSQL 16+ (mandatory in all environments)
- Docker + Docker Compose (recommended for local DB/Redis)

## Database Setup (PostgreSQL Mandatory)

### Option 1: Docker Compose (recommended)

From `backend`:

```bash
docker compose up -d db redis
```

This creates:

- PostgreSQL on `localhost:5432`
- Database: `weekly_planning`
- User: `weekly`
- Password: `weekly`
- Persistent volume: `weekly_planning_db_data` (data survives restarts)

### Option 2: Existing PostgreSQL server

Create a database and user, then set environment variables:

- `DB_URL` (example: `jdbc:postgresql://localhost:5432/weekly_planning`)
- `DB_USER`
- `DB_PASSWORD`

Optional JWT/bootstrap variables:

- `JWT_SECRET`
- `JWT_ISSUER`
- `JWT_EXP_MINUTES`
- `BOOTSTRAP_ADMIN_USERNAME`
- `BOOTSTRAP_ADMIN_NAME`
- `BOOTSTRAP_ADMIN_EMAIL`
- `BOOTSTRAP_ADMIN_PASSWORD`

## Running the Backend

```bash
mvn spring-boot:run
```

Base API URL:

- `http://localhost:8080/api/v1`

Liquibase runs on startup (`src/main/resources/config/liquibase/master.xml`) and creates/updates schema in PostgreSQL.

A default ADMIN account is bootstrapped when the database has no accounts.

## Running Tests

```bash
mvn test
```

Notes:

- Unit tests cover service business logic.
- Integration tests cover critical controller endpoints.
- Hibernate second-level cache is disabled for dev/test profiles.

## Example API Calls

### 1. Register account (public)

```bash
curl -X POST http://localhost:8080/api/v1/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Viewer User",
    "email":"viewer@example.com",
    "password":"password123"
  }'
```

### 2. Login (public)

```bash
curl -X POST http://localhost:8080/api/v1/auth/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "username":"viewer@example.com",
    "password":"password123"
  }'
```

Use `accessToken` from response as bearer token.

### 3. Get current account

```bash
curl http://localhost:8080/api/v1/accounts/me \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### 4. Create project (ADMIN)

```bash
curl -X POST http://localhost:8080/api/v1/projects \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Atlas Migration",
    "code":"ATLAS",
    "status":"ACTIVE"
  }'
```

### 5. Create week (ADMIN)

```bash
curl -X POST http://localhost:8080/api/v1/weeks \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "weekStart":"2026-02-02",
    "weekEnd":"2026-02-08"
  }'
```

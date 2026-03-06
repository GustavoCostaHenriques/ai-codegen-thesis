# Weekly Planning Backend (Prototype)

This is a **minimal, testable** Spring Boot (JHipster) backend that implements the API defined in `src/main/resources/swagger/openapi.yaml`.

## Requirements

- Java 17+
- No Docker required
- No external database required (uses in-memory H2)

## Run (dev profile)

From `backend/`:

```powershell
.\mvnw.cmd spring-boot:run
```

- Active profile: `dev` (default)
- Base URL: `http://localhost:8080`
- API base path: `http://localhost:8080/api`

## Run tests

From `backend/`:

```powershell
.\mvnw.cmd test
```

## Quick API check (example)

Create a user:

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:8080/api/users -ContentType application/json -Body '{"name":"Alice","email":"alice@example.com","role":"USER"}'
```

List users:

```powershell
Invoke-RestMethod -Method Get -Uri http://localhost:8080/api/users
```

Notes:
- The API-first endpoints (`/api/users`, `/api/projects`, `/api/weeks`) are publicly callable in this prototype.
- Other generated JHipster endpoints may still require authentication.

# Local Dev Infrastructure

This folder provides a two-service Docker Compose setup for local development:
- `backend` (Spring Boot) on port 8080
- `frontend` (Angular static build served by Nginx) on port 80

## Prerequisites

- Docker Engine or Docker Desktop
- Docker Compose (v2 plugin)

## Start

Run from `infrastructure/`:

```bash
docker compose up --build
```

## Stop

```bash
docker compose down
```

## Exposed Ports

- Frontend: `http://localhost` (port 80)
- Backend: `http://localhost:8080`

## How Frontend Reaches Backend

The Nginx container proxies all `/api` requests to the backend service on the
Compose network:

- Browser calls: `http://localhost/api/...`
- Nginx forwards to: `http://backend:8080/api/...`

This avoids CORS and ensures the frontend talks to the backend by service name.

## Troubleshooting

- Wrong dist path / missing `index.html`:
  The frontend Dockerfile locates `index.html` dynamically under `dist/` after
  `npm run build`. If the build output is not under `dist/` or the build fails,
  the image build will stop. Check `frontend/angular.json` outputPath and the
  build logs.

- Invalid COPY path:
  Docker build context is the repo root (`..` from this folder). All `COPY`
  paths in Dockerfiles are relative to that root. If you move files, update the
  `COPY` paths or the build context accordingly.

- Backend Maven build constraints:
  The backend uses Strategy B (runs `./mvnw -DskipTests spring-boot:run`). If
  Maven enforcer or other plugin rules fail, you can add flags such as
  `-Denforcer.skip=true` in `infrastructure/backend/Dockerfile` or adjust the
  Maven config in the backend module.
# Infrastructure Module

This module orchestrates the full stack with Docker Compose and Traefik:

- `traefik` as the only public entrypoint (`80`/`443`)
- `frontend` behind Traefik
- `backend` behind Traefik
- `database` (PostgreSQL) on private network only
- `redis` on private network only
- `account-seeder` one-shot service to ensure the default VIEWER account exists

The backend and frontend source code are not modified by this module.

## 1) Prerequisites

- Docker Engine 24+
- Docker Compose plugin v2+

## 2) Environment Configuration

1. Create `infrastructure/.env` from `infrastructure/.env.example`.
2. Set secure values before production use, especially:
   - `POSTGRES_PASSWORD`
   - `JWT_SECRET`
   - `BOOTSTRAP_ADMIN_PASSWORD`
   - `VIEWER_PASSWORD`
3. Keep `infrastructure/.env` out of version control.

Important variables:

- Routing:
  - `APP_HOST` (default local host: `localhost`)
  - `FRONTEND_API_BASE_URL` (default: `http://localhost/api/v1`)
- Network names:
  - `PUBLIC_NETWORK_NAME`
  - `PRIVATE_NETWORK_NAME`
- TLS readiness:
  - `TRAEFIK_ACME_EMAIL`
- Data/auth:
  - `POSTGRES_*`
  - `JWT_*`
  - `BOOTSTRAP_ADMIN_*`
  - `VIEWER_*`

## 3) Run the Full Stack

From `infrastructure/`:

```bash
docker compose up -d --build
```

Access:

- App: `http://localhost`
- API through proxy: `http://localhost/api/v1`

Stop:

```bash
docker compose down
```

Stop and remove volumes (data reset):

```bash
docker compose down -v
```

## 4) Routing Behavior

Traefik is the single public entrypoint.

- `Host(APP_HOST)` routes to frontend.
- `Host(APP_HOST) && PathPrefix(/api/v1)` routes to backend.

Routing safety is explicitly enforced with:

- `traefik.docker.network=${PUBLIC_NETWORK_NAME}`

on both frontend and backend labels.

This prevents Traefik from selecting the wrong container network and avoids `502` caused by incorrect network binding.

HTTPS notes:

- `websecure` and ACME resolver are preconfigured.
- For production, set real DNS for `APP_HOST` and a valid `TRAEFIK_ACME_EMAIL`.
- Local `localhost` HTTPS certificates from Let's Encrypt are not issued; HTTP remains available for local execution.

## 5) Volumes and Persistence

Persistent volumes:

- `postgres_data`: PostgreSQL data files
- `redis_data`: Redis append-only data
- `letsencrypt_data`: Traefik ACME certificate store

Only the database/redis are stateful services; web services are stateless and restart-safe.

## 6) Security Overview (CIA)

Confidentiality:

- No secrets hardcoded in Compose.
- Secret material comes from environment variables.
- Database and Redis are not published to host ports.
- TLS entrypoint is preconfigured for production use.

Integrity:

- Persistent storage protects data durability.
- Private internal network isolates data layer traffic.
- Explicit network topology avoids accidental cross-service exposure.

Availability:

- `restart: unless-stopped` for long-running services.
- Health checks for Traefik, PostgreSQL, Redis, backend, and frontend.
- Backend can be horizontally scaled with:

```bash
docker compose up -d --scale backend=3
```

Traefik automatically load-balances scaled backend containers.

## 7) Development vs Production Concerns

Development defaults:

- `APP_HOST=localhost`
- HTTP enabled
- Local deterministic image builds for backend/frontend

Production guidance:

- Use stronger secret values and external secret management.
- Use real DNS hostname in `APP_HOST`.
- Enable certificate issuance by validating ACME reachability.
- Pin image tags in CI/CD and publish signed images.
- Add centralized log shipping and metrics/alerting.



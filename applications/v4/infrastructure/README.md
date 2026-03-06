# Infrastructure Module

This folder provides a deployment-only stack for local execution and production-oriented setup using Docker Compose and Traefik.

It orchestrates:
- `traefik` (single ingress)
- `frontend`
- `backend`
- `database` (PostgreSQL)
- `redis` (internal backend dependency)

No backend/frontend source code is modified by this module.

## 1) Prerequisites

- Docker Engine 24+ (or Docker Desktop with Linux containers)
- Docker Compose v2 (`docker compose`)

## 2) Configure Environment Variables

From repository root:

```powershell
Copy-Item infrastructure/.env.example infrastructure/.env
```

or:

```bash
cp infrastructure/.env.example infrastructure/.env
```

Then edit `infrastructure/.env` and set secure values at minimum:
- `POSTGRES_PASSWORD`
- `APP_JWT_SECRET`
- `LETSENCRYPT_EMAIL` (for production TLS)

## 3) Run the Full Stack

```powershell
Set-Location infrastructure
docker compose --env-file .env up --build -d
```

Validate status:

```powershell
docker compose --env-file .env ps
```

Stop:

```powershell
docker compose --env-file .env down
```

Stop and remove volumes:

```powershell
docker compose --env-file .env down -v
```

## 4) Routing

Traefik is the only public entry point:
- `http://localhost` -> frontend
- `http://localhost/api/v1` -> backend API
- `http://localhost/actuator/health` -> backend health

HTTPS is enabled at entrypoint level:
- `https://localhost` (local cert behavior)
- Production TLS is Let's Encrypt ready via resolver `letsencrypt` in `traefik/traefik.yml`.

Important routing safety:
- Public network has explicit name (`PUBLIC_NETWORK_NAME`).
- Every Traefik-exposed service sets:
  - `traefik.docker.network=${PUBLIC_NETWORK_NAME}`
  - `traefik.http.services.<svc>.loadbalancer.server.port=<internal-port>`

This avoids wrong-network selection and `502 Bad Gateway`.

## 5) Volumes

Persistent volumes:
- `POSTGRES_VOLUME_NAME` -> PostgreSQL data directory
- `TRAEFIK_ACME_VOLUME_NAME` -> Traefik ACME storage (`/letsencrypt/acme.json`)

Database data survives container recreation.

## 6) Security Overview (CIA)

Confidentiality:
- No secrets hardcoded in Compose files.
- Secrets are externalized via `.env`.
- Database and Redis are not published to host.
- TLS entrypoint and ACME resolver are configured.

Integrity:
- PostgreSQL uses persistent volume.
- Private network (`internal: true`) isolates backend data plane.
- Reverse proxy routing is explicitly pinned to the public network.

Availability:
- `restart: unless-stopped` on all services.
- Health checks for database, backend, frontend, and Redis.
- Stateless frontend/backend containers can be recreated safely.

## 7) Development and Production Notes

Local:
- Keep `APP_HOST=localhost`.
- Default `FRONTEND_API_BASE_URL=http://localhost/api/v1`.

Production:
- Set `APP_HOST` to your domain.
- Set a valid `LETSENCRYPT_EMAIL`.
- Use strong secrets and rotate them through secure secret management.
- Keep only Traefik ports `80/443` exposed.

## 8) Horizontal Scaling

Traefik load balances automatically across backend replicas:

```powershell
docker compose --env-file .env up --build -d --scale backend=3
```

Do not set `container_name` when scaling; this module is already configured accordingly.

# Infrastructure Module

This directory contains the local deployment and production-preparation layer for the weekly planning system. It orchestrates Traefik, the Angular frontend, the Spring Boot backend, PostgreSQL, and Redis without modifying application source code.

## Prerequisites

- Docker Engine 24+ or Docker Desktop with Compose v2
- At least 4 GB of RAM available to Docker
- Access the stack through `http://localhost` for local execution

## Files

- `docker-compose.yml`: full stack orchestration
- `.env.example`: environment variable template
- `traefik/traefik.yml`: Traefik static configuration
- `networks.md`: network isolation and routing notes
- `frontend.Dockerfile`: frontend image build that excludes host artifacts

## Configure Environment Variables

From this `infrastructure/` directory, create a real `.env` file.

PowerShell:

```powershell
Copy-Item .env.example .env
```

POSIX shell:

```bash
cp .env.example .env
```

Then edit `.env` and set at least:

- `POSTGRES_PASSWORD`
- `REDIS_PASSWORD`
- `APP_JWT_SECRET`

Local testing defaults intentionally keep the bootstrap admin required by the specification:

- Email: `admin@weekly.local`
- Password: `admin12345`
- Role: `ADMIN`

For production, replace the bootstrap password before first deployment.

## Run the Full Stack

From `infrastructure/`:

```bash
docker compose --env-file .env up --build -d
```

Follow logs if needed:

```bash
docker compose --env-file .env logs -f
```

Stop the stack:

```bash
docker compose --env-file .env down
```

Stop the stack and remove persistent data:

```bash
docker compose --env-file .env down -v
```

## How Routing Works

Traefik is the only service exposed to the host:

- `http://localhost`
- `https://localhost`

HTTP remains available for local automation. HTTPS is enabled on port `443`; locally Traefik serves its default certificate unless you add real certificates or enable the Let's Encrypt resolver for a public DNS name.

Routing rules:

- Browser navigation for SPA routes such as `/login`, `/weeks`, `/people`, and `/projects` goes to the frontend.
- API traffic goes to the backend.
- Because the SPA and API both use paths like `/weeks`, Traefik uses header-aware routing:
  - browser requests with `Accept: text/html` are sent to the frontend
  - API requests without `text/html` in the `Accept` header are sent to the backend
- Write operations (`POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`) for API paths are always routed to the backend.

The public network is explicitly named `weekly-planning-public`, and every Traefik-exposed service sets:

```text
traefik.docker.network=weekly-planning-public
```

This is required to avoid wrong-network upstream selection and `502 Bad Gateway` errors.

## How Volumes Work

Named volumes:

- `postgres_data`: persistent PostgreSQL data
- `redis_data`: Redis append-only persistence
- `traefik_letsencrypt`: Traefik ACME storage for future certificate issuance

Data survives `docker compose down`. Use `docker compose down -v` only when you intentionally want a full reset.

## Security Overview

- No application secrets are hardcoded in version-controlled runtime config.
- PostgreSQL and Redis are private services and are not exposed to the host.
- Redis is password-protected.
- PostgreSQL uses SCRAM host authentication.
- Traefik is the single ingress point on ports `80` and `443`.
- Backend and frontend are exposed only through Traefik labels.
- The backend joins both public and private networks; the database joins only the private network.
- Traefik health checks the frontend and backend upstreams before routing traffic.

## Frontend Artifact Safety

The repository already contains host-side artifacts such as `frontend/node_modules` and `frontend/dist`. The infrastructure layer avoids copying those into the Linux runtime image:

- the frontend build uses `frontend.Dockerfile`
- only `package*.json`, Angular config files, `public/`, and `src/` are copied
- host `node_modules` and `dist` are never copied into the container image

This keeps the build deterministic across Windows, macOS, and Linux hosts.

## Production Preparation

Before a public deployment:

1. Set `APP_HOST` to your public DNS name.
2. Replace all placeholder secrets in `.env`.
3. Replace `APP_BOOTSTRAP_ADMIN_PASSWORD`.
4. Set a real ACME email in `traefik/traefik.yml`.
5. Enable `tls.certresolver=letsencrypt` on the HTTPS routers if you want automatic Let's Encrypt certificates for the public hostname.
6. Scale the backend with Compose when needed, for example `docker compose up -d --scale backend=3`.

Traefik will automatically load-balance across backend replicas as long as they stay on `weekly-planning-public`.

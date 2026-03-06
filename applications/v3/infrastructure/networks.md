# Network Architecture

This stack uses two explicit Docker bridge networks:

## 1) Public Network

- Compose key: `public`
- Explicit name: `${PUBLIC_NETWORK_NAME}`
- Purpose: ingress traffic from Traefik to public web services.
- Attached services:
  - `traefik`
  - `frontend`
  - `backend`

## 2) Internal Network

- Compose key: `internal`
- Explicit name: `${PRIVATE_NETWORK_NAME}`
- `internal: true` is enabled to isolate data services from public ingress.
- Attached services:
  - `backend`
  - `database`
  - `redis`
  - `account-seeder`

## Routing Safety Rule

Traefik routing for `frontend` and `backend` is explicitly pinned with:

- `traefik.docker.network=${PUBLIC_NETWORK_NAME}`

This avoids incorrect network auto-selection and prevents `502 Bad Gateway` caused by Traefik trying to reach containers through the wrong Docker network.

## Exposure Policy

- Host-exposed ports:
  - `80` and `443` on `traefik` only.
- Not host-exposed:
  - `backend` app port
  - `database` port
  - `redis` port

This preserves least-privilege network access while keeping the full system reachable through the reverse proxy entrypoint.

# Network Architecture

The stack uses two explicit Docker networks:

- `weekly-planning-public`
  - Purpose: reverse-proxy traffic and any service that must be reachable through Traefik.
  - Attached services: `traefik`, `frontend`, `backend`.
  - Exposed to host: only `traefik` binds host ports `80` and `443`.

- `weekly-planning-private`
  - Purpose: east-west traffic for stateful internal services.
  - Attached services: `backend`, `database`, `redis`.
  - Host exposure: none.
  - Docker setting: `internal: true`, which prevents direct external access.

## Traffic Flow

1. Client requests enter through Traefik on `weekly-planning-public`.
2. Traefik forwards SPA requests to `frontend` on the public network.
3. Traefik forwards API requests to `backend` on the same public network.
4. `backend` reaches `database` and `redis` only through `weekly-planning-private`.
5. `database` and `redis` are never attached to the public network.

## Routing Safety

`frontend` and `backend` both join `weekly-planning-public`, and both set:

- `traefik.docker.network=weekly-planning-public`

This removes Traefik network ambiguity and prevents `502 Bad Gateway` errors caused by Docker selecting the wrong network for upstream traffic.

## Isolation Summary

- Public ingress is centralized in Traefik.
- Backend-to-database and backend-to-redis traffic stays on a private internal network.
- PostgreSQL is persisted with a named volume and is not reachable from the host.
- Redis is private and password-protected.

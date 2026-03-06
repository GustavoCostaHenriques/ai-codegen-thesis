# Network Topology

This deployment uses two explicit Docker bridge networks:

## 1) Public Network (`PUBLIC_NETWORK_NAME`)

- Connected services:
  - `traefik`
  - `frontend`
  - `backend`
- Purpose:
  - Traefik reaches frontend/backend through this network.
  - Only Traefik binds host ports (`80`, `443`).
- Safety controls:
  - `traefik.docker.network=${PUBLIC_NETWORK_NAME}` is set on all Traefik-exposed services.
  - Prevents Traefik from selecting the wrong network and causing `502 Bad Gateway`.

## 2) Private Network (`PRIVATE_NETWORK_NAME`)

- Connected services:
  - `backend`
  - `database`
  - `redis`
- Purpose:
  - Isolated east-west traffic for app dependencies.
  - PostgreSQL and Redis are not directly reachable from host or public network.
- Safety controls:
  - Network is created with `internal: true`.
  - No public port publishing on `database` and `redis`.

## Traffic Flow

1. Client -> `http://localhost` or `https://localhost` -> `traefik`
2. Traefik routes:
   - `Host(APP_HOST) && PathPrefix(/api or /actuator)` -> `backend:8080`
   - `Host(APP_HOST)` -> `frontend:80`
3. Backend accesses:
   - PostgreSQL via `database:5432` on private network
   - Redis via `redis:6379` on private network

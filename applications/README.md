# Applications (`v1` to `v6`)

This directory stores six iterative generations of the same domain application (Weekly Planning), used as thesis artifacts for comparison and evolution analysis.

## Generation Context

- Environment: Codex in VS Code
- Method: prompt engineering
- Constraint: each phase of each version was generated using one prompt

## Version Matrix

| Version | Main folders | Evolution focus |
| --- | --- | --- |
| `v1` | `requirements`, `ui`, `api`, `backend`, `frontend`, `infrastructure`, `backend_example`, `frontend_example` | Initial full scaffold and baseline architecture |
| `v2` | `requirements`, `ui`, `api`, `backend`, `frontend`, `infrastructure`, `backend_example`, `frontend_example` | Better integration between API contract and implementation |
| `v3` | `requirements`, `ui`, `api`, `backend`, `frontend`, `infrastructure`, `tests` | Consolidated structure with explicit test module |
| `v4` | `requirements`, `ui`, `api`, `backend`, `frontend`, `infrastructure`, `tests` | Stabilized and cleaner production-oriented variant |
| `v5` | `requirements`, `ui`, `api`, `backend`, `frontend`, `design-system` | Added dedicated design-system artifacts |
| `v6` | `requirements`, `ui`, `api`, `backend`, `frontend`, `design-system`, `infrastructure`, `tests` | Most complete composition (design-system + infra + tests) |

## Common Module Meaning

| Folder | Purpose |
| --- | --- |
| `requirements/` | Technical requirements and constraints |
| `ui/` | UI structure and interaction artifacts |
| `api/` | OpenAPI contracts |
| `backend/` | Spring Boot backend implementation |
| `frontend/` | Angular frontend implementation |
| `infrastructure/` | Runtime/deployment composition artifacts |
| `tests/` | Test artifacts (when present) |
| `design-system/` | Design tokens/component guidelines (v5/v6) |

## Usage

- Use this folder to compare generation quality across versions.
- Track structural evolution from baseline (`v1`) to fuller composition (`v6`).
- Cross-reference with prompts and n8n workflow snapshots for reproducibility.

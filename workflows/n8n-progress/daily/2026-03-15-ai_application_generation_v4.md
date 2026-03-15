# AI Application Generation v4

## End-to-End Orchestration

### What changed in this version

This version keeps the staged requirements -> design -> API pipeline from v3 and introduces post-API generation branches for:

- backend
- infrastructure
- tests

It also adds a compact-context step that reduces `requirements.md` and `openapi.yaml` into smaller artifacts before code generation.

### Stage handoff wiring

- `Start` triggers the requirements stage.
- After requirements approval, `REQ - Final File` routes to `Flow node 1`.
- `Flow node 1` fans out to:
  - `DESIGN - Start`
  - `Requirements and Design` input 1
  - `Flow node 7`
- After design approval:
  - `DESIGN - Final File` -> `Flow node 2` -> `Flow node 3` -> `DESIGN_FOR_API` -> `DESIGN_FOR_API FILE` -> `Requirements and Design`
- API branch continues only after that merge:
  - `Requirements and Design` -> `Flow node 4` -> `Flow node 5` -> `API - Start` -> `API - Build Prompt`
- After API approval:
  - `API - Final File` -> `Requirements and API`
- The requirements artifact is also preserved for post-API generation:
  - `Flow node 7` -> `Requirements and API`

## Requirements Module

### What this module already does

This module remains a ZIP-to-requirements pipeline with OCR extraction, chunk analysis, markdown generation, review packaging, and iterative refinement.

### Input and extraction

- `Start` form collects `requirementsZip`.
- `REQ - Decompress Zip` expands archive content.
- `REQ - Expand Zip for OCR` enforces PDF processing and rejects unsupported non-PDF entries.
- `REQ - OCR Extract Text` + `REQ - Parse Information` build normalized chunk prompts.
- `REQ - Analyze Chunk` + `REQ - Build Prompt` synthesize chunk evidence.
- `REQ - Generate Response` + `REQ - Clean Response` produce normalized requirements markdown.

### Review packaging and loops

- First-iteration package:
  - `REQ - First Iteration File` (`requirements.md`)
  - `REQ - First Iteration PDF` (`requirements.pdf`)
  - `REQ - Md and Pdf1` + `REQ - Zip to Review1` (`req.zip`)
  - `REQ - Create First Iteration Zip Link`
  - `REQ - Human Validation1`
- Current-iteration package:
  - `REQ - File to Review` + `REQ - Markdown to PDF` + `REQ - Md and Pdf` + `REQ - Zip to Review`
  - `REQ - Create Zip Link`
  - `REQ - Human Validation`
- Decision/refinement:
  - approved -> `REQ - Final File`
  - rejected -> optional edited PDF path (`REQ - Has Edited PDF`, `REQ - Read Edited PDF`) -> `REQ - Build Refinement Prompt` -> `REQ - Generate Refinement Response` -> `REQ - Response and Revision Number` -> `REQ - Clean Refinement Response` -> `REQ - Start Loop`
- Restart control:
  - `REQ - Start Again = Yes` returns to the first-iteration review package
  - `REQ - Start Again = No` continues the normal approval loop

## Design Module

### What this module already does

This remains a full design artifact stage with generation, packaging, human validation, restart handling, and refinement.

### Design generation and compilation

- `DESIGN - Build Prompt` uses the approved requirements document.
- `DESIGN - Generate Response` outputs DSL JSON.
- `DESIGN - Clean Response` validates DSL shape.
- `DESIGN - Compile DSL` validates the DSL and compiles it to Excalidraw JSON.
- `DESIGN - Final File` outputs `design.excalidraw.json`.
- `DESIGN_FOR_API` reduces the design to API-relevant structure only.
- `DESIGN_FOR_API FILE` exports `design_api.json`.

### Design review package and loops

- `DESIGN - Build Image ZIP` renders review PNG assets and packages them.
- `DESIGN - Create Zip Link` + `DESIGN - Link and Zip` + `DESIGN - Prepare Information` drive the current review path.
- `DESIGN - Is First Iteration` + `DESIGN - First Iteration Snapshot` + `DESIGN - First Iteration Bundle` support restart to the initial baseline.
- `DESIGN - Create First Iteration Zip Link` + `DESIGN - Prepare Information for First Iteration` + `DESIGN - Human Validation1` manage first-iteration review.
- `DESIGN - Human Validation` includes `Start Again`.
- `DESIGN - Loop Decision`:
  - approved -> `DESIGN - Resolve Final Excalidraw` -> `DESIGN - Final File`
  - rejected -> `DESIGN - Build Refinement Prompt` -> `DESIGN - Generate Refinement Response` -> `DESIGN - Previous and New Response` -> `DESIGN - Clean Refinement Response` -> `DESIGN - Start Loop`

## API Module

### What this module already does

This module still generates and refines OpenAPI YAML from approved requirements plus reduced design artifacts.

### Input merge and generation

- `Requirements and Design` merges:
  - approved requirements stream from `Flow node 1`
  - reduced design stream from `DESIGN_FOR_API FILE`
- `API - Build Prompt` reads:
  - binary `requirements`
  - binary `design_api`
- `API - Generate Response` + `API - Clean Response` produce normalized OpenAPI YAML.

### Review packaging and loops

- First-iteration package:
  - `API - First Iteration File` (`openapi.yaml`)
  - `API - First Iteration PDF` (`openapi.pdf`)
  - `API - Yaml and Pdf1` + `API - Zip to Review1` (`api.zip`)
  - `API - First Iteration Bundle`
  - `API - Create First Iteration Zip Link`
  - `API - Human Validation1`
- Current-iteration package:
  - `API - File to Review` + `API - YAML to PDF` + `API - Yaml and Pdf` + `API - Zip to Review`
  - `API - Create Zip Link`
  - `API - Human Validation`
- Decision/refinement:
  - approved -> `API - Final File`
  - rejected -> optional edited PDF path (`API - Has Edited PDF`, `API - Read Edited PDF`) -> `API - Build Refinement Prompt` -> `API - Generate Refinement Response` -> `API - Previous and New Response` -> `API - Clean Refinement Response` -> `API - Start Loop`
- Restart control:
  - `API - Start Again = Yes` returns to the first-iteration API package
  - `API - Start Again = No` continues the normal loop

## Backend Generation Module

### What this module is designed to do

This new module generates a backend project from the approved requirements and OpenAPI contract in two phases:

- structure planning
- chunked file implementation

### Context compaction and entry path

- `Requirements and API` is the merge point intended to combine:
  - `requirements.md` from the requirements stage
  - `openapi.yaml` from the API stage
- `BE - Compact Context Artifacts` compacts:
  - requirements markdown into `requirements-compact.txt`
  - OpenAPI into `openapi-compact.json`
- In this export, the backend branch is entered through `When clicking 'Execute workflow'` -> `BE - Compact Context Artifacts` -> `BE - Start`.

### Structure planning

- `BE - Build Prompt` combines compact requirements + compact OpenAPI.
- `BE - Generate Structure` asks the model for the full backend file plan.
- `BE - Clean Structure Response` validates and normalizes the returned JSON file list.
- `BE - Structure File` exports `backend-structure.json`.

### Chunked implementation loop

- `BE - Structure and Context` merges the file plan with prompt context.
- `BE - Init Generation State` initializes planned files, batch size, and iteration state.
- `BE - Build Chunk Prompt` prepares the current file batch plus short implementation memory.
- `BE - Generate Chunk` creates file contents for the current batch only.
- `BE - Clean Chunk Response` normalizes generated file outputs.
- `BE - Update Generation State` tracks generated files and advances the loop.
- `BE - More Files?` either:
  - loops back to `BE - Build Chunk Prompt`
  - or finishes at `BE - Assemble Backend Zip Inputs`
- `BE - Backend Zip` packages the generated backend files as `backend.zip`.

### Defaults and constraints

- Root directory must be `backend/`.
- The planned structure is required to follow layered MVC conventions.
- If requirements do not specify a backend stack, defaults are:
  - Java
  - Spring Boot
  - PostgreSQL

## Infrastructure Generation Module

### What this module is designed to do

This module plans and generates a deployment-only infrastructure module from requirements plus OpenAPI context.

### Structure planning and generation flow

- `INF - Build Prompt` reads compact requirements + compact OpenAPI.
- `INF - Generate Structure` defines the infrastructure file plan.
- `INF - Clean Structure Response` validates the planned file list.
- `INF - Structure File` exports `infrastructure-structure.json`.
- `INF - Structure and Context` -> `INF - Init Generation State` starts chunked generation.
- `INF - Build Chunk Prompt` -> `INF - Generate Chunk` -> `INF - Clean Chunk Response` -> `INF - Update Generation State` iterates in batches.
- `INF - More Files?` loops until completion.
- `INF - Assemble Infrastructure Zip Inputs` + `INF - Infrastructure Zip` package `infrastructure.zip`.

### Defaults and constraints

- Root directory must be `infrastructure/`.
- This branch is deployment-only and must not modify backend or frontend code.
- If requirements do not specify the stack, defaults are:
  - Docker Compose
  - Traefik
  - PostgreSQL

## Tests Generation Module

### What this module is designed to do

This module plans and generates a black-box end-to-end testing module from requirements plus OpenAPI context.

### Structure planning and generation flow

- `TEST - Build Prompt` reads compact requirements + compact OpenAPI.
- `TEST - Generate Structure` defines the tests file plan.
- `TEST - Clean Structure Response` validates the planned file list.
- `TEST - Structure File` exports `tests-structure.json`.
- `TEST - Structure and Context` -> `TEST - Init Generation State` starts chunked generation.
- `TEST - Build Chunk Prompt` -> `TEST - Generate Chunk` -> `TEST - Clean Chunk Response` -> `TEST - Update Generation State` iterates in batches.
- `TEST - More Files?` loops until completion.
- `TEST - Assemble Tests Zip Inputs` + `TEST - Tests Zip` package `tests.zip`.

### Defaults and constraints

- Root directory must be `tests/`.
- The module is black-box only and must not modify backend, frontend, or infrastructure code.
- If requirements do not specify the testing stack, defaults are:
  - Playwright
  - TypeScript

## Subworkflow Integration

- Requirements, Design, and API review packaging still call `Subworkflow - Create Link` (`workflowId: 0RaxdFxmbhyu1WYO`) to issue review ZIP download tokens and webhook links.
- The backend, infrastructure, and tests branches do not yet use review subworkflows in this export.

## Current Maturity and Wiring Notes

- v4 extends the artifact pipeline beyond API generation into code-generation-oriented backend, infrastructure, and tests modules.
- Requirements, Design, and API remain the only fully wired stages in the main end-to-end form-triggered orchestration.
- `Requirements and API` exists as the intended post-API merge point, but it has no outgoing connection in this export snapshot.
- The backend branch has a separate manual execution path through `When clicking 'Execute workflow'`, not through the main staged flow.
- `INF - Start` and `TEST - Start` have no incoming connections in this export, so those modules are present as scaffolding but are not yet wired into orchestration.
- The starter note mentions frontend generation, but there are no `FE` or frontend-generation nodes in this snapshot.
- Workflow metadata:
  - name: `AI Application Generation`
  - node count: 167
  - active: `false` in this export snapshot

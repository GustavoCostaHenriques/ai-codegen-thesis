# AI Application Generation v2

## Requirements Module

### What this module already does

This module is implemented as a ZIP-to-requirements pipeline with OCR, chunked extraction, review packaging, and iterative human-in-the-loop refinement.

### Input and preprocessing

- Entry point: `Start` form trigger collects `requirementsZip`.
- `REQ - Start` starts the requirements branch.
- `REQ - Decompress Zip` expands the uploaded archive.
- `REQ - Expand Zip for OCR` filters archive entries:
  - keeps PDF files for OCR
  - skips empty/system entries
  - throws explicit errors if non-PDF files are present
- `REQ - OCR Extract Text` runs OCR.
- `REQ - Parse Information` normalizes OCR output and creates overlapping chunk prompts.

### Requirements generation

- `REQ - Analyze Chunk` extracts evidence from each chunk.
- `REQ - Build Prompt` validates chunk coverage and builds the final synthesis prompt.
- `REQ - Generate Response` generates requirements markdown.
- `REQ - Clean Response` normalizes model output and extracts robust markdown text.

### First-iteration packaging and review

- `REQ - First Iteration File` creates `requirements.md`.
- `REQ - First Iteration PDF` creates `requirements.pdf`.
- `REQ - Md and Pdf1` + `REQ - Zip to Review1` build `req.zip`.
- `Merge` + `REQ - Create First Iteration Zip Link` + `REQ - Prepare Information for First Iteration` generate review metadata and download token.
- `REQ - Human Validation1` collects first-pass review.

### Refinement loop and restart behavior

- `REQ - Loop Decision`:
  - approved -> `REQ - Final File` (final `requirements.md`)
  - rejected -> refinement path
- Refinement path:
  - `REQ - Has Edited PDF` checks whether reviewer uploaded an edited PDF.
  - `REQ - Read Edited PDF` extracts edited PDF text when available.
  - `REQ - Build Refinement Prompt` merges reviewer feedback and edited PDF text, and computes deterministic semantic differences (including `REQ-xx` deltas and key-value field changes).
  - `REQ - Generate Refinement Response` requests a full corrected requirements document.
  - `REQ - Response and Revision Number` + `REQ - Clean Refinement Response` normalize next revision.
  - `REQ - Start Loop` re-packages current markdown + PDF and sends a new review package.
- `REQ - Human Validation` includes `Start Again`:
  - `Start Again = Yes` routes back to first-iteration package path
  - `Start Again = No` continues normal approve/reject decision flow

### Output to downstream modules

- `REQ - Final File` is wired to the design branch via `No Operation, do nothing1`.

## Design Module

### What this module already does

This module generates a structured UI DSL from requirements, compiles it to Excalidraw JSON, and derives a reduced design artifact for API generation.

### Generation and compilation flow

- `DESIGN - Read Prompt Template` loads an embedded prompt template.
- `DESIGN - Build Prompt` combines template + `requirements.md`.
- `DESIGN - Generate Response` generates DSL JSON.
- `DESIGN - Clean Response` parses and validates the DSL structure (`screens`, `modals`, `dialogs` arrays).
- `DESIGN - Compile DSL` (Python native) validates schema rules (IDs, types, colors, actions, table structure) and compiles to Excalidraw JSON.
- `DESIGN - DSL File` exports `design.json`.
- `DESIGN_FOR_API` transforms compiled design into reduced `design_api` structure.
- `DESIGN_FOR_API FILE` exports `design_api.json`.

## API Module

### What this module is designed to do

This module generates and iteratively refines an OpenAPI YAML contract from requirements and reduced design artifacts.

### API generation flow

- `API - Requirements and Design` feeds `API - Build Prompt`.
- `API - Build Prompt` expects binaries:
  - `requirements` (`requirements.md`)
  - `design_api` (`design_api.json`)
- `API - Generate Response` creates OpenAPI output.
- `API - Clean Response` extracts and validates YAML, enforcing `openapi:` start.

### First-iteration packaging and review

- `API - First Iteration File` creates `openapi.yaml`.
- `API - First Iteration PDF` creates `openapi.pdf`.
- `API - Yaml and Pdf1` + `API - Zip to Review1` build `api.zip`.
- `API - First Iteration Bundle` + `API - Create First Iteration Zip Link` + `API - Prepare Information for First Iteration` generate review metadata and download token.
- `API - Human Validation1` collects first-pass review.

### Refinement loop and restart behavior

- `API - Loop Decision`:
  - approved -> `API - Final File` (final `openapi.yaml`)
  - rejected -> refinement path
- Refinement path:
  - `API - Has Edited PDF` checks for edited PDF upload.
  - `API - Read Edited PDF` extracts edited PDF text.
  - `API - Build Refinement Prompt` merges reviewer feedback + optional edited PDF text + current YAML.
  - `API - Generate Refinement Response` requests a full corrected OpenAPI YAML document.
  - `API - Clean Refinement Response` normalizes YAML.
  - `API - Start Loop` re-packages current YAML + PDF and sends updated review package.
- `API - Human Validation` includes `Start Again`:
  - `Start Again = Yes` routes back to first-iteration API package path
  - `Start Again = No` continues normal approve/reject decision flow

## Subworkflow Integration

- Requirements and API modules call `Subworkflow - Create Link` (`workflowId: cm1GIz1gCaLNP7YB`) to issue review ZIP download tokens and webhook download links.

## Current Maturity and Wiring Notes

- Compared with v1, this version includes:
  - explicit first-iteration review tracks
  - `Start Again` fallback paths
  - full design generation/compilation branch between requirements and API
  - edited-PDF-aware refinement on both requirements and API modules
- Important wiring risk to verify:
  - `API - Build Prompt` requires both `requirements` and `design_api` binaries
  - `API - Requirements and Design` currently has a single visible incoming main connection (`DESIGN_FOR_API FILE`)
  - `DESIGN_FOR_API` returns JSON only and does not explicitly pass binary data forward
  - this can break automatic end-to-end API generation unless requirements binary is preserved elsewhere at runtime
- Workflow metadata:
  - name: `AI Application Generation`
  - node count: 87
  - active: `false` in this export snapshot


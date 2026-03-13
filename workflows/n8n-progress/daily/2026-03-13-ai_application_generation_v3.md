# AI Application Generation v3

## End-to-End Orchestration

### What changed in this version

This version upgrades the pipeline to full staged orchestration with human validation loops in all three major artifacts:

- Requirements
- Design
- API

The workflow now includes explicit flow-gate nodes (`Flow node 1` to `Flow node 5`) to control stage handoff order.

### Stage handoff wiring

- `Start` triggers the requirements stage.
- After requirements approval, `REQ - Final File` routes to `Flow node 1`.
- `Flow node 1` fans out to:
  - `DESIGN - Start` (begin design generation)
  - `API - Requirements and Design` (hold requirements branch for API merge)
- After design approval:
  - `DESIGN - Final File` -> `Flow node 2` -> `Flow node 3` -> `DESIGN_FOR_API` -> `DESIGN_FOR_API FILE` -> `API - Requirements and Design`
- API branch continues only after merge:
  - `API - Requirements and Design` -> `Flow node 4` -> `Flow node 5` -> `API - Start` -> `API - Build Prompt`

## Requirements Module

### What this module already does

This module remains a ZIP-to-requirements pipeline with OCR extraction, chunk analysis, markdown generation, review packaging, and iterative refinement.

### Input and extraction

- `Start` form collects `requirementsZip`.
- `REQ - Decompress Zip` expands archive content.
- `REQ - Expand Zip for OCR` enforces PDF path and rejects unsupported non-PDF entries.
- `REQ - OCR Extract Text` + `REQ - Parse Information` build normalized chunk prompts.
- `REQ - Analyze Chunk` + `REQ - Build Prompt` synthesize chunk evidence.
- `REQ - Generate Response` + `REQ - Clean Response` produce normalized requirements markdown.

### Review packaging and loops

- First-iteration package:
  - `REQ - First Iteration File` (`requirements.md`)
  - `REQ - First Iteration PDF` (`requirements.pdf`)
  - `REQ - Zip to Review1` (`req.zip`)
  - `REQ - Create First Iteration Zip Link`
  - `REQ - Human Validation1`
- Current-iteration package:
  - `REQ - File to Review` + `REQ - Markdown to PDF` + `REQ - Zip to Review`
  - `REQ - Create Zip Link`
  - `REQ - Human Validation`
- Decision/refinement:
  - `REQ - Loop Decision` approved -> `REQ - Final File`
  - rejected -> optional edited PDF path (`REQ - Has Edited PDF`, `REQ - Read Edited PDF`) -> `REQ - Build Refinement Prompt` -> `REQ - Generate Refinement Response` -> `REQ - Clean Refinement Response` -> `REQ - Start Loop`
- Restart control:
  - `REQ - Start Again = Yes` routes back to first-iteration review package
  - `REQ - Start Again = No` continues normal approve/reject loop

## Design Module

### What this module already does

This is a full design artifact stage in v3 with its own generation, packaging, human validation, restart path, and refinement loop.

### Design generation and compilation

- `DESIGN - Read Prompt Template` loads the embedded DSL prompt.
- `DESIGN - Build Prompt` injects requirements content.
- `DESIGN - Generate Response` outputs DSL JSON.
- `DESIGN - Clean Response` validates DSL shape (`screens`, `modals`, `dialogs` arrays).
- `DESIGN - Compile DSL` (Python native):
  - validates DSL schema constraints
  - compiles DSL to Excalidraw JSON
  - stores compiled design in JSON (`design`)

### Design review package (PNG ZIP)

- `DESIGN - Build Image ZIP` (Python native + Pillow):
  - computes frame extents for screens/modals/dialogs
  - renders `overview.png`
  - renders per-frame PNGs into `screens/`, `modals/`, `dialogs/`
  - builds `reviewZip` (`design-assets-r{revision}.zip`)
  - emits asset manifest metadata
- `DESIGN - Create Zip Link` stores package in subworkflow and returns token/link.
- `DESIGN - Link and Zip` + `DESIGN - Prepare Information` send data to review wait nodes.

### First-iteration baseline and restart behavior

- `DESIGN - Is First Iteration` detects `revisionNumber === 0`.
- `DESIGN - First Iteration Snapshot` captures immutable first-iteration DSL baseline.
- `DESIGN - First Iteration Bundle` merges baseline/current signals for restart route.
- `DESIGN - Create First Iteration Zip Link` + `DESIGN - Prepare Information for First Iteration` + `DESIGN - Human Validation1` manage first-iteration review.
- `DESIGN - Human Validation` includes `Start Again`:
  - `Yes` -> first-iteration bundle route
  - `No` -> normal loop decision

### Design refinement and finalization

- `DESIGN - Loop Decision`:
  - approved -> `DESIGN - Resolve Final Excalidraw` -> `DESIGN - Final File` (`design.excalidraw.json`)
  - rejected -> `DESIGN - Build Refinement Prompt` -> `DESIGN - Generate Refinement Response` -> `DESIGN - Clean Refinement Response` -> `DESIGN - Start Loop`
- Refinement prompt is feedback-driven and requires full corrected DSL JSON output (not patch diffs).

## API Module

### What this module already does

This module generates and refines OpenAPI YAML using requirements + reduced design input.

### Input merge and generation

- `API - Requirements and Design` is now stage-gated and receives both branches:
  - requirements stream from `Flow node 1`
  - design API stream from `DESIGN_FOR_API FILE`
- `API - Build Prompt` reads:
  - binary `requirements` (`requirements.md`)
  - binary `design_api` (`design_api.json`)
- `API - Generate Response` + `API - Clean Response` produce normalized OpenAPI YAML.

### Review packaging and loops

- First-iteration package:
  - `API - First Iteration File` (`openapi.yaml`)
  - `API - First Iteration PDF` (`openapi.pdf`)
  - `API - Zip to Review1` (`api.zip`)
  - `API - Create First Iteration Zip Link`
  - `API - Human Validation1`
- Current-iteration package:
  - `API - File to Review` + `API - YAML to PDF` + `API - Zip to Review`
  - `API - Create Zip Link`
  - `API - Human Validation`
- Decision/refinement:
  - `API - Loop Decision` approved -> `API - Final File`
  - rejected -> optional edited PDF path (`API - Has Edited PDF`, `API - Read Edited PDF`) -> `API - Build Refinement Prompt` -> `API - Generate Refinement Response` -> `API - Clean Refinement Response` -> `API - Start Loop`
- Restart control:
  - `API - Start Again = Yes` returns to first-iteration API package
  - `API - Start Again = No` continues normal loop

## Subworkflow Integration

- Requirements, Design, and API modules all call `Subworkflow - Create Link` (`workflowId: cm1GIz1gCaLNP7YB`) for review ZIP tokenized download links.

## Current Maturity and Wiring Notes

- High maturity for staged orchestration:
  - requirements, design, and API each have review + refinement loops
  - first-iteration restart paths exist in all three stages
  - stage-to-stage handoff is explicitly gated through flow nodes
- v2 wiring risk is structurally addressed in this version because API merge now has explicit requirements and design branches.
- Operational dependency to keep in mind:
  - design image packaging relies on Python native execution with Pillow (`PIL`) in the n8n environment.
- Workflow metadata:
  - name: `AI Application Generation`
  - node count: 115
  - active: `false` in this export snapshot

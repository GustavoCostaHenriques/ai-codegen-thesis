# Subworkflows Method v1

## Overview

This folder contains a complete modular n8n pipeline for AI-assisted software generation with human review loops and downloadable artifacts at each stage.

Included workflow files:

- `main-orchestrator.json`
- `requirements-workflow.json`
- `design-workflow.json`
- `api-workflow.json`
- `backend-workflow.json`
- `frontend-workflow.json`
- `infrastructure-workflow.json`
- `tests-workflow.json`
- `Subworkflow - Create Link.json`

## Current snapshot status (right now)

Workflow IDs:

- `main-orchestrator`: `YiifzvALf6abhZnB`
- `requirements-workflow`: `XAdWquYoHZ6lvPvT`
- `design-workflow`: `jC1AUZvgAX3hPGaX`
- `api-workflow`: `PLCei3E4WVIlx4sf`
- `backend-workflow`: `kHkMVIEmwo2bg3Qw`
- `frontend-workflow`: `yN8cYN6dA9Ztvi4h`
- `infrastructure-workflow`: `DcoGbEIUb6nok9Y0`
- `tests-workflow`: `h7qFrKACAcRj8pcN`
- `Subworkflow - Create Link`: `Se3rPyRTvgimNBXz`

Active flags:

- `Subworkflow - Create Link`: `true`
- All other workflows in this folder: `false`

Wiring check:

- `main-orchestrator` references all module workflows with matching IDs.
- All module `Create Zip Link` nodes reference `Subworkflow - Create Link` with matching ID.
- No ID mismatch was found in this snapshot.

## End-to-end execution flow

1. `main-orchestrator` starts from a form trigger and asks for one input file: `requirementsZip` (`.zip`).
2. It runs module stages in sequence with human approval between stages:
   - Requirements
   - Design
   - API
   - Backend
   - Frontend
   - Infrastructure
   - Tests
3. Each module produces a review artifact ZIP and a download link.
4. After all modules are approved, `main-orchestrator` builds one final application ZIP and provides a final download page.

## Human review/refinement pattern (all stages)

Each stage in `main-orchestrator` follows this loop:

1. Execute stage subworkflow.
2. Store generated iteration history.
3. Show a dynamic review form (`REQ/DESIGN/API/BE/FE/INF/TEST - Review`) with:
   - `Approved` (`approved` or `rejected`)
   - `Restore older iteration` (`Yes`/`No`)
   - `Iteration to restore`
   - `Attachments` (optional)
   - `Feedback`
4. If restore is selected, the selected older iteration is restored and reviewed again.
5. If approved, move to next stage.
6. If rejected, stage is re-executed with `reviewMode: "refine"` and feedback/attachments context.

## Workflows

### 1) `Subworkflow - Create Link`

Purpose:

- Central artifact storage and download endpoint for review and final ZIPs.

Entry points:

- `Execute Workflow Trigger` for internal calls.
- `Review Download Webhook` (`/webhook/review-download-file`) for external download.

Input contract:

- `archiveMimeType`
- `archiveFileName`
- `archiveData`
- `archiveId`
- `archiveBinaryProperty`
- `revisionNumber` (number)
- `response`

Behavior:

- Stores artifacts in workflow global static data (`reviewZips`).
- Generates token `api_draft_<timestamp>_<random>`.
- Keeps `latestReviewZipToken`.
- Removes entries older than 24 hours lazily when storing.
- Returns `zipDownloadToken` + `zipDownloadUrl`.
- Webhook resolves by token, else fallback to latest/newest artifact.

### 2) `requirements-workflow`

Purpose:

- Converts `requirementsZip` into reviewed requirements deliverables.

What it does:

- Decompresses input ZIP.
- Filters/validates acceptable files for OCR/text extraction.
- Extracts text (OCR or direct text path).
- Chunks and analyzes content with LLM.
- Synthesizes final requirements markdown.
- Generates requirements PDF.
- Builds review ZIP (`req.zip`) containing markdown + PDF.
- Calls `Subworkflow - Create Link` for downloadable review link.

Refinement mode:

- Triggered when `reviewMode == "refine"`.
- Uses reviewer feedback and optional attachments to regenerate artifacts.

### 3) `design-workflow`

Purpose:

- Generates and reviews visual design artifacts from approved requirements.

What it does:

- Creates design DSL with LLM.
- Compiles DSL into Excalidraw JSON (`DESIGN - Compile DSL`, Python).
- Renders PNG assets and packages ZIP (`DESIGN - Build Image ZIP`, Python).
- Calls `Subworkflow - Create Link`.

Refinement mode:

- Re-runs generation based on feedback + attachments + existing draft context.

### 4) `api-workflow`

Purpose:

- Generates and reviews OpenAPI artifacts from requirements + design.

What it does:

- Converts design into API-focused reduced context (`DESIGN_FOR_API`).
- Uses requirements + reduced design in prompt.
- Generates OpenAPI YAML with LLM.
- Converts YAML to `openapi.yaml` and PDF.
- Builds review ZIP (`api.zip`).
- Calls `Subworkflow - Create Link`.

Refinement mode:

- Uses feedback, attachments, and current OpenAPI draft to regenerate full corrected YAML.

### 5) `backend-workflow`

Purpose:

- Generates and reviews backend code package.

What it does:

- Compacts context artifacts for prompt efficiency.
- Generates backend structure plan.
- Uses iterative batch file generation loop:
  - initialize state
  - generate batch
  - update state
  - repeat until no remaining files
- Produces `backend-structure.json` and `backend.zip`.
- Calls `Subworkflow - Create Link`.

Refinement mode:

- Builds refinement plan (`create/modify/remove` file actions).
- Unpacks current ZIP, applies iterative updates, repacks, republishes link.

### 6) `frontend-workflow`

Purpose:

- Generates and reviews frontend code package.

What it does:

- Same iterative/batch architecture as backend.
- Prompt context includes compacted requirements + OpenAPI + design.
- Produces `frontend-structure.json` and `frontend.zip`.
- Calls `Subworkflow - Create Link`.

Refinement mode:

- Same plan/apply/repack loop pattern used in backend.

### 7) `infrastructure-workflow`

Purpose:

- Generates and reviews infrastructure package.

What it does:

- Same iterative/batch architecture.
- Prompt context includes compacted requirements + OpenAPI.
- Produces `infrastructure-structure.json` and `infrastructure.zip`.
- Calls `Subworkflow - Create Link`.

Refinement mode:

- Same refinement plan and iterative application flow.

### 8) `tests-workflow`

Purpose:

- Generates and reviews tests package.

What it does:

- Same iterative/batch architecture.
- Prompt context includes compacted requirements + OpenAPI.
- Produces `tests-structure.json` and `tests.zip`.
- Calls `Subworkflow - Create Link`.

Refinement mode:

- Same refinement plan and iterative application flow.

### 9) `main-orchestrator`

Purpose:

- Orchestrates the entire pipeline, approvals, iteration history, and final packaging.

UI nodes:

- Start form trigger (`Start`) with required `Requirements ZIP` file.
- Stage review forms for every module.
- Final completion form (`FINAL - Done`) with generated HTML.

Final packaging path:

- `FINAL - Merge Artifacts` combines 5 streams:
  - requirements/design/api context stream
  - `backendZip`
  - `frontendZip`
  - `infrastructureZip`
  - `testsZip`
- `FINAL - Prepare Static Artifacts` ensures:
  - `requirements/requirements.md`
  - `design/design.excalidraw.json`
  - `api/openapi.yaml`
- Unpacks module ZIPs and normalizes all paths into:
  - `backend/`
  - `frontend/`
  - `infrastructure/`
  - `tests/`
- Validates bundle integrity and rejects nested ZIPs in module folders.
- Creates final ZIP file: `application-generation-<timestamp>.zip`.
- Calls `Subworkflow - Create Link` to generate final download URL.
- Builds final completion page HTML with download action.

## Expected final ZIP structure

- `requirements/requirements.md`
- `design/design.excalidraw.json`
- `api/openapi.yaml`
- `backend/**`
- `frontend/**`
- `infrastructure/**`
- `tests/**`

## Operational notes

- Download endpoint is `/webhook/review-download-file`.
- Review/final ZIP links are backed by workflow static data (in-workflow storage, not external persistence).
- Module workflows sanitize review-only fields and attachment binaries before passing context forward.

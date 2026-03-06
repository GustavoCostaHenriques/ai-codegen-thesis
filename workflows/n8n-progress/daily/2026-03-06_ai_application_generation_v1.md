# AI Application Generation v1

## Requirements Module

### What this module already does

This module is implemented as a full extraction-generation-review-refinement pipeline that produces a requirements document from uploaded context files.

### Input and preprocessing

- Entry point: `REQ - Start` receives the uploaded `requirementsZip` from the main form trigger.
- `REQ - Decompress Zip` expands the archive.
- `REQ - Expand Zip for OCR` filters files and currently enforces a PDF-only OCR path.
- If non-PDF files are present in this branch, the workflow throws an explicit error.

### Requirements extraction and synthesis

- `REQ - OCR Extract Text` runs OCR on each PDF.
- `REQ - Parse Information` normalizes OCR text, chunks content with overlap, and creates chunk-level extraction prompts.
- `REQ - Analyze Chunk` extracts requirement evidence per chunk.
- `REQ - Aggregate Chunk Insights` validates chunk coverage and builds synthesis batches.
- `REQ - Synthesize Chunk Batch` consolidates batch evidence.
- `REQ - Build Prompt` composes a final merged prompt from all synthesized batches.
- `REQ - Generate Response` produces the markdown requirements draft.
- `REQ - Clean Response` robustly extracts usable markdown from model output formats (raw text, fenced blocks, JSON wrappers, labelled fields).

### Packaging for review

- `REQ - File to Review` converts response text to `requirements.md`.
- `REQ - Markdown to PDF` generates `requirements.pdf` directly in a code node.
- `REQ - Md and Pdf` merges markdown and pdf binaries.
- `REQ - Zip to Review` creates `req.zip` with both files.
- `REQ - Text and Zip` + `REQ - Create Zip Link` + `REQ - Prepare Information` prepare review metadata, download link/token, and revision state.

### Human validation and refinement loop

- `REQ - Human Validation` presents:
  - approve/reject decision
  - optional edited PDF upload
  - textual feedback
- `REQ - Loop Decision`:
  - approved -> `REQ - Final File` (final `requirements.md` binary output)
  - rejected -> refinement path
- Refinement path:
  - `REQ - Has Edited PDF` checks if an edited PDF was uploaded.
  - `REQ - Read Edited PDF` extracts edited PDF text when present.
  - `REQ - Build Refinement Prompt` builds a strict patch prompt, including detected semantic differences between current markdown and edited PDF text.
  - `REQ - Generate Refinement Response` returns line-based patch instructions.
  - `REQ - Parse Changes` parses patch lines.
  - `REQ - Apply Changes` applies patches to current markdown.
  - Updated draft is re-packaged and sent again to human validation.

### Current maturity of this module

- High implementation maturity.
- Includes defensive parsing, deterministic patching, and a complete human-in-the-loop revision cycle.
- Produces both editable markdown and review-friendly PDF in each iteration.

## API Module

### What this module is designed to do

This module is implemented to generate and iteratively refine an OpenAPI YAML contract from requirements plus design artifacts.

### Expected inputs

- `requirements.md` (binary property: `requirements`)
- `design_api.json` (binary property: `design_api`)
- Merge node: `API - Requirements and Design` (`combineByPosition`)

### Generation pipeline

- `API - Build Prompt` reads both binaries and composes a single prompt payload.
- `API - Generate Response` uses a system prompt that enforces OpenAPI-only output (no prose, no fences).
- `API - Clean Response` extracts and validates OpenAPI YAML, forcing the result to start with `openapi:`.
- `API - File to Review` converts to `openapi.yaml`.
- `API - Zip to Review` packages `api.zip`.
- `API - Text and Zip` + `API - Create Zip Link` + `API - Prepare Information` prepare review download and revision metadata.

### Human validation and refinement loop

- `API - Human Validation` collects approve/reject plus feedback.
- `API - Loop Decision`:
  - approved -> `API - Final File` (final `openapi.yaml` binary output)
  - rejected -> refinement path
- Refinement path:
  - `API - Build Refinement Prompt` generates line-numbered patch instructions request.
  - `API - Generate Refinement Response` returns patch directives.
  - `API - Parse Changes` parses line patches.
  - `API - Apply Changes` applies patch lines to the YAML draft.
  - Re-packages and loops back to human validation.

### Current wiring status in this workflow version

- `API - Requirements and Design` currently receives input from `DESIGN_FOR_API FILE`.
- There is no outgoing connection from `REQ - Final File` into the API module.
- Because `API - Build Prompt` requires both `requirements` and `design_api` binaries, the API module is implemented but not fully wired for automatic end-to-end execution from the requirements output in this file version.


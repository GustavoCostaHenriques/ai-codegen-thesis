# Create Link v1

## What this workflow already does

This subworkflow stores generated review ZIP binaries and exposes a webhook endpoint to download them by token.

## Input contract (subworkflow trigger path)

- Entry point: `Execute Workflow Trigger`.
- Declared workflow inputs:
  - `archiveMimeType`
  - `archiveFileName`
  - `revisionNumber` (number)
  - `response`
- The workflow expects archive binary data in `binary.reviewZip` (or `binary.archive` fallback).

## Store path (called by parent workflows)

- `Store Review ZIP`:
  - reads archive data from binary
  - validates required binary payload (`archiveData`; also `archiveId` when filesystem-backed data is used)
  - stores archive metadata in workflow global static data: `reviewZips[token]`
  - generates token format: `api_draft_<timestamp>_<random>`
  - updates `latestReviewZipToken`
  - lazily removes entries older than 24 hours
- Returns:
  - `zipDownloadToken`
  - `zipDownloadUrl = /webhook/review-download-file`
  - passthrough `response` and `revisionNumber`

## Download path (webhook path)

- Entry point: `Review Download Webhook` (`path: review-download-file`).
- `Load Review ZIP`:
  - reads `query.token`
  - if missing/invalid, falls back to:
    - `latestReviewZipToken`, then
    - newest stored archive
  - throws error if no valid archive is available
  - reconstructs binary `archive` payload for response
- `Respond With Review ZIP`:
  - returns binary response
  - sets headers:
    - `Content-Type: application/zip`
    - `Content-Disposition: attachment; filename=<stored fileName>`

## Behavioral Notes

- Storage is workflow static data based, not external persistent storage.
- Retention cleanup is lazy and runs during store operations.
- Webhook can return latest artifact when token is omitted, due fallback logic.

## Current Maturity

- Focused and production-oriented for review distribution.
- Covers both caller-triggered storage and user-facing webhook download.
- Workflow metadata:
  - name: `Subworkflow - Create Link`
  - node count: 5
  - active: `true` in this export snapshot


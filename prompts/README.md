# Prompts

Prompt history for AI-assisted generation runs.

## Directory Layout

```text
prompts/
|- first_interaction/  # Initial prompt for each module/phase
|- refinement/         # Iterative corrections and improvements
```

## What Goes Where

| Folder | Store this type of prompt |
| --- | --- |
| `first_interaction/` | The first prompt used to generate an artifact |
| `refinement/` | Follow-up prompts after review, correction, or optimization |

## Naming Convention

Pattern:

- `YYYY-MM-DD_module-purpose_vN.md`

Examples:

- `2026-03-06_backend-initial_v1.md`
- `2026-03-07_backend-refinement-v1.md`

## Minimal Prompt Record Template

```md
# Persona
- Describe the role that the model will have to play

# Context
- Project version:
- Target module:
- Related workflow snapshot:

# Expected output
<what this prompt should produce>

# More information
<issues, tradeoffs, and next refinement ideas>

# Plan
- Describe how the model should generate
```

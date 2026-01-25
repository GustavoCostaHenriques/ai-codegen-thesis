# Orchestration Tool Selection

This document describes the analysis and justification for the orchestration tool selected to implement the proposed AI-based software development pipeline.

The orchestration layer plays a central role in coordinating pipeline modules and managing execution flow.

---

## 1. Evaluation Criteria

The following criteria were considered when selecting the orchestration tool:

- Support for modular, multi-stage pipelines
- Integration with multiple LLM providers (BYOK)
- Support for human-in-the-loop validation
- Ease of experimentation and rapid iteration
- Cost
- Suitability for academic and experimental environments

---

## 2. Candidate Tools

The following orchestration tools were analysed:

- **Flowise**
- **LangFlow**
- **Dify**

These tools represent different approaches to LLM orchestration, ranging from open-source workflow engines to managed LLM application platforms.

---

## 3. Qualitative Comparison

| Feature | Flowise | LangFlow | Dify |
|------|--------|----------|------|
| Primary focus | Visual orchestration of modular LLM workflows | Visual and programmatic orchestration over LangChain | LLMOps platform for end-user applications |
| Human-in-the-loop support | Native support for flow interruption and validation | Not native; requires custom Python logic | Limited support via feedback mechanisms |
| Integrations | Visual integration with multiple LLM providers | Extensive via LangChain ecosystem | Managed integrations with selected providers |
| Learning curve | Low to medium | Medium to high | Low |
| Data control | Medium (cloud execution) | High (self-hosted execution) | Medium (cloud-centric) |
---

## 4. Cost Considerations

### 4.1 Flowise

Flowise provides both a cloud-based offering and a fully open-source self-hosted version.

| Pricing model | Executions included | Model cost | Tool cost | Total |
|--------------|---------------------|------------|-----------|-------|
| Cloud — Free | 100 executions / month | BYOK (token-based) | 0 € | Tokens (limited to 100 executions) |
| Cloud — Starter | 10,000 executions / month | BYOK (token-based) | ≈ 35 USD / month | ≈ 35 USD / month + tokens |
| Cloud — Pro | 50,000 executions / month | BYOK (token-based) | ≈ 65 USD / month | ≈ 65 USD / month + tokens |
| Self-hosted (OSS) | Unlimited | BYOK (token-based) | 0 € | Variable (tokens + optional infrastructure) |

Practical testing confirmed that each successful execution corresponds to a single pipeline run and that model inference costs are not included in cloud plans, requiring the use of external API keys.


### 4.2 Dify

Dify is a cloud-oriented LLMOps platform that primarily relies on a credit-based pricing model, while also supporting a BYOK (Bring Your Own Key) configuration.

| Pricing model | Executions included | Model cost | Tool cost | Total |
|--------------|---------------------|------------|-----------|-------|
| Credits — Sandbox (Free) | Variable (up to 200 credits / month) | Included in credits (abstracted) | 0 € | 0 € (limited by credit consumption) |
| Credits — Professional | Variable (up to 5,000 credits / month) | Included in credits (abstracted) | ≈ 59 USD / month | ≈ 59 USD / month |
| Credits — Team | Variable (up to 10,000 credits / month) | Included in credits (abstracted) | ≈ 159 USD / month | ≈ 159 USD / month |
| BYOK (API key) | Unlimited | Provider cost (token-based) | 0 € | Variable (token usage) |

Practical experimentation confirmed that each interaction with an LLM consumes a variable number of credits, depending on the request complexity.  
As a result, the number of pipeline executions that can be performed within a given credit quota cannot be directly mapped to a fixed number of executions, reducing cost predictability and transparency.

### 4.3 LangFlow

LangFlow is provided as a fully open-source orchestration tool and is primarily intended to be deployed in self-hosted environments.

| Pricing model | Executions included | Model cost | Tool cost | Total |
|--------------|---------------------|------------|-----------|-------|
| Open-source / Self-hosted | Unlimited | Provider cost (token-based) | 0 € | Variable (tokens + optional infrastructure) |

LangFlow does not impose execution limits, credits, or subscription plans when self-hosted.  
All costs are directly associated with the consumption of external LLM APIs and, if applicable, the infrastructure required to host the tool.

---

## 5. Final Decision

The orchestration tool selected for this work is **Flowise Cloud (Free)** during the initial implementation and experimentation phase.

This choice is justified by:
- reduced setup and operational overhead,
- rapid prototyping and testing capabilities,
- native support for modular pipeline execution,
- compatibility with BYOK cost models,
- suitability for iterative development.

Importantly, this decision does not restrict the architectural design of the pipeline. The proposed solution remains fully compatible with a future migration to a self-hosted deployment if required for scalability, cost control, or privacy considerations.

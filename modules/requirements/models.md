# Models for the Requirements Module

This document describes the Large Language Models (LLMs) selected for evaluation in the Requirements Module.  
The selection focuses on models that are particularly suitable for requirement interpretation and structuring.

The goal is to compare model, assessing their strengths, limitations, and cost implications in the context of requirements structuring.

---

## 🔍 Selection Criteria

The models were selected according to the following criteria:

- Ability to understand and structure natural language requirements
- Support for long-context reasoning
- (Optional) Multimodal support for visual artefacts
- Cost considerations and scalability

---

## 📊 Model Comparison

| Model | Provider / Region | Modality | Context Window | Training / Supported Languages | Primary Specialization | Approx. Cost (Input / Output) |
|------|------------------|----------|----------------|------------------------------|------------------------|-------------------------------|
| Mistral Large 3 | <img src="../../assets/logos/mistral.png" width="18"/> Mistral AI (FR) | Text + Vision | 256k tokens | Multilingual (English, French, German, Spanish, Italian, Portuguese, Dutch, Polish, Chinese, Japanese, Korean, among others) | Instruction following, requirement structuring, multilingual reasoning | **$0.50 / $1.50 per 1M tokens** |
| Ministral 3 8B | <img src="../../assets/logos/mistral.png" width="18"/> Mistral AI (FR) | Text + Vision | 256k tokens | Multilingual, similar coverage to other Mistral models | Efficient reasoning, baseline requirement analysis | **$0.15 / $0.15 per 1M tokens** |
| Pixtral Large | <img src="../../assets/logos/mistral.png" width="18"/> Mistral AI (FR) | Vision + Text | 128k tokens | Multilingual, trained on text–image pairs | Multimodal document, diagram and mockup interpretation | **$2.00 / $6.00 per 1M tokens** |
| Gemini 2.5 Pro | <img src="../../assets/logos/gemini.png" width="18"/> Gemini (US) | Multimodal | Up to ~1M tokens | Multilingual, English-centric with broad global language coverage | Very long-context reasoning, large document synthesis, multimodal inputs | **$1.25–$2.50 / $10.00–$15.00 per 1M tokens** |
| Claude Sonnet 4 | <img src="../../assets/logos/anthropic.png" width="18"/> Anthropic (US) | Text + Vision | ~200k–1M tokens (tier-dependent) | Multilingual, predominantly English-centric | Structured reasoning, consistency, requirement refinement | **$3.00 / $15.00 per 1M tokens** |



---

## 🌍 Training Languages

None of the selected model providers disclose the full composition of their training datasets.  
However, all selected models are described as *multilingual* by their respective providers.

- **Mistral models (FR)** emphasize strong performance in European languages, reflecting a focus on multilingual and EU-aligned use cases.
- **US-based models (Gemini and Claude)** are predominantly English-centric but demonstrate strong multilingual capabilities across common European languages.

---

## 💰 Cost Considerations

Costs are typically calculated per million tokens processed (input and output).  
Exact pricing varies depending on provider, deployment tier, and usage volume.

In the context of the Requirements Module:

- Models with higher per-token costs may still be cost-effective if they reduce the number of refinement iterations.
- Smaller or more efficient models (e.g., Ministral 3 8B) provide a useful baseline for cost–quality trade-off analysis.
- Multimodal models may incur additional costs due to image processing.

Cost will therefore be evaluated jointly with output quality during experimental evaluation.

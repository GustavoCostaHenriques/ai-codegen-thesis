# Requirements Module

The Requirements Module is the entry point of the proposed AI-based pipeline for automated software development. Its primary role is to transform initial, often informal and ambiguous, user-provided descriptions into a structured and analyzable set of software requirements.

This module establishes the foundation for all subsequent stages of the pipeline. By producing clearer, normalized, and validated requirements, it reduces ambiguity propagation and improves the consistency and quality of the artefacts generated downstream.

---

## 🎯 Purpose of the Module

In real-world software projects, requirements are frequently expressed in natural language, emails, documents, or visual artefacts, and may be incomplete, inconsistent, or underspecified. The purpose of this module is to:

- Interpret unstructured requirement descriptions
- Identify ambiguities, missing information, and inconsistencies
- Organize requirements into a structured representation
- Prepare the requirements for use by subsequent pipeline modules

---

## 🔁 Role in the Pipeline

The Requirements Module serves as the **starting point** of the pipeline and produces artefacts that are consumed by all subsequent modules, including interface generation, API specification, and backend/frontend code generation.

A high-level overview of the expected workflow is illustrated below:

![Requirements module overview](module_proposed_overview.png)

---

## 📥 Inputs

The module is designed to accept different types of input, including:

- Natural language descriptions (e.g., user stories, emails, informal specifications)
- Structured or semi-structured documents
- (Optionally) Visual artefacts

Inputs may be incomplete or ambiguous by design, reflecting realistic project conditions.

---

## 📤 Outputs

The expected outputs of this module include:

- A structured list of software requirements (e.g., functional and non-functional)
- Explicit identification of ambiguities, assumptions, and missing information
- Clarification questions to be validated by a human stakeholder
- Normalized terminology and domain concepts

---

## 👤 Human-in-the-Loop Validation

Human validation is a core component of this module (and all others). After the initial generation:

1. The produced requirements are reviewed by a human evaluator
2. Corrections, clarifications, or refinements may be provided
3. The refined output is then validated before progressing in the pipeline

---

## 🧠 Model Usage

This module relies on Large Language Models (LLMs) capable of:

- Natural language understanding
- Long-context reasoning
- Multilingual processing

---

## 📌 Status - 🚧

The implementation of this module is currently **in progress**.  
This directory documents the conceptual design, expected behaviour, and evaluation strategy of the module. Prototype implementations and experimental results will be added incrementally as the project evolves.

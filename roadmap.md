# Roadmap — Pipeline de Geração Automática de Software (Jan–Abr)

Este roadmap descreve o plano de execução do protótipo da tese, organizado por semanas, com objetivos claros e checkpoints. O foco é a construção incremental da pipeline de geração automática de software baseada em LLMs, permitindo iteração contínua.

---

## Objetivo global

Materializar progressivamente uma pipeline completa que transforma requisitos em artefactos de software (Requisitos, UI, API, backend, frontend e infraestrutura), com validação humana e avaliação de qualidade.

---

## Janeiro — Fundação e primeiros módulos

### Semana 1 — Base técnica

* Revisão comparativa das ferramentas de orquestração analisadas
* Análise de limitações, vantagens e trade-offs

**Checkpoint:** 
- [ ] Ferramenta de orquestração selecionada.

---

### Semana 2 — Estratégia de modelos

* Identificação dos modelos a testar em cada módulo da pipeline
* Documentação do plano experimental de modelos

**Checkpoint:**
- [ ] Plano claro e documentado dos modelos a ser usados em cada etapa.

---

### Semana 3 — Requirements Parser

* Implementação do módulo de parsing de requisitos
* Definição do prompt inicial
* Estruturação do output (ex.: JSON reutilizável)

**Checkpoint:**
- [ ] Texto de requisitos convertido numa estrutura consistente e reutilizável.

---

### Semana 4 — UI Design Generator

* Implementação do módulo de geração de UI
* Ajuste de prompts
* Validação manual da coerência com os requisitos

**Checkpoint:**
- [ ] Pipeline gera artefactos de design de interface.

---

## Fevereiro — Núcleo funcional (API e Backend)

### Semanas 5–6 — API Generator

* Implementação do módulo de geração de API
* Produção de especificação OpenAPI
* Garantia de coerência entre UI e API

**Checkpoint:**
- [ ] Pipeline gera uma especificação OpenAPI coerente a partir dos requisitos.

---

### Semanas 7–8 — Backend Generator

* Implementação do módulo de geração de backend base
* Ajustes de prompts e formatos intermédios
* Primeira execução end-to-end funcional

**Checkpoint:**
- [ ] Requisitos → UI → API → Backend integrados na pipeline.

---

## Março — Frontend, infraestrutura e validação

### Semanas 9–10 — Frontend Generator

* Implementação do módulo de geração de frontend
* Garantia de compatibilidade com o backend gerado

**Checkpoint:**
- [ ] Pipeline gera a estrutura base de frontend compatível com o backend gerado.

---

### Semanas 11–12 — Infrastructure Generator e validação

* Implementação do módulo de geração de infraestrutura
* Introdução formal do ciclo de validação humana
* Ajustes incrementais com base no feedback

**Checkpoint:**
- [ ] Pipeline completa end-to-end, ainda que imperfeita.

---

## Abril — Avaliação e estabilização

### Semanas 13–14 — Avaliação

* Execução de testes com diferentes inputs
* Aplicação de métricas de avaliação
* Análise de qualidade, consistência e limitações

**Checkpoint:**
- [ ] Resultados de avaliação recolhidos e documentados para múltiplos inputs.

---

### Semanas 15–16 — Consolidação

* Ajustes finais na pipeline
* Consolidação dos resultados
* Preparação para redação final e defesa

**Checkpoint final:**
- [ ] Pipeline funcional, avaliada e com resultados prontos para análise académica.

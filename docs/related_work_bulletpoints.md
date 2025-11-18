# Related Work

## 1. Geração Automática de Código

### Paper 1 UI to Code - file:///C:/tese/papers/Daniel/image2emmet-Automatic-code-generation-from-web-user-interface-image.pdf
#### Tópicos a mencionar
- Sistema que converte imagens de interfaces web em HTML/CSS.
- Etapas principais:
  - Criação automática de dataset com imagens e código.
  - Detecção de componentes da interface usando CNN/Faster R-CNN.
  - Geração de código através de um modelo que combina CNN (extração visual) e LSTM/RNN (sequência de código).
- Relevância para a tese:
  - Relaciona-se com a parte do frontend da tese, pois gera código HTML/CSS a partir de inputs visuais.

### Paper 2 Codex — file:///C:/tese/papers/Related%20work/Codex.pdf
#### Tópicos a mencionar
- Modelo treinado em grandes corpora de código para transformar texto em código executável.
- Suporta múltiplas linguagens e tarefas como NL→Code, completamento e geração de funções.
- Foi a base para o GitHub Copilot.
- Relevância para a tese:
  - Mostra que LLMs conseguem gerar código funcional a partir de descrições textuais.

### Paper 3 CodeLlama — file:///C:/tese/papers/Related%20work/CodeLlama.pdf
#### Tópicos a mencionar
- Família de modelos especializados em código, treinados para tarefas como geração, explicação e infill.
- Suporta várias linguagens e cenários de programação estruturada.
- Inclui variantes otimizadas para desempenho em código.
- Relevância para a tese:
  - Representa um modelo moderno e aberto para geração de código, importante para fundamentar soluções NL→Code.

### Paper 4 e 5 StarCoder — file:///C:/tese/papers/Related%20work/StarCoder.pdf e file:///C:/tese/papers/Related%20work/StarCoder2.pdf
#### Tópicos a mencionar
- Modelos treinados no dataset The Stack, focados em geração de código multilinguagem.
- Suportam tarefas de síntese, tradução e completamento de código.
- StarCoder2 melhora cobertura de linguagens e coerência sintática.
- Relevância para a tese:
  - Exemplos de modelos especializados usados atualmente na geração de código, fornecendo base para comparar abordagens ou justificar escolhas de LLMs.

### Paper 6 GitHub Copilot - file:///C:/tese/papers/Related%20work/GitHub%20Copilot.pdf
#### Link - https://github.com/features/copilot
#### Tópicos a mencionar
- Ferramenta de assistência ao programador integrada na IDE, baseada no modelo Codex.  
- Funciona como sistema de autocompletar código, sugerindo linhas ou blocos curtos com base no contexto.  
- O estudo analisa o comportamento da ferramenta e o seu impacto no desenvolvimento.  
- Relevância para a tese:  
  - Demonstra que, além de modelos que geram código completo, já existem soluções práticas focadas em completação incremental, apoiando o programador durante a escrita.

### Paper 7 Amazon CodeWhisperer - file:///C:/tese/papers/Related%20work/Amazon%20CodeWhisperer.pdf
#### Link - https://aws.amazon.com/pt/q/developer/
#### Tópicos a mencionar
- Assistente de programação da Amazon que produz sugestões de código contextualizadas.  
- O paper compara CodeWhisperer com Copilot e outras ferramentas, avaliando qualidade, correção e segurança do código gerado.  
- Focado em completar código diretamente na IDE e acelerar tarefas repetitivas.  
- Relevância para a tese:  
  - Mostra que existem já ferramentas comerciais orientadas a code completion, evidenciando a utilização real de LLMs no desenvolvimento de software moderno.

### Artigo SDD do Martin Fowler - https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html  
#### Kiro link - https://kiro.dev 
#### Spec-Kit link - https://github.com/github/spec-kit 
#### Tópicos a mencionar - 
- Artigo técnico que define o conceito de Spec-Driven Development.
- Explica como especificações estruturadas (YAML/JSON) podem ser usadas para gerar código, documentação e artefactos de software.
- Apresenta ferramentas modernas como SpecKit e Kiro que implementam pipelines automáticas baseadas em specs.
- Relevância para a tese:
  - Alinha-se diretamente com o objetivo da pipeline: interpretar requisitos e gerar artefactos (API, backend, UI) de forma coerente.

## 2. Prompt Engineering


## 3. Avaliação de Modelos

### Paper 2 - file:///C:/tese/papers/Ant%C3%B3nia/3770084.pdf
#### Tópicos a mencionar
- Survey que analisa o uso de LLMs para geração de código em linguagens com poucos dados (LRPLs) e linguagens específicas de domínio (DSLs).
- Identifica os principais desafios destas linguagens: falta de dados, sintaxe especializada e fraco desempenho dos LLMs.
- Resume técnicas usadas para melhorar resultados: fine-tuning, prompting, data augmentation, RAG e criação de DSLs simplificadas.
- Compila os benchmarks mais usados (MultiPL-E, XCodeEval, VerilogEval, TLDR-Bash, HumanEval-Kotlin, etc.).
- Analisa métricas de avaliação adequadas para estes cenários (Pass@k, Exact Match, Execution Accuracy, Semantic Accuracy, Logical Equivalence).
- Relevância para a tese:  
  - É útil para a secção de avaliação de modelos, porque mostra como a comunidade avalia geração de código em contextos difíceis.  
  - A tese também precisa de métricas e benchmarks para avaliar qualidade de código, logo este paper dá um bom enquadramento.  
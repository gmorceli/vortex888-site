# Vortex888 — Site institucional

Site estático de página única (Vercel, domínio www.vortex888.com.br) com endpoint serverless de contato em `api/contato.js` (grava no Notion).

## REGRA OBRIGATÓRIA: espelhamento PT ↔ EN

O site existe em duas línguas:

- **PT (canônica):** `index.html` — servida em `/`
- **EN:** `en/index.html` — servida em `/en/`

**Toda atualização de conteúdo, estilo ou script feita em `index.html` DEVE ser espelhada em `en/index.html` (traduzida para o inglês) no mesmo commit — e vice-versa.** Nunca entregar uma alteração em apenas uma das versões.

Detalhes do espelhamento:

- CSS e JavaScript são idênticos nas duas páginas (duplicados inline); qualquer mudança de estilo/comportamento vai nos dois arquivos.
- O formulário EN envia para o mesmo endpoint `/api/contato`. Os `name` dos campos e os `value` das opções de `assunto` permanecem em PT (o backend valida contra os valores em PT) — só o texto exibido é traduzido.
- Nomes próprios não se traduzem: Vortex888, BDN Educação & Tecnologia, Hexa Smart, Hexa Clima, CSGM Editora, NeuroInsights, Ambiência, Fagulha, Kit ROB, ClimAção, PETE.
- IDs de seção/âncoras (`#quem`, `#portfolio`, `#filosofia`, `#contato`) são iguais nas duas versões — não traduzir os IDs.
- As duas páginas carregam `<link rel="canonical">` e os três `hreflang` (pt-BR, en, x-default); manter ao editar o `<head>`.
- Cada página tem um seletor de idioma na nav (`.lang`): PT aponta para `/en/`, EN aponta para `/`.
- Se `llms.txt`, meta description ou JSON-LD mudarem, atualizar o equivalente da outra língua.

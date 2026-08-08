# Vortex888 — Site institucional

Site one-pager da holding **Vortex888** (vortex888.com.br).

## Stack
- HTML/CSS/JS estático (sem framework)
- Função serverless em `/api/contato.js` (recebe o formulário e grava no Notion)
- Deploy na **Vercel**

## Estrutura
- `index.html` — a página inteira (estilo, conteúdo e scripts inline)
- `api/contato.js` — endpoint do formulário de contato → cria página no Notion
- `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png` — ícones (símbolo V3)

## Variáveis de ambiente (configuradas na Vercel, não no código)
- `NOTION_TOKEN` — token da integração "Contato Site Vortex"
- `NOTION_DB_ID` — data source da database "Contatos Site Vortex"

## Deploy
Conectado à Vercel via GitHub: cada `git push` na branch principal publica automaticamente em produção.

Para rodar/testar mudanças: editar, commitar, dar push. A Vercel builda e publica sozinha.

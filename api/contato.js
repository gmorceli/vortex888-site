// Recebe o formulário de contato do site e cria uma página na database do Notion.
// Lê credenciais das variáveis de ambiente NOTION_TOKEN e NOTION_DB_ID (configuradas na Vercel).

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf-8").trim();
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return {}; }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Higieniza: pega só o primeiro token antes de qualquer espaço/quebra (caso o valor colado tenha sujeira no fim).
  const token = (process.env.NOTION_TOKEN || "").trim().split(/\s/)[0];
  const dbId = (process.env.NOTION_DB_ID || "").trim().split(/\s/)[0];
  if (!token || !dbId) {
    return res.status(500).json({ error: "Servidor sem configuração de Notion." });
  }

  let body;
  try {
    body = await readBody(req);
  } catch (err) {
    console.error("Body read error:", err);
    body = {};
  }
  body = body || {};

  const nome = (body.nome || "").toString().trim();
  const email = (body.email || "").toString().trim();
  const organizacao = (body.organizacao || "").toString().trim();
  const whatsapp = (body.whatsapp || "").toString().trim();
  const assunto = (body.assunto || "Outro").toString().trim();
  const mensagem = (body.mensagem || "").toString().trim();

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "E-mail inválido." });
  }
  if (mensagem.length > 4000 || nome.length > 200) {
    return res.status(400).json({ error: "Conteúdo muito longo." });
  }

  const assuntosValidos = [
    "Parceria / investimento",
    "Setor público (B2G)",
    "Fornecedor",
    "Imprensa",
    "Outro",
  ];
  const assuntoFinal = assuntosValidos.includes(assunto) ? assunto : "Outro";

  const properties = {
    "Nome": { title: [{ text: { content: nome } }] },
    "E-mail": { email },
    "Assunto": { select: { name: assuntoFinal } },
    "Mensagem": { rich_text: [{ text: { content: mensagem } }] },
    "Status": { status: { name: "Não iniciada" } },
  };
  if (organizacao) {
    properties["Organização"] = { rich_text: [{ text: { content: organizacao } }] };
  }
  if (whatsapp) {
    properties["WhatsApp"] = { phone_number: whatsapp.slice(0, 100) };
  }

  // Tenta primeiro a API nova (data_source_id, versão 2025-09-03); se o Notion reclamar, cai para a antiga (database_id, 2022-06-28).
  async function criar(usarDataSource) {
    const parent = usarDataSource
      ? { type: "data_source_id", data_source_id: dbId }
      : { database_id: dbId };
    const version = usarDataSource ? "2025-09-03" : "2022-06-28";
    const resp = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Notion-Version": version,
      },
      body: JSON.stringify({ parent, properties }),
    });
    return resp;
  }

  try {
    let r = await criar(true);
    if (r.status === 400 || r.status === 404) {
      // Formato novo não aceito — tenta o antigo.
      const primeiroDetalhe = await r.text();
      console.error("Tentativa data_source falhou, tentando database_id:", r.status, primeiroDetalhe);
      r = await criar(false);
    }

    const detail = await r.text();
    if (!r.ok) {
      console.error("Notion API error:", r.status, detail);
      return res.status(502).json({ error: "Falha ao registrar o contato.", notion_status: r.status, notion_detail: detail.slice(0, 500) });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Erro interno.", detail: String((err && err.message) || err).slice(0, 300) });
  }
}

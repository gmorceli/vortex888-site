# Deploy no GitHub Pages - Vortex888

## 🚀 Passo a passo

### 1. Crie o repositório no GitHub
- Acesse: https://github.com/new
- Nome: `vortex888-site` (ou qualquer nome)
- Deixe público
- Não adicione README

### 2. Configure o Git localmente (se ainda não tiver)
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### 3. Envie os arquivos
```bash
# Entre na pasta do site
cd /caminho/para/vortex888-site

# Inicialize o git
git init

# Adicione todos os arquivos
git add .

# Faça o commit
git commit -m "Primeiro deploy do site Vortex888"

# Conecte com o GitHub (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/vortex888-site.git

# Envie os arquivos
git push -u origin main
```

### 4. Ative o GitHub Pages
1. No GitHub, vá em **Settings** → **Pages**
2. Em "Source", selecione: **Deploy from a branch**
3. Branch: **main** / **/(root)**
4. Clique em **Save**

### 5. Configure o domínio personalizado
1. Ainda em Settings → Pages
2. Em "Custom domain", digite: `vortex888.com.br`
3. Clique em **Save**
4. Marque **Enforce HTTPS**

### 6. Configure o DNS no Registro.br
Acesse https://registro.br e edite seu domínio:

**Opção A - Registros A (recomendado):**
```
Tipo: A
Nome: @
Valor: 185.199.108.153

Tipo: A
Nome: @
Valor: 185.199.109.153

Tipo: A
Nome: @
Valor: 185.199.110.153

Tipo: A
Nome: @
Valor: 185.199.111.153

Tipo: CNAME
Nome: www
Valor: SEU_USUARIO.github.io
```

**Opção B - Apenas CNAME:**
```
Tipo: CNAME
Nome: @
Valor: SEU_USUARIO.github.io
```

### 7. Aguarde a propagação
- DNS: 1-24 horas
- GitHub Pages: 5-10 minutos

---

## 📁 Arquivos do site

Os arquivos estão na pasta `dist/`:
- `index.html` - Página principal
- `assets/` - CSS e JS
- `images/` - Imagens (logo)

---

## 🔄 Atualizações futuras

Para atualizar o site:
```bash
cd /caminho/para/vortex888-site
git add .
git commit -m "Atualização do site"
git push
```

O GitHub Pages atualiza automaticamente em alguns minutos!

---

## ❓ Problemas comuns

**Site não aparece?**
- Verifique se o repositório está público
- Confirme que GitHub Pages está ativado em Settings → Pages

**Domínio não funciona?**
- Aguarde a propagação do DNS (pode levar até 24h)
- Verifique se digitou o domínio corretamente no GitHub

**CSS/imagens não carregam?**
- Verifique se todos os arquivos da pasta `dist/` foram enviados

---

## 📞 Links úteis

- GitHub Pages: https://pages.github.com
- Documentação: https://docs.github.com/pages

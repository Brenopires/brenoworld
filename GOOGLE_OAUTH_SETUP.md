# Configuração Google OAuth - Brenoworld

## URLs Corretas para Configuração

- **Redirect após login**: https://brenoworld.vercel.app/admin
- **Callback do Supabase**: https://gfuwvebmbulhhbtkhwje.supabase.co/auth/v1/callback

---

## Passo 1: Google Cloud Console

### Abrir: https://console.cloud.google.com/apis/credentials

1. **Criar Projeto** (se não tiver):
   - Clique no dropdown de projetos (topo esquerdo)
   - "New Project"
   - Nome: "Brenoworld"
   - Clique "Create"

2. **Configurar Tela de Consentimento** (primeira vez):
   - Menu lateral → "OAuth consent screen"
   - User Type: **External**
   - Clique "Create"
   - Preencha:
     - App name: `Brenoworld`
     - User support email: seu email
     - Developer contact: seu email
   - Clique "Save and Continue"
   - Scopes: pule (clique "Save and Continue")
   - Test users: adicione `breno@familiapires.com.br`
   - Clique "Save and Continue"

3. **Criar OAuth 2.0 Client ID**:
   - Volte para "Credentials"
   - Clique **+ CREATE CREDENTIALS**
   - Selecione **OAuth client ID**

   **Configure:**
   - Application type: **Web application**
   - Name: `Brenoworld Web Client`

   **Authorized redirect URIs** (IMPORTANTE):
   ```
   https://gfuwvebmbulhhbtkhwje.supabase.co/auth/v1/callback
   ```

   ⚠️ **Cole exatamente essa URL** - é a URL do Supabase, não do Vercel!

   - Clique **CREATE**

4. **Copiar Credenciais**:
   - Uma modal vai aparecer com:
     - **Client ID** (começa com algo como `123456-abc.apps.googleusercontent.com`)
     - **Client secret** (string aleatória)
   - **COPIE AMBOS** - você vai usar no próximo passo!

---

## Passo 2: Supabase Dashboard

### Abrir: https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje/auth/providers

1. **Encontrar Google Provider**:
   - Procure "Google" na lista de providers
   - Clique em **Google**

2. **Habilitar e Configurar**:
   - Toggle **"Google Enabled"** para ON

   **Cole as credenciais do passo anterior:**
   - **Google Client ID**: Cole o Client ID do Google Cloud Console
   - **Google Client Secret**: Cole o Client Secret do Google Cloud Console

   - Clique **Save**

---

## Passo 3: Configurar Redirect URLs no Supabase

### Abrir: https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje/auth/url-configuration

1. **Site URL**:
   ```
   https://brenoworld.vercel.app
   ```

2. **Redirect URLs** (adicionar):
   ```
   https://brenoworld.vercel.app/admin
   https://brenoworld.vercel.app/*
   http://localhost:5173/admin
   ```

   ⚠️ Adicione cada URL em uma linha separada

3. Clique **Save**

---

## ✅ Verificar Configuração

Após configurar tudo, teste:

1. Acesse: https://brenoworld.vercel.app/login
2. Clique em "Continue with Google"
3. Deve redirecionar para tela de login do Google
4. Faça login
5. Deve voltar para https://brenoworld.vercel.app/admin
6. Se email for `breno@familiapires.com.br` → acesso admin ✅
7. Caso contrário → "Access Denied"

---

## 🔧 Troubleshooting

### Erro: "redirect_uri_mismatch"
- Verifique que a URL no Google Cloud Console está EXATAMENTE:
  `https://gfuwvebmbulhhbtkhwje.supabase.co/auth/v1/callback`
- Sem barra no final
- Com https://
- Case-sensitive

### Erro: "OAuth Error"
- Verifique que o Google provider está habilitado no Supabase
- Verifique que copiou corretamente Client ID e Secret
- Sem espaços extras

### Botão não faz nada
- Verifique console do navegador (F12 → Console)
- Pode ser bloqueado por popup blocker

### Redireciona mas não loga
- Verifique redirect URLs no Supabase
- Deve ter `https://brenoworld.vercel.app/admin` na lista

---

## 📝 Resumo das URLs

| Onde | O quê | URL |
|------|-------|-----|
| Google Cloud Console | Authorized redirect URI | `https://gfuwvebmbulhhbtkhwje.supabase.co/auth/v1/callback` |
| Supabase | Site URL | `https://brenoworld.vercel.app` |
| Supabase | Redirect URL | `https://brenoworld.vercel.app/admin` |
| Código (automático) | Redirect após OAuth | `https://brenoworld.vercel.app/admin` |

---

**Tudo configurado! 🎉** Agora o Google OAuth deve funcionar perfeitamente.

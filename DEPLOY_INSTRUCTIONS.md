# 🚀 Instruções de Deploy - Brenoworld

## Status Atual ✅

- ✅ Migração para Supabase completa
- ✅ Todas as 6 tabelas criadas no banco
- ✅ Usuário admin criado
- ✅ Build testado e funcionando
- ✅ Commit realizado
- ⏳ **Aguardando**: Configurar GitHub e fazer deploy

---

## Credenciais do Admin

**Email**: breno@familiapires.com.br
**Senha**: brenoworld2026

⚠️ **IMPORTANTE**: Mude a senha após o primeiro login!

---

## Passo 1: Criar Repositório no GitHub

Uma nova aba foi aberta em: https://github.com/new

### Configure o repositório:

1. **Repository name**: `brenoworld` (ou o nome que preferir)
2. **Description**: "Personal portfolio and content management platform"
3. **Visibility**: Public ou Private (sua escolha)
4. **NÃO marque**:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license

5. Clique em **Create repository**

---

## Passo 2: Conectar ao GitHub

Depois de criar o repositório, copie a URL que aparece (algo como `https://github.com/SEU_USUARIO/brenoworld.git`)

Então execute no terminal:

```bash
# Adicionar o remote (substitua pela sua URL)
git remote add origin https://github.com/SEU_USUARIO/brenoworld.git

# Fazer o push
git push -u origin master
```

**OU** use o comando rápido que preparei:

```bash
# Cole a URL do seu repositório aqui:
REPO_URL="https://github.com/SEU_USUARIO/brenoworld.git"

# Execute:
git remote add origin $REPO_URL && git push -u origin master
```

---

## Passo 3: Deploy no Vercel

### Opção A: Deploy via Dashboard (Recomendado)

1. Acesse: https://vercel.com/new
2. Clique em **Import Git Repository**
3. Selecione o repositório `brenoworld` que você acabou de criar
4. Configure as **Environment Variables**:

```bash
SUPABASE_URL=https://gfuwvebmbulhhbtkhwje.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmdXd2ZWJtYnVsaGhidGtod2plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNTE4NzMsImV4cCI6MjA4MjcyNzg3M30.eVLsOCBUpUMB1J4RJfLR_Jvt-m4Dk8HcoTF281NoRTA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmdXd2ZWJtYnVsaGhidGtod2plIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzE1MTg3MywiZXhwIjoyMDgyNzI3ODczfQ.8_pw0sxF2jMIW4DxkA6iCezkKLAFmJjRRlE5MbYgHvE
VITE_SUPABASE_URL=https://gfuwvebmbulhhbtkhwje.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmdXd2ZWJtYnVsaGhidGtod2plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNTE4NzMsImV4cCI6MjA4MjcyNzg3M30.eVLsOCBUpUMB1J4RJfLR_Jvt-m4Dk8HcoTF281NoRTA
VITE_GOOGLE_MAPS_API_KEY=AIzaSyDxXkFEWpeKZTNowwBXbKPJ8EIFZWyzUAw
```

5. Clique em **Deploy**
6. Aguarde o deploy completar (2-3 minutos)

### Opção B: Deploy via CLI

```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel --prod

# Adicionar variáveis de ambiente
vercel env add SUPABASE_URL production
vercel env add SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
vercel env add VITE_GOOGLE_MAPS_API_KEY production

# Redeploy para aplicar variáveis
vercel --prod
```

---

## Passo 4: Testar em Produção

Após o deploy:

1. **Acesse sua URL do Vercel** (algo como `brenoworld.vercel.app`)

2. **Teste a página inicial**:
   - ✅ Página carrega sem erros
   - ✅ Navegação funciona

3. **Teste autenticação**:
   - Vá para `/login`
   - Use as credenciais:
     - Email: `breno@familiapires.com.br`
     - Senha: `brenoworld2026`
   - ✅ Login funciona
   - ✅ Redireciona para `/admin`

4. **Teste CRUD**:
   - No admin, crie um post de teste
   - ✅ Post é salvo no Supabase
   - ✅ Aparece no feed
   - ✅ Consegue deletar

---

## Troubleshooting

### Erro "Failed to fetch" nas APIs
**Causa**: Variáveis de ambiente não configuradas
**Solução**:
1. Vá em Vercel Dashboard > Seu Projeto > Settings > Environment Variables
2. Adicione todas as variáveis listadas acima
3. Clique em **Redeploy** no dashboard

### Erro "Unauthorized" no admin
**Causa**: Usuário não existe ou senha incorreta
**Solução**:
1. Verifique no Supabase Auth se o usuário existe
2. Use as credenciais corretas ou crie um novo usuário

### Deploy falhou no Vercel
**Causa**: Possível erro no build
**Solução**:
1. Veja os logs no Vercel Dashboard
2. Teste localmente: `npm run build`
3. Verifique se todas as dependências estão no `package.json`

---

## Comandos Úteis

```bash
# Ver status do git
git status

# Ver logs de deploy do Vercel
vercel logs

# Testar build local
npm run build

# Testar preview local da build
npm run preview

# Verificar tabelas do Supabase
npm run check-tables

# Servidor de desenvolvimento
npm run dev
```

---

## Próximas Melhorias (Opcional)

- [ ] Configurar domínio customizado no Vercel
- [ ] Adicionar analytics (Vercel Analytics)
- [ ] Configurar CI/CD com GitHub Actions
- [ ] Adicionar testes automatizados
- [ ] Configurar Supabase Storage para imagens
- [ ] Adicionar rate limiting nas APIs

---

## Links Importantes

- **Supabase Dashboard**: https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje
- **Supabase Auth Users**: https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje/auth/users
- **Supabase Table Editor**: https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje/editor
- **GitHub New Repo**: https://github.com/new
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel New Project**: https://vercel.com/new

---

**Tudo pronto! 🎉**

Siga os passos acima e seu projeto estará no ar em poucos minutos!

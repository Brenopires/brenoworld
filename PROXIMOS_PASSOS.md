# Próximos Passos - Deploy Brenoworld

## Status da Migração ✅

- ✅ Código migrado para Supabase
- ✅ API Keys configuradas no `.env`
- ✅ Build testado e funcionando
- ✅ Servidor de desenvolvimento rodando
- ⚠️ **PENDENTE**: Executar migração SQL no Supabase
- ⚠️ **PENDENTE**: Criar usuário admin
- ⚠️ **PENDENTE**: Deploy no Vercel

---

## 1. Execute a Migração SQL (IMPORTANTE!)

### Opção A: Script Completo (Recomendado)
1. Abra: https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje/sql/new
2. Copie o conteúdo do arquivo `supabase-migration.sql`
3. Cole no SQL Editor
4. Clique em **Run**

### Opção B: Script Rápido (Alternativa)
1. Abra: https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje/sql/new
2. Copie o conteúdo do arquivo `supabase-quick-migration.sql`
3. Cole no SQL Editor
4. Clique em **Run**

**Verificar sucesso:**
- Vá em **Table Editor** no dashboard
- Confirme que existem 6 tabelas: posts, media_items, tools, playbooks, cases, trips

---

## 2. Crie o Usuário Admin

1. Acesse: https://supabase.com/dashboard/project/gfuwvebmbulhhbtkhwje/auth/users
2. Clique em **Add User** > **Create new user**
3. Preencha:
   - **Email**: `breno@familiapires.com.br`
   - **Password**: (escolha uma senha segura)
   - **Auto Confirm User**: ✅ Marque esta opção
4. Clique em **Create User**

---

## 3. Teste Localmente

```bash
# Inicie o servidor
npm run dev

# Acesse no navegador
http://localhost:5173
```

### Testes Importantes:
- [ ] Página inicial carrega
- [ ] Login com admin funciona (`/login`)
- [ ] Dashboard admin acessível (`/admin`)
- [ ] Consegue criar um post de teste
- [ ] Post aparece no feed
- [ ] Consegue deletar o post

---

## 4. Prepare para Deploy

### Arquivos que mudaram:
```bash
# Ver mudanças
git status

# Adicionar tudo
git add .

# Fazer commit
git commit -m "feat: migrate to Supabase

- Replace Better Auth with Supabase Auth
- Replace Neon DB with Supabase PostgreSQL
- Update all API endpoints to use Supabase client
- Add migration scripts and setup documentation
"
```

---

## 5. Deploy no Vercel

### 5.1. Configure as Variáveis de Ambiente

Acesse o seu projeto no Vercel Dashboard e adicione estas variáveis:

```bash
SUPABASE_URL=https://gfuwvebmbulhhbtkhwje.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmdXd2ZWJtYnVsaGhidGtod2plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNTE4NzMsImV4cCI6MjA4MjcyNzg3M30.eVLsOCBUpUMB1J4RJfLR_Jvt-m4Dk8HcoTF281NoRTA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmdXd2ZWJtYnVsaGhidGtod2plIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzE1MTg3MywiZXhwIjoyMDgyNzI3ODczfQ.8_pw0sxF2jMIW4DxkA6iCezkKLAFmJjRRlE5MbYgHvE
VITE_SUPABASE_URL=https://gfuwvebmbulhhbtkhwje.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmdXd2ZWJtYnVsaGhidGtod2plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxNTE4NzMsImV4cCI6MjA4MjcyNzg3M30.eVLsOCBUpUMB1J4RJfLR_Jvt-m4Dk8HcoTF281NoRTA
VITE_GOOGLE_MAPS_API_KEY=AIzaSyDxXkFEWpeKZTNowwBXbKPJ8EIFZWyzUAw
```

### 5.2. Faça o Push

```bash
# Push para o GitHub
git push origin master

# O Vercel vai detectar automaticamente e fazer deploy
```

---

## 6. Teste o Deploy

Depois do deploy completar:

1. **Teste o site em produção**:
   - Acesse a URL do Vercel
   - Verifique se a página inicial carrega

2. **Teste autenticação**:
   - Vá para `/login`
   - Faça login com admin

3. **Teste CRUD**:
   - Crie conteúdo no admin
   - Verifique se aparece no feed

---

## Troubleshooting Rápido

### Erro: "Failed to fetch" nas APIs
- Verifique se as variáveis de ambiente estão corretas no Vercel
- Certifique-se que as tabelas foram criadas no Supabase

### Erro: "Invalid API key"
- Copie novamente as chaves do Supabase Dashboard
- Certifique-se de não ter espaços extras
- Redeploy no Vercel após atualizar variáveis

### Erro: "Unauthorized" no admin
- Verifique se o usuário admin foi criado
- Confirme que o email é exatamente: `breno@familiapires.com.br`
- Limpe cookies do navegador e tente novamente

### Erro: "Table does not exist"
- Execute a migração SQL no Supabase
- Verifique no Table Editor se as tabelas foram criadas

---

## Comandos Úteis

```bash
# Ver logs do Vercel
vercel logs

# Build local
npm run build

# Preview da build
npm run preview

# Dev server
npm run dev
```

---

## Documentação Adicional

- **SUPABASE_SETUP.md** - Guia completo de setup do Supabase
- **supabase-migration.sql** - Script SQL completo
- **supabase-quick-migration.sql** - Script SQL resumido

---

## Checklist Final

- [ ] Migração SQL executada no Supabase
- [ ] Tabelas criadas (verificar no Table Editor)
- [ ] Usuário admin criado no Supabase Auth
- [ ] Teste local funcionando
- [ ] Commit feito
- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Push para GitHub
- [ ] Deploy completado no Vercel
- [ ] Teste em produção funcionando

---

**Boa sorte com o deploy! 🚀**

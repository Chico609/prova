# Guia de Teste - Controle DS

Este documento fornece instruções para testar a aplicação Controle DS localmente.

## Inicialização Rápida

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o `.env` com suas credenciais do Supabase**

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse em seu navegador:**
   ```
   http://localhost:5173/
   ```

## Fluxo de Teste

### 1. Teste de Registro
- Clique em "Cadastre-se"
- Preencha com um email e senha válidos
- Confirme a senha
- Verifique a confirmação por email (pode estar em spam)
- Faça login

### 2. Teste de Login
- Use as credenciais cadastradas
- Verifique se é redirecionado para o dashboard
- Verifique se o email é exibido corretamente

### 3. Teste de Recuperação de Senha
- Clique em "Esqueceu sua senha?"
- Digite seu email
- Verifique se recebeu o email de recuperação
- Clique no link para resetar a senha

### 4. Teste de CRUD de Participações
- **Criar**: Clique em "Nova Participação" e preencha o formulário
- **Ler**: Verifique se aparece na tabela
- **Atualizar**: Clique em "Editar" e modifique os dados
- **Deletar**: Clique em "Deletar" e confirme

### 5. Teste de Status
- Crie participações com diferentes status: confirmado, pendente, ausente
- Verifique se as cores dos badges estão corretas:
  - Verde para "Confirmado"
  - Amarelo para "Pendente"
  - Vermelho para "Ausente"

### 6. Teste de Responsividade
- Redimensione a janela do navegador
- Verifique se a tabela fica responsiva em mobile
- Use DevTools para testar em diferentes resoluções

### 7. Teste de Notificações (Toast)
- Crie um novo registro e verifique a notificação de sucesso
- Edite um registro e verifique a notificação
- Delete um registro e verifique a notificação
- Tente fazer login com credenciais inválidas e verifique a notificação de erro

## Dados de Teste Sugeridos

### Participação 1
- **Evento**: Conferência de Tecnologia 2024
- **Data**: 2024-06-15
- **Local**: São Paulo, SP
- **Tipo**: Conferência
- **Status**: Confirmado

### Participação 2
- **Evento**: Meetup React
- **Data**: 2024-07-20
- **Local**: Rio de Janeiro, RJ
- **Tipo**: Workshop
- **Status**: Pendente

### Participação 3
- **Evento**: Seminário de IA
- **Data**: 2024-05-10
- **Local**: Belo Horizonte, MG
- **Tipo**: Seminário
- **Status**: Ausente

## Verificações de Segurança

- [ ] Verificar se outros usuários não conseguem ver participações alheias
- [ ] Verificar se URLs protegidas redirecionar para login sem autenticação
- [ ] Verificar se o token é mantido após refresh da página
- [ ] Verificar se o logout remove o token corretamente

## Checklist de Funcionalidades

### Autenticação
- [ ] Signup com validação de senha
- [ ] Confirmação de senhas correspondentes
- [ ] Login com credenciais válidas
- [ ] Erro ao fazer login com credenciais inválidas
- [ ] Recuperação de senha
- [ ] Logout funciona

### Dashboard
- [ ] Cards de resumo mostram contagens corretas
- [ ] Tabela lista todas as participações do usuário
- [ ] Tabela está ordenada por data (decrescente)
- [ ] Dados são atualizados em tempo real após CRUD

### Participações
- [ ] Pode criar nova participação
- [ ] Pode editar participação existente
- [ ] Pode deletar participação com confirmação
- [ ] Todos os campos são obrigatórios
- [ ] Validação de data funciona
- [ ] Validação de email funciona

### UI/UX
- [ ] Layout é responsivo
- [ ] Toasts aparecem nas operações
- [ ] Loading states aparecem
- [ ] Botões são desabilitados durante operações
- [ ] Erros são exibidos corretamente
- [ ] Cores dos badges estão corretas

## Problemas Conhecidos

Nenhum no momento. Se encontrar algum problema durante os testes, abra uma issue.

## Performance

- Build size: ~608 KB (gzipped: ~177 KB)
- Tempo de carregamento inicial: < 1 segundo
- Sem erros de console ao usar a aplicação

## Notas Importantes

1. **Variáveis de Ambiente**: Sempre use `.env.local` ou `.env` para credenciais sensíveis
2. **RLS**: A segurança do banco depende das políticas RLS estar configuradas corretamente
3. **Email**: O reset de senha usa um email configurado no Supabase
4. **Timezone**: As datas são armazenadas em UTC

---

Última atualização: Junho 2024

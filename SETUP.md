# Controle DS - Gerenciador de Participações em Eventos

Uma aplicação web moderna para gerenciar suas participações em eventos, construída com React, TypeScript, Supabase e shadcn/ui.

## Visão Geral

**Controle DS** é uma aplicação web de gerenciamento pessoal de participações em eventos. O usuário cria sua conta, autentica-se com segurança e acessa uma área privada onde registra e acompanha todos os eventos dos quais participa, participou ou pretende participar, tendo sempre uma visão clara do seu histórico e dos compromissos confirmados.

## Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS v4
- **Authentication & Database**: Supabase
- **Routing**: React Router v6
- **Notifications**: Sonner

## Instalação e Setup

### 1. Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Conta no [Supabase](https://supabase.com)

### 2. Clonar e Instalar Dependências

```bash
cd controle-ds
npm install
```

### 3. Configurar Variáveis de Ambiente

1. Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_ANON_KEY
```

2. Obtenha essas valores no [Dashboard do Supabase](https://supabase.com/dashboard):
   - `VITE_SUPABASE_URL`: Settings → API → Project URL
   - `VITE_SUPABASE_ANON_KEY`: Settings → API → Project API keys → anon key

### 4. Criar Banco de Dados no Supabase

Execute os seguintes comandos SQL no SQL Editor do Supabase:

#### Criar Tabela

```sql
create table participations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  evento text not null,
  data date not null,
  local text not null,
  tipo text not null,
  participacao text not null check (participacao in ('confirmado','pendente','ausente')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

#### Habilitar Row Level Security (RLS)

```sql
alter table participations enable row level security;
```

#### Criar Políticas de RLS

```sql
create policy "select own" on participations for select using (auth.uid() = user_id);
create policy "insert own" on participations for insert with check (auth.uid() = user_id);
create policy "update own" on participations for update using (auth.uid() = user_id);
create policy "delete own" on participations for delete using (auth.uid() = user_id);
```

#### Criar Trigger para updated_at

```sql
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
before update on participations
for each row execute function update_updated_at();
```

### 5. Executar o Projeto

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173/`

## Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint do código
npm run lint
```

## Estrutura de Pastas

```
src/
  ├── components/           # Componentes React
  │   ├── ui/              # Componentes shadcn/ui
  │   ├── ProtectedRoute.tsx
  │   ├── ParticipationDialog.tsx
  │   ├── ParticipationTable.tsx
  │   └── StatusBadge.tsx
  ├── hooks/               # Custom React hooks
  │   ├── useAuth.ts
  │   └── useParticipations.ts
  ├── lib/                 # Utilitários
  │   ├── supabase.ts
  │   └── utils.ts
  ├── pages/               # Páginas
  │   ├── LoginPage.tsx
  │   ├── RegisterPage.tsx
  │   ├── ForgotPasswordPage.tsx
  │   └── DashboardPage.tsx
  ├── types/               # Tipos TypeScript
  │   └── index.ts
  ├── App.tsx              # Componente principal com rotas
  └── main.tsx             # Entry point
```

## Funcionalidades

### Autenticação
- ✅ Cadastro de novo usuário
- ✅ Login com email e senha
- ✅ Recuperação de senha via email
- ✅ Logout
- ✅ Session persistence

### Gerenciamento de Participações
- ✅ Criar novo registro de participação
- ✅ Editar participação existente
- ✅ Deletar participação com confirmação
- ✅ Visualizar lista de participações ordenada por data
- ✅ Filtrar por status (confirmado, pendente, ausente)
- ✅ Dashboard com estatísticas

### Interface
- ✅ Design responsivo mobile-first
- ✅ Tema claro/escuro automático (via CSS variables)
- ✅ Notificações (toast) para feedback do usuário
- ✅ Loading states
- ✅ Tratamento de erros

## Tipos de Dados

### Participação

```typescript
interface Participation {
  id: string
  user_id: string
  evento: string
  data: string
  local: string
  tipo: string
  participacao: 'confirmado' | 'pendente' | 'ausente'
  created_at: string
  updated_at: string
}
```

## Rotas

- `/` → Redireciona para `/dashboard`
- `/login` → Página de login
- `/register` → Página de cadastro
- `/forgot-password` → Recuperação de senha
- `/dashboard` → Dashboard principal (protegido)
- `/*` → Redireciona para `/login`

## Segurança

- ✅ Row Level Security (RLS) no Supabase
- ✅ Autenticação com tokens JWT
- ✅ Variáveis sensíveis em `.env` (não versionado)
- ✅ Proteção de rotas com ProtectedRoute
- ✅ Validação de entrada nos formulários

## Deploy

### Deploy no Vercel

1. Push para GitHub
2. Conecte seu repositório ao Vercel
3. Configure as variáveis de ambiente no Vercel
4. Deploy automático em cada push

### Variáveis de Ambiente no Vercel

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Troubleshooting

### Erro: "Missing Supabase environment variables"
- Verifique se `.env` está configurado corretamente
- Reinicie o servidor de desenvolvimento após alterações no `.env`

### Erro: "Could not load workspace config"
- Limpe `node_modules` e execute `npm install` novamente

### RLS Policy not working
- Verifique se as políticas foram criadas corretamente no Supabase
- Confirme que o `user_id` está sendo enviado corretamente

## Contribuindo

Para contribuir com melhorias:

1. Crie uma branch para sua feature
2. Commit suas mudanças
3. Push para a branch
4. Abra um Pull Request

## Licença

Este projeto é licenciado sob a MIT License.

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando React, TypeScript e Supabase**

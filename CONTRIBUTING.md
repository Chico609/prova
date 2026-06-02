# Contribuindo para o Controle DS

Este documento fornece diretrizes para contribuir com o projeto Controle DS.

## Padrões de Código

### TypeScript
- Use types e interfaces explícitas
- Evite usar `any`
- Use `type` imports para tipos: `import type { MyType } from '@/types'`
- Prefira constantes em UPPER_CASE para valores fixos

### React
- Componentes funcionais apenas
- Custom hooks para lógica reutilizável
- Props tipadas com TypeScript
- Use `React.FC<Props>` para tipagem de componentes (opcional com TypeScript 4.7+)

### Exemplo de Componente

```typescript
import type { ReactNode } from 'react'

interface MyComponentProps {
  title: string
  children: ReactNode
  onClick?: () => void
}

export function MyComponent({ title, children, onClick }: MyComponentProps) {
  return (
    <div onClick={onClick}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

## Estrutura de Pastas

```
src/
├── components/        # Componentes reutilizáveis
│   ├── ui/           # Componentes shadcn/ui
│   └── [Component]/
│       ├── index.ts  # Export
│       └── Component.tsx
├── hooks/            # Custom hooks
├── lib/              # Utilitários e configurações
├── pages/            # Páginas/Rotas
├── types/            # Tipos TypeScript globais
├── App.tsx
└── main.tsx
```

## Adicionando Componentes shadcn/ui

```bash
npx shadcn@4.9.0 add button
```

## Linting e Formatting

O projeto usa ESLint. Execute:

```bash
npm run lint
```

## Commits

Use mensagens de commit significativas:

```
feat: adicionar nova funcionalidade
fix: corrigir bug específico
docs: atualizar documentação
refactor: reestruturar código sem mudança de funcionalidade
style: mudanças de formatação
test: adicionar/atualizar testes
chore: atualizar dependências
```

## Pull Requests

1. Crie uma branch com nome descritivo: `feature/nova-funcionalidade`
2. Faça commits atômicos
3. Atualize a documentação se necessário
4. Teste completamente antes de submeter
5. Descreva as mudanças no PR

## Testing

Execute testes com:

```bash
npm run test
```

## Performance

- Minimize re-renders usando `useMemo` e `useCallback` quando apropriado
- Use code splitting para rotas quando necessário
- Monitorar bundle size: `npm run build`

## Variáveis de Ambiente

Novas variáveis devem ser:
1. Adicionadas em `.env.example`
2. Documentadas em `SETUP.md`
3. Tipadas em uma constante se acessadas múltiplas vezes

## Segurança

- Nunca commitar arquivos `.env`
- Usar HTTPS em produção
- Validar inputs do usuário
- Usar RLS no Supabase para proteção de dados
- Manter dependências atualizadas

## Accessibility (a11y)

- Use labels em inputs
- Adicione alt text em imagens
- Use HTML semântico
- Teste com screen readers

## Documentação

- Documente componentes complexos
- Use JSDoc para funções públicas
- Mantenha README e SETUP.md atualizados
- Adicione comentários para lógica não óbvia

```typescript
/**
 * Carrega as participações do usuário
 * @param userId - ID do usuário
 * @returns Array de participações ordenadas por data
 */
async function loadParticipations(userId: string): Promise<Participation[]> {
  // ...
}
```

## Troubleshooting Desenvolvimento

### "Cannot find module '@/types'"
```bash
# Verifique se o alias está configurado em tsconfig.app.json
# Reinicie o servidor de desenvolvimento
npm run dev
```

### Componentes shadcn/ui não encontrados
```bash
# Adicione novamente o componente
npx shadcn@4.9.0 add button
```

### Build falha
```bash
# Limpe cache e reinstale
rm -rf node_modules dist
npm install
npm run build
```

## Dependências

Antes de adicionar nova dependência:
1. Verifique se já existe alternativa no projeto
2. Avalie o tamanho do bundle
3. Considere a manutenção do pacote
4. Atualize package.json e package-lock.json

### Dependências Principais

- `react`: Framework UI
- `vite`: Build tool
- `typescript`: Type checking
- `shadcn/ui`: Componentes UI
- `tailwindcss`: Utility-first CSS
- `supabase-js`: Backend e Auth
- `react-router-dom`: Roteamento
- `sonner`: Notificações (Toast)

## Monitoramento

- Verifique console.log em produção
- Use ferramentas de erro como Sentry se necessário
- Monitore performance com Core Web Vitals

## Deployment

### Pré-deploy
1. Execute `npm run build`
2. Teste o build: `npm run preview`
3. Verifique se todas as variáveis de ambiente estão configuradas
4. Teste em staging environment

### Deploy
- Use Vercel, Netlify, ou outro provider
- Configure variáveis de ambiente no provider
- Configure custom domain se necessário

## Recursos Úteis

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

## Perguntas?

Abra uma issue no repositório ou entre em contato.

---

**Obrigado por contribuir! 🎉**

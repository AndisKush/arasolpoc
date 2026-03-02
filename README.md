# 📱 Templorios - Template React + NestJS + Prisma + PostgreSQL

Template completo para desenvolvimento de aplicativos web.

## 🎨 Design System

- **Cor Primária:** Laranja (#f97316) - Energia e comunicação
- **Cor Secundária:** Cinza meio-tom (#71717a) - Profissionalismo e equilíbrio
- **Suporte:** Light e Dark mode completo

## 📦 Estrutura do Monorepo

```
LinkService/
├── packages/
│   └── ui/                    # Biblioteca de componentes React + Styled Components
│       ├── src/
│       │   ├── components/    # Componentes reutilizáveis
│       │   ├── styles/        # Design System (tokens, global styles)
│       │   └── patterns/      # Padrões de composição
│       └── package.json
│
├── apps/
│   ├── web/                   # Aplicação web principal
│   ├── api/                   # Backend API
│   ├── docs/                  # Storybook - Documentação de componentes
│   └── workers/               # Workers de processamento de mensagens
│
└── package.json               # Root (npm workspaces)
```

## 🚀 Comandos Rápidos

### Desenvolvimento

```bash
# Rodar todos os apps em modo dev
npm run dev

# Rodar app específico
npm run dev --workspace=apps/web
npm run dev --workspace=apps/api

# Rodar Storybook (documentação de componentes)
npm run storybook --workspace=apps/docs
```

### Build

```bash
# Build de todos os projetos
npm run build

# Build de app específico
npm run build --workspace=apps/web
```

## 📚 Documentação

### Storybook
Acesse a documentação completa do design system e componentes:

```bash
npm run storybook --workspace=apps/docs
```

Depois acesse: http://localhost:6006

### Design System
- **Tokens:** Cores, espaçamento, tipografia, sombras, etc.
- **Componentes:** Button, Input, Select, Table, AppShell, Typography
- **Padrões:** Layouts e composições comuns

## 🛠️ Tecnologias

### Frontend
- **React 19** - Biblioteca UI
- **Styled Components** - CSS-in-JS
- **TypeScript** - Type safety
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **NestJS** - Framework

### Ferramentas
- **Storybook** - Documentação de componentes
- **npm workspaces** - Gerenciamento de monorepo
- **ESLint** - Linting

## 🎯 Próximos Passos

1. ⏳ ...

## 📖 Guias

- [Configuração de Agents](./.agent/AGENTS.md)
- [Design System](http://localhost:6006/?path=/docs/design-system-introdução--docs) - Documentação completa

## 🤝 Contribuindo

Este é um projeto em desenvolvimento. Mantenha a consistência com o design system ao criar novos componentes.

---

**Desenvolvido com ❤️ e ☕**
# LinkService Web App

Frontend web da plataforma LinkService, construído com React, Vite e Styled Components. Integra-se com o design system `@andisds/ui`.

## 🚀 Como Rodar

1. Certifique-se de estar na raiz do workspace ou na pasta `apps/web`.
2. Instale as dependências (se ainda não fez):
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse **http://localhost:5173**

## 🔐 Credenciais de Teste

O sistema utiliza autenticação mockada. Use os seguintes usuários:

### Administrador
- **Email:** `admin@linkservice.com`
- **Senha:** `admin123`
- **Acesso:** Dashboard administrativo, Gestão de usuários

### Usuário Comum
- **Email:** `user@linkservice.com`
- **Senha:** `user123`
- **Acesso:** Dashboard pessoal, Meus Eventos

## 🛠️ Estrutura

- **Auth**: JWT Mockado com refresh token.
- **Estado**: Context API (`AuthContext`) + LocalStorage.
- **UI**: Componentes do pacote `@andisds/ui` (AppShell, Button, Input, Table, etc).
- **Rotas**: Protegidas por role (`ADMIN` vs `USER`).

## 📁 Principais Diretórios

- `src/layouts`: Layouts de Autenticação e Dashboard.
- `src/pages/admin`: Páginas exclusivas de admin (Dashboard, Users).
- `src/pages/user`: Páginas exclusivas de usuário (Dashboard, Events).
- `src/services`: Mock services simulando API Backend.

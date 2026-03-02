# Backend LinkService (NestJS)

Esta API foi configurada para servir o frontend e gerenciar usuários e eventos.

## Configuração Inicial

1.  **Banco de Dados**: Certifique-se de ter um banco de dados PostgreSQL rodando e crie um banco vazio.
2.  **Variáveis de Ambiente**:
    *   Renomeie ou crie um arquivo `.env` na pasta `apps/api` (use `.env.example` como base).
    *   Preencha `DATABASE_URL` com a string de conexão do seu PostgreSQL.
    *   Preencha `JWT_SECRET` com uma chave segura.
3.  **Migrações**:
    *   Execute `npx prisma migrate dev --name init` dentro de `apps/api` para criar as tabelas no banco.
4.  **Executar**:
    *   Rodar `npm run start:dev` em `apps/api`.

## Endpoints Principais

*   `POST /auth/login`: Autenticação.
*   `GET /users`: Listar usuários (Admin).
*   `POST /users`: Criar usuário.
*   `GET /events`: Listar eventos do usuário logado.

## Frontend

O frontend espera que a API esteja rodando em `http://localhost:3000`. Se mudar a porta, ajuste a variável `VITE_API_URL` no `.env` do frontend (`apps/web`).

# --- ESTÁGIO 1: BUILD ---
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Copiar arquivos de dependência da raiz
COPY package.json package-lock.json ./

# 2. Copiar todo o código fonte (apps e packages)
# Isso é necessário porque o web pode depender de packages/ui
COPY . .

# 3. Instalar dependências (na raiz do monorepo)
RUN npm install

# 4. Rodar o build especificamente do app WEB
# O comando do seu package.json raiz já sabe lidar com workspaces
RUN npm run build -w apps/web

# --- ESTÁGIO 2: SERVIDOR (NGINX) ---
FROM nginx:alpine

# Remover configurações padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar nossa configuração personalizada
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

# Copiar os arquivos gerados no build (dist) para a pasta do Nginx
# Note que o caminho do dist pode variar, mas no Vite padrão é apps/web/dist
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"]
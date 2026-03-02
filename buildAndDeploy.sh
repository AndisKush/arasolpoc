#!/bin/bash

# --- Cores para logs ---
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}--- INICIANDO DEPLOY AUTOMATIZADO ---${NC}"
date

# 1. Atualizar o código (GIT PULL)
echo -e "${YELLOW}⬇️  Baixando atualizações do Git...${NC}"
git pull

# Verifica se o git pull deu erro (ex: conflito de merge)
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro no Git Pull. Abortando deploy para não quebrar o sistema.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Código atualizado!${NC}"

# 2. Derrubar os containers atuais
echo -e "${YELLOW}🛑 Derrubando containers ativos...${NC}"
docker compose down

# 3. Build Sequencial (Para economizar RAM da VPS)
# Se tentarmos fazer tudo junto, a VPS pode travar.

echo -e "${YELLOW}🏗️  Construindo Frontend Web...${NC}"
docker compose build web
if [ $? -ne 0 ]; then echo -e "${RED}❌ Falha no build da Web.${NC}"; exit 1; fi

# Nota: Postgres e RabbitMQ usam imagens prontas, não precisam de 'build'

# 4. Subir tudo
echo -e "${YELLOW}🚀 Subindo todos os containers...${NC}"
docker compose up -d

sleep 15


# 5. Limpeza Profunda (Deep Clean)
echo -e "${YELLOW}🧹 Executando limpeza profunda de disco...${NC}"

# Remove containers parados, redes não usadas e IMAGENS ANTIGAS (dangling)
# O flag '-f' força sem pedir confirmação
docker image prune -f

# SE você quiser uma limpeza AINDA MAIS agressiva (apagar cache de build), 
# descomente a linha abaixo. (Atenção: O próximo build vai demorar mais se usar isso)
# docker system prune -a -f

echo -e "${GREEN}✅ DEPLOY CONCLUÍDO COM SUCESSO!${NC}"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
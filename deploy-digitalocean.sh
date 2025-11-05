#!/bin/bash

# Script de Deploy para Digital Ocean - DevOps + IA
# Autor: Sandro Souza - CloudServo Remote System
# Servidor: cloud-ia.cloudservo.com.br (64.23.162.167)

set -e  # Parar em caso de erro

# Configurações do servidor
SERVER_IP="64.23.162.167"
SERVER_USER="root"
SSH_KEY="./ssh/id_rsa"
SERVER_DOMAIN="cloud-ia.cloudservo.com.br"
APP_DIR="/opt/devop-com-ia"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Deploy para Digital Ocean - DevOps + IA${NC}"
echo "=========================================="
echo "🌐 Servidor: $SERVER_DOMAIN ($SERVER_IP)"
echo "=========================================="
echo ""

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script no diretório raiz do projeto${NC}"
    exit 1
fi

# Verificar se a chave SSH existe
if [ ! -f "$SSH_KEY" ]; then
    echo -e "${RED}❌ Erro: Chave SSH não encontrada em $SSH_KEY${NC}"
    echo "Verifique se a chave está na pasta ssh/"
    exit 1
fi

chmod 600 "$SSH_KEY"

# Verificar se o arquivo .env existe
if [ ! -f ".env" ] && [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  Arquivo .env não encontrado!${NC}"
    echo "Copie .env.example para .env e configure suas variáveis:"
    echo "  cp .env.example .env"
    echo "  nano .env"
    read -p "Deseja continuar mesmo assim? (s/N): " response
    if [[ ! "$response" =~ ^[Ss]$ ]]; then
        exit 1
    fi
fi

# Testar conexão SSH
echo "🔌 Testando conexão SSH..."
if ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no -o ConnectTimeout=5 "$SERVER_USER@$SERVER_IP" "echo 'Conexão OK'" &> /dev/null; then
    echo -e "${GREEN}✅ Conexão SSH estabelecida${NC}"
else
    echo -e "${RED}❌ Erro ao conectar via SSH${NC}"
    echo "Verifique:"
    echo "  - IP do servidor: $SERVER_IP"
    echo "  - Chave SSH: $SSH_KEY"
    echo "  - Permissões da chave: chmod 600 $SSH_KEY"
    exit 1
fi

echo ""
echo "📦 Instalando dependências no servidor..."
echo "=========================================="

# Script para executar no servidor remoto
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" << 'ENDSSH'

# Atualizar sistema
echo "📦 Atualizando sistema..."
apt update

# Instalar Docker se não estiver instalado
if ! command -v docker &> /dev/null; then
    echo "🐳 Instalando Docker..."
    apt install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    systemctl start docker
    systemctl enable docker
    echo "✅ Docker instalado"
else
    echo "✅ Docker já instalado"
fi

# Instalar Docker Compose se não estiver instalado
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "🐙 Instalando Docker Compose..."
    apt install -y docker-compose-plugin
    echo "✅ Docker Compose instalado"
else
    echo "✅ Docker Compose já instalado"
fi

# Instalar Git se não estiver instalado
if ! command -v git &> /dev/null; then
    echo "📥 Instalando Git..."
    apt install -y git
    echo "✅ Git instalado"
else
    echo "✅ Git já instalado"
fi

# Instalar curl se não estiver instalado
if ! command -v curl &> /dev/null; then
    echo "📥 Instalando curl..."
    apt install -y curl
else
    echo "✅ Curl já instalado"
fi

echo ""
echo "✅ Todas as dependências instaladas!"

ENDSSH

echo ""
echo "📤 Enviando código para o servidor..."
echo "=========================================="

# Criar diretório no servidor
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" "mkdir -p $APP_DIR"

# Sincronizar arquivos (exceto node_modules, .next, .git)
echo "🔄 Sincronizando arquivos..."
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude 'data' \
  --exclude '.env.local' \
  -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" \
  ./ "$SERVER_USER@$SERVER_IP:$APP_DIR/"

echo -e "${GREEN}✅ Arquivos sincronizados${NC}"

# Copiar .env se existir
if [ -f ".env" ]; then
    echo "📋 Copiando arquivo .env..."
    scp -i "$SSH_KEY" .env "$SERVER_USER@$SERVER_IP:$APP_DIR/.env"
elif [ -f ".env.local" ]; then
    echo "📋 Copiando arquivo .env.local como .env..."
    scp -i "$SSH_KEY" .env.local "$SERVER_USER@$SERVER_IP:$APP_DIR/.env"
fi

echo ""
echo "🚀 Iniciando deploy no servidor..."
echo "=========================================="

# Executar deploy no servidor remoto
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" << ENDSSH

cd $APP_DIR

echo "🛑 Parando containers existentes..."
docker compose down || docker-compose down || true

echo "🔨 Construindo imagem Docker..."
docker compose build --no-cache || docker-compose build --no-cache

echo "📁 Criando diretório de dados..."
mkdir -p data
if [ ! -f data/students.json ]; then
    echo '[]' > data/students.json
fi
chmod 755 data
chmod 644 data/students.json

echo "🚀 Iniciando containers..."
docker compose up -d || docker-compose up -d

echo "⏳ Aguardando aplicação iniciar..."
sleep 8

echo "📊 Status dos containers:"
docker ps | grep devops-ai-slides || docker ps

echo ""
echo "🔍 Testando aplicação..."
if curl -f http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Aplicação está respondendo!"
else
    echo "⚠️  Aplicação ainda não está acessível. Verificar logs."
fi

ENDSSH

echo ""
echo "=========================================="
echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
echo "=========================================="
echo ""
echo "📍 URLs de acesso:"
echo "  - Local:     http://localhost:3001 (no servidor)"
echo "  - IP:        http://$SERVER_IP:3001"
echo "  - Domínio:   http://$SERVER_DOMAIN (após configurar Nginx)"
echo ""
echo "🔧 Comandos úteis (no servidor):"
echo "  ssh -i $SSH_KEY $SERVER_USER@$SERVER_IP"
echo "  cd $APP_DIR"
echo "  docker compose logs -f      # Ver logs"
echo "  docker compose restart      # Reiniciar"
echo "  docker compose down         # Parar"
echo "  docker compose ps           # Status"
echo ""
echo "🌐 Próximos passos:"
echo "  1. Configurar Nginx (copiar nginx.conf para /etc/nginx/sites-available/)"
echo "  2. Liberar porta 80/443 no firewall"
echo "  3. Instalar SSL com: certbot --nginx -d $SERVER_DOMAIN"
echo ""
echo "📖 Guia completo: DEPLOY-DIGITALOCEAN.md"
echo ""
echo "🎉 Boa apresentação!"

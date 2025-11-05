#!/bin/bash

# Script de Deploy para Digital Ocean
# Autor: Sandro Souza - CloudServo Remote System

set -e  # Parar em caso de erro

echo "🚀 Deploy para Digital Ocean - DevOps + IA"
echo "=========================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script no diretório raiz do projeto${NC}"
    exit 1
fi

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker não está instalado. Instale o Docker primeiro.${NC}"
    exit 1
fi

# Verificar se o docker-compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}⚠️  docker-compose não encontrado. Tentando usar 'docker compose'...${NC}"
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

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

# Parar containers existentes
echo "🛑 Parando containers existentes..."
$DOCKER_COMPOSE down || true

# Limpar builds anteriores (opcional)
read -p "Deseja limpar images antigas? (s/N): " clean_images
if [[ "$clean_images" =~ ^[Ss]$ ]]; then
    echo "🧹 Limpando images antigas..."
    docker system prune -af --volumes || true
fi

# Build da nova imagem
echo ""
echo "🔨 Construindo nova imagem Docker..."
$DOCKER_COMPOSE build --no-cache

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao construir imagem Docker${NC}"
    exit 1
fi

# Criar diretório de dados se não existir
echo "📁 Criando diretório de dados..."
mkdir -p data
echo '[]' > data/students.json 2>/dev/null || true
chmod 755 data
chmod 644 data/students.json 2>/dev/null || true

# Iniciar containers
echo ""
echo "🚀 Iniciando containers..."
$DOCKER_COMPOSE up -d

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao iniciar containers${NC}"
    exit 1
fi

# Aguardar containers iniciarem
echo ""
echo "⏳ Aguardando containers iniciarem..."
sleep 5

# Verificar status
echo ""
echo "📊 Status dos containers:"
$DOCKER_COMPOSE ps

# Verificar logs
echo ""
echo "📋 Últimas linhas do log:"
$DOCKER_COMPOSE logs --tail=20

# Verificar se a aplicação está respondendo
echo ""
echo "🔍 Testando aplicação..."
sleep 3

if curl -f http://localhost:3001 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Aplicação está respondendo!${NC}"
else
    echo -e "${YELLOW}⚠️  Aplicação pode não estar acessível ainda. Verificar logs:${NC}"
    echo "  docker-compose logs -f devops-ai-slides"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
echo "=========================================="
echo ""
echo "📍 Aplicação rodando em: http://localhost:3001"
echo ""
echo "🔧 Comandos úteis:"
echo "  - Ver logs:        $DOCKER_COMPOSE logs -f"
echo "  - Parar:           $DOCKER_COMPOSE stop"
echo "  - Reiniciar:       $DOCKER_COMPOSE restart"
echo "  - Remover tudo:    $DOCKER_COMPOSE down -v"
echo "  - Status:          $DOCKER_COMPOSE ps"
echo ""
echo "🌐 Para acessar externamente, configure:"
echo "  - Firewall: Liberar porta 3001"
echo "  - Nginx: Proxy reverso (recomendado)"
echo "  - SSL: Certbot/Let's Encrypt"
echo ""
echo "🎉 Boa apresentação!"

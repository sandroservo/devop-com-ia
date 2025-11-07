#!/bin/bash

# Script para configurar Nginx + SSL
# Servidor: cloud-ia.cloudservo.com.br (64.23.162.167)

SERVER_IP="64.23.162.167"
SERVER_USER="root"
SSH_KEY="./ssh/id_rsa"
SERVER_DOMAIN="cloud-ia.cloudservo.com.br"

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🌐 Configurando Nginx + SSL${NC}"
echo "=========================================="
echo "Domínio: $SERVER_DOMAIN"
echo "=========================================="
echo ""

# Verificar chave SSH
if [ ! -f "$SSH_KEY" ]; then
    echo "❌ Chave SSH não encontrada em $SSH_KEY"
    exit 1
fi

chmod 600 "$SSH_KEY"

echo "📤 Copiando configuração do Nginx..."
scp -i "$SSH_KEY" nginx.conf "$SERVER_USER@$SERVER_IP:/tmp/devops-ai-slides"

ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" << 'ENDSSH'

echo "📦 Instalando Nginx..."
apt update
apt install -y nginx

echo "📋 Configurando site..."
mv /tmp/devops-ai-slides /etc/nginx/sites-available/devops-ai-slides
ln -sf /etc/nginx/sites-available/devops-ai-slides /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

echo "✅ Testando configuração..."
nginx -t

if [ $? -eq 0 ]; then
    echo "🔄 Recarregando Nginx..."
    systemctl reload nginx
    systemctl enable nginx
    echo "✅ Nginx configurado!"
else
    echo "❌ Erro na configuração do Nginx"
    exit 1
fi

echo ""
echo "🔥 Configurando Firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo ""
echo "🔐 Instalando Certbot..."
apt install -y certbot python3-certbot-nginx

echo ""
echo "📜 Obtendo certificado SSL..."
certbot --nginx -d cloud-ia.cloudservo.com.br --non-interactive --agree-tos --email sandro@cloudservo.com.br --redirect

if [ $? -eq 0 ]; then
    echo "✅ SSL configurado!"
else
    echo "⚠️  Erro ao configurar SSL. Execute manualmente:"
    echo "   certbot --nginx -d cloud-ia.cloudservo.com.br"
fi

ENDSSH

echo ""
echo "=========================================="
echo -e "${GREEN}✅ Nginx + SSL configurado!${NC}"
echo "=========================================="
echo ""
echo "🌐 Acesse: https://$SERVER_DOMAIN"
echo ""
echo "🔧 Comandos úteis:"
echo "  nginx -t              # Testar configuração"
echo "  systemctl reload nginx  # Recarregar"
echo "  certbot renew         # Renovar SSL"
echo ""

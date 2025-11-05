# 🚀 Deploy na Digital Ocean - Guia Completo

## 📋 Pré-requisitos

### No seu Droplet Digital Ocean:
- Ubuntu 20.04+ ou Debian 11+
- 1GB RAM mínimo (2GB recomendado)
- Docker instalado
- Docker Compose instalado
- Acesso SSH configurado

---

## 🔧 Preparação do Servidor

### 1. Criar Droplet na Digital Ocean

```bash
# Acesse: https://cloud.digitalocean.com/droplets/new
# Escolha:
#   - Ubuntu 22.04 LTS
#   - Basic Plan ($6/mês - 1GB RAM)
#   - Datacenter: São Paulo ou Nova York
#   - SSH Key ou Password
```

### 2. Conectar ao Servidor

```bash
ssh root@SEU_IP_AQUI
```

### 3. Atualizar Sistema

```bash
apt update && apt upgrade -y
```

### 4. Instalar Docker

```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Verificar instalação
docker --version

# Adicionar usuário ao grupo docker (opcional)
usermod -aG docker $USER
```

### 5. Instalar Docker Compose

```bash
# Instalar Docker Compose
apt install docker-compose-plugin -y

# Verificar instalação
docker compose version
```

### 6. Instalar Git

```bash
apt install git -y
```

---

## 📦 Deploy da Aplicação

### 1. Clonar Repositório

```bash
cd /opt
git clone git@github.com:sandroservo/devop-com-ia.git
cd devop-com-ia
```

### 2. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar com suas credenciais
nano .env
```

Configurar:
```bash
OPENAI_API_KEY=sk-proj-SUA_CHAVE_AQUI
EVOLUTION_API_URL=https://evolution.cloudservo.com.br
EVOLUTION_API_KEY=SUA_CHAVE_EVOLUTION
EVOLUTION_INSTANCE=CloudServo
NODE_ENV=production
PORT=3001
```

Salvar: `Ctrl + O`, `Enter`, `Ctrl + X`

### 3. Dar Permissão ao Script

```bash
chmod +x deploy-digitalocean.sh
```

### 4. Executar Deploy

```bash
./deploy-digitalocean.sh
```

O script irá:
- ✅ Parar containers existentes
- ✅ Construir nova imagem Docker
- ✅ Criar diretório de dados
- ✅ Iniciar containers
- ✅ Verificar status

### 5. Verificar Deploy

```bash
# Ver containers rodando
docker ps

# Ver logs
docker logs -f devops-ai-slides

# Testar aplicação
curl http://localhost:3001
```

---

## 🌐 Configurar Acesso Externo

### Opção 1: Acesso Direto (Simples)

```bash
# Liberar porta no firewall
ufw allow 3001/tcp
ufw enable

# Acessar: http://SEU_IP:3001
```

### Opção 2: Nginx + SSL (Recomendado)

#### 1. Instalar Nginx

```bash
apt install nginx -y
systemctl start nginx
systemctl enable nginx
```

#### 2. Configurar Nginx

```bash
# Copiar configuração
cp nginx.conf /etc/nginx/sites-available/devops-ai-slides

# Criar link simbólico
ln -s /etc/nginx/sites-available/devops-ai-slides /etc/nginx/sites-enabled/

# Remover configuração default
rm /etc/nginx/sites-enabled/default

# Editar domínio
nano /etc/nginx/sites-available/devops-ai-slides
# Substituir: devops-ai.seudominio.com.br

# Testar configuração
nginx -t

# Recarregar Nginx
systemctl reload nginx
```

#### 3. Configurar DNS

No seu provedor de domínio, crie um registro A:
```
Tipo: A
Nome: devops-ai (ou @)
Valor: SEU_IP_DO_DROPLET
TTL: 3600
```

#### 4. Instalar SSL (Let's Encrypt)

```bash
# Instalar Certbot
apt install certbot python3-certbot-nginx -y

# Obter certificado
certbot --nginx -d devops-ai.seudominio.com.br

# Seguir instruções interativas
# Email: seu@email.com
# Aceitar termos: Y
# Redirect HTTP para HTTPS: Y

# Renovação automática já está configurada
certbot renew --dry-run
```

---

## 🔄 Atualizar Aplicação

### 1. Atualizar Código

```bash
cd /opt/devop-com-ia

# Parar containers
docker-compose down

# Atualizar código
git pull origin main

# Rebuild e restart
./deploy-digitalocean.sh
```

### 2. Atualizar apenas Container (sem rebuild)

```bash
docker-compose restart
```

---

## 📊 Monitoramento e Logs

### Ver Logs em Tempo Real

```bash
docker logs -f devops-ai-slides
```

### Ver Logs Específicos

```bash
# Últimas 100 linhas
docker logs --tail=100 devops-ai-slides

# Desde data específica
docker logs --since="2025-11-05T14:00:00" devops-ai-slides
```

### Status dos Containers

```bash
docker ps -a
docker stats devops-ai-slides
```

### Logs do Nginx

```bash
tail -f /var/log/nginx/devops-ai-access.log
tail -f /var/log/nginx/devops-ai-error.log
```

---

## 🛠️ Comandos Úteis

### Docker

```bash
# Parar container
docker stop devops-ai-slides

# Iniciar container
docker start devops-ai-slides

# Reiniciar container
docker restart devops-ai-slides

# Remover container
docker rm devops-ai-slides

# Remover imagem
docker rmi devops-ai-slides

# Limpar sistema
docker system prune -af
```

### Docker Compose

```bash
# Parar todos os serviços
docker-compose down

# Iniciar em background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Rebuild
docker-compose build --no-cache

# Restart
docker-compose restart
```

---

## 🔒 Segurança

### 1. Firewall (UFW)

```bash
# Habilitar UFW
ufw enable

# Regras básicas
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS

# Se usar acesso direto
ufw allow 3001/tcp

# Ver regras
ufw status
```

### 2. Fail2Ban (Opcional)

```bash
# Instalar
apt install fail2ban -y

# Configurar
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
nano /etc/fail2ban/jail.local

# Iniciar
systemctl start fail2ban
systemctl enable fail2ban
```

### 3. Atualizar Chaves

**IMPORTANTE:** Nunca commite `.env` no Git!

```bash
# Backup das chaves
cp .env .env.backup

# Rotacionar chaves periodicamente
nano .env

# Restart após mudança
docker-compose restart
```

---

## 💾 Backup

### Backup Manual

```bash
# Backup dos dados
tar -czf backup-$(date +%Y%m%d).tar.gz data/

# Copiar para local seguro
scp backup-*.tar.gz user@backup-server:/backups/
```

### Backup Automático (Cron)

```bash
# Criar script de backup
cat > /opt/backup-devops-ai.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups"
mkdir -p $BACKUP_DIR
cd /opt/devop-com-ia
tar -czf $BACKUP_DIR/devops-ai-$(date +%Y%m%d-%H%M).tar.gz data/
# Manter apenas últimos 7 dias
find $BACKUP_DIR -name "devops-ai-*.tar.gz" -mtime +7 -delete
EOF

chmod +x /opt/backup-devops-ai.sh

# Adicionar ao cron (diário às 2h)
crontab -e
# Adicionar: 0 2 * * * /opt/backup-devops-ai.sh
```

---

## 🐛 Troubleshooting

### Aplicação não inicia

```bash
# Verificar logs
docker logs devops-ai-slides

# Verificar variáveis de ambiente
docker exec devops-ai-slides env | grep API

# Verificar porta
netstat -tlnp | grep 3001
```

### Erro de permissão no /data

```bash
# Ajustar permissões
chmod 755 /opt/devop-com-ia/data
chmod 644 /opt/devop-com-ia/data/students.json
```

### Container reiniciando constantemente

```bash
# Ver razão da falha
docker logs --tail=50 devops-ai-slides

# Inspecionar container
docker inspect devops-ai-slides
```

### SSL não funciona

```bash
# Verificar certificado
certbot certificates

# Renovar manualmente
certbot renew

# Testar Nginx
nginx -t

# Ver logs do Nginx
tail -f /var/log/nginx/error.log
```

---

## 📈 Otimização

### 1. Aumentar Recursos

Se a aplicação está lenta:
```bash
# Resize do Droplet na Digital Ocean
# Settings → Resize → Escolher plano maior
```

### 2. Cache com Redis (Opcional)

Adicionar Redis ao `docker-compose.yml`:
```yaml
redis:
  image: redis:alpine
  restart: unless-stopped
  ports:
    - "6379:6379"
```

### 3. CDN (Opcional)

Para assets estáticos, configurar CloudFlare:
- https://www.cloudflare.com
- Adicionar domínio
- Proxy DNS records

---

## 📞 Suporte

### Logs Importantes

Antes de buscar ajuda, colete:
```bash
# Logs da aplicação
docker logs --tail=100 devops-ai-slides > app-logs.txt

# Configuração do Docker
docker inspect devops-ai-slides > docker-config.txt

# Status do sistema
df -h > disk-usage.txt
free -m > memory-usage.txt
```

### Links Úteis

- Digital Ocean Docs: https://docs.digitalocean.com
- Docker Docs: https://docs.docker.com
- Next.js Docs: https://nextjs.org/docs

---

## ✅ Checklist de Deploy

- [ ] Droplet criado e configurado
- [ ] Docker e Docker Compose instalados
- [ ] Repositório clonado
- [ ] Variáveis de ambiente configuradas (.env)
- [ ] Script de deploy executado
- [ ] Aplicação acessível na porta 3001
- [ ] Firewall configurado
- [ ] Nginx instalado e configurado (opcional)
- [ ] DNS configurado (se usar domínio)
- [ ] SSL configurado com Let's Encrypt (opcional)
- [ ] Backup configurado
- [ ] Logs monitorados

---

**🎉 Deploy concluído! Sua apresentação está no ar! 🚀**

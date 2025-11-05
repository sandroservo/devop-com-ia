#!/bin/bash

# Script de Deploy - Apresentação DevOps + IA
# Autor: Sandro Souza - CloudServo Remote System

echo "🚀 Iniciando processo de deploy..."
echo ""

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script no diretório raiz do projeto"
    exit 1
fi

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Verificar se a instalação foi bem-sucedida
if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

# Criar build de produção
echo ""
echo "🔨 Criando build de produção..."
npm run build

# Verificar se o build foi bem-sucedido
if [ $? -ne 0 ]; then
    echo "❌ Erro ao criar build"
    exit 1
fi

echo ""
echo "✅ Build criado com sucesso!"
echo ""
echo "Para iniciar o servidor de produção, execute:"
echo "  npm start"
echo ""
echo "Para deploy na Vercel, execute:"
echo "  npm install -g vercel"
echo "  vercel"
echo ""
echo "🎉 Processo concluído!"

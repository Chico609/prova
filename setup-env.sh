#!/bin/bash
# Script para facilitar a cópia do arquivo .env.example para .env

echo "==================================="
echo "Controle DS - Setup Environment"
echo "==================================="
echo ""

if [ -f ".env" ]; then
    echo "⚠️  Arquivo .env já existe!"
    read -p "Deseja sobrescrever? (s/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        echo "Setup cancelado."
        exit 1
    fi
fi

cp .env.example .env

echo "✅ Arquivo .env criado com sucesso!"
echo ""
echo "⚠️  Importante: Você deve atualizar os valores em .env com:"
echo "   1. VITE_SUPABASE_URL - URL do seu projeto Supabase"
echo "   2. VITE_SUPABASE_ANON_KEY - Chave anônima do Supabase"
echo ""
echo "📚 Para obter essas informações:"
echo "   1. Acesse https://supabase.com/dashboard"
echo "   2. Selecione seu projeto"
echo "   3. Vá para Settings > API"
echo "   4. Copie os valores"
echo ""
echo "❌ Não commite o arquivo .env no git!"
echo "✅ O arquivo .gitignore já está configurado para ignorar .env"

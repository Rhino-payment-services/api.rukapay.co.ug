#!/bin/bash

# Development script for Rukapay API Documentation Portal

echo "🚀 Starting Rukapay API Documentation Portal Development Server"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start development server
echo "🔥 Starting Next.js development server..."
echo "📱 The site will be available at: http://localhost:3000"
echo "📚 API Documentation: http://localhost:3000/apis/partner"
echo "💳 Transaction Types: http://localhost:3000/transaction-types"
echo "📊 Status Page: http://localhost:3000/status"
echo ""

npm run dev

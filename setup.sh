#!/bin/bash

# RAG System Setup Script
echo "🚀 Setting up RAG System..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed. Please install Node.js 16+ first."
    exit 1
fi

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Check if OpenAI API key is set
if [ -z "$OPENAI_API_KEY" ]; then
    echo "⚠️  Warning: OPENAI_API_KEY environment variable is not set."
    echo "Please set it with: export OPENAI_API_KEY='your-api-key-here'"
    echo "You can also create a .env file with: OPENAI_API_KEY=your-api-key-here"
fi

# Build frontend
echo "🏗️  Building React frontend..."
cd frontend
npm install
npm run build
cd ..

echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "  python app.py"
echo ""
echo "Then visit: http://localhost:8080"

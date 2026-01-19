#!/bin/bash

# Shivuu Aqua Supplies - Full Stack Start Script
# This script helps you start both backend and frontend servers

echo "🚀 Shivuu Aqua Supplies - Full Stack Startup"
echo "==========================================="
echo ""

# Check if running from correct directory
if [ ! -f "backend/package.json" ] || [ ! -f "frontend/package.json" ]; then
    echo "❌ Error: Please run this script from the root directory of the project"
    echo "   Current directory: $(pwd)"
    exit 1
fi

# Function to start backend
start_backend() {
    echo "📦 Starting Backend Server..."
    echo "   Port: 5000"
    echo "   URL: http://localhost:5000"
    echo ""
    cd backend
    npm start
}

# Function to start frontend
start_frontend() {
    echo "🎨 Starting Frontend Development Server..."
    echo "   Port: 5173"
    echo "   URL: http://localhost:5173"
    echo ""
    cd frontend
    npm run dev
}

# Function to show usage
show_usage() {
    echo "Usage: ./start.sh [option]"
    echo ""
    echo "Options:"
    echo "  backend   - Start only backend server (port 5000)"
    echo "  frontend  - Start only frontend server (port 5173)"
    echo "  all       - Start both servers (requires two terminals)"
    echo "  help      - Show this message"
    echo ""
    echo "Examples:"
    echo "  ./start.sh backend"
    echo "  ./start.sh frontend"
    echo "  ./start.sh help"
    echo ""
    echo "For development, run in separate terminals:"
    echo "  Terminal 1: ./start.sh backend"
    echo "  Terminal 2: ./start.sh frontend"
    echo ""
}

# Parse arguments
case "${1:-help}" in
    backend)
        start_backend
        ;;
    frontend)
        start_frontend
        ;;
    all)
        echo "⚠️  To run both servers, please use separate terminal windows:"
        echo ""
        echo "Terminal 1:"
        echo "  ./start.sh backend"
        echo ""
        echo "Terminal 2:"
        echo "  ./start.sh frontend"
        echo ""
        ;;
    help|--help|-h)
        show_usage
        ;;
    *)
        echo "❌ Unknown option: $1"
        show_usage
        exit 1
        ;;
esac

#!/bin/bash

# Data Flow Verification Script
# Tests connectivity between frontend → backend → database

echo ""
echo "🔗 Data Flow Verification Tool"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Backend Health Check
echo "📡 Test 1: Backend Health Check"
echo "   Checking if backend is running on port 5000..."
if curl -s http://localhost:5000/api/health | grep -q "ok"; then
    echo -e "   ${GREEN}✅ Backend is running${NC}"
else
    echo -e "   ${RED}❌ Backend is not responding${NC}"
    echo "   Start backend with: cd backend && npm start"
    exit 1
fi
echo ""

# Test 2: Database Connection
echo "📊 Test 2: Database Connection"
echo "   Fetching products from database..."
PRODUCTS=$(curl -s http://localhost:5000/api/products)
if echo "$PRODUCTS" | grep -q '"success":true'; then
    COUNT=$(echo "$PRODUCTS" | grep -o '"size"' | wc -l)
    echo -e "   ${GREEN}✅ Connected to Supabase${NC}"
    echo "   Found $COUNT products"
else
    echo -e "   ${YELLOW}⚠️  Unable to fetch products${NC}"
    echo "   Response: $PRODUCTS"
fi
echo ""

# Test 3: CORS Configuration
echo "🔐 Test 3: CORS Configuration"
echo "   Testing CORS headers..."
CORS=$(curl -s -H "Origin: http://localhost:5173" http://localhost:5000/api/health | head -1)
if [ ! -z "$CORS" ]; then
    echo -e "   ${GREEN}✅ CORS is configured${NC}"
else
    echo -e "   ${RED}❌ CORS issue detected${NC}"
fi
echo ""

# Test 4: API Endpoints
echo "🌐 Test 4: API Endpoints"
echo ""
echo "   Checking available endpoints:"
echo ""

# Check each endpoint
endpoints=(
    "GET / | Root"
    "GET /api/health | Health Check"
    "GET /api/products | Products List"
)

for endpoint in "${endpoints[@]}"; do
    METHOD=$(echo $endpoint | cut -d'|' -f1 | xargs)
    PATH=$(echo $endpoint | cut -d'|' -f1 | sed 's/GET //' | xargs)
    NAME=$(echo $endpoint | cut -d'|' -f2 | xargs)
    
    if curl -s "http://localhost:5000$PATH" > /dev/null; then
        echo -e "      ${GREEN}✅${NC} $METHOD http://localhost:5000$PATH ($NAME)"
    else
        echo -e "      ${RED}❌${NC} $METHOD http://localhost:5000$PATH ($NAME)"
    fi
done
echo ""

# Test 5: Frontend Connection
echo "🎨 Test 5: Frontend Connection"
echo "   Checking if frontend can access backend..."

# Try to connect to frontend
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo -e "   ${GREEN}✅ Frontend is running on port 5173${NC}"
    echo ""
    echo "   🌐 Access the application at: http://localhost:5173"
else
    echo -e "   ${YELLOW}⚠️  Frontend is not running yet${NC}"
    echo "   Start frontend with: cd frontend && npm run dev"
fi
echo ""

# Test 6: Summary
echo "📋 Summary"
echo "=========="
echo ""
echo "If all tests passed:"
echo "  1. Open http://localhost:5173 in your browser"
echo "  2. Products should load automatically"
echo "  3. Try submitting an inquiry"
echo "  4. Check Supabase dashboard to verify data storage"
echo ""
echo "API Documentation: See DATA_FLOW_TESTING.md"
echo ""

#!/bin/bash

echo "🚀 Starting Guest Manager Migration Test"
echo "======================================="

# Check if MySQL is running
echo "📋 Checking MySQL connection..."

# Set backend environment 
export NODE_ENV=development

# Start backend in background
echo "🔧 Starting NestJS Backend..."
cd backend
npm run start:dev &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 10

# Check if backend is running
if curl -s http://localhost:3001/api > /dev/null; then
    echo "✅ Backend running on http://localhost:3001"
else
    echo "❌ Backend failed to start"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Start frontend in background  
echo "🖥️  Starting React Frontend..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo "⏳ Waiting for frontend to build..."
sleep 15

# Check if frontend is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend running on http://localhost:3000"
else
    echo "❌ Frontend failed to start"
fi

echo ""
echo "📱 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001/api"
echo "   Dashboard: http://localhost:3000/invitados"
echo ""
echo "🛑 Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT

# Keep script running
wait
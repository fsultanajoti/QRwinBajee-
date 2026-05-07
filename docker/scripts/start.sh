#!/bin/bash

echo "🚀 Starting KingBajee Platform..."

docker-compose up --build -d

echo "✅ System Running on:"
echo "Frontend: http://localhost:3000"
echo "Admin: http://localhost:3001"
echo "Backend: http://localhost:5000"

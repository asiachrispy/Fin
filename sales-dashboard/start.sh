#!/bin/bash

echo "=================================="
echo "  销售数据看板 - 一键启动脚本"
echo "=================================="
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js"
    echo "请先安装 Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo ""

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm"
    exit 1
fi

echo "✅ npm 版本: $(npm -v)"
echo ""

# 检查依赖
echo "📦 检查依赖..."

if [ ! -d "backend/node_modules" ]; then
    echo "安装后端依赖..."
    cd backend
    npm install
    cd ..
else
    echo "✅ 后端依赖已安装"
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "安装前端依赖..."
    cd frontend
    npm install
    cd ..
else
    echo "✅ 前端依赖已安装"
fi

echo ""
echo "=================================="
echo "  启动服务"
echo "=================================="
echo ""

# 启动后端服务
echo "🚀 启动后端服务 (端口 5000)..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# 等待后端服务启动
echo "⏳ 等待后端服务启动..."
sleep 3

# 检查后端服务是否启动成功
if ! curl -s http://localhost:5000/health > /dev/null; then
    echo "❌ 后端服务启动失败"
    kill $BACKEND_PID
    exit 1
fi

echo "✅ 后端服务已启动: http://localhost:5000"
echo ""

# 启动前端服务
echo "🚀 启动前端服务 (端口 3000)..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "=================================="
echo "  服务已启动"
echo "=================================="
echo ""
echo "📱 前端地址: http://localhost:3000"
echo "🔧 后端地址: http://localhost:5000"
echo "❤️ 健康检查: http://localhost:5000/health"
echo ""
echo "按 Ctrl+C 停止服务"
echo ""

# 等待用户中断
wait

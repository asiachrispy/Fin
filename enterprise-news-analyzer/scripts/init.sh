#!/bin/bash

echo "🚀 初始化全球突发事件影响分析系统..."

# 检查依赖
echo "📦 检查依赖..."

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

# 检查 Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 未安装，请先安装 Python 3.10+"
    exit 1
fi

# 检查 Redis
if ! command -v redis-server &> /dev/null; then
    echo "⚠️  Redis 未安装，定时任务功能将不可用"
    echo "   请安装 Redis: brew install redis (macOS) 或 apt install redis-server (Ubuntu)"
fi

echo "✅ 依赖检查完成"

# 后端初始化
echo ""
echo "🔧 初始化后端..."
cd backend

# 创建虚拟环境
if [ ! -d "venv" ]; then
    echo "创建 Python 虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
source venv/bin/activate

# 安装依赖
echo "安装 Python 依赖..."
pip install -q -r requirements.txt

# 创建 .env 文件
if [ ! -f ".env" ]; then
    echo "创建 .env 配置文件..."
    cp .env.example .env
    echo "⚠️  请编辑 backend/.env 文件，添加你的 OPENAI_API_KEY"
fi

# 初始化数据库
echo "初始化数据库..."
python -c "from app.models.database import engine; from app.models import models; models.Base.metadata.create_all(bind=engine); print('数据库初始化完成')"

cd ..

# 前端初始化
echo ""
echo "🎨 初始化前端..."
cd frontend

# 安装依赖
if [ ! -d "node_modules" ]; then
    echo "安装 Node.js 依赖..."
    npm install
fi

cd ..

echo ""
echo "✅ 初始化完成！"
echo ""
echo "📝 下一步："
echo "1. 编辑 backend/.env 文件，添加 OPENAI_API_KEY"
echo "2. 启动 Redis: redis-server"
echo "3. 启动后端: cd backend && source venv/bin/activate && uvicorn app.main:app --reload"
echo "4. 启动 Celery Worker (新终端): cd backend && source venv/bin/activate && celery -A tasks.celery_app worker --loglevel=info"
echo "5. 启动 Celery Beat (新终端): cd backend && source venv/bin/activate && celery -A tasks.celery_app beat --loglevel=info"
echo "6. 启动前端: cd frontend && npm run dev"
echo ""
echo "🌐 访问: http://localhost:5173"
echo "📚 API 文档: http://localhost:8000/docs"

# 全球突发事件影响分析系统

为企业高管提供全球突发事件的智能监控和业务影响分析服务。

## 项目概述

本系统帮助企业高管第一时间了解全球突发事件对自身业务的潜在影响，支持快速决策。

### 核心功能

- **全球新闻采集**：每天自动抓取全球主流新闻媒体（BBC、CNN、路透社、彭博社等）的最新报道
- **AI 事件影响分析**：基于企业背景信息，使用 AI 分析每条新闻事件对企业业务的影响程度（1-10分）
- **Web 事件展示**：通过 Web 页面展示所有事件及其分析结果，支持筛选、搜索、查看详情
- **企业管理**：管理企业信息，AI 自动获取企业背景信息

### AI 增强功能

- **自动获取企业信息**：用户只需输入企业名称，AI 自动搜索并填充企业背景信息
- **智能推送**：AI 判断事件重要性，只推送高影响事件（7分以上）
- **事件聚类**：同一事件的多个新闻报道自动聚合成一个事件

## 技术栈

### 前端
- **Vue 3**：渐进式 JavaScript 框架
- **Element Plus**：Vue 3 UI 组件库
- **Vite**：下一代前端构建工具
- **Vue Router**：路由管理
- **Pinia**：状态管理
- **Axios**：HTTP 客户端

### 后端
- **Python 3.10+**：编程语言
- **FastAPI**：高性能异步 Web 框架
- **SQLite**：轻量级数据库
- **Celery**：分布式任务队列
- **Redis**：缓存和消息代理
- **BeautifulSoup4**：HTML 解析
- **Requests**：HTTP 请求

### AI 服务
- **OpenAI API (GPT-4)**：事件影响分析和企业信息自动获取

## 项目结构

```
enterprise-news-analyzer/
├── backend/                 # 后端项目
│   ├── app/
│   │   ├── api/            # API 路由
│   │   ├── core/           # 核心配置
│   │   ├── models/         # 数据模型
│   │   ├── services/       # 业务逻辑
│   │   └── main.py         # FastAPI 应用入口
│   ├── tasks/              # Celery 任务
│   ├── tests/              # 测试
│   └── requirements.txt    # Python 依赖
├── frontend/               # 前端项目
│   ├── src/
│   │   ├── components/     # Vue 组件
│   │   ├── views/          # 页面视图
│   │   ├── router/         # 路由配置
│   │   ├── store/          # Pinia 状态管理
│   │   └── main.ts         # Vue 应用入口
│   ├── public/             # 静态资源
│   └── package.json        # Node 依赖
├── Product-Spec.md         # 产品需求文档
├── UI-Prompts.md           # UI 设计提示词
└── README.md               # 项目说明
```

## 快速开始

### 前置要求

- **Node.js 18+** 和 **npm/yarn/pnpm**
- **Python 3.10+**
- **Redis**（用于 Celery）
- **OpenAI API Key**

### 1. 克隆项目

```bash
cd enterprise-news-analyzer
```

### 2. 启动后端

```bash
cd backend

# 创建虚拟环境
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，添加 OPENAI_API_KEY

# 初始化数据库
python -m app.models.init_db

# 启动 FastAPI
uvicorn app.main:app --reload --port 8000
```

### 3. 启动 Celery（新终端窗口）

```bash
cd backend
source venv/bin/activate

# 启动 Redis（如果未启动）
redis-server

# 启动 Celery Worker
celery -A tasks.celery_app worker --loglevel=info

# 启动 Celery Beat（定时任务调度器）
celery -A tasks.celery_app beat --loglevel=info
```

### 4. 启动前端

```bash
cd frontend

# 安装依赖
npm install  # 或 yarn/pnpm install

# 启动开发服务器
npm run dev
```

### 5. 访问应用

打开浏览器访问：`http://localhost:5173`

## 配置说明

### 后端环境变量（backend/.env）

```env
# OpenAI API
OPENAI_API_KEY=your_openai_api_key_here

# 数据库
DATABASE_URL=sqlite:///./news_analyzer.db

# Redis
REDIS_URL=redis://localhost:6379/0

# 应用配置
APP_NAME=全球突发事件影响分析系统
APP_VERSION=1.0.0

# 新闻抓取配置
NEWS_SOURCES=["BBC","CNN","Reuters","Bloomberg"]
CRAWL_INTERVAL_DAYS=1
MAX_NEWS_PER_SOURCE=50

# Celery 配置
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0
```

### 前端环境变量（frontend/.env）

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=全球突发事件影响分析系统
```

## 功能说明

### 1. 新闻采集

系统每天早上 8:00 自动抓取以下新闻源：
- BBC News
- CNN
- Reuters
- Bloomberg

每个新闻源最多抓取 50 条最新新闻。

### 2. AI 影响分析

用户添加企业后，系统自动分析每条新闻对该企业的影响程度：
- **1-3 分**：低影响
- **4-6 分**：中等影响
- **7-10 分**：高影响

### 3. 事件展示

- **事件列表页**：显示所有事件，支持筛选和搜索
- **事件详情页**：显示新闻内容、AI 分析结果、企业信息
- **企业管理页**：管理企业信息，支持 AI 自动填充

## 开发指南

### 前端开发

```bash
cd frontend

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

### 后端开发

```bash
cd backend

# 运行测试
pytest

# 代码格式化
black app/
isort app/

# 类型检查
mypy app/
```

### API 文档

启动后端后，访问：
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 部署

### Docker 部署（推荐）

```bash
# 构建并启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 手动部署

详见 `docs/deployment.md`

## 常见问题

### 1. Redis 连接失败

确保 Redis 已启动：
```bash
redis-server
```

### 2. OpenAI API 限流

在 `backend/.env` 中调整请求间隔：
```env
OPENAI_REQUEST_INTERVAL=1  # 秒
```

### 3. 新闻抓取失败

检查网络连接和新闻源是否可访问。详细日志见 `backend/logs/crawler.log`

## 贡献指南

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 联系方式

- 项目地址：[GitHub URL]
- 问题反馈：[Issues URL]

---

**文档版本**：1.0.0
**最后更新**：2026-01-21

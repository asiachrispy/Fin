# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is an **AI-powered development platform** consisting of two main components:

1. **AI Skills System** (`/.claude/skills/`) - A modular collection of specialized AI skills for software development workflows
2. **Enterprise News Analyzer** (`/enterprise-news-analyzer/`) - A production application demonstrating the platform's capabilities

The platform uses a **document-driven development** approach where products are defined through `Product-Spec.md` files, UI designs through `UI-Prompts.md` files, and changes tracked in `Product-Spec-CHANGELOG.md`.

---

## AI Skills Architecture

The skills system is orchestrated by the **AI Workflow Controller** (`ai-workflow-controller`), which coordinates between specialized skills:

### Core Workflow Skills

- **`ai-workflow-controller`**: Main orchestrator that routes commands and manages project state
- **`product-spec-builder`**: Product management with detailed requirement gathering (15-30 min, 5-15 rounds)
- **`quick-product-manager`**: Fast product specification (2-5 min, 1-2 rounds) for rapid prototyping
- **`ui-prompt-generator`**: Generates UI design prompts from product specifications
- **`dev-builder`**: Full-stack development implementation

### Specialized Skills

- **`data-prototype-builder`**: Creates interactive data dashboards using Next.js + shadcn/ui + Recharts
- **`ui-ux-pro-max`**: Advanced UI/UX design with 50+ styles, 21 palettes, 9 tech stacks
- **`frontend-design`**: Production-grade frontend interfaces
- **`code-reviewer`**: Comprehensive code review for multiple languages
- **`code-simplifier`**: Code refactoring and optimization
- **`pdf`**, **`xlsx`**: Document processing and data analysis

### Workflow Commands

Use these commands via the Skill tool (e.g., `/skill product-spec-builder`):

- `/prd` - Requirement collection (0-1 mode or iteration mode)
- `/ui` - Generate UI design prompts
- `/dev` - Implement features based on Product-Spec.md
- `/run` - Run and validate the project locally
- `/check` - Completeness check against specifications
- `/status` - View project progress and state

### Project State Detection

The workflow controller automatically detects:
- **0-1 Mode**: `Product-Spec.md` doesn't exist → starts requirement gathering
- **Iteration Mode**: `Product-Spec.md` exists → routes to appropriate skill for updates

---

## Enterprise News Analyzer

This is a Vue 3 + FastAPI application that provides global news monitoring and business impact analysis for enterprises.

### Technology Stack

**Frontend** (`/enterprise-news-analyzer/frontend/`):
- Vue 3 + TypeScript + Vite
- Element Plus UI library
- Vue Router + Pinia (state management)
- Axios for HTTP requests

**Backend** (`/enterprise-news-analyzer/backend/`):
- Python 3.10+ with FastAPI
- SQLite database with SQLAlchemy
- Celery + Redis for async task queues
- BeautifulSoup4 for web scraping
- OpenAI GPT-4 for AI-powered analysis

### Common Commands

#### Frontend Development

```bash
cd enterprise-news-analyzer/frontend

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

#### Backend Development

```bash
cd enterprise-news-analyzer/backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
python -m app.models.init_db

# Run development server
uvicorn app.main:app --reload --port 8000

# Run tests
pytest

# Format code
black app/
isort app/
```

#### Celery Tasks (Required for news crawling)

```bash
cd enterprise-news-analyzer/backend
source venv/bin/activate

# Start Redis (if not running)
redis-server

# Start Celery worker
celery -A tasks.celery_app worker --loglevel=info

# Start Celery beat (scheduler)
celery -A tasks.celery_app beat --loglevel=info
```

#### Environment Setup

**Backend** (`enterprise-news-analyzer/backend/.env`):
```env
OPENAI_API_KEY=your_key_here
DATABASE_URL=sqlite:///./news_analyzer.db
REDIS_URL=redis://localhost:6379/0
```

**Frontend** (`enterprise-news-analyzer/frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Architecture Patterns

**Backend Structure** (MVC + Service Layer):
- `app/api/` - FastAPI route handlers (controllers)
- `app/services/` - Business logic (OpenAI analysis, web scraping)
- `app/models/` - SQLAlchemy database models
- `app/core/` - Configuration and settings
- `tasks/` - Celery async tasks for scheduled news crawling

**Frontend Structure** (Vue 3 Composition API):
- `src/views/` - Page components
- `src/components/` - Reusable UI components
- `src/store/` - Pinia state stores
- `src/api/` - API client and mock data
- `src/router/` - Vue Router configuration

### API Documentation

When the backend is running:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

---

## Data Prototype Templates

The repository includes templates for rapid data dashboard development in `/data-prototype-templates/`.

### Recommended Workflow for Data Dashboards

```bash
# Step 1: Quick requirement definition (2-5 min)
/skill quick-product-manager
"I need a sales dashboard showing trends, orders, and conversion rates"

# Step 2: Generate prototype (5-10 min)
/skill data-prototype-builder
"Based on the requirements, create a complete sales dashboard prototype"

# Step 3: Run locally
npm run dev
```

**Tech Stack for Data Prototypes**:
- Next.js 14 (App Router)
- shadcn/ui components
- Recharts for visualization
- Mock data (no backend required)

---

## Key Development Concepts

### Document-Driven Development

All projects use markdown documents as the source of truth:
- **Product-Spec.md**: Complete product requirements
- **UI-Prompts.md**: Visual design specifications
- **Product-Spec-CHANGELOG.md**: Change history and iterations

### Skill Selection Guidelines

| Scenario | Recommended Skill |
|----------|------------------|
| Simple/medium complexity needs | `quick-product-manager` |
| Complex/strict compliance needs | `product-spec-builder` |
| Data dashboards/reports | `data-prototype-builder` |
| UI/UX design | `ui-ux-pro-max` or `frontend-design` |
| Full implementation | `dev-builder` |
| Code quality | `code-reviewer` or `code-simplifier` |

### OpenCode Integration

Skills are compatible with the OpenCode plugin system (located in `/.opencode/`). Configuration is in `/.claude/settings.json`.

---

## Testing and Validation

### Frontend
```bash
npm run lint
npm run build
```

### Backend
```bash
pytest
black app/
isort app/
```

### Integration Testing
Start both services and verify API connectivity:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

---

## Deployment

The Enterprise News Analyzer supports Docker deployment:
```bash
cd enterprise-news-analyzer
docker-compose up -d
```

Data prototypes can be deployed to Vercel directly from the Next.js app.

---

## File Locations Reference

- **Skills**: `/.claude/skills/{skill-name}/SKILL.md`
- **Project Specs**: `/{project-name}/Product-Spec.md`
- **UI Prompts**: `/{project-name}/UI-Prompts.md`
- **Changelog**: `/{project-name}/Product-Spec-CHANGELOG.md`
- **Backend Config**: `/{project-name}/backend/.env`
- **Frontend Config**: `/{project-name}/frontend/.env`

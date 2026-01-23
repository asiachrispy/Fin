from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from contextlib import asynccontextmanager
from app.core.config import settings
from app.models.database import engine
from app.models import models
from app.api import events, companies
from tasks.crawler_tasks import async_crawl_news, async_analyze_events

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Scheduler instance
scheduler = AsyncIOScheduler()

async def scheduled_crawl_and_analyze():
    """
    Combined task for scheduler.
    """
    print("Executing scheduled crawl and analysis...")
    await async_crawl_news()
    await async_analyze_events()
    print("Scheduled task completed.")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting scheduler...")
    # Schedule tasks: 8:00, 13:00, 19:00
    scheduler.add_job(scheduled_crawl_and_analyze, CronTrigger(hour=8, minute=0))
    scheduler.add_job(scheduled_crawl_and_analyze, CronTrigger(hour=13, minute=0))
    scheduler.add_job(scheduled_crawl_and_analyze, CronTrigger(hour=19, minute=0))
    
    # Also add a job to run shortly after startup for demonstration (after 10 seconds)
    # scheduler.add_job(scheduled_crawl_and_analyze, 'date', run_date=datetime.now() + timedelta(seconds=10))
    
    scheduler.start()
    yield
    # Shutdown
    print("Shutting down scheduler...")
    scheduler.shutdown()

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="为企业高管提供全球突发事件的智能监控和业务影响分析服务",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(events.router, prefix="/api")
app.include_router(companies.router, prefix="/api")


@app.get("/")
async def root():
    return {
        "message": "全球突发事件影响分析系统 API",
        "version": settings.APP_VERSION,
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

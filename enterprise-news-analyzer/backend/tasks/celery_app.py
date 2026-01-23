from celery import Celery
from app.core.config import settings

# Create Celery app
celery_app = Celery(
    "news_analyzer",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND
)

# Celery configuration
celery_app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='Asia/Shanghai',
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,  # 30 minutes
    task_soft_time_limit=25 * 60,  # 25 minutes
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=1000,
)

# Schedule periodic tasks
celery_app.conf.beat_schedule = {
    'crawl-news-daily': {
        'task': 'tasks.crawler_tasks.crawl_news_task',
        'schedule': 60 * 60 * 24,  # Run daily
        'options': {'expires': 60 * 60}  # Expire after 1 hour
    },
}

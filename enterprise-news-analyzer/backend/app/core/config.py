from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "全球突发事件影响分析系统"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # OpenAI
    OPENAI_API_KEY: str

    # Database
    DATABASE_URL: str = "sqlite:///./news_analyzer.db"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # News Crawler
    NEWS_SOURCES: List[str] = ["BBC", "CNN", "Reuters", "Bloomberg"]
    CRAWL_INTERVAL_DAYS: int = 1
    MAX_NEWS_PER_SOURCE: int = 50
    CRAWL_TIMEOUT: int = 30

    # Celery
    CELERY_BROKER_URL: str = "redis://localhost:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/0"

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()

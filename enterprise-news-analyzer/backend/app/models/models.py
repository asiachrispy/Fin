from sqlalchemy import Column, String, Integer, Text, DateTime, Float
from sqlalchemy.sql import func
from app.models.database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    source = Column(String, nullable=False)
    published_at = Column(DateTime, nullable=False)
    url = Column(String, nullable=False, unique=True)
    impact_score = Column(Integer, default=0)
    impact_summary = Column(Text)
    analysis_status = Column(String, default="pending")  # pending, success, failed
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


class Company(Base):
    __tablename__ = "companies"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    industry = Column(String)
    business_description = Column(Text)
    main_markets = Column(String)
    competitors = Column(String)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


class CrawlLog(Base):
    __tablename__ = "crawl_logs"

    id = Column(String, primary_key=True, index=True)
    source = Column(String, nullable=False)
    status = Column(String, nullable=False)  # success, failed
    news_count = Column(Integer, default=0)
    error_message = Column(Text)
    created_at = Column(DateTime, default=func.now())

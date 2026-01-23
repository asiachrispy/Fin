from fastapi import APIRouter, Depends, HTTPException, Query, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
from app.models.database import get_db
from app.models.models import Event
from tasks.crawler_tasks import async_crawl_news, async_analyze_events
import asyncio

router = APIRouter(prefix="/events", tags=["events"])


@router.post("/refresh")
async def refresh_events(background_tasks: BackgroundTasks = None):
    """
    Trigger manual news crawling and analysis.
    """
    try:
        # Run async tasks directly since we are in an async context
        crawl_result = await async_crawl_news()
        
        # Trigger analysis
        analysis_result = await async_analyze_events()
        
        return {
            "status": "success",
            "message": "Events refreshed successfully",
            "crawl_result": crawl_result,
            "analysis_result": analysis_result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/")
async def get_events(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    keyword: Optional[str] = None,
    impact_level: Optional[str] = None,
    analysis_status: Optional[str] = None,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Get paginated list of events with filters.
    """
    query = db.query(Event)

    # Apply filters
    if keyword:
        query = query.filter(
            (Event.title.contains(keyword)) |
            (Event.impact_summary.contains(keyword))
        )

    if impact_level:
        if impact_level == "low":
            query = query.filter(Event.impact_score.between(1, 3))
        elif impact_level == "medium":
            query = query.filter(Event.impact_score.between(4, 6))
        elif impact_level == "high":
            query = query.filter(Event.impact_score >= 7)

    if analysis_status and analysis_status != "all":
        query = query.filter(Event.analysis_status == analysis_status)

    if date_from:
        try:
            date_from_obj = datetime.fromisoformat(date_from)
            query = query.filter(Event.published_at >= date_from_obj)
        except ValueError:
            pass

    if date_to:
        try:
            date_to_obj = datetime.fromisoformat(date_to)
            query = query.filter(Event.published_at <= date_to_obj)
        except ValueError:
            pass

    # Order by published date descending
    query = query.order_by(Event.published_at.desc())

    # Get total count
    total = query.count()

    # Apply pagination
    offset = (page - 1) * page_size
    events = query.offset(offset).limit(page_size).all()

    # Convert to dict
    events_data = []
    for event in events:
        events_data.append({
            "id": event.id,
            "title": event.title,
            "content": event.content,
            "source": event.source,
            "publishedAt": event.published_at.isoformat(),
            "url": event.url,
            "impactScore": event.impact_score,
            "impactSummary": event.impact_summary,
            "analysisStatus": event.analysis_status,
            "createdAt": event.created_at.isoformat()
        })

    return {
        "items": events_data,
        "total": total,
        "page": page,
        "pageSize": page_size,
        "totalPages": (total + page_size - 1) // page_size
    }


@router.get("/{event_id}")
async def get_event(event_id: str, db: Session = Depends(get_db)):
    """
    Get a single event by ID.
    """
    event = db.query(Event).filter(Event.id == event_id).first()

    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    return {
        "id": event.id,
        "title": event.title,
        "content": event.content,
        "source": event.source,
        "publishedAt": event.published_at.isoformat(),
        "url": event.url,
        "impactScore": event.impact_score,
        "impactSummary": event.impact_summary,
        "analysisStatus": event.analysis_status,
        "createdAt": event.created_at.isoformat()
    }

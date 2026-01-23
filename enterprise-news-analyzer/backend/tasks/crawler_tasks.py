import asyncio
from celery import shared_task
from app.models.database import SessionLocal
from app.models.models import Event, CrawlLog, Company
from app.services.crawler import crawl_all_sources
from app.services.openai_service import analyze_impact
import uuid

async def async_crawl_news():
    """
    Async implementation of news crawling.
    """
    db = SessionLocal()
    log_id = str(uuid.uuid4())

    try:
        print("Starting news crawl...")

        # Crawl all sources
        results = await crawl_all_sources()

        total_news = 0
        for source, articles in results.items():
            print(f"Processing {len(articles)} articles from {source}")

            # Save articles to database
            for article in articles:
                # Check if article already exists
                existing = db.query(Event).filter(Event.url == article['url']).first()
                if existing:
                    continue

                # Create new event
                event = Event(
                    id=str(uuid.uuid4()),
                    title=article['title'],
                    content=article['content'],
                    source=article['source'],
                    published_at=article['published_at'],
                    url=article['url']
                )

                db.add(event)
                total_news += 1

            # Log crawl result
            log = CrawlLog(
                id=str(uuid.uuid4()),
                source=source,
                status='success',
                news_count=len(articles)
            )
            db.add(log)

        db.commit()
        print(f"News crawl completed. Added {total_news} new articles.")

        return {
            'status': 'success',
            'total_news': total_news,
            'sources': len(results)
        }

    except Exception as e:
        print(f"Error in crawl_news_task: {str(e)}")

        # Log error
        log = CrawlLog(
            id=log_id,
            source='all',
            status='failed',
            error_message=str(e)
        )
        db.add(log)
        db.commit()

        return {
            'status': 'failed',
            'error': str(e)
        }
    finally:
        db.close()

@shared_task(name='tasks.crawler_tasks.crawl_news_task')
def crawl_news_task():
    """
    Periodic task to crawl news from all sources.
    """
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
    
    if loop.is_running():
        # If we are in a running loop (e.g. FastAPI), we can't use run_until_complete
        # This path shouldn't be hit by Celery worker, but might be by direct call
        # For direct call from async context, use async_crawl_news directly
        raise RuntimeError("Call async_crawl_news() directly from async context")
    
    return loop.run_until_complete(async_crawl_news())


async def async_analyze_events():
    """
    Async implementation of event analysis.
    """
    db = SessionLocal()

    try:
        print("Starting impact analysis...")

        # Get all pending events
        pending_events = db.query(Event).filter(
            Event.analysis_status == 'pending',
            Event.impact_score == 0
        ).limit(100).all()

        if not pending_events:
            print("No pending events to analyze.")
            return {'status': 'success', 'analyzed': 0}

        # Get all companies
        companies = db.query(Company).all()
        
        # Use the first company found, or a default one if none exist
        target_company = companies[0] if companies else None
        
        if not target_company:
             # Default generic company context if database is empty
             company_info = {
                "name": "Generic Tech Company",
                "industry": "Technology",
                "business_description": "A representative technology company operating in global markets.",
                "main_markets": "Global",
                "competitors": "Major tech giants"
            }
        else:
            company_info = {
                "name": target_company.name,
                "industry": target_company.industry,
                "business_description": target_company.business_description,
                "main_markets": target_company.main_markets,
                "competitors": target_company.competitors
            }

        analyzed_count = 0
        for event in pending_events:
            try:
                # Analyze impact using the target company context
                analysis = await analyze_impact(
                    event.title,
                    event.content,
                    company_info
                )

                # Update event
                event.impact_score = analysis['impact_score']
                event.impact_summary = analysis['impact_summary']
                event.analysis_status = analysis['analysis_status']

                analyzed_count += 1

                # Add delay to avoid rate limiting
                await asyncio.sleep(1)

            except Exception as e:
                print(f"Error analyzing event {event.id}: {str(e)}")
                event.analysis_status = 'failed'
                continue

        db.commit()
        print(f"Impact analysis completed. Analyzed {analyzed_count} events.")

        return {
            'status': 'success',
            'analyzed': analyzed_count
        }

    except Exception as e:
        print(f"Error in analyze_events_task: {str(e)}")
        return {
            'status': 'failed',
            'error': str(e)
        }
    finally:
        db.close()

@shared_task(name='tasks.crawler_tasks.analyze_events_task')
def analyze_events_task():
    """
    Analyze impact for events that haven't been analyzed yet.
    """
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        
    if loop.is_running():
        raise RuntimeError("Call async_analyze_events() directly from async context")
        
    return loop.run_until_complete(async_analyze_events())

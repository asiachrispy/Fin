import asyncio
import aiohttp
import feedparser
import re
from datetime import datetime
from typing import List, Dict, Optional
from app.core.config import settings

# RSS Feed configurations
RSS_SOURCES = {
    # Tech & AI (重点)
    "36Kr": "https://36kr.com/feed",
    "TechCrunch": "https://techcrunch.com/feed/",
    "TheVerge": "https://www.theverge.com/rss/index.xml",
    "Solidot": "https://www.solidot.org/index.rss",
    
    # Global & Economics (中文优先)
    # "BingNewsCN": "https://www.bing.com/news/rss?cc=CN",
    # "BingNewsGlobal": "https://www.bing.com/news/rss?cc=US",
    # "FTChinese": "https://www.ftchinese.com/rss/news",
}

JINA_READER_PREFIX = "https://r.jina.ai/"

def _parse_date(entry) -> datetime:
    """Parse date from RSS entry"""
    if hasattr(entry, "published_parsed") and entry.published_parsed:
        return datetime(*entry.published_parsed[:6])
    return datetime.now()

async def fetch_rss_feed(source: str, url: str) -> List[Dict]:
    """
    Fetch and parse RSS feed directly using feedparser first.
    """
    try:
        print(f"Fetching RSS feed for {source}: {url}")
        
        # Use aiohttp to fetch RSS content with headers
        headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
            "Accept": "application/rss+xml, application/xml, text/xml, */*"
        }
        
        async with aiohttp.ClientSession(headers=headers) as session:
            try:
                async with session.get(url, timeout=20) as response:
                    if response.status == 200:
                        content = await response.text()
                        feed = feedparser.parse(content)
                        
                        articles = []
                        for entry in feed.entries[:settings.MAX_NEWS_PER_SOURCE]:
                            # Try to find content in summary or content field
                            summary = entry.get("summary", "")
                            content = ""
                            if hasattr(entry, "content"):
                                content = entry.content[0].value
                            
                            # Clean up HTML tags if needed, but for now keep it simple
                            description = content if len(content) > len(summary) else summary
                            if not description:
                                description = entry.get("title", "")

                            article = {
                                "title": entry.get("title", "No Title"),
                                "link": entry.get("link", ""),
                                "published_at": _parse_date(entry),
                                "source": source,
                                "content": description, # Default to RSS description
                                "need_full_content": len(description) < 200 # Flag to fetch full content if description is short
                            }
                            
                            if article["link"]:
                                articles.append(article)
                        
                        return articles
                    else:
                        print(f"Failed to fetch RSS for {source}: HTTP {response.status}")
                        return []
            except Exception as e:
                print(f"Error fetching RSS for {source}: {str(e)}")
                return []
                
    except Exception as e:
        print(f"Error processing RSS for {source}: {str(e)}")
        return []

async def fetch_full_content(session: aiohttp.ClientSession, url: str) -> Optional[str]:
    """
    Fetch full content using Jina Reader.
    """
    jina_url = f"{JINA_READER_PREFIX}{url}"
    try:
        # Random delay to avoid rate limiting
        await asyncio.sleep(1) 
        
        headers = {
             "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
        }
        
        async with session.get(jina_url, timeout=30, headers=headers) as response:
            if response.status == 200:
                return await response.text()
            elif response.status == 429:
                print(f"Rate limited by Jina for {url}")
                return None
            else:
                print(f"Jina Reader failed for {url}: {response.status}")
                return None
    except Exception as e:
        print(f"Error fetching content from Jina for {url}: {str(e)}")
        return None

async def process_article(session: aiohttp.ClientSession, article: Dict) -> Dict:
    """
    Fetch full content for an article if needed.
    """
    # If we already have enough content from RSS, skip Jina to save quota/time
    if not article.get("need_full_content", True):
         article["url"] = article["link"]
         return article

    # Otherwise try to fetch full content
    content = await fetch_full_content(session, article["link"])
    if content:
        article["content"] = content
    
    # Fallback to existing content if fetch fails, don't return None
    article["url"] = article["link"] # Normalize URL field
    return article

async def fetch_news_from_source(source: str, session: aiohttp.ClientSession) -> List[Dict]:
    """
    Fetch news from a source.
    """
    # 1. Fetch RSS items
    rss_url = RSS_SOURCES.get(source)
    rss_articles = await fetch_rss_feed(source, rss_url)
    print(f"Found {len(rss_articles)} items in RSS for {source}")
    
    if not rss_articles:
        return []

    # 2. Fetch full content in parallel (limit concurrency)
    # Use a semaphore to limit concurrent Jina requests
    sem = asyncio.Semaphore(3) # Max 3 concurrent requests per source
    
    async def process_with_sem(article):
        async with sem:
            return await process_article(session, article)

    tasks = []
    for article in rss_articles:
        tasks.append(process_with_sem(article))
    
    results = await asyncio.gather(*tasks)
    
    # Filter out failed fetches (although process_article now handles fallbacks)
    full_articles = [r for r in results if r is not None]
    print(f"Processed {len(full_articles)} articles from {source}")
    
    return full_articles

async def crawl_all_sources() -> Dict[str, List[Dict]]:
    """
    Crawl all sources.
    """
    results = {}
    async with aiohttp.ClientSession() as session:
        tasks = []
        sources = list(RSS_SOURCES.keys())
        
        for source in sources:
            tasks.append(fetch_news_from_source(source, session))
            
        fetched_results = await asyncio.gather(*tasks)
        
        for source, articles in zip(sources, fetched_results):
            results[source] = articles
            
    return results

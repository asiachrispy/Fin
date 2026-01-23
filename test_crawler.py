import asyncio
import os
import sys

# Add backend directory to path
sys.path.append(os.path.join(os.getcwd(), "enterprise-news-analyzer/backend"))

# Mock settings if needed, but we can try importing app.core.config
try:
    from app.services.crawler import crawl_all_sources
except ImportError:
    # Set environment variables if import fails due to missing .env
    os.environ["OPENAI_API_KEY"] = "dummy"
    from app.services.crawler import crawl_all_sources

async def main():
    print("Starting crawl test...")
    results = await crawl_all_sources()
    for source, articles in results.items():
        print(f"Source: {source}, Articles fetched: {len(articles)}")
        if articles:
            print(f"Sample article: {articles[0]['title']}")

if __name__ == "__main__":
    asyncio.run(main())

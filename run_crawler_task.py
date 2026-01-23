import os
import sys

# Add backend directory to path
sys.path.append(os.path.join(os.getcwd(), "enterprise-news-analyzer/backend"))

# Mock environment variables if needed
os.environ["OPENAI_API_KEY"] = "dummy"

from tasks.crawler_tasks import crawl_news_task

if __name__ == "__main__":
    print("Manually running crawl_news_task...")
    result = crawl_news_task()
    print("Task Result:", result)

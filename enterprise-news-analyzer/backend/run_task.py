import os
import sys

# Mock environment variables
os.environ["OPENAI_API_KEY"] = "dummy"

from tasks.crawler_tasks import crawl_news_task

if __name__ == "__main__":
    print("Manually running crawl_news_task from backend...")
    result = crawl_news_task()
    print("Task Result:", result)

import os
import sys
import asyncio

# Mock environment variables
os.environ["OPENAI_API_KEY"] = "dummy"

from tasks.crawler_tasks import analyze_events_task

if __name__ == "__main__":
    print("Manually running analyze_events_task from backend...")
    result = analyze_events_task()
    print("Task Result:", result)

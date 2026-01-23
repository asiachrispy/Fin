import os
import re
import time
import urllib.request
import html
import ssl
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

BASE_RSS_URLS = [
    "https://www.bing.com/news/rss?cc=cn&setlang=zh-cn",
    "https://www.cnr.cn/newscenter/gjxw/index_504031106.xml",
    "https://www.cnr.cn/tupian/index_504031106.xml",
    "https://news.google.com/rss?hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
]

DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
}

def _fetch_rss_bytes(urls, timeout=15, retries=2, backoff=1.2):
    # Create SSL context with certificate verification (CWE-295)
    ssl_context = ssl.create_default_context()
    ssl_context.verify_mode = ssl.CERT_REQUIRED

    last_error = None
    for url in urls:
        for attempt in range(retries + 1):
            try:
                request = urllib.request.Request(url, headers=DEFAULT_HEADERS)
                with urllib.request.urlopen(request, timeout=timeout, context=ssl_context) as resp:
                    return resp.read()
            except Exception as exc:
                last_error = exc
                if attempt < retries:
                    time.sleep(backoff * (attempt + 1))
                    continue
        continue
    raise RuntimeError("无法获取RSS数据: 请检查网络连接或重试")

def _build_urls():
    env_urls = os.getenv("HOT_RSS_URLS", "")
    if env_urls.strip():
        # Validate URL format to prevent injection (CWE-20)
        url_pattern = re.compile(r'^https?://[^\s/$.?#].[^\s]*$', re.IGNORECASE)
        bases = []
        for u in env_urls.split(","):
            u = u.strip()
            if u and url_pattern.match(u):
                bases.append(u)
    else:
        bases = BASE_RSS_URLS

    urls = []
    seen = set()
    for u in bases:
        if u not in seen:
            urls.append(u)
            seen.add(u)
        # Add jina.ai proxy for each HTTP(S) URL
        if u.startswith("https://") or u.startswith("http://"):
            # Ensure we're using a clean URL for the proxy (CWE-20)
            clean_url = u.replace("https://", "").replace("http://", "")
            proxy = f"https://r.jina.ai/http://{clean_url}"
            if proxy not in seen:
                urls.append(proxy)
                seen.add(proxy)
    return urls

def _parse_today_items(data, limit=5):
    # Prevent XXE attacks by using defusedxml or limiting parser (CWE-611)
    # Standard xml.etree.ElementTree has limited XXE protection
    try:
        # Try to use defusedxml if available (recommended)
        from defusedxml.ElementTree import fromstring
        root = fromstring(data)
    except ImportError:
        # Fallback: use standard parser with basic protection
        parser = ET.XMLParser(target=ET.TreeBuilder())
        root = ET.fromstring(data, parser=parser)
    items = root.findall(".//item")

    today = datetime.now(timezone.utc).astimezone().date()
    today_items = []

    for item in items:
        title_el = item.find("title")
        link_el = item.find("link")
        pub_el = item.find("pubDate")

        if title_el is None or link_el is None or pub_el is None:
            continue

        pub_dt = parsedate_to_datetime(pub_el.text).astimezone()
        if pub_dt.date() == today:
            today_items.append((title_el.text.strip(), link_el.text.strip()))

    if len(today_items) < limit:
        for item in items:
            if len(today_items) >= limit:
                break
            title_el = item.find("title")
            link_el = item.find("link")
            if title_el is None or link_el is None:
                continue
            candidate = (title_el.text.strip(), link_el.text.strip())
            if candidate not in today_items:
                today_items.append(candidate)

    return today_items[:limit]

def fetch_today_hot_events(limit=5):
    data = _fetch_rss_bytes(_build_urls())
    return _parse_today_items(data, limit=limit)

if __name__ == "__main__":
    events = fetch_today_hot_events(5)
    for i, (title, link) in enumerate(events, 1):
        # Escape HTML entities to prevent XSS (CWE-79)
        safe_title = html.escape(title)
        safe_link = html.escape(link)
        print(f"{i}. {safe_title}\n   {safe_link}")

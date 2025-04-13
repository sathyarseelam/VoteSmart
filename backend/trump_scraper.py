import os
import re
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from typing import List, Dict
from bs4 import Tag

load_dotenv()

# 1) Load URL
TRUMP_URL = os.getenv("TRUMP_URL")
if not TRUMP_URL:
    raise RuntimeError("Set TRUMP_URL in .env")

def fetch_main_page() -> BeautifulSoup:
    resp = requests.get(TRUMP_URL, timeout=10)
    resp.raise_for_status()
    return BeautifulSoup(resp.text, "html.parser")

def parse_policies(soup: BeautifulSoup) -> List[Dict[str,str]]:
    policies = []
    # find each policy block
    for section in soup.select('section.section'):
        # 1) the name is the span under the <a class="bar…">
        name_tag = section.select_one('a.bar span')
        # 2) the description is the <p> inside <div class="pb-4 body">
        desc_tag = section.select_one('div.pb-4.body p')

        if name_tag and desc_tag:
            name = name_tag.get_text(strip=True)
            desc = desc_tag.get_text(strip=True)
            policies.append({'name': name, 'description': desc})

    return policies

# if __name__ == '__main__':
#     # 1) fetch and parse
#     soup     = fetch_main_page()
#     policies = parse_policies(soup)

#     # 2) print a quick summary
#     print(f"Found {len(policies)} policies:\n")
#     for i, pol in enumerate(policies, 1):
#         print(f"{i}. {pol['name']!r}")
#         print(f"   → {pol['description']!r}\n")

import os
import re
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import google.generativeai as genai
from typing import List, Dict
from bs4 import Tag
from urllib.parse import urljoin
import json



load_dotenv()

# 1) Load URL
PROPS_URL = os.getenv("PROPS_URL")
if not PROPS_URL:
    raise RuntimeError("Set PROPS_URL in .env")

TARGET_PROPS = {"Prop 2","Prop 3","Prop 4","Prop 5","Prop 6", "Prop 32","Prop 33","Prop 34","Prop 35","Prop 36"}

# Parse the main page 
def fetch_main_page() -> BeautifulSoup:
    resp = requests.get(PROPS_URL, timeout=10)
    resp.raise_for_status()
    return BeautifulSoup(resp.text, "html.parser")

# Extract prop blocks on main page
def extract_prop_blocks(soup: BeautifulSoup) -> List[Dict]:
    blocks: List[Dict] = [] # list of dictionaries where each dict is a prop block with its details 

    for div in soup.find_all("div", id = re.compile(r"^prop-\d+$")):
        # prop number label
        label = div.find("p", class_= re.compile(r"prop-label"))
        prop_num = label.get_text(strip=True) if label else None
        if prop_num not in TARGET_PROPS:
            continue

        # prop title
        h2 = div.find("h2")
        strong = h2.find("strong") if h2 else None
        title = strong.get_text(strip=True) if strong else "(No title)"
        
        learn_more = div.find("a", string=re.compile(r"Learn More", re.I))
        if not learn_more or not learn_more.get("href"):
            continue
        detail_url = urljoin(PROPS_URL, learn_more["href"])

        blocks.append({
            "number": prop_num,
            "title": title,
            "url": detail_url
        })
    return blocks

# Fetch the details of a specific prop
def fetch_prop_details(url: str) -> str:
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")
    
    # Extract the text from the main content area
    def gather_after(header_id:str) -> List[str]:
        hdr = soup.find(id=header_id)
        if not hdr:
            return []
        parts: List[str] = []

        for sib in hdr.next_siblings:
        # we only care about Tag objects, ignore others
            if not isinstance(sib, Tag):
                continue
            # if it's a heading (h1, h2, h3, etc.), stop
            name = sib.name or ""
            if name.startswith("h"):
                break
            # if it's a paragraph, collect it
            if name == "p":
                parts.append(sib.get_text(strip=True))
        return parts
    
    what = gather_after("h-what-would-it-do")
    why  = gather_after("h-why-is-it-on-the-ballot")

    return "\n\n".join(what + [""] + why)



if __name__ == "__main__":
    # 1) Load & parse the main page
    soup = fetch_main_page()

    # 2) Find all target props
    props = extract_prop_blocks(soup)

    # 3) For each one, fetch the detailed text
    for p in props:
        p["details"] = fetch_prop_details(p["url"])

    # 4) Print the entire list as pretty JSON
    print(json.dumps(props, indent=2, ensure_ascii=False))
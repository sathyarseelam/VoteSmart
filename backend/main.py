import os
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
from scraper import fetch_main_page, extract_prop_blocks, fetch_prop_details
from gemini import simplify_description, simplify_paragraph, people_affected

app = FastAPI()

# Allow CORS for your frontend (adjust origins as necessary)
origins = ["http://localhost:8080"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory cache for scraped propositions
propositions_cache: List[Dict] = []


# --- Data Models ---
class Proposition(BaseModel):
    number: str
    title: str
    url: str
    details: Optional[str] = None
    simplified_description: Optional[str] = None
    simplified_paragraph: Optional[str] = None
    affected_people: Optional[str] 


# --- Endpoints ---

@app.get("/scrape-propositions", response_model=List[Proposition])
def get_scraped_propositions():
    """
    Scrape the propositions from the target website.
    For each proposition, fetch detailed text.
    """
    try:
        soup = fetch_main_page()  # Load and parse the main page
        props = extract_prop_blocks(soup)  # Extract proposition blocks

        # For each prop, fetch the details and add to the dictionary.
        for prop in props:
            prop["details"] = fetch_prop_details(prop["url"])
        # Update cache
        global propositions_cache
        propositions_cache = props
        return props
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error scraping propositions: {str(e)}")


@app.get("/simplify-propositions", response_model=List[Proposition])
def get_simplified_propositions():
    """
    Use Gemini to simplify the proposition details.
    Returns both the simplified description (short version) and simplified paragraph (longer version).
    Ensure that the scraping endpoint has been called first or that propositions_cache is populated.
    """
    if not propositions_cache:
        raise HTTPException(status_code=404, detail="No propositions have been scraped yet. Call /scrape-propositions first.")
    
    simplified_props = []
    for prop in propositions_cache:
        details = prop.get("details", "")
        # Use Gemini API functions to simplify the details.
        try:
            simple_desc = simplify_description(details)
            simple_para = simplify_paragraph(details)
            people_aff = people_affected(details)
        except Exception as e:
            simple_desc = f"Error in simplification: {str(e)}"
            simple_para = f"Error in simplification: {str(e)}"
            people_aff = f"Error in formulating: {str(e)}"
        
        # Add the simplified texts to the proposition data.
        prop["simplified_description"] = simple_desc
        prop["simplified_paragraph"] = simple_para
        prop["affected_people"] = people_aff
        simplified_props.append(prop)
    
    return simplified_props


@app.get("/")
def read_root():
    return {"message": "Welcome to the Proposition API!"}


# --- MAIN SECTION ---
if __name__ == "__main__":
    # Optionally, you can pre-scrape propositions here for testing purposes.
    try:
        soup = fetch_main_page()
        props = extract_prop_blocks(soup)
        for prop in props:
            prop["details"] = fetch_prop_details(prop["url"])
        propositions_cache = props
        print("Pre-scraped propositions:")
        for p in propositions_cache:
            print(p["number"], p["title"])
    except Exception as e:
        print("Error pre-scraping propositions:", e)
    
    uvicorn.run(app, host="0.0.0.0", port=8000)

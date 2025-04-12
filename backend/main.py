import uvicorn 
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from models import UserData, Proposition

app = FastAPI()

origins = [ 
    "http://localhost:8080",
    # other APIs
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

memory_db = {
    "user_data": [],        # will hold dicts matching UserData
    "propositions": []      # will hold dicts matching Proposition
}


# --- USER DATA endpoints ---

# Get all user data entries
@app.get("/user_data", response_model=List[UserData])
def get_user_data():
    return memory_db["user_data"]

# Create a new user data entry
@app.post("/user_data", response_model=UserData, status_code=201)
def create_user_data(entry: UserData):
    memory_db["user_data"].append(entry.model_dump())
    return entry

# Get a single entry by index (or by some id if you add one)
@app.get("/user_data/{index}", response_model=UserData)
def read_user_data(index: int):
    try:
        return memory_db["user_data"][index]
    except IndexError:
        raise HTTPException(status_code=404, detail="Entry not found")

# --- PROPOSITION endpoints ---

@app.get("/propositions", response_model=List[Proposition])
def get_propositions():
    return memory_db["propositions"]

@app.post("/propositions", response_model=Proposition, status_code=201)
def create_proposition(prop: Proposition):
    memory_db["propositions"].append(prop.dict())
    return prop

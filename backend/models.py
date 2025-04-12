from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class PolicyOption(str, Enum):
    left = "Left leaning"
    slightly_left = "Slightly left"
    neutral = "No opinion"
    slightly_right = "Slightly right"
    right = "Right leaning"


class UserData(BaseModel):
    gender: Optional[str]
    county: str
    income_bracket: Optional[str]
    education_level: Optional[str]
    occupation: Optional[str]
    family_size: Optional[str]
    race_ethnicity: Optional[List[str]]
    ca_benefits: Optional[List[str]]
    policy_interests: Optional[List[PolicyOption]]


class Proposition(BaseModel):
    name: str #prop number
    title: str # prop title
    description: str #scraped detail text 


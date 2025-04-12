import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables.")

genai.configure(api_key=api_key)
model = genai.GenerativeModel(model_name="gemini-2.5-pro-experimental")

def generate_text(prompt: str) -> str:
    resp = model.generate_content(prompt)
    return resp.text

def text_summarization(text: str) -> str:
    resp = model.generate_content(f"Summarize this: {text}")
    return resp.text

def question_answering(context: str, question: str) -> str:
    resp = model.generate_content(f"Question: {question} Context: {context}")
    return resp.text

def sentiment_analysis(text: str) -> str:
    resp = model.generate_content(f"Analyze the sentiment of this text: {text}")
    return resp.text

def simplify(text: str) -> str:
    """
    Ask Gemini to rewrite `text` in clear, everyday language without legal or technical jargon.
    """
    prompt = (
        "Rewrite the following in clear, everyday language without legal or technical jargon:\n\n"
        f"{text}"
    )
    resp = model.generate_content(prompt)
    return resp.text.strip()
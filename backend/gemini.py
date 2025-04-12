# simplies legal text 
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables.")

genai.configure(api_key=api_key)
model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")

# blurb on the tab
def simplify_description(text: str) -> str:
    """
    Ask Gemini to rewrite `text` in clear, everyday language without legal or technical jargon.
    """
    prompt = (
        "Rewrite the following in two sentences in clear, everyday language without legal or technical jargon:\n\n"
        f"{text}"
    )
    resp = model.generate_content(prompt)
    return resp.text.strip()

# pop up information
def simplify_paragraph(text: str) -> str:
    """
    Ask Gemini to rewrite `text` in clear, everyday language without legal or technical jargon.
    """
    prompt = (
        "Rewrite the following in 3-4 in clear, everyday language without legal or technical jargon:\n\n"
        f"{text}"
    )
    resp = model.generate_content(prompt)
    return resp.text.strip()

# pop up information
def people_affected(text: str) -> str:
    """
    Use Gemini to analyze who would be positively or negatively affected by the proposition.
    """
    prompt = (
        "Who would benefit and who might be hurt by this proposition? "
        "Keep it short and simple. Use two short bullet lists: 'Positively Affected' and 'Negatively Affected'.\n\n"
        f"{text}"
    )

    resp = model.generate_content(prompt)
    return resp.text.strip()



if __name__ == "__main__":
    sample_text = (
        "In accordance with Section 4.2 of the Municipal Code, all residents are hereby required to comply "
        "with newly instated waste management procedures effective June 1st, 2025. This includes the segregation "
        "of biodegradable and non-biodegradable waste, adherence to designated disposal schedules, and the use of "
        "city-approved recycling containers. Non-compliance may result in monetary fines or other penalties as "
        "outlined by city ordinances."
    )

    print("\nSimplified Description:\n", simplify_description(sample_text))
    print("\nSimplified Paragraph:\n", simplify_paragraph(sample_text))
    print("\nPeople Affected:\n", people_affected(sample_text))


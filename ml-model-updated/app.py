from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import re
from datetime import datetime
import pytz
import dateparser

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML artifacts
model = pickle.load(open("priority_model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

IST = pytz.timezone("Asia/Kolkata")

PROMO_KEYWORDS = [
    "unsubscribe", "newsletter", "privacy policy", "terms",
    "github team", "community", "instagram", "linkedin",
    "twitter", "youtube", "twitch"
]

def is_promotional(text: str) -> bool:
    return any(k in text.lower() for k in PROMO_KEYWORDS)

def clean_text(text: str) -> str:
    text = re.sub(r"https?://\S+", " ", text)
    text = re.sub(r"[*_`]", " ", text)
    text = re.sub(r"[\u200B-\u200D\uFEFF]", "", text)
    text = re.sub(r"[\U00010000-\U0010ffff]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def extract_deadline(text: str):
    # Numeric date (DD/MM/YYYY, DD-MM-YYYY)
    numeric = re.search(
        r"\b(\d{1,2})[./-](\d{1,2})[./-](\d{4})\b",
        text
    )
    if numeric:
        try:
            d, m, y = map(int, numeric.groups())
            return IST.localize(datetime(y, m, d, 10, 0))
        except ValueError:
            pass

    # Textual month date (23 December 2026)
    month_map = {
        "january": 1, "february": 2, "march": 3, "april": 4,
        "may": 5, "june": 6, "july": 7, "august": 8,
        "september": 9, "october": 10, "november": 11, "december": 12
    }

    textual = re.search(
        r"\b(\d{1,2})\s+"
        r"(january|february|march|april|may|june|july|august|"
        r"september|october|november|december)\s+"
        r"(\d{4})\b",
        text.lower()
    )

    if textual:
        d = int(textual.group(1))
        m = month_map[textual.group(2)]
        y = int(textual.group(3))
        return IST.localize(datetime(y, m, d, 10, 0))

    # NLP fallback (optional)
    parsed = dateparser.parse(
        text,
        languages=["en"],
        settings={
            "DATE_ORDER": "DMY",
            "PREFER_DATES_FROM": "future",
            "TIMEZONE": "Asia/Kolkata",
            "RETURN_AS_TIMEZONE_AWARE": True
        }
    )

    if parsed:
        return parsed.replace(hour=10, minute=0, second=0, microsecond=0)

    return None

def split_sentences(text: str):
    return [s.strip(" .:-\n\t") for s in re.split(r"(?<=[.!?])\s+|\n+", text) if s.strip()]

def extract_task(text: str, subject: str = ""):
    task_keywords = [
        "submit", "complete", "finish", "send", "share", "review",
        "prepare", "attend", "upload", "fill", "pay", "register",
        "schedule", "update", "respond", "reply", "confirm"
    ]
    deadline_keywords = [
        "deadline", "due", "before", "by", "until", "last date",
        "submit by", "complete by"
    ]

    sentences = split_sentences(text)
    scored = []

    for sentence in sentences:
        lowered = sentence.lower()
        score = 0

        if any(keyword in lowered for keyword in task_keywords):
            score += 2
        if re.search(r"\b(please|kindly|required to|must|ensure that|you are required)\b", lowered):
            score += 3
        if any(keyword in lowered for keyword in deadline_keywords):
            score += 2
        if re.search(r"\b\d{1,2}[./-]\d{1,2}[./-]\d{4}\b", lowered):
            score += 3
        if re.search(r"\b(final deadline|deadline for submission|due date)\b", lowered):
            score += 2
        if re.search(r"\b(fail to|failure to|lose marks|will not be accepted|late submissions)\b", lowered):
            score -= 4
        if dateparser.parse(
            sentence,
            languages=["en"],
            settings={"DATE_ORDER": "DMY", "PREFER_DATES_FROM": "future"}
        ):
            score += 1

        if score:
            scored.append((score, sentence))

    if scored:
        scored.sort(key=lambda item: item[0], reverse=True)
        task = scored[0][1]
    else:
        task = subject or (sentences[0] if sentences else "Review email")

    task = re.sub(r"\s+", " ", task).strip()
    task = add_task_context(task, subject, text)
    return task[:180]

def add_task_context(task: str, subject: str, text: str):
    combined = f"{subject} {text}".lower()
    context = None

    if re.search(r"\bproject\b", combined):
        context = "project"
    elif re.search(r"\breport\b", combined):
        context = "report"
    elif re.search(r"\bassignment\b", combined):
        context = "assignment"
    elif re.search(r"\bpresentation\b", combined):
        context = "presentation"
    elif re.search(r"\bregistration\b", combined):
        context = "registration"

    if not context:
        return task

    deadline_match = re.search(r"\b(the\s+)?final deadline for submission is\b", task.lower())
    if deadline_match and context not in task.lower():
        return re.sub(
            r"\b(final deadline for submission is)\b",
            f"final deadline for {context} submission is",
            task,
            count=1,
            flags=re.IGNORECASE
        )

    if re.search(r"\bsubmit\b", task.lower()) and context not in task.lower():
        return f"{task} for the {context}"

    return task

def summarize_email(text: str, subject: str = "", task: str = "", deadline = None):
    sentences = split_sentences(text)
    useful_sentences = []

    for sentence in sentences:
        lowered = sentence.lower()
        if re.search(r"\b(fail to|failure to|lose marks|will not be accepted|late submissions)\b", lowered):
            continue
        if any(keyword in lowered for keyword in [
            "required", "submit", "complete", "deadline", "due", "must",
            "include", "upload", "evaluation"
        ]):
            useful_sentences.append(sentence)
        if len(useful_sentences) == 2:
            break

    if useful_sentences:
        summary = " ".join(useful_sentences)
    else:
        summary = subject or (sentences[0] if sentences else "No summary available.")

    if deadline and "deadline" not in summary.lower():
        summary = f"{summary} Deadline: {deadline.strftime('%d/%m/%Y')}."

    return re.sub(r"\s+", " ", summary).strip()[:320]

@app.post("/analyze")
def analyze_email(payload: dict):
    raw_text = payload["text"]
    subject = payload.get("subject", "")
    cleaned = clean_text(raw_text)

    # Ignore promotions always
    if is_promotional(cleaned):
        return {
            "priority": "Ignore",
            "deadline": None,
            "reason": "Promotional email"
        }

    # Extract deadline (FULL TEXT)
    deadline = extract_deadline(cleaned)
    task = extract_task(cleaned, subject)
    summary = summarize_email(cleaned, subject, task, deadline)

    # ML priority
    X = vectorizer.transform([cleaned])
    priority = model.predict(X)[0]

    # Return result (DO NOT ignore non-promo mails)
    return {
        "priority": priority,
        "severity": priority,
        "deadline": deadline.isoformat() if deadline else None,
        "task": task,
        "summary": summary,
        "shouldCreateTask": priority == "High" and deadline is not None
    }

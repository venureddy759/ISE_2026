# AI Email Analyzer - Network Access Setup

This project allows multiple computers on the same WiFi network to access the ML model.

------------------------------------------------------------
STEP 1 — Install Python
------------------------------------------------------------

Install Python 3.10+ from:
https://www.python.org/downloads/

IMPORTANT:
✔ Check "Add Python to PATH"

------------------------------------------------------------
STEP 2 — Open Terminal
------------------------------------------------------------

Open CMD or PowerShell inside the project folder.

------------------------------------------------------------
STEP 3 — Install Dependencies
------------------------------------------------------------

Run:

pip install -r requirements.txt

If FastAPI/Uvicorn are missing:

pip install fastapi uvicorn

------------------------------------------------------------
STEP 4 — Start the Server
------------------------------------------------------------

Run:

uvicorn app:app --host 0.0.0.0 --port 8000

DO NOT close the terminal.

------------------------------------------------------------
STEP 5 — Find Your IP Address
------------------------------------------------------------

Run:

ipconfig

Find:

IPv4 Address

Example:
192.168.1.5

------------------------------------------------------------
STEP 6 — Access From Another Computer
------------------------------------------------------------

Both computers must be connected to SAME WiFi.

Open browser on another computer:

http://YOUR_IP:8000/docs

Example:

http://192.168.1.5:8000/docs

------------------------------------------------------------
STEP 7 — Test API
------------------------------------------------------------

Use POST /analyze

Example JSON:

{
  "subject": "Project Submission",
  "text": "Submit the report before Friday evening."
}

------------------------------------------------------------
STEP 8 — Firewall Fix
------------------------------------------------------------

If another computer cannot connect:

Allow Python through Windows Firewall
OR
Allow TCP Port 8000 manually.

------------------------------------------------------------
PROJECT STRUCTURE
------------------------------------------------------------

app.py               -> FastAPI backend
priority_model.pkl   -> ML model
vectorizer.pkl       -> TF-IDF vectorizer
emails.csv           -> Dataset
train.py             -> Training script

------------------------------------------------------------
DONE
------------------------------------------------------------

Now multiple computers can access your ML model over LAN/WiFi.

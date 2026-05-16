# AI Inbox Web Application

AI Inbox is a full-stack email management web application with:

- React + Vite frontend
- NestJS backend
- PostgreSQL database
- Firebase Authentication
- AI services for email analysis, summarization, translation, and classification

This guide explains how to run the original PostgreSQL-backed version of the project, without mock data mode.

## Project structure

```text
ISE_2026/
  ai-inbox-frontend/
  ai-inbox-backend/
```

## Prerequisites

Install the following before starting:

- Node.js and npm
- PostgreSQL
- pgAdmin 4 or another PostgreSQL client
- Firebase project credentials
- Optional: local AI model server if you want AI analysis features enabled

## 1. Database setup

1. Start PostgreSQL.
2. Create a database named:

```text
semantic_inbox
```

3. Open pgAdmin or another PostgreSQL client.
4. Run the SQL from:

```text
ai-inbox-backend/schema.sql
```

This creates the required tables for users, emails, replies, and search history.

## 2. Backend setup

Open a terminal:

```powershell
cd ai-inbox-backend
npm install
copy .env.example .env
```

Update `.env` with your real configuration:

```env
PORT=3001
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-postgres-password
DB_NAME=semantic_inbox

FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY=your-firebase-private-key

SARVAM_API_KEY=your-api-key-if-used
AI_MODEL_BASE_URL=http://localhost:8000
USE_MOCK_DATA=false
```

Start the backend:

```powershell
npm run start:dev
```

Backend URL:

```text
http://localhost:3001/api
```

## 3. Frontend setup

Open another terminal:

```powershell
cd ai-inbox-frontend
npm install
copy .env.example .env
```

Update frontend `.env`:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
```

Start the frontend:

```powershell
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

If port `5173` is already in use, Vite may automatically start on another port such as `5174`, `5175`, or `5176`.

## 4. AI service setup

If using a local AI model server, start it separately before using AI analysis features.

Expected backend configuration:

```env
AI_MODEL_BASE_URL=http://localhost:8000
```

The backend calls:

```text
POST /analyze
```

on that model server.

## 5. Startup order

Start services in this order:

```text
1. PostgreSQL
2. AI model server, if required
3. Backend
4. Frontend
```

## 6. Common issues

### Backend says unable to connect to database

Check:

- PostgreSQL is running
- database name is `semantic_inbox`
- `.env` values are correct
- port `5432` is open

### Frontend cannot reach backend

Check:

- backend is running on `http://localhost:3001/api`
- frontend `.env` contains the correct `VITE_API_BASE_URL`

### Firebase login fails

Check:

- frontend Firebase values are correct
- backend Firebase admin credentials are correct
- `FIREBASE_PRIVATE_KEY` preserves newline formatting correctly

### AI features do not work

Check:

- local model server is running
- `AI_MODEL_BASE_URL` points to the correct host
- any external AI API keys are present if required

## 7. Build commands

Backend:

```powershell
npm run build
```

Frontend:

```powershell
npm run build
```

## 8. Application URLs

```text
Frontend: http://localhost:5173
Backend:  http://localhost:3001/api
AI model: http://localhost:8000
```

## 9. Notes

- Set `USE_MOCK_DATA=false` for the original real-database version.
- PostgreSQL must be available before backend startup.
- Firebase is required for Google authentication in the original version.
- pgAdmin is only a dashboard tool; PostgreSQL itself must also be installed and running.

# AI-Enhanced Email Management Web Application

This repo now contains a separate academic project scaffold for an AI-enhanced email management dashboard:

- Frontend: `C:\Project\ai-inbox-frontend`
- Backend: `C:\Project\ai-inbox-backend`

The application is intentionally **not** a Gmail clone. It is a semantic inbox dashboard built to demonstrate clean UI/UX, modular backend architecture, placeholder AI services, and future-ready vector search support.

## Folder hierarchy

```text
ai-inbox-frontend/
  src/
    components/
    data/
    pages/
    providers/
    routes/
    services/
    store/
    styles/
    types/
    utils/

ai-inbox-backend/
  src/
    common/enums/
    database/entities/
    database/seed-data.ts
    modules/
      ai/
      auth/
      emails/
      search/
      users/
```

## Frontend features

- Responsive dark-mode layout
- Protected routes
- Sidebar + top navbar
- Inbox list and email detail panel
- Category filters
- Priority and category badges
- Semantic search page
- Loading skeletons
- Toast notifications
- API service layer with Axios
- Zustand stores for auth and inbox state

## Backend features

- NestJS modular architecture
- JWT authentication
- DTO validation with `class-validator`
- TypeORM entities
- Mock semantic search endpoint
- Placeholder AI service layer:
  - `summarization.service.ts`
  - `translation.service.ts`
  - `categorization.service.ts`
  - `reply.service.ts`
- Seed data support
- PostgreSQL-ready schema with `pgvector` placeholder

## REST API endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Emails

- `GET /api/emails`
- `GET /api/emails/:id`

Query params for `GET /api/emails`:

- `category`
- `search`

### Search

- `POST /api/search/semantic`

Request body:

```json
{
  "query": "emails about upcoming interviews"
}
```

## Database design

Tables:

- `users`
- `emails`
- `reply_suggestions`
- `search_history`

The SQL version is included at:

- `C:\Project\ai-inbox-backend\schema.sql`

## Setup instructions

### Frontend

```bash
cd C:\Project\ai-inbox-frontend
npm install
copy .env.example .env
npm run dev
```

Default frontend URL:

- `http://localhost:5174`

### Backend

```bash
cd C:\Project\ai-inbox-backend
npm install
copy .env.example .env
npm run start:dev
```

Default backend URL:

- `http://localhost:3001/api`

## Notes for future AI integration

The current backend already isolates AI behavior behind dedicated services. Later, you can:

- connect an LLM inside `reply.service.ts`
- replace mock summaries in `summarization.service.ts`
- integrate translation APIs in `translation.service.ts`
- plug embedding generation into a dedicated vector pipeline
- replace mock semantic search with `pgvector` similarity queries

## Important scope boundaries

This scaffold does **not** implement:

- SMTP
- OAuth
- actual mailbox sync
- real AI providers
- production email sending

It is designed for a B.Tech/project-level demo with strong architecture and extensibility.

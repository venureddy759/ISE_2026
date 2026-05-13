# AI Inbox Backend

NestJS backend for an AI-enhanced email management dashboard. This project is intentionally scoped as an academic inbox intelligence layer, not a real email provider.

Current runtime mode:

- mock in-memory data
- no PostgreSQL required to boot
- same REST shape preserved for future DB integration

## Modules

- `auth`: JWT login and register endpoints
- `users`: user creation and lookup
- `emails`: inbox listing and detail APIs
- `ai`: placeholder summarization, translation, categorization, and reply services
- `search`: mock semantic search endpoint designed for future pgvector integration

## Environment

Copy `.env.example` to `.env` and update values.

## Commands

```bash
npm install
npm run start:dev
```

## Planned pgvector support

`Email.embedding` is scaffolded as a placeholder field. For production-ready vector search, migrate this to a native `vector` column after enabling the PostgreSQL `pgvector` extension.

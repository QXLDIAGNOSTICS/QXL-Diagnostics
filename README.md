# QXL Backend

Production-grade backend for QXL Diagnostics:

- **FastAPI** (async) with a layered architecture (`endpoints → services → repositories → models`)
- **Auth0** JWT (RS256) authentication + RBAC permission guards
- **PostgreSQL** (async SQLAlchemy 2.0 + asyncpg), migrations via **Alembic**
- **Supabase Storage** for user file uploads (private bucket + short-lived signed URLs)
- **OpenAI** RAG chatbot with **streaming** responses over SSE, grounded in each user's own documents via **pgvector** similarity search
- Packaged with **uv**, containerized with **Docker**, deployable to **AWS** (ECS Fargate + RDS)

## Requirements

- Python 3.12+
- [uv](https://docs.astral.sh/uv/) (`curl -LsSf https://astral.sh/uv/install.sh | sh`)
- Docker + Docker Compose (for local Postgres with pgvector)

## Quick start (local dev)

```bash
cd Backend/qxl-backend

# 1) Install dependencies into a managed virtualenv
uv sync --extra dev

# 2) Configure environment
cp .env.example .env        # fill in Auth0 / Supabase / OpenAI secrets

# 3) Start Postgres (with pgvector)
docker compose up -d db

# 4) Apply migrations
uv run alembic upgrade head

# 5) Run the API (hot reload)
uv run uvicorn app.main:app --reload --port 8000
```

- Swagger UI: http://localhost:8000/docs
- Health: http://localhost:8000/api/v1/health

### Run the full stack in containers

```bash
docker compose up --build
```

The container entrypoint runs `alembic upgrade head` before launching Gunicorn + Uvicorn workers.

## Testing / linting

```bash
uv run pytest          # unit + endpoint tests (no live Postgres needed)
uv run ruff check .
uv run mypy app
```

## Auth0 setup

1. **Applications → APIs → Create API**
   - Identifier (audience): `https://api.yourapp.com` → `AUTH0_API_AUDIENCE`
   - Signing algorithm: **RS256**
2. Enable **RBAC** and **Add Permissions in the Access Token** on the API settings.
3. Add permissions: `read:files`, `write:files`, `read:chat`, `read:users`.
4. Create roles, assign permissions, assign roles to users.
5. Put your tenant domain in `AUTH0_DOMAIN` (no `https://`).

## API overview (prefix `/api/v1`)

| Method | Path | Description | Guard |
|---|---|---|---|
| GET | `/health` | Liveness + DB ping | public |
| GET | `/users/me` | Current user (JIT-provisioned) | authenticated |
| PATCH | `/users/me` | Update profile | authenticated |
| POST | `/files` | Upload file (multipart) → Supabase + RAG ingest | `write:files` |
| GET | `/files` | List own files | `read:files` |
| GET | `/files/{id}` | Metadata + signed download URL | `read:files` |
| DELETE | `/files/{id}` | Delete (storage + DB) | `write:files` |
| POST | `/chat/stream` | Streaming grounded chat (SSE) | `read:chat` |
| GET | `/chat/conversations` | List conversations | authenticated |
| GET | `/chat/conversations/{id}` | Message history | authenticated |

### Streaming chat (SSE) contract

`POST /api/v1/chat/stream` returns `text/event-stream`. Events:

```
data: {"conversation_id": "<uuid>"}
data: {"delta": "partial token text"}
...
data: [DONE]
```

Each retrieval query is **strictly scoped to `owner_id == current_user.id`** — a user
can never receive another user's document chunks.

## RAG pipeline

1. On upload, text-bearing files (PDF/txt) are extracted, token-chunked (~500 tokens, 50 overlap),
   embedded with `text-embedding-3-small`, and stored in `doc_chunks` (pgvector) as a background task.
2. On each chat request, the question is embedded and the top-K nearest chunks (cosine distance,
   HNSW index) for that user are injected into a grounded system prompt.
3. The OpenAI chat completion is streamed token-by-token to the client and persisted for history.

## Deployment (AWS)

- Build and push the image to **ECR**; run on **ECS Fargate** behind an **ALB**.
- Use **RDS for PostgreSQL** (enable the `vector` extension) in a private subnet.
- Inject secrets via **AWS Secrets Manager / SSM** (never bake into the image).
- Ensure ALB idle timeout exceeds streaming duration; health check hits `/api/v1/health`.

## Project layout

```
app/
  core/         config, security (Auth0 JWT), logging, exceptions
  db/           async engine/session, declarative base
  models/       SQLAlchemy models (users, files, conversations, messages, doc_chunks)
  schemas/      Pydantic request/response models
  repositories/ data-access layer
  services/     auth, storage (Supabase), embedding, ingestion, retrieval, chat (streaming)
  api/v1/       deps + endpoints (users, files, chat) + router
alembic/        migrations (0001_init creates pgvector extension + HNSW index)
tests/          pytest suite (auth, files, chat/RAG)
```

# FastAPI Backend Plan

A production-grade backend using **FastAPI**, **Auth0** (auth), **PostgreSQL** (database), **Supabase Storage** (files), **OpenAI** (streaming chat), containerized with **Docker** and deployed on **AWS**.

---

## 1. Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                      # FastAPI app factory, middleware, routers
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py                # Pydantic Settings (env-driven)
│   │   ├── security.py              # Auth0 JWT validation, scopes/permissions
│   │   ├── logging.py               # Structured logging (JSON)
│   │   └── exceptions.py            # Custom exceptions + handlers
│   ├── db/
│   │   ├── __init__.py
│   │   ├── session.py               # Async engine + session factory
│   │   ├── base.py                  # Declarative Base + model registry
│   │   └── init_db.py               # Optional seed/bootstrap
│   ├── models/                      # SQLAlchemy ORM models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── file.py
│   │   └── chat.py
│   ├── schemas/                     # Pydantic request/response models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── file.py
│   │   └── chat.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py                  # Shared dependencies (db, current_user)
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── router.py            # Aggregates all v1 routers
│   │       └── endpoints/
│   │           ├── auth.py
│   │           ├── users.py
│   │           ├── files.py
│   │           └── chat.py
│   ├── services/                    # Business logic (thin endpoints)
│   │   ├── __init__.py
│   │   ├── user_service.py
│   │   ├── storage_service.py       # Supabase upload/download/signed URLs
│   │   └── chat_service.py          # OpenAI streaming + data retrieval
│   └── repositories/                # Data-access layer (CRUD)
│       ├── __init__.py
│       ├── user_repo.py
│       └── file_repo.py
├── alembic/                         # Migrations
│   ├── env.py
│   └── versions/
├── tests/
│   ├── conftest.py
│   ├── test_auth.py
│   ├── test_files.py
│   └── test_chat.py
├── .env.example
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── alembic.ini
├── pyproject.toml                   # or requirements.txt
└── README.md
```

**Design principles**
- **Layered architecture**: `endpoints → services → repositories → models`. Endpoints stay thin; business logic lives in services.
- **Async everywhere** (async SQLAlchemy, httpx) for high concurrency and streaming.
- **Versioned API** (`/api/v1`) so future breaking changes are additive.

---

## 2. Environment Setup

### Dependencies (`pyproject.toml` or `requirements.txt`)

```
fastapi
uvicorn[standard]
gunicorn
pydantic
pydantic-settings
sqlalchemy[asyncio]
asyncpg
alembic
python-jose[cryptography]        # JWT decode/verify
httpx                            # Auth0 JWKS fetch + async calls
supabase                         # Supabase Python client
openai                           # OpenAI SDK (chat streaming + embeddings)
pgvector                         # Postgres vector column + similarity search (RAG)
tiktoken                         # Token counting / context-window budgeting
python-multipart                 # File uploads
pypdf                            # Extract text from uploaded PDFs for RAG ingestion
tenacity                         # Retries
redis                            # Optional: JWKS/rate-limit cache
slowapi                          # Rate limiting
# dev / test
pytest, pytest-asyncio, httpx, respx, pytest-cov, ruff, mypy, black
```

### Setup steps

```bash
cd backend
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
cp .env.example .env               # fill in secrets
```

### `.env.example`

```env
# App
ENVIRONMENT=development
API_V1_PREFIX=/api/v1
CORS_ORIGINS=http://localhost:3000

# PostgreSQL
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/appdb

# Auth0
AUTH0_DOMAIN=your-tenant.us.auth0.com
AUTH0_API_AUDIENCE=https://api.yourapp.com
AUTH0_ISSUER=https://your-tenant.us.auth0.com/
AUTH0_ALGORITHMS=RS256

# Supabase
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...        # server-side only, never expose
SUPABASE_BUCKET=user-files

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
OPENAI_EMBEDDING_MODEL=text-embedding-3-small   # for RAG vector search
RAG_TOP_K=5                                      # chunks retrieved per query
```

**Best practice**: Never commit `.env`. In production, inject secrets via **AWS Secrets Manager** / SSM Parameter Store, not environment files.

### Run the application

```bash
# 1) Start Postgres (and enable pgvector) + optional Redis via compose
docker compose up -d db redis

# 2) Apply database migrations
alembic upgrade head

# 3a) Run in development (hot reload)
uvicorn app.main:app --reload --port 8000

# 3b) Or run the full stack in containers
docker compose up --build
```

- API is served at `http://localhost:8000`; interactive docs at `http://localhost:8000/docs` (Swagger) and `/redoc`.
- Health check: `GET http://localhost:8000/api/v1/health`.
- In production the container entrypoint runs `alembic upgrade head` then launches Gunicorn + Uvicorn workers (see §7).

---

## 3. Auth0 Integration

### Auth0 dashboard configuration
1. **Create an API**: Auth0 Dashboard → *Applications → APIs → Create API*.
   - Identifier (audience): `https://api.yourapp.com`
   - Signing algorithm: **RS256**.
2. **Enable RBAC**: API → *Settings* → toggle **Enable RBAC** and **Add Permissions in the Access Token**.
3. **Define permissions/scopes** under the API's *Permissions* tab, e.g. `read:files`, `write:files`, `read:chat`.
4. **Create roles** (*User Management → Roles*) and assign permissions; assign roles to users.
5. **Create an Application** (SPA/Native/M2M) for the client and authorize it against the API.

### Token validation (`app/core/security.py`)
- Fetch the **JWKS** from `https://{AUTH0_DOMAIN}/.well-known/jwks.json` (cache it, refresh on `kid` miss).
- Validate the incoming `Bearer` token: signature (RS256), `aud == AUTH0_API_AUDIENCE`, `iss == AUTH0_ISSUER`, and `exp`.
- Extract `sub` (Auth0 user id) and `permissions` claim.

```python
# Sketch
from jose import jwt
import httpx
from functools import lru_cache

class Auth0Validator:
    def __init__(self, settings):
        self.settings = settings
        self._jwks = None

    async def _get_jwks(self):
        if self._jwks is None:
            url = f"https://{self.settings.AUTH0_DOMAIN}/.well-known/jwks.json"
            async with httpx.AsyncClient() as c:
                self._jwks = (await c.get(url)).json()
        return self._jwks

    async def verify(self, token: str) -> dict:
        jwks = await self._get_jwks()
        header = jwt.get_unverified_header(token)
        key = next(k for k in jwks["keys"] if k["kid"] == header["kid"])
        return jwt.decode(
            token, key,
            algorithms=self.settings.AUTH0_ALGORITHMS,
            audience=self.settings.AUTH0_API_AUDIENCE,
            issuer=self.settings.AUTH0_ISSUER,
        )
```

### Dependencies (`app/api/deps.py`)

```python
async def get_current_user(
    token: str = Depends(bearer_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    payload = await validator.verify(token.credentials)
    return await user_service.get_or_create_from_auth0(db, payload)

def require_permission(perm: str):
    async def checker(user=Depends(get_current_user), payload=Depends(get_payload)):
        if perm not in payload.get("permissions", []):
            raise HTTPException(403, "Insufficient permissions")
        return user
    return checker
```

**Best practices**
- **Just-in-time user provisioning**: on first authenticated request, upsert a local `users` row keyed by Auth0 `sub`.
- Cache JWKS in memory/Redis; only refetch on unknown `kid`.
- Enforce permissions at the endpoint via `Depends(require_permission("write:files"))`.

---

## 4. Database Setup (PostgreSQL)

### Connection (`app/db/session.py`)

```python
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

engine = create_async_engine(
    settings.DATABASE_URL,
    pool_size=10, max_overflow=20, pool_pre_ping=True,
)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
```

### Core models

```python
# app/models/user.py
class User(Base):
    __tablename__ = "users"
    id = Column(UUID, primary_key=True, default=uuid4)
    auth0_sub = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# app/models/file.py
class FileRecord(Base):
    __tablename__ = "files"
    id = Column(UUID, primary_key=True, default=uuid4)
    owner_id = Column(UUID, ForeignKey("users.id"), index=True)
    bucket = Column(String)
    object_path = Column(String)       # Supabase storage key
    filename = Column(String)
    content_type = Column(String)
    size = Column(BigInteger)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# app/models/chat.py — conversations + messages for chat history/context
```

### Migrations (Alembic)

```bash
alembic init alembic                 # one-time
# configure alembic/env.py to use settings.DATABASE_URL + Base.metadata
alembic revision --autogenerate -m "init schema"
alembic upgrade head
```

**Best practices**
- Use `pool_pre_ping=True` to survive dropped connections (common with RDS).
- Always run migrations in CI/CD before app rollout; never rely on `create_all()` in prod.
- Index foreign keys and any column used in `WHERE`/`ORDER BY` for chat/file queries.

---

## 5. Supabase Integration (File Storage)

### Setup
1. Create a **Storage bucket** (e.g., `user-files`), private by default.
2. Use the **Service Role key** server-side only (bypasses RLS — keep it secret).

### Service (`app/services/storage_service.py`)

```python
from supabase import create_client

class StorageService:
    def __init__(self, settings):
        self.client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)
        self.bucket = settings.SUPABASE_BUCKET

    def upload(self, path: str, data: bytes, content_type: str):
        return self.client.storage.from_(self.bucket).upload(
            path, data, {"content-type": content_type, "upsert": "false"}
        )

    def signed_url(self, path: str, expires_in: int = 3600) -> str:
        res = self.client.storage.from_(self.bucket).create_signed_url(path, expires_in)
        return res["signedURL"]

    def delete(self, path: str):
        return self.client.storage.from_(self.bucket).remove([path])
```

### Upload flow
1. Client sends `multipart/form-data` to `POST /files`.
2. Validate **MIME type** and **size** (reject > configured limit, e.g., 25 MB).
3. Generate a namespaced object path: `{user_id}/{uuid}_{filename}`.
4. Upload bytes to Supabase; persist a `files` row with metadata.
5. For text-bearing files (PDF, txt), enqueue **RAG ingestion** (extract → chunk → embed → `doc_chunks`) as a background task (see §8).
6. Return the file record. Downloads use **short-lived signed URLs** (never public buckets for private data).

**Best practices**
- Store only **metadata + object path** in Postgres; keep bytes in Supabase.
- Serve downloads via **signed URLs** with short TTL rather than proxying large files.
- Stream large uploads to avoid loading full files into memory; enforce an allow-list of content types.

---

## 6. API Endpoints

Base prefix: `/api/v1`. All non-public routes require a valid Auth0 access token.

### Auth / Users
| Method | Path | Description | Guard |
|---|---|---|---|
| GET | `/users/me` | Current user profile (JIT-provisioned) | authenticated |
| PATCH | `/users/me` | Update profile fields | authenticated |
| GET | `/users/{id}` | Admin: fetch a user | `read:users` |

### Files
| Method | Path | Description | Guard |
|---|---|---|---|
| POST | `/files` | Upload a file (multipart) | `write:files` |
| GET | `/files` | List current user's files | `read:files` |
| GET | `/files/{id}` | Metadata + signed download URL | `read:files` (owner) |
| DELETE | `/files/{id}` | Delete file (storage + DB) | `write:files` (owner) |

### Chat
| Method | Path | Description | Guard |
|---|---|---|---|
| POST | `/chat/stream` | Stream an assistant response (SSE) | `read:chat` |
| GET | `/chat/conversations` | List conversations | authenticated |
| GET | `/chat/conversations/{id}` | Message history | authenticated (owner) |

### System
| Method | Path | Description |
|---|---|---|
| GET | `/health` | Liveness/readiness (DB ping) |

**Conventions**
- Consistent error envelope: `{"error": {"code", "message", "detail"}}`.
- Pagination via `?limit=&cursor=`.
- Enforce ownership checks in the service layer, not just the DB.

---

## 7. Deployment (AWS + Docker)

### Dockerfile (multi-stage, non-root)

```dockerfile
FROM python:3.12-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app

FROM base AS builder
COPY requirements.txt .
RUN pip install --prefix=/install --no-cache-dir -r requirements.txt

FROM base AS runtime
COPY --from=builder /install /usr/local
COPY app ./app
 COPY alembic ./alembic
COPY alembic.ini .
RUN adduser --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser
EXPOSE 8000
CMD ["gunicorn", "app.main:app", \
     "-k", "uvicorn.workers.UvicornWorker", \
     "-w", "4", "-b", "0.0.0.0:8000", \
     "--timeout", "120", "--graceful-timeout", "30"]
```

### `docker-compose.yml` (local dev)
- Services: `api`, `db` (postgres:16), optional `redis`.
- Mount code, run `alembic upgrade head` on start, expose `8000`.

### AWS options
- **ECS Fargate** (recommended): push image to **ECR**, run as a Fargate service behind an **ALB**; scale with target-tracking on CPU/requests.
- **RDS for PostgreSQL**: managed DB in a private subnet; app connects over the VPC.
- **Secrets**: AWS Secrets Manager / SSM injected as task env vars.
- **Networking**: ALB in public subnets, ECS tasks + RDS in private subnets; security groups restrict DB to the app only.
- **CI/CD**: GitHub Actions → build/test → push to ECR → run migrations → `aws ecs update-service --force-new-deployment`.
- **Observability**: CloudWatch logs (JSON), ALB health checks hitting `/health`, alarms on 5xx/latency.

**Alternatives**: App Runner (simplest), or EKS (if already on Kubernetes).

---

## 8. RAG Chatbot with Streaming (OpenAI + user data)

### Goal
Answer a user's questions grounded in **their own data** using **Retrieval-Augmented Generation (RAG)**: retrieve the most relevant chunks of the user's documents/records from PostgreSQL via **pgvector** semantic search, inject them as context, and stream the answer token-by-token over **Server-Sent Events (SSE)**.

### Architecture
```mermaid
flowchart LR
    subgraph Ingestion (async / background)
        U[User file or record] --> X[Extract text]
        X --> C[Chunk + clean]
        C --> E[OpenAI embeddings]
        E --> V[(pgvector: doc_chunks)]
    end
    subgraph Query (per request)
        Q[User question] --> QE[Embed question]
        QE --> S[Vector similarity search<br/>owner_id = user.id]
        S --> P[Build grounded prompt]
        P --> L[OpenAI chat stream=True]
        L --> R[SSE token stream to client]
    end
```

### Vector store model (`app/models/chat.py`)
```python
from pgvector.sqlalchemy import Vector

class DocChunk(Base):
    __tablename__ = "doc_chunks"
    id = Column(UUID, primary_key=True, default=uuid4)
    owner_id = Column(UUID, ForeignKey("users.id"), index=True, nullable=False)
    source_file_id = Column(UUID, ForeignKey("files.id"), nullable=True)
    content = Column(Text, nullable=False)          # the chunk text
    embedding = Column(Vector(1536))                # text-embedding-3-small dim
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# Migration also runs: CREATE EXTENSION IF NOT EXISTS vector;
# Index: CREATE INDEX ON doc_chunks USING hnsw (embedding vector_cosine_ops);
```

### Ingestion pipeline (`app/services/rag_service.py`)
Runs when a file is uploaded (or a record changes), ideally in a background task/worker:
```python
async def ingest_document(db, owner_id, file_id, raw_text: str):
    chunks = chunk_text(raw_text, max_tokens=500, overlap=50)   # tiktoken-aware
    embeddings = await openai_client.embeddings.create(
        model=settings.OPENAI_EMBEDDING_MODEL, input=chunks,
    )
    rows = [
        DocChunk(owner_id=owner_id, source_file_id=file_id,
                 content=chunk, embedding=emb.embedding)
        for chunk, emb in zip(chunks, embeddings.data)
    ]
    db.add_all(rows)
    await db.commit()
```

### Retrieval (`retrieve_context`)
```python
async def retrieve_context(db, owner_id, question: str, top_k: int):
    q_emb = (await openai_client.embeddings.create(
        model=settings.OPENAI_EMBEDDING_MODEL, input=question,
    )).data[0].embedding
    # Cosine distance search, STRICTLY scoped to the authenticated user
    stmt = (
        select(DocChunk.content)
        .where(DocChunk.owner_id == owner_id)
        .order_by(DocChunk.embedding.cosine_distance(q_emb))
        .limit(top_k)
    )
    rows = (await db.execute(stmt)).scalars().all()
    return "\n---\n".join(rows)
```

### Streaming generation (`app/services/chat_service.py`)
```python
async def stream_answer(db, user, question: str):
    # 1) RAG retrieval — user-scoped context only (never leak other users' data)
    context = await rag_service.retrieve_context(
        db, user.id, question, settings.RAG_TOP_K
    )
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT +
            "\nAnswer ONLY from the context below. If unknown, say so.\n"
            f"Context:\n{context}"},
        *await load_recent_history(db, user.id),   # short conversation memory
        {"role": "user", "content": question},
    ]

    # 2) Stream the completion
    stream = await openai_client.chat.completions.create(
        model=settings.OPENAI_MODEL, messages=messages, stream=True,
    )
    collected = []
    async for chunk in stream:
        delta = chunk.choices[0].delta.content or ""
        if delta:
            collected.append(delta)
            yield f"data: {json.dumps({'delta': delta})}\n\n"
    yield "data: [DONE]\n\n"

    # 3) Persist the turn for history/auditing
    await persist_message(db, user.id, question, "".join(collected))
```

### Endpoint (`app/api/v1/endpoints/chat.py`)
```python
@router.post("/chat/stream")
async def chat_stream(
    body: ChatRequest,
    user=Depends(require_permission("read:chat")),
    db=Depends(get_db),
):
    return StreamingResponse(
        chat_service.stream_answer(db, user, body.question),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )
```

**Best practices**
- **Grounding**: instruct the model to answer only from retrieved context; return "I don't know" rather than hallucinate; optionally return source `file_id`s as citations.
- **Isolation**: every embedding query is filtered by `owner_id == user.id` — strict multi-tenant isolation; never inject cross-user chunks.
- **SSE headers**: `text/event-stream`, `Cache-Control: no-cache`, disable proxy buffering (`X-Accel-Buffering: no`); ensure ALB/idle timeouts exceed stream duration.
- **Chunking**: token-aware chunks (~300–500 tokens) with small overlap; re-embed on document change; delete chunks when the source file is deleted.
- **Cost/safety**: batch embeddings, cache identical queries, cap `max_tokens`, set request timeouts, and rate-limit chat per user.
- **Index**: use an HNSW (or IVFFlat) pgvector index for fast approximate nearest-neighbour search at scale.

---

## 9. Frontend Integration Overview

The frontend is a **Next.js 16 / React 19** app (this repo, `qxl-platform`). Below are the existing components that must be wired to the FastAPI backend, and what changes each requires.

### Auth wiring (Auth0)
- Add **`@auth0/nextjs-auth0`** to the SPA/site to obtain access tokens for the Auth0 API audience (`https://api.yourapp.com`).
- Store the token client-side (in-memory / secure cookie) and attach it as `Authorization: Bearer <token>` on every backend call.
- Gate the admin area (`src/app/admin/*`) behind login; today [src/app/admin/login/page.tsx](src/app/admin/login/page.tsx) and [src/app/login/page.tsx](src/app/login/page.tsx) are the entry points to replace with Auth0 Universal Login.
- Create a small `apiClient` helper (fetch wrapper) that injects the token and points at `NEXT_PUBLIC_API_BASE_URL/api/v1`.

### Components → backend endpoints

| Frontend component / page | Current behavior | Backend integration |
|---|---|---|
| [src/components/AiChat.tsx](src/components/AiChat.tsx) | Local mock assistant, prebuilt Q&A | Consume `POST /api/v1/chat/stream` via SSE; render token deltas incrementally |
| [src/components/PrescriptionModal.tsx](src/components/PrescriptionModal.tsx) | Fake `handleAnalyze` timer | `POST /api/v1/files` (multipart upload) → then `POST /api/v1/chat/stream` for the summary |
| [src/app/upload-prescription/page.tsx](src/app/upload-prescription/page.tsx) | Static upload UI | Same upload flow (Supabase-backed via backend) |
| [src/app/book/page.tsx](src/app/book/page.tsx) | Booking form | `POST` appointment endpoint (extend backend `appointments` router) |
| [src/app/report/page.tsx](src/app/report/page.tsx) | Report lookup | `GET /api/v1/files` + signed download URLs |
| [src/app/contact/page.tsx](src/app/contact/page.tsx), franchise/careers forms | Static forms | `POST` enquiry endpoints |
| [src/lib/cmsStore.ts](src/lib/cmsStore.ts) + `src/app/admin/*` | Client-side CMS store (banners, blog, packages, SEO, etc.) | Replace with authenticated CRUD calls to backend admin routers |
| [src/lib/aiHelper.ts](src/lib/aiHelper.ts) | Simulated AI copy generation | Optionally back with an OpenAI admin endpoint |

### Consuming the streaming chat endpoint (SSE)
Replace the mock send handler in [src/components/AiChat.tsx](src/components/AiChat.tsx) with a `fetch` + `ReadableStream` reader:

```ts
const res = await fetch(`${API_BASE}/api/v1/chat/stream`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  body: JSON.stringify({ question }),
});
const reader = res.body!.getReader();
const decoder = new TextDecoder();
let assistant = "";
while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  for (const line of decoder.decode(value).split("\n")) {
    if (!line.startsWith("data: ")) continue;
    const payload = line.slice(6);
    if (payload === "[DONE]") break;
    assistant += JSON.parse(payload).delta;
    setMessages((m) => updateLastAssistant(m, assistant)); // live token render
  }
}
```

### File upload from the browser
```ts
const form = new FormData();
form.append("file", file);
const res = await fetch(`${API_BASE}/api/v1/files`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` }, // no Content-Type; browser sets boundary
  body: form,
});
```

### Environment & config
- Add `NEXT_PUBLIC_API_BASE_URL`, `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_AUDIENCE` to the frontend env.
- Ensure the backend `CORS_ORIGINS` includes the frontend origin (`http://localhost:3000` in dev, the deployed domain in prod).
- Prefer calling the backend through **Next.js Route Handlers / server actions** for admin mutations so tokens never touch client bundles where avoidable.

**Migration path**: keep the current mock behavior behind a feature flag, then swap component-by-component (`AiChat` → `PrescriptionModal` → admin CMS) as each backend router ships, so the site stays functional throughout.

---

## 10. Testing Strategy

Test pyramid: many fast **unit** tests, a solid layer of **integration** tests against a real Postgres, and a few **end-to-end** smoke tests. Run everything in CI on every PR.

### Tooling
- **pytest** + **pytest-asyncio** — async test support.
- **httpx.AsyncClient** + FastAPI `ASGITransport` — call the app in-process without a live server.
- **respx** — mock OpenAI and Auth0 JWKS HTTP calls deterministically (no network, no cost).
- **testcontainers** or a compose `postgres:16` service — a real DB (with `pgvector`) for integration tests.
- **pytest-cov** — coverage gate (e.g., fail under 80%).

### Fixtures (`tests/conftest.py`)
```python
@pytest.fixture
async def client(app, db_session):
    app.dependency_overrides[get_db] = lambda: db_session
    app.dependency_overrides[get_current_user] = lambda: test_user  # bypass Auth0
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c
```
- Override `get_db` with a transactional session rolled back after each test (isolation).
- Override `get_current_user` / `require_permission` to inject a fake authenticated user, so tests don't hit Auth0. Add separate tests that exercise the **real** validator with a locally-signed RS256 token to prove auth works.

### What to test

**Auth (`test_auth.py`)**
- Missing/invalid/expired token → `401`; valid token → `200`.
- Insufficient permission → `403`; correct scope → allowed.
- JIT user provisioning creates exactly one `users` row per `auth0_sub`.

**Files (`test_files.py`)**
- Upload happy path: `POST /files` persists a `files` row and calls Supabase (client mocked).
- Rejects disallowed content type and oversized files (`400`).
- Ownership: user A cannot `GET`/`DELETE` user B's file (`403`/`404`).
- Delete removes both the storage object and the DB row.

**RAG chatbot (`test_chat.py`)** — the highest-value coverage
- **Ingestion**: given raw text, `chunk_text` produces bounded, overlapping chunks; `ingest_document` writes one `doc_chunks` row per chunk with an embedding (OpenAI embeddings mocked via respx).
- **Retrieval isolation**: seed chunks for user A and user B; assert `retrieve_context` for A returns only A's chunks (critical multi-tenant test).
- **Streaming**: mock the OpenAI stream to yield known deltas; assert the endpoint emits well-formed SSE (`data: {...}` lines ending with `data: [DONE]`) and that the concatenated text is persisted as a message.
- **Grounding**: when retrieval returns no context, the assembled prompt instructs "I don't know" behavior.

**Testing SSE with httpx**
```python
async def test_chat_stream(client):
    async with client.stream("POST", "/api/v1/chat/stream",
                             json={"question": "hi"}) as resp:
        assert resp.status_code == 200
        assert resp.headers["content-type"].startswith("text/event-stream")
        chunks = [line async for line in resp.aiter_lines() if line]
    assert any(l.startswith("data: ") for l in chunks)
    assert chunks[-1] == "data: [DONE]"
```

### Levels
- **Unit**: services/repositories in isolation (chunking, prompt building, context assembly) — all external I/O mocked.
- **Integration**: endpoints through the real ASGI app + real Postgres (migrations applied) with OpenAI/Auth0/Supabase mocked.
- **E2E smoke** (post-deploy): hit `/health`, do one authenticated round-trip against a staging environment.

### CI
```yaml
# GitHub Actions (sketch)
- run: ruff check . && mypy app
- run: alembic upgrade head          # against a service postgres:16 (pgvector)
- run: pytest --cov=app --cov-fail-under=80
```
Block merges on lint, type-check, and test failures. Optionally add load tests (Locust/k6) for the streaming endpoint to validate concurrency and ALB timeout settings before production.

---

**Security**
- Validate Auth0 tokens on every request; enforce RBAC scopes per endpoint.
- Strict CORS allow-list; HTTPS only (TLS at ALB).
- Secrets from Secrets Manager, never in code or images.
- Input validation via Pydantic; parameterized queries via SQLAlchemy (no raw string SQL).
- File upload allow-lists (type/size); private buckets + signed URLs.
- Rate limiting (`slowapi`) and security headers middleware.

**Error handling**
- Central exception handlers → consistent JSON error envelope.
- Distinguish 400 (validation), 401 (auth), 403 (permission), 404, 409, 429, 500.
- Never leak stack traces or secrets in responses; log full detail server-side with a correlation/request ID.

**Performance**
- Async I/O end-to-end; connection pooling with `pool_pre_ping`.
- Cache JWKS and hot reads (Redis) where appropriate.
- Paginate list endpoints; index query columns.
- Gunicorn + Uvicorn workers (`~2×CPU+1`); horizontal scaling on ECS.
- Stream large payloads (chat, downloads) instead of buffering.

**Quality**
- Tests with `pytest` + `pytest-asyncio` (auth, files, chat, migrations).
- Lint/type-check with `ruff` + `mypy` in CI.
- Structured JSON logging → CloudWatch; alarms on error rate/latency.
```

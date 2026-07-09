# QXL Backend

Production-grade backend for QXL Diagnostics:

- **FastAPI** (async) with a layered architecture (`endpoints → services → repositories → models`)
- First-party **password + OTP + SMS-link 2FA** authentication with secure httpOnly session cookies (no third-party identity provider, no JWTs — opaque tokens hashed at rest)
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
cp .env.example .env        # fill in Nettyfish / SMTP / Razorpay / Supabase / OpenAI secrets

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

## Authentication setup

Authentication is entirely first-party — no external identity provider:

1. **Register** (`POST /auth/register`) with email, phone, name, password. Passwords are hashed
   with **bcrypt**; never stored or logged in plaintext.
2. **Login** (`POST /auth/login`) with identifier (email or phone) + password. On success this
   creates a `LoginChallenge` and sends:
   - a one-time **OTP** (via SMS/Nettyfish SmartSMS, falling back to email/SMTP), verified via `POST /auth/login/otp`
   - a **clickable verification link** containing an opaque token (never a JWT) to the user's phone
     via SMS, verified server-side via `GET /auth/login/verify-link`
3. A session (httpOnly, `Secure`, `SameSite=strict` cookie) is only created once **both** the OTP
   and the link have been verified (`_maybe_complete_login`), giving true two-factor login.
4. Repeated failed password attempts lock the account for `LOGIN_LOCKOUT_MINUTES` after
   `LOGIN_LOCKOUT_THRESHOLD` failures.
5. All identifiers (email/phone) are **masked** (`mask_email`/`mask_phone`) before being returned
   to the client or written to logs — the raw SMS link is delivered out-of-band via Twilio only.
6. Configure `NETTYFISH_API_KEY` / `NETTYFISH_CLIENT_ID` / `NETTYFISH_SENDER_ID` and/or
   `SMTP_HOST`/`SMTP_USERNAME`/`SMTP_PASSWORD` in `.env`. With neither configured, the
   `notification_service` falls back to logging the (masked) message for local dev.

### Admin step-up ("sudo mode")

Admin accounts (`role == "admin"`) go through the exact same phone+password+OTP+SMS-link
login as any other user — there is no separate admin login path. What's different is that
**every admin-role endpoint additionally requires a short-lived step-up verification**:

1. After completing normal login, an admin calls `POST /auth/admin/elevate` with a
   `secret_key` — a value that lives only in `ADMIN_ACCESS_KEY` (server env) and is shared
   with admins out-of-band (never emailed/texted, never stored in the DB).
2. On a match (constant-time compare), the *current session row* is marked elevated for
   `ADMIN_ELEVATION_MINUTES` (default 30). `GET /auth/admin/elevation-status` reports whether
   the session is currently elevated.
3. `require_role("admin")` (used by every admin endpoint) checks both `user.role == "admin"`
   **and** that the session is currently elevated — otherwise it raises
   `admin_elevation_required` (403), distinct from a normal `permission_denied`, so the
   frontend can show a secret-key prompt instead of bouncing the admin back to `/login`.

This means compromising a session cookie alone (e.g. via XSS or a synced device) is not
enough to perform admin actions — the attacker would also need the out-of-band secret key,
and even then the window is time-boxed and scoped to that one session.

## API overview (prefix `/api/v1`)

| Method | Path | Description | Guard |
|---|---|---|---|
| GET | `/health` | Liveness + DB ping | public |
| POST | `/auth/register` | Create account (email/phone/password) | public |
| POST | `/auth/login` | Password check \u2192 issues OTP + SMS link challenge | public (rate-limited) |
| POST | `/auth/login/otp` | Verify OTP for a login challenge | public |
| GET | `/auth/login/verify-link` | Verify SMS link token, redirects to frontend | public |
| GET | `/auth/login/status` | Poll challenge completion (for frontend polling) | public |
| POST | `/auth/logout` | Revoke current session cookie | authenticated |
| GET | `/users/me` | Current user | authenticated |
| PATCH | `/users/me` | Update profile | authenticated |
| POST | `/files` | Upload file (multipart) \u2192 Supabase + RAG ingest | authenticated |
| GET | `/files` | List own files | authenticated |
| GET | `/files/{id}` | Metadata + signed download URL | authenticated |
| DELETE | `/files/{id}` | Delete (storage + DB) | authenticated |
| GET | `/centers` | List centers, optionally sorted by distance (`?lat=&lng=`) | public |
| GET | `/prescriptions/quota` | Remaining monthly upload quota | authenticated |
| POST | `/payments/orders` | Create a Razorpay order for a booking | authenticated |
| POST | `/payments/verify` | Verify client-side Razorpay callback signature | authenticated |
| POST | `/payments/webhook` | Razorpay server webhook (signature-verified) | public (HMAC-verified) |
| POST | `/chat/stream` | Streaming grounded chat (SSE), can auto-book via tool calls | authenticated |
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
  core/         config, security (password hashing, OTP, opaque tokens, masking), logging, exceptions
  db/           async engine/session, declarative base
  models/       SQLAlchemy models (users, files, conversations, messages, doc_chunks)
  schemas/      Pydantic request/response models
  repositories/ data-access layer
  services/     auth, storage (Supabase), embedding, ingestion, retrieval, chat (streaming)
  api/v1/       deps + endpoints (users, files, chat) + router
alembic/        migrations (0001_init creates pgvector extension + HNSW index)
tests/          pytest suite (auth, files, chat/RAG)
```

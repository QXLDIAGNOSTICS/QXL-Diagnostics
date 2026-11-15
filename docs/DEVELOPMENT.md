# Development guide

## Toolchain

- Flutter **3.50.0 stable** (`flutter --version`). Stay on the stable channel.
- Android: Android SDK with platform 36, build-tools 36.1, an x86_64 system image for the
  emulator. AGP 9.3 / Gradle 9.5 come from the project template.
- iOS: a Mac with the current Xcode. Run `flutter build ios` once per app to resolve plugins
  (Swift Package Manager is enabled in Flutter 3.50; CocoaPods is used for any plugin
  without SPM support).

Material widgets come from `package:material_ui/material_ui.dart` (Flutter 3.47+ moved
Material out of the framework; `package:flutter/material.dart` is deprecated).

The repo is a **pub workspace**: run `flutter pub get` once at `qxl-mobile/`, then work
inside `apps/patient` or `apps/collector`. Shared code lives in `packages/qxl_core` and is
imported as `package:qxl_core/qxl_core.dart`.

## Configuration

Both apps read compile-time values with `--dart-define-from-file=env/<name>.json` (each app
has its own `env/` folder; `local.json` is git-ignored):

| Key | Meaning |
|---|---|
| `QXL_API_BASE_URL` | FastAPI base including `/api/v1` |
| `QXL_WEBSITE_URL` | Website origin, used only to open the privacy/terms pages |
| `QXL_ENV` | `production`, `staging` or `local` (shown on the About screen) |
| `QXL_MAP_TILE_URL`, `QXL_MAP_ATTRIBUTION` | Map tiles. Defaults to the public OpenStreetMap server, which is **not** for production traffic — set a paid/self-hosted provider before launch |
| `QXL_FIREBASE_API_KEY`, `QXL_FIREBASE_PROJECT_ID`, `QXL_FIREBASE_SENDER_ID`, `QXL_FIREBASE_ANDROID_APP_ID`, `QXL_FIREBASE_IOS_APP_ID`, `QXL_FIREBASE_IOS_BUNDLE_ID` | Push. Each app has its **own** Firebase app ids. Leave out to run without push |

Release builds refuse non-https URLs. On the Android emulator `10.0.2.2` reaches the host
machine; debug builds allow clear text to it (debug-only `network_security_config`).

## How the apps talk to the backend

- **Session.** An opaque, httpOnly `qxl_session` cookie (no JWT). The core
  `SessionCookieInterceptor` stores it with `flutter_secure_storage` and replays it. A `401`
  clears it. The backend allows **one active session per account**: signing in on a second
  phone signs the first one out.
- **Errors.** Every failure becomes an `ApiException` from the envelope
  `{"error": {"code", "message", "detail"}}`. Screens show `describeError(e)` and a retry.
- **Patient login.** `POST /auth/login/phone` → 8-digit OTP → `POST /auth/login/otp`.
- **Staff (collector/courier) login.** `POST /auth/login` (identifier + password) → OTP →
  `POST /auth/login/otp`. Field roles are refused by the patient phone login.
- **Home visits.** `POST /home-visits` with an `Idempotency-Key` creates one visit for the
  whole cart (tests become bookings linked by `visit_id`). Tracking polls
  `GET /home-visits/{id}/tracking` (30 s, 10 s while the collector is on the way).
- **Collector actions.** `POST /collector/jobs/{id}/{acknowledge|start|arrive|verify-identity|specimens|complete|exception}`,
  each with an `Idempotency-Key` and each returning the updated job. Location batches go to
  `POST /collector/jobs/{id}/location` every 15 s while en route.
- **Payment.** Patient: `POST /home-visits/{id}/pay` or `POST /payments/orders` → Razorpay →
  `POST /payments/verify`; success only after the server says paid. Collector: cash/UPI is
  recorded in `complete` and reconciled by staff in the portal.

## Running the whole flow locally

Never run the backend from `qxl-backend/` with its `.env` for tests — it may hold production
SMS, email and payment keys. Use a separate shell with only local values:

```bash
# 1. Postgres (any local instance) and a fresh database
docker run -d --name qxl_local_db -p 127.0.0.1:55432:5432 -e POSTGRES_PASSWORD=postgres pgvector/pgvector:pg16
export DATABASE_URL=postgresql+asyncpg://postgres:postgres@127.0.0.1:55432/qxl_demo
export ENVIRONMENT=development
export BOOKING_SLOTS="8:00 AM - 10:00 AM,10:00 AM - 12:00 PM,2:00 PM - 4:00 PM,4:00 PM - 6:00 PM"
export LOCAL_STORAGE_DIR=/tmp/qxl-files LOCAL_STORAGE_PUBLIC_BASE=http://10.0.2.2:8000

# 2. From a directory WITHOUT a .env file:
uv run --project ../qxl-backend alembic -c <alembic.ini pointing at qxl-backend/alembic> upgrade head
uv run --project ../qxl-backend python ../qxl-backend/scripts/seed_data.py         # catalog, centres
QXL_DEMO_PASSWORD='<choose one>' uv run --project ../qxl-backend python ../qxl-backend/scripts/seed_collect_demo.py
uv run --project ../qxl-backend uvicorn app.main:app --host 0.0.0.0 --port 8000
```

`seed_collect_demo.py` (refuses to run in production) creates `dispatcher@`, `lab@`,
`collector@` and `courier@demo.qxl.test` with your password, a field profile for the
collector and courier, PIN **560040** as a service area, and sample/container details on
matching tests. In development the backend **prints OTPs in its log** instead of sending SMS.

> `seed_data.py` currently fails on a fresh database: its centre and doctor rows predate the
> `slug` column. Fill the slugs (e.g. with `catalog_service.slugify(name)`) before running it.

Then run the admin panel (`cd qxl-admin && npm run dev`, it proxies `/api` to
`localhost:8000`) and both apps with `env/local.json` on an emulator. The flow verified on
2026-11-15: patient books → dispatcher assigns → collector acknowledges, travels, arrives,
verifies, links two tubes, takes cash → hands to courier → courier accepts and sets the lab →
lab receives, accepts, uploads and releases the report → patient sees "Report ready".

## Tests

- `apps/*/test/` — unit, widget and accessibility tests against fake HTTP adapters. They
  never touch the network.
- `apps/patient/integration_test/` — the sign-in → book → pay → report journey on a device,
  still against a fake backend and payment gateway.
- `qxl-backend/tests/collect/` — two end-to-end API tests against a real database, enabled
  with `QXL_COLLECT_DB_TESTS=1` (they write data; use a throwaway database).

Never point automated tests at production: bookings, OTP SMS and payments are real.

## Regenerating icons and splash

Sources are in each app's `assets/brand/` (patient: from `qxl-frontend/app logo/`; collector:
the same logo on a navy/gold badge so the two apps are easy to tell apart):

```bash
dart run flutter_launcher_icons
dart run flutter_native_splash:create
```

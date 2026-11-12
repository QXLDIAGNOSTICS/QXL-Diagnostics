# QXL Diagnostics — patient app (Flutter, Android + iOS)

A native patient app for QXL Diagnostics. Patients can browse tests and packages, book a
home collection or centre visit, pay with Razorpay, and see their bookings, reports,
prescriptions and the QXL assistant. All content and prices come live from the QXL FastAPI
backend (`qxl-backend`); nothing is hard-coded or copied from the website.

| | |
|---|---|
| Flutter | 3.50.0 stable (Dart 3.14) — uses the decoupled `material_ui` package |
| State / DI | Riverpod 3 (`Notifier`/`AsyncNotifier`, no code generation) |
| Navigation | go_router 18, `StatefulShellRoute` with 4 tabs |
| Networking | dio 5, with the backend's opaque `qxl_session` cookie kept in the Keychain/Keystore |
| Payments | `razorpay_flutter` (server-created orders, server-side verification) |
| Platforms | Android (minSdk 24) and iOS 15+ |

## Quick start

```bash
cd qxl-mobile
flutter pub get
flutter run --dart-define-from-file=env/production.json
```

Production is the default backend. **Browsing is read-only, but sign-in, booking and payment
create real records.** For development, point the app at a local or staging backend:

```bash
cp env/local.example.json env/local.json   # edit QXL_API_BASE_URL
flutter run --dart-define-from-file=env/local.json
```

More: [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) · [docs/RELEASE.md](docs/RELEASE.md) ·
[docs/QA_CHECKLIST.md](docs/QA_CHECKLIST.md) · [docs/HANDOFF.md](docs/HANDOFF.md)

## Project layout

```
lib/
  config/        build-time config (API/website URLs) and server contract constants
  core/          API client (cookie session, error envelope, SSE), theme, shared widgets
  data/          models (match qxl-backend/app/schemas), repositories, shared providers
  features/      one folder per area: home, catalog, centers, cart, checkout, payment,
                 auth, bookings, prescriptions, assistant, account, content, shell
  routing/       go_router configuration
test/            unit + widget + accessibility tests (fake backend, no network)
integration_test/ end-to-end journeys on a device/emulator (fake backend + gateway)
env/             --dart-define-from-file configs (no secrets)
```

## Checks

```bash
dart format --set-exit-if-changed lib test integration_test
flutter analyze
flutter test
flutter test integration_test -d <device-id>
```

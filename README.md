# QXL mobile — patient app + QXL Collector (Flutter, Android + iOS)

Two native apps for QXL Diagnostics, built as one Dart pub workspace so they share a core
package. Everything shown comes live from the QXL FastAPI backend (`qxl-backend`); nothing is
hard-coded or copied from the website.

| App | Folder | For | Android id / iOS bundle |
|---|---|---|---|
| **QXL Diagnostics** | `apps/patient` | Patients: browse and book tests, home sample collection with live tracking, family profiles, saved addresses, payments, reports, prescriptions, assistant | `com.qxldiagnostics.app` |
| **QXL Collector** | `apps/collector` | Field staff: phlebotomists (jobs, identity check, barcode-linked specimens, payment at the door, handover) and couriers (custody, transfer to lab). Works offline | `com.qxldiagnostics.collector` |
| `qxl_core` | `packages/qxl_core` | Shared: API client (cookie session, error envelope, idempotency headers), config, navy/gold theme, widgets, OpenStreetMap view, push wrapper | — |

The ops side (dispatch, live map, collectors and PIN codes, lab receiving, report release,
dashboard) is in the existing admin panel: `qxl-admin` → **Home collection ops** pages under
`/collect/*`. The workflow, status machines and roles are documented in
`qxl-backend/docs/COLLECT.md`.

| | |
|---|---|
| Flutter | 3.50.0 stable (Dart 3.14) — Material from the `material_ui` package |
| State / navigation | Riverpod 3, go_router 18 |
| Networking | dio 5; opaque `qxl_session` cookie in Keychain/Keystore |
| Maps | OpenStreetMap via `flutter_map` (no Google key); navigation hands off to the phone's maps app |
| Push | Firebase Cloud Messaging when configured; otherwise the in-app inbox refreshes |
| Payments | `razorpay_flutter` (patient app only; server-created orders, server verification) |
| Platforms | Android (minSdk 24) and iOS 15+ |

## Quick start

```bash
cd qxl-mobile
flutter pub get                      # resolves the whole workspace
cd apps/patient   && flutter run --dart-define-from-file=env/production.json
cd apps/collector && flutter run --dart-define-from-file=env/local.json
```

Production is the default backend. **Sign-in, booking, payment and every collector action
create real records** — develop against a local or staging backend
(`cp env/local.example.json env/local.json` in either app, then edit it).
[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) explains how to run the whole flow locally.

More: [docs/HANDOFF.md](docs/HANDOFF.md) · [docs/RELEASE.md](docs/RELEASE.md) ·
[docs/QA_CHECKLIST.md](docs/QA_CHECKLIST.md) · [apps/collector/README.md](apps/collector/README.md)

## Layout

```
apps/patient/
  lib/config, core, data, features/<area>, routing   patient app
  test/, integration_test/                           fake-backend tests (no network)
apps/collector/
  lib/data/        models, encrypted offline store + action queue, repository, job rules
  lib/features/    login, home (jobs / courier), job workflow, scanner, custody, profile
  lib/tracking/    journey location sharing (foreground service while en route)
packages/qxl_core/ shared code used by both apps
env/ (per app)     --dart-define-from-file configs (no secrets)
```

## Checks

```bash
cd apps/patient   && flutter analyze && flutter test
cd apps/collector && flutter analyze && flutter test
cd apps/patient   && flutter test integration_test -d <device-id>
```

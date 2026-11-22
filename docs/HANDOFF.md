# Handoff — QXL patient app, QXL Collector and home-collection ops (QXL Collect)

Date: 2026-11-15 · Flutter 3.50.0 stable · Backend `qxl-backend` (FastAPI, `/api/v1`) ·
Ops portal `qxl-admin` (Next.js 16)

Nothing from this phase is committed, pushed or deployed yet.

## What was built

| Piece | Where | Summary |
|---|---|---|
| Backend (additive) | `qxl-backend` | Migration `0025_qxl_collect` (17 new tables, new nullable columns on `bookings` and `test_catalog`, 5 seeded roles), services in `app/services/collect/`, endpoints in `collect_patient.py`, `collect_field.py`, `collect_ops.py`. Design and status machines: `docs/COLLECT.md` |
| Patient app | `qxl-mobile/apps/patient` | Home sample collection on top of v1: service-area check, family profiles, saved addresses with a map pin, visit booking wizard (one visit for the whole cart), pay online or at the door, live tracking with collector card and visit code, cancel/reschedule until the collector leaves, reports, notifications inbox, push |
| Collector app | `qxl-mobile/apps/collector` | New app for phlebotomists and couriers, offline-first (see its README) |
| Shared core | `qxl-mobile/packages/qxl_core` | API client, config, navy/gold theme, widgets, OSM map, push wrapper |
| Ops portal | `qxl-admin/src/app/collect/*` | Dispatch, Live map (Leaflet + OSM), Collectors & areas, Lab receiving, Lab reports (+ ITDOSE sync queue), Collect dashboard; each page is shown only to roles with its permission |

## Update 2026-11-23 — accounts, passwords, payment checks, new look

**Field staff accounts (admin → Field Team & Areas).** An administrator (permission
`field_team.manage`, which admins have) adds a collector or courier from their details: name,
DOB, mobile, email, employee code, zone, shift. The backend creates the login and the field
profile together and returns a **12-character temporary password, shown once** to hand over in
person. The same page issues a new temporary password (also clears a lockout and signs them
out) and disables / re-enables a login. Disabling signs the person out at once and puts their
not-yet-started visits back in the dispatch queue; it is refused while they are on the way to or
at a patient. The Users page shows disabled / must-set-password status for all staff and can
disable other accounts.

**Passwords.**
- First sign-in with a temporary password (collector app *and* admin panel): password + OTP,
  then a forced "Set your password" screen. Until then the server refuses every other API call
  (`403 password_change_required`), so a temporary password can't be used for anything else.
- Forgot / change password: one code by **SMS** and a second, different code by **email**;
  both are required. Same answer for unknown accounts, 5 requests per hour, 5 wrong tries per
  request, single use, 5-minute expiry. A successful change signs the account out everywhere
  and emails the owner.
- Rule everywhere a password is set: 8–72 characters, letters and digits, must not contain the
  mobile number or email name, must differ from the current one.
- Staff passwords set by an admin on the Users page are now temporary too.

**Auth fixes found in the audit.** A password attempt on a phone-only patient account crashed
with a 500 (now a normal 401). Unknown accounts now take as long as real ones to reject.
OTPs are compared in constant time. Disabled accounts can't sign in by password or phone OTP,
and their existing sessions stop working on the next request.

**Razorpay.** `POST /payments/verify` now checks the signature **and** asks Razorpay for the
payment, accepting it only if it belongs to the order, is for the full amount in INR and is
captured (authorized payments are captured). If Razorpay can't be reached the answer is `409
payment_pending` and the app shows "confirming" until the webhook settles it. Webhooks with a
different amount/currency are ignored and logged; a partial refund no longer marks the whole
booking refunded; reconciliation applies the same amount check.

**Look.** Both apps use the website's design tokens (`qxl-frontend/public/qxl-design-tokens.css`):
corporate navy `#082C61`, primary blue `#1055AE`, light blue `#EAF6FF`, teal and the logo gold as
a small accent, and the website font **Plus Jakarta Sans** (bundled, SIL OFL, licence in
`packages/qxl_core/assets/fonts/OFL.txt`). The "Book now" gradient starts at `#1672C4` rather
than the site's brighter blue so white text stays above 4.5:1. The collector app has a navy
header with day stats and a duty toggle; sign-in, set-password and reset screens share one
branded layout.

**Verified 2026-11-23** (local backend, emulator, admin in a browser): admin created a collector
→ she signed in with the temporary password + OTP → a password containing her email name was
refused → she set her own → patient booked a home visit → admin assigned it to her → she
acknowledged, travelled, arrived, verified identity with DOB + visit code, linked a tube, took
cash → the patient's tracker moved Booked → Collector assigned → On the way → Collected →
she signed out, reset her password with the SMS + email codes, and signed in with the new one.
Backend real-DB tests: 6 passed (4 new: field-staff lifecycle, reset codes, login edge cases,
Razorpay verification/webhooks). Patient tests 55, collector tests 14, admin `tsc`/`eslint`
clean. Not verified: a real Razorpay payment (needs test keys) and the lab/report steps, which
didn't change since 2026-11-15.

## Owner decisions applied (2026-11-15)

Flutter for both apps · ops screens in qxl-admin · OpenStreetMap · FCM plus existing
SMS/email · ITDOSE through an adapter with manual entry until the API docs arrive ·
pre-printed labels, scanned · pay at collection (cash/UPI) allowed · identity = full name +
date of birth, optional 4-digit visit code the collector may ask for · courier role inside the
Collector app · self-service cancel/reschedule until the collector is en route · admin-managed
PIN codes · family profiles.

## End-to-end run (2026-11-15, local backend + Android emulator + admin in a browser)

Against a fresh local database seeded with `scripts/seed_data.py` and
`scripts/seed_collect_demo.py` (see DEVELOPMENT.md), never production:

1. Patient signs in (dev OTP), adds CBC + Lipid Profile, chooses home collection, adds
   "Myself" with DOB, adds an address (PIN 560040 confirmed serviceable), picks a slot, pays at
   collection, gives consent → visit `QXL-HC-…` with visit code.
2. Dispatcher (admin `/collect/dispatch`) sees the visit and the "unassigned" alert, opens the
   drawer and assigns the collector. Live map, setup and dashboard pages load real data.
3. Collector app: job appears → acknowledge → start journey → patient app shows "Collector on
   the way", the collector's position, a 3.4 km / ~16 min estimate and the collector's ID card
   → arrive → identity check → two labels scanned (typed) and linked to the right tests (EDTA,
   SST) → checklist + cash → **Collected**.
4. Collector hands both tubes to the courier by employee code; courier scans both to accept
   custody, sets the destination lab.
5. Lab user (`/collect/lab`) checks in the manifest (seal intact), sees the full chain of
   custody, accepts both tubes; on `/collect/reports` sets a status + ITDOSE accession, uploads
   a PDF with the authorizing pathologist and time, releases it.
6. Patient app: visit shows **Report ready**, both tests "Report ready", samples "Accepted by
   lab", and the report opens through a short-lived signed link.

### Bugs found by that run and fixed

| Where | Problem | Fix |
|---|---|---|
| Collector app + backend | App crashed after the identity check: `verify-identity` returned `{verified, method}` while every other job action returns the job | Endpoint now returns the job; the app only trusts a response that is that job, otherwise keeps its local change. Regression tests added (Flutter + backend e2e) |
| Collector app | "0 done · 1 to go" stayed stale after closing a visit | Profile counters refresh after every job action |
| Collector app | Destination-lab dropdown overflowed with long centre names | Dropdowns expand and ellipsize |
| Collector app | Signing out left the collector "on duty" for dispatch | Sign-out ends the shift first |
| Patient app | Tube types shown as "Edta"/"Sst" | Shown as recorded (EDTA, SST) |
| Patient app | Screen readers announced the bell as just "6" | Announced as "Notifications, 6 unread" |
| Patient app | GPS button covered the OpenStreetMap attribution on the address map | Button moved above it |
| Patient app | "Add a patient" started empty and as "Myself" even when Myself existed | Prefills Myself from the account; otherwise defaults to a family relation |
| Admin | Lab worklist had no visit reference; history showed empty "Reason:" | Worklist rows include `visit_reference` (additive); empty values hidden |

### Checks

| Check | Result |
|---|---|
| Patient `flutter analyze` / `flutter test` | No issues / 55 passed |
| Collector `flutter analyze` / `flutter test` | No issues / 11 passed (offline queue, encryption, safety rules, response handling) |
| Backend `tests/collect` (real DB, `QXL_COLLECT_DB_TESTS=1`) | 2 passed (incl. duplicate booking, wrong DOB, duplicate barcode, missing aftercare/payment, missing specimen in transport, rejection → recollection, unauthorized release, cross-account access) |
| Backend `ruff` on changed files | Clean |
| Admin `tsc`, `eslint`, `next build` | Clean; all six `/collect/*` routes build |

### Not verified, and why

- **iOS** (build, run, VoiceOver, background location) — needs a Mac.
- **Camera scanning** — the emulator has no camera; labels were typed with the built-in
  fallback. Scan real labels on a phone.
- **Live GPS stream** — the headless emulator's GPS stayed at a fixed point, so the app sent
  no positions. The upload endpoint and the patient's live map were checked by posting a
  batch directly. Test on a real phone while driving.
- **Push** — no Firebase project yet; the inbox fallback was used.
- **Online payment for a visit** — needs Razorpay test keys on a staging backend.
- **Offline replay on a device** — covered by unit tests, not by toggling airplane mode.
- **Reject, missing-specimen and amendment paths in the UI** — covered by the backend e2e
  tests, not clicked through. **Hold and revoke** are not tested anywhere yet.
- **Report PDF viewing** — the signed link was issued and opened in the phone's browser; the
  PDF itself was not viewed (local storage URLs point at the emulator host).

## Deploying

1. Review and commit the backend (branch `backend`) — leave `app/services/chat_service.py` out;
   another session changed it. Deploy, then run `alembic upgrade head` (adds `0025_qxl_collect` and `0026_account_security`;
   additive only, the website keeps working).
2. Set the new settings in Railway (all in `.env.example` under "QXL Collect"):
   `VISITS_PER_COLLECTOR_PER_SLOT`, `HOME_VISIT_BOOKING_DAYS`, `CONSENT_VERSION`,
   `FCM_SERVICE_ACCOUNT_JSON` (when Firebase is ready), and keep `LOCAL_STORAGE_*` empty so
   report PDFs go to the private Supabase bucket. `BOOKING_SLOTS` drives home-visit slots too.
3. Deploy qxl-admin (`npm install` adds `leaflet`).
4. In the admin panel: add PIN codes (Collectors & areas), create collector/courier accounts
   (Users) and their field profiles, create dispatcher / lab accounts.
5. Fill `sample_type`, `container_type` and `fasting_required` on every home-collectable test
   (currently empty in production). The collector app shows what to draw from these.
6. Build both apps with production env files (RELEASE.md).

## Waiting on the owner

- **Initial PIN code list** with zone names and any fee overrides.
- **Collector and courier roster**: names, phones, employee codes, zones, shifts, working days.
- **Container / sample type per test** (or confirmation to set them per test in the admin).
- **Label format** of the pre-printed barcodes (the apps accept 6–40 letters, digits or
  hyphens; tighten it once known).
- **Firebase project** (2 Android + 2 iOS apps, APNs key, service account).
- **Map tile provider** for production (OSM's public server isn't allowed for app traffic).
- **ITDOSE API documentation** and credentials, to replace manual accession/status entry.
- **Signing keys**, store accounts, and how the Collector app is distributed (RELEASE.md).
- Legal review of the home-collection consent text (`CONSENT_VERSION` 2026-11) and the
  cancellation/refund wording.
- A cash/UPI reconciliation routine: the portal marks visit payments reconciled one by one.

## Risks and gaps

1. **One session per account.** The backend signs out other sessions on login, so a collector
   who signs in on a second phone is signed out of the first (their unsynced actions stay
   on that phone until they sign in there again).
2. **Reports open in the phone's browser** through a 5-minute signed link. Safe against
   sharing (it expires), but the link lands in browser history. An in-app PDF viewer would
   keep it inside the app.
3. **ETA is a straight-line estimate** (labelled "estimate") — no routing service.
4. **Pre-existing:** `scripts/seed_data.py` fails on a fresh database (centre and doctor rows
   lack the now-required `slug`); 3 failing backend tests (`test_require_role_*` ×2,
   `test_chat_stream_endpoint_emits_sse`) are unchanged.

## Still open from v1 (patient app, 2026-11-13)

- Centre-booking `report_url` is free text, not a signed URL (home-visit reports are signed).
- The assistant's `create_booking` tool books without a confirmation step.
- Guest bookings can't be looked up later.
- Production `POST /chat/stream` returned an empty stream on 2026-11-13 (being looked at in a
  separate session).
- `MAX_BOOKINGS_PER_SLOT` counts each cart item for centre bookings (home visits count visits).

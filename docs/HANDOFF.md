# Handoff — QXL patient app v1

Date: 2026-11-13 · Flutter 3.50.0 stable · Backend: `qxl-backend` (FastAPI, `/api/v1`)

## Decisions applied

| Decision | Outcome |
|---|---|
| Scope | Patient/customer app only (no admin, staff, collection or control-centre screens) |
| Location in workspace | `qxl-mobile/` |
| Booking slots | Additive backend change approved: `slots` on `GET /bookings/slot-availability`, driven by `BOOKING_SLOTS` |
| Auth | Existing phone + OTP flow; opaque `qxl_session` cookie stored in Keychain/Keystore |
| Reports | Signed-in user's own bookings only (no public lookup) |
| AI assistant | Included, with a "not a doctor" notice; never pays automatically |
| Brand / legal | Logo from `qxl-frontend/app logo/`; Privacy, Terms and Payment terms opened live from qxldiagnostics.com |
| Defaults (not asked) | English only; location optional and asked in context; no push notifications; family profiles, saved addresses, wallet and referrals deferred (no APIs) |

## What works (against the real API contract)

| Journey | Screens | API paths |
|---|---|---|
| Discover | Home (banners, quick actions, featured packages, specialities, doctors, reviews, help), search | `GET /banners`, `/packages?home=true`, `/specialities`, `/doctors`, `/reviews`, `/settings`, `/tests?q=` |
| Tests & packages | Explore tabs with category filters, test/package detail, speciality detail with server-resolved profiles | `GET /tests`, `/tests/{id}`, `/packages`, `/packages/{id}`, `/specialities/{slug}`, `POST /catalog/resolve` |
| Centres | List, optional "nearest first", detail with call/directions/book here | `GET /centers?lat=&lng=`, `GET /centers/{slug}` |
| Cart & booking | Persisted cart re-priced from the live catalog; home or centre; 14-day date strip; live slots; patient details pre-filled from profile; guest booking allowed | `GET /bookings/slot-availability`, `POST /bookings` |
| Payment | Server-confirmed amounts and fee → Razorpay → server verification; pay later; retry; pending-confirmation state | `POST /payments/orders`, `POST /payments/verify` |
| Account | Phone OTP sign-in (account auto-created), session restore, profile completion/edit, sign out | `POST /auth/login/phone`, `/auth/login/otp`, `GET /auth/me`, `PATCH /users/me`, `POST /auth/logout` |
| Bookings & reports | Paged list, status timeline, payment state, https-only report link, pay now | `GET /bookings/me`, `GET /bookings/{id}` |
| Prescriptions | Camera/photo/PDF upload with progress and cancel, monthly quota, analysis polling, matched tests added to the cart only by the user, open original file via signed URL | `GET/POST /prescriptions`, `GET /prescriptions/quota`, `GET /prescriptions/{id}`, `GET /files/{id}` |
| Assistant | Streaming replies, stop, interruption handling, daily limit, history (signed in), payment card routed to the normal payment screen | `POST /chat/stream`, `GET /chat/rate-limit`, `/chat/conversations`, `/chat/conversations/{id}` |
| Help | FAQs, doctors, health articles, contact form, call/WhatsApp, legal pages, licences | `GET /faqs`, `/doctors/{slug}`, `/blog`, `/blog/{slug}`, `POST /leads/contact` |

Every screen has loading, empty, error-with-retry and success states. Nothing shown in the app
is invented: prices, slots, statuses and content all come from the API, and items without a
price show "Price on request" with a call option.

## Backend change made (not committed, not deployed)

In `qxl-backend` (branch `backend`, uncommitted):

- `app/core/config.py` — new `BOOKING_SLOTS` setting (comma-separated labels).
- `app/services/booking_service.py` — `slot_options()` normalises each configured label with
  the same parser `POST /bookings` uses, and marks each slot `past` (IST) or `full`
  (`MAX_BOOKINGS_PER_SLOT`).
- `app/api/v1/endpoints/bookings.py` — `GET /bookings/slot-availability` also returns
  `slots: [{label, start, end, booked, available, unavailable_reason}]`. Existing fields are
  unchanged, so the website is unaffected.
- `tests/test_booking_rules.py` — 2 new tests (pass). `.env.example` documents the variable.

**To enable mobile booking:** deploy this change and set `BOOKING_SLOTS` in Railway, for
example `6:00 AM - 8:00 AM,8:00 AM - 10:00 AM,10:00 AM - 12:00 PM,2:00 PM - 4:00 PM,4:00 PM - 6:00 PM`
(these are the windows the website offers today — confirm them). Until then the app shows
"Online slot booking isn't available right now" with a Call button, which is what production
shows now.

Pre-existing backend state, unrelated to this change: 3 failing tests
(`test_require_role_*` ×2, `test_chat_stream_endpoint_emits_sse`) and 20 ruff findings in the
touched files — identical before and after the change.

## Contract gaps and risks found

1. **Report links are plain URLs.** `report_url` is free text set by staff, not a signed,
   expiring URL. The app opens only `https` links in an in-app browser tab, but anyone with the
   link can open it. Recommend serving reports through the private files bucket with signed
   URLs (like `GET /files/{id}`).
2. **Assistant can create bookings without a confirmation step.** The signed-in chat's
   `create_booking` tool books on the model's decision. The app never pays automatically and
   shows bookings for review, but a server-side "confirm before booking" step would be safer.
3. **Guest bookings can't be viewed later.** `GET /bookings/{id}` requires the owning account,
   so a guest only gets a reference on the result screen. The app nudges sign-in before
   booking. A public lookup would need an approved backend contract.
4. **Guest chat quota is fingerprinted by IP/user-agent**, so users behind the same mobile
   carrier NAT may share the 50/day guest limit.
5. **README drift:** `qxl-backend/README.md` still describes password + SMS-link 2FA; the code
   is phone + OTP only for patients.
6. **The live assistant endpoint returns an empty stream.** On 2026-11-13,
   `POST /chat/stream` on production answered `200 text/event-stream` with **no body** after
   about 2.5 s (guest request, reproduced with curl). The guest generator fails before its first
   event, most likely in the OpenAI call (key, quota or model). The app now shows "The assistant
   couldn't answer just now" instead of hanging, but the assistant won't work until the backend
   is fixed. Check the Railway logs for `chat_service.stream_answer_guest`.
7. **Slot capacity counts each cart item** as one booking against `MAX_BOOKINGS_PER_SLOT` (3).
   The app disables slots that can't hold the whole cart; a large cart may find few slots.

## Tests and builds run (Linux host, Android emulator API 36)

| Check | Result |
|---|---|
| `flutter analyze` | No issues |
| `flutter test` — unit, widget and accessibility (tap target, labels, contrast) | 53 passed |
| `flutter test integration_test -d emulator-5554` — sign in → cart → checkout → pay → verified → bookings → report | Passed |
| `flutter build apk --debug` + manual run against production (browse only) | Runs; live banners, packages, tests, cart and checkout render; no slots offered (backend change not deployed) |
| `flutter build appbundle --release` / `apk --release` (R8 on, Razorpay keep rules) | Built (AAB 59 MB, APK 60 MB). Release APK installed and run on the emulator: home, catalog, package detail, centres, assistant, dark mode and 1.6× text checked. Signed with the debug key — no upload keystore yet |
| Backend `pytest tests/test_booking_rules.py` | Passed (2 new tests) |

Not run, and why:

- **iOS build, simulator run and VoiceOver** — needs macOS/Xcode (this machine is Linux). The
  iOS project is configured (bundle id, display name, permission strings, icons, splash).
- **Real Razorpay checkout** — needs the merchant's test-mode keys on a staging backend. The
  flow is covered with a fake gateway; run the RELEASE.md test-payment step before launch.
- **Real OTP sign-in, real booking or payment against production** — deliberately not done;
  they send real SMS and create real records.
- **TalkBack pass** — automated guideline checks pass; a manual pass is in QA_CHECKLIST.md.

## Waiting on the owner

- Confirm app name and IDs, Apple/Google developer accounts, release owner (RELEASE.md).
- Android upload keystore and iOS signing team.
- Store listing text/screenshots, Data safety / App Privacy answers.
- Deploy the backend slot change and set `BOOKING_SLOTS`.
- A staging backend with Razorpay test keys for payment QA.
- A 1024 px master icon if the current logo-derived icon isn't final.

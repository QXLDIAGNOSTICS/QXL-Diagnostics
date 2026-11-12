# Development guide

## Toolchain

- Flutter **3.50.0 stable** (`flutter --version`). Stay on the stable channel.
- Android: Android SDK with platform 36, build-tools 36.1, an x86_64 system image for the
  emulator. AGP 9.3 / Gradle 9.5 come from the project template.
- iOS: a Mac with the current Xcode. Run `flutter build ios` once to resolve plugins
  (Swift Package Manager is enabled in Flutter 3.50; CocoaPods is used for any plugin
  without SPM support).

Material widgets come from `package:material_ui/material_ui.dart` (Flutter 3.47+ moved
Material out of the framework; `package:flutter/material.dart` is deprecated).

## Configuration

`lib/config/app_config.dart` reads three compile-time values, supplied with
`--dart-define-from-file=env/<name>.json`:

| Key | Meaning |
|---|---|
| `QXL_API_BASE_URL` | FastAPI base including `/api/v1` |
| `QXL_WEBSITE_URL` | Website origin, used only to open the privacy/terms/payment-terms pages |
| `QXL_ENV` | `production`, `staging` or `local` (shown on the About screen) |

Release builds refuse non-https URLs. On the Android emulator, `10.0.2.2` reaches the host
machine (see `env/local.example.json`). Local `env/*.local.json` files are git-ignored.

## How the app talks to the backend

- **Session.** The backend authenticates with an opaque, httpOnly `qxl_session` cookie (no
  JWT, no bearer header). `SessionCookieInterceptor` captures it from `Set-Cookie`, stores
  it with `flutter_secure_storage`, and replays it as a `Cookie` header. A `401` on a
  request that carried the cookie clears it and the app returns to the guest state. The
  server applies a 24 h idle timeout and a 14-day absolute limit.
- **Errors.** Every failure becomes an `ApiException` built from the backend envelope
  `{"error": {"code", "message", "detail"}}`. Screens show `describeError(e)` and a retry.
- **Login.** `POST /auth/login/phone` → 8-digit OTP via SMS (and email if the account has
  one) → `POST /auth/login/otp`. The first verified login creates the patient account.
- **Booking.** One `POST /bookings` per cart item (the API books one test/package per
  booking). `BookingSubmitter` remembers successes so a retry never duplicates.
  Slots come from `GET /bookings/slot-availability` (`slots` array — see HANDOFF.md).
- **Payment.** `POST /payments/orders` (server computes the amount and any home-collection
  fee) → Razorpay Checkout → `POST /payments/verify`. Success is shown only after the server
  returns `status: paid`. The Razorpay secret never exists in the app.
- **Assistant.** `POST /chat/stream` (SSE: `conversation_id`, `delta`, `payment_order`,
  `error`, `[DONE]`) parsed by `parseServerSentEvents`.

## Tests

- `test/` — unit, widget and accessibility tests against `FakeApi`, an in-memory
  `HttpClientAdapter` (`test/support/fake_api.dart`). They never touch the network.
- `integration_test/` — the full sign-in → book → pay → report journey on a real
  device/emulator, still against `FakeApi` and a fake payment gateway, so it is safe to run
  anywhere.

Never point automated tests at production: bookings, OTP SMS and payments are real.

## Regenerating icons and splash

Sources are in `assets/brand/` (derived from `qxl-frontend/app logo/app_logo-512x512.jpg`,
which is 2677×2442 px):

```bash
dart run flutter_launcher_icons
dart run flutter_native_splash:create
```

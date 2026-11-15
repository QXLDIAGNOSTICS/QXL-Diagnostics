# QXL Collector

The field app for QXL home sample collection. One app, two roles, chosen by the staff
account that signs in:

- **Collector (phlebotomist)** — today's / upcoming / past jobs, acknowledge, start journey
  (shares location with the patient and dispatch only while travelling), arrive, verify the
  patient (name + date of birth they say, optional 4-digit visit code), scan a pre-printed
  label per tube and link it to tests, aftercare checklist, record cash/UPI for pay-at-visit,
  partial or unsuccessful visits with a reason, and hand the tubes to a courier or the lab.
- **Courier** — accept custody by scanning every tube in the bag, pass it to another courier
  or set the destination lab, report a missing or damaged specimen.

Accounts are ordinary staff users with the `collector` or `courier` role, created in the
admin panel (**Users**), plus a field profile (**Collectors & Areas**: employee code, zone,
shift, working days). Sign-in is staff identifier + password + one-time code. Field roles
cannot sign in to the patient app or the admin panel.

## Safety rules (enforced in the app *and* on the server)

- No specimen before identity is verified; a DOB mismatch blocks collection.
- A label must be valid, unused anywhere, and linked to at least one test on the visit.
- Closing a visit needs every test covered (or "partly collected" with a reason), the full
  aftercare checklist, and — for pay-at-visit — the exact amount (UPI needs a reference).
- Custody changes only by scanning: the receiver confirms what they got.

## Offline

Every action gets an `Idempotency-Key` and goes through `OfflineQueue`
(`lib/data/offline_store.dart`). Without a connection it is applied locally and saved in an
AES-GCM encrypted file (key in Keystore/Keychain), then replayed in order. A server rejection
during replay is kept for review on the **Sync status** screen and blocks later actions for
the same job. Sign-out wipes local data and refuses while actions are still unsynced.
Signing out also ends the shift (sets the collector off duty).

## Run

```bash
cp env/local.example.json env/local.json      # point at a local/staging backend
flutter run --dart-define-from-file=env/local.json
flutter analyze && flutter test
```

Firebase push is optional: add the `QXL_FIREBASE_*` keys (see `docs/DEVELOPMENT.md`) with the
**collector** app's Firebase app ids. Without them the app refreshes jobs while open.

## Platform notes

- Android: camera, fine location, foreground service (type `location`) with a visible
  "Sharing your journey" notification, notifications. No background location permission.
- iOS: camera and location-when-in-use strings, `location` and `remote-notification`
  background modes (journey sharing continues with the blue indicator while en route).

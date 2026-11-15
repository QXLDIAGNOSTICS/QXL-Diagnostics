# Release checklist

Nothing has been published. Items marked **OWNER** need information or accounts only the
QXL product owner has.

## Identity (temporary until confirmed — OWNER)

Paths are relative to each app folder (`apps/patient`, `apps/collector`).

| | Patient app | Collector app | File |
|---|---|---|---|
| Display name | QXL Diagnostics | QXL Collector | `android/app/src/main/AndroidManifest.xml`, `ios/Runner/Info.plist` |
| Android applicationId | `com.qxldiagnostics.app` | `com.qxldiagnostics.collector` | `android/app/build.gradle.kts` |
| iOS bundle id | `com.qxldiagnostics.app` | `com.qxldiagnostics.collector` | `ios/Runner.xcodeproj/project.pbxproj` |
| Version | `1.0.0+1` | `1.0.0+1` | `pubspec.yaml` |

Changing the IDs after the first store upload is not possible, so confirm them first.

**Distributing the Collector app (OWNER decision).** It is for QXL staff only. Options:
Play Console *internal testing* / a closed track or managed Google Play for company phones,
and Apple Business Manager custom app or TestFlight for iOS. A public listing is not needed.

## Android signing

1. Create an upload keystore (keep it out of the repo, back it up securely):
   ```bash
   keytool -genkey -v -keystore ~/qxl-upload.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
   ```
2. Create `android/key.properties` (git-ignored):
   ```properties
   storePassword=…
   keyPassword=…
   keyAlias=upload
   storeFile=/absolute/path/to/qxl-upload.jks
   ```
3. Build (from the app folder): `flutter build appbundle --release --dart-define-from-file=env/production.json`.
   Each app needs its own `android/key.properties` (or the same upload key, if you prefer).
   Without `key.properties` the release build is signed with the debug key and **must not be
   uploaded**.
4. Enrol in Play App Signing when creating the app in Play Console (OWNER).

## iOS signing (needs a Mac — OWNER account)

1. Open `ios/Runner.xcworkspace`, set the Team and confirm the bundle id.
2. `flutter build ipa --release --dart-define-from-file=env/production.json`.
3. Upload with Xcode Organizer or Transporter; test via TestFlight.

## Push notifications (OWNER)

Create one Firebase project with two Android apps and two iOS apps (patient + collector).
Put each app's ids in its `env/production.json` (`QXL_FIREBASE_*`, see DEVELOPMENT.md), upload
the APNs key in Firebase for iOS, and set the backend's `FCM_SERVICE_ACCOUNT_JSON` (a service
account with the *Firebase Cloud Messaging API* role). Without these, push is skipped and the
apps show updates from the in-app inbox while open. Messages never contain results or OTPs.

## Maps (OWNER)

The apps and the admin live map use OpenStreetMap tiles. The public `tile.openstreetmap.org`
server does not allow production app traffic. Choose a provider (e.g. a paid OSM tile host or
self-hosted tiles) and set `QXL_MAP_TILE_URL` / `QXL_MAP_ATTRIBUTION` in both apps and
`NEXT_PUBLIC_MAP_TILE_URL` / `NEXT_PUBLIC_MAP_ATTRIBUTION` in the admin panel.

## Store declarations to prepare (OWNER review)

The patient app collects and sends to QXL: mobile number, name, email, date of birth
(required for home collection), family members' names and dates of birth, patient
age/gender, saved addresses with their map pin, booking details, prescription files (health
information), chat messages, and payment status. Card/UPI details are entered only in the
Razorpay sheet. Device location is read only when the user taps a location button (nearest
centre, or placing the address pin); only the pin the user saves is stored. No analytics or
advertising SDKs are included.

- Google Play **Data safety** form and **Health apps** declaration.
- App Store **App Privacy** labels; `ITSAppUsesNonExemptEncryption` is set to `false`
  (standard HTTPS only).
- Permission strings are already in `Info.plist` (camera, photos, location when in use).
- Privacy policy URL: `https://qxldiagnostics.com/privacy-policy` (confirm it covers the app).
- Patient app (home collection): precise location is used only when the patient taps "Use my
  current location" on the address map, and the chosen pin is stored with the address. The
  collector's live position is shown to the patient only while their collector is on the way.
- Collector app: camera (scanning labels), precise location **while travelling to a visit**
  through a foreground service with a visible notification (Play: *foreground service
  location* declaration with a short video), notifications. It stores patient names, dates of
  birth and addresses for assigned jobs **encrypted on the phone** and wipes them on sign-out.

## Before each release

- [ ] `flutter analyze`, `flutter test`, `flutter test integration_test -d <device>` pass
- [ ] Manual QA checklist in `QA_CHECKLIST.md` on one Android and one iOS device
- [ ] A Razorpay **test-mode** payment completes end-to-end on both platforms (staging backend)
- [ ] Backend in the target environment has `BOOKING_SLOTS` set and migration `0025_qxl_collect` applied (see HANDOFF.md)
- [ ] At least one active service-area PIN code and one collector profile per zone exist, or
      patients will see no home-visit slots
- [ ] Version bumped in `pubspec.yaml`

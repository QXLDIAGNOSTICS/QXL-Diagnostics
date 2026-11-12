# Release checklist

Nothing has been published. Items marked **OWNER** need information or accounts only the
QXL product owner has.

## Identity (temporary until confirmed — OWNER)

| | Current value | File |
|---|---|---|
| Display name | QXL Diagnostics | `android/app/src/main/AndroidManifest.xml`, `ios/Runner/Info.plist` |
| Android applicationId | `com.qxldiagnostics.app` | `android/app/build.gradle.kts` |
| iOS bundle id | `com.qxldiagnostics.app` | `ios/Runner.xcodeproj/project.pbxproj` |
| Version | `1.0.0+1` | `pubspec.yaml` |

Changing the IDs after the first store upload is not possible, so confirm them first.

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
3. Build: `flutter build appbundle --release --dart-define-from-file=env/production.json`.
   Without `key.properties` the release build is signed with the debug key and **must not be
   uploaded**.
4. Enrol in Play App Signing when creating the app in Play Console (OWNER).

## iOS signing (needs a Mac — OWNER account)

1. Open `ios/Runner.xcworkspace`, set the Team and confirm the bundle id.
2. `flutter build ipa --release --dart-define-from-file=env/production.json`.
3. Upload with Xcode Organizer or Transporter; test via TestFlight.

## Store declarations to prepare (OWNER review)

The app collects and sends to QXL: mobile number, name, email, date of birth (optional),
patient age/gender, collection address, booking details, prescription files (health
information), chat messages, and payment status. Card/UPI details are entered only in the
Razorpay sheet. Approximate location is used once, only when the user taps "Use my
location", and is not stored. No analytics or advertising SDKs are included.

- Google Play **Data safety** form and **Health apps** declaration.
- App Store **App Privacy** labels; `ITSAppUsesNonExemptEncryption` is set to `false`
  (standard HTTPS only).
- Permission strings are already in `Info.plist` (camera, photos, location when in use).
- Privacy policy URL: `https://qxldiagnostics.com/privacy-policy` (confirm it covers the app).

## Before each release

- [ ] `flutter analyze`, `flutter test`, `flutter test integration_test -d <device>` pass
- [ ] Manual QA checklist in `QA_CHECKLIST.md` on one Android and one iOS device
- [ ] A Razorpay **test-mode** payment completes end-to-end on both platforms (staging backend)
- [ ] Backend in the target environment has `BOOKING_SLOTS` set (see HANDOFF.md)
- [ ] Version bumped in `pubspec.yaml`

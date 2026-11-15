# Manual QA checklist

Automated tests cover logic, the main screens' tap targets/labels/contrast, and the
critical journey on an emulator. These checks need a person and real devices.

Use a **staging** backend with Razorpay **test** keys. Production creates real bookings.

## Screen readers
- [ ] TalkBack (Android): every tab, the booking form, slot chips, payment screen and
      booking detail can be completed with swipe navigation; the result of each action is
      announced (errors, "Payment successful", upload progress).
- [ ] VoiceOver (iOS): same pass.

## Layout
- [ ] Smallest supported phone (e.g. 360×640 dp) and a large phone; iPad portrait.
- [ ] System font size at maximum: booking form, payment summary, cart remain usable.
- [ ] Dark mode on both platforms.
- [ ] Keyboard never hides the focused field on the booking, login and contact forms.

## Journeys
- [ ] First launch as guest → browse packages/tests/specialities/centres → search.
- [ ] Sign in with a real phone; OTP arrives; SMS autofill works on iOS/Android.
- [ ] Kill and relaunch: still signed in. Sign out: bookings tab returns to sign-in prompt.
- [ ] Book home collection and centre visit; full slot shown as "Full"; past slot "Passed".
- [ ] Pay with Razorpay test card/UPI: success, cancel, failure, and app backgrounded
      during payment.
- [ ] Pay later from booking detail.
- [ ] Upload prescription from camera, gallery and PDF; deny permission once; cancel upload.
- [ ] Assistant: ask a question, stop mid-reply, airplane mode mid-reply, daily limit message.
- [ ] Airplane mode on Home, Bookings and Checkout shows "Can't reach QXL" with retry.
- [ ] Location: deny, allow, and "don't ask again" on the Centres screen.

## Home collection (patient app + QXL Collector + admin `/collect`)

Use real phones for the collector (camera, GPS, background). Emulators can't scan labels and
their GPS is unreliable.

- [ ] PIN outside the service areas: the address form says home collection isn't available.
- [ ] Book for "Myself" and for a family member; DOB is required; slots respect the zone's
      collectors and show "Passed"/"Full".
- [ ] Pay online and pay at collection; cancel and reschedule before the collector leaves;
      both are refused once the collector is on the way.
- [ ] Dispatcher assigns (manual and auto), reassigns with a reason; the collector gets a push
      (if Firebase is set up) and the job appears after refresh either way.
- [ ] Collector: acknowledge → start journey → the patient sees the collector moving and an
      ETA → arrive. Lock the phone while travelling: sharing continues with the notification.
- [ ] Identity: a wrong DOB blocks collection; the right DOB (and the visit code, optionally)
      allows it.
- [ ] Scan real pre-printed labels in poor light (torch) and a damaged label (type it); the
      same label on a second visit is rejected.
- [ ] Partial collection with a reason; unsuccessful visit (patient not home); recollection
      appears for dispatch after a lab rejection.
- [ ] Airplane mode at the patient's door: identity, specimens and completion are saved on
      the phone and sync later; a conflicting change shows in **Sync status**; sign-out is
      refused while anything is unsynced.
- [ ] Handover to a courier by employee code; the courier must scan every tube; a missing
      tube is flagged at the lab.
- [ ] Lab: receive the manifest, accept one tube, reject one (recollection opens), upload a
      PDF with authorization details, preview, release; the patient gets "Report ready" and
      can open it; revoke removes access; an amended report supersedes the first.
- [ ] Admin pages with the dispatcher, lab receiving and lab reporting roles: each sees only
      its own pages.
- [ ] TalkBack/VoiceOver through the collector job screen and the patient tracking screen.

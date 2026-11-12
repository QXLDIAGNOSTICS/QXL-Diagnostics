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

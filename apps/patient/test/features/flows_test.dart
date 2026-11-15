import 'dart:async';

import 'package:flutter_test/flutter_test.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_core/qxl_core.dart';
import 'package:qxl_mobile/features/cart/cart_controller.dart';
import 'package:qxl_mobile/features/payment/payment_gateway.dart';
import 'package:qxl_mobile/routing/router.dart';

import '../support/app_harness.dart';
import '../support/fake_api.dart';

MemoryCartStorage _cartWithTest() =>
    MemoryCartStorage()..value = '[{"kind":"test","id":"t-1","name":"Lipid Profile","price":500,"home":true}]';

void main() {
  late FakeApi api;

  setUp(() {
    api = FakeApi()
      ..on('GET /tests', (_) => FakeResponse.json([testJson()]))
      ..on('GET /centers', (_) => FakeResponse.json(<Object>[]));
  });

  group('Checkout', () {
    testWidgets('without server-defined slots it offers a call, not a fake slot', (tester) async {
      api.on('GET /bookings/slot-availability', (_) => FakeResponse.json(slotsJson(slots: [])));
      final container = await pumpApp(tester, api, cart: _cartWithTest());
      unawaited(routerOf(container).push(Routes.checkout));
      await settle(tester);

      expect(find.text('Online slot booking isn’t available right now.'), findsOneWidget);
      final button = tester.widget<FilledButton>(find.widgetWithText(FilledButton, 'Request booking'));
      expect(button.onPressed, isNull);
    });

    testWidgets('validates, books once per item, then hands the server bookings to payment', (tester) async {
      tester.view.physicalSize = const Size(1080, 4200);
      tester.view.devicePixelRatio = 2.5;
      addTearDown(tester.view.reset);

      api
        ..on('GET /bookings/slot-availability', (_) => FakeResponse.json(slotsJson()))
        ..on('POST /bookings', (req) => FakeResponse.json(bookingJson(), status: 201))
        ..on(
          'POST /payments/orders',
          (_) => FakeResponse.json({
            'key_id': 'rzp_test_public',
            'order_id': 'order_1',
            'amount': 50000,
            'currency': 'INR',
            'booking_ids': [bookingJson()['id']],
            'collection_fee': 0,
          }, status: 201),
        );
      final container = await pumpApp(
        tester,
        api,
        cart: _cartWithTest(),
        gateway: FakeGateway(const GatewayFailed(cancelled: true)),
      );
      unawaited(routerOf(container).push(Routes.checkout));
      await settle(tester);

      // Submitting empty shows field errors and sends nothing.
      await tester.tap(find.text('8:00 AM - 10:00 AM'));
      await tester.tap(find.text('Request booking'));
      await settle(tester);
      expect(find.text('Enter the full address for the collection'), findsOneWidget);
      expect(api.count('POST /bookings'), 0);

      await tester.enterText(
        find.widgetWithText(TextFormField, 'Collection address'),
        '12, 3rd Cross, Vijayanagar, Bengaluru 560040',
      );
      await tester.enterText(find.widgetWithText(TextFormField, 'Full name'), 'Asha Rao');
      await tester.enterText(find.widgetWithText(TextFormField, 'Mobile number'), '9876543210');
      await tester.tap(find.text('Request booking'));
      await settle(tester);

      expect(api.count('POST /bookings'), 1);
      final body = api.requests.firstWhere((r) => r.path == '/bookings').body! as Map;
      expect(body['test_id'], 't-1');
      expect(body['patient_phone'], '+919876543210');
      expect(body['preferred_time'], '8:00 AM - 10:00 AM');
      expect(body['collection_type'], 'home');
      // Payment screen shows the server's amount, and the booked item left the cart.
      expect(find.text('Pay ₹500'), findsOneWidget);
      expect(container.read(cartProvider).isEmpty, isTrue);

      // Leaving the payment screen keeps the booking and says payment is due.
      await tester.pageBack();
      await settle(tester);
      expect(find.text('Booking requested'), findsOneWidget);
      expect(find.text('Payment is still due. You can pay any time from My bookings.'), findsNothing);
    });
  });

  group('Sign in', () {
    testWidgets('phone → OTP → signed in, with masked destination shown', (tester) async {
      api
        ..on(
          'POST /auth/login/phone',
          (_) => FakeResponse.json({
            'challenge_id': 'c-1',
            'masked_email': '***',
            'masked_phone': '+91******3210',
            'otp_expires_in': 300,
            'otp_verified': false,
            'requires_admin_secret': false,
          }),
        )
        ..on(
          'POST /auth/login/otp',
          (_) => FakeResponse.json(
            {'challenge_id': 'c-1', 'otp_verified': true, 'completed': true},
            headers: {
              'set-cookie': [sessionSetCookie],
            },
          ),
        )
        ..on('GET /auth/me', (_) => FakeResponse.json(userJson()))
        ..on('GET /bookings/me', (_) => FakeResponse.json({'items': <Object>[], 'count': 0}));
      final session = SessionStore(MemorySecureStore());
      final container = await pumpApp(tester, api, session: session);
      routerOf(container).go(Routes.bookings);
      await settle(tester);
      await tester.tap(find.text('Sign in'));
      await settle(tester);

      await tester.enterText(find.byType(TextFormField), '98765 43210');
      await tester.tap(find.text('Send code'));
      await settle(tester);
      expect(find.textContaining('+91******3210'), findsOneWidget);

      await tester.enterText(find.byType(TextField), '12345678');
      await tester.testTextInput.receiveAction(TextInputAction.done);
      await settle(tester);

      expect(session.token, 'opaque-test-token');
      expect(find.text('No home collections yet'), findsOneWidget);
    });

    testWidgets('a wrong code shows the server message and stays on the code step', (tester) async {
      api
        ..on(
          'POST /auth/login/phone',
          (_) => FakeResponse.json({'challenge_id': 'c-1', 'masked_phone': '+91******3210', 'otp_expires_in': 300}),
        )
        ..on('POST /auth/login/otp', (_) => FakeResponse.error(401, 'unauthorized', 'Incorrect or expired code'));
      final container = await pumpApp(tester, api);
      unawaited(routerOf(container).push(Routes.login));
      await settle(tester);
      await tester.enterText(find.byType(TextFormField), '9876543210');
      await tester.tap(find.text('Send code'));
      await settle(tester);
      await tester.enterText(find.byType(TextField), '00000000');
      await tester.pump();
      await tester.ensureVisible(find.text('Verify and sign in'));
      await tester.tap(find.text('Verify and sign in'));
      await settle(tester);

      expect(find.text('Incorrect or expired code'), findsOneWidget);
      expect(find.text('Verify and sign in'), findsOneWidget);
    });
  });

  group('Bookings and reports', () {
    testWidgets('shows real statuses and offers the report only over https', (tester) async {
      final session = SessionStore(MemorySecureStore());
      await session.save('valid');
      final ready = bookingJson(
        status: 'report_ready',
        paymentStatus: 'paid',
        reportUrl: 'https://reports.example/r.pdf',
      );
      api
        ..on('GET /auth/me', (_) => FakeResponse.json(userJson()))
        ..on(
          'GET /bookings/me',
          (_) => FakeResponse.json({
            'items': [ready],
            'count': 1,
          }),
        )
        ..on('GET /bookings/${ready['id']}', (_) => FakeResponse.json(ready));
      final container = await pumpApp(tester, api, session: session);
      routerOf(container).go(Routes.bookings);
      await settle(tester);
      await tester.tap(find.text('Other bookings'));
      await settle(tester);

      expect(find.text('Report ready'), findsOneWidget);
      expect(find.text('Paid'), findsOneWidget);
      await tester.tap(find.text('Lipid Profile'));
      await settle(tester);
      expect(find.text('View report'), findsOneWidget);
      expect(find.textContaining('Pay ₹'), findsNothing);
    });

    testWidgets('an expired session returns the user to the signed-out state', (tester) async {
      final session = SessionStore(MemorySecureStore());
      await session.save('valid');
      api
        ..on('GET /auth/me', (_) => FakeResponse.json(userJson()))
        ..on('GET /bookings/me', (_) => FakeResponse.error(401, 'unauthorized', 'Session expired or revoked'))
        ..on('GET /home-visits', (_) => FakeResponse.error(401, 'unauthorized', 'Session expired or revoked'));
      final container = await pumpApp(tester, api, session: session);
      routerOf(container).go(Routes.bookings);
      await settle(tester);

      expect(session.hasSession, isFalse);
      expect(find.text('Your bookings and reports'), findsOneWidget);
    });
  });
}

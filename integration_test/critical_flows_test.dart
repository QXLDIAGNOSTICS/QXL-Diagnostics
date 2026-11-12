import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_mobile/core/network/session_store.dart';
import 'package:qxl_mobile/features/payment/payment_gateway.dart';

import '../test/support/app_harness.dart';
import '../test/support/fake_api.dart';

/// Runs the critical patient journeys on a real device/emulator against an
/// in-memory backend and payment gateway, so no real booking or payment is
/// ever created. Run: `flutter test integration_test -d <device-id>`
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('sign in → add test → checkout → pay → verified → bookings → report', (tester) async {
    final booked = <Map<String, dynamic>>[];
    final api = FakeApi()
      ..on('GET /tests', (_) => FakeResponse.json([testJson()]))
      ..on(
        'POST /auth/login/phone',
        (_) => FakeResponse.json({
          'challenge_id': 'c-1',
          'masked_email': '***',
          'masked_phone': '+91******3210',
          'otp_expires_in': 300,
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
      ..on('GET /bookings/slot-availability', (_) => FakeResponse.json(slotsJson()))
      ..on('POST /bookings', (req) {
        final b = bookingJson();
        booked.add(b);
        return FakeResponse.json(b, status: 201);
      })
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
      )
      ..on('POST /payments/verify', (_) {
        booked.first
          ..['payment_status'] = 'paid'
          ..['status'] = 'report_ready'
          ..['report_url'] = 'https://reports.example/report.pdf';
        return FakeResponse.json({'id': 'pay-1', 'amount': 50000, 'status': 'paid'});
      })
      ..on('GET /bookings/me', (_) => FakeResponse.json({'items': booked, 'count': booked.length}))
      ..on('GET /bookings/${bookingJson()['id']}', (_) => FakeResponse.json(booked.first));

    final session = SessionStore(MemorySecureStore());
    await pumpApp(
      tester,
      api,
      session: session,
      gateway: FakeGateway(const GatewaySucceeded(paymentId: 'pay_1', orderId: 'order_1', signature: 'sig')),
    );

    // Sign in from the Account tab.
    await tester.tap(find.text('Account'));
    await settle(tester);
    await tester.tap(find.text('Sign in with mobile number'));
    await settle(tester);
    await tester.enterText(find.byType(TextFormField), '9876543210');
    await tester.tap(find.text('Send code'));
    await settle(tester, frames: 20);
    await tester.enterText(find.byType(TextField), '12345678');
    await tester.pump();
    await tester.ensureVisible(find.text('Verify and sign in'));
    await tester.tap(find.text('Verify and sign in'));
    await settle(tester, frames: 20);
    expect(find.text('Asha Rao'), findsOneWidget);
    expect(session.token, isNotNull);

    // Add a test from the catalog.
    await tester.tap(find.text('Tests').last);
    await settle(tester);
    await tester.tap(find.widgetWithText(Tab, 'Tests'));
    await settle(tester);
    await tester.tap(find.text('Add').first);
    await settle(tester);
    await tester.tap(find.text('View cart').first);
    await settle(tester, frames: 20);
    await tester.tap(find.text('Continue'));
    await settle(tester, frames: 20);

    // Checkout: details are pre-filled from the profile; add an address and slot.
    expect(find.widgetWithText(TextFormField, 'Asha Rao'), findsOneWidget);
    await tester.enterText(
      find.widgetWithText(TextFormField, 'Collection address'),
      '12, 3rd Cross, Vijayanagar, Bengaluru',
    );
    await tester.ensureVisible(find.text('8:00 AM - 10:00 AM'));
    await tester.tap(find.text('8:00 AM - 10:00 AM'));
    await tester.pump();
    await tester.tap(find.text('Request booking'));
    await settle(tester, frames: 25);
    expect(api.count('POST /bookings'), 1);

    // Payment: amount from the server, verified by the server.
    await tester.tap(find.text('Pay ₹500'));
    await settle(tester, frames: 25);
    expect(find.text('Payment successful'), findsOneWidget);

    // Bookings and report.
    await tester.tap(find.text('View my bookings'));
    await settle(tester, frames: 20);
    expect(find.text('Report ready'), findsOneWidget);
    await tester.tap(find.text('Lipid Profile').first);
    await settle(tester, frames: 20);
    expect(find.text('View report'), findsOneWidget);
    expect(api.count('POST /bookings'), 1, reason: 'no duplicate booking anywhere in the flow');
  });
}

import 'dart:async';

import 'package:flutter_test/flutter_test.dart';
import 'package:qxl_mobile/data/models/booking.dart';
import 'package:qxl_mobile/features/payment/payment_gateway.dart';
import 'package:qxl_mobile/features/payment/payment_screen.dart';
import 'package:qxl_mobile/routing/router.dart';

import '../support/app_harness.dart';
import '../support/fake_api.dart';

void main() {
  late FakeApi api;
  final booking = Booking.fromJson(bookingJson());

  setUp(() {
    api = FakeApi()
      ..on(
        'POST /payments/orders',
        (_) => FakeResponse.json({
          'key_id': 'rzp_test_public',
          'order_id': 'order_123',
          'amount': 65000,
          'currency': 'INR',
          'booking_ids': [booking.id],
          'collection_fee': 15000,
        }, status: 201),
      );
  });

  Future<FakeGateway> openPayment(WidgetTester tester, GatewayOutcome outcome) async {
    final gateway = FakeGateway(outcome);
    final container = await pumpApp(tester, api, gateway: gateway);
    unawaited(routerOf(container).push(Routes.pay, extra: PayRequest(bookings: [booking])));
    await settle(tester);
    return gateway;
  }

  testWidgets('shows server amounts, then confirms only after server verification', (tester) async {
    api.on(
      'POST /payments/verify',
      (_) => FakeResponse.json({
        'id': 'pay-1',
        'booking_id': booking.id,
        'amount': 65000,
        'currency': 'INR',
        'status': 'paid',
      }),
    );
    final gateway = await openPayment(
      tester,
      const GatewaySucceeded(paymentId: 'pay_abc', orderId: 'order_123', signature: 'sig_xyz'),
    );

    expect(find.text('Home collection fee'), findsOneWidget);
    expect(find.text('₹150'), findsOneWidget);
    expect(find.text('Pay ₹650'), findsOneWidget);
    expect(
      (api.requests.firstWhere((r) => r.path == '/payments/orders').body! as Map)['apply_home_collection_fee'],
      isTrue,
    );

    await tester.tap(find.text('Pay ₹650'));
    await settle(tester);

    expect(gateway.opened.single.orderId, 'order_123');
    final verify = api.requests.firstWhere((r) => r.path == '/payments/verify').body! as Map;
    expect(verify, {
      'razorpay_order_id': 'order_123',
      'razorpay_payment_id': 'pay_abc',
      'razorpay_signature': 'sig_xyz',
    });
    expect(find.text('Payment successful'), findsOneWidget);
  });

  testWidgets('a cancelled checkout never calls verify and offers a retry', (tester) async {
    await openPayment(tester, const GatewayFailed(cancelled: true));
    await tester.tap(find.text('Pay ₹650'));
    await settle(tester);

    expect(api.count('POST /payments/verify'), 0);
    expect(find.text('Payment was cancelled. You have not been charged.'), findsOneWidget);
    expect(find.text('Try again · ₹650'), findsOneWidget);
    expect(find.text('Payment successful'), findsNothing);
  });

  testWidgets('if verification cannot be reached the app does not claim success', (tester) async {
    // No verify route → the fake answers 404; simulate an outage instead.
    api.on('POST /payments/verify', (_) => FakeResponse.error(503, 'internal_error', 'unavailable'));
    await openPayment(tester, const GatewaySucceeded(paymentId: 'p', orderId: 'order_123', signature: 's'));
    await tester.tap(find.text('Pay ₹650'));
    await settle(tester);

    expect(find.text('Payment is being confirmed'), findsOneWidget);
    expect(find.text('Payment successful'), findsNothing);
  });

  testWidgets('order creation errors keep the booking and explain why', (tester) async {
    api.on(
      'POST /payments/orders',
      (_) => FakeResponse.error(422, 'validation_error', 'This booking has already been paid for'),
    );
    await openPayment(tester, const GatewayFailed(cancelled: true));

    expect(find.text('This booking has already been paid for'), findsOneWidget);
    expect(find.text('Pay later'), findsOneWidget);
  });
}

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/misc.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';
import 'package:qxl_mobile/app.dart';
import 'package:qxl_core/qxl_core.dart';
import 'package:qxl_mobile/data/models/booking.dart';
import 'package:qxl_mobile/features/cart/cart_controller.dart';
import 'package:qxl_mobile/features/payment/payment_gateway.dart';
import 'package:qxl_mobile/routing/router.dart';

import 'fake_api.dart';

class FakeGateway implements PaymentGateway {
  FakeGateway(this.outcome);

  GatewayOutcome outcome;
  final List<PaymentOrder> opened = [];

  @override
  Future<GatewayOutcome> checkout(PaymentOrder order, {PaymentPrefill prefill = const PaymentPrefill()}) async {
    opened.add(order);
    return outcome;
  }
}

/// Pumps the real app wired to [api]. Returns the container for direct
/// access to the router and state.
Future<ProviderContainer> pumpApp(
  WidgetTester tester,
  FakeApi api, {
  PaymentGateway? gateway,
  SessionStore? session,
  CartStorage? cart,
  List<Override> extra = const [],
}) async {
  // Public content the home screen loads; empty unless a test overrides.
  for (final route in ['GET /banners', 'GET /specialities', 'GET /doctors', 'GET /faqs', 'GET /packages']) {
    api.routes.putIfAbsent(
      route,
      () =>
          (_) => FakeResponse.json(<Object>[]),
    );
  }
  api.routes.putIfAbsent(
    'GET /home-visits',
    () =>
        (_) => FakeResponse.json({'items': <Object>[], 'count': 0}),
  );
  api.routes.putIfAbsent(
    'GET /me/inbox',
    () =>
        (_) => FakeResponse.json({'unread': 0, 'items': <Object>[]}),
  );
  api.routes.putIfAbsent(
    'GET /reviews',
    () =>
        (_) => FakeResponse.json({'items': <Object>[], 'count': 0}),
  );
  api.routes.putIfAbsent(
    'GET /settings',
    () =>
        (_) => FakeResponse.json({'ai_chat_enabled': true, 'phone_e164': '+910000000000'}),
  );

  final container = ProviderContainer(
    retry: (_, _) => null,
    overrides: [
      ...fakeOverrides(api, session: session, cart: cart),
      if (gateway != null) paymentGatewayProvider.overrideWithValue(gateway),
      ...extra,
    ],
  );
  addTearDown(container.dispose);
  await tester.pumpWidget(UncontrolledProviderScope(container: container, child: const QxlApp()));
  await settle(tester);
  return container;
}

GoRouter routerOf(ProviderContainer container) => container.read(routerProvider);

/// Like pumpAndSettle, but tolerant of indefinite progress animations.
Future<void> settle(WidgetTester tester, {int frames = 12}) async {
  for (var i = 0; i < frames; i++) {
    await tester.pump(const Duration(milliseconds: 100));
  }
}

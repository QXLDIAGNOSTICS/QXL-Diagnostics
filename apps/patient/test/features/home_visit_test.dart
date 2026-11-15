import 'dart:async';

import 'package:flutter_test/flutter_test.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_core/qxl_core.dart';
import 'package:qxl_mobile/features/cart/cart_controller.dart';
import 'package:qxl_mobile/routing/router.dart';

import '../support/app_harness.dart';
import '../support/fake_api.dart';

Map<String, dynamic> visitJson({String stage = 'awaiting_assignment', String status = 'confirmed', bool collector = false}) => {
  'id': 'v-1',
  'reference': 'QXL-HC-261116-AB12',
  'status': status,
  'stage': stage,
  'payment_mode': 'pay_on_visit',
  'payment_status': 'pay_on_visit',
  'items_total_paise': 50000,
  'collection_fee_paise': 15000,
  'total_paise': 65000,
  'paid_paise': 0,
  'patient': {'profile_id': 'p-1', 'name': 'Asha Rao', 'date_of_birth': '1990-05-04', 'phone': '+919876543210'},
  'visit_code': '4821',
  'address': {'line': '12, 3rd Cross, Vijayanagar, Bengaluru, 560040', 'pincode': '560040', 'lat': 12.97, 'lng': 77.53},
  'slot_date': '2030-01-15',
  'slot_label': '8:00 AM - 10:00 AM',
  'can_cancel': true,
  'can_reschedule': true,
  'job': {'id': 'j-1', 'status': collector ? 'en_route' : 'unassigned', 'is_delayed': false},
  'collector': collector
      ? {'name': 'Ravi K', 'employee_code': 'C123', 'phone': '+919800000001', 'qualification': 'DMLT'}
      : null,
  'tests': [
    {'booking_id': 'b-1', 'name': 'Lipid Profile', 'lab_status': 'not_received', 'payment_status': 'pay_on_visit'},
  ],
  'specimens': <Object>[],
  'reports': <Object>[],
  'timeline': [
    {'event': 'booked', 'at': '2030-01-10T10:00:00Z'},
  ],
};

void main() {
  late FakeApi api;
  late SessionStore session;

  setUp(() async {
    session = SessionStore(MemorySecureStore());
    await session.save('valid');
    api = FakeApi()
      ..on('GET /auth/me', (_) => FakeResponse.json(userJson()))
      ..on('GET /tests', (_) => FakeResponse.json([testJson()]))
      ..on(
        'GET /me/profiles',
        (_) => FakeResponse.json([
          {'id': 'p-1', 'reference': 'QXL-PAT-1', 'full_name': 'Asha Rao', 'date_of_birth': '1990-05-04', 'relation': 'self'},
        ]),
      )
      ..on(
        'GET /me/addresses',
        (_) => FakeResponse.json([
          {
            'id': 'a-1',
            'label': 'Home',
            'house': '12, 3rd Cross',
            'locality': 'Vijayanagar',
            'city': 'Bengaluru',
            'pincode': '560040',
            'lat': 12.97,
            'lng': 77.53,
            'is_default': true,
          },
        ]),
      )
      ..on('GET /service-areas/check', (_) => FakeResponse.json({'pincode': '560040', 'serviceable': true}))
      ..on(
        'GET /home-collection/slots',
        (_) => FakeResponse.json({
          'slots': [
            {'label': '8:00 AM - 10:00 AM', 'available': true, 'remaining': 2},
            {'label': '10:00 AM - 12:00 PM', 'available': false, 'unavailable_reason': 'full'},
          ],
        }),
      )
      ..on('GET /home-visits/v-1', (_) => FakeResponse.json(visitJson()));
  });

  testWidgets('books a home collection once, with consent, and opens the visit', (tester) async {
    tester.view.physicalSize = const Size(1080, 5200);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    api.on('POST /home-visits', (_) => FakeResponse.json(visitJson(), status: 201));
    final cart = MemoryCartStorage()..value = '[{"kind":"test","id":"t-1","name":"Lipid Profile","price":500,"home":true}]';
    final container = await pumpApp(tester, api, session: session, cart: cart);
    unawaited(routerOf(container).push(Routes.homeVisit));
    await settle(tester, frames: 20);

    // Profile and default address are preselected; the full slot can't be picked.
    expect(find.textContaining('Asha Rao (You)'), findsOneWidget);
    expect(find.textContaining('12, 3rd Cross'), findsOneWidget);
    expect(find.text('10:00 AM - 12:00 PM · Full'), findsOneWidget);

    await tester.tap(find.text('8:00 AM - 10:00 AM'));
    await tester.tap(find.text('Pay at collection'));
    await tester.tap(find.text('Review booking'));
    await settle(tester);
    expect(api.count('POST /home-visits'), 0, reason: 'consent is required first');

    await tester.tap(find.byType(CheckboxListTile));
    await tester.tap(find.text('Review booking'));
    await settle(tester);
    expect(find.text('Review your booking'), findsOneWidget);
    await tester.tap(find.text('Confirm booking'));
    await settle(tester, frames: 20);

    expect(api.count('POST /home-visits'), 1);
    final request = api.requests.firstWhere((r) => r.path == '/home-visits' && r.method == 'POST');
    expect(request.headers['Idempotency-Key'], isNotEmpty);
    final body = request.body! as Map;
    expect(body['payment_mode'], 'pay_on_visit');
    expect(body['consent_accepted'], isTrue);
    expect((body['address'] as Map)['lat'], 12.97);
    // Lands on the visit with the visit code and the pay-at-collection note.
    expect(find.text('4821'), findsOneWidget);
    expect(find.textContaining('Please pay ₹650 to the collector'), findsOneWidget);
  });

  testWidgets('visit screen shows the assigned collector and live ETA', (tester) async {
    api
      ..on('GET /home-visits/v-1', (_) => FakeResponse.json(visitJson(stage: 'on_the_way', collector: true)))
      ..on(
        'GET /home-visits/v-1/tracking',
        (_) => FakeResponse.json({
          'job_status': 'en_route',
          'location': {'lat': 12.96, 'lng': 77.52, 'at': DateTime.now().toUtc().toIso8601String()},
          'eta_seconds': 540,
          'distance_m': 1800,
          'destination': {'lat': 12.97, 'lng': 77.53},
        }),
      );
    final container = await pumpApp(tester, api, session: session);
    unawaited(routerOf(container).push(Routes.visit('v-1')));
    await settle(tester, frames: 20);

    expect(find.text('Collector on the way'), findsWidgets);
    expect(find.text('Ravi K'), findsOneWidget);
    expect(find.text('Call collector'), findsOneWidget);
    expect(find.textContaining('About 9 min (estimate)'), findsOneWidget);
    // Leave the screen so its polling timers stop.
    routerOf(container).go(Routes.home);
    await settle(tester);
  });
}

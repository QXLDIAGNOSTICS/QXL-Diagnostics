import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:qxl_core/qxl_core.dart';
import 'package:qxl_mobile/data/models/booking.dart';
import 'package:qxl_mobile/data/models/catalog.dart';
import 'package:qxl_mobile/data/repositories/repositories.dart';
import 'package:qxl_mobile/features/auth/auth_controller.dart';
import 'package:qxl_mobile/features/cart/cart_controller.dart';
import 'package:qxl_mobile/features/checkout/booking_submitter.dart';

import '../support/fake_api.dart';

void main() {
  group('CartController', () {
    late ProviderContainer container;
    late MemoryCartStorage storage;

    setUp(() {
      storage = MemoryCartStorage();
      container = ProviderContainer(overrides: [cartStorageProvider.overrideWithValue(storage)]);
      addTearDown(container.dispose);
    });

    test('adds once, removes, and persists only catalog ids/names/prices', () async {
      final cart = container.read(cartProvider.notifier);
      final item = CartItem.fromTest(LabTest.fromJson(testJson()));
      cart
        ..add(item)
        ..add(item);
      expect(container.read(cartProvider).count, 1);
      await Future<void>.delayed(Duration.zero);
      expect(storage.value, contains('"id":"t-1"'));
      expect(storage.value, isNot(contains('phone')));
      cart.remove(item);
      expect(container.read(cartProvider).isEmpty, isTrue);
    });

    test('restores a saved cart', () async {
      storage.value = '[{"kind":"package","id":"p-1","name":"Quick Fit Package","price":1770,"home":true}]';
      final fresh = ProviderContainer(overrides: [cartStorageProvider.overrideWithValue(storage)]);
      addTearDown(fresh.dispose);
      fresh.read(cartProvider);
      await Future<void>.delayed(Duration.zero);
      expect(fresh.read(cartProvider).items.single.name, 'Quick Fit Package');
    });

    test('reconcile re-prices from the live catalog and flags unbookable items', () {
      final cart = container.read(cartProvider.notifier)
        ..add(CartItem.fromTest(LabTest.fromJson(testJson(price: 400))))
        ..add(CartItem.fromPackage(HealthPackage.fromJson(packageJson())));
      cart.reconcile(
        tests: [LabTest.fromJson(testJson(price: 450, home: false))],
        packages: [HealthPackage.fromJson(packageJson(price: 0, contactForPrice: true))],
      );
      final state = container.read(cartProvider);
      final test = state.items.firstWhere((i) => i.kind == CatalogKind.test);
      expect(test.priceRupees, 450);
      expect(test.homeCollectionAvailable, isFalse);
      expect(state.items.firstWhere((i) => i.kind == CatalogKind.package).unavailable, isTrue);
      expect(state.estimatedTotalRupees, 450);
      expect(state.homeCollectionPossible, isFalse);
    });
  });

  group('BookingSubmitter', () {
    test('retries only the items that failed, never duplicating bookings', () async {
      final api = FakeApi();
      var calls = 0;
      api.on('POST /bookings', (req) {
        calls++;
        final body = req.body! as Map<String, dynamic>;
        if (calls == 2) return FakeResponse.error(422, 'validation_error', 'That slot is fully booked.');
        return FakeResponse.json(
          bookingJson(id: 'b-$calls', testName: (body['test_id'] ?? body['package_id']) as String),
          status: 201,
        );
      });
      final client = ApiClient(
        baseUrl: testConfig.apiBaseUrl,
        session: SessionStore(MemorySecureStore()),
        adapter: api,
      );
      final submitter = BookingSubmitter(BookingRepository(client));
      final items = [
        CartItem.fromTest(LabTest.fromJson(testJson(id: 't-1'))),
        CartItem.fromTest(LabTest.fromJson(testJson(id: 't-2', name: 'HbA1c'))),
      ];
      BookingRequest request(CartItem i) => BookingRequest(
        patientName: 'Asha',
        patientPhone: '+919876543210',
        collectionType: CollectionType.home,
        collectionAddress: '12 Main Road, Bengaluru',
        preferredDate: '2030-01-15',
        preferredTime: '8:00 AM - 10:00 AM',
        testId: i.id,
      );

      await expectLater(submitter.submit(items, request), throwsA(isA<ApiException>()));
      expect(submitter.created.length, 1);

      final bookings = await submitter.submit(items, request);
      expect(bookings.map((b) => b.id), ['b-1', 'b-3']);
      expect(api.count('POST /bookings'), 3, reason: 't-1 must not be booked twice');
    });
  });

  group('AuthController', () {
    late FakeApi api;
    late SessionStore session;
    late ProviderContainer container;

    setUp(() {
      api = FakeApi();
      session = SessionStore(MemorySecureStore());
      container = ProviderContainer(overrides: fakeOverrides(api, session: session));
      addTearDown(container.dispose);
    });

    test('guest when there is no stored session (no network call)', () async {
      expect(await container.read(authControllerProvider.future), isNull);
      expect(api.requests, isEmpty);
    });

    test('phone OTP login stores the cookie and loads the user', () async {
      await container.read(authControllerProvider.future);
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
        ..on('GET /auth/me', (_) => FakeResponse.json(userJson()));

      final auth = container.read(authControllerProvider.notifier);
      final challenge = await auth.requestOtp('+919876543210');
      expect(challenge.maskedPhone, '+91******3210');
      final user = await auth.verifyOtp(challengeId: challenge.challengeId, otp: '12345678');

      expect(user.name, 'Asha Rao');
      expect(session.token, 'opaque-test-token');
      expect(container.read(currentUserIdProvider), 'u-1');
      expect((api.requests.firstWhere((r) => r.path == '/auth/login/otp').body! as Map)['otp'], '12345678');
    });

    test('refuses to report success when the server issued no session', () async {
      await container.read(authControllerProvider.future);
      api.on(
        'POST /auth/login/otp',
        (_) => FakeResponse.json({'challenge_id': 'c', 'otp_verified': true, 'completed': false}),
      );
      await expectLater(
        container.read(authControllerProvider.notifier).verifyOtp(challengeId: 'c', otp: '12345678'),
        throwsA(isA<ApiException>()),
      );
      expect(container.read(currentUserIdProvider), isNull);
    });

    test('an expired stored session falls back to guest', () async {
      await session.save('expired');
      api.on('GET /auth/me', (_) => FakeResponse.json(null));
      expect(await container.read(authControllerProvider.future), isNull);
      expect(session.hasSession, isFalse);
    });

    test('sign out clears the local session even if the server call fails', () async {
      await session.save('valid');
      api
        ..on('GET /auth/me', (_) => FakeResponse.json(userJson()))
        ..on('POST /auth/logout', (_) => FakeResponse.error(500, 'internal_error', 'boom'));
      await container.read(authControllerProvider.future);
      await container.read(authControllerProvider.notifier).signOut();
      expect(session.hasSession, isFalse);
      expect(container.read(currentUserIdProvider), isNull);
    });
  });
}

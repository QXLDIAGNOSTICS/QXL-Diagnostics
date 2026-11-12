import 'dart:async';

import 'package:flutter_test/flutter_test.dart';
import 'package:qxl_mobile/routing/router.dart';

import '../support/app_harness.dart';
import '../support/fake_api.dart';

/// Automated checks for touch-target size, labels and text contrast on the
/// main patient screens. Screen-reader behaviour still needs manual
/// TalkBack/VoiceOver passes (see docs/QA_CHECKLIST.md).
void main() {
  FakeApi api() => FakeApi()
    ..on(
      'GET /packages',
      (_) => FakeResponse.json([
        packageJson(),
        packageJson(id: 'p-2', name: 'Anemia Profile', price: 0, contactForPrice: true),
      ]),
    )
    ..on('GET /tests', (_) => FakeResponse.json([testJson()]))
    ..on(
      'GET /settings',
      (_) => FakeResponse.json({
        'ai_chat_enabled': true,
        'phone_e164': '+910000000000',
        'whatsapp_number': '910000000000',
      }),
    )
    ..on('GET /reviews', (_) => FakeResponse.json({'items': <Object>[], 'count': 0}))
    ..on('GET /bookings/slot-availability', (_) => FakeResponse.json(slotsJson()));

  for (final (name, route) in [
    ('home', Routes.home),
    ('explore', Routes.explore),
    ('bookings (guest)', Routes.bookings),
    ('account', Routes.account),
    ('login', Routes.login),
    ('package detail', Routes.package('p-1')),
  ]) {
    testWidgets('$name meets tap-target, label and contrast guidelines', (tester) async {
      final handle = tester.ensureSemantics();
      final fake = api()..on('GET /packages/p-1', (_) => FakeResponse.json(packageJson()));
      final container = await pumpApp(tester, fake);
      if (route == Routes.login || route.startsWith('/packages/')) {
        unawaited(routerOf(container).push(route));
      } else {
        routerOf(container).go(route);
      }
      await settle(tester);

      await expectLater(tester, meetsGuideline(androidTapTargetGuideline));
      await expectLater(tester, meetsGuideline(iOSTapTargetGuideline));
      await expectLater(tester, meetsGuideline(labeledTapTargetGuideline));
      await expectLater(tester, meetsGuideline(textContrastGuideline));
      handle.dispose();
    });
  }
}

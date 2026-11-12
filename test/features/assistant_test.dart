import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:qxl_mobile/data/models/records.dart';
import 'package:qxl_mobile/features/assistant/assistant_controller.dart';

import '../support/fake_api.dart';

void main() {
  late FakeApi api;
  late ProviderContainer container;

  setUp(() {
    api = FakeApi()
      ..on(
        'GET /chat/rate-limit',
        (_) => FakeResponse.json({'used': 1, 'limit': 50, 'remaining': 49, 'kind': 'guest'}),
      );
    container = ProviderContainer(retry: (_, _) => null, overrides: fakeOverrides(api));
    addTearDown(container.dispose);
  });

  test('streams deltas into one assistant reply', () async {
    api.on(
      'POST /chat/stream',
      (_) => const FakeResponse(
        200,
        null,
        raw: 'data: {"conversation_id": "c1"}\n\ndata: {"delta": "Yes, fast "}\n\ndata: {"delta": "10-12 hours."}\n\ndata: [DONE]\n\n',
      ),
    );
    await container.read(assistantProvider.notifier).send('Do I need to fast?');
    final state = container.read(assistantProvider);
    expect(state.messages.map((m) => m.role), [ChatRole.user, ChatRole.assistant]);
    expect(state.messages.last.content, 'Yes, fast 10-12 hours.');
    expect(state.error, isNull);
    expect(state.streaming, isFalse);
  });

  test('an empty stream (server failed before answering) shows an error', () async {
    // Observed on production 2026-11-13: HTTP 200, text/event-stream, no body.
    api.on('POST /chat/stream', (_) => const FakeResponse(200, null, raw: ''));
    await container.read(assistantProvider.notifier).send('Which tests check thyroid?');
    final state = container.read(assistantProvider);
    expect(state.messages.single.role, ChatRole.user);
    expect(state.error, contains('couldn’t answer'));
  });

  test('a reply cut off before [DONE] is marked interrupted', () async {
    api.on('POST /chat/stream', (_) => const FakeResponse(200, null, raw: 'data: {"delta": "Partial"}\n\n'));
    await container.read(assistantProvider.notifier).send('Hi');
    final state = container.read(assistantProvider);
    expect(state.messages.last.content, 'Partial');
    expect(state.interrupted, isTrue);
    expect(state.error, contains('cut off'));
  });

  test('daily limit message comes from the server', () async {
    api.on(
      'POST /chat/stream',
      (_) => FakeResponse.json({
        'error': {'code': 'chat_limit_reached', 'message': "You've reached your daily chat limit of 50 messages."},
      }, status: 429),
    );
    await container.read(assistantProvider.notifier).send('Hi');
    expect(container.read(assistantProvider).error, contains('daily chat limit'));
  });
}

import 'package:flutter_test/flutter_test.dart';
import 'package:qxl_core/qxl_core.dart';

import '../support/fake_api.dart';

void main() {
  group('parseSessionCookie', () {
    test('extracts the qxl_session value', () {
      expect(parseSessionCookie(sessionSetCookie), 'opaque-test-token');
    });

    test('ignores other cookies', () {
      expect(parseSessionCookie('other=1; Path=/'), isNull);
    });

    test('treats delete_cookie responses as a logout', () {
      expect(parseSessionCookie('qxl_session=""; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; Path=/'), '');
      expect(parseSessionCookie('qxl_session=abc; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/'), '');
    });
  });

  group('parseServerSentEvents', () {
    test('splits events across arbitrary chunk boundaries', () async {
      final chunks = Stream.fromIterable([
        'data: {"conversation_id": "c1"}\n',
        '\ndata: {"delta": "Hel',
        'lo"}\n\ndata: [DONE]\n\n',
      ]);
      expect(await parseServerSentEvents(chunks).toList(), [
        '{"conversation_id": "c1"}',
        '{"delta": "Hello"}',
        '[DONE]',
      ]);
    });

    test('handles CRLF line endings and a trailing event without a blank line', () async {
      final chunks = Stream.fromIterable(['data: a\r\n\r\ndata: b']);
      expect(await parseServerSentEvents(chunks).toList(), ['a', 'b']);
    });
  });

  group('ApiException.fromResponse', () {
    test('reads the backend error envelope', () {
      final e = ApiException.fromResponse(422, {
        'error': {'code': 'validation_error', 'message': 'The 8:00 AM slot is fully booked.', 'detail': null},
      });
      expect(e.kind, ApiErrorKind.validation);
      expect(e.message, 'The 8:00 AM slot is fully booked.');
    });

    test('surfaces the first pydantic validation reason without the prefix', () {
      final e = ApiException.fromResponse(422, {
        'error': {
          'code': 'validation_error',
          'message': 'Request validation failed',
          'detail': [
            {
              'loc': ['body', 'preferred_time'],
              'msg': 'Value error, Please select a preferred date and time slot.',
            },
          ],
        },
      });
      expect(e.message, 'Please select a preferred date and time slot.');
    });

    test('maps 429 to rate limited and 5xx to retryable server errors', () {
      expect(ApiException.fromResponse(429, null).kind, ApiErrorKind.rateLimited);
      final server = ApiException.fromResponse(503, 'oops');
      expect(server.kind, ApiErrorKind.server);
      expect(server.isRetryable, isTrue);
    });
  });

  group('SessionCookieInterceptor', () {
    late FakeApi api;
    late SessionStore session;
    late ApiClient client;

    setUp(() {
      api = FakeApi();
      session = SessionStore(MemorySecureStore());
      client = ApiClient(baseUrl: testConfig.apiBaseUrl, session: session, adapter: api);
    });

    test('stores the cookie from Set-Cookie and replays it', () async {
      api.on(
        'POST /auth/login/otp',
        (_) => FakeResponse.json(
          {'challenge_id': 'c', 'otp_verified': true, 'completed': true},
          headers: {
            'set-cookie': [sessionSetCookie],
          },
        ),
      );
      api.on('GET /auth/me', (_) => FakeResponse.json(userJson()));

      await client.post('/auth/login/otp', body: {}, decode: (j) => j);
      expect(session.token, 'opaque-test-token');

      await client.get('/auth/me', decode: (j) => j);
      expect(api.requests.last.headers['Cookie'], 'qxl_session=opaque-test-token');
    });

    test('clears the session when the server rejects the cookie', () async {
      await session.save('stale');
      api.on('GET /bookings/me', (_) => FakeResponse.error(401, 'unauthorized', 'Session expired or revoked'));
      final signedOut = expectLater(session.changes, emits(false));

      await expectLater(
        client.get('/bookings/me', decode: (j) => j),
        throwsA(isA<ApiException>().having((e) => e.kind, 'kind', ApiErrorKind.unauthorized)),
      );
      await signedOut;
      expect(session.hasSession, isFalse);
    });

    test('does not attach a cookie for guests', () async {
      api.on('GET /tests', (_) => FakeResponse.json([testJson()]));
      await client.get('/tests', decode: (j) => j);
      expect(api.requests.single.headers.containsKey('Cookie'), isFalse);
    });

    test('surfaces SSE error envelopes as ApiException', () async {
      api.on(
        'POST /chat/stream',
        (_) => FakeResponse.json({
          'error': {'code': 'chat_limit_reached', 'message': "You've reached your daily chat limit of 50 messages."},
        }, status: 429),
      );
      await expectLater(
        client.postEventStream('/chat/stream', body: {'question': 'hi'}).toList(),
        throwsA(
          isA<ApiException>()
              .having((e) => e.kind, 'kind', ApiErrorKind.rateLimited)
              .having((e) => e.message, 'message', contains('daily chat limit')),
        ),
      );
    });
  });
}

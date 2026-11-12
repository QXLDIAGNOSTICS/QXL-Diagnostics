import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';

import 'package:dio/dio.dart';
import 'package:flutter_riverpod/misc.dart';
import 'package:qxl_mobile/config/app_config.dart';
import 'package:qxl_mobile/core/network/api_client.dart';
import 'package:qxl_mobile/core/network/session_store.dart';
import 'package:qxl_mobile/data/providers.dart';
import 'package:qxl_mobile/features/cart/cart_controller.dart';

/// A recorded request the fake API received.
class RecordedRequest {
  RecordedRequest(this.method, this.path, this.query, this.body, this.headers);
  final String method;
  final String path;
  final Map<String, dynamic> query;
  final Object? body;
  final Map<String, dynamic> headers;
}

class FakeResponse {
  const FakeResponse(this.status, this.body, {this.headers = const {}, this.raw});

  factory FakeResponse.json(Object? body, {int status = 200, Map<String, List<String>> headers = const {}}) =>
      FakeResponse(status, body, headers: headers);

  factory FakeResponse.error(int status, String code, String message) => FakeResponse(status, {
    'error': {'code': code, 'message': message, 'detail': null},
  });

  final int status;
  final Object? body;
  final Map<String, List<String>> headers;

  /// Raw text body (e.g. an SSE stream) instead of JSON.
  final String? raw;
}

typedef FakeHandler = FutureOr<FakeResponse> Function(RecordedRequest request);

/// In-memory stand-in for the QXL FastAPI backend. Routes are matched by
/// "METHOD /path" (path relative to `/api/v1`, query excluded).
class FakeApi implements HttpClientAdapter {
  final Map<String, FakeHandler> routes = {};
  final List<RecordedRequest> requests = [];

  void on(String route, FakeHandler handler) => routes[route] = handler;

  int count(String route) => requests.where((r) => '${r.method} ${r.path}' == route).length;

  @override
  Future<ResponseBody> fetch(
    RequestOptions options,
    Stream<Uint8List>? requestStream,
    Future<void>? cancelFuture,
  ) async {
    final path = options.uri.path.replaceFirst('/api/v1', '');
    Object? body = options.data;
    if (body is FormData) body = {'fields': body.fields, 'files': body.files.map((f) => f.value.filename).toList()};
    final request = RecordedRequest(options.method, path, options.uri.queryParameters, body, options.headers);
    requests.add(request);
    final handler = routes['${options.method} $path'];
    if (handler == null) {
      return ResponseBody.fromString(
        jsonEncode({
          'error': {'code': 'not_found', 'message': 'No fake for ${options.method} $path', 'detail': null},
        }),
        404,
        headers: {
          Headers.contentTypeHeader: ['application/json'],
        },
      );
    }
    final response = await handler(request);
    final text = response.raw ?? jsonEncode(response.body);
    return ResponseBody.fromString(
      text,
      response.status,
      headers: {
        Headers.contentTypeHeader: [response.raw != null ? 'text/event-stream' : 'application/json'],
        ...response.headers,
      },
    );
  }

  @override
  void close({bool force = false}) {}
}

final testConfig = AppConfig(
  apiBaseUrl: 'https://api.test/api/v1',
  websiteBaseUrl: Uri(scheme: 'https', host: 'qxldiagnostics.com'),
  environment: 'test',
);

/// Provider overrides wiring the app to [api] with in-memory storage.
List<Override> fakeOverrides(FakeApi api, {SessionStore? session, CartStorage? cart}) {
  final store = session ?? SessionStore(MemorySecureStore());
  return [
    appConfigProvider.overrideWithValue(testConfig),
    sessionStoreProvider.overrideWithValue(store),
    apiClientProvider.overrideWith((ref) => ApiClient(baseUrl: testConfig.apiBaseUrl, session: store, adapter: api)),
    cartStorageProvider.overrideWithValue(cart ?? MemoryCartStorage()),
  ];
}

// ── Fixtures shaped like real production responses ──────────────────────────

Map<String, dynamic> testJson({String id = 't-1', String name = 'Lipid Profile', int? price = 500, bool home = true}) =>
    {
      'id': id,
      'name': name,
      'slug': name.toLowerCase().replaceAll(' ', '-'),
      'category': 'Heart',
      'description': '8 Parameters',
      'price': price,
      'preparation': '10-12 hours fasting',
      'turnaround_hours': 24,
      'is_active': true,
      'home_collection_available': home,
      'image_url': null,
    };

Map<String, dynamic> packageJson({
  String id = 'p-1',
  String name = 'Quick Fit Package',
  int price = 1770,
  bool contactForPrice = false,
}) => {
  'id': id,
  'name': name,
  'slug': 'quick-fit-package',
  'tag': 'QUICK',
  'price': price,
  'old_price': 4696,
  'save_amount': 2926,
  'parameters': '13+ Parameters',
  'includes': 'FBS, HbA1c',
  'benefits': '["Quick overall health snapshot", "Check basic organ functions"]',
  'who_should_take': 'Working professionals',
  'age_group': '18+ Years',
  'gender': 'Male / Female',
  'doctor_recommended': true,
  'is_active': true,
  'home_collection_available': true,
  'sort_order': 0,
  'image_url': null,
  'category': 'Fitness',
  'show_on_home': true,
  'most_booked': false,
  'contact_for_price': contactForPrice,
  'details': {
    'fasting_hours': '8–10 Hours Fasting Required',
    'tat': 'Reports within 6 hours',
    'sample_type': 'Blood & Urine Sample',
    'detailed_breakdown': [
      {
        'categoryName': 'Diabetes (2)',
        'testsCount': 2,
        'testsList': ['Fasting Blood Sugar (FBS)', 'HbA1c'],
      },
    ],
  },
};

Map<String, dynamic> userJson({String? name = 'Asha Rao'}) => {
  'id': 'u-1',
  'email': 'asha@example.com',
  'phone': '+919876543210',
  'name': name,
  'date_of_birth': '1990-05-04',
  'role': 'patient',
  'is_email_verified': false,
  'is_phone_verified': true,
  'is_staff': false,
  'is_admin': false,
  'is_super_admin': false,
  'permissions': <String>[],
};

Map<String, dynamic> bookingJson({
  String id = '0b6c8f0e-1111-4222-8333-444455556666',
  String testName = 'Lipid Profile',
  String status = 'pending',
  String paymentStatus = 'unpaid',
  int? amountPaise = 50000,
  String? reportUrl,
  String collectionType = 'home',
}) => {
  'id': id,
  'user_id': 'u-1',
  'patient_name': 'Asha Rao',
  'patient_phone': '+919876543210',
  'patient_email': null,
  'patient_age': 35,
  'patient_gender': 'Female',
  'test_name': testName,
  'test_id': 't-1',
  'package_id': null,
  'center_id': null,
  'collection_type': collectionType,
  'collection_address': '12, 3rd Cross, Vijayanagar, Bengaluru 560040',
  'preferred_date': '2030-01-15',
  'preferred_time': '8:00 AM - 10:00 AM',
  'visit_type': 'scheduled',
  'status': status,
  'notes': null,
  'is_urgent': false,
  'is_delayed': false,
  'was_rescheduled': false,
  'report_url': reportUrl,
  'amount_paise': amountPaise,
  'payment_status': paymentStatus,
  'created_at': '2030-01-10T10:00:00Z',
  'updated_at': '2030-01-10T10:00:00Z',
};

Map<String, dynamic> slotsJson({List<Map<String, dynamic>>? slots, int max = 3}) => {
  'date': '2030-01-15',
  'max_per_slot': max,
  'booked': <String, int>{},
  'slots':
      slots ??
      [
        {
          'label': '8:00 AM - 10:00 AM',
          'start': '08:00',
          'end': '10:00',
          'booked': 0,
          'available': true,
          'unavailable_reason': null,
        },
      ],
};

const sessionSetCookie = 'qxl_session=opaque-test-token; HttpOnly; Max-Age=1209600; Path=/; SameSite=lax; Secure';

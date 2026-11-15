import 'dart:convert';

import 'package:dio/dio.dart';

import 'package:qxl_core/qxl_core.dart';

import '../models/booking.dart';
import '../models/catalog.dart';
import '../models/content.dart';
import '../models/lab_center.dart';
import '../models/records.dart';

List<T> _list<T>(Object? json, T Function(Json) fromJson) => asJsonList(json).map(fromJson).toList();

/// `/tests`, `/packages`, `/catalog/resolve`.
class CatalogRepository {
  const CatalogRepository(this._api);
  final ApiClient _api;

  Future<List<LabTest>> tests({String? query, String? category}) =>
      _api.get('/tests', query: {'q': query?.trim(), 'category': category}, decode: (j) => _list(j, LabTest.fromJson));

  Future<LabTest> test(String id) => _api.get('/tests/$id', decode: (j) => LabTest.fromJson(asJson(j)));

  Future<List<HealthPackage>> packages({bool homeOnly = false}) =>
      _api.get('/packages', query: {if (homeOnly) 'home': true}, decode: (j) => _list(j, HealthPackage.fromJson));

  Future<HealthPackage> package(String id) =>
      _api.get('/packages/$id', decode: (j) => HealthPackage.fromJson(asJson(j)));

  /// Server-side resolution of free-text names (e.g. from a prescription or
  /// speciality profile) to bookable catalog items. `null` = no match.
  Future<List<CatalogMatch?>> resolve(List<String> names) => _api.post(
    '/catalog/resolve',
    body: {'names': names},
    decode: (j) {
      final results = asJson(j)['results'];
      if (results is! List) return const [];
      return results.map((r) => r is Map ? CatalogMatch.fromJson(asJson(r)) : null).toList();
    },
  );
}

/// CMS content: banners, specialities, doctors, FAQs, reviews, blog, settings.
class ContentRepository {
  const ContentRepository(this._api);
  final ApiClient _api;

  Future<List<PromoBanner>> banners() => _api.get('/banners', decode: (j) => _list(j, PromoBanner.fromJson));

  Future<List<Speciality>> specialities() => _api.get('/specialities', decode: (j) => _list(j, Speciality.fromJson));

  Future<Speciality> speciality(String slug) =>
      _api.get('/specialities/$slug', decode: (j) => Speciality.fromJson(asJson(j)));

  Future<List<Doctor>> doctors() => _api.get('/doctors', decode: (j) => _list(j, Doctor.fromJson));

  Future<Doctor> doctor(String slug) => _api.get('/doctors/$slug', decode: (j) => Doctor.fromJson(asJson(j)));

  Future<List<Faq>> faqs() => _api.get('/faqs', decode: (j) => _list(j, Faq.fromJson));

  Future<Paged<Review>> reviews({int limit = 10, int offset = 0}) => _api.get(
    '/reviews',
    query: {'limit': limit, 'offset': offset},
    decode: (j) => Paged(items: _list(asJson(j)['items'], Review.fromJson), count: intOrNull(asJson(j)['count']) ?? 0),
  );

  Future<Paged<BlogPost>> blog({int limit = 20, int offset = 0}) => _api.get(
    '/blog',
    query: {'limit': limit, 'offset': offset},
    decode: (j) =>
        Paged(items: _list(asJson(j)['items'], BlogPost.fromJson), count: intOrNull(asJson(j)['count']) ?? 0),
  );

  Future<BlogPost> blogPost(String slug) => _api.get('/blog/$slug', decode: (j) => BlogPost.fromJson(asJson(j)));

  Future<SiteSettings> settings() => _api.get('/settings', decode: (j) => SiteSettings.fromJson(asJson(j)));

  Future<void> submitContact({
    required String name,
    required String message,
    String? email,
    String? phone,
    String? subject,
  }) => _api.post(
    '/leads/contact',
    body: {'name': name, 'message': message, 'email': ?email, 'phone': ?phone, 'subject': ?subject},
    decode: (_) {},
  );
}

class CentersRepository {
  const CentersRepository(this._api);
  final ApiClient _api;

  Future<List<LabCenter>> centers({double? lat, double? lng}) =>
      _api.get('/centers', query: {'lat': lat, 'lng': lng}, decode: (j) => _list(j, LabCenter.fromJson));

  Future<LabCenter> center(String slug) => _api.get('/centers/$slug', decode: (j) => LabCenter.fromJson(asJson(j)));
}

/// Phone + OTP login (`/auth/login/phone`, `/auth/login/otp`), session probe
/// and profile.
class AuthRepository {
  const AuthRepository(this._api);
  final ApiClient _api;

  Future<LoginChallenge> requestOtp(String phoneE164) =>
      _api.post('/auth/login/phone', body: {'phone': phoneE164}, decode: (j) => LoginChallenge.fromJson(asJson(j)));

  /// On success the server sets the session cookie (captured by the client).
  Future<LoginStatus> verifyOtp({required String challengeId, required String otp}) => _api.post(
    '/auth/login/otp',
    body: {'challenge_id': challengeId, 'otp': otp},
    decode: (j) => LoginStatus.fromJson(asJson(j)),
  );

  /// `200 null` for guests / expired sessions.
  Future<AppUser?> me() => _api.get('/auth/me', decode: (j) => j is Map ? AppUser.fromJson(asJson(j)) : null);

  Future<void> logout() => _api.post('/auth/logout', decode: (_) {});

  Future<void> updateProfile({
    String? name,
    String? email,
    DateTime? dateOfBirth,
    bool clearEmail = false,
  }) => _api.patch(
    '/users/me',
    body: {
      'name': ?name,
      if (email != null || clearEmail) 'email': email,
      if (dateOfBirth != null)
        'date_of_birth':
            '${dateOfBirth.year.toString().padLeft(4, '0')}-${dateOfBirth.month.toString().padLeft(2, '0')}-${dateOfBirth.day.toString().padLeft(2, '0')}',
    },
    decode: (_) {},
  );
}

class BookingRepository {
  const BookingRepository(this._api);
  final ApiClient _api;

  Future<SlotAvailability> slots(String isoDate) => _api.get(
    '/bookings/slot-availability',
    query: {'date': isoDate},
    decode: (j) => SlotAvailability.fromJson(asJson(j)),
  );

  Future<Booking> create(BookingRequest request) =>
      _api.post('/bookings', body: request.toJson(), decode: (j) => Booking.fromJson(asJson(j)));

  Future<Paged<Booking>> mine({int limit = 20, int offset = 0}) => _api.get(
    '/bookings/me',
    query: {'limit': limit, 'offset': offset},
    decode: (j) => Paged(items: _list(asJson(j)['items'], Booking.fromJson), count: intOrNull(asJson(j)['count']) ?? 0),
  );

  Future<Booking> booking(String id) => _api.get('/bookings/$id', decode: (j) => Booking.fromJson(asJson(j)));
}

class PaymentRepository {
  const PaymentRepository(this._api);
  final ApiClient _api;

  Future<PaymentOrder> createOrder(List<String> bookingIds, {required bool applyHomeCollectionFee}) => _api.post(
    '/payments/orders',
    body: {'booking_ids': bookingIds, 'apply_home_collection_fee': applyHomeCollectionFee},
    decode: (j) => PaymentOrder.fromJson(asJson(j)),
  );

  Future<PaymentRecord> verify({required String orderId, required String paymentId, required String signature}) =>
      _api.post(
        '/payments/verify',
        body: {'razorpay_order_id': orderId, 'razorpay_payment_id': paymentId, 'razorpay_signature': signature},
        decode: (j) => PaymentRecord.fromJson(asJson(j)),
      );
}

class PrescriptionRepository {
  const PrescriptionRepository(this._api);
  final ApiClient _api;

  Future<UploadQuota> quota() => _api.get('/prescriptions/quota', decode: (j) => UploadQuota.fromJson(asJson(j)));

  Future<Paged<Prescription>> list({int limit = 50, int offset = 0}) => _api.get(
    '/prescriptions',
    query: {'limit': limit, 'offset': offset},
    decode: (j) =>
        Paged(items: _list(asJson(j)['items'], Prescription.fromJson), count: intOrNull(asJson(j)['count']) ?? 0),
  );

  Future<Prescription> prescription(String id) =>
      _api.get('/prescriptions/$id', decode: (j) => Prescription.fromJson(asJson(j)));

  Future<Prescription> upload({
    required String filePath,
    required String filename,
    required String mimeType,
    void Function(int sent, int total)? onProgress,
    CancelToken? cancelToken,
  }) => _api.upload(
    '/prescriptions',
    filePath: filePath,
    filename: filename,
    mimeType: mimeType,
    onProgress: onProgress,
    cancelToken: cancelToken,
    decode: (j) => Prescription.fromJson(asJson(j)),
  );

  /// Signed, short-lived download URL for the user's own file.
  Future<StoredFile> file(String id) => _api.get('/files/$id', decode: (j) => StoredFile.fromJson(asJson(j)));
}

class ChatRepository {
  const ChatRepository(this._api);
  final ApiClient _api;

  Future<ChatQuota> quota() => _api.get('/chat/rate-limit', decode: (j) => ChatQuota.fromJson(asJson(j)));

  Future<List<Conversation>> conversations() =>
      _api.get('/chat/conversations', decode: (j) => _list(j, Conversation.fromJson));

  Future<List<ChatMessage>> messages(String conversationId) => _api.get(
    '/chat/conversations/$conversationId',
    decode: (j) => _list(asJson(j)['messages'], ChatMessage.fromJson),
  );

  Stream<ChatEvent> ask(String question, {String? conversationId, CancelToken? cancelToken}) async* {
    final payloads = _api.postEventStream(
      '/chat/stream',
      body: {'question': question, 'conversation_id': ?conversationId},
      cancelToken: cancelToken,
    );
    await for (final payload in payloads) {
      final event = decodeChatEvent(payload);
      if (event != null) yield event;
      if (event is ChatDone) return;
    }
  }
}

/// Maps one SSE `data:` payload from `/chat/stream` to a [ChatEvent].
ChatEvent? decodeChatEvent(String payload) {
  if (payload.trim() == '[DONE]') return const ChatDone();
  Object? json;
  try {
    json = jsonDecode(payload);
  } catch (_) {
    return null;
  }
  if (json is! Map) return null;
  if (json['delta'] is String) return ChatDelta(json['delta'] as String);
  if (json['conversation_id'] is String) return ChatConversationStarted(json['conversation_id'] as String);
  if (json['payment_order'] is Map) {
    final order = PaymentOrder.fromJson(asJson(json['payment_order']));
    return order.isUsable ? ChatPaymentOrder(order) : null;
  }
  if (json['error'] != null) return ChatFailed(json['error'].toString());
  return null;
}

import 'package:dio/dio.dart';
import 'package:qxl_core/qxl_core.dart';

import '../models/booking.dart';
import '../models/collect.dart';

/// Home collection, family profiles, addresses, reports and inbox
/// (`qxl-backend/docs/COLLECT.md`).
class CollectRepository {
  const CollectRepository(this._api);
  final ApiClient _api;

  // Profiles
  Future<List<PatientProfile>> profiles() =>
      _api.get('/me/profiles', decode: (j) => asJsonList(j).map(PatientProfile.fromJson).toList());

  Future<PatientProfile> saveProfile({
    String? id,
    required String fullName,
    required DateTime dateOfBirth,
    required String relation,
    String? gender,
  }) {
    final body = {
      'full_name': fullName.trim(),
      'date_of_birth': isoDate(dateOfBirth),
      'relation': relation,
      'gender': ?gender,
    };
    return id == null
        ? _api.post('/me/profiles', body: body, decode: (j) => PatientProfile.fromJson(asJson(j)))
        : _api.patch('/me/profiles/$id', body: body, decode: (j) => PatientProfile.fromJson(asJson(j)));
  }

  Future<void> archiveProfile(String id) => _api.delete('/me/profiles/$id');

  // Addresses
  Future<List<SavedAddress>> addresses() =>
      _api.get('/me/addresses', decode: (j) => asJsonList(j).map(SavedAddress.fromJson).toList());

  Future<SavedAddress> saveAddress(String? id, Json body) => id == null
      ? _api.post('/me/addresses', body: body, decode: (j) => SavedAddress.fromJson(asJson(j)))
      : _api.patch('/me/addresses/$id', body: body, decode: (j) => SavedAddress.fromJson(asJson(j)));

  Future<void> deleteAddress(String id) => _api.delete('/me/addresses/$id');

  // Serviceability & slots
  Future<ServiceCheck> checkPincode(String pincode) =>
      _api.get('/service-areas/check', query: {'pincode': pincode}, decode: (j) => ServiceCheck.fromJson(asJson(j)));

  Future<List<VisitSlot>> slots(DateTime day, String pincode) => _api.get(
    '/home-collection/slots',
    query: {'date': isoDate(day), 'pincode': pincode},
    decode: (j) => asJsonList(asJson(j)['slots']).map(VisitSlot.fromJson).toList(),
  );

  // Visits
  Future<HomeVisit> createVisit({required String idempotencyKey, required Json body}) => _api.post(
    '/home-visits',
    body: body,
    headers: {'Idempotency-Key': idempotencyKey},
    decode: (j) => HomeVisit.fromJson(asJson(j)),
  );

  Future<List<HomeVisit>> visits() =>
      _api.get('/home-visits', decode: (j) => asJsonList(asJson(j)['items']).map(HomeVisit.fromJson).toList());

  Future<HomeVisit> visit(String id) => _api.get('/home-visits/$id', decode: (j) => HomeVisit.fromJson(asJson(j)));

  Future<Tracking> tracking(String id, {CancelToken? cancelToken}) =>
      _api.get('/home-visits/$id/tracking', cancelToken: cancelToken, decode: (j) => Tracking.fromJson(asJson(j)));

  Future<HomeVisit> cancel(String id, String? reason) =>
      _api.post('/home-visits/$id/cancel', body: {'reason': reason}, decode: (j) => HomeVisit.fromJson(asJson(j)));

  Future<HomeVisit> reschedule(String id, DateTime day, String label) => _api.post(
    '/home-visits/$id/reschedule',
    body: {'slot_date': isoDate(day), 'slot_label': label},
    decode: (j) => HomeVisit.fromJson(asJson(j)),
  );

  /// Razorpay order for the exact visit total.
  Future<PaymentOrder> payVisit(String id) =>
      _api.post('/home-visits/$id/pay', decode: (j) => PaymentOrder.fromJson(asJson(j)));

  // Reports
  Future<List<ReportSummary>> reports() =>
      _api.get('/me/reports', decode: (j) => asJsonList(j).map(ReportSummary.fromJson).toList());

  /// Short-lived signed link for a released report.
  Future<Uri> reportLink(String id) =>
      _api.post('/me/reports/$id/access', decode: (j) => Uri.parse(asJson(j)['url'] as String));

  // Inbox & devices
  Future<({int unread, List<InboxItem> items})> inbox() => _api.get(
    '/me/inbox',
    decode: (j) {
      final json = asJson(j);
      return (
        unread: intOrNull(json['unread']) ?? 0,
        items: asJsonList(json['items']).map(InboxItem.fromJson).toList(),
      );
    },
  );

  Future<void> markInboxRead([List<String>? ids]) => _api.post('/me/inbox/read', body: {'ids': ?ids}, decode: (_) {});

  Future<void> registerDevice(String token, String platform) =>
      _api.post('/me/devices', body: {'token': token, 'platform': platform, 'app': 'patient'}, decode: (_) {});
}

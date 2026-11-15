import 'package:qxl_core/qxl_core.dart';

import 'models.dart';
import 'offline_store.dart';

/// Reads for the Collector app (with offline fallback) and the staff login.
/// Writes go through [OfflineQueue] so they survive poor connectivity.
class CollectorRepository {
  CollectorRepository(this._api, this._cache);

  final ApiClient _api;
  final JobCache _cache;

  // ── Staff sign-in: identifier + password, then OTP ────────────────────────
  Future<LoginChallenge> login(String identifier, String password) => _api.post(
    '/auth/login',
    body: {'identifier': identifier.trim(), 'password': password},
    decode: (j) => LoginChallenge.fromJson(asJson(j)),
  );

  Future<LoginStatus> verifyOtp(String challengeId, String otp) => _api.post(
    '/auth/login/otp',
    body: {'challenge_id': challengeId, 'otp': otp},
    decode: (j) => LoginStatus.fromJson(asJson(j)),
  );

  Future<AppUser?> me() => _api.get('/auth/me', decode: (j) => j is Map ? AppUser.fromJson(asJson(j)) : null);

  Future<void> logout() => _api.post('/auth/logout', decode: (_) {});

  Future<CollectorMe> profile() => _api.get('/collector/me', decode: (j) => CollectorMe.fromJson(asJson(j)));

  Future<bool> setDuty(bool onDuty) =>
      _api.post('/collector/me/duty', body: {'on_duty': onDuty}, decode: (j) => boolOr(asJson(j)['on_duty'], onDuty));

  Future<void> registerDevice(String token, String platform) =>
      _api.post('/me/devices', body: {'token': token, 'platform': platform, 'app': 'collector'}, decode: (_) {});

  // ── Jobs (cached for offline) ─────────────────────────────────────────────
  /// Returns `(jobs, fromCache)`.
  Future<(List<JobSummary>, bool)> jobs(String scope) async {
    try {
      final raw = await _api.get('/collector/jobs', query: {'scope': scope}, decode: asJsonList);
      await _cache.saveJobs(scope, raw);
      return (raw.map(JobSummary.fromJson).toList(), false);
    } on ApiException catch (e) {
      if (e.kind != ApiErrorKind.offline && e.kind != ApiErrorKind.timeout) rethrow;
      final cached = await _cache.jobs(scope);
      if (cached.isEmpty) rethrow;
      return (cached.map(JobSummary.fromJson).toList(), true);
    }
  }

  Future<(JobDetail, bool)> job(String id) async {
    try {
      final raw = await _api.get('/collector/jobs/$id', decode: asJson);
      await _cache.saveJob(raw);
      return (JobDetail(raw), false);
    } on ApiException catch (e) {
      if (e.kind != ApiErrorKind.offline && e.kind != ApiErrorKind.timeout) rethrow;
      final cached = await _cache.job(id);
      if (cached == null) rethrow;
      return (JobDetail(cached), true);
    }
  }

  /// Prefetch every open job's details so the day can be worked offline.
  Future<void> prefetch(List<JobSummary> jobs) async {
    for (final j in jobs.where((j) => j.isOpen)) {
      try {
        await job(j.id);
      } catch (_) {}
    }
  }

  Future<void> cacheJob(JobDetail job) => _cache.saveJob(job.json);

  // ── Custody ───────────────────────────────────────────────────────────────
  Future<List<CollectedSpecimen>> mySpecimens() =>
      _api.get('/collector/specimens', decode: (j) => asJsonList(j).map(CollectedSpecimen.fromJson).toList());

  Future<List<Manifest>> courierManifests() =>
      _api.get('/courier/manifests', decode: (j) => asJsonList(j).map(Manifest.fromJson).toList());

  Future<List<LabCentre>> centres() =>
      _api.get('/collector/centers', decode: (j) => asJsonList(j).map(LabCentre.fromJson).toList());
}

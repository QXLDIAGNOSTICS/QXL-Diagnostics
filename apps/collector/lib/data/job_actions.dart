import 'package:qxl_core/qxl_core.dart';

import 'models.dart';
import 'offline_store.dart';
import 'repository.dart';

final barcodePattern = RegExp(r'^[A-Za-z0-9\-]{6,40}$');

/// Result of a field action: the job as it now stands, and whether the
/// action reached the server or is waiting offline.
class ActionOutcome {
  const ActionOutcome(this.job, this.result);
  final JobDetail job;
  final SubmitResult result;
  bool get queued => result == SubmitResult.queued;
}

/// Collection workflow. Every rule the server enforces is also checked here
/// first, so working offline can never skip a safety step; the server
/// re-validates each action when it syncs.
class JobActions {
  JobActions(this._queue, this._repo);

  final OfflineQueue _queue;
  final CollectorRepository _repo;

  Future<ActionOutcome> _run(
    JobDetail job,
    String action,
    Json body,
    String label,
    Json Function(JobDetail) optimistic,
  ) async {
    final sent = await _queue.submit(
      path: '/collector/jobs/${job.id}/$action',
      body: body,
      label: label,
      jobId: job.id,
    );
    final JobDetail updated;
    final response = sent.body is Map ? asJson(sent.body) : null;
    // Only trust a response that is this job; anything else (or a queued
    // action) falls back to the optimistic local change.
    if (sent.result == SubmitResult.synced &&
        response != null &&
        response['id'] == job.id &&
        response['slot_date'] is String) {
      updated = JobDetail(response);
    } else {
      updated = job.copyWith(optimistic(job));
    }
    await _repo.cacheJob(updated);
    return ActionOutcome(updated, sent.result);
  }

  Future<ActionOutcome> acknowledge(JobDetail job) =>
      _run(job, 'acknowledge', const {}, 'Acknowledge ${job.reference}', (_) => {'status': 'acknowledged'});

  Future<ActionOutcome> startJourney(JobDetail job, {double? lat, double? lng}) =>
      _run(job, 'start', {'lat': lat, 'lng': lng}, 'Start journey ${job.reference}', (_) => {'status': 'en_route'});

  Future<ActionOutcome> arrive(JobDetail job, {double? lat, double? lng}) =>
      _run(job, 'arrive', {'lat': lat, 'lng': lng}, 'Arrived ${job.reference}', (_) => {'status': 'arrived'});

  /// Name confirmed by the patient + date of birth they state (+ optional
  /// visit code). Checked locally against the booking before sending.
  Future<ActionOutcome> verifyIdentity(
    JobDetail job, {
    required bool nameConfirmed,
    required DateTime statedDob,
    String? visitCode,
  }) async {
    if (job.status != 'arrived') throw _rule('Mark arrival before verifying the patient.');
    final dob = job.patientDob;
    final localOk = nameConfirmed && dob != null && isoDate(dob) == isoDate(statedDob);
    final body = {
      'name_confirmed': nameConfirmed,
      'stated_dob': isoDate(statedDob),
      if (visitCode != null && visitCode.isNotEmpty) 'visit_code': visitCode,
    };
    if (!localOk) {
      // Still recorded server-side for the audit trail (when reachable).
      try {
        await _queue.submit(
          path: '/collector/jobs/${job.id}/verify-identity',
          body: body,
          label: 'Identity check',
          jobId: job.id,
        );
      } on ApiException {
        // Expected rejection.
      }
      throw _rule(
        nameConfirmed
            ? 'Date of birth doesn’t match the booking. Do not collect. Re-check with the patient or call dispatch.'
            : 'The patient’s name must match the booking. Do not collect.',
      );
    }
    return _run(job, 'verify-identity', body, 'Identity verified ${job.reference}', (_) => {'identity_verified': true});
  }

  Future<ActionOutcome> addSpecimen(
    JobDetail job, {
    required String barcode,
    required String containerType,
    required List<String> bookingIds,
    String? sampleType,
    double? volumeMl,
    String? observations,
    String? recollectOf,
  }) {
    final code = barcode.trim().toUpperCase();
    if (job.status != 'arrived') throw _rule('Mark arrival before collecting.');
    if (!job.identityVerified) throw _rule('Verify the patient’s identity before collecting.');
    if (!barcodePattern.hasMatch(code)) throw _rule('That doesn’t look like a QXL specimen label. Scan again.');
    if (job.specimens.any((s) => s.barcode == code)) throw _rule('This label is already used on this visit.');
    if (bookingIds.isEmpty) throw _rule('Select the tests this tube is for.');
    final now = DateTime.now().toUtc();
    final body = {
      'barcode': code,
      'container_type': containerType,
      'sample_type': ?sampleType,
      'booking_ids': bookingIds,
      'collected_at': now.toIso8601String(),
      'volume_ml': ?volumeMl,
      'observations': ?observations,
      'recollect_of_barcode': ?recollectOf,
    };
    return _run(job, 'specimens', body, 'Specimen $code', (j) {
      final list = [...asJsonList(j.json['specimens'])];
      list.add({
        'barcode': code,
        'container_type': containerType,
        'sample_type': sampleType,
        'booking_ids': bookingIds,
        'collected_at': now.toIso8601String(),
        'status': 'collected',
        '_pending': true,
      });
      return {'specimens': list};
    });
  }

  Future<ActionOutcome> voidSpecimen(JobDetail job, String barcode, String reason) {
    if (job.status != 'arrived') throw _rule('Labels can only be voided before closing the job.');
    return _run(job, 'specimens/$barcode/void', {'reason': reason}, 'Void label $barcode', (j) {
      return {'specimens': asJsonList(j.json['specimens']).where((s) => s['barcode'] != barcode).toList()};
    });
  }

  Future<ActionOutcome> complete(
    JobDetail job, {
    required String outcome,
    String? reason,
    Map<String, bool>? checklist,
    String? paymentMode,
    String? paymentReference,
  }) {
    if (outcome == 'unsuccessful') {
      if ((reason ?? '').trim().isEmpty) throw _rule('Give a reason for the unsuccessful visit.');
      if (job.specimens.isNotEmpty) throw _rule('Void the scanned labels first, or record a partial collection.');
    } else {
      if (job.status != 'arrived') throw _rule('Mark arrival first.');
      if (!job.identityVerified) throw _rule('Patient identity was not verified. Collection can’t be completed.');
      if (job.specimens.isEmpty) throw _rule('Scan at least one specimen label.');
      if (outcome == 'collected' && job.uncovered.isNotEmpty) {
        throw _rule('Some tests have no specimen yet: ${job.uncovered.map((r) => r.name).join(', ')}');
      }
      if (outcome == 'partially_collected' && (reason ?? '').trim().isEmpty) throw _rule('Explain why it is partial.');
      if (job.checklistKeys.any((k) => checklist?[k] != true)) throw _rule('Complete the aftercare checklist.');
      if (job.amountDuePaise > 0) {
        if (paymentMode != 'cash' && paymentMode != 'upi') throw _rule('Record how the patient paid.');
        if (paymentMode == 'upi' && (paymentReference ?? '').trim().isEmpty) throw _rule('Enter the UPI reference.');
      }
    }
    final body = {
      'outcome': outcome,
      'reason': ?reason,
      'checklist': ?checklist,
      if (outcome != 'unsuccessful' && job.amountDuePaise > 0)
        'payment': {'mode': paymentMode, 'amount_paise': job.amountDuePaise, 'reference': ?paymentReference},
    };
    return _run(job, 'complete', body, 'Close ${job.reference}', (_) => {'status': outcome, 'outcome_reason': reason});
  }

  Future<ActionOutcome> reportException(JobDetail job, {required String type, String? note, int? etaMinutes}) => _run(
    job,
    'exception',
    {'type': type, 'note': ?note, 'eta_minutes': ?etaMinutes},
    'Report ${type.replaceAll('_', ' ')}',
    (_) => type == 'delay' ? {'is_delayed': true} : const {},
  );

  static ApiException _rule(String message) => ApiException(kind: ApiErrorKind.validation, message: message);
}

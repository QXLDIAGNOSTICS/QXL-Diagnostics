import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:qxl_collector/data/job_actions.dart';
import 'package:qxl_collector/data/models.dart';
import 'package:qxl_collector/data/offline_store.dart';
import 'package:qxl_collector/data/repository.dart';
import 'package:qxl_core/qxl_core.dart';

/// Minimal programmable backend for collector tests.
class FakeBackend implements HttpClientAdapter {
  bool offline = false;
  final requests = <RequestOptions>[];
  final Map<String, (int, Object?) Function(RequestOptions)> routes = {};

  @override
  Future<ResponseBody> fetch(
    RequestOptions options,
    Stream<Uint8List>? requestStream,
    Future<void>? cancelFuture,
  ) async {
    if (offline) throw DioException.connectionError(requestOptions: options, reason: 'offline');
    requests.add(options);
    final path = options.uri.path.replaceFirst('/api/v1', '');
    final handler = routes['${options.method} $path'];
    final (status, body) = handler == null
        ? (
            404,
            {
              'error': {'code': 'not_found', 'message': 'no route'},
            },
          )
        : handler(options);
    return ResponseBody.fromString(
      jsonEncode(body),
      status,
      headers: {
        Headers.contentTypeHeader: ['application/json'],
      },
    );
  }

  @override
  void close({bool force = false}) {}
}

Json jobJson({String status = 'arrived', bool identity = false, List<Json> specimens = const []}) => {
  'id': 'j-1',
  'reference': 'QXL-JOB-ABC123',
  'kind': 'initial',
  'status': status,
  'visit_reference': 'QXL-HC-1',
  'visit_status': 'confirmed',
  'slot_date': '2030-01-15',
  'slot_label': '8:00 AM - 10:00 AM',
  'patient': {
    'name': 'Asha Rao',
    'date_of_birth': '1990-05-04',
    'gender': 'female',
    'phone': '+919876543210',
    'age': 39,
  },
  'address': {'line': '12, 3rd Cross, Vijayanagar', 'lat': 12.97, 'lng': 77.53},
  'requirements': [
    {'booking_id': 'b-1', 'name': 'CBC', 'container_type': 'EDTA'},
    {'booking_id': 'b-2', 'name': 'Lipid Profile', 'container_type': 'SST', 'fasting_required': true},
  ],
  'recollect': <Object>[],
  'payment_mode': 'pay_on_visit',
  'amount_due_paise': 65000,
  'identity_verified': identity,
  'specimens': specimens,
  'checklist_keys': ['labels_verified_with_patient', 'patient_feeling_well'],
};

void main() {
  late FakeBackend backend;
  late ApiClient api;
  late OfflineQueue queue;
  late JobActions actions;

  setUp(() {
    backend = FakeBackend();
    api = ApiClient(baseUrl: 'https://api.test/api/v1', session: SessionStore(MemorySecureStore()), adapter: backend);
    final store = MemoryEncryptedStore();
    queue = OfflineQueue(api, store);
    actions = JobActions(queue, CollectorRepository(api, JobCache(store)));
  });

  group('FileEncryptedStore', () {
    test('round-trips JSON and never stores it in clear text', () async {
      final dir = await Directory.systemTemp.createTemp('qxl_store');
      addTearDown(() => dir.delete(recursive: true));
      final store = FileEncryptedStore(MemorySecureStore(), directory: dir);
      await store.write('job_1', {'patient': 'Asha Rao', 'dob': '1990-05-04'});
      expect(await store.read('job_1'), {'patient': 'Asha Rao', 'dob': '1990-05-04'});
      final raw = File('${dir.path}/job_1.bin').readAsBytesSync();
      expect(utf8.decode(raw, allowMalformed: true).contains('Asha'), isFalse);
    });

    test('wipe removes data and the key', () async {
      final dir = await Directory.systemTemp.createTemp('qxl_store');
      final keys = MemorySecureStore();
      final store = FileEncryptedStore(keys, directory: dir);
      await store.write('queue', [1, 2]);
      await store.wipe();
      expect(dir.existsSync(), isFalse);
      expect(keys.values, isEmpty);
    });
  });

  group('OfflineQueue', () {
    test('queues while offline and replays later with the same idempotency key', () async {
      backend.routes['POST /collector/jobs/j-1/acknowledge'] = (_) => (200, jobJson(status: 'acknowledged'));
      backend.offline = true;
      final job = JobDetail(jobJson(status: 'assigned'));
      final out = await actions.acknowledge(job);
      expect(out.queued, isTrue);
      expect(out.job.status, 'acknowledged', reason: 'optimistic local state');
      expect(queue.pendingCount, 1);
      final key = queue.ops.single.id;

      backend.offline = false;
      await queue.flush();
      expect(queue.pendingCount, 0);
      expect(backend.requests.single.headers['Idempotency-Key'], key);
    });

    test('a rejection during background sync is kept for review and blocks that job', () async {
      backend.offline = true;
      final job = JobDetail(jobJson(identity: true));
      await actions.addSpecimen(job, barcode: 'QXL12345', containerType: 'EDTA', bookingIds: ['b-1']);
      await actions.reportException(job, type: 'delay', note: 'traffic');
      expect(queue.pendingCount, 2);

      backend.offline = false;
      backend.routes['POST /collector/jobs/j-1/specimens'] = (_) => (
        409,
        {
          'error': {'code': 'conflict', 'message': 'This label is already linked to another specimen.'},
        },
      );
      backend.routes['POST /collector/jobs/j-1/exception'] = (_) => (200, jobJson());
      await queue.flush();

      expect(queue.attentionCount, 1);
      expect(queue.ops.first.error, contains('already linked'));
      // The later action for the same job waits behind the rejected one.
      expect(queue.pendingCount, 2);
      expect(backend.requests.where((r) => r.path.endsWith('/exception')), isEmpty);
    });

    test('an immediate rejection is returned to the caller, not queued', () async {
      backend.routes['POST /collector/jobs/j-1/arrive'] = (_) => (
        409,
        {
          'error': {'code': 'conflict', 'message': 'This visit was cancelled.'},
        },
      );
      await expectLater(actions.arrive(JobDetail(jobJson(status: 'en_route'))), throwsA(isA<ApiException>()));
      expect(queue.pendingCount, 0);
    });
  });

  group('JobActions safety rules (also enforced offline)', () {
    test('collection is blocked until identity is verified', () {
      expect(
        () =>
            actions.addSpecimen(JobDetail(jobJson()), barcode: 'QXL12345', containerType: 'EDTA', bookingIds: ['b-1']),
        throwsA(isA<ApiException>().having((e) => e.message, 'message', contains('identity'))),
      );
    });

    test('a wrong date of birth fails the identity check', () async {
      backend.offline = true;
      await expectLater(
        actions.verifyIdentity(JobDetail(jobJson()), nameConfirmed: true, statedDob: DateTime(1991, 5, 4)),
        throwsA(isA<ApiException>().having((e) => e.message, 'message', contains('Do not collect'))),
      );
      final ok = await actions.verifyIdentity(
        JobDetail(jobJson()),
        nameConfirmed: true,
        statedDob: DateTime(1990, 5, 4),
      );
      expect(ok.job.identityVerified, isTrue);
    });

    test('a response that is not the job falls back to the optimistic change', () async {
      backend.routes['POST /collector/jobs/j-1/verify-identity'] = (_) => (200, {'verified': true});
      final out = await actions.verifyIdentity(
        JobDetail(jobJson()),
        nameConfirmed: true,
        statedDob: DateTime(1990, 5, 4),
      );
      expect(out.job.id, 'j-1');
      expect(out.job.identityVerified, isTrue);
      expect(out.job.slotLabel, '8:00 AM - 10:00 AM');
    });

    test('labels must be valid and unique on the visit', () {
      final job = JobDetail(
        jobJson(
          identity: true,
          specimens: [
            {
              'barcode': 'QXL12345',
              'container_type': 'EDTA',
              'booking_ids': ['b-1'],
              'status': 'collected',
            },
          ],
        ),
      );
      expect(
        () => actions.addSpecimen(job, barcode: 'bad', containerType: 'EDTA', bookingIds: ['b-1']),
        throwsA(isA<ApiException>()),
      );
      expect(
        () => actions.addSpecimen(job, barcode: 'qxl12345', containerType: 'EDTA', bookingIds: ['b-2']),
        throwsA(isA<ApiException>().having((e) => e.message, 'message', contains('already used'))),
      );
    });

    test('closing needs every test covered, the checklist and the payment', () {
      final partial = JobDetail(
        jobJson(
          identity: true,
          specimens: [
            {
              'barcode': 'QXL12345',
              'container_type': 'EDTA',
              'booking_ids': ['b-1'],
              'status': 'collected',
            },
          ],
        ),
      );
      const checklist = {'labels_verified_with_patient': true, 'patient_feeling_well': true};
      expect(
        () => actions.complete(partial, outcome: 'collected', checklist: checklist, paymentMode: 'cash'),
        throwsA(isA<ApiException>().having((e) => e.message, 'message', contains('Lipid Profile'))),
      );
      final full = JobDetail(
        jobJson(
          identity: true,
          specimens: [
            {
              'barcode': 'QXL12345',
              'container_type': 'EDTA',
              'booking_ids': ['b-1', 'b-2'],
              'status': 'collected',
            },
          ],
        ),
      );
      expect(
        () => actions.complete(
          full,
          outcome: 'collected',
          checklist: const {'labels_verified_with_patient': true},
          paymentMode: 'cash',
        ),
        throwsA(isA<ApiException>().having((e) => e.message, 'message', contains('checklist'))),
      );
      expect(
        () => actions.complete(full, outcome: 'collected', checklist: checklist, paymentMode: 'upi'),
        throwsA(isA<ApiException>().having((e) => e.message, 'message', contains('UPI reference'))),
      );
    });

    test('a successful close sends the exact amount due', () async {
      backend.routes['POST /collector/jobs/j-1/complete'] = (o) => (200, jobJson(status: 'collected'));
      final full = JobDetail(
        jobJson(
          identity: true,
          specimens: [
            {
              'barcode': 'QXL12345',
              'container_type': 'EDTA',
              'booking_ids': ['b-1', 'b-2'],
              'status': 'collected',
            },
          ],
        ),
      );
      final out = await actions.complete(
        full,
        outcome: 'collected',
        checklist: const {'labels_verified_with_patient': true, 'patient_feeling_well': true},
        paymentMode: 'cash',
      );
      expect(out.job.status, 'collected');
      final body = backend.requests.single.data as Map;
      expect((body['payment'] as Map)['amount_paise'], 65000);
    });
  });
}

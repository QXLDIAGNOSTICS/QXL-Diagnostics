import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math';

import 'package:cryptography/cryptography.dart';
import 'package:flutter/foundation.dart';
import 'package:path_provider/path_provider.dart';
import 'package:qxl_core/qxl_core.dart';

/// Small encrypted key→JSON store for offline jobs and the action queue.
///
/// AES-256-GCM; the key lives in the Android Keystore / iOS Keychain via
/// [SecureKeyValueStore]. Patient data never sits on disk in plain text and
/// is wiped on sign-out.
abstract interface class EncryptedStore {
  Future<Object?> read(String name);
  Future<void> write(String name, Object? value);
  Future<void> wipe();
}

class FileEncryptedStore implements EncryptedStore {
  FileEncryptedStore(this._keys, {Directory? directory})
    : _directory = directory; // ignore: prefer_initializing_formals

  static const _keyName = 'qxl.collector.store_key';
  final SecureKeyValueStore _keys;
  final _algorithm = AesGcm.with256bits();
  Directory? _directory;
  SecretKey? _key;

  Future<Directory> _dir() async {
    final dir = _directory ??= Directory('${(await getApplicationSupportDirectory()).path}/qxl_offline');
    if (!dir.existsSync()) dir.createSync(recursive: true);
    return dir;
  }

  Future<SecretKey> _secret() async {
    if (_key != null) return _key!;
    var encoded = await _keys.read(_keyName);
    if (encoded == null) {
      final random = Random.secure();
      encoded = base64Encode(List<int>.generate(32, (_) => random.nextInt(256)));
      await _keys.write(_keyName, encoded);
    }
    return _key = SecretKey(base64Decode(encoded));
  }

  File _file(Directory dir, String name) => File('${dir.path}/${name.replaceAll(RegExp(r'[^a-zA-Z0-9_.-]'), '_')}.bin');

  @override
  Future<Object?> read(String name) async {
    final file = _file(await _dir(), name);
    if (!file.existsSync()) return null;
    try {
      final box = SecretBox.fromConcatenation(
        await file.readAsBytes(),
        nonceLength: _algorithm.nonceLength,
        macLength: _algorithm.macAlgorithm.macLength,
      );
      final clear = await _algorithm.decrypt(box, secretKey: await _secret());
      return jsonDecode(utf8.decode(clear));
    } catch (e) {
      debugPrint('Offline store: unreadable $name ($e)');
      return null;
    }
  }

  @override
  Future<void> write(String name, Object? value) async {
    final file = _file(await _dir(), name);
    if (value == null) {
      if (file.existsSync()) await file.delete();
      return;
    }
    final box = await _algorithm.encrypt(utf8.encode(jsonEncode(value)), secretKey: await _secret());
    final tmp = File('${file.path}.tmp');
    await tmp.writeAsBytes(box.concatenation(), flush: true);
    await tmp.rename(file.path);
  }

  @override
  Future<void> wipe() async {
    final dir = await _dir();
    if (dir.existsSync()) await dir.delete(recursive: true);
    _directory = null;
    await _keys.delete(_keyName);
    _key = null;
  }
}

class MemoryEncryptedStore implements EncryptedStore {
  final Map<String, Object?> values = {};

  @override
  Future<Object?> read(String name) async => values[name] == null ? null : jsonDecode(jsonEncode(values[name]));

  @override
  Future<void> write(String name, Object? value) async => value == null ? values.remove(name) : values[name] = value;

  @override
  Future<void> wipe() async => values.clear();
}

String newOpId() {
  final r = Random.secure();
  return List.generate(32, (_) => r.nextInt(16).toRadixString(16)).join();
}

/// A collector action waiting to reach the server. [id] is sent as the
/// Idempotency-Key, so replays never repeat side effects.
@immutable
class PendingOp {
  const PendingOp({
    required this.id,
    required this.path,
    required this.body,
    required this.label,
    required this.createdAt,
    this.jobId,
    this.error,
  });

  factory PendingOp.fromJson(Json j) => PendingOp(
    id: j['id'] as String,
    path: j['path'] as String,
    body: j['body'] is Map ? asJson(j['body']) : const {},
    label: strOr(j['label'], ''),
    createdAt: DateTime.parse(j['created_at'] as String),
    jobId: str(j['job_id']),
    error: str(j['error']),
  );

  final String id;
  final String path;
  final Json body;
  final String label;
  final DateTime createdAt;
  final String? jobId;

  /// Set when the server rejected it during a background sync — the
  /// collector must review it; it is never silently dropped.
  final String? error;

  bool get needsAttention => error != null;

  Json toJson() => {
    'id': id,
    'path': path,
    'body': body,
    'label': label,
    'created_at': createdAt.toIso8601String(),
    'job_id': jobId,
    'error': error,
  };

  PendingOp withError(String? message) =>
      PendingOp(id: id, path: path, body: body, label: label, createdAt: createdAt, jobId: jobId, error: message);
}

enum SubmitResult { synced, queued }

/// Outcome of submitting an action.
class Submitted {
  const Submitted(this.result, [this.body]);
  final SubmitResult result;
  final Object? body;
}

/// FIFO queue of collector actions with offline persistence.
class OfflineQueue extends ChangeNotifier {
  OfflineQueue(this._api, this._store);

  static const _name = 'queue';
  final ApiClient _api;
  final EncryptedStore _store;
  List<PendingOp> _ops = [];
  bool _loaded = false;
  bool _online = true;

  List<PendingOp> get ops => List.unmodifiable(_ops);
  int get pendingCount => _ops.length;
  int get attentionCount => _ops.where((o) => o.needsAttention).length;
  bool get online => _online;
  bool hasPendingFor(String jobId) => _ops.any((o) => o.jobId == jobId);

  Future<void> load() async {
    if (_loaded) return;
    final raw = await _store.read(_name);
    _ops = raw is List ? raw.whereType<Map<Object?, Object?>>().map((m) => PendingOp.fromJson(asJson(m))).toList() : [];
    _loaded = true;
    notifyListeners();
  }

  Future<void> _save() async {
    await _store.write(_name, [for (final o in _ops) o.toJson()]);
    notifyListeners();
  }

  /// Sends now when possible. Offline / server errors keep it queued
  /// ([SubmitResult.queued]); a rejection (validation, conflict…) is thrown
  /// straight back to the caller and not kept.
  Future<Submitted> submit({required String path, required Json body, required String label, String? jobId}) async {
    await load();
    final op = PendingOp(id: newOpId(), path: path, body: body, label: label, createdAt: DateTime.now(), jobId: jobId);
    // Keep order: wait behind anything still pending, and behind a rejected
    // action of the same job (the collector must resolve that first).
    final mustWait = _ops.any((o) => !o.needsAttention || (jobId != null && o.jobId == jobId));
    if (mustWait) {
      _ops.add(op);
      await _save();
      unawaited(flush());
      return const Submitted(SubmitResult.queued);
    }
    try {
      final response = await _send(op);
      _setOnline(true);
      return Submitted(SubmitResult.synced, response);
    } on ApiException catch (e) {
      if (_isTransient(e)) {
        _setOnline(false);
        _ops.add(op);
        await _save();
        return const Submitted(SubmitResult.queued);
      }
      rethrow;
    }
  }

  Future<Object?> _send(PendingOp op) async {
    final r = await _api.postRaw(op.path, body: op.body, headers: {'Idempotency-Key': op.id});
    return r.body;
  }

  static bool _isTransient(ApiException e) => switch (e.kind) {
    ApiErrorKind.offline || ApiErrorKind.timeout || ApiErrorKind.server || ApiErrorKind.rateLimited => true,
    _ => false,
  };

  void _setOnline(bool value) {
    if (_online == value) return;
    _online = value;
    notifyListeners();
  }

  Future<void>? _running;
  bool _again = false;

  /// Replays queued actions in order. Stops at the first transient failure;
  /// marks rejected ones for review and skips later actions of that job.
  /// A request made while a pass is running triggers one more pass, so a
  /// reconnect is never missed.
  Future<void> flush() async {
    await load();
    if (_running != null) {
      _again = true;
      return _running;
    }
    final run = _flushLoop();
    _running = run;
    try {
      await run;
    } finally {
      _running = null;
    }
  }

  Future<void> _flushLoop() async {
    do {
      _again = false;
      await _flushOnce();
    } while (_again);
  }

  Future<void> _flushOnce() async {
    final blockedJobs = <String>{};
    for (final op in List.of(_ops)) {
      if (op.needsAttention) {
        if (op.jobId != null) blockedJobs.add(op.jobId!);
        continue;
      }
      if (op.jobId != null && blockedJobs.contains(op.jobId)) continue;
      try {
        await _send(op);
        _ops.removeWhere((o) => o.id == op.id);
        _setOnline(true);
        await _save();
      } on ApiException catch (e) {
        if (_isTransient(e)) {
          _setOnline(false);
          return;
        }
        if (e.kind == ApiErrorKind.unauthorized) return;
        final index = _ops.indexWhere((o) => o.id == op.id);
        if (index >= 0) _ops[index] = op.withError(e.message);
        if (op.jobId != null) blockedJobs.add(op.jobId!);
        await _save();
      }
    }
  }

  Future<void> discard(String opId) async {
    _ops.removeWhere((o) => o.id == opId);
    await _save();
  }

  Future<void> clear() async {
    _ops = [];
    await _save();
  }
}

/// Last-known job list and job details for offline work, with queued
/// changes applied on top so the screens reflect what the collector did.
class JobCache {
  JobCache(this._store);

  final EncryptedStore _store;

  Future<List<Json>> jobs(String scope) async {
    final raw = await _store.read('jobs_$scope');
    return raw is List ? raw.whereType<Map<Object?, Object?>>().map(asJson).toList() : [];
  }

  Future<void> saveJobs(String scope, List<Json> jobs) => _store.write('jobs_$scope', jobs);

  Future<Json?> job(String id) async {
    final raw = await _store.read('job_$id');
    return raw is Map ? asJson(raw) : null;
  }

  Future<void> saveJob(Json job) => _store.write('job_${job['id']}', job);
}

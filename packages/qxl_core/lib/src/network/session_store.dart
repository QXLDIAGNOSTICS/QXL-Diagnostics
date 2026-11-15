import 'dart:async';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';

/// Minimal key/value contract so tests can swap in memory storage.
abstract interface class SecureKeyValueStore {
  Future<String?> read(String key);
  Future<void> write(String key, String value);
  Future<void> delete(String key);
}

class PlatformSecureStore implements SecureKeyValueStore {
  const PlatformSecureStore([this._storage = const FlutterSecureStorage()]);

  final FlutterSecureStorage _storage;

  @override
  Future<String?> read(String key) => _storage.read(key: key);

  @override
  Future<void> write(String key, String value) => _storage.write(key: key, value: value);

  @override
  Future<void> delete(String key) => _storage.delete(key: key);
}

class MemorySecureStore implements SecureKeyValueStore {
  final Map<String, String> values = {};

  @override
  Future<String?> read(String key) async => values[key];

  @override
  Future<void> write(String key, String value) async => values[key] = value;

  @override
  Future<void> delete(String key) async => values.remove(key);
}

/// Holds the backend's opaque `qxl_session` cookie value.
///
/// The backend authenticates only through this httpOnly cookie (no JWT, no
/// bearer header). Native HTTP clients have no cookie jar, so the value is
/// captured from `Set-Cookie`, kept in the platform keystore/keychain, and
/// replayed as a `Cookie` header. It is never logged.
class SessionStore {
  SessionStore(this._store);

  static const _storageKey = 'qxl.session_cookie';

  final SecureKeyValueStore _store;
  final _controller = StreamController<bool>.broadcast();
  String? _token;

  /// Emits `false` when the session is cleared (logout or server rejection).
  Stream<bool> get changes => _controller.stream;

  String? get token => _token;
  bool get hasSession => _token != null && _token!.isNotEmpty;

  Future<void> load() async {
    try {
      _token = await _store.read(_storageKey);
    } catch (_) {
      // A corrupted keystore entry (e.g. after a device restore) must not
      // brick the app — treat it as signed out.
      _token = null;
      await _store.delete(_storageKey);
    }
  }

  Future<void> save(String token) async {
    if (token == _token) return;
    _token = token;
    await _store.write(_storageKey, token);
    _controller.add(true);
  }

  Future<void> clear() async {
    final had = hasSession;
    _token = null;
    await _store.delete(_storageKey);
    if (had) _controller.add(false);
  }
}

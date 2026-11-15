import 'dart:async';
import 'dart:io';

import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';

import '../config/app_config.dart';

/// Thin FCM wrapper. Disabled (no-op) when [AppConfig.firebase] is null, so
/// the apps run fully without a Firebase project — they refresh in-app.
class PushService {
  PushService(this._config);

  final FirebaseConfig? _config;
  bool _ready = false;
  final _taps = StreamController<Map<String, String>>.broadcast();
  final _foreground = StreamController<Map<String, String>>.broadcast();

  bool get enabled => _config != null;

  /// Data payloads of notifications the user tapped.
  Stream<Map<String, String>> get taps => _taps.stream;

  /// Data payloads received while the app is open.
  Stream<Map<String, String>> get foreground => _foreground.stream;

  Future<void> init() async {
    final c = _config;
    if (c == null || _ready) return;
    try {
      await Firebase.initializeApp(
        options: FirebaseOptions(
          apiKey: c.apiKey,
          appId: Platform.isIOS ? c.iosAppId : c.androidAppId,
          messagingSenderId: c.messagingSenderId,
          projectId: c.projectId,
          iosBundleId: c.iosBundleId,
        ),
      );
      _ready = true;
      FirebaseMessaging.onMessage.listen((m) => _foreground.add(_data(m)));
      FirebaseMessaging.onMessageOpenedApp.listen((m) => _taps.add(_data(m)));
      final initial = await FirebaseMessaging.instance.getInitialMessage();
      if (initial != null) _taps.add(_data(initial));
    } catch (e) {
      debugPrint('Push disabled: $e');
    }
  }

  /// Asks for permission (Android 13+ / iOS) and returns the device token.
  Future<String?> token() async {
    if (!_ready) return null;
    try {
      final settings = await FirebaseMessaging.instance.requestPermission();
      if (settings.authorizationStatus == AuthorizationStatus.denied) return null;
      // Registration tokens are what the backend's FCM HTTP v1 sender targets
      // (`message.token`). Migrate to register()/onRegistered (installation
      // IDs) together with the backend sender.
      // ignore: deprecated_member_use
      return await FirebaseMessaging.instance.getToken();
    } catch (_) {
      return null;
    }
  }

  Stream<String> get tokenRefresh =>
      // ignore: deprecated_member_use
      _ready ? FirebaseMessaging.instance.onTokenRefresh : const Stream.empty();

  Future<void> deleteToken() async {
    // ignore: deprecated_member_use
    if (_ready) await FirebaseMessaging.instance.deleteToken();
  }

  static Map<String, String> _data(RemoteMessage m) => {for (final e in m.data.entries) e.key: '${e.value}'};
}

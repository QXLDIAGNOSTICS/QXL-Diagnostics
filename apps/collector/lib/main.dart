import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_ui/material_ui.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:qxl_core/qxl_core.dart';

import 'app.dart';
import 'data/offline_store.dart';
import 'data/providers.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SystemChrome.setPreferredOrientations(const [DeviceOrientation.portraitUp]);
  // Never print patient data, OTPs or locations in release builds.
  if (kReleaseMode) debugPrint = (String? message, {int? wrapWidth}) {};

  final config = AppConfig.fromEnvironment();
  const keys = PlatformSecureStore();
  final session = SessionStore(keys);
  await session.load();
  final push = PushService(config.firebase);
  await push.init();

  var userAgent = 'QXLCollector';
  try {
    final info = await PackageInfo.fromPlatform();
    userAgent = 'QXLCollector/${info.version}+${info.buildNumber} (${Platform.operatingSystem})';
  } catch (_) {}

  runApp(
    ProviderScope(
      retry: (_, _) => null,
      overrides: [
        appConfigProvider.overrideWithValue(config),
        sessionStoreProvider.overrideWithValue(session),
        encryptedStoreProvider.overrideWithValue(FileEncryptedStore(keys)),
        pushServiceProvider.overrideWithValue(push),
        userAgentProvider.overrideWithValue(userAgent),
      ],
      child: const CollectorApp(),
    ),
  );
}

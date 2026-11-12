import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_ui/material_ui.dart';
import 'package:package_info_plus/package_info_plus.dart';

import 'app.dart';
import 'config/app_config.dart';
import 'core/network/session_store.dart';
import 'data/providers.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SystemChrome.setPreferredOrientations(const [DeviceOrientation.portraitUp]);

  // Never print request data, OTPs or health information in release builds.
  if (kReleaseMode) debugPrint = (String? message, {int? wrapWidth}) {};

  final config = AppConfig.fromEnvironment();
  final session = SessionStore(const PlatformSecureStore());
  await session.load();

  var userAgent = 'QXLMobile';
  try {
    final info = await PackageInfo.fromPlatform();
    userAgent = 'QXLMobile/${info.version}+${info.buildNumber} (${Platform.operatingSystem})';
  } catch (_) {
    // Not essential.
  }

  runApp(
    ProviderScope(
      // Retries are user-driven (every error state has "Try again"), so
      // failed requests aren't silently repeated against the API.
      retry: (_, _) => null,
      overrides: [
        appConfigProvider.overrideWithValue(config),
        sessionStoreProvider.overrideWithValue(session),
        userAgentProvider.overrideWithValue(userAgent),
      ],
      child: const QxlApp(),
    ),
  );
}

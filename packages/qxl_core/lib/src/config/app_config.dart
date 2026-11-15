import 'package:flutter/foundation.dart';

/// Build-time configuration, supplied with `--dart-define-from-file`
/// (see `env/*.json` and docs/DEVELOPMENT.md). Nothing here is secret.
@immutable
class AppConfig {
  const AppConfig({
    required this.apiBaseUrl,
    required this.websiteBaseUrl,
    required this.environment,
    this.mapTileUrl = defaultMapTileUrl,
    this.mapAttribution = 'OpenStreetMap contributors',
    this.firebase,
  });

  /// OSM's public tiles are for light/dev use only (tile usage policy); set
  /// QXL_MAP_TILE_URL to a commercial or self-hosted tile server for release.
  static const defaultMapTileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

  factory AppConfig.fromEnvironment() {
    const api = String.fromEnvironment(
      'QXL_API_BASE_URL',
      defaultValue: 'https://qxl-diagnostics-production.up.railway.app/api/v1',
    );
    const web = String.fromEnvironment('QXL_WEBSITE_URL', defaultValue: 'https://qxldiagnostics.com');
    const env = String.fromEnvironment('QXL_ENV', defaultValue: 'production');

    final apiUri = Uri.parse(api);
    final webUri = Uri.parse(web);
    if (kReleaseMode && (apiUri.scheme != 'https' || webUri.scheme != 'https')) {
      // Health data and the session cookie must never travel in clear text.
      throw StateError('Release builds require https endpoints.');
    }
    const tiles = String.fromEnvironment('QXL_MAP_TILE_URL', defaultValue: defaultMapTileUrl);
    const attribution = String.fromEnvironment('QXL_MAP_ATTRIBUTION', defaultValue: 'OpenStreetMap contributors');
    return AppConfig(
      apiBaseUrl: _stripTrailingSlash(api),
      websiteBaseUrl: webUri,
      environment: env,
      mapTileUrl: tiles,
      mapAttribution: attribution,
      firebase: FirebaseConfig.fromEnvironment(),
    );
  }

  /// FastAPI base including the `/api/v1` prefix, without a trailing slash.
  final String apiBaseUrl;

  /// Public website, used only to open approved legal/policy pages.
  final Uri websiteBaseUrl;

  /// `production`, `staging` or `local` — shown on the About screen.
  final String environment;

  /// Tile URL template for flutter_map.
  final String mapTileUrl;
  final String mapAttribution;

  /// Push notifications are enabled only when Firebase values are supplied.
  final FirebaseConfig? firebase;

  bool get isProduction => environment == 'production';

  Uri websitePage(String path) => websiteBaseUrl.replace(path: path);

  Uri get privacyPolicyUrl => websitePage('/privacy-policy');
  Uri get termsUrl => websitePage('/terms');
  Uri get paymentTermsUrl => websitePage('/payment-terms');

  static String _stripTrailingSlash(String value) => value.endsWith('/') ? value.substring(0, value.length - 1) : value;
}

/// Server contract constants (mirrors backend settings; the server still
/// enforces every one of them).
abstract final class ApiContract {
  /// `settings.SESSION_COOKIE_NAME` — opaque, httpOnly session cookie.
  static const sessionCookieName = 'qxl_session';

  /// `settings.MAX_UPLOAD_BYTES` — checked client-side only to avoid
  /// uploading a file the server will reject anyway.
  static const maxUploadBytes = 25 * 1024 * 1024;

  /// MIME types `POST /prescriptions` accepts.
  static const prescriptionMimeTypes = {'application/pdf', 'image/png', 'image/jpeg', 'image/webp'};
}

/// Firebase Cloud Messaging options, from --dart-define. No google-services
/// file is needed; when any value is missing push is simply disabled.
@immutable
class FirebaseConfig {
  const FirebaseConfig({
    required this.apiKey,
    required this.projectId,
    required this.messagingSenderId,
    required this.androidAppId,
    required this.iosAppId,
    this.iosBundleId,
  });

  static FirebaseConfig? fromEnvironment() {
    const apiKey = String.fromEnvironment('QXL_FIREBASE_API_KEY');
    const projectId = String.fromEnvironment('QXL_FIREBASE_PROJECT_ID');
    const sender = String.fromEnvironment('QXL_FIREBASE_SENDER_ID');
    const android = String.fromEnvironment('QXL_FIREBASE_ANDROID_APP_ID');
    const ios = String.fromEnvironment('QXL_FIREBASE_IOS_APP_ID');
    const bundle = String.fromEnvironment('QXL_FIREBASE_IOS_BUNDLE_ID');
    if (apiKey.isEmpty || projectId.isEmpty || sender.isEmpty || (android.isEmpty && ios.isEmpty)) return null;
    return const FirebaseConfig(
      apiKey: apiKey,
      projectId: projectId,
      messagingSenderId: sender,
      androidAppId: android,
      iosAppId: ios,
      iosBundleId: bundle == '' ? null : bundle,
    );
  }

  final String apiKey;
  final String projectId;
  final String messagingSenderId;
  final String androidAppId;
  final String iosAppId;
  final String? iosBundleId;
}

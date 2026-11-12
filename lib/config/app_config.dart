import 'package:flutter/foundation.dart';

/// Build-time configuration, supplied with `--dart-define-from-file`
/// (see `env/*.json` and docs/DEVELOPMENT.md). Nothing here is secret.
@immutable
class AppConfig {
  const AppConfig({required this.apiBaseUrl, required this.websiteBaseUrl, required this.environment});

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
    return AppConfig(apiBaseUrl: _stripTrailingSlash(api), websiteBaseUrl: webUri, environment: env);
  }

  /// FastAPI base including the `/api/v1` prefix, without a trailing slash.
  final String apiBaseUrl;

  /// Public website, used only to open approved legal/policy pages.
  final Uri websiteBaseUrl;

  /// `production`, `staging` or `local` — shown on the About screen.
  final String environment;

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

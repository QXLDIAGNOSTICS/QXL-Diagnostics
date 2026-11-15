import 'package:material_ui/material_ui.dart';
import 'package:url_launcher/url_launcher.dart';

/// Safe hand-offs to the phone dialer, WhatsApp, maps and the browser.
/// Failures show a message instead of throwing.
abstract final class Launch {
  static Future<void> phone(BuildContext context, String number) =>
      _open(context, Uri(scheme: 'tel', path: number.replaceAll(RegExp(r'[^\d+]'), '')), 'call');

  static Future<void> whatsapp(BuildContext context, String number, {String? text}) => _open(
    context,
    Uri.https('wa.me', '/${number.replaceAll(RegExp(r'\D'), '')}', text == null ? null : {'text': text}),
    'open WhatsApp',
    mode: LaunchMode.externalApplication,
  );

  static Future<void> email(BuildContext context, String address) =>
      _open(context, Uri(scheme: 'mailto', path: address), 'open email');

  static Future<void> directions(BuildContext context, {double? lat, double? lng, required String query}) {
    final destination = lat != null && lng != null ? '$lat,$lng' : query;
    return _open(
      context,
      Uri.https('www.google.com', '/maps/dir/', {'api': '1', 'destination': destination}),
      'open maps',
      mode: LaunchMode.externalApplication,
    );
  }

  /// In-app browser tab (Custom Tabs / SFSafariViewController) — used for
  /// website pages and report links so they stay out of the app's storage.
  static Future<void> web(BuildContext context, Uri url) =>
      _open(context, url, 'open the page', mode: LaunchMode.inAppBrowserView);

  static Future<void> _open(
    BuildContext context,
    Uri uri,
    String action, {
    LaunchMode mode = LaunchMode.platformDefault,
  }) async {
    final messenger = ScaffoldMessenger.maybeOf(context);
    var ok = false;
    try {
      ok = await launchUrl(uri, mode: mode);
    } catch (_) {
      ok = false;
    }
    if (!ok) {
      messenger?.showSnackBar(SnackBar(content: Text("Couldn't $action on this device.")));
    }
  }
}

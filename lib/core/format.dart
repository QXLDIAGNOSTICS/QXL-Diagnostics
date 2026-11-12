import 'package:intl/intl.dart';

final _rupees = NumberFormat.currency(locale: 'en_IN', symbol: '₹', decimalDigits: 0);
final _rupeesPrecise = NumberFormat.currency(locale: 'en_IN', symbol: '₹', decimalDigits: 2);

String formatRupees(int rupees) => _rupees.format(rupees);

/// Paise → "₹1,234" (or "₹1,234.50" when there are paise).
String formatPaise(int paise) => paise % 100 == 0 ? _rupees.format(paise ~/ 100) : _rupeesPrecise.format(paise / 100);

/// Server turnaround hours → "6 days" / "12 hours".
String formatTurnaround(int hours) {
  if (hours >= 24 && hours % 24 == 0) {
    final days = hours ~/ 24;
    return days == 1 ? '1 day' : '$days days';
  }
  return hours == 1 ? '1 hour' : '$hours hours';
}

String isoDate(DateTime day) => DateFormat('yyyy-MM-dd').format(day);

/// "2026-11-20" → "Fri, 20 Nov 2026"; returns the input if unparseable.
String formatIsoDate(String? iso) {
  if (iso == null) return '';
  final parsed = DateTime.tryParse(iso);
  return parsed == null ? iso : DateFormat('EEE, d MMM yyyy').format(parsed);
}

String formatDate(DateTime value) => DateFormat('d MMM yyyy').format(value);
String formatDateTime(DateTime value) => DateFormat('d MMM yyyy, h:mm a').format(value);

/// Human labels for `BookingRead.status`; unknown values are title-cased so a
/// new server status still renders sensibly.
String bookingStatusLabel(String status) => switch (status) {
  'pending' => 'Requested',
  'confirmed' => 'Confirmed',
  'checked_in' => 'Checked in',
  'in_progress' => 'In progress',
  'sample_collected' => 'Sample collected',
  'report_ready' => 'Report ready',
  'completed' => 'Completed',
  'cancelled' => 'Cancelled',
  'no_show' => 'Missed',
  _ => titleCase(status),
};

String paymentStatusLabel(String status) => switch (status) {
  'unpaid' => 'Payment due',
  'pending' => 'Payment pending',
  'paid' => 'Paid',
  'failed' => 'Payment failed',
  'refunded' => 'Refunded',
  _ => titleCase(status),
};

String titleCase(String value) => value
    .replaceAll('_', ' ')
    .split(' ')
    .where((w) => w.isNotEmpty)
    .map((w) => w[0].toUpperCase() + w.substring(1))
    .join(' ');

String fileSize(int bytes) {
  if (bytes < 1024) return '$bytes B';
  if (bytes < 1024 * 1024) return '${(bytes / 1024).toStringAsFixed(0)} KB';
  return '${(bytes / (1024 * 1024)).toStringAsFixed(1)} MB';
}

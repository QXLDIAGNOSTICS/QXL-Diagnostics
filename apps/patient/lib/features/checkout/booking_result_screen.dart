import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import 'package:qxl_core/qxl_core.dart';

import '../../data/models/booking.dart';
import '../../routing/router.dart';

class BookingResult {
  const BookingResult({
    required this.bookingIds,
    required this.paid,
    this.bookings = const [],
    this.paymentPending = false,
    this.isGuest = false,
    this.amountPaise,
  });

  final List<Booking> bookings;
  final List<String> bookingIds;
  final bool paid;

  /// Paid at the gateway but not yet confirmed by the server.
  final bool paymentPending;
  final bool isGuest;
  final int? amountPaise;
}

/// Short, human-friendly booking reference derived from the server id.
String bookingReference(String id) => id.replaceAll('-', '').substring(0, 8).toUpperCase();

class BookingResultScreen extends ConsumerWidget {
  const BookingResultScreen({super.key, required this.result});

  final BookingResult? result;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final r = result;
    if (r == null) {
      return Scaffold(
        appBar: AppBar(),
        body: Center(
          child: FilledButton(onPressed: () => context.go(Routes.home), child: const Text('Go home')),
        ),
      );
    }
    final (icon, color, title, message) = r.paid
        ? (
            Icons.check_circle_rounded,
            context.status.success,
            'Payment successful',
            'QXL has received your payment${r.amountPaise != null ? ' of ${formatPaise(r.amountPaise!)}' : ''}. '
                'Your booking is with our team for confirmation.',
          )
        : r.paymentPending
        ? (
            Icons.hourglass_top_rounded,
            context.status.warning,
            'Booking received',
            'Your payment is being confirmed. Your booking will update once it is.',
          )
        : (
            Icons.event_available_rounded,
            context.colors.primary,
            'Booking requested',
            r.isGuest
                ? 'Payment is still due. Please keep your booking reference for any queries.'
                : 'Payment is still due. You can pay any time from My bookings.',
          );

    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, _) {
        if (!didPop) context.go(r.isGuest ? Routes.home : Routes.bookings);
      },
      child: Scaffold(
        body: SafeArea(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(24, 48, 24, 24),
            children: [
              Icon(icon, size: 72, color: color),
              const SizedBox(height: 16),
              Semantics(
                header: true,
                liveRegion: true,
                child: Text(title, style: context.text.headlineSmall, textAlign: TextAlign.center),
              ),
              const SizedBox(height: 8),
              Text(message, style: context.text.bodyLarge, textAlign: TextAlign.center),
              const SizedBox(height: 24),
              Card(
                child: Column(
                  children: [
                    if (r.bookings.isNotEmpty)
                      for (final b in r.bookings)
                        ListTile(
                          title: Text(b.testName ?? 'Booking'),
                          subtitle: Text(
                            [
                              if (b.preferredDate != null) formatIsoDate(b.preferredDate),
                              if (b.preferredTime != null) b.preferredTime!,
                              'Ref ${bookingReference(b.id)}',
                            ].join(' · '),
                          ),
                        )
                    else
                      for (final id in r.bookingIds) ListTile(title: Text('Booking ref ${bookingReference(id)}')),
                  ],
                ),
              ),
              if (r.isGuest) ...[
                const SizedBox(height: 16),
                const MedicalNotice(
                  text:
                      'You booked as a guest, so this booking won’t appear under My bookings. '
                      'Please note your booking reference.',
                ),
              ],
              const SizedBox(height: 24),
              if (!r.isGuest)
                FilledButton(onPressed: () => context.go(Routes.bookings), child: const Text('View my bookings')),
              const SizedBox(height: 8),
              OutlinedButton(onPressed: () => context.go(Routes.home), child: const Text('Back to home')),
            ],
          ),
        ),
      ),
    );
  }
}

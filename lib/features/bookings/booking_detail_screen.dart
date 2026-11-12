import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/format.dart';
import '../../core/launch.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/common.dart';
import '../../core/widgets/states.dart';
import '../../data/models/booking.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';
import '../auth/auth_controller.dart';
import '../checkout/booking_result_screen.dart';
import '../payment/payment_gateway.dart';
import '../payment/payment_screen.dart';
import 'bookings_screen.dart';

final bookingDetailProvider = FutureProvider.autoDispose.family<Booking, String>((ref, id) {
  ref.watch(currentUserIdProvider);
  return ref.watch(bookingRepositoryProvider).booking(id);
});

const _timeline = ['pending', 'confirmed', 'sample_collected', 'report_ready', 'completed'];

class BookingDetailScreen extends ConsumerWidget {
  const BookingDetailScreen({super.key, required this.id});

  final String id;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final booking = ref.watch(bookingDetailProvider(id));
    return Scaffold(
      appBar: AppBar(title: const Text('Booking details')),
      body: AsyncValueView<Booking>(
        value: booking,
        onRetry: () => ref.invalidate(bookingDetailProvider(id)),
        data: (b) => RefreshIndicator(
          onRefresh: () => ref.refresh(bookingDetailProvider(id).future),
          child: _Body(booking: b),
        ),
      ),
      bottomNavigationBar: booking.value?.canPay == true
          ? BottomActionBar(
              child: FilledButton.icon(
                onPressed: () async {
                  final b = booking.value!;
                  final user = ref.read(authControllerProvider).value;
                  await context.push(
                    Routes.pay,
                    extra: PayRequest(
                      bookings: [b],
                      applyHomeCollectionFee: b.collectionType == CollectionType.home,
                      prefill: PaymentPrefill(
                        name: user?.name ?? b.patientName,
                        phone: user?.phone,
                        email: user?.email,
                      ),
                    ),
                  );
                  ref.invalidate(bookingDetailProvider(id));
                  ref.invalidate(myBookingsProvider);
                },
                icon: const Icon(Icons.lock_outline),
                label: Text('Pay ${formatPaise(booking.value!.amountPaise!)}'),
              ),
            )
          : null,
    );
  }
}

class _Body extends StatelessWidget {
  const _Body({required this.booking});

  final Booking booking;

  @override
  Widget build(BuildContext context) {
    final b = booking;
    return ListView(
      physics: const AlwaysScrollableScrollPhysics(),
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
      children: [
        Text(b.testName ?? 'Booking', style: context.text.headlineSmall),
        const SizedBox(height: 4),
        SelectableText(
          'Reference ${bookingReference(b.id)}',
          style: context.text.bodyMedium?.copyWith(color: context.colors.onSurfaceVariant),
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            StatusPill(label: bookingStatusLabel(b.status), tone: bookingTone(b.status)),
            StatusPill(label: paymentStatusLabel(b.paymentStatus), tone: paymentTone(b.paymentStatus)),
            if (b.isDelayed) const StatusPill(label: 'Running late', tone: PillTone.warning),
            if (b.wasRescheduled) const StatusPill(label: 'Rescheduled', tone: PillTone.info),
          ],
        ),
        if (b.hasReport) ...[const SizedBox(height: 16), _ReportCard(url: b.reportUrl!)],
        if (!b.isCancelled && b.status != 'no_show') ...[const SizedBox(height: 16), _Timeline(status: b.status)],
        const SizedBox(height: 16),
        Card(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Column(
              children: [
                FactRow(
                  icon: b.collectionType == CollectionType.home
                      ? Icons.home_outlined
                      : Icons.store_mall_directory_outlined,
                  label: 'Collection',
                  value: b.collectionType == CollectionType.home
                      ? 'Home collection${b.collectionAddress != null ? '\n${b.collectionAddress}' : ''}'
                      : 'Centre visit',
                ),
                if (b.preferredDate != null || b.preferredTime != null)
                  FactRow(
                    icon: Icons.event_outlined,
                    label: 'Preferred slot',
                    value: [
                      formatIsoDate(b.preferredDate),
                      if (b.preferredTime != null) b.preferredTime!,
                    ].where((s) => s.isNotEmpty).join(' · '),
                  ),
                FactRow(
                  icon: Icons.person_outline,
                  label: 'Patient',
                  value: [
                    b.patientName,
                    if (b.patientAge != null) '${b.patientAge} yrs',
                    if (b.patientGender != null) b.patientGender!,
                  ].join(' · '),
                ),
                if (b.amountPaise != null)
                  FactRow(icon: Icons.receipt_long_outlined, label: 'Amount', value: formatPaise(b.amountPaise!)),
                if (b.createdAt != null)
                  FactRow(icon: Icons.schedule_outlined, label: 'Booked on', value: formatDateTime(b.createdAt!)),
                if (b.notes != null) FactRow(icon: Icons.notes_outlined, label: 'Notes', value: b.notes!),
              ],
            ),
          ),
        ),
        if (b.paymentStatus == 'pending') ...[
          const SizedBox(height: 16),
          const MedicalNotice(
            text:
                'A payment for this booking was started. If you completed it, it may take a few minutes to confirm — '
                'pull down to refresh before paying again.',
          ),
        ],
      ],
    );
  }
}

class _ReportCard extends StatelessWidget {
  const _ReportCard({required this.url});

  final String url;

  @override
  Widget build(BuildContext context) {
    final uri = Uri.tryParse(url);
    final safe = uri != null && uri.scheme == 'https';
    return Card(
      color: context.status.successContainer,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.description_outlined, color: context.status.success),
                const SizedBox(width: 10),
                Expanded(child: Text('Your report is ready', style: context.text.titleMedium)),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              safe
                  ? 'Opens securely in your browser. If the link has expired, pull to refresh or contact QXL.'
                  : 'This report link can’t be opened securely. Please contact QXL for your report.',
              style: context.text.bodySmall,
            ),
            if (safe) ...[
              const SizedBox(height: 12),
              FilledButton.icon(
                onPressed: () => Launch.web(context, uri),
                icon: const Icon(Icons.open_in_new),
                label: const Text('View report'),
              ),
            ],
            const SizedBox(height: 8),
            Text(
              'Please discuss your results with a qualified doctor.',
              style: context.text.labelSmall?.copyWith(color: context.colors.onSurfaceVariant),
            ),
          ],
        ),
      ),
    );
  }
}

class _Timeline extends StatelessWidget {
  const _Timeline({required this.status});

  final String status;

  @override
  Widget build(BuildContext context) {
    // In-centre progress states sit between confirmation and collection.
    final effective = switch (status) {
      'checked_in' || 'in_progress' => 'confirmed',
      _ => status,
    };
    final current = _timeline.indexOf(effective);
    if (current < 0) return const SizedBox.shrink();
    const labels = ['Requested', 'Confirmed', 'Sample collected', 'Report ready', 'Completed'];
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            for (var i = 0; i < labels.length; i++)
              Semantics(
                label: '${labels[i]}, ${i <= current ? 'done' : 'pending'}',
                excludeSemantics: true,
                child: Row(
                  children: [
                    Icon(
                      i <= current ? Icons.check_circle : Icons.radio_button_unchecked,
                      color: i <= current ? context.status.success : context.colors.outline,
                      size: 22,
                    ),
                    const SizedBox(width: 12),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 6),
                      child: Text(
                        labels[i],
                        style: context.text.bodyMedium?.copyWith(
                          fontWeight: i == current ? FontWeight.w700 : FontWeight.w400,
                          color: i <= current ? context.colors.onSurface : context.colors.onSurfaceVariant,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}

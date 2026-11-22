import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:latlong2/latlong.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_core/qxl_core.dart';

import '../../data/models/collect.dart';
import '../../data/providers.dart';
import '../auth/auth_controller.dart';
import '../payment/payment_gateway.dart';
import '../payment/payment_screen.dart';
import 'collect_providers.dart';

/// One home collection: live status, collector tracking, samples, lab
/// progress per test, reports, payment and self-service changes.
class VisitScreen extends ConsumerStatefulWidget {
  const VisitScreen({super.key, required this.id});

  final String id;

  @override
  ConsumerState<VisitScreen> createState() => _VisitScreenState();
}

class _VisitScreenState extends ConsumerState<VisitScreen> {
  Timer? _visitTimer;
  Timer? _trackTimer;
  Tracking? _tracking;
  late final AppLifecycleListener _lifecycle;
  bool _foreground = true;

  @override
  void initState() {
    super.initState();
    _lifecycle = AppLifecycleListener(
      onResume: () {
        _foreground = true;
        ref.invalidate(visitProvider(widget.id));
        _pollTracking();
      },
      onPause: () => _foreground = false,
    );
    // Status changes are pushed when FCM is configured; this keeps the
    // screen current without it.
    _visitTimer = Timer.periodic(const Duration(seconds: 30), (_) {
      if (_foreground && mounted) ref.invalidate(visitProvider(widget.id));
    });
  }

  @override
  void dispose() {
    _visitTimer?.cancel();
    _trackTimer?.cancel();
    _lifecycle.dispose();
    super.dispose();
  }

  void _syncTracking(HomeVisit visit) {
    if (visit.isLive && _trackTimer == null) {
      _pollTracking();
      _trackTimer = Timer.periodic(const Duration(seconds: 10), (_) => _pollTracking());
    } else if (!visit.isLive && _trackTimer != null) {
      _trackTimer?.cancel();
      _trackTimer = null;
    }
  }

  Future<void> _pollTracking() async {
    if (!_foreground || !mounted) return;
    try {
      final t = await ref.read(collectRepositoryProvider).tracking(widget.id);
      if (mounted) setState(() => _tracking = t);
    } catch (_) {
      // Keep the last known position; the visit card still shows status.
    }
  }

  Future<void> _openReport(ReportSummary r) async {
    try {
      final link = await ref.read(collectRepositoryProvider).reportLink(r.id);
      if (mounted) await Launch.web(context, link);
    } catch (e) {
      if (mounted) showSnack(context, describeError(e));
    }
  }

  Future<void> _cancel(HomeVisit visit) async {
    final reason = TextEditingController();
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cancel this visit?'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              visit.paymentStatus == 'paid'
                  ? 'Your payment will be refunded by QXL as per the refund policy.'
                  : 'The collector will not come for this booking.',
            ),
            const SizedBox(height: 12),
            TextField(
              controller: reason,
              decoration: const InputDecoration(labelText: 'Reason (optional)'),
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Keep visit')),
          FilledButton(onPressed: () => Navigator.pop(context, true), child: const Text('Cancel visit')),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    try {
      await ref
          .read(collectRepositoryProvider)
          .cancel(visit.id, reason.text.trim().isEmpty ? null : reason.text.trim());
      refreshVisitData(ref, visit.id);
      if (mounted) showSnack(context, 'Visit cancelled');
    } catch (e) {
      if (mounted) showSnack(context, describeError(e));
    }
  }

  Future<void> _reschedule(HomeVisit visit) async {
    final changed = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      builder: (_) => _RescheduleSheet(visit: visit),
    );
    if (changed == true) refreshVisitData(ref, visit.id);
  }

  @override
  Widget build(BuildContext context) {
    final visit = ref.watch(visitProvider(widget.id));
    visit.whenData(_syncTracking);
    return Scaffold(
      appBar: AppBar(
        title: Text(visit.value?.reference ?? 'Home collection'),
        actions: [
          IconButton(
            tooltip: 'Refresh',
            icon: const Icon(Icons.refresh),
            onPressed: () {
              ref.invalidate(visitProvider(widget.id));
              _pollTracking();
            },
          ),
        ],
      ),
      body: AsyncValueView<HomeVisit>(
        value: visit,
        onRetry: () => ref.invalidate(visitProvider(widget.id)),
        data: (v) => RefreshIndicator(
          onRefresh: () async {
            ref.invalidate(visitProvider(widget.id));
            await _pollTracking();
          },
          child: ListView(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 32),
            children: [
              _StatusCard(visit: v),
              const SizedBox(height: 12),
              _Progress(stage: v.stage),
              if (v.isLive || v.lat != null) ...[const SizedBox(height: 12), _LiveMap(visit: v, tracking: _tracking)],
              if (v.collector != null) ...[
                const SizedBox(height: 12),
                _CollectorCard(collector: v.collector!, live: v.isLive),
              ],
              if (v.visitCode != null && !v.isClosed && v.completedAt == null) ...[
                const SizedBox(height: 12),
                _VisitCodeCard(code: v.visitCode!),
              ],
              if (v.awaitingPayment) ...[
                const SizedBox(height: 12),
                _PayCard(visit: v),
              ] else if (v.paymentMode == 'pay_on_visit' && v.paymentStatus != 'paid' && v.status != 'cancelled') ...[
                const SizedBox(height: 12),
                MedicalNotice(
                  text: 'Please pay ${formatPaise(v.totalPaise)} to the collector by cash or UPI at the visit.',
                ),
              ],
              const SectionHeader(title: 'Tests', padding: EdgeInsets.fromLTRB(0, 20, 0, 8)),
              for (final t in v.tests) _TestRow(test: t),
              if (v.specimens.isNotEmpty) ...[
                const SectionHeader(title: 'Samples', padding: EdgeInsets.fromLTRB(0, 20, 0, 8)),
                for (final s in v.specimens)
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: const Icon(Icons.science_outlined),
                    title: Text(s.containerType),
                    subtitle: Text(
                      [
                        specimenStatusLabel(s.status),
                        if (s.collectedAt != null) 'collected ${formatDateTime(s.collectedAt!)}',
                        if (s.reason != null) titleCase(s.reason!),
                      ].join(' · '),
                    ),
                  ),
              ],
              if (v.reports.isNotEmpty) ...[
                const SectionHeader(title: 'Reports', padding: EdgeInsets.fromLTRB(0, 20, 0, 8)),
                for (final r in v.reports) ReportTile(report: r, onOpen: () => _openReport(r)),
              ],
              const SectionHeader(title: 'Details', padding: EdgeInsets.fromLTRB(0, 20, 0, 8)),
              Card(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Column(
                    children: [
                      FactRow(icon: Icons.person_outline, label: 'Patient', value: v.patientName),
                      FactRow(
                        icon: Icons.event_outlined,
                        label: 'Slot',
                        value: '${DateFormat('EEE, d MMM yyyy').format(v.slotDate)} · ${v.slotLabel}',
                      ),
                      FactRow(icon: Icons.location_on_outlined, label: 'Address', value: v.addressLine),
                      FactRow(
                        icon: Icons.receipt_long_outlined,
                        label: 'Amount',
                        value:
                            '${formatPaise(v.totalPaise)}'
                            '${v.collectionFeePaise > 0 ? ' (incl. ${formatPaise(v.collectionFeePaise)} collection fee)' : ''}'
                            ' · ${paymentStatusLabel(v.paymentStatus == 'pay_on_visit' ? 'unpaid' : v.paymentStatus)}',
                      ),
                    ],
                  ),
                ),
              ),
              if (v.timeline.isNotEmpty) _Timeline(entries: v.timeline),
              const SizedBox(height: 16),
              _Actions(visit: v, onCancel: () => _cancel(v), onReschedule: () => _reschedule(v)),
            ],
          ),
        ),
      ),
    );
  }
}

class _StatusCard extends StatelessWidget {
  const _StatusCard({required this.visit});

  final HomeVisit visit;

  @override
  Widget build(BuildContext context) {
    final v = visit;
    final (icon, color) = switch (v.stage) {
      'cancelled' || 'unsuccessful' => (Icons.cancel_outlined, context.colors.error),
      'report_ready' => (Icons.verified_outlined, context.status.success),
      'on_the_way' => (Icons.directions_bike_rounded, Brand.accent),
      'arrived' => (Icons.door_front_door_outlined, Brand.accent),
      'awaiting_payment' => (Icons.payments_outlined, context.status.warning),
      _ => (Icons.event_available_outlined, context.colors.primary),
    };
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            CircleAvatar(
              radius: 26,
              backgroundColor: color.withValues(alpha: 0.15),
              child: Icon(icon, color: color),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Semantics(liveRegion: true, child: Text(visitStageLabel(v.stage), style: context.text.titleMedium)),
                  const SizedBox(height: 2),
                  Text(
                    '${DateFormat('EEE, d MMM').format(v.slotDate)} · ${v.slotLabel}',
                    style: context.text.bodyMedium?.copyWith(color: context.colors.onSurfaceVariant),
                  ),
                  if (v.isDelayed && v.delayNote != null) ...[
                    const SizedBox(height: 6),
                    StatusPill(label: v.delayNote!, tone: PillTone.warning),
                  ],
                  if (v.outcomeReason != null && (v.stage == 'unsuccessful' || v.stage == 'partially_collected')) ...[
                    const SizedBox(height: 6),
                    Text(v.outcomeReason!, style: context.text.bodySmall),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

const _steps = [
  ('Booked', {'awaiting_payment', 'awaiting_assignment'}),
  ('Collector assigned', {'collector_assigned', 'collector_confirmed'}),
  ('On the way', {'on_the_way', 'arrived'}),
  ('Collected', {'collected', 'partially_collected', 'in_transit'}),
  ('At the lab', {'at_lab', 'partial_report'}),
  ('Report ready', {'report_ready'}),
];

class _Progress extends StatelessWidget {
  const _Progress({required this.stage});

  final String stage;

  @override
  Widget build(BuildContext context) {
    if (stage == 'cancelled' || stage == 'unsuccessful') return const SizedBox.shrink();
    final current = _steps.indexWhere((s) => s.$2.contains(stage));
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
        child: Row(
          children: [
            for (var i = 0; i < _steps.length; i++)
              Expanded(
                child: Semantics(
                  label: '${_steps[i].$1}, ${i <= current ? 'done' : 'pending'}',
                  excludeSemantics: true,
                  child: Column(
                    children: [
                      Icon(
                        i < current
                            ? Icons.check_circle
                            : (i == current ? Icons.radio_button_checked : Icons.radio_button_unchecked),
                        size: 22,
                        color: i <= current
                            ? (i == current ? Brand.accent : context.status.success)
                            : context.colors.outline,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        _steps[i].$1,
                        textAlign: TextAlign.center,
                        style: context.text.labelSmall?.copyWith(fontWeight: i == current ? FontWeight.w700 : null),
                      ),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _LiveMap extends ConsumerWidget {
  const _LiveMap({required this.visit, required this.tracking});

  final HomeVisit visit;
  final Tracking? tracking;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final config = ref.watch(appConfigProvider);
    final t = tracking;
    final pins = <MapPin>[
      if (visit.lat != null && visit.lng != null)
        MapPin(point: LatLng(visit.lat!, visit.lng!), kind: MapPinKind.home, label: 'Collection address'),
      if (visit.isLive && t != null && t.hasLocation)
        MapPin(point: LatLng(t.lat!, t.lng!), kind: MapPinKind.collector, label: 'Collector'),
    ];
    if (pins.isEmpty) return const SizedBox.shrink();
    String? eta;
    if (visit.stage == 'on_the_way' && t?.etaSeconds != null) {
      final minutes = (t!.etaSeconds! / 60).ceil().clamp(1, 600);
      final km = t.distanceM == null ? '' : ' · ${(t.distanceM! / 1000).toStringAsFixed(1)} km away';
      eta = 'About $minutes min (estimate)$km';
    } else if (visit.isLive && (t == null || !t.hasLocation)) {
      eta = 'Waiting for the collector’s location…';
    }
    return Card(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          SizedBox(
            height: 220,
            child: QxlMap(key: ValueKey(pins.length), config: config, pins: pins, fitPins: pins.length > 1, zoom: 15),
          ),
          if (eta != null)
            Padding(
              padding: const EdgeInsets.all(12),
              child: Semantics(
                liveRegion: true,
                child: Row(
                  children: [
                    const Icon(Icons.schedule, size: 18),
                    const SizedBox(width: 8),
                    Expanded(child: Text(eta, style: context.text.titleSmall)),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _CollectorCard extends ConsumerWidget {
  const _CollectorCard({required this.collector, required this.live});

  final CollectorCard collector;
  final bool live;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final support = ref.watch(siteSettingsProvider).value?.phoneE164;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                ClipOval(
                  child: SizedBox(
                    width: 52,
                    height: 52,
                    child: NetImage(
                      collector.photoUrl,
                      semanticLabel: collector.name,
                      fallbackIcon: Icons.person_outline,
                    ),
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(collector.name, style: context.text.titleMedium),
                      Text('QXL ID ${collector.employeeCode}', style: context.text.bodySmall),
                      if (collector.qualification != null)
                        Text(collector.qualification!, style: context.text.bodySmall),
                    ],
                  ),
                ),
                Icon(Icons.verified_user_outlined, color: context.status.success),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              'Check the collector’s QXL ID card matches this name and ID before the collection.',
              style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              children: [
                if (collector.phone != null && live)
                  FilledButton.tonalIcon(
                    onPressed: () => Launch.phone(context, collector.phone!),
                    icon: const Icon(Icons.call_outlined),
                    label: const Text('Call collector'),
                  ),
                if (support != null)
                  OutlinedButton.icon(
                    onPressed: () => Launch.phone(context, support),
                    icon: const Icon(Icons.support_agent_outlined),
                    label: const Text('QXL support'),
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _VisitCodeCard extends StatelessWidget {
  const _VisitCodeCard({required this.code});

  final String code;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Brand.accentSoft,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            const Icon(Icons.pin_outlined, color: Brand.navy),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                'Visit code — the collector may ask for it to confirm your booking.',
                style: context.text.bodyMedium?.copyWith(color: Brand.navyDeep),
              ),
            ),
            Semantics(
              label: 'Visit code ${code.split('').join(' ')}',
              excludeSemantics: true,
              child: Text(code, style: context.text.headlineSmall?.copyWith(color: Brand.navyDeep, letterSpacing: 4)),
            ),
          ],
        ),
      ),
    );
  }
}

class _PayCard extends ConsumerWidget {
  const _PayCard({required this.visit});

  final HomeVisit visit;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authControllerProvider).value;
    return Card(
      color: context.status.warningContainer,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Payment pending', style: context.text.titleMedium),
            const SizedBox(height: 4),
            const Text('Your visit is confirmed and a collector assigned once payment is received.'),
            const SizedBox(height: 12),
            FilledButton.icon(
              onPressed: () => context.push(
                '/pay',
                extra: PayRequest(
                  visitId: visit.id,
                  prefill: PaymentPrefill(name: visit.patientName, phone: user?.phone, email: user?.email),
                ),
              ),
              icon: const Icon(Icons.lock_outline),
              label: Text('Pay ${formatPaise(visit.totalPaise)}'),
            ),
          ],
        ),
      ),
    );
  }
}

class _TestRow extends StatelessWidget {
  const _TestRow({required this.test});

  final VisitTest test;

  @override
  Widget build(BuildContext context) {
    final tone = switch (test.labStatus) {
      'authorized' => PillTone.success,
      'partial' => PillTone.info,
      'delayed' || 'on_hold' => PillTone.warning,
      'not_received' => PillTone.neutral,
      _ => PillTone.info,
    };
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          Expanded(child: Text(test.name, style: context.text.bodyLarge)),
          const SizedBox(width: 8),
          StatusPill(label: labStatusLabel(test.labStatus), tone: tone),
        ],
      ),
    );
  }
}

/// Released report row; superseded versions are shown but can't be opened.
class ReportTile extends StatelessWidget {
  const ReportTile({super.key, required this.report, required this.onOpen});

  final ReportSummary report;
  final VoidCallback onOpen;

  @override
  Widget build(BuildContext context) {
    final r = report;
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Icon(
          Icons.picture_as_pdf_outlined,
          color: r.isCurrent ? context.colors.primary : context.colors.outline,
        ),
        title: Text(r.title),
        subtitle: Text(
          [
            if (r.patientName != null) r.patientName!,
            if (r.version > 1) 'Version ${r.version}',
            if (r.isPartial) 'Partial',
            if (!r.isCurrent) 'Replaced by a newer version',
            if (r.releasedAt != null) formatDate(r.releasedAt!),
          ].join(' · '),
        ),
        trailing: r.isCurrent ? const Icon(Icons.lock_open_outlined) : null,
        onTap: r.isCurrent ? onOpen : null,
      ),
    );
  }
}

String _eventLabel(String event) => switch (event) {
  'booked' => 'Booking received',
  'payment_verified' => 'Payment received',
  'paid_at_visit' => 'Paid at the visit',
  'job_opened' => 'Added to the collection schedule',
  'assigned' => 'Collector assigned',
  'reassigned' => 'Collector changed',
  'acknowledged' => 'Collector confirmed the visit',
  'journey_started' => 'Collector started the journey',
  'approaching' => 'Collector is nearby',
  'arrived' => 'Collector arrived',
  'collected' => 'Samples collected',
  'partially_collected' => 'Some samples collected',
  'unsuccessful' => 'Collection not completed',
  'manifested' || 'custody_accepted' => 'Samples on the way to the lab',
  'lab_received' => 'Samples received at the lab',
  'lab_accepted' => 'Sample accepted for testing',
  'recollection_required' => 'A new sample is needed',
  'report_released' => 'Report released',
  'amended_report_released' => 'Corrected report released',
  'rescheduled' => 'Visit rescheduled',
  'cancelled' => 'Visit cancelled',
  'exception_delay' => 'Collector running late',
  _ => titleCase(event.replaceAll('lab_', '')),
};

class _Timeline extends StatelessWidget {
  const _Timeline({required this.entries});

  final List<TimelineEntry> entries;

  @override
  Widget build(BuildContext context) {
    final items = entries.reversed.toList();
    return Card(
      margin: const EdgeInsets.only(top: 12),
      child: ExpansionTile(
        shape: const Border(),
        title: const Text('Activity'),
        children: [
          for (final e in items)
            ListTile(
              dense: true,
              leading: const Icon(Icons.circle, size: 10),
              title: Text(_eventLabel(e.event)),
              subtitle: Text(
                [
                  formatDateTime(e.at),
                  if (e.details?['reason'] != null) '${e.details!['reason']}',
                  if (e.details?['note'] != null) '${e.details!['note']}',
                ].join(' · '),
              ),
            ),
        ],
      ),
    );
  }
}

class _Actions extends ConsumerWidget {
  const _Actions({required this.visit, required this.onCancel, required this.onReschedule});

  final HomeVisit visit;
  final VoidCallback onCancel;
  final VoidCallback onReschedule;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final support = ref.watch(siteSettingsProvider).value;
    if (visit.status == 'cancelled') return const SizedBox.shrink();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        if (visit.canReschedule)
          OutlinedButton.icon(
            onPressed: onReschedule,
            icon: const Icon(Icons.edit_calendar_outlined),
            label: const Text('Reschedule'),
          ),
        if (visit.canCancel) ...[
          const SizedBox(height: 8),
          TextButton(onPressed: onCancel, child: const Text('Cancel visit')),
        ],
        if (!visit.canCancel && support?.phoneE164 != null) ...[
          Text(
            'Need to change this visit, or have a question about a report? Contact QXL support.',
            style: context.text.bodySmall,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          OutlinedButton.icon(
            onPressed: () => Launch.phone(context, support!.phoneE164!),
            icon: const Icon(Icons.call_outlined),
            label: const Text('Call support'),
          ),
          if (support?.whatsappNumber != null)
            TextButton.icon(
              onPressed: () => Launch.whatsapp(context, support!.whatsappNumber!, text: 'Booking ${visit.reference}'),
              icon: const Icon(Icons.chat_outlined),
              label: const Text('WhatsApp support'),
            ),
        ],
      ],
    );
  }
}

class _RescheduleSheet extends ConsumerStatefulWidget {
  const _RescheduleSheet({required this.visit});

  final HomeVisit visit;

  @override
  ConsumerState<_RescheduleSheet> createState() => _RescheduleSheetState();
}

class _RescheduleSheetState extends ConsumerState<_RescheduleSheet> {
  late final List<DateTime> _days = List.generate(14, (i) {
    final n = DateTime.now();
    return DateTime(n.year, n.month, n.day + i);
  });
  late DateTime _day = _days.first;
  List<VisitSlot>? _slots;
  String? _slot;
  bool _saving = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final pin = widget.visit.pincode;
    setState(() => _slots = null);
    try {
      final slots = await ref.read(collectRepositoryProvider).slots(_day, pin);
      if (mounted) setState(() => _slots = slots);
    } catch (e) {
      if (mounted) setState(() => _error = describeError(e));
    }
  }

  Future<void> _save() async {
    if (_slot == null) return;
    setState(() {
      _saving = true;
      _error = null;
    });
    try {
      await ref.read(collectRepositoryProvider).reschedule(widget.visit.id, _day, _slot!);
      if (mounted) Navigator.pop(context, true);
    } catch (e) {
      if (mounted) setState(() => _error = describeError(e));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Pick a new time', style: context.text.titleLarge),
            const SizedBox(height: 12),
            SizedBox(
              height: 64,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  for (final d in _days)
                    Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: ChoiceChip(
                        label: Text(DateFormat('EEE d MMM').format(d)),
                        selected: d == _day,
                        onSelected: (_) {
                          setState(() {
                            _day = d;
                            _slot = null;
                          });
                          _load();
                        },
                      ),
                    ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            if (_slots == null)
              const LinearProgressIndicator()
            else if (_slots!.isEmpty)
              const Text('No slots on this day.')
            else
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  for (final s in _slots!)
                    ChoiceChip(
                      label: Text(s.label),
                      selected: _slot == s.label,
                      onSelected: s.available ? (_) => setState(() => _slot = s.label) : null,
                    ),
                ],
              ),
            if (_error != null) ...[
              const SizedBox(height: 8),
              Text(_error!, style: TextStyle(color: context.colors.error)),
            ],
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: FilledButton(
                onPressed: _slot == null || _saving ? null : _save,
                child: _saving
                    ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5))
                    : const Text('Confirm new time'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

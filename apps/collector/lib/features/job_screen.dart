import 'dart:async';

import 'package:flutter/services.dart';
import 'package:geolocator/geolocator.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:latlong2/latlong.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_core/qxl_core.dart';

import '../data/job_actions.dart';
import '../data/models.dart';
import '../data/providers.dart';
import '../tracking/location_sharing.dart';
import 'home_screen.dart';
import 'scan_screen.dart';

const checklistLabels = {
  'labels_verified_with_patient': 'Labels checked with the patient’s name and DOB',
  'pressure_applied_bleeding_stopped': 'Pressure applied; bleeding stopped',
  'patient_feeling_well': 'Patient feeling well; aftercare advice given',
  'sharps_disposed_safely': 'Sharps and waste disposed safely',
  'samples_stored_correctly': 'Samples stored at the right temperature',
};

class JobScreen extends ConsumerStatefulWidget {
  const JobScreen({super.key, required this.id});

  final String id;

  @override
  ConsumerState<JobScreen> createState() => _JobScreenState();
}

class _JobScreenState extends ConsumerState<JobScreen> {
  JobDetail? _job;
  bool _busy = false;

  JobDetail? _current(AsyncValue<(JobDetail, bool)> value) => _job ?? value.value?.$1;

  Future<void> _act(Future<ActionOutcome> Function() action, {String? done}) async {
    setState(() => _busy = true);
    try {
      final outcome = await action();
      if (!mounted) return;
      setState(() => _job = outcome.job);
      ref.invalidate(jobsProvider('today'));
      // Keeps the "done · to go" counters in the home header current.
      unawaited(ref.read(sessionProvider.notifier).refreshProfile());
      if (outcome.queued) {
        showSnack(context, 'Saved on this phone — it will sync when you’re back online.');
      } else if (done != null) {
        showSnack(context, done);
      }
    } catch (e) {
      if (mounted) {
        unawaited(HapticFeedback.heavyImpact());
        await showDialog<void>(
          context: context,
          builder: (context) => AlertDialog(
            icon: Icon(Icons.error_outline, color: context.colors.error),
            title: const Text('Can’t do that yet'),
            content: Text(describeError(e)),
            actions: [FilledButton(onPressed: () => Navigator.pop(context), child: const Text('OK'))],
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  Future<void> _start(JobDetail job) async {
    final sharing = ref.read(locationSharingProvider);
    final fix = await LocationSharing.currentFix();
    await _act(
      () => ref.read(jobActionsProvider).startJourney(job, lat: fix?.latitude, lng: fix?.longitude),
      done: 'Journey started',
    );
    if (_job?.status == 'en_route') {
      final ok = await sharing.start(job.id);
      if (!ok && mounted) showSnack(context, sharing.error ?? 'Location sharing is off.');
    }
  }

  Future<void> _arrive(JobDetail job) async {
    final fix = ref.read(locationSharingProvider).lastPosition ?? await LocationSharing.currentFix();
    await _act(
      () => ref.read(jobActionsProvider).arrive(job, lat: fix?.latitude, lng: fix?.longitude),
      done: 'Arrival recorded',
    );
    ref.read(locationSharingProvider).stop();
  }

  Future<void> _verify(JobDetail job) async {
    final result = await showModalBottomSheet<(bool, DateTime, String?)>(
      context: context,
      isScrollControlled: true,
      builder: (_) => _IdentitySheet(patientName: job.patientName),
    );
    if (result == null) return;
    await _act(
      () => ref
          .read(jobActionsProvider)
          .verifyIdentity(job, nameConfirmed: result.$1, statedDob: result.$2, visitCode: result.$3),
      done: 'Identity verified',
    );
  }

  Future<void> _scan(JobDetail job, {String? recollectOf}) async {
    final code = await scanBarcode(context);
    if (code == null || !mounted) return;
    final details = await showModalBottomSheet<_SpecimenInput>(
      context: context,
      isScrollControlled: true,
      builder: (_) => _SpecimenSheet(job: job, barcode: code),
    );
    if (details == null) return;
    await _act(
      () => ref
          .read(jobActionsProvider)
          .addSpecimen(
            job,
            barcode: code,
            containerType: details.container,
            bookingIds: details.bookingIds,
            volumeMl: details.volume,
            observations: details.observations,
            recollectOf: recollectOf,
          ),
      done: 'Label $code linked',
    );
  }

  Future<void> _void(JobDetail job, String barcode) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Void label $barcode?'),
        content: const Text('Use this only if the label was scanned by mistake. Discard that tube’s label.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancel')),
          FilledButton(onPressed: () => Navigator.pop(context, true), child: const Text('Void label')),
        ],
      ),
    );
    if (ok == true) await _act(() => ref.read(jobActionsProvider).voidSpecimen(job, barcode, 'Scanned in error'));
  }

  Future<void> _complete(JobDetail job) async {
    final input = await Navigator.of(context)
        .push<_CompletionInput>(MaterialPageRoute(builder: (_) => _CompleteScreen(job: job), fullscreenDialog: true));
    if (input == null) return;
    await _act(
      () => ref
          .read(jobActionsProvider)
          .complete(
            job,
            outcome: input.outcome,
            reason: input.reason,
            checklist: input.checklist,
            paymentMode: input.paymentMode,
            paymentReference: input.paymentReference,
          ),
      done: 'Visit closed',
    );
  }

  Future<void> _unsuccessful(JobDetail job) async {
    final reason = await _pickReason(context, 'Why couldn’t the collection happen?', const [
      'Patient not available',
      'Patient declined',
      'Patient not fasting as required',
      'Unable to draw sample',
      'Address not found',
      'Unsafe to proceed',
    ]);
    if (reason == null) return;
    await _act(
      () => ref.read(jobActionsProvider).complete(job, outcome: 'unsuccessful', reason: reason),
      done: 'Recorded',
    );
    ref.read(locationSharingProvider).stop();
  }

  Future<void> _issue(JobDetail job) async {
    final type = await showModalBottomSheet<String>(
      context: context,
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            for (final (key, label, icon) in const [
              ('delay', 'Running late', Icons.schedule),
              ('address_issue', 'Address or map pin is wrong', Icons.wrong_location_outlined),
              ('patient_unavailable', 'Patient not reachable', Icons.phone_missed_outlined),
              ('patient_unwell', 'Patient unwell', Icons.sick_outlined),
              ('vehicle_issue', 'Vehicle problem', Icons.two_wheeler_outlined),
              ('other', 'Something else', Icons.report_outlined),
            ])
              ListTile(leading: Icon(icon), title: Text(label), onTap: () => Navigator.pop(context, key)),
          ],
        ),
      ),
    );
    if (type == null || !mounted) return;
    final note = TextEditingController();
    final eta = TextEditingController();
    final send = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Tell dispatch'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (type == 'delay')
              TextField(
                controller: eta,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(labelText: 'Minutes late (approx.)'),
              ),
            TextField(
              controller: note,
              decoration: const InputDecoration(labelText: 'Details'),
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancel')),
          FilledButton(onPressed: () => Navigator.pop(context, true), child: const Text('Send')),
        ],
      ),
    );
    if (send != true) return;
    await _act(
      () => ref
          .read(jobActionsProvider)
          .reportException(
            job,
            type: type,
            note: note.text.trim().isEmpty ? null : note.text.trim(),
            etaMinutes: int.tryParse(eta.text.trim()),
          ),
      done: 'Dispatch informed',
    );
  }

  @override
  Widget build(BuildContext context) {
    final value = ref.watch(jobProvider(widget.id));
    final sharing = ref.watch(locationSharingProvider);
    final job = _current(value);
    if (job == null) {
      return Scaffold(
        appBar: AppBar(),
        body: AsyncValueView(
          value: value,
          onRetry: () => ref.invalidate(jobProvider(widget.id)),
          data: (_) => const SizedBox(),
        ),
      );
    }
    final pendingSync = ref.watch(offlineQueueProvider).hasPendingFor(job.id);
    return Scaffold(
      appBar: AppBar(
        title: Text(job.reference),
        actions: [
          if (job.isOpen)
            IconButton(
              tooltip: 'Report an issue',
              onPressed: _busy ? null : () => _issue(job),
              icon: const Icon(Icons.flag_outlined),
            ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          await ref.read(offlineQueueProvider).flush();
          setState(() => _job = null);
          ref.invalidate(jobProvider(widget.id));
        },
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 120),
          children: [
            const SyncBanner(),
            Row(
              children: [
                Expanded(
                  child: Text(
                    '${DateFormat('EEE d MMM').format(job.slotDate)} · ${job.slotLabel}',
                    style: context.text.titleMedium,
                  ),
                ),
                StatusPill(label: jobStatusLabel(job.status), tone: jobTone(job.status)),
              ],
            ),
            if (pendingSync)
              Padding(
                padding: const EdgeInsets.only(top: 6),
                child: Text('Changes on this job are waiting to sync.', style: context.text.bodySmall),
              ),
            if (job.kind == 'recollection')
              Padding(
                padding: const EdgeInsets.only(top: 8),
                child: MedicalNotice(
                  text:
                      'Recollection: the lab could not use the earlier sample'
                      '${job.recollect.isNotEmpty ? ' (${job.recollect.map((r) => '${r['container_type']}: ${r['reason'] ?? 'rejected'}').join(', ')})' : ''}. '
                      'Use NEW labels.',
                ),
              ),
            const SizedBox(height: 12),
            _PatientCard(job: job),
            const SizedBox(height: 12),
            _AddressCard(job: job, myPosition: sharing.activeJobId == job.id ? sharing.lastPosition : null),
            if (job.status == 'en_route' && sharing.activeJobId == job.id)
              Padding(
                padding: const EdgeInsets.only(top: 8),
                child: Row(
                  children: [
                    Icon(Icons.share_location, color: context.status.success, size: 18),
                    const SizedBox(width: 6),
                    Text('Sharing your location with the patient', style: context.text.bodySmall),
                  ],
                ),
              ),
            const SectionHeader(title: 'Tests & containers', padding: EdgeInsets.fromLTRB(0, 20, 0, 8)),
            for (final r in job.requirements) _RequirementTile(req: r),
            if (job.notes != null) ...[const SizedBox(height: 8), MedicalNotice(text: 'Booking note: ${job.notes}')],
            if (job.status == 'arrived' || job.specimens.isNotEmpty) ...[
              const SectionHeader(title: 'Specimens', padding: EdgeInsets.fromLTRB(0, 20, 0, 8)),
              if (job.specimens.isEmpty)
                Text('No labels scanned yet.', style: context.text.bodyMedium)
              else
                for (final s in job.specimens)
                  Card(
                    margin: const EdgeInsets.only(bottom: 8),
                    child: ListTile(
                      leading: const Icon(Icons.qr_code_2),
                      title: Text(s.barcode),
                      subtitle: Text(
                        '${s.containerType} · ${s.bookingIds.length} test(s)${s.pendingSync ? ' · waiting to sync' : ''}',
                      ),
                      trailing: job.status == 'arrived' && !s.pendingSync
                          ? IconButton(
                              tooltip: 'Void label ${s.barcode}',
                              icon: const Icon(Icons.delete_outline),
                              onPressed: _busy ? null : () => _void(job, s.barcode),
                            )
                          : null,
                    ),
                  ),
              if (job.status == 'arrived' && job.uncovered.isNotEmpty)
                Text(
                  'Still needed: ${job.uncovered.map((r) => r.name).join(', ')}',
                  style: context.text.bodySmall?.copyWith(color: context.status.warning),
                ),
            ],
            if (!job.isOpen) ...[
              const SizedBox(height: 16),
              MedicalNotice(
                text: job.outcomeReason == null
                    ? 'This visit is closed (${jobStatusLabel(job.status)}).'
                    : 'Closed: ${job.outcomeReason}',
              ),
            ],
          ],
        ),
      ),
      bottomNavigationBar: job.isOpen && job.visitStatus != 'cancelled'
          ? BottomActionBar(child: _primaryActions(job))
          : null,
    );
  }

  Widget _primaryActions(JobDetail job) {
    Widget button(String label, IconData icon, VoidCallback onTap) => SizedBox(
      width: double.infinity,
      child: FilledButton.icon(
        onPressed: _busy ? null : onTap,
        icon: _busy
            ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2))
            : Icon(icon),
        label: Text(label),
      ),
    );
    final secondary = TextButton(
      onPressed: _busy ? null : () => _unsuccessful(job),
      child: const Text('Couldn’t collect'),
    );
    return switch (job.status) {
      'assigned' => button(
        'Acknowledge visit',
        Icons.check,
        () => _act(() => ref.read(jobActionsProvider).acknowledge(job)),
      ),
      'acknowledged' => Column(
        mainAxisSize: MainAxisSize.min,
        children: [button('Start journey', Icons.navigation_outlined, () => _start(job)), secondary],
      ),
      'en_route' => Column(
        mainAxisSize: MainAxisSize.min,
        children: [button('I have arrived', Icons.door_front_door_outlined, () => _arrive(job)), secondary],
      ),
      'arrived' when !job.identityVerified => Column(
        mainAxisSize: MainAxisSize.min,
        children: [button('Verify patient identity', Icons.badge_outlined, () => _verify(job)), secondary],
      ),
      'arrived' => Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            children: [
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: _busy
                      ? null
                      : () => _scan(
                          job,
                          recollectOf: job.recollect.isNotEmpty ? job.recollect.first['barcode'] as String? : null,
                        ),
                  icon: const Icon(Icons.qr_code_scanner),
                  label: const Text('Scan label'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: FilledButton(
                  onPressed: _busy || job.specimens.isEmpty ? null : () => _complete(job),
                  child: const Text('Finish'),
                ),
              ),
            ],
          ),
          secondary,
        ],
      ),
      _ => const SizedBox.shrink(),
    };
  }
}

Future<String?> _pickReason(BuildContext context, String title, List<String> options) async {
  final other = TextEditingController();
  return showModalBottomSheet<String>(
    context: context,
    isScrollControlled: true,
    builder: (context) => SafeArea(
      child: Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.viewInsetsOf(context).bottom),
        child: ListView(
          shrinkWrap: true,
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
          children: [
            Text(title, style: context.text.titleMedium),
            for (final o in options) ListTile(title: Text(o), onTap: () => Navigator.pop(context, o)),
            TextField(
              controller: other,
              decoration: const InputDecoration(labelText: 'Other reason'),
            ),
            const SizedBox(height: 8),
            FilledButton(
              onPressed: () => other.text.trim().isEmpty ? null : Navigator.pop(context, other.text.trim()),
              child: const Text('Use this reason'),
            ),
          ],
        ),
      ),
    ),
  );
}

class _PatientCard extends StatelessWidget {
  const _PatientCard({required this.job});

  final JobDetail job;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            const CircleAvatar(child: Icon(Icons.person_outline)),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(job.patientName, style: context.text.titleMedium),
                  Text(
                    [
                      if (job.patientAge != null) '${job.patientAge} yrs',
                      if (job.patientGender != null) titleCase(job.patientGender!),
                      if (job.identityVerified) 'identity verified',
                    ].join(' · '),
                    style: context.text.bodySmall,
                  ),
                  if (job.amountDuePaise > 0)
                    Text(
                      'Collect ${formatPaise(job.amountDuePaise)} (cash or UPI)',
                      style: context.text.labelLarge?.copyWith(color: Brand.navy),
                    ),
                ],
              ),
            ),
            if (job.patientPhone != null)
              IconButton.filledTonal(
                tooltip: 'Call patient',
                onPressed: () => Launch.phone(context, job.patientPhone!),
                icon: const Icon(Icons.call_outlined),
              ),
          ],
        ),
      ),
    );
  }
}

class _AddressCard extends ConsumerWidget {
  const _AddressCard({required this.job, this.myPosition});

  final JobDetail job;
  final Position? myPosition;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final config = ref.watch(appConfigProvider);
    final pins = [
      if (job.hasPin) MapPin(point: LatLng(job.lat!, job.lng!), kind: MapPinKind.home, label: 'Patient location'),
      if (myPosition != null)
        MapPin(point: LatLng(myPosition!.latitude, myPosition!.longitude), kind: MapPinKind.collector, label: 'You'),
    ];
    return Card(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (pins.isNotEmpty)
            SizedBox(
              height: 200,
              child: QxlMap(config: config, pins: pins, fitPins: pins.length > 1, zoom: 17),
            ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(job.addressLine, style: context.text.bodyLarge),
                if (job.addressInstructions != null) ...[
                  const SizedBox(height: 6),
                  Text('Directions: ${job.addressInstructions}', style: context.text.bodyMedium),
                ],
                if (!job.hasPin)
                  Padding(
                    padding: const EdgeInsets.only(top: 6),
                    child: Text(
                      'No map pin — call the patient if the address is unclear.',
                      style: TextStyle(color: context.colors.error),
                    ),
                  ),
                const SizedBox(height: 10),
                FilledButton.tonalIcon(
                  onPressed: () => Launch.directions(context, lat: job.lat, lng: job.lng, query: job.addressLine),
                  icon: const Icon(Icons.directions_outlined),
                  label: const Text('Navigate'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _RequirementTile extends StatelessWidget {
  const _RequirementTile({required this.req});

  final Requirement req;

  @override
  Widget build(BuildContext context) {
    final lines = [
      if (req.containerType != null) 'Container: ${req.containerType}',
      if (req.sampleType != null) 'Sample: ${req.sampleType}',
      if (req.fastingRequired == true) 'Fasting required',
      if (req.preparation != null) req.preparation!,
      if (req.instructions != null) req.instructions!,
    ];
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Icon(Icons.science_outlined, color: Brand.accentFor(req.containerType ?? req.name)),
        title: Text(req.name),
        subtitle: Text(lines.isEmpty ? 'Container not specified in catalogue — follow lab SOP.' : lines.join('\n')),
        isThreeLine: lines.length > 1,
      ),
    );
  }
}

class _IdentitySheet extends StatefulWidget {
  const _IdentitySheet({required this.patientName});

  final String patientName;

  @override
  State<_IdentitySheet> createState() => _IdentitySheetState();
}

class _IdentitySheetState extends State<_IdentitySheet> {
  bool _nameMatches = false;
  final _dob = TextEditingController();
  final _code = TextEditingController();
  String? _error;

  DateTime? _parseDob() {
    final parts = _dob.text.trim().split(RegExp(r'[/\-. ]'));
    if (parts.length != 3) return null;
    final d = int.tryParse(parts[0]), m = int.tryParse(parts[1]), y = int.tryParse(parts[2]);
    if (d == null || m == null || y == null || y < 1900) return null;
    final date = DateTime(y, m, d);
    return date.day == d && date.month == m ? date : null;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: MediaQuery.viewInsetsOf(context).bottom),
      child: SafeArea(
        child: ListView(
          shrinkWrap: true,
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
          children: [
            Text('Verify the patient', style: context.text.titleLarge),
            const SizedBox(height: 6),
            const Text('Ask the patient to say their full name and date of birth. Don’t read them out yourself.'),
            const SizedBox(height: 12),
            CheckboxListTile(
              contentPadding: EdgeInsets.zero,
              value: _nameMatches,
              onChanged: (v) => setState(() => _nameMatches = v ?? false),
              title: Text('The name they said matches: ${widget.patientName}'),
            ),
            TextField(
              controller: _dob,
              keyboardType: TextInputType.datetime,
              inputFormatters: [
                FilteringTextInputFormatter.allow(RegExp(r'[0-9/]')),
                LengthLimitingTextInputFormatter(10),
              ],
              decoration: const InputDecoration(labelText: 'Date of birth they said', hintText: 'DD/MM/YYYY'),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _code,
              keyboardType: TextInputType.number,
              inputFormatters: [FilteringTextInputFormatter.digitsOnly, LengthLimitingTextInputFormatter(4)],
              decoration: const InputDecoration(
                labelText: 'Visit code (optional)',
                helperText: 'Ask for the 4-digit code in their QXL app if anything is unclear.',
              ),
            ),
            if (_error != null) ...[
              const SizedBox(height: 8),
              Text(_error!, style: TextStyle(color: context.colors.error)),
            ],
            const SizedBox(height: 16),
            FilledButton(
              onPressed: () {
                final dob = _parseDob();
                if (dob == null) {
                  setState(() => _error = 'Enter the date of birth as DD/MM/YYYY.');
                  return;
                }
                Navigator.pop(context, (_nameMatches, dob, _code.text.trim().isEmpty ? null : _code.text.trim()));
              },
              child: const Text('Check identity'),
            ),
          ],
        ),
      ),
    );
  }
}

class _SpecimenInput {
  const _SpecimenInput(this.container, this.bookingIds, this.volume, this.observations);
  final String container;
  final List<String> bookingIds;
  final double? volume;
  final String? observations;
}

class _SpecimenSheet extends StatefulWidget {
  const _SpecimenSheet({required this.job, required this.barcode});

  final JobDetail job;
  final String barcode;

  @override
  State<_SpecimenSheet> createState() => _SpecimenSheetState();
}

class _SpecimenSheetState extends State<_SpecimenSheet> {
  late String _container;
  late final Set<String> _tests;
  final _volume = TextEditingController();
  final _notes = TextEditingController();

  @override
  void initState() {
    super.initState();
    final first = widget.job.uncovered.isNotEmpty ? widget.job.uncovered.first : null;
    final suggested = first?.containerType;
    _container = containerTypes.firstWhere(
      (c) => suggested != null && suggested.toLowerCase().contains(c.toLowerCase().split(' ').first),
      orElse: () => containerTypes.first,
    );
    // Preselect uncovered tests that need the same container.
    _tests = {
      for (final r in widget.job.uncovered)
        if (first == null || r.containerType == first.containerType) r.bookingId,
    };
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: MediaQuery.viewInsetsOf(context).bottom),
      child: SafeArea(
        child: ListView(
          shrinkWrap: true,
          padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
          children: [
            Text('Label ${widget.barcode}', style: context.text.titleLarge),
            const SizedBox(height: 4),
            Text('Stick this label on the tube in front of the patient before drawing.', style: context.text.bodySmall),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              isExpanded: true,
              initialValue: _container,
              decoration: const InputDecoration(labelText: 'Container'),
              items: [for (final c in containerTypes) DropdownMenuItem(value: c, child: Text(c))],
              onChanged: (v) => setState(() => _container = v ?? _container),
            ),
            const SizedBox(height: 8),
            Text('Tests in this tube', style: context.text.titleSmall),
            for (final r in widget.job.requirements)
              CheckboxListTile(
                contentPadding: EdgeInsets.zero,
                value: _tests.contains(r.bookingId),
                onChanged: (v) => setState(() => v == true ? _tests.add(r.bookingId) : _tests.remove(r.bookingId)),
                title: Text(r.name),
                subtitle: r.containerType == null ? null : Text('Needs ${r.containerType}'),
              ),
            TextField(
              controller: _volume,
              keyboardType: const TextInputType.numberWithOptions(decimal: true),
              decoration: const InputDecoration(labelText: 'Volume (ml, optional)'),
            ),
            const SizedBox(height: 8),
            TextField(
              controller: _notes,
              decoration: const InputDecoration(labelText: 'Observations (optional)'),
            ),
            const SizedBox(height: 16),
            FilledButton(
              onPressed: _tests.isEmpty
                  ? null
                  : () => Navigator.pop(
                      context,
                      _SpecimenInput(
                        _container,
                        _tests.toList(),
                        double.tryParse(_volume.text.trim()),
                        _notes.text.trim().isEmpty ? null : _notes.text.trim(),
                      ),
                    ),
              child: const Text('Link label'),
            ),
          ],
        ),
      ),
    );
  }
}

class _CompletionInput {
  const _CompletionInput(this.outcome, this.reason, this.checklist, this.paymentMode, this.paymentReference);
  final String outcome;
  final String? reason;
  final Map<String, bool> checklist;
  final String? paymentMode;
  final String? paymentReference;
}

class _CompleteScreen extends StatefulWidget {
  const _CompleteScreen({required this.job});

  final JobDetail job;

  @override
  State<_CompleteScreen> createState() => _CompleteScreenState();
}

class _CompleteScreenState extends State<_CompleteScreen> {
  late String _outcome = widget.job.uncovered.isEmpty ? 'collected' : 'partially_collected';
  final _reason = TextEditingController();
  final _ref = TextEditingController();
  late final Map<String, bool> _checks = {for (final k in widget.job.checklistKeys) k: false};
  String? _payMode;

  bool get _ready =>
      _checks.values.every((v) => v) &&
      (_outcome == 'collected' || _reason.text.trim().isNotEmpty) &&
      (widget.job.amountDuePaise == 0 || (_payMode == 'cash' || (_payMode == 'upi' && _ref.text.trim().isNotEmpty)));

  @override
  Widget build(BuildContext context) {
    final job = widget.job;
    return Scaffold(
      appBar: AppBar(title: const Text('Finish collection')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          RadioGroup<String>(
            groupValue: _outcome,
            onChanged: (v) => setState(() => _outcome = v ?? _outcome),
            child: Column(
              children: [
                RadioListTile<String>(
                  value: 'collected',
                  enabled: job.uncovered.isEmpty,
                  title: const Text('All samples collected'),
                  subtitle: job.uncovered.isEmpty
                      ? null
                      : Text('Missing: ${job.uncovered.map((r) => r.name).join(', ')}'),
                ),
                const RadioListTile<String>(value: 'partially_collected', title: Text('Partly collected')),
              ],
            ),
          ),
          if (_outcome == 'partially_collected')
            TextField(
              controller: _reason,
              onChanged: (_) => setState(() {}),
              decoration: const InputDecoration(labelText: 'Why is it partial?'),
            ),
          const SectionHeader(title: 'Aftercare checklist', padding: EdgeInsets.fromLTRB(0, 20, 0, 4)),
          for (final key in _checks.keys)
            CheckboxListTile(
              contentPadding: EdgeInsets.zero,
              value: _checks[key],
              onChanged: (v) => setState(() => _checks[key] = v ?? false),
              title: Text(checklistLabels[key] ?? titleCase(key)),
            ),
          if (job.amountDuePaise > 0) ...[
            const SectionHeader(title: 'Payment', padding: EdgeInsets.fromLTRB(0, 20, 0, 4)),
            Text('Collect ${formatPaise(job.amountDuePaise)} from the patient.', style: context.text.titleMedium),
            RadioGroup<String>(
              groupValue: _payMode,
              onChanged: (v) => setState(() => _payMode = v),
              child: const Column(
                children: [
                  RadioListTile<String>(value: 'cash', title: Text('Cash received')),
                  RadioListTile<String>(value: 'upi', title: Text('UPI received')),
                ],
              ),
            ),
            if (_payMode == 'upi')
              TextField(
                controller: _ref,
                onChanged: (_) => setState(() {}),
                decoration: const InputDecoration(labelText: 'UPI transaction reference'),
              ),
          ],
        ],
      ),
      bottomNavigationBar: BottomActionBar(
        child: FilledButton(
          onPressed: _ready
              ? () => Navigator.pop(
                  context,
                  _CompletionInput(
                    _outcome,
                    _reason.text.trim().isEmpty ? null : _reason.text.trim(),
                    _checks,
                    _payMode,
                    _ref.text.trim().isEmpty ? null : _ref.text.trim(),
                  ),
                )
              : null,
          child: const Text('Close the visit'),
        ),
      ),
    );
  }
}

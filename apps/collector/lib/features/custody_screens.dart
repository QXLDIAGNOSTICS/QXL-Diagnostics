import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_core/qxl_core.dart';

import '../data/models.dart';
import '../data/offline_store.dart';
import '../data/providers.dart';
import 'home_screen.dart';
import 'scan_screen.dart';

/// Collector → courier (or straight to a lab). Every tube going into the bag
/// is scanned again so nothing is handed over by assumption.
class HandoverScreen extends ConsumerStatefulWidget {
  const HandoverScreen({super.key});

  @override
  ConsumerState<HandoverScreen> createState() => _HandoverScreenState();
}

class _HandoverScreenState extends ConsumerState<HandoverScreen> {
  final _scanned = <String>{};
  final _courier = TextEditingController();
  final _container = TextEditingController();
  String? _centreId;
  bool _toLab = false;
  bool _sealIntact = true;
  bool _busy = false;

  @override
  void dispose() {
    _courier.dispose();
    _container.dispose();
    super.dispose();
  }

  Future<void> _scan(List<CollectedSpecimen> mine) async {
    final code = await scanBarcode(context, title: 'Scan tube into the bag');
    if (code == null || !mounted) return;
    if (!mine.any((s) => s.barcode == code)) {
      showSnack(context, '$code isn’t in your custody.');
      return;
    }
    setState(() => _scanned.add(code));
  }

  Future<void> _submit() async {
    if (_scanned.isEmpty) return;
    if (!_toLab && _courier.text.trim().isEmpty) {
      showSnack(context, 'Enter the courier’s employee code.');
      return;
    }
    if (_toLab && _centreId == null) {
      showSnack(context, 'Choose the lab you are delivering to.');
      return;
    }
    setState(() => _busy = true);
    try {
      final sent = await ref
          .read(offlineQueueProvider)
          .submit(
            path: '/manifests',
            label: 'Handover of ${_scanned.length} specimen(s)',
            body: {
              'barcodes': _scanned.toList(),
              if (!_toLab) 'handover_to_code': _courier.text.trim().toUpperCase(),
              if (_toLab) 'destination_center_id': _centreId,
              if (_container.text.trim().isNotEmpty) 'container_ref': _container.text.trim(),
              'seal_intact': _sealIntact,
            },
          );
      if (!mounted) return;
      ref.invalidate(mySpecimensProvider);
      showSnack(
        context,
        sent.result == SubmitResult.queued
            ? 'Handover saved — it will sync when online.'
            : (_toLab
                  ? 'Manifest created. The lab will scan to receive.'
                  : 'Handed over. The courier must scan to accept.'),
      );
      context.pop();
    } catch (e) {
      if (mounted) showSnack(context, describeError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final specimens = ref.watch(mySpecimensProvider);
    final centres = ref.watch(centresProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Hand over specimens')),
      body: AsyncValueView<List<CollectedSpecimen>>(
        value: specimens,
        onRetry: () => ref.invalidate(mySpecimensProvider),
        data: (mine) {
          final available = mine.where((s) => s.status == 'collected' || s.status == 'in_transit').toList();
          if (available.isEmpty) {
            return const EmptyState(
              icon: Icons.inventory_2_outlined,
              title: 'No specimens with you',
              message: 'Collected tubes appear here.',
            );
          }
          return ListView(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 120),
            children: [
              const SyncBanner(),
              Text(
                '${available.length} specimen(s) with you · ${_scanned.length} scanned into the bag',
                style: context.text.titleSmall,
              ),
              const SizedBox(height: 8),
              for (final s in available)
                CheckboxListTile(
                  value: _scanned.contains(s.barcode),
                  onChanged: null,
                  title: Text(s.barcode),
                  subtitle: Text(
                    '${s.containerType}${s.collectedAt != null ? ' · ${formatDateTime(s.collectedAt!)}' : ''}',
                  ),
                  secondary: Icon(
                    _scanned.contains(s.barcode) ? Icons.check_circle : Icons.radio_button_unchecked,
                    color: _scanned.contains(s.barcode) ? context.status.success : context.colors.outline,
                  ),
                ),
              OutlinedButton.icon(
                onPressed: () => _scan(available),
                icon: const Icon(Icons.qr_code_scanner),
                label: const Text('Scan next tube'),
              ),
              const SectionHeader(title: 'Hand to', padding: EdgeInsets.fromLTRB(0, 20, 0, 8)),
              SegmentedButton<bool>(
                segments: const [
                  ButtonSegment(value: false, label: Text('Courier'), icon: Icon(Icons.two_wheeler)),
                  ButtonSegment(value: true, label: Text('Lab directly'), icon: Icon(Icons.science_outlined)),
                ],
                selected: {_toLab},
                onSelectionChanged: (v) => setState(() => _toLab = v.first),
              ),
              const SizedBox(height: 12),
              if (!_toLab)
                TextField(
                  controller: _courier,
                  textCapitalization: TextCapitalization.characters,
                  decoration: const InputDecoration(
                    labelText: 'Courier employee code',
                    helperText: 'From their QXL ID card',
                  ),
                )
              else
                centres.when(
                  loading: () => const LinearProgressIndicator(),
                  error: (e, _) => ErrorState(error: e, compact: true, onRetry: () => ref.invalidate(centresProvider)),
                  data: (list) => DropdownButtonFormField<String>(
                    isExpanded: true,
                    initialValue: _centreId,
                    decoration: const InputDecoration(labelText: 'Destination lab'),
                    items: [
                      for (final c in list)
                        DropdownMenuItem(
                          value: c.id,
                          child: Text(c.name, overflow: TextOverflow.ellipsis),
                        ),
                    ],
                    onChanged: (v) => setState(() => _centreId = v),
                  ),
                ),
              const SizedBox(height: 12),
              TextField(
                controller: _container,
                decoration: const InputDecoration(labelText: 'Box / bag ID (optional)'),
              ),
              SwitchListTile(
                contentPadding: EdgeInsets.zero,
                title: const Text('Seal intact'),
                value: _sealIntact,
                onChanged: (v) => setState(() => _sealIntact = v),
              ),
            ],
          );
        },
      ),
      bottomNavigationBar: BottomActionBar(
        child: FilledButton(
          onPressed: _busy || _scanned.isEmpty ? null : _submit,
          child: _busy
              ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5))
              : Text('Hand over ${_scanned.length} specimen(s)'),
        ),
      ),
    );
  }
}

/// Courier view of a manifest: accept by scanning every tube, then pass on
/// to another courier or set the destination lab.
class ManifestScreen extends ConsumerStatefulWidget {
  const ManifestScreen({super.key, required this.manifest});

  final Manifest manifest;

  @override
  ConsumerState<ManifestScreen> createState() => _ManifestScreenState();
}

class _ManifestScreenState extends ConsumerState<ManifestScreen> {
  final _scanned = <String>{};
  bool _sealIntact = true;
  bool _busy = false;

  bool get _awaitingMe => widget.manifest.status == 'open';

  Future<void> _scan() async {
    final code = await scanBarcode(context, title: 'Scan tube to accept');
    if (code == null || !mounted) return;
    if (!widget.manifest.specimens.any((s) => s.barcode == code)) {
      showSnack(context, '$code isn’t part of ${widget.manifest.reference}. Don’t accept it — report it to dispatch.');
      return;
    }
    setState(() => _scanned.add(code));
  }

  Future<void> _accept() async {
    final missing = widget.manifest.specimens.where((s) => !_scanned.contains(s.barcode)).toList();
    if (missing.isNotEmpty) {
      final ok = await showDialog<bool>(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Some tubes weren’t scanned'),
          content: Text(
            '${missing.map((s) => s.barcode).join(', ')} will be reported as MISSING at handover. Continue only if they are really not in the bag.',
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Keep scanning')),
            FilledButton(onPressed: () => Navigator.pop(context, true), child: const Text('Report missing & accept')),
          ],
        ),
      );
      if (ok != true) return;
    }
    await _send('/manifests/${widget.manifest.id}/accept', {
      'barcodes': _scanned.toList(),
      'seal_intact': _sealIntact,
    }, 'Accept ${widget.manifest.reference}');
  }

  Future<void> _transfer() async {
    final code = TextEditingController();
    String? centre;
    final centres = await ref.read(centresProvider.future).catchError((_) => <LabCentre>[]);
    if (!mounted) return;
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setLocal) => AlertDialog(
          title: const Text('Pass on or set destination'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: code,
                decoration: const InputDecoration(labelText: 'Next courier code (optional)'),
              ),
              const SizedBox(height: 8),
              DropdownButtonFormField<String>(
                isExpanded: true,
                initialValue: centre,
                decoration: const InputDecoration(labelText: 'Destination lab'),
                items: [
                  for (final c in centres)
                    DropdownMenuItem(
                      value: c.id,
                      child: Text(c.name, overflow: TextOverflow.ellipsis),
                    ),
                ],
                onChanged: (v) => setLocal(() => centre = v),
              ),
            ],
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancel')),
            FilledButton(onPressed: () => Navigator.pop(context, true), child: const Text('Save')),
          ],
        ),
      ),
    );
    if (ok != true) return;
    await _send('/manifests/${widget.manifest.id}/transfer', {
      if (code.text.trim().isNotEmpty) 'handover_to_code': code.text.trim().toUpperCase(),
      'destination_center_id': ?centre,
    }, 'Update ${widget.manifest.reference}');
  }

  Future<void> _send(String path, Json body, String label) async {
    setState(() => _busy = true);
    try {
      final sent = await ref.read(offlineQueueProvider).submit(path: path, body: body, label: label);
      if (!mounted) return;
      ref.invalidate(courierManifestsProvider);
      showSnack(context, sent.result == SubmitResult.queued ? 'Saved — will sync when online.' : 'Done');
      context.pop();
    } catch (e) {
      if (mounted) showSnack(context, describeError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final m = widget.manifest;
    return Scaffold(
      appBar: AppBar(title: Text(m.reference)),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 120),
        children: [
          Text(
            _awaitingMe
                ? 'Scan every tube in the bag to accept custody.'
                : 'In your custody${m.destinationName != null ? ' · to ${m.destinationName}' : ''}.',
            style: context.text.titleSmall,
          ),
          const SizedBox(height: 8),
          for (final s in m.specimens)
            ListTile(
              leading: Icon(
                !_awaitingMe || _scanned.contains(s.barcode) ? Icons.check_circle : Icons.radio_button_unchecked,
                color: !_awaitingMe || _scanned.contains(s.barcode) ? context.status.success : context.colors.outline,
              ),
              title: Text(s.barcode),
              subtitle: Text(s.containerType),
            ),
          if (_awaitingMe) ...[
            OutlinedButton.icon(
              onPressed: _scan,
              icon: const Icon(Icons.qr_code_scanner),
              label: const Text('Scan tube'),
            ),
            SwitchListTile(
              contentPadding: EdgeInsets.zero,
              title: const Text('Bag seal intact'),
              value: _sealIntact,
              onChanged: (v) => setState(() => _sealIntact = v),
            ),
          ],
        ],
      ),
      bottomNavigationBar: BottomActionBar(
        child: FilledButton(
          onPressed: _busy ? null : (_awaitingMe ? (_scanned.isEmpty ? null : _accept) : _transfer),
          child: Text(
            _awaitingMe ? 'Accept custody (${_scanned.length}/${m.specimens.length})' : 'Pass on / set destination',
          ),
        ),
      ),
    );
  }
}

/// Pending offline actions; rejected ones must be reviewed, never dropped silently.
class SyncScreen extends ConsumerWidget {
  const SyncScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final queue = ref.watch(offlineQueueProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Sync')),
      body: queue.ops.isEmpty
          ? const EmptyState(icon: Icons.cloud_done_outlined, title: 'Everything is synced')
          : ListView(
              padding: const EdgeInsets.all(16),
              children: [
                Text(
                  queue.online ? 'Online' : 'Offline — actions are stored securely on this phone.',
                  style: context.text.titleSmall,
                ),
                const SizedBox(height: 8),
                for (final op in queue.ops)
                  Card(
                    color: op.needsAttention ? context.colors.errorContainer : null,
                    child: ListTile(
                      leading: Icon(op.needsAttention ? Icons.error_outline : Icons.schedule),
                      title: Text(op.label),
                      subtitle: Text(
                        op.needsAttention ? 'Rejected: ${op.error}' : 'Waiting since ${formatDateTime(op.createdAt)}',
                      ),
                      trailing: op.needsAttention
                          ? TextButton(
                              onPressed: () async {
                                final ok = await showDialog<bool>(
                                  context: context,
                                  builder: (context) => AlertDialog(
                                    title: const Text('Discard this action?'),
                                    content: const Text('Contact dispatch so they can correct the record.'),
                                    actions: [
                                      TextButton(
                                        onPressed: () => Navigator.pop(context, false),
                                        child: const Text('Keep'),
                                      ),
                                      FilledButton(
                                        onPressed: () => Navigator.pop(context, true),
                                        child: const Text('Discard'),
                                      ),
                                    ],
                                  ),
                                );
                                if (ok == true) await queue.discard(op.id);
                              },
                              child: const Text('Discard'),
                            )
                          : null,
                    ),
                  ),
              ],
            ),
      bottomNavigationBar: queue.ops.isEmpty
          ? null
          : BottomActionBar(
              child: FilledButton.icon(
                onPressed: queue.flush,
                icon: const Icon(Icons.sync),
                label: const Text('Sync now'),
              ),
            ),
    );
  }
}

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final me = ref.watch(sessionProvider).value;
    if (me == null) return const Scaffold(body: LoadingState());
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return Scaffold(
      appBar: AppBar(title: const Text('My profile')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Center(
            child: ClipOval(
              child: SizedBox(width: 96, height: 96, child: NetImage(me.photoUrl, fallbackIcon: Icons.person_outline)),
            ),
          ),
          const SizedBox(height: 12),
          Text(me.name, style: context.text.headlineSmall, textAlign: TextAlign.center),
          Text('${titleCase(me.role)} · ${me.employeeCode}', textAlign: TextAlign.center),
          const SizedBox(height: 16),
          Card(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Column(
                children: [
                  FactRow(icon: Icons.map_outlined, label: 'Zone', value: me.zone),
                  FactRow(icon: Icons.schedule, label: 'Shift', value: '${me.shiftStart} – ${me.shiftEnd}'),
                  FactRow(
                    icon: Icons.calendar_month_outlined,
                    label: 'Working days',
                    value: me.workingDays.map((d) => d >= 0 && d < 7 ? days[d] : '?').join(', '),
                  ),
                  if (me.qualification != null)
                    FactRow(icon: Icons.school_outlined, label: 'Qualification', value: me.qualification!),
                  if (me.competencies.isNotEmpty)
                    FactRow(
                      icon: Icons.verified_outlined,
                      label: 'Competencies',
                      value: me.competencies.map(titleCase).join(', '),
                    ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          ListTile(
            leading: const Icon(Icons.sync),
            title: const Text('Sync status'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => context.push('/sync'),
          ),
          ListTile(
            leading: const Icon(Icons.password),
            title: const Text('Change password'),
            subtitle: const Text('Codes go to your phone and email. You’ll sign in again afterwards.'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () async {
              if (ref.read(offlineQueueProvider).pendingCount > 0) {
                showSnack(context, 'Sync your saved actions first — changing the password signs you out.');
                return;
              }
              try {
                final account = await ref.read(repositoryProvider).me();
                if (!context.mounted) return;
                await context.push('/change-password', extra: account?.email ?? account?.phone);
              } catch (e) {
                if (context.mounted) showSnack(context, describeError(e));
              }
            },
          ),
          const SizedBox(height: 16),
          OutlinedButton.icon(
            onPressed: () async {
              try {
                await ref.read(sessionProvider.notifier).signOut();
              } catch (e) {
                if (context.mounted) showSnack(context, describeError(e));
              }
            },
            icon: const Icon(Icons.logout),
            label: const Text('Sign out'),
          ),
        ],
      ),
    );
  }
}

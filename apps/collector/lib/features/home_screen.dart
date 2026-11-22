import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_core/qxl_core.dart';

import '../data/models.dart';
import '../data/providers.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final me = ref.watch(sessionProvider).value;
    if (me == null) return const Scaffold(body: LoadingState());
    if (me.isCourier) return const _CourierHome();
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: Brand.navy,
          foregroundColor: Colors.white,
          titleTextStyle: context.text.titleLarge?.copyWith(color: Colors.white),
          title: const QxlWordmark(size: 32, subtitle: 'Collector', onDark: true),
          actions: [
            IconButton(
              tooltip: 'Specimens with me',
              onPressed: () => context.push('/handover'),
              icon: const Icon(Icons.inventory_2_outlined),
            ),
            IconButton(
              tooltip: 'Profile',
              onPressed: () => context.push('/profile'),
              icon: const Icon(Icons.account_circle_outlined),
            ),
          ],
        ),
        body: Column(
          children: [
            _Header(me: me),
            const SyncBanner(),
            Material(
              color: context.colors.surface,
              child: const TabBar(
                tabs: [
                  Tab(text: 'Today'),
                  Tab(text: 'Upcoming'),
                  Tab(text: 'History'),
                ],
              ),
            ),
            const Expanded(child: TabBarView(children: [_JobList('today'), _JobList('upcoming'), _JobList('history')])),
          ],
        ),
      ),
    );
  }
}

class _Header extends ConsumerWidget {
  const _Header({required this.me});

  final CollectorMe me;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final hour = DateTime.now().hour;
    final greeting = hour < 12 ? 'Good morning' : (hour < 17 ? 'Good afternoon' : 'Good evening');
    return DecoratedBox(
      decoration: const BoxDecoration(gradient: Brand.fieldGradient),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 4, 16, 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '$greeting, ${me.name.split(' ').first}',
                        style: context.text.titleLarge?.copyWith(color: Colors.white),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        '${me.employeeCode} · ${titleCase(me.zone)} · ${me.shiftStart}–${me.shiftEnd}',
                        style: context.text.bodySmall?.copyWith(color: Colors.white70),
                      ),
                    ],
                  ),
                ),
                _DutySwitch(me: me),
              ],
            ),
            const SizedBox(height: 14),
            Row(
              children: [
                _Stat(value: me.completedToday, label: 'Done'),
                const SizedBox(width: 8),
                _Stat(value: me.pendingToday, label: 'To go'),
                const SizedBox(width: 8),
                _Stat(value: me.unsuccessfulToday, label: 'Unsuccessful'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _Stat extends StatelessWidget {
  const _Stat({required this.value, required this.label});

  final int value;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Semantics(
        label: '$value $label',
        excludeSemantics: true,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: Colors.white.withValues(alpha: 0.14)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('$value', style: context.text.headlineSmall?.copyWith(color: Colors.white)),
              Text(label, style: context.text.labelMedium?.copyWith(color: Colors.white70)),
            ],
          ),
        ),
      ),
    );
  }
}

class _DutySwitch extends ConsumerStatefulWidget {
  const _DutySwitch({required this.me});

  final CollectorMe me;

  @override
  ConsumerState<_DutySwitch> createState() => _DutySwitchState();
}

class _DutySwitchState extends ConsumerState<_DutySwitch> {
  bool _busy = false;

  Future<void> _toggle(bool value) async {
    setState(() => _busy = true);
    try {
      await ref.read(repositoryProvider).setDuty(value);
      await ref.read(sessionProvider.notifier).refreshProfile();
    } catch (e) {
      if (mounted) showSnack(context, describeError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final on = widget.me.onDuty;
    return Semantics(
      toggled: on,
      button: true,
      label: 'Duty',
      value: on ? 'On duty' : 'Off duty',
      excludeSemantics: true,
      onTap: _busy ? null : () => _toggle(!on),
      child: Material(
        color: on ? const Color(0xFF16A34A).withValues(alpha: 0.22) : Colors.white.withValues(alpha: 0.12),
        shape: const StadiumBorder(),
        child: InkWell(
          customBorder: const StadiumBorder(),
          onTap: _busy ? null : () => _toggle(!on),
          child: Padding(
            padding: const EdgeInsets.fromLTRB(12, 8, 6, 8),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 8,
                  height: 8,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: on ? const Color(0xFF4ADE80) : Colors.white54,
                  ),
                ),
                const SizedBox(width: 8),
                Text(on ? 'On duty' : 'Off duty', style: context.text.labelLarge?.copyWith(color: Colors.white)),
                const SizedBox(width: 4),
                SizedBox(
                  height: 32,
                  child: FittedBox(
                    child: Switch(
                      value: on,
                      onChanged: _busy ? null : _toggle,
                      activeThumbColor: Colors.white,
                      activeTrackColor: const Color(0xFF16A34A),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Offline / pending-sync indicator shown across the app.
class SyncBanner extends ConsumerWidget {
  const SyncBanner({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final queue = ref.watch(offlineQueueProvider);
    if (queue.pendingCount == 0 && queue.online) return const SizedBox.shrink();
    final attention = queue.attentionCount;
    final (bg, fg, text) = attention > 0
        ? (context.colors.errorContainer, context.colors.onErrorContainer, '$attention action(s) need your attention')
        : !queue.online
        ? (
            context.status.warningContainer,
            context.colors.onSurface,
            'Offline — ${queue.pendingCount} action(s) waiting to sync',
          )
        : (context.status.infoContainer, context.colors.onSurface, 'Syncing ${queue.pendingCount} action(s)…');
    return Material(
      color: bg,
      child: InkWell(
        onTap: () => context.push('/sync'),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          child: Row(
            children: [
              Icon(attention > 0 ? Icons.error_outline : Icons.cloud_off_outlined, color: fg, size: 20),
              const SizedBox(width: 10),
              Expanded(
                child: Semantics(
                  liveRegion: true,
                  child: Text(text, style: TextStyle(color: fg)),
                ),
              ),
              Icon(Icons.chevron_right, color: fg),
            ],
          ),
        ),
      ),
    );
  }
}

class _JobList extends ConsumerWidget {
  const _JobList(this.scope);

  final String scope;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final jobs = ref.watch(jobsProvider(scope));
    return AsyncValueView<(List<JobSummary>, bool)>(
      value: jobs,
      loading: const SkeletonList(itemHeight: 110),
      onRetry: () => ref.invalidate(jobsProvider(scope)),
      data: (result) {
        final (list, cached) = result;
        return RefreshIndicator(
          onRefresh: () async {
            await ref.read(offlineQueueProvider).flush();
            ref.invalidate(jobsProvider(scope));
            await ref.read(sessionProvider.notifier).refreshProfile();
          },
          child: list.isEmpty
              ? ListView(
                  physics: const AlwaysScrollableScrollPhysics(),
                  children: [
                    const SizedBox(height: 48),
                    EmptyState(
                      icon: Icons.event_available_outlined,
                      title: scope == 'today' ? 'No visits assigned today' : 'Nothing here',
                      message: scope == 'today' ? 'New assignments appear here. Pull down to refresh.' : null,
                    ),
                  ],
                )
              : ListView.separated(
                  physics: const AlwaysScrollableScrollPhysics(),
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
                  itemCount: list.length + (cached ? 1 : 0),
                  separatorBuilder: (_, _) => const SizedBox(height: 10),
                  itemBuilder: (context, i) {
                    if (cached && i == 0) {
                      return Text(
                        'Showing the last saved list (offline).',
                        style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
                      );
                    }
                    return JobCard(job: list[i - (cached ? 1 : 0)]);
                  },
                ),
        );
      },
    );
  }
}

class JobCard extends StatelessWidget {
  const JobCard({super.key, required this.job});

  final JobSummary job;

  @override
  Widget build(BuildContext context) {
    final j = job;
    return BrandCard(
      onTap: () => context.push('/jobs/${j.id}'),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.schedule, size: 18, color: context.colors.primary),
              const SizedBox(width: 6),
              Expanded(
                child: Text(
                  '${DateFormat('EEE d MMM').format(j.slotDate)} · ${j.slotLabel}',
                  style: context.text.titleSmall?.copyWith(color: context.colors.primary),
                ),
              ),
              StatusPill(label: jobStatusLabel(j.status), tone: jobTone(j.status)),
            ],
          ),
          const SizedBox(height: 10),
          Text(j.patientName, style: context.text.titleMedium?.copyWith(fontSize: 17)),
          const SizedBox(height: 2),
          Row(
            children: [
              Icon(Icons.location_on_outlined, size: 16, color: context.colors.onSurfaceVariant),
              const SizedBox(width: 4),
              Expanded(
                child: Text(
                  '${j.locality} · ${j.pincode}',
                  style: context.text.bodyMedium?.copyWith(color: context.colors.onSurfaceVariant),
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Text(j.tests.join(', '), maxLines: 2, overflow: TextOverflow.ellipsis, style: context.text.bodySmall),
          const SizedBox(height: 8),
          Wrap(
            spacing: 6,
            runSpacing: 6,
            children: [
              if (j.kind == 'recollection') Tag('Recollection', color: context.colors.error, icon: Icons.replay),
              if (j.paymentMode == 'pay_on_visit')
                const Tag('Collect payment', color: Brand.blue, icon: Icons.payments_outlined),
              if (j.isDelayed) Tag('Delayed', color: context.status.warning),
              if (j.lat == null) Tag('No map pin', color: context.colors.error, icon: Icons.location_off_outlined),
            ],
          ),
        ],
      ),
    );
  }
}

class _CourierHome extends ConsumerWidget {
  const _CourierHome();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Brand.navy,
        foregroundColor: Colors.white,
        title: const QxlWordmark(size: 32, subtitle: 'Courier', onDark: true),
        actions: [
          IconButton(
            tooltip: 'Profile',
            onPressed: () => context.push('/profile'),
            icon: const Icon(Icons.account_circle_outlined),
          ),
        ],
      ),
      body: const Column(
        children: [
          SyncBanner(),
          Expanded(child: CourierManifests()),
        ],
      ),
    );
  }
}

/// Manifests waiting for this courier's scan, or in their custody.
class CourierManifests extends ConsumerWidget {
  const CourierManifests({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final me = ref.watch(sessionProvider).value;
    final manifests = ref.watch(courierManifestsProvider);
    return AsyncValueView<List<Manifest>>(
      value: manifests,
      onRetry: () => ref.invalidate(courierManifestsProvider),
      data: (list) => RefreshIndicator(
        onRefresh: () => ref.refresh(courierManifestsProvider.future),
        child: list.isEmpty
            ? ListView(
                physics: const AlwaysScrollableScrollPhysics(),
                children: const [
                  SizedBox(height: 48),
                  EmptyState(
                    icon: Icons.local_shipping_outlined,
                    title: 'No specimens to carry',
                    message: 'Pull down to refresh.',
                  ),
                ],
              )
            : ListView.separated(
                physics: const AlwaysScrollableScrollPhysics(),
                padding: const EdgeInsets.all(16),
                itemCount: list.length,
                separatorBuilder: (_, _) => const SizedBox(height: 10),
                itemBuilder: (_, i) {
                  final m = list[i];
                  final mine = m.status == 'in_transit' && m.custodianName == me?.name;
                  return Card(
                    child: ListTile(
                      leading: Icon(
                        mine ? Icons.local_shipping_outlined : Icons.qr_code_scanner,
                        color: context.colors.primary,
                      ),
                      title: Text(m.reference),
                      subtitle: Text(
                        '${m.specimens.length} specimen(s) · ${mine ? 'with you' : 'waiting for your scan'}'
                        '${m.destinationName != null ? ' · to ${m.destinationName}' : ''}',
                      ),
                      trailing: const Icon(Icons.chevron_right),
                      onTap: () => context.push('/manifests/${m.id}', extra: m),
                    ),
                  );
                },
              ),
      ),
    );
  }
}

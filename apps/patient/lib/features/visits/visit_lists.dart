import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_core/qxl_core.dart';

import '../../data/models/collect.dart';
import '../auth/auth_controller.dart';
import '../bookings/bookings_screen.dart';
import 'collect_providers.dart';
import 'visit_screen.dart';

/// Home visits list (Bookings tab).
class VisitsList extends ConsumerWidget {
  const VisitsList({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final visits = ref.watch(myVisitsProvider);
    return AsyncValueView<List<HomeVisit>>(
      value: visits,
      loading: const SkeletonList(itemHeight: 110),
      onRetry: () => ref.invalidate(myVisitsProvider),
      data: (list) => RefreshIndicator(
        onRefresh: () => ref.refresh(myVisitsProvider.future),
        child: list.isEmpty
            ? ListView(
                physics: const AlwaysScrollableScrollPhysics(),
                children: const [
                  SizedBox(height: 48),
                  EmptyState(
                    icon: Icons.home_work_outlined,
                    title: 'No home collections yet',
                    message: 'Add tests to your cart and choose home sample collection.',
                  ),
                ],
              )
            : ListView.separated(
                physics: const AlwaysScrollableScrollPhysics(),
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
                itemCount: list.length,
                separatorBuilder: (_, _) => const SizedBox(height: 10),
                itemBuilder: (_, i) => VisitCard(visit: list[i]),
              ),
      ),
    );
  }
}

class VisitCard extends StatelessWidget {
  const VisitCard({super.key, required this.visit, this.highlight = false});

  final HomeVisit visit;
  final bool highlight;

  @override
  Widget build(BuildContext context) {
    final v = visit;
    final tone = switch (v.stage) {
      'report_ready' => PillTone.success,
      'cancelled' || 'unsuccessful' => PillTone.danger,
      'awaiting_payment' => PillTone.warning,
      'on_the_way' || 'arrived' => PillTone.info,
      _ => PillTone.neutral,
    };
    return Card(
      color: highlight ? Brand.accentSoft : null,
      child: InkWell(
        onTap: () => context.push('/visits/${v.id}'),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(child: Text(v.patientName, style: context.text.titleSmall)),
                  StatusPill(label: visitStageLabel(v.stage), tone: tone),
                ],
              ),
              const SizedBox(height: 6),
              Text(
                '${DateFormat('EEE, d MMM').format(v.slotDate)} · ${v.slotLabel}',
                style: context.text.bodyMedium?.copyWith(color: context.colors.onSurfaceVariant),
              ),
              const SizedBox(height: 4),
              Text(
                v.tests.map((t) => t.name).join(', '),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: context.text.bodySmall,
              ),
              const SizedBox(height: 4),
              Text(
                'Ref ${v.reference}',
                style: context.text.labelSmall?.copyWith(color: context.colors.onSurfaceVariant),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Bookings tab with home visits and other (centre / website) bookings.
class BookingsTabsScreen extends ConsumerWidget {
  const BookingsTabsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final auth = ref.watch(authControllerProvider);
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('My bookings'),
          bottom: auth.value == null
              ? null
              : const TabBar(
                  tabs: [
                    Tab(text: 'Home collections'),
                    Tab(text: 'Other bookings'),
                  ],
                ),
        ),
        body: auth.when(
          loading: () => const LoadingState(),
          error: (e, _) => ErrorState(error: e, onRetry: () => ref.read(authControllerProvider.notifier).reload()),
          data: (user) => user == null
              ? const SignInPrompt(
                  icon: Icons.event_note_outlined,
                  title: 'Your bookings and reports',
                  message: 'Sign in with your mobile number to see your home collections, bookings and reports.',
                )
              : const TabBarView(children: [VisitsList(), BookingsList()]),
        ),
      ),
    );
  }
}

class ReportsScreen extends ConsumerWidget {
  const ReportsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final reports = ref.watch(myReportsProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('My reports')),
      body: AsyncValueView<List<ReportSummary>>(
        value: reports,
        onRetry: () => ref.invalidate(myReportsProvider),
        data: (list) => list.isEmpty
            ? const EmptyState(
                icon: Icons.description_outlined,
                title: 'No reports yet',
                message: 'Reports appear here once the lab has authorized and released them.',
              )
            : ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  const MedicalNotice(
                    text:
                        'Reports open through a secure link that expires in a few minutes. '
                        'Please discuss your results with a qualified doctor.',
                  ),
                  const SizedBox(height: 12),
                  for (final r in list)
                    ReportTile(
                      report: r,
                      onOpen: () async {
                        try {
                          final link = await ref.read(collectRepositoryProvider).reportLink(r.id);
                          if (context.mounted) await Launch.web(context, link);
                        } catch (e) {
                          if (context.mounted) showSnack(context, describeError(e));
                        }
                      },
                    ),
                ],
              ),
      ),
    );
  }
}

class InboxScreen extends ConsumerWidget {
  const InboxScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final inbox = ref.watch(inboxProvider);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notifications'),
        actions: [
          if ((inbox.value?.unread ?? 0) > 0)
            TextButton(
              onPressed: () async {
                await ref.read(collectRepositoryProvider).markInboxRead();
                ref.invalidate(inboxProvider);
              },
              child: const Text('Mark all read'),
            ),
        ],
      ),
      body: AsyncValueView(
        value: inbox,
        onRetry: () => ref.invalidate(inboxProvider),
        data: (data) => data.items.isEmpty
            ? const EmptyState(icon: Icons.notifications_none, title: 'No notifications yet')
            : RefreshIndicator(
                onRefresh: () => ref.refresh(inboxProvider.future),
                child: ListView.separated(
                  itemCount: data.items.length,
                  separatorBuilder: (_, _) => const Divider(height: 1),
                  itemBuilder: (_, i) {
                    final item = data.items[i];
                    return ListTile(
                      leading: Icon(
                        item.read ? Icons.notifications_none : Icons.notifications_active,
                        color: item.read ? context.colors.outline : Brand.accent,
                      ),
                      title: Text(item.title, style: item.read ? null : const TextStyle(fontWeight: FontWeight.w700)),
                      subtitle: Text('${item.body}\n${formatDateTime(item.createdAt)}'),
                      isThreeLine: true,
                      onTap: () async {
                        if (!item.read) {
                          await ref.read(collectRepositoryProvider).markInboxRead([item.id]);
                          ref.invalidate(inboxProvider);
                        }
                        if (item.visitId != null && context.mounted) await context.push('/visits/${item.visitId}');
                      },
                    );
                  },
                ),
              ),
      ),
    );
  }
}

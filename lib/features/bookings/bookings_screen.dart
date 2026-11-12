import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/format.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/common.dart';
import '../../core/widgets/states.dart';
import '../../data/models/booking.dart';
import '../../data/models/content.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';
import '../auth/auth_controller.dart';
import '../catalog/explore_screen.dart';

const _pageSize = 20;

/// The signed-in user's bookings (`GET /bookings/me`), paged.
final myBookingsProvider = AsyncNotifierProvider<MyBookingsController, Paged<Booking>>(MyBookingsController.new);

class MyBookingsController extends AsyncNotifier<Paged<Booking>> {
  bool _loadingMore = false;

  @override
  Future<Paged<Booking>> build() async {
    final userId = ref.watch(currentUserIdProvider);
    if (userId == null) return const Paged(items: [], count: 0);
    return ref.read(bookingRepositoryProvider).mine(limit: _pageSize);
  }

  Future<void> loadMore() async {
    final current = state.value;
    if (current == null || !current.hasMore || _loadingMore) return;
    _loadingMore = true;
    try {
      final next = await ref.read(bookingRepositoryProvider).mine(limit: _pageSize, offset: current.items.length);
      final seen = current.items.map((b) => b.id).toSet();
      state = AsyncData(
        Paged(items: [...current.items, ...next.items.where((b) => !seen.contains(b.id))], count: next.count),
      );
    } finally {
      _loadingMore = false;
    }
  }
}

class BookingsScreen extends ConsumerWidget {
  const BookingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final auth = ref.watch(authControllerProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('My bookings')),
      body: auth.when(
        loading: () => const LoadingState(),
        error: (e, _) => ErrorState(error: e, onRetry: () => ref.read(authControllerProvider.notifier).reload()),
        data: (user) => user == null
            ? SignInPrompt(
                icon: Icons.event_note_outlined,
                title: 'Your bookings and reports',
                message: 'Sign in with your mobile number to see bookings made in the app and open your reports.',
              )
            : const _BookingsList(),
      ),
    );
  }
}

class _BookingsList extends ConsumerWidget {
  const _BookingsList();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final bookings = ref.watch(myBookingsProvider);
    return AsyncValueView<Paged<Booking>>(
      value: bookings,
      loading: const SkeletonList(itemHeight: 120),
      onRetry: () => ref.invalidate(myBookingsProvider),
      data: (page) {
        if (page.items.isEmpty) {
          return RefreshIndicator(
            onRefresh: () => ref.refresh(myBookingsProvider.future),
            child: LayoutBuilder(
              builder: (context, c) => SingleChildScrollView(
                physics: const AlwaysScrollableScrollPhysics(),
                child: SizedBox(
                  height: c.maxHeight,
                  child: EmptyState(
                    icon: Icons.event_available_outlined,
                    title: 'No bookings yet',
                    message: 'When you book a test or package, it will appear here with its status and report.',
                    action: FilledButton(
                      onPressed: () => context.go(Routes.exploreTab(ExploreTab.packages)),
                      child: const Text('Book a test'),
                    ),
                  ),
                ),
              ),
            ),
          );
        }
        return RefreshIndicator(
          onRefresh: () => ref.refresh(myBookingsProvider.future),
          child: NotificationListener<ScrollNotification>(
            onNotification: (n) {
              if (n.metrics.extentAfter < 400) ref.read(myBookingsProvider.notifier).loadMore();
              return false;
            },
            child: ListView.separated(
              physics: const AlwaysScrollableScrollPhysics(),
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
              itemCount: page.items.length + (page.hasMore ? 1 : 0),
              separatorBuilder: (_, _) => const SizedBox(height: 12),
              itemBuilder: (context, i) {
                if (i >= page.items.length) {
                  return const Padding(
                    padding: EdgeInsets.all(16),
                    child: Center(child: CircularProgressIndicator()),
                  );
                }
                return BookingCard(booking: page.items[i]);
              },
            ),
          ),
        );
      },
    );
  }
}

class BookingCard extends StatelessWidget {
  const BookingCard({super.key, required this.booking});

  final Booking booking;

  @override
  Widget build(BuildContext context) {
    final b = booking;
    return Card(
      child: InkWell(
        onTap: () => context.push(Routes.booking(b.id)),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: Text(b.testName ?? 'Booking', style: context.text.titleSmall)),
                  const SizedBox(width: 8),
                  StatusPill(label: bookingStatusLabel(b.status), tone: bookingTone(b.status)),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Icon(
                    b.collectionType == CollectionType.home ? Icons.home_outlined : Icons.store_mall_directory_outlined,
                    size: 16,
                    color: context.colors.onSurfaceVariant,
                  ),
                  const SizedBox(width: 6),
                  Expanded(
                    child: Text(
                      [
                        b.collectionType == CollectionType.home ? 'Home collection' : 'Centre visit',
                        if (b.preferredDate != null) formatIsoDate(b.preferredDate),
                        if (b.preferredTime != null) b.preferredTime!,
                      ].join(' · '),
                      style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              Wrap(
                spacing: 8,
                runSpacing: 6,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  if (b.amountPaise != null) Text(formatPaise(b.amountPaise!), style: context.text.titleSmall),
                  StatusPill(label: paymentStatusLabel(b.paymentStatus), tone: paymentTone(b.paymentStatus)),
                  if (b.hasReport)
                    Tag('Report available', icon: Icons.description_outlined, color: context.status.success),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Shown on account-only screens to guests.
class SignInPrompt extends StatelessWidget {
  const SignInPrompt({super.key, required this.icon, required this.title, required this.message});

  final IconData icon;
  final String title;
  final String message;

  @override
  Widget build(BuildContext context) {
    return EmptyState(
      icon: icon,
      title: title,
      message: message,
      action: FilledButton.icon(
        onPressed: () => context.push(Routes.login),
        icon: const Icon(Icons.login_rounded),
        label: const Text('Sign in'),
      ),
    );
  }
}

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import 'package:qxl_core/qxl_core.dart';

import '../../data/models/catalog.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';
import '../catalog/explore_screen.dart';
import 'cart_controller.dart';

/// Re-prices the cart from the live catalog whenever it is opened.
final _cartRefreshProvider = FutureProvider.autoDispose<void>((ref) async {
  final tests = await ref.watch(allTestsProvider.future);
  final packages = await ref.watch(allPackagesProvider.future);
  ref.read(cartProvider.notifier).reconcile(tests: tests, packages: packages);
});

class CartScreen extends ConsumerWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cart = ref.watch(cartProvider);
    final refresh = ref.watch(_cartRefreshProvider);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Your cart'),
        actions: [
          if (!cart.isEmpty)
            TextButton(
              onPressed: () async {
                final ok = await showDialog<bool>(
                  context: context,
                  builder: (context) => AlertDialog(
                    title: const Text('Clear cart?'),
                    content: const Text('All selected tests and packages will be removed.'),
                    actions: [
                      TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancel')),
                      FilledButton(onPressed: () => Navigator.pop(context, true), child: const Text('Clear')),
                    ],
                  ),
                );
                if (ok == true) ref.read(cartProvider.notifier).clear();
              },
              child: const Text('Clear'),
            ),
        ],
      ),
      body: cart.isEmpty
          ? EmptyState(
              icon: Icons.shopping_bag_outlined,
              title: 'Your cart is empty',
              message: 'Add tests or health packages to book a home collection or centre visit.',
              action: FilledButton(
                onPressed: () => context.go(Routes.exploreTab(ExploreTab.packages)),
                child: const Text('Browse packages'),
              ),
            )
          : ListView(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
              children: [
                if (refresh.isLoading) const LinearProgressIndicator(),
                if (refresh.hasError)
                  ErrorState(error: refresh.error!, compact: true, onRetry: () => ref.invalidate(_cartRefreshProvider)),
                for (final item in cart.items) ...[_CartRow(item: item), const SizedBox(height: 10)],
                if (cart.items.any((i) => i.unavailable))
                  Padding(
                    padding: const EdgeInsets.only(top: 4),
                    child: Text(
                      'Items marked unavailable can no longer be booked online and will not be included.',
                      style: context.text.bodySmall?.copyWith(color: context.colors.error),
                    ),
                  ),
                const SizedBox(height: 12),
                if (!cart.homeCollectionPossible)
                  const MedicalNotice(
                    text: 'Some items need a centre visit, so home sample collection is not available for this cart.',
                  ),
                const SizedBox(height: 12),
                Text(
                  'Prices are confirmed by QXL when you book. Any home-collection fee is shown before you pay.',
                  style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
                ),
              ],
            ),
      bottomNavigationBar: cart.isEmpty
          ? null
          : BottomActionBar(
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Estimated total', style: context.text.labelMedium),
                        Text(formatRupees(cart.estimatedTotalRupees), style: context.text.titleLarge),
                      ],
                    ),
                  ),
                  FilledButton(
                    onPressed: cart.bookable.isEmpty || refresh.isLoading
                        ? null
                        : () => _chooseHowToBook(context, cart),
                    child: const Text('Continue'),
                  ),
                ],
              ),
            ),
    );
  }
}

class _CartRow extends ConsumerWidget {
  const _CartRow({required this.item});

  final CartItem item;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Card(
      child: InkWell(
        onTap: () => context.push(item.kind == CatalogKind.package ? Routes.package(item.id) : Routes.test(item.id)),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 4, 12),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      item.kind == CatalogKind.package ? 'Package' : 'Test',
                      style: context.text.labelSmall?.copyWith(color: context.colors.onSurfaceVariant),
                    ),
                    const SizedBox(height: 2),
                    Text(item.name, style: context.text.titleSmall),
                    const SizedBox(height: 6),
                    if (item.unavailable)
                      const StatusPill(label: 'Unavailable', tone: PillTone.danger)
                    else
                      Text(formatRupees(item.priceRupees), style: context.text.titleMedium),
                    if (!item.homeCollectionAvailable && !item.unavailable) ...[
                      const SizedBox(height: 4),
                      Text(
                        'Centre visit only',
                        style: context.text.labelSmall?.copyWith(color: context.status.warning),
                      ),
                    ],
                  ],
                ),
              ),
              IconButton(
                tooltip: 'Remove ${item.name}',
                onPressed: () => ref.read(cartProvider.notifier).remove(item),
                icon: const Icon(Icons.delete_outline),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Home collection goes through the home-visit flow (profiles, map pin,
/// live tracking); centre visits keep the simple booking form.
Future<void> _chooseHowToBook(BuildContext context, CartState cart) async {
  final choice = await showModalBottomSheet<String>(
    context: context,
    builder: (context) => SafeArea(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('How would you like to give your sample?', style: context.text.titleLarge),
            const SizedBox(height: 12),
            Card(
              child: ListTile(
                enabled: cart.homeCollectionPossible,
                leading: const Icon(Icons.home_outlined),
                title: const Text('Home sample collection'),
                subtitle: Text(
                  cart.homeCollectionPossible
                      ? 'A QXL collector visits you. Track them live.'
                      : 'Not available — some items need a centre visit.',
                ),
                trailing: const Icon(Icons.chevron_right),
                onTap: () => Navigator.pop(context, 'home'),
              ),
            ),
            const SizedBox(height: 8),
            Card(
              child: ListTile(
                leading: const Icon(Icons.store_mall_directory_outlined),
                title: const Text('Visit a QXL centre'),
                subtitle: const Text('Pick a centre, date and time.'),
                trailing: const Icon(Icons.chevron_right),
                onTap: () => Navigator.pop(context, 'centre'),
              ),
            ),
          ],
        ),
      ),
    ),
  );
  if (!context.mounted || choice == null) return;
  if (choice == 'home') {
    await context.push(Routes.homeVisit);
  } else {
    await context.push('${Routes.checkout}?mode=centre');
  }
}

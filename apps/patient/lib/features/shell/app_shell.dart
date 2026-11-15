import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import 'package:qxl_core/qxl_core.dart';

import '../../routing/router.dart';
import '../cart/cart_controller.dart';

class AppShell extends ConsumerWidget {
  const AppShell({super.key, required this.shell});

  final StatefulNavigationShell shell;

  void _onTap(int index) => shell.goBranch(index, initialLocation: index == shell.currentIndex);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cart = ref.watch(cartProvider);
    return Scaffold(
      body: shell,
      bottomNavigationBar: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (!cart.isEmpty) _CartBar(state: cart),
          NavigationBar(
            selectedIndex: shell.currentIndex,
            onDestinationSelected: _onTap,
            destinations: const [
              NavigationDestination(
                icon: Icon(Icons.home_outlined),
                selectedIcon: Icon(Icons.home_rounded),
                label: 'Home',
              ),
              NavigationDestination(
                icon: Icon(Icons.biotech_outlined),
                selectedIcon: Icon(Icons.biotech_rounded),
                label: 'Tests',
              ),
              NavigationDestination(
                icon: Icon(Icons.event_note_outlined),
                selectedIcon: Icon(Icons.event_note_rounded),
                label: 'Bookings',
              ),
              NavigationDestination(
                icon: Icon(Icons.person_outline_rounded),
                selectedIcon: Icon(Icons.person_rounded),
                label: 'Account',
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _CartBar extends StatelessWidget {
  const _CartBar({required this.state});

  final CartState state;

  @override
  Widget build(BuildContext context) {
    final items = state.count == 1 ? '1 item' : '${state.count} items';
    return Material(
      color: context.colors.primary,
      child: InkWell(
        onTap: () => context.push(Routes.cart),
        child: Semantics(
          button: true,
          label: 'Cart, $items, estimated ${formatRupees(state.estimatedTotalRupees)}. View cart',
          excludeSemantics: true,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(
              children: [
                Icon(Icons.shopping_bag_outlined, color: context.colors.onPrimary),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    '$items · ${formatRupees(state.estimatedTotalRupees)}',
                    style: context.text.titleSmall?.copyWith(color: context.colors.onPrimary),
                  ),
                ),
                Text('View cart', style: context.text.labelLarge?.copyWith(color: context.colors.onPrimary)),
                Icon(Icons.chevron_right, color: context.colors.onPrimary),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

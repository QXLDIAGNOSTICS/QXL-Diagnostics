import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import 'package:qxl_core/qxl_core.dart';

import '../../data/models/lab_center.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';
import '../cart/cart_controller.dart';
import '../catalog/explore_screen.dart';

final centerProvider = FutureProvider.autoDispose.family<LabCenter, String>(
  (ref, slug) => ref.watch(centersRepositoryProvider).center(slug),
);

class CenterDetailScreen extends ConsumerWidget {
  const CenterDetailScreen({super.key, required this.slug});

  final String slug;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final center = ref.watch(centerProvider(slug));
    final cartEmpty = ref.watch(cartProvider.select((c) => c.isEmpty));
    return Scaffold(
      appBar: AppBar(title: const Text('Centre')),
      body: AsyncValueView<LabCenter>(
        value: center,
        onRetry: () => ref.invalidate(centerProvider(slug)),
        data: (c) => ListView(
          padding: const EdgeInsets.only(bottom: 24),
          children: [
            if (c.imageUrl != null)
              AspectRatio(
                aspectRatio: 16 / 9,
                child: NetImage(c.imageUrl, semanticLabel: c.name),
              ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Semantics(header: true, child: Text(c.name, style: context.text.headlineSmall)),
                  const SizedBox(height: 12),
                  if (c.isNabl) Tag('NABL accredited', icon: Icons.verified_outlined, color: context.status.success),
                  const SizedBox(height: 8),
                  FactRow(
                    icon: Icons.location_on_outlined,
                    label: 'Address',
                    value: [c.address, c.city].where((s) => s.isNotEmpty).join(', '),
                  ),
                  if (c.hours != null) FactRow(icon: Icons.schedule_outlined, label: 'Hours', value: c.hours!),
                  if (c.phone != null) FactRow(icon: Icons.call_outlined, label: 'Phone', value: c.phone!),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      if (c.phone != null)
                        Expanded(
                          child: OutlinedButton.icon(
                            onPressed: () => Launch.phone(context, c.phone!),
                            icon: const Icon(Icons.call_outlined),
                            label: const Text('Call'),
                          ),
                        ),
                      if (c.phone != null) const SizedBox(width: 12),
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () =>
                              Launch.directions(context, lat: c.lat, lng: c.lng, query: '${c.name}, ${c.address}'),
                          icon: const Icon(Icons.directions_outlined),
                          label: const Text('Directions'),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: center.hasValue
          ? BottomActionBar(
              child: FilledButton.icon(
                onPressed: () => cartEmpty
                    ? context.go(Routes.exploreTab(ExploreTab.packages))
                    : context.push('${Routes.checkout}?center=${center.value!.id}'),
                icon: const Icon(Icons.event_available_outlined),
                label: Text(cartEmpty ? 'Choose tests to book here' : 'Book a visit here'),
              ),
            )
          : null,
    );
  }
}

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import 'package:qxl_core/qxl_core.dart';

import '../../data/models/catalog.dart';
import '../../data/models/content.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';
import '../cart/cart_controller.dart';

/// Add/remove toggle. Items that can't be booked online offer a call instead.
class CartToggleButton extends ConsumerWidget {
  const CartToggleButton({super.key, required this.item, required this.bookable, this.expanded = false});

  final CartItem item;
  final bool bookable;
  final bool expanded;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final inCart = ref.watch(cartProvider.select((c) => c.contains(item.kind, item.id)));
    if (!bookable) {
      final phone = ref.watch(siteSettingsProvider).value?.phoneE164;
      final button = OutlinedButton.icon(
        onPressed: phone == null ? null : () => Launch.phone(context, phone),
        icon: const Icon(Icons.call_outlined, size: 18),
        label: const Text('Call to book'),
      );
      return expanded ? SizedBox(width: double.infinity, child: button) : button;
    }
    final Widget button;
    if (inCart) {
      button = FilledButton.tonalIcon(
        onPressed: () => ref.read(cartProvider.notifier).remove(item),
        icon: const Icon(Icons.check_rounded, size: 18),
        label: const Text('Added'),
      );
    } else {
      button = FilledButton.icon(
        onPressed: () {
          ref.read(cartProvider.notifier).add(item);
          ScaffoldMessenger.of(context)
            ..hideCurrentSnackBar()
            ..showSnackBar(
              SnackBar(
                persist: false,
                duration: const Duration(seconds: 3),
                content: Text('${item.name} added to cart'),
                action: SnackBarAction(label: 'View cart', onPressed: () => context.push(Routes.cart)),
              ),
            );
        },
        icon: const Icon(Icons.add_rounded, size: 18),
        label: const Text('Add'),
      );
    }
    return Semantics(
      label: inCart ? 'Remove ${item.name} from cart' : 'Add ${item.name} to cart',
      button: true,
      excludeSemantics: true,
      child: expanded ? SizedBox(width: double.infinity, child: button) : button,
    );
  }
}

class PackageCard extends StatelessWidget {
  const PackageCard({super.key, required this.package, this.width});

  final HealthPackage package;
  final double? width;

  @override
  Widget build(BuildContext context) {
    final p = package;
    final accent = Brand.accentFor(p.category ?? p.name);
    return SizedBox(
      width: width,
      child: Card(
        child: InkWell(
          onTap: () => context.push(Routes.package(p.id)),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Wrap(
                  spacing: 6,
                  runSpacing: 6,
                  children: [
                    if (p.tag != null) Tag(p.tag!, color: accent),
                    if (p.mostBooked) Tag('Most booked', color: context.colors.tertiary, icon: Icons.trending_up),
                    if (p.doctorRecommended)
                      Tag('Doctor recommended', color: context.colors.primary, icon: Icons.verified_outlined),
                  ],
                ),
                const SizedBox(height: 10),
                Text(p.name, style: context.text.titleMedium, maxLines: 2, overflow: TextOverflow.ellipsis),
                if (p.parameters != null || p.category != null) ...[
                  const SizedBox(height: 4),
                  Text(
                    [p.parameters, p.category].whereType<String>().join(' · '),
                    style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
                const SizedBox(height: 12),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child: PriceView(
                        price: p.isBookableOnline ? p.price : null,
                        oldPrice: p.oldPrice,
                        contactForPrice: !p.isBookableOnline,
                      ),
                    ),
                    CartToggleButton(item: CartItem.fromPackage(p), bookable: p.isBookableOnline),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class TestTile extends StatelessWidget {
  const TestTile({super.key, required this.test});

  final LabTest test;

  @override
  Widget build(BuildContext context) {
    final t = test;
    final meta = [
      if (t.description != null) t.description!,
      if (t.turnaroundHours != null) 'Report in ${formatTurnaround(t.turnaroundHours!)}',
    ].join(' · ');
    return Card(
      child: InkWell(
        onTap: () => context.push(Routes.test(t.id)),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 14, 12, 14),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(t.name, style: context.text.titleSmall, maxLines: 2, overflow: TextOverflow.ellipsis),
                    if (meta.isNotEmpty) ...[
                      const SizedBox(height: 4),
                      Text(
                        meta,
                        style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                    if (t.preparation != null) ...[
                      const SizedBox(height: 6),
                      Row(
                        children: [
                          Icon(Icons.schedule_outlined, size: 14, color: context.colors.onSurfaceVariant),
                          const SizedBox(width: 4),
                          Flexible(
                            child: Text(
                              t.preparation!,
                              style: context.text.labelSmall?.copyWith(color: context.colors.onSurfaceVariant),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ),
                    ],
                    const SizedBox(height: 8),
                    PriceView(price: t.price),
                  ],
                ),
              ),
              const SizedBox(width: 12),
              CartToggleButton(item: CartItem.fromTest(t), bookable: t.isBookableOnline),
            ],
          ),
        ),
      ),
    );
  }
}

class SpecialityCard extends StatelessWidget {
  const SpecialityCard({super.key, required this.speciality});

  final Speciality speciality;

  @override
  Widget build(BuildContext context) {
    final s = speciality;
    return Card(
      child: InkWell(
        onTap: () => context.push(Routes.speciality(s.slug)),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            AspectRatio(
              aspectRatio: 16 / 10,
              child: NetImage(s.cardImageUrl, fit: BoxFit.cover, fallbackIcon: Icons.medical_services_outlined),
            ),
            Padding(
              padding: const EdgeInsets.all(12),
              child: Text(s.name, style: context.text.titleSmall, maxLines: 2, overflow: TextOverflow.ellipsis),
            ),
          ],
        ),
      ),
    );
  }
}

/// Horizontal category filter. `null` selection means "All".
class CategoryChips extends StatelessWidget {
  const CategoryChips({super.key, required this.categories, required this.selected, required this.onSelected});

  final List<String> categories;
  final String? selected;
  final ValueChanged<String?> onSelected;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      // Room for the chips' 48dp touch targets.
      height: 64 + 12 * (MediaQuery.textScalerOf(context).scale(14) / 14 - 1).clamp(0.0, 2.0),
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        itemCount: categories.length + 1,
        separatorBuilder: (_, _) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final value = index == 0 ? null : categories[index - 1];
          return ChoiceChip(
            label: Text(value ?? 'All'),
            selected: selected == value,
            onSelected: (_) => onSelected(value),
          );
        },
      ),
    );
  }
}

/// Distinct, display-cased categories in first-seen order.
List<String> distinctCategories(Iterable<String?> raw) {
  final seen = <String, String>{};
  for (final value in raw) {
    if (value == null) continue;
    final key = value.trim().toLowerCase();
    if (key.isEmpty) continue;
    seen.putIfAbsent(key, () => value.trim()[0].toUpperCase() + value.trim().substring(1));
  }
  final list = seen.values.toList()..sort();
  return list;
}

bool sameCategory(String? a, String? b) => a?.trim().toLowerCase() == b?.trim().toLowerCase();

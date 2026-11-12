import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/format.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/common.dart';
import '../../core/widgets/states.dart';
import '../../data/models/catalog.dart';
import '../../data/providers.dart';
import '../cart/cart_controller.dart';
import 'catalog_widgets.dart';

class TestDetailScreen extends ConsumerWidget {
  const TestDetailScreen({super.key, required this.id});

  final String id;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final test = ref.watch(testProvider(id));
    return Scaffold(
      appBar: AppBar(title: const Text('Test details')),
      body: AsyncValueView<LabTest>(
        value: test,
        onRetry: () => ref.invalidate(testProvider(id)),
        data: (t) => ListView(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
          children: [
            if (t.category != null) Align(alignment: Alignment.centerLeft, child: Tag(t.category!)),
            const SizedBox(height: 12),
            Semantics(header: true, child: Text(t.name, style: context.text.headlineSmall)),
            const SizedBox(height: 12),
            PriceView(price: t.price, large: true),
            if (!t.isActive) ...[
              const SizedBox(height: 12),
              const StatusPill(label: 'Currently unavailable', tone: PillTone.danger),
            ],
            const SizedBox(height: 16),
            Card(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Column(
                  children: [
                    if (t.description != null)
                      FactRow(icon: Icons.science_outlined, label: 'What it measures', value: t.description!),
                    if (t.preparation != null)
                      FactRow(icon: Icons.no_food_outlined, label: 'Preparation', value: t.preparation!),
                    if (t.turnaroundHours != null)
                      FactRow(
                        icon: Icons.timer_outlined,
                        label: 'Report turnaround',
                        value: formatTurnaround(t.turnaroundHours!),
                      ),
                    FactRow(
                      icon: Icons.home_outlined,
                      label: 'Home sample collection',
                      value: t.homeCollectionAvailable ? 'Available' : 'Centre visit only',
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            const MedicalNotice(),
          ],
        ),
      ),
      bottomNavigationBar: test.hasValue
          ? BottomActionBar(
              child: CartToggleButton(
                item: CartItem.fromTest(test.value!),
                bookable: test.value!.isBookableOnline,
                expanded: true,
              ),
            )
          : null,
    );
  }
}

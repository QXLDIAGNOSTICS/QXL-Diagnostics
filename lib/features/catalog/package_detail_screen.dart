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

class PackageDetailScreen extends ConsumerWidget {
  const PackageDetailScreen({super.key, required this.id});

  final String id;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final package = ref.watch(packageProvider(id));
    return Scaffold(
      appBar: AppBar(title: const Text('Health package')),
      body: AsyncValueView<HealthPackage>(
        value: package,
        onRetry: () => ref.invalidate(packageProvider(id)),
        data: (p) => _PackageBody(package: p),
      ),
      bottomNavigationBar: package.hasValue
          ? BottomActionBar(
              child: CartToggleButton(
                item: CartItem.fromPackage(package.value!),
                bookable: package.value!.isBookableOnline,
                expanded: true,
              ),
            )
          : null,
    );
  }
}

class _PackageBody extends StatelessWidget {
  const _PackageBody({required this.package});

  final HealthPackage package;

  @override
  Widget build(BuildContext context) {
    final p = package;
    final d = p.details;
    final facts = <Widget>[
      if (p.parameters != null) FactRow(icon: Icons.science_outlined, label: 'Parameters', value: p.parameters!),
      if (d.fasting != null) FactRow(icon: Icons.no_food_outlined, label: 'Preparation', value: d.fasting!),
      if (d.sampleType != null) FactRow(icon: Icons.water_drop_outlined, label: 'Sample', value: d.sampleType!),
      if (d.turnaround != null) FactRow(icon: Icons.timer_outlined, label: 'Reports', value: d.turnaround!),
      if (p.ageGroup != null) FactRow(icon: Icons.cake_outlined, label: 'Age group', value: p.ageGroup!),
      if (p.gender != null) FactRow(icon: Icons.people_outline, label: 'Suitable for', value: p.gender!),
      FactRow(
        icon: Icons.home_outlined,
        label: 'Home sample collection',
        value: p.homeCollectionAvailable ? 'Available' : 'Centre visit only',
      ),
    ];

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
      children: [
        Wrap(
          spacing: 6,
          runSpacing: 6,
          children: [
            if (p.tag != null) Tag(p.tag!, color: Brand.accentFor(p.category ?? p.name)),
            if (p.category != null) Tag(p.category!, color: context.colors.secondary),
            if (p.doctorRecommended)
              Tag('Doctor recommended', icon: Icons.verified_outlined, color: context.colors.primary),
          ],
        ),
        const SizedBox(height: 12),
        Semantics(header: true, child: Text(p.name, style: context.text.headlineSmall)),
        const SizedBox(height: 12),
        PriceView(
          price: p.isBookableOnline ? p.price : null,
          oldPrice: p.oldPrice,
          contactForPrice: !p.isBookableOnline,
          large: true,
        ),
        if (p.hasDiscount && p.saveAmount != null && p.saveAmount! > 0) ...[
          const SizedBox(height: 6),
          Text(
            'You save ${formatRupees(p.saveAmount!)}',
            style: context.text.labelLarge?.copyWith(color: context.status.success),
          ),
        ],
        if (!p.isBookableOnline) ...[
          const SizedBox(height: 8),
          Text(
            d.priceDisplay ?? 'This package is priced on request. Call QXL to arrange it.',
            style: context.text.bodyMedium?.copyWith(color: context.colors.onSurfaceVariant),
          ),
        ],
        const SizedBox(height: 16),
        Card(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Column(children: facts),
          ),
        ),
        if (p.whoShouldTake != null || d.mayHelpWhen != null) ...[
          const SectionHeader(title: 'Who is it for?', padding: EdgeInsets.fromLTRB(0, 24, 0, 8)),
          if (p.whoShouldTake != null) Text(p.whoShouldTake!, style: context.text.bodyLarge),
          if (d.mayHelpWhen != null) ...[
            const SizedBox(height: 8),
            Text('May help when: ${d.mayHelpWhen!}', style: context.text.bodyLarge),
          ],
        ],
        if (d.guidanceLevel != null) ...[
          const SizedBox(height: 12),
          FactRow(icon: Icons.assignment_ind_outlined, label: 'Guidance', value: d.guidanceLevel!),
        ],
        if (d.beforeBooking != null) ...[
          const SectionHeader(title: 'Before you book', padding: EdgeInsets.fromLTRB(0, 24, 0, 8)),
          Text(d.beforeBooking!, style: context.text.bodyLarge),
        ],
        if (d.sections.isNotEmpty) ...[
          const SectionHeader(title: "What's included", padding: EdgeInsets.fromLTRB(0, 24, 0, 8)),
          for (final section in d.sections)
            Card(
              margin: const EdgeInsets.only(bottom: 8),
              child: ExpansionTile(
                shape: const Border(),
                title: Text(section.title, style: context.text.titleSmall),
                subtitle: Text('${section.tests.length} tests'),
                childrenPadding: const EdgeInsets.fromLTRB(16, 0, 16, 12),
                expandedCrossAxisAlignment: CrossAxisAlignment.start,
                children: [for (final t in section.tests) _Bullet(t)],
              ),
            ),
        ] else if (d.keyTests.isNotEmpty) ...[
          const SectionHeader(title: 'Key tests', padding: EdgeInsets.fromLTRB(0, 24, 0, 8)),
          for (final t in d.keyTests) _Bullet(t),
        ] else if (p.includes != null) ...[
          const SectionHeader(title: "What's included", padding: EdgeInsets.fromLTRB(0, 24, 0, 8)),
          Text(p.includes!, style: context.text.bodyLarge),
        ],
        if (p.benefits.isNotEmpty) ...[
          const SectionHeader(title: 'Highlights', padding: EdgeInsets.fromLTRB(0, 24, 0, 8)),
          for (final b in p.benefits) _Bullet(b),
        ],
        const SizedBox(height: 20),
        const MedicalNotice(),
      ],
    );
  }
}

class _Bullet extends StatelessWidget {
  const _Bullet(this.text);

  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 3),
            child: Icon(Icons.check_circle_outline, size: 18, color: context.colors.primary),
          ),
          const SizedBox(width: 10),
          Expanded(child: Text(text, style: context.text.bodyMedium)),
        ],
      ),
    );
  }
}

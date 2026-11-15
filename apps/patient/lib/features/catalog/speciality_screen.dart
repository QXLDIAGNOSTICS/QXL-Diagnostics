import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_ui/material_ui.dart';

import 'package:qxl_core/qxl_core.dart';

import '../../data/models/catalog.dart';
import '../../data/models/content.dart';
import '../../data/providers.dart';
import '../cart/cart_controller.dart';
import 'catalog_widgets.dart';

/// Which speciality profiles map to bookable catalog items, per the
/// server's own name resolution (`POST /catalog/resolve`).
final _profileMatchesProvider = FutureProvider.autoDispose.family<List<CatalogMatch?>, String>((ref, slug) async {
  final speciality = await ref.watch(specialityProvider(slug).future);
  if (speciality.profiles.isEmpty) return const [];
  return ref.watch(catalogRepositoryProvider).resolve(speciality.profiles.map((p) => p.name).toList());
});

class SpecialityScreen extends ConsumerWidget {
  const SpecialityScreen({super.key, required this.slug});

  final String slug;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final speciality = ref.watch(specialityProvider(slug));
    return Scaffold(
      appBar: AppBar(title: Text(speciality.value?.name ?? 'Speciality')),
      body: AsyncValueView<Speciality>(
        value: speciality,
        onRetry: () => ref.invalidate(specialityProvider(slug)),
        data: (s) => _Body(speciality: s),
      ),
    );
  }
}

class _Body extends ConsumerWidget {
  const _Body({required this.speciality});

  final Speciality speciality;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = speciality;
    final matches = ref.watch(_profileMatchesProvider(s.slug));
    return ListView(
      padding: const EdgeInsets.only(bottom: 24),
      children: [
        if (s.heroImageUrl != null || s.cardImageUrl != null)
          AspectRatio(aspectRatio: 16 / 8, child: NetImage(s.heroImageUrl ?? s.cardImageUrl)),
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Semantics(header: true, child: Text(s.heroTitle ?? s.name, style: context.text.headlineSmall)),
              if (s.heroDescription != null) ...[
                const SizedBox(height: 8),
                Text(
                  s.heroDescription!,
                  style: context.text.bodyLarge?.copyWith(color: context.colors.onSurfaceVariant),
                ),
              ],
              if (s.intro != null) ...[const SizedBox(height: 12), Text(s.intro!, style: context.text.bodyLarge)],
            ],
          ),
        ),
        if (s.whoShouldTake.isNotEmpty) ...[
          const SectionHeader(title: 'Who should consider testing'),
          for (final w in s.whoShouldTake)
            ListTile(
              dense: true,
              leading: Icon(Icons.person_search_outlined, color: context.colors.primary),
              title: Text(w, style: context.text.bodyMedium),
            ),
        ],
        if (s.profiles.isNotEmpty) ...[
          const SectionHeader(title: 'Test profiles'),
          for (var i = 0; i < s.profiles.length; i++)
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 10),
              child: _ProfileCard(
                profile: s.profiles[i],
                match: matches.value != null && i < matches.value!.length ? matches.value![i] : null,
                resolving: matches.isLoading,
              ),
            ),
        ],
        if (s.clinicianNotes.isNotEmpty) ...[
          const SectionHeader(title: 'Clinician notes'),
          for (final note in s.clinicianNotes)
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
              child: Text('• $note', style: context.text.bodyMedium),
            ),
        ],
        if (s.faqs.isNotEmpty) ...[
          const SectionHeader(title: 'Common questions'),
          for (final faq in s.faqs)
            ExpansionTile(
              title: Text(faq.question, style: context.text.titleSmall),
              childrenPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
              expandedAlignment: Alignment.centerLeft,
              children: [Text(faq.answer, style: context.text.bodyMedium)],
            ),
        ],
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 20, 16, 0),
          child: MedicalNotice(text: s.disclaimer),
        ),
      ],
    );
  }
}

class _ProfileCard extends StatelessWidget {
  const _ProfileCard({required this.profile, required this.match, required this.resolving});

  final SpecialityProfile profile;
  final CatalogMatch? match;
  final bool resolving;

  @override
  Widget build(BuildContext context) {
    final m = match;
    final bookable = m != null && (m.price ?? 0) > 0;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(profile.name, style: context.text.titleSmall),
            if (profile.tests != null) ...[
              const SizedBox(height: 6),
              Text(profile.tests!, style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant)),
            ],
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 6,
              children: [
                if (profile.turnaround != null) Tag(profile.turnaround!, icon: Icons.timer_outlined),
                if (profile.sample != null)
                  Tag(profile.sample!, icon: Icons.water_drop_outlined, color: context.colors.secondary),
              ],
            ),
            const SizedBox(height: 12),
            if (resolving)
              const LinearProgressIndicator()
            else
              Row(
                children: [
                  Expanded(
                    child: bookable
                        ? Text(formatRupees(m.price!), style: context.text.titleMedium)
                        : Text(
                            'Ask our team about this profile',
                            style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
                          ),
                  ),
                  CartToggleButton(
                    item: bookable
                        ? CartItem.fromMatch(m)
                        : CartItem(
                            kind: CatalogKind.test,
                            id: 'unresolved:${profile.name}',
                            name: profile.name,
                            priceRupees: 0,
                            homeCollectionAvailable: false,
                          ),
                    bookable: bookable,
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }
}

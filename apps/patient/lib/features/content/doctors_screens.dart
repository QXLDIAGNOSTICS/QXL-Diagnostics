import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import 'package:qxl_core/qxl_core.dart';

import '../../data/models/content.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';

final doctorProvider = FutureProvider.autoDispose.family<Doctor, String>(
  (ref, slug) => ref.watch(contentRepositoryProvider).doctor(slug),
);

class DoctorsScreen extends ConsumerWidget {
  const DoctorsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final doctors = ref.watch(doctorsProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Our doctors')),
      body: AsyncValueView<List<Doctor>>(
        value: doctors,
        onRetry: () => ref.invalidate(doctorsProvider),
        data: (list) => list.isEmpty
            ? const EmptyState(icon: Icons.medical_information_outlined, title: 'No doctor profiles yet')
            : ListView.separated(
                padding: const EdgeInsets.all(16),
                itemCount: list.length,
                separatorBuilder: (_, _) => const SizedBox(height: 12),
                itemBuilder: (_, i) {
                  final d = list[i];
                  return Card(
                    child: InkWell(
                      onTap: () => context.push(Routes.doctor(d.slug)),
                      child: Padding(
                        padding: const EdgeInsets.all(12),
                        child: Row(
                          children: [
                            ClipRRect(
                              borderRadius: BorderRadius.circular(12),
                              child: SizedBox(
                                width: 72,
                                height: 72,
                                child: NetImage(d.photo, fallbackIcon: Icons.person_outline),
                              ),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(d.name, style: context.text.titleSmall),
                                  if (d.qualification != null) Text(d.qualification!, style: context.text.bodySmall),
                                  if (d.title ?? d.department case final role?)
                                    Text(
                                      role,
                                      style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
                                    ),
                                ],
                              ),
                            ),
                            const Icon(Icons.chevron_right),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),
      ),
    );
  }
}

class DoctorDetailScreen extends ConsumerWidget {
  const DoctorDetailScreen({super.key, required this.slug});

  final String slug;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final doctor = ref.watch(doctorProvider(slug));
    return Scaffold(
      appBar: AppBar(title: Text(doctor.value?.name ?? 'Doctor')),
      body: AsyncValueView<Doctor>(
        value: doctor,
        onRetry: () => ref.invalidate(doctorProvider(slug)),
        data: (d) => ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Center(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: SizedBox(
                  width: 160,
                  height: 180,
                  child: NetImage(d.imageUrl ?? d.photo, semanticLabel: d.name, fallbackIcon: Icons.person_outline),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Text(d.name, style: context.text.headlineSmall, textAlign: TextAlign.center),
            if (d.qualification != null)
              Text(d.qualification!, style: context.text.bodyLarge, textAlign: TextAlign.center),
            if (d.title != null)
              Text(
                d.title!,
                style: context.text.bodyMedium?.copyWith(color: context.colors.onSurfaceVariant),
                textAlign: TextAlign.center,
              ),
            const SizedBox(height: 16),
            if (d.department != null)
              FactRow(icon: Icons.apartment_outlined, label: 'Department', value: d.department!),
            if (d.specialization != null)
              FactRow(icon: Icons.science_outlined, label: 'Specialisation', value: d.specialization!),
            if (d.experience != null)
              FactRow(icon: Icons.workspace_premium_outlined, label: 'Experience', value: d.experience!),
            if (d.registrationNumber != null)
              FactRow(icon: Icons.badge_outlined, label: 'Registration', value: d.registrationNumber!),
            for (final (title, body) in [
              ('About', d.bio),
              ('Expertise', d.expertise),
              ('Achievements', d.achievements),
            ])
              if (body != null) ...[
                SectionHeader(title: title, padding: const EdgeInsets.fromLTRB(0, 20, 0, 8)),
                Text(body, style: context.text.bodyLarge),
              ],
          ],
        ),
      ),
    );
  }
}

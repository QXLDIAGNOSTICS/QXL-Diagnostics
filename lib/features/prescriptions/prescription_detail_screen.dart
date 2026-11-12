import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/format.dart';
import '../../core/launch.dart';
import '../../core/network/api_exception.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/common.dart';
import '../../core/widgets/states.dart';
import '../../data/models/catalog.dart';
import '../../data/models/records.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';
import '../auth/auth_controller.dart';
import '../cart/cart_controller.dart';
import 'prescriptions_screen.dart';

final prescriptionProvider = FutureProvider.autoDispose.family<Prescription, String>((ref, id) {
  ref.watch(currentUserIdProvider);
  return ref.watch(prescriptionRepositoryProvider).prescription(id);
});

/// What each test name read from the prescription would book, according to
/// the server's catalog matching.
/// Keyed by the newline-joined names so the family has value equality.
final _matchesProvider = FutureProvider.autoDispose.family<List<CatalogMatch?>, String>((ref, joined) {
  final names = joined.split('\n').where((n) => n.trim().isNotEmpty).toList();
  if (names.isEmpty) return const [];
  return ref.watch(catalogRepositoryProvider).resolve(names);
});

class PrescriptionDetailScreen extends ConsumerStatefulWidget {
  const PrescriptionDetailScreen({super.key, required this.id});

  final String id;

  @override
  ConsumerState<PrescriptionDetailScreen> createState() => _PrescriptionDetailScreenState();
}

class _PrescriptionDetailScreenState extends ConsumerState<PrescriptionDetailScreen> {
  Timer? _poll;
  int _polls = 0;

  /// Analysis runs server-side in the background; poll for a bounded time.
  static const _maxPolls = 40;

  @override
  void dispose() {
    _poll?.cancel();
    super.dispose();
  }

  void _schedulePoll(Prescription p) {
    if (!p.isInProgress || _poll != null || _polls >= _maxPolls) return;
    _poll = Timer(const Duration(seconds: 3), () {
      _poll = null;
      _polls++;
      if (mounted) ref.invalidate(prescriptionProvider(widget.id));
    });
  }

  Future<void> _openFile(String fileId) async {
    try {
      final file = await ref.read(prescriptionRepositoryProvider).file(fileId);
      final url = file.downloadUrl == null ? null : Uri.tryParse(file.downloadUrl!);
      if (!mounted) return;
      if (url == null || url.scheme != 'https') {
        showSnack(context, 'This file can’t be opened right now.');
        return;
      }
      await Launch.web(context, url);
    } catch (e) {
      if (mounted) showSnack(context, describeError(e));
    }
  }

  @override
  Widget build(BuildContext context) {
    final prescription = ref.watch(prescriptionProvider(widget.id));
    final current = prescription.value;
    if (current != null) _schedulePoll(current);
    return Scaffold(
      appBar: AppBar(title: const Text('Prescription')),
      body: AsyncValueView<Prescription>(
        value: prescription,
        onRetry: () => ref.invalidate(prescriptionProvider(widget.id)),
        data: (p) => ListView(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
          children: [
            Card(
              child: ListTile(
                leading: Icon(p.isPdf ? Icons.picture_as_pdf_outlined : Icons.image_outlined),
                title: Text(p.filename),
                subtitle: Text(analysisStatusLabel(p.analysisStatus)),
                trailing: p.fileId == null
                    ? null
                    : IconButton(
                        tooltip: 'Open file',
                        onPressed: () => _openFile(p.fileId!),
                        icon: const Icon(Icons.open_in_new),
                      ),
              ),
            ),
            const SizedBox(height: 16),
            if (p.isInProgress)
              _InProgress(
                stalled: _polls >= _maxPolls,
                onRefresh: () {
                  setState(() => _polls = 0);
                  ref.invalidate(prescriptionProvider(widget.id));
                },
              ),
            if (p.isFailed)
              EmptyState(
                icon: Icons.report_gmailerrorred_outlined,
                title: 'We couldn’t read this prescription',
                message: 'Try a clearer photo in good light, or call QXL and the team will help you book.',
                action: OutlinedButton(
                  onPressed: () => context.pushReplacement(Routes.prescriptions),
                  child: const Text('Upload again'),
                ),
              ),
            if (p.analysisStatus == 'completed') _Analysis(analysis: p.analysis),
          ],
        ),
      ),
    );
  }
}

class _InProgress extends StatelessWidget {
  const _InProgress({required this.stalled, required this.onRefresh});

  final bool stalled;
  final VoidCallback onRefresh;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            if (!stalled) const CircularProgressIndicator(),
            const SizedBox(height: 16),
            Semantics(
              liveRegion: true,
              child: Text(
                stalled ? 'Still reading — this is taking longer than usual.' : 'Reading your prescription…',
                style: context.text.titleSmall,
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'You can leave this screen; the result will be here when it’s ready.',
              textAlign: TextAlign.center,
            ),
            if (stalled) ...[
              const SizedBox(height: 12),
              OutlinedButton(onPressed: onRefresh, child: const Text('Check again')),
            ],
          ],
        ),
      ),
    );
  }
}

class _Analysis extends ConsumerWidget {
  const _Analysis({required this.analysis});

  final PrescriptionAnalysis? analysis;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final a = analysis;
    if (a == null || a.isEmpty) {
      return const EmptyState(
        icon: Icons.find_in_page_outlined,
        title: 'No tests found',
        message: 'We couldn’t find any lab tests on this prescription. Call QXL if you need help booking.',
      );
    }
    final key = a.tests.join('\n');
    final matches = ref.watch(_matchesProvider(key));
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        MedicalNotice(
          text: a.disclaimer ?? 'This automated reading is for convenience only and is not a diagnosis. Check it against your prescription.',
        ),
        if (a.summary != null) ...[
          const SectionHeader(title: 'Summary', padding: EdgeInsets.fromLTRB(0, 20, 0, 8)),
          Text(a.summary!, style: context.text.bodyLarge),
        ],
        if (a.tests.isNotEmpty) ...[
          const SectionHeader(title: 'Tests mentioned', padding: EdgeInsets.fromLTRB(0, 20, 0, 4)),
          Text(
            'Review each one before adding it to your cart.',
            style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
          ),
          const SizedBox(height: 8),
          for (var i = 0; i < a.tests.length; i++)
            _TestSuggestion(
              name: a.tests[i],
              match: matches.value != null && i < matches.value!.length ? matches.value![i] : null,
              resolving: matches.isLoading,
            ),
          if (matches.hasError)
            ErrorState(error: matches.error!, compact: true, onRetry: () => ref.invalidate(_matchesProvider(key))),
        ],
        if (a.medications.isNotEmpty) ...[
          const SectionHeader(title: 'Medicines mentioned', padding: EdgeInsets.fromLTRB(0, 20, 0, 8)),
          for (final m in a.medications) Text('• $m', style: context.text.bodyMedium),
        ],
      ],
    );
  }
}

class _TestSuggestion extends ConsumerWidget {
  const _TestSuggestion({required this.name, required this.match, required this.resolving});

  final String name;
  final CatalogMatch? match;
  final bool resolving;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final m = match;
    final bookable = m != null && (m.price ?? 0) > 0;
    final inCart = m != null && ref.watch(cartProvider.select((c) => c.contains(m.kind, m.id)));
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 12, 12, 12),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(name, style: context.text.titleSmall),
                  const SizedBox(height: 4),
                  if (resolving)
                    const SkeletonBox(height: 12, width: 120)
                  else if (bookable)
                    Text(
                      'QXL test: ${m.name} · ${formatRupees(m.price!)}',
                      style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
                    )
                  else
                    Text(
                      'Not found in our online catalog',
                      style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
                    ),
                ],
              ),
            ),
            if (bookable)
              inCart
                  ? FilledButton.tonal(onPressed: () => context.push(Routes.cart), child: const Text('In cart'))
                  : FilledButton(
                      onPressed: () => ref.read(cartProvider.notifier).add(CartItem.fromMatch(m)),
                      child: const Text('Add'),
                    ),
          ],
        ),
      ),
    );
  }
}

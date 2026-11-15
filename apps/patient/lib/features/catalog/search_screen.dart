import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_ui/material_ui.dart';

import 'package:qxl_core/qxl_core.dart';

import '../../data/models/catalog.dart';
import '../../data/providers.dart';
import 'catalog_widgets.dart';

/// Server-side test search (`GET /tests?q=`) plus package name matching
/// against the live package list (the API has no package search).
final _searchProvider = FutureProvider.autoDispose.family<_SearchResults, String>((ref, query) async {
  final q = query.trim();
  if (q.length < 2) return const _SearchResults([], []);
  final tests = ref.watch(catalogRepositoryProvider).tests(query: q);
  final packages = await ref.watch(allPackagesProvider.future);
  final needle = q.toLowerCase();
  final matchingPackages = packages
      .where(
        (p) =>
            p.name.toLowerCase().contains(needle) ||
            (p.category?.toLowerCase().contains(needle) ?? false) ||
            (p.includes?.toLowerCase().contains(needle) ?? false),
      )
      .toList();
  final testResults = (await tests).where((t) => t.isActive).toList();
  return _SearchResults(matchingPackages, testResults);
});

class _SearchResults {
  const _SearchResults(this.packages, this.tests);
  final List<HealthPackage> packages;
  final List<LabTest> tests;
  bool get isEmpty => packages.isEmpty && tests.isEmpty;
}

class SearchScreen extends ConsumerStatefulWidget {
  const SearchScreen({super.key});

  @override
  ConsumerState<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends ConsumerState<SearchScreen> {
  final _controller = TextEditingController();
  Timer? _debounce;
  String _query = '';

  @override
  void dispose() {
    _debounce?.cancel();
    _controller.dispose();
    super.dispose();
  }

  void _onChanged(String value) {
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 350), () {
      if (mounted) setState(() => _query = value.trim());
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 0,
        title: TextField(
          controller: _controller,
          autofocus: true,
          textInputAction: TextInputAction.search,
          onChanged: _onChanged,
          onSubmitted: (v) => setState(() => _query = v.trim()),
          decoration: InputDecoration(
            hintText: 'Search tests or health packages',
            border: InputBorder.none,
            enabledBorder: InputBorder.none,
            filled: false,
            suffixIcon: _controller.text.isEmpty
                ? null
                : IconButton(
                    tooltip: 'Clear search',
                    icon: const Icon(Icons.close),
                    onPressed: () {
                      _controller.clear();
                      setState(() => _query = '');
                    },
                  ),
          ),
        ),
      ),
      body: _query.length < 2 ? _hint(context) : _results(),
    );
  }

  Widget _hint(BuildContext context) => const EmptyState(
    icon: Icons.manage_search_rounded,
    title: 'Find a test or package',
    message: 'Type at least two letters, for example "thyroid" or "vitamin".',
  );

  Widget _results() {
    final results = ref.watch(_searchProvider(_query));
    return AsyncValueView<_SearchResults>(
      value: results,
      onRetry: () => ref.invalidate(_searchProvider(_query)),
      data: (r) {
        if (r.isEmpty) {
          return EmptyState(
            icon: Icons.search_off_rounded,
            title: 'No matches for "$_query"',
            message: 'Try a different spelling, or upload a prescription and we will look for the tests on it.',
          );
        }
        return ListView(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
          children: [
            Semantics(
              liveRegion: true,
              child: Text(
                '${r.packages.length + r.tests.length} results',
                style: context.text.labelLarge?.copyWith(color: context.colors.onSurfaceVariant),
              ),
            ),
            if (r.packages.isNotEmpty) ...[
              const SizedBox(height: 12),
              Text('Packages', style: context.text.titleMedium),
              const SizedBox(height: 8),
              for (final p in r.packages) ...[PackageCard(package: p), const SizedBox(height: 10)],
            ],
            if (r.tests.isNotEmpty) ...[
              const SizedBox(height: 12),
              Text('Tests', style: context.text.titleMedium),
              const SizedBox(height: 8),
              for (final t in r.tests) ...[TestTile(test: t), const SizedBox(height: 10)],
            ],
          ],
        );
      },
    );
  }
}

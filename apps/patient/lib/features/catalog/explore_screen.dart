import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import 'package:qxl_core/qxl_core.dart';

import '../../data/models/catalog.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';
import 'catalog_widgets.dart';

enum ExploreTab {
  packages,
  tests,
  specialities;

  static ExploreTab parse(String? value) =>
      ExploreTab.values.firstWhere((t) => t.name == value, orElse: () => ExploreTab.packages);
}

class ExploreScreen extends StatefulWidget {
  const ExploreScreen({super.key, this.initialTab = ExploreTab.packages});

  final ExploreTab initialTab;

  @override
  State<ExploreScreen> createState() => _ExploreScreenState();
}

class _ExploreScreenState extends State<ExploreScreen> with SingleTickerProviderStateMixin {
  late final TabController _tabs = TabController(length: 3, vsync: this, initialIndex: widget.initialTab.index);

  @override
  void didUpdateWidget(ExploreScreen oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.initialTab != widget.initialTab) _tabs.animateTo(widget.initialTab.index);
  }

  @override
  void dispose() {
    _tabs.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tests & packages'),
        actions: [
          IconButton(
            tooltip: 'Search tests and packages',
            onPressed: () => context.push(Routes.search),
            icon: const Icon(Icons.search_rounded),
          ),
          IconButton(
            tooltip: 'Cart',
            onPressed: () => context.push(Routes.cart),
            icon: const Icon(Icons.shopping_bag_outlined),
          ),
        ],
        bottom: TabBar(
          controller: _tabs,
          // Let labels breathe at large text sizes instead of clipping.
          isScrollable: MediaQuery.textScalerOf(context).scale(1) > 1.2,
          tabAlignment: MediaQuery.textScalerOf(context).scale(1) > 1.2 ? TabAlignment.start : null,
          tabs: const [
            Tab(text: 'Packages'),
            Tab(text: 'Tests'),
            Tab(text: 'Specialities'),
          ],
        ),
      ),
      body: TabBarView(controller: _tabs, children: const [_PackagesTab(), _TestsTab(), _SpecialitiesTab()]),
    );
  }
}

class _PackagesTab extends ConsumerStatefulWidget {
  const _PackagesTab();

  @override
  ConsumerState<_PackagesTab> createState() => _PackagesTabState();
}

class _PackagesTabState extends ConsumerState<_PackagesTab> with AutomaticKeepAliveClientMixin {
  String? _category;
  bool _bookableOnly = false;

  @override
  bool get wantKeepAlive => true;

  @override
  Widget build(BuildContext context) {
    super.build(context);
    final packages = ref.watch(allPackagesProvider);
    return AsyncValueView<List<HealthPackage>>(
      value: packages,
      loading: const SkeletonList(itemHeight: 150),
      onRetry: () => ref.invalidate(allPackagesProvider),
      data: (all) {
        final categories = distinctCategories(all.map((p) => p.category));
        final visible = all
            .where((p) => _category == null || sameCategory(p.category, _category))
            .where((p) => !_bookableOnly || p.isBookableOnline)
            .toList();
        return RefreshIndicator(
          onRefresh: () => ref.refresh(allPackagesProvider.future),
          child: CustomScrollView(
            slivers: [
              SliverToBoxAdapter(
                child: CategoryChips(
                  categories: categories,
                  selected: _category,
                  onSelected: (v) => setState(() => _category = v),
                ),
              ),
              SliverToBoxAdapter(
                child: SwitchListTile(
                  value: _bookableOnly,
                  onChanged: (v) => setState(() => _bookableOnly = v),
                  title: const Text('Only show packages bookable online'),
                  dense: true,
                ),
              ),
              if (visible.isEmpty)
                const SliverFillRemaining(
                  hasScrollBody: false,
                  child: EmptyState(icon: Icons.inventory_2_outlined, title: 'No packages match these filters'),
                )
              else
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(16, 4, 16, 24),
                  sliver: SliverList.separated(
                    itemCount: visible.length,
                    separatorBuilder: (_, _) => const SizedBox(height: 12),
                    itemBuilder: (_, i) => PackageCard(package: visible[i]),
                  ),
                ),
            ],
          ),
        );
      },
    );
  }
}

class _TestsTab extends ConsumerStatefulWidget {
  const _TestsTab();

  @override
  ConsumerState<_TestsTab> createState() => _TestsTabState();
}

class _TestsTabState extends ConsumerState<_TestsTab> with AutomaticKeepAliveClientMixin {
  String? _category;

  @override
  bool get wantKeepAlive => true;

  @override
  Widget build(BuildContext context) {
    super.build(context);
    final tests = ref.watch(allTestsProvider);
    return AsyncValueView<List<LabTest>>(
      value: tests,
      loading: const SkeletonList(),
      onRetry: () => ref.invalidate(allTestsProvider),
      data: (all) {
        final categories = distinctCategories(all.map((t) => t.category));
        final visible = all.where((t) => _category == null || sameCategory(t.category, _category)).toList();
        return RefreshIndicator(
          onRefresh: () => ref.refresh(allTestsProvider.future),
          child: CustomScrollView(
            slivers: [
              SliverToBoxAdapter(
                child: CategoryChips(
                  categories: categories,
                  selected: _category,
                  onSelected: (v) => setState(() => _category = v),
                ),
              ),
              if (visible.isEmpty)
                const SliverFillRemaining(
                  hasScrollBody: false,
                  child: EmptyState(icon: Icons.biotech_outlined, title: 'No tests in this category'),
                )
              else
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(16, 4, 16, 24),
                  sliver: SliverList.separated(
                    itemCount: visible.length,
                    separatorBuilder: (_, _) => const SizedBox(height: 10),
                    itemBuilder: (_, i) => TestTile(test: visible[i]),
                  ),
                ),
            ],
          ),
        );
      },
    );
  }
}

class _SpecialitiesTab extends ConsumerWidget {
  const _SpecialitiesTab();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final specialities = ref.watch(specialitiesProvider);
    return AsyncValueView(
      value: specialities,
      onRetry: () => ref.invalidate(specialitiesProvider),
      data: (list) {
        if (list.isEmpty) {
          return const EmptyState(icon: Icons.medical_services_outlined, title: 'No specialities to show yet');
        }
        return RefreshIndicator(
          onRefresh: () => ref.refresh(specialitiesProvider.future),
          child: LayoutBuilder(
            builder: (context, constraints) {
              final columns = (constraints.maxWidth / 200).floor().clamp(2, 4);
              return GridView.builder(
                padding: const EdgeInsets.all(16),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: columns,
                  mainAxisSpacing: 12,
                  crossAxisSpacing: 12,
                  childAspectRatio: 0.92 / MediaQuery.textScalerOf(context).scale(1).clamp(1.0, 1.8),
                ),
                itemCount: list.length,
                itemBuilder: (_, i) => SpecialityCard(speciality: list[i]),
              );
            },
          ),
        );
      },
    );
  }
}

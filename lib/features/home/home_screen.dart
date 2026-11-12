import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/launch.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/common.dart';
import '../../core/widgets/states.dart';
import '../../data/models/content.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';
import '../auth/auth_controller.dart';
import '../catalog/catalog_widgets.dart';
import '../catalog/explore_screen.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  Future<void> _refresh(WidgetRef ref) async {
    ref
      ..invalidate(bannersProvider)
      ..invalidate(specialitiesProvider)
      ..invalidate(reviewsProvider)
      ..invalidate(doctorsProvider)
      ..invalidate(siteSettingsProvider)
      ..invalidate(featuredPackagesProvider);
    await ref.read(featuredPackagesProvider.future);
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authControllerProvider).value;
    final settings = ref.watch(siteSettingsProvider).value;
    return Scaffold(
      body: RefreshIndicator(
        onRefresh: () => _refresh(ref),
        child: CustomScrollView(
          slivers: [
            SliverAppBar(
              floating: true,
              titleSpacing: 16,
              title: Row(
                children: [
                  const QxlLogo(size: 36),
                  const SizedBox(width: 10),
                  Flexible(
                    child: Text(
                      user?.name != null ? 'Hi, ${user!.name!.split(' ').first}' : 'QXL Diagnostics',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
              actions: [
                if (settings?.aiChatEnabled ?? true)
                  IconButton(
                    tooltip: 'Ask the QXL assistant',
                    onPressed: () => context.push(Routes.assistant),
                    icon: const Icon(Icons.auto_awesome_outlined),
                  ),
                IconButton(
                  tooltip: 'Cart',
                  onPressed: () => context.push(Routes.cart),
                  icon: const Icon(Icons.shopping_bag_outlined),
                ),
              ],
            ),
            SliverToBoxAdapter(child: _SearchField(onTap: () => context.push(Routes.search))),
            if (settings?.maintenanceMode == true)
              const SliverToBoxAdapter(
                child: Padding(
                  padding: EdgeInsets.fromLTRB(16, 12, 16, 0),
                  child: MedicalNotice(
                    text: 'QXL is undergoing maintenance. Some services may be briefly unavailable.',
                  ),
                ),
              ),
            if (settings?.announcement != null)
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
                  child: Card(
                    color: context.colors.secondaryContainer,
                    child: Padding(padding: const EdgeInsets.all(14), child: Text(settings!.announcement!)),
                  ),
                ),
              ),
            const SliverToBoxAdapter(child: _BannerCarousel()),
            const SliverToBoxAdapter(child: _QuickActions()),
            const SliverToBoxAdapter(child: _FeaturedPackages()),
            const SliverToBoxAdapter(child: _Specialities()),
            const SliverToBoxAdapter(child: _Doctors()),
            const SliverToBoxAdapter(child: _Reviews()),
            SliverToBoxAdapter(child: _HelpCard(settings: settings)),
            const SliverToBoxAdapter(child: SizedBox(height: 24)),
          ],
        ),
      ),
    );
  }
}

class _SearchField extends StatelessWidget {
  const _SearchField({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 4, 16, 8),
      child: Semantics(
        button: true,
        label: 'Search tests and packages',
        excludeSemantics: true,
        child: Material(
          color: context.colors.surfaceContainerHigh,
          borderRadius: BorderRadius.circular(16),
          child: InkWell(
            borderRadius: BorderRadius.circular(16),
            onTap: onTap,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              child: Row(
                children: [
                  Icon(Icons.search_rounded, color: context.colors.onSurfaceVariant),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      'Search tests or health packages',
                      style: context.text.bodyLarge?.copyWith(color: context.colors.onSurfaceVariant),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _BannerCarousel extends ConsumerStatefulWidget {
  const _BannerCarousel();

  @override
  ConsumerState<_BannerCarousel> createState() => _BannerCarouselState();
}

class _BannerCarouselState extends ConsumerState<_BannerCarousel> {
  final _controller = PageController(viewportFraction: 0.92);
  Timer? _timer;
  int _page = 0;

  @override
  void dispose() {
    _timer?.cancel();
    _controller.dispose();
    super.dispose();
  }

  void _autoplay(int count) {
    if (_timer != null || count < 2) return;
    _timer = Timer.periodic(const Duration(seconds: 6), (_) {
      if (!mounted || !_controller.hasClients) return;
      if (MediaQuery.maybeDisableAnimationsOf(context) ?? false) return;
      _controller.animateToPage(
        (_page + 1) % count,
        duration: const Duration(milliseconds: 400),
        curve: Curves.easeOut,
      );
    });
  }

  /// Banners without a link the app understands are informational only.
  VoidCallback? _actionFor(PromoBanner banner) {
    final route = appRouteForCmsLink(banner.ctaLink);
    return route == null ? null : () => context.go(route);
  }

  @override
  Widget build(BuildContext context) {
    final banners = ref.watch(bannersProvider);
    return banners.when(
      loading: () => const Padding(padding: EdgeInsets.all(16), child: SkeletonBox(height: 170, radius: 20)),
      error: (e, _) => ErrorState(error: e, compact: true, onRetry: () => ref.invalidate(bannersProvider)),
      data: (list) {
        final visible = list.where((b) => b.imageUrl != null || b.title != null).toList();
        if (visible.isEmpty) return const SizedBox(height: 8);
        _autoplay(visible.length);
        return Column(
          children: [
            const SizedBox(height: 8),
            AspectRatio(
              aspectRatio: 2.1,
              child: PageView.builder(
                controller: _controller,
                itemCount: visible.length,
                onPageChanged: (i) => setState(() => _page = i),
                itemBuilder: (context, i) => Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: _BannerTile(banner: visible[i], onTap: _actionFor(visible[i])),
                ),
              ),
            ),
            if (visible.length > 1)
              Padding(
                padding: const EdgeInsets.only(top: 10),
                child: ExcludeSemantics(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      for (var i = 0; i < visible.length; i++)
                        AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          margin: const EdgeInsets.symmetric(horizontal: 3),
                          width: i == _page ? 18 : 6,
                          height: 6,
                          decoration: BoxDecoration(
                            color: i == _page ? context.colors.primary : context.colors.outlineVariant,
                            borderRadius: BorderRadius.circular(3),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
          ],
        );
      },
    );
  }
}

Color? _hex(String? value) {
  if (value == null) return null;
  final hex = value.replaceFirst('#', '');
  if (hex.length != 6) return null;
  final parsed = int.tryParse(hex, radix: 16);
  return parsed == null ? null : Color(0xFF000000 | parsed);
}

class _BannerTile extends StatelessWidget {
  const _BannerTile({required this.banner, required this.onTap});

  final PromoBanner banner;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final b = banner;
    final from = _hex(b.bgFrom) ?? Brand.ink;
    final to = _hex(b.bgTo) ?? Brand.blue;
    return Semantics(
      button: onTap != null,
      label: b.accessibleLabel.isEmpty ? 'Featured offer' : b.accessibleLabel,
      excludeSemantics: true,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: Material(
          child: InkWell(
            onTap: onTap,
            child: Ink(
              decoration: BoxDecoration(gradient: LinearGradient(colors: [from, to])),
              child: b.imageOnly && b.imageUrl != null
                  ? NetImage(b.imageUrl, fit: b.imageFit == 'contain' ? BoxFit.contain : BoxFit.cover)
                  : Row(
                      children: [
                        Expanded(
                          flex: 3,
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                if (b.badge != null) Tag(b.badge!, color: Colors.white),
                                const SizedBox(height: 6),
                                if (b.title != null)
                                  Text(
                                    [b.title, b.titleAccent].whereType<String>().join(' '),
                                    style: context.text.titleMedium?.copyWith(color: Colors.white),
                                    maxLines: 3,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                if (b.subtitle != null)
                                  Text(
                                    b.subtitle!,
                                    style: context.text.bodySmall?.copyWith(color: Colors.white70),
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                if (b.ctaLabel != null) ...[
                                  const SizedBox(height: 8),
                                  Text(
                                    '${b.ctaLabel!} →',
                                    style: context.text.labelLarge?.copyWith(
                                      color: Colors.white,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                ],
                              ],
                            ),
                          ),
                        ),
                        if (b.imageUrl != null) Expanded(flex: 2, child: NetImage(b.imageUrl)),
                      ],
                    ),
            ),
          ),
        ),
      ),
    );
  }
}

class _QuickActions extends ConsumerWidget {
  const _QuickActions();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final aiEnabled = ref.watch(siteSettingsProvider).value?.aiChatEnabled ?? true;
    final actions = [
      (Icons.biotech_outlined, 'Book a test', Brand.blue, () => context.go(Routes.exploreTab(ExploreTab.tests))),
      (
        Icons.inventory_2_outlined,
        'Health packages',
        Brand.mint,
        () => context.go(Routes.exploreTab(ExploreTab.packages)),
      ),
      (Icons.upload_file_outlined, 'Upload prescription', Brand.coral, () => context.push(Routes.prescriptions)),
      (Icons.description_outlined, 'My reports', Brand.lilac, () => context.go(Routes.bookings)),
      (Icons.location_on_outlined, 'Find a centre', Brand.sky, () => context.push(Routes.centers)),
      if (aiEnabled) (Icons.auto_awesome_outlined, 'Ask assistant', Brand.peach, () => context.push(Routes.assistant)),
    ];
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 20, 16, 0),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final largeText = MediaQuery.textScalerOf(context).scale(1) > 1.3;
          final columns = constraints.maxWidth > 560 ? 6 : (largeText ? 2 : 3);
          final width = (constraints.maxWidth - (columns - 1) * 10) / columns;
          return Wrap(
            spacing: 10,
            runSpacing: 10,
            children: [
              for (final (icon, label, color, onTap) in actions)
                SizedBox(
                  width: width,
                  child: Material(
                    color: color.withValues(alpha: 0.12),
                    borderRadius: BorderRadius.circular(16),
                    child: InkWell(
                      borderRadius: BorderRadius.circular(16),
                      onTap: onTap,
                      child: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 8),
                        child: Column(
                          children: [
                            Icon(
                              icon,
                              color: Theme.of(context).brightness == Brightness.dark
                                  ? Color.lerp(color, Colors.white, 0.35)
                                  : Color.lerp(color, Colors.black, 0.35),
                              size: 28,
                            ),
                            const SizedBox(height: 8),
                            Text(label, textAlign: TextAlign.center, style: context.text.labelMedium),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
            ],
          );
        },
      ),
    );
  }
}

class _FeaturedPackages extends ConsumerWidget {
  const _FeaturedPackages();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final packages = ref.watch(featuredPackagesProvider);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectionHeader(
          title: 'Popular health packages',
          actionLabel: 'See all',
          onAction: () => context.go(Routes.exploreTab(ExploreTab.packages)),
        ),
        packages.when(
          loading: () => const Padding(padding: EdgeInsets.symmetric(horizontal: 16), child: SkeletonBox(height: 180)),
          error: (e, _) => ErrorState(error: e, compact: true, onRetry: () => ref.invalidate(featuredPackagesProvider)),
          data: (list) => list.isEmpty
              ? const SizedBox.shrink()
              // Sized to the tallest card so long names and large text
              // never clip (the featured list is short by design).
              : SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: IntrinsicHeight(
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        for (var i = 0; i < list.length; i++) ...[
                          if (i > 0) const SizedBox(width: 12),
                          PackageCard(package: list[i], width: 290),
                        ],
                      ],
                    ),
                  ),
                ),
        ),
      ],
    );
  }
}

class _Specialities extends ConsumerWidget {
  const _Specialities();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final specialities = ref.watch(specialitiesProvider);
    return specialities.maybeWhen(
      data: (list) => list.isEmpty
          ? const SizedBox.shrink()
          : Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SectionHeader(
                  title: 'Browse by speciality',
                  actionLabel: 'See all',
                  onAction: () => context.go(Routes.exploreTab(ExploreTab.specialities)),
                ),
                SizedBox(
                  height: 168 * MediaQuery.textScalerOf(context).scale(1).clamp(1.0, 1.5),
                  child: ListView.separated(
                    scrollDirection: Axis.horizontal,
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: list.length,
                    separatorBuilder: (_, _) => const SizedBox(width: 12),
                    itemBuilder: (_, i) => SizedBox(width: 150, child: SpecialityCard(speciality: list[i])),
                  ),
                ),
              ],
            ),
      orElse: () => const SizedBox.shrink(),
    );
  }
}

class _Doctors extends ConsumerWidget {
  const _Doctors();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final doctors = ref.watch(doctorsProvider);
    return doctors.maybeWhen(
      data: (list) => list.isEmpty
          ? const SizedBox.shrink()
          : Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SectionHeader(
                  title: 'Our doctors',
                  actionLabel: 'See all',
                  onAction: () => context.push(Routes.doctors),
                ),
                SizedBox(
                  height: 200 * MediaQuery.textScalerOf(context).scale(1).clamp(1.0, 1.5),
                  child: ListView.separated(
                    scrollDirection: Axis.horizontal,
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: list.length,
                    separatorBuilder: (_, _) => const SizedBox(width: 12),
                    itemBuilder: (_, i) {
                      final d = list[i];
                      return SizedBox(
                        width: 140,
                        child: Card(
                          child: InkWell(
                            onTap: () => context.push(Routes.doctor(d.slug)),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                Expanded(
                                  child: NetImage(d.photo, semanticLabel: d.name, fallbackIcon: Icons.person_outline),
                                ),
                                Padding(
                                  padding: const EdgeInsets.all(10),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        d.name,
                                        style: context.text.labelLarge,
                                        maxLines: 2,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                      if (d.qualification != null)
                                        Text(
                                          d.qualification!,
                                          style: context.text.labelSmall?.copyWith(
                                            color: context.colors.onSurfaceVariant,
                                          ),
                                          maxLines: 1,
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
      orElse: () => const SizedBox.shrink(),
    );
  }
}

class _Reviews extends ConsumerWidget {
  const _Reviews();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final reviews = ref.watch(reviewsProvider);
    return reviews.maybeWhen(
      data: (page) => page.items.isEmpty
          ? const SizedBox.shrink()
          : Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SectionHeader(title: 'What patients say'),
                SizedBox(
                  height: 150 * MediaQuery.textScalerOf(context).scale(1).clamp(1.0, 1.6),
                  child: ListView.separated(
                    scrollDirection: Axis.horizontal,
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: page.items.length,
                    separatorBuilder: (_, _) => const SizedBox(width: 12),
                    itemBuilder: (_, i) {
                      final r = page.items[i];
                      return SizedBox(
                        width: 270,
                        child: Card(
                          child: Padding(
                            padding: const EdgeInsets.all(14),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Semantics(
                                  label: 'Rated ${r.rating} out of 5',
                                  excludeSemantics: true,
                                  child: Row(
                                    children: [
                                      for (var s = 0; s < 5; s++)
                                        Icon(
                                          s < r.rating ? Icons.star_rounded : Icons.star_outline_rounded,
                                          size: 18,
                                          color: Brand.peach.withValues(alpha: 1),
                                        ),
                                    ],
                                  ),
                                ),
                                const SizedBox(height: 8),
                                Expanded(
                                  child: Text(r.content, style: context.text.bodyMedium, overflow: TextOverflow.fade),
                                ),
                                Text(r.authorName, style: context.text.labelMedium),
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
      orElse: () => const SizedBox.shrink(),
    );
  }
}

class _HelpCard extends StatelessWidget {
  const _HelpCard({required this.settings});

  final SiteSettings? settings;

  @override
  Widget build(BuildContext context) {
    final s = settings;
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 24, 16, 0),
      child: Card(
        color: context.colors.secondaryContainer,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Need help booking?', style: context.text.titleMedium),
              const SizedBox(height: 4),
              const Text('Talk to the QXL team, or browse answers to common questions.'),
              const SizedBox(height: 12),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  if (s?.phoneE164 != null)
                    FilledButton.tonalIcon(
                      onPressed: () => Launch.phone(context, s!.phoneE164!),
                      icon: const Icon(Icons.call_outlined),
                      label: const Text('Call'),
                    ),
                  if (s?.whatsappNumber != null)
                    FilledButton.tonalIcon(
                      onPressed: () => Launch.whatsapp(context, s!.whatsappNumber!),
                      icon: const Icon(Icons.chat_outlined),
                      label: const Text('WhatsApp'),
                    ),
                  OutlinedButton(onPressed: () => context.push(Routes.faqs), child: const Text('FAQs')),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

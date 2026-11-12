import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/format.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/common.dart';
import '../../core/widgets/states.dart';
import '../../data/models/content.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';

final blogListProvider = FutureProvider.autoDispose<Paged<BlogPost>>(
  (ref) => ref.watch(contentRepositoryProvider).blog(limit: 50),
);

final blogPostProvider = FutureProvider.autoDispose.family<BlogPost, String>(
  (ref, slug) => ref.watch(contentRepositoryProvider).blogPost(slug),
);

class BlogListScreen extends ConsumerWidget {
  const BlogListScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final posts = ref.watch(blogListProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Health articles')),
      body: AsyncValueView<Paged<BlogPost>>(
        value: posts,
        loading: const SkeletonList(itemHeight: 110),
        onRetry: () => ref.invalidate(blogListProvider),
        data: (page) => page.items.isEmpty
            ? const EmptyState(icon: Icons.article_outlined, title: 'No articles yet')
            : RefreshIndicator(
                onRefresh: () => ref.refresh(blogListProvider.future),
                child: ListView.separated(
                  padding: const EdgeInsets.all(16),
                  itemCount: page.items.length,
                  separatorBuilder: (_, _) => const SizedBox(height: 12),
                  itemBuilder: (_, i) {
                    final p = page.items[i];
                    return Card(
                      child: InkWell(
                        onTap: () => context.push(Routes.blogPost(p.slug)),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            if (p.imageUrl != null) AspectRatio(aspectRatio: 16 / 7, child: NetImage(p.imageUrl)),
                            Padding(
                              padding: const EdgeInsets.all(14),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  if (p.category != null) Tag(p.category!),
                                  const SizedBox(height: 6),
                                  Text(p.title, style: context.text.titleSmall),
                                  if (p.excerpt != null) ...[
                                    const SizedBox(height: 4),
                                    Text(
                                      p.excerpt!,
                                      maxLines: 3,
                                      overflow: TextOverflow.ellipsis,
                                      style: context.text.bodySmall,
                                    ),
                                  ],
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
      ),
    );
  }
}

class BlogPostScreen extends ConsumerWidget {
  const BlogPostScreen({super.key, required this.slug});

  final String slug;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final post = ref.watch(blogPostProvider(slug));
    return Scaffold(
      appBar: AppBar(),
      body: AsyncValueView<BlogPost>(
        value: post,
        onRetry: () => ref.invalidate(blogPostProvider(slug)),
        data: (p) {
          final paragraphs = (p.content ?? '')
              .split(RegExp(r'\n\s*\n'))
              .map((s) => s.trim())
              .where((s) => s.isNotEmpty);
          return ListView(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 32),
            children: [
              if (p.imageUrl != null)
                ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: AspectRatio(aspectRatio: 16 / 9, child: NetImage(p.imageUrl)),
                ),
              const SizedBox(height: 16),
              Semantics(header: true, child: Text(p.title, style: context.text.headlineSmall)),
              const SizedBox(height: 8),
              Text(
                [if (p.author != null) p.author!, if (p.createdAt != null) formatDate(p.createdAt!)].join(' · '),
                style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
              ),
              const SizedBox(height: 16),
              for (final para in paragraphs) ...[
                Text(para, style: context.text.bodyLarge?.copyWith(height: 1.55)),
                const SizedBox(height: 14),
              ],
              const SizedBox(height: 8),
              const MedicalNotice(),
            ],
          );
        },
      ),
    );
  }
}

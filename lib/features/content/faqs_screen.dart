import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/theme/app_theme.dart';
import '../../core/widgets/states.dart';
import '../../data/models/content.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';

class FaqsScreen extends ConsumerWidget {
  const FaqsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final faqs = ref.watch(faqsProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Frequently asked questions')),
      body: AsyncValueView<List<Faq>>(
        value: faqs,
        onRetry: () => ref.invalidate(faqsProvider),
        data: (list) {
          if (list.isEmpty) {
            return EmptyState(
              icon: Icons.help_outline,
              title: 'No FAQs yet',
              action: OutlinedButton(
                onPressed: () => context.push(Routes.contact),
                child: const Text('Ask us a question'),
              ),
            );
          }
          return ListView(
            padding: const EdgeInsets.symmetric(vertical: 8),
            children: [
              for (final f in list)
                ExpansionTile(
                  title: Text(f.question, style: context.text.titleSmall),
                  childrenPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                  expandedAlignment: Alignment.centerLeft,
                  children: [SelectableText(f.answer, style: context.text.bodyMedium)],
                ),
              Padding(
                padding: const EdgeInsets.all(16),
                child: OutlinedButton.icon(
                  onPressed: () => context.push(Routes.contact),
                  icon: const Icon(Icons.mail_outline),
                  label: const Text('Still have a question? Contact us'),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}

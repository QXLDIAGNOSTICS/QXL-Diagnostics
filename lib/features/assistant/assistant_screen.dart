import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/format.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/common.dart';
import '../../core/widgets/states.dart';
import '../../data/models/booking.dart';
import '../../data/models/records.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';
import '../auth/auth_controller.dart';
import '../payment/payment_gateway.dart';
import '../payment/payment_screen.dart';
import 'assistant_controller.dart';

class AssistantScreen extends ConsumerStatefulWidget {
  const AssistantScreen({super.key});

  @override
  ConsumerState<AssistantScreen> createState() => _AssistantScreenState();
}

class _AssistantScreenState extends ConsumerState<AssistantScreen> {
  final _input = TextEditingController();
  final _scroll = ScrollController();

  @override
  void dispose() {
    _input.dispose();
    _scroll.dispose();
    super.dispose();
  }

  void _send([String? preset]) {
    final text = preset ?? _input.text;
    if (text.trim().isEmpty) return;
    _input.clear();
    ref.read(assistantProvider.notifier).send(text);
    _scrollToEnd();
  }

  void _scrollToEnd() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scroll.hasClients) {
        _scroll.animateTo(
          _scroll.position.maxScrollExtent,
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut,
        );
      }
    });
  }

  Future<void> _showHistory() async {
    final id = await showModalBottomSheet<String>(
      context: context,
      isScrollControlled: true,
      builder: (context) => const _HistorySheet(),
    );
    if (id != null) {
      await ref.read(assistantProvider.notifier).openConversation(id);
      _scrollToEnd();
    }
  }

  @override
  Widget build(BuildContext context) {
    final settings = ref.watch(siteSettingsProvider);
    final enabled = settings.value?.aiChatEnabled ?? true;
    final state = ref.watch(assistantProvider);
    final signedIn = ref.watch(currentUserIdProvider) != null;
    ref.listen(assistantProvider.select((s) => s.messages.length), (_, _) => _scrollToEnd());
    ref.listen(assistantProvider.select((s) => s.messages.isEmpty ? 0 : s.messages.last.content.length), (_, _) {
      if (_scroll.hasClients && _scroll.position.extentAfter < 120) _scrollToEnd();
    });

    return Scaffold(
      appBar: AppBar(
        title: const Text('QXL Assistant'),
        actions: [
          if (signedIn)
            IconButton(tooltip: 'Past conversations', onPressed: _showHistory, icon: const Icon(Icons.history_rounded)),
          IconButton(
            tooltip: 'New conversation',
            onPressed: state.streaming ? null : () => ref.read(assistantProvider.notifier).newConversation(),
            icon: const Icon(Icons.add_comment_outlined),
          ),
        ],
      ),
      body: !enabled
          ? const EmptyState(
              icon: Icons.chat_bubble_outline,
              title: 'The assistant is unavailable right now',
              message: 'Please call QXL or browse tests and packages in the app.',
            )
          : Column(
              children: [
                Expanded(
                  child: state.loadingHistory
                      ? const LoadingState()
                      : ListView(
                          controller: _scroll,
                          padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
                          children: [
                            const MedicalNotice(
                              text:
                                  'The assistant can help with QXL tests, packages, centres and bookings. '
                                  'It is not a doctor and can make mistakes. For a medical emergency, call 112.',
                            ),
                            const SizedBox(height: 12),
                            if (state.messages.isEmpty) _Suggestions(onTap: _send, signedIn: signedIn),
                            for (var i = 0; i < state.messages.length; i++)
                              _Bubble(
                                message: state.messages[i],
                                streaming: state.streaming && i == state.messages.length - 1,
                              ),
                            if (state.paymentOrder != null) _PaymentCard(order: state.paymentOrder!),
                            if (state.error != null)
                              Padding(
                                padding: const EdgeInsets.only(top: 8),
                                child: Semantics(
                                  liveRegion: true,
                                  child: Text(
                                    state.error!,
                                    style: context.text.bodyMedium?.copyWith(color: context.colors.error),
                                  ),
                                ),
                              ),
                          ],
                        ),
                ),
                _Composer(
                  controller: _input,
                  streaming: state.streaming,
                  onSend: _send,
                  onStop: () => ref.read(assistantProvider.notifier).stop(),
                ),
              ],
            ),
    );
  }
}

class _Suggestions extends StatelessWidget {
  const _Suggestions({required this.onTap, required this.signedIn});

  final ValueChanged<String> onTap;
  final bool signedIn;

  @override
  Widget build(BuildContext context) {
    final prompts = [
      'Which tests check thyroid function?',
      'Do I need to fast before a lipid profile?',
      'Which QXL centre is closest to me?',
      if (signedIn) 'What is the status of my latest booking?',
    ];
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Try asking', style: context.text.titleSmall),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [for (final p in prompts) ActionChip(label: Text(p), onPressed: () => onTap(p))],
          ),
        ],
      ),
    );
  }
}

class _Bubble extends StatelessWidget {
  const _Bubble({required this.message, required this.streaming});

  final ChatMessage message;
  final bool streaming;

  @override
  Widget build(BuildContext context) {
    final mine = message.role == ChatRole.user;
    final bg = mine ? context.colors.primary : context.colors.surfaceContainerHigh;
    final fg = mine ? context.colors.onPrimary : context.colors.onSurface;
    return Align(
      alignment: mine ? Alignment.centerRight : Alignment.centerLeft,
      child: ConstrainedBox(
        constraints: BoxConstraints(maxWidth: MediaQuery.sizeOf(context).width * 0.85),
        child: Container(
          margin: const EdgeInsets.symmetric(vertical: 4),
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
          decoration: BoxDecoration(
            color: bg,
            borderRadius: BorderRadius.only(
              topLeft: const Radius.circular(18),
              topRight: const Radius.circular(18),
              bottomLeft: Radius.circular(mine ? 18 : 4),
              bottomRight: Radius.circular(mine ? 4 : 18),
            ),
          ),
          child: Semantics(
            label: mine ? 'You said' : 'Assistant replied',
            child: message.content.isEmpty && streaming
                ? SizedBox(
                    width: 36,
                    child: LinearProgressIndicator(color: fg, backgroundColor: Colors.transparent, minHeight: 3),
                  )
                : SelectableText.rich(formatChatText(message.content, context.text.bodyLarge!.copyWith(color: fg))),
          ),
        ),
      ),
    );
  }
}

/// Minimal formatting for model replies: `**bold**` and `-`/`*` bullets.
TextSpan formatChatText(String text, TextStyle base) {
  final spans = <InlineSpan>[];
  final lines = text.split('\n');
  for (var li = 0; li < lines.length; li++) {
    var line = lines[li];
    final bullet = RegExp(r'^\s*[-*]\s+').firstMatch(line);
    if (bullet != null) line = '•  ${line.substring(bullet.end)}';
    final parts = line.split('**');
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].isEmpty) continue;
      spans.add(
        TextSpan(
          text: parts[i],
          style: i.isOdd ? base.copyWith(fontWeight: FontWeight.w700) : base,
        ),
      );
    }
    if (li < lines.length - 1) spans.add(TextSpan(text: '\n', style: base));
  }
  return TextSpan(children: spans, style: base);
}

class _PaymentCard extends ConsumerWidget {
  const _PaymentCard({required this.order});

  final PaymentOrder order;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authControllerProvider).value;
    return Card(
      margin: const EdgeInsets.only(top: 8),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Payment for your booking', style: context.text.titleSmall),
            const SizedBox(height: 4),
            Text(
              '${order.bookingIds.length} booking${order.bookingIds.length == 1 ? '' : 's'} · ${formatPaise(order.amountPaise)}',
              style: context.text.bodyMedium,
            ),
            const SizedBox(height: 4),
            Text(
              'Check the booking details before paying. Nothing is charged until you confirm on the next screen.',
              style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                FilledButton(
                  onPressed: () {
                    ref.read(assistantProvider.notifier).dismissPayment();
                    context.push(
                      Routes.pay,
                      extra: PayRequest(
                        existingOrder: order,
                        prefill: PaymentPrefill(name: user?.name, phone: user?.phone, email: user?.email),
                      ),
                    );
                  },
                  child: const Text('Review and pay'),
                ),
                const SizedBox(width: 8),
                TextButton(onPressed: () => context.go(Routes.bookings), child: const Text('View bookings')),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _Composer extends StatelessWidget {
  const _Composer({required this.controller, required this.streaming, required this.onSend, required this.onStop});

  final TextEditingController controller;
  final bool streaming;
  final VoidCallback onSend;
  final VoidCallback onStop;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: context.colors.surfaceContainer,
      child: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(12, 8, 8, 8),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Expanded(
                child: TextField(
                  controller: controller,
                  minLines: 1,
                  maxLines: 5,
                  maxLength: 4000,
                  textCapitalization: TextCapitalization.sentences,
                  textInputAction: TextInputAction.send,
                  onSubmitted: (_) => streaming ? null : onSend(),
                  decoration: const InputDecoration(hintText: 'Ask about tests, prices, centres…', counterText: ''),
                ),
              ),
              const SizedBox(width: 8),
              streaming
                  ? IconButton.filledTonal(tooltip: 'Stop', onPressed: onStop, icon: const Icon(Icons.stop_rounded))
                  : IconButton.filled(tooltip: 'Send', onPressed: onSend, icon: const Icon(Icons.send_rounded)),
            ],
          ),
        ),
      ),
    );
  }
}

class _HistorySheet extends ConsumerWidget {
  const _HistorySheet();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final conversations = ref.watch(conversationsProvider);
    return DraggableScrollableSheet(
      expand: false,
      initialChildSize: 0.6,
      builder: (context, scroll) => AsyncValueView<List<Conversation>>(
        value: conversations,
        onRetry: () => ref.invalidate(conversationsProvider),
        data: (list) => list.isEmpty
            ? const EmptyState(icon: Icons.history_rounded, title: 'No past conversations')
            : ListView(
                controller: scroll,
                children: [
                  Padding(
                    padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
                    child: Text('Past conversations', style: context.text.titleMedium),
                  ),
                  for (final c in list)
                    ListTile(
                      leading: const Icon(Icons.chat_bubble_outline),
                      title: Text(c.title ?? 'Conversation', maxLines: 1, overflow: TextOverflow.ellipsis),
                      subtitle: c.createdAt == null ? null : Text(formatDateTime(c.createdAt!)),
                      onTap: () => Navigator.pop(context, c.id),
                    ),
                ],
              ),
      ),
    );
  }
}

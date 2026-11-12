import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_exception.dart';
import '../../data/models/booking.dart';
import '../../data/models/records.dart';
import '../../data/providers.dart';
import '../auth/auth_controller.dart';

@immutable
class AssistantState {
  const AssistantState({
    this.messages = const [],
    this.conversationId,
    this.streaming = false,
    this.error,
    this.interrupted = false,
    this.paymentOrder,
    this.loadingHistory = false,
  });

  final List<ChatMessage> messages;
  final String? conversationId;
  final bool streaming;
  final String? error;

  /// The last reply stopped early (network drop or user cancel).
  final bool interrupted;

  /// Set when the assistant created bookings + an order for the user.
  final PaymentOrder? paymentOrder;
  final bool loadingHistory;

  AssistantState copyWith({
    List<ChatMessage>? messages,
    String? conversationId,
    bool? streaming,
    String? error,
    bool clearError = false,
    bool? interrupted,
    PaymentOrder? paymentOrder,
    bool clearPaymentOrder = false,
    bool? loadingHistory,
  }) => AssistantState(
    messages: messages ?? this.messages,
    conversationId: conversationId ?? this.conversationId,
    streaming: streaming ?? this.streaming,
    error: clearError ? null : (error ?? this.error),
    interrupted: interrupted ?? this.interrupted,
    paymentOrder: clearPaymentOrder ? null : (paymentOrder ?? this.paymentOrder),
    loadingHistory: loadingHistory ?? this.loadingHistory,
  );
}

final assistantProvider = NotifierProvider<AssistantController, AssistantState>(AssistantController.new);

final chatQuotaProvider = FutureProvider.autoDispose<ChatQuota>((ref) {
  ref.watch(currentUserIdProvider);
  return ref.watch(chatRepositoryProvider).quota();
});

final conversationsProvider = FutureProvider.autoDispose<List<Conversation>>((ref) {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return const [];
  return ref.watch(chatRepositoryProvider).conversations();
});

class AssistantController extends Notifier<AssistantState> {
  CancelToken? _cancel;

  @override
  AssistantState build() {
    // A different account (or signing out) must never see the previous
    // account's conversation.
    ref.watch(currentUserIdProvider);
    ref.onDispose(() => _cancel?.cancel());
    return const AssistantState();
  }

  bool get _signedIn => ref.read(currentUserIdProvider) != null;

  Future<void> send(String text) async {
    final question = text.trim();
    if (question.isEmpty || state.streaming) return;
    if (question.length > 4000) {
      state = state.copyWith(error: 'Please keep your message under 4,000 characters.');
      return;
    }

    _cancel = CancelToken();
    state = state.copyWith(
      messages: [
        ...state.messages,
        ChatMessage(role: ChatRole.user, content: question),
        const ChatMessage(role: ChatRole.assistant, content: ''),
      ],
      streaming: true,
      clearError: true,
      interrupted: false,
    );

    var gotAnswer = false;
    var gotDone = false;
    var gotError = false;
    try {
      final events = ref
          .read(chatRepositoryProvider)
          .ask(question, conversationId: _signedIn ? state.conversationId : null, cancelToken: _cancel);
      await for (final event in events) {
        if (!ref.mounted) return;
        switch (event) {
          case ChatConversationStarted(:final conversationId):
            if (_signedIn) state = state.copyWith(conversationId: conversationId);
          case ChatDelta(:final text):
            gotAnswer = true;
            _appendToReply(text);
          case ChatPaymentOrder(:final order):
            state = state.copyWith(paymentOrder: order);
          case ChatFailed():
            gotError = true;
            state = state.copyWith(error: 'The assistant couldn’t answer just now. Please try again.');
          case ChatDone():
            gotDone = true;
        }
      }
      // The stream closed without the server's end marker: never leave the
      // user looking at a question with no reply and no explanation.
      if (ref.mounted && !gotDone && !gotError) {
        state = gotAnswer
            ? state.copyWith(interrupted: true, error: 'The reply was cut off. Please try again.')
            : state.copyWith(error: 'The assistant couldn’t answer just now. Please try again later.');
      }
    } on ApiException catch (e) {
      if (!ref.mounted) return;
      if (e.kind == ApiErrorKind.cancelled) {
        state = state.copyWith(interrupted: gotAnswer);
      } else if (gotAnswer) {
        state = state.copyWith(
          interrupted: true,
          error: 'The reply was interrupted. ${e.isRetryable ? 'Check your connection and try again.' : ''}'.trim(),
        );
      } else {
        state = state.copyWith(error: e.message);
      }
    } catch (_) {
      if (!ref.mounted) return;
      state = state.copyWith(error: 'Something went wrong. Please try again.', interrupted: gotAnswer);
    } finally {
      if (ref.mounted) {
        _dropEmptyReply();
        state = state.copyWith(streaming: false);
        ref.invalidate(chatQuotaProvider);
        if (_signedIn) ref.invalidate(conversationsProvider);
      }
    }
  }

  void stop() => _cancel?.cancel();

  void _appendToReply(String text) {
    final messages = [...state.messages];
    final last = messages.removeLast();
    messages.add(last.copyWith(content: last.content + text));
    state = state.copyWith(messages: messages);
  }

  void _dropEmptyReply() {
    final last = state.messages.isEmpty ? null : state.messages.last;
    if (last != null && last.role == ChatRole.assistant && last.content.trim().isEmpty) {
      state = state.copyWith(messages: state.messages.sublist(0, state.messages.length - 1));
    }
  }

  void dismissPayment() => state = state.copyWith(clearPaymentOrder: true);

  void newConversation() {
    _cancel?.cancel();
    state = const AssistantState();
  }

  Future<void> openConversation(String id) async {
    _cancel?.cancel();
    state = AssistantState(conversationId: id, loadingHistory: true);
    try {
      final messages = await ref.read(chatRepositoryProvider).messages(id);
      if (!ref.mounted) return;
      state = AssistantState(conversationId: id, messages: messages);
    } catch (e) {
      if (!ref.mounted) return;
      state = AssistantState(conversationId: id, error: describeError(e));
    }
  }
}

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/format.dart';
import '../../core/network/api_exception.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/common.dart';
import '../../core/widgets/states.dart';
import '../../data/models/booking.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';
import '../bookings/bookings_screen.dart';
import '../checkout/booking_result_screen.dart';
import 'payment_gateway.dart';

/// What to pay for. Either fresh bookings from checkout/booking detail
/// (a server order is created here) or an order the assistant already made.
class PayRequest {
  const PayRequest({
    this.bookings = const [],
    this.existingOrder,
    this.applyHomeCollectionFee = true,
    this.isGuest = false,
    this.prefill = const PaymentPrefill(),
    this.afterCheckout = false,
  });

  final List<Booking> bookings;
  final PaymentOrder? existingOrder;

  /// The server applies its fee rule only to home collections under its
  /// threshold; the resulting fee is shown before paying.
  final bool applyHomeCollectionFee;
  final bool isGuest;
  final PaymentPrefill prefill;

  /// Opened straight after booking: leaving should land on the
  /// "booking saved, payment due" result, not an empty cart.
  final bool afterCheckout;

  List<String> get bookingIds => existingOrder?.bookingIds ?? bookings.map((b) => b.id).toList();
}

enum _Phase { creatingOrder, orderFailed, ready, inCheckout, verifying, failed, pendingConfirmation }

class PaymentScreen extends ConsumerStatefulWidget {
  const PaymentScreen({super.key, required this.request});

  final PayRequest? request;

  @override
  ConsumerState<PaymentScreen> createState() => _PaymentScreenState();
}

class _PaymentScreenState extends ConsumerState<PaymentScreen> {
  _Phase _phase = _Phase.creatingOrder;
  PaymentOrder? _order;
  Object? _error;
  String? _failureMessage;

  PayRequest get _request => widget.request!;

  @override
  void initState() {
    super.initState();
    if (widget.request == null) return;
    final existing = _request.existingOrder;
    if (existing != null && existing.isUsable) {
      _order = existing;
      _phase = _Phase.ready;
    } else {
      _createOrder();
    }
  }

  Future<void> _createOrder() async {
    setState(() {
      _phase = _Phase.creatingOrder;
      _error = null;
    });
    try {
      final order = await ref
          .read(paymentRepositoryProvider)
          .createOrder(_request.bookingIds, applyHomeCollectionFee: _request.applyHomeCollectionFee);
      if (!mounted) return;
      if (!order.isUsable) {
        throw const ApiException(kind: ApiErrorKind.server, message: 'Online payment is not available right now.');
      }
      setState(() {
        _order = order;
        _phase = _Phase.ready;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _error = e;
        _phase = _Phase.orderFailed;
      });
    }
  }

  Future<void> _pay() async {
    final order = _order;
    if (order == null || _phase == _Phase.inCheckout || _phase == _Phase.verifying) return;
    setState(() {
      _phase = _Phase.inCheckout;
      _failureMessage = null;
    });
    final outcome = await ref.read(paymentGatewayProvider).checkout(order, prefill: _request.prefill);
    if (!mounted) return;
    switch (outcome) {
      case GatewaySucceeded():
        await _verify(outcome);
      case GatewayFailed(:final cancelled, :final message):
        setState(() {
          _phase = _Phase.failed;
          _failureMessage = cancelled ? 'Payment was cancelled. You have not been charged.' : message;
        });
      case GatewayExternalWallet():
        _invalidateBookings();
        setState(() => _phase = _Phase.pendingConfirmation);
    }
  }

  Future<void> _verify(GatewaySucceeded result) async {
    setState(() => _phase = _Phase.verifying);
    try {
      final record = await ref
          .read(paymentRepositoryProvider)
          .verify(orderId: result.orderId, paymentId: result.paymentId, signature: result.signature);
      if (!mounted) return;
      _invalidateBookings();
      if (record.isPaid) {
        _goToResult(paid: true);
      } else {
        setState(() => _phase = _Phase.pendingConfirmation);
      }
    } catch (e) {
      if (!mounted) return;
      _invalidateBookings();
      // The gateway took the payment but our server couldn't confirm it yet.
      // Never claim success; the webhook will settle the final state.
      if (e is ApiException && (e.kind == ApiErrorKind.unauthorized || e.kind == ApiErrorKind.validation)) {
        setState(() {
          _phase = _Phase.failed;
          _failureMessage =
              'QXL could not verify this payment. If money was deducted, it will be refunded '
              'or reflected on your booking. Please contact support with your booking reference.';
        });
      } else {
        setState(() => _phase = _Phase.pendingConfirmation);
      }
    }
  }

  void _invalidateBookings() => ref.invalidate(myBookingsProvider);

  void _goToResult({required bool paid}) {
    context.pushReplacement(
      Routes.bookingResult,
      extra: BookingResult(
        bookings: _request.bookings,
        bookingIds: _request.bookingIds,
        paid: paid,
        paymentPending: !paid && _phase == _Phase.pendingConfirmation,
        isGuest: _request.isGuest,
        amountPaise: _order?.amountPaise,
      ),
    );
  }

  bool get _busy => _phase == _Phase.inCheckout || _phase == _Phase.verifying;

  @override
  Widget build(BuildContext context) {
    if (widget.request == null) {
      return Scaffold(
        appBar: AppBar(),
        body: const EmptyState(icon: Icons.payments_outlined, title: 'Nothing to pay for'),
      );
    }
    final leaveToResult =
        _request.afterCheckout && const {_Phase.ready, _Phase.failed, _Phase.orderFailed}.contains(_phase);
    return PopScope(
      canPop: !_busy && !leaveToResult,
      onPopInvokedWithResult: (didPop, _) {
        if (!didPop && leaveToResult) _goToResult(paid: false);
      },
      child: Scaffold(
        appBar: AppBar(title: const Text('Payment'), automaticallyImplyLeading: !_busy),
        body: switch (_phase) {
          _Phase.creatingOrder => const LoadingState(label: 'Preparing your payment'),
          _Phase.orderFailed => _OrderFailed(
            error: _error!,
            onRetry: _createOrder,
            onLater: () => _goToResult(paid: false),
          ),
          _Phase.verifying => const _Verifying(),
          _Phase.pendingConfirmation => _PendingConfirmation(onDone: () => _goToResult(paid: false)),
          _ => _Summary(
            request: _request,
            order: _order!,
            failureMessage: _phase == _Phase.failed ? _failureMessage : null,
          ),
        },
        bottomNavigationBar: switch (_phase) {
          _Phase.ready || _Phase.failed || _Phase.inCheckout => BottomActionBar(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                SizedBox(
                  width: double.infinity,
                  child: FilledButton.icon(
                    onPressed: _busy ? null : _pay,
                    icon: _busy
                        ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2.5))
                        : const Icon(Icons.lock_outline),
                    label: Text(
                      _phase == _Phase.failed
                          ? 'Try again · ${formatPaise(_order!.amountPaise)}'
                          : 'Pay ${formatPaise(_order!.amountPaise)}',
                    ),
                  ),
                ),
                const SizedBox(height: 4),
                TextButton(onPressed: _busy ? null : () => _goToResult(paid: false), child: const Text('Pay later')),
              ],
            ),
          ),
          _ => null,
        },
      ),
    );
  }
}

class _Summary extends StatelessWidget {
  const _Summary({required this.request, required this.order, this.failureMessage});

  final PayRequest request;
  final PaymentOrder order;
  final String? failureMessage;

  @override
  Widget build(BuildContext context) {
    final itemsPaise = order.amountPaise - order.collectionFeePaise;
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        if (failureMessage != null) ...[
          Card(
            color: context.colors.errorContainer,
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Semantics(
                liveRegion: true,
                child: Text(failureMessage!, style: TextStyle(color: context.colors.onErrorContainer)),
              ),
            ),
          ),
          const SizedBox(height: 16),
        ],
        Text('Booking request received', style: context.text.titleLarge),
        const SizedBox(height: 4),
        Text(
          'Pay now to secure your slot. The amounts below are confirmed by QXL.',
          style: context.text.bodyMedium?.copyWith(color: context.colors.onSurfaceVariant),
        ),
        const SizedBox(height: 16),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                for (final b in request.bookings)
                  _Line(
                    label: b.testName ?? 'Booking',
                    value: b.amountPaise == null ? '—' : formatPaise(b.amountPaise!),
                  ),
                if (request.bookings.isEmpty) _Line(label: 'Tests and packages', value: formatPaise(itemsPaise)),
                if (order.collectionFeePaise > 0)
                  _Line(label: 'Home collection fee', value: formatPaise(order.collectionFeePaise)),
                const Divider(height: 24),
                _Line(label: 'Total payable', value: formatPaise(order.amountPaise), bold: true),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Icon(Icons.verified_user_outlined, size: 18, color: context.colors.onSurfaceVariant),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                'Payments are processed securely by Razorpay. QXL never sees your card or UPI details.',
                style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _Line extends StatelessWidget {
  const _Line({required this.label, required this.value, this.bold = false});

  final String label;
  final String value;
  final bool bold;

  @override
  Widget build(BuildContext context) {
    final style = bold ? context.text.titleMedium : context.text.bodyLarge;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(child: Text(label, style: style)),
          const SizedBox(width: 16),
          Text(value, style: style),
        ],
      ),
    );
  }
}

class _OrderFailed extends StatelessWidget {
  const _OrderFailed({required this.error, required this.onRetry, required this.onLater});

  final Object error;
  final VoidCallback onRetry;
  final VoidCallback onLater;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.payments_outlined, size: 56, color: context.colors.outline),
            const SizedBox(height: 16),
            Text(
              "Your booking is saved, but payment couldn't start",
              style: context.text.titleMedium,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(describeError(error), textAlign: TextAlign.center),
            const SizedBox(height: 20),
            FilledButton(onPressed: onRetry, child: const Text('Try again')),
            TextButton(onPressed: onLater, child: const Text('Pay later')),
          ],
        ),
      ),
    );
  }
}

class _Verifying extends StatelessWidget {
  const _Verifying();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const CircularProgressIndicator(),
            const SizedBox(height: 20),
            Semantics(
              liveRegion: true,
              child: Text(
                'Confirming your payment with QXL…',
                style: context.text.titleMedium,
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 8),
            const Text('Please don’t close the app.', textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}

class _PendingConfirmation extends StatelessWidget {
  const _PendingConfirmation({required this.onDone});

  final VoidCallback onDone;

  @override
  Widget build(BuildContext context) {
    return EmptyState(
      icon: Icons.hourglass_top_rounded,
      title: 'Payment is being confirmed',
      message:
          'We haven’t received confirmation from the payment provider yet. '
          'Your booking will update automatically once it does — please don’t pay again in the meantime.',
      action: FilledButton(onPressed: onDone, child: const Text('Continue')),
    );
  }
}

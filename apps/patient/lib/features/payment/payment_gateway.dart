import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';

import '../../data/models/booking.dart';

sealed class GatewayOutcome {
  const GatewayOutcome();
}

/// Razorpay reported success. NOT proof of payment until the server
/// verifies the signature (`POST /payments/verify`).
class GatewaySucceeded extends GatewayOutcome {
  const GatewaySucceeded({required this.paymentId, required this.orderId, required this.signature});
  final String paymentId;
  final String orderId;
  final String signature;
}

class GatewayFailed extends GatewayOutcome {
  const GatewayFailed({required this.cancelled, this.message});
  final bool cancelled;
  final String? message;
}

/// The user chose a wallet app that completes outside the checkout sheet;
/// the final status arrives via the server webhook.
class GatewayExternalWallet extends GatewayOutcome {
  const GatewayExternalWallet(this.wallet);
  final String? wallet;
}

class PaymentPrefill {
  const PaymentPrefill({this.name, this.phone, this.email});
  final String? name;
  final String? phone;
  final String? email;
}

abstract interface class PaymentGateway {
  Future<GatewayOutcome> checkout(PaymentOrder order, {PaymentPrefill prefill});
}

/// Native Razorpay Checkout. Only the server-issued public key id and order
/// are used — no secret ever exists on the device.
class RazorpayGateway implements PaymentGateway {
  @override
  Future<GatewayOutcome> checkout(PaymentOrder order, {PaymentPrefill prefill = const PaymentPrefill()}) {
    final razorpay = Razorpay();
    final completer = Completer<GatewayOutcome>();

    void finish(GatewayOutcome outcome) {
      if (!completer.isCompleted) completer.complete(outcome);
      razorpay.clear();
    }

    razorpay
      ..on(Razorpay.EVENT_PAYMENT_SUCCESS, (PaymentSuccessResponse r) {
        final paymentId = r.paymentId;
        final signature = r.signature;
        if (paymentId == null || signature == null) {
          finish(const GatewayFailed(cancelled: false, message: 'The payment response was incomplete.'));
          return;
        }
        finish(GatewaySucceeded(paymentId: paymentId, orderId: r.orderId ?? order.orderId, signature: signature));
      })
      ..on(Razorpay.EVENT_PAYMENT_ERROR, (PaymentFailureResponse r) {
        finish(GatewayFailed(cancelled: r.code == Razorpay.PAYMENT_CANCELLED, message: _friendly(r)));
      })
      ..on(Razorpay.EVENT_EXTERNAL_WALLET, (ExternalWalletResponse r) {
        finish(GatewayExternalWallet(r.walletName));
      });

    try {
      razorpay.open({
        'key': order.keyId,
        'order_id': order.orderId,
        'amount': order.amountPaise,
        'currency': order.currency,
        'name': order.name ?? 'QXL Diagnostics',
        'description': order.description ?? 'Diagnostic test booking',
        'prefill': {
          if (prefill.name != null) 'name': prefill.name,
          if (prefill.phone != null) 'contact': prefill.phone,
          if (prefill.email != null) 'email': prefill.email,
        },
        'retry': {'enabled': true, 'max_count': 2},
      });
    } catch (_) {
      finish(const GatewayFailed(cancelled: false, message: "Couldn't open the payment screen on this device."));
    }
    return completer.future;
  }

  static String? _friendly(PaymentFailureResponse r) => switch (r.code) {
    Razorpay.PAYMENT_CANCELLED => 'Payment was cancelled.',
    Razorpay.NETWORK_ERROR => 'The payment could not be completed because of a network problem.',
    Razorpay.TLS_ERROR => 'This device could not open a secure payment connection.',
    _ => 'The payment did not go through.',
  };
}

final paymentGatewayProvider = Provider<PaymentGateway>((ref) => RazorpayGateway());

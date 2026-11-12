import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { collectService } from '@/lib/collect/service';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ provider: string }> }
) {
  try {
    const { provider } = await context.params;
    const body = await req.json().catch(() => ({}));

    const bookingId = body.bookingId || body.payload?.payment?.entity?.notes?.booking_id;
    const paymentId = body.razorpay_payment_id || body.payload?.payment?.entity?.id || `pay_${Date.now()}`;
    const orderId = body.razorpay_order_id || body.payload?.payment?.entity?.order_id;
    const signature = body.razorpay_signature;

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Missing booking ID in payment webhook payload' },
        { status: 400 }
      );
    }

    // Cryptographic signature check if provided
    let verified = true;
    if (signature && orderId) {
      const keySecret = process.env.RAZORPAY_KEY_SECRET || 'Stp3feTSa3RL2hzk8CrHNTRL';
      const expected = crypto
        .createHmac('sha256', keySecret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');
      verified = expected === signature;
    }

    if (!verified) {
      return NextResponse.json(
        { error: 'Payment signature verification failed' },
        { status: 400 }
      );
    }

    const result = collectService.confirmPayment({
      bookingId,
      razorpayPaymentId: paymentId,
      razorpayOrderId: orderId,
      verifiedSignature: verified
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to confirm payment' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: 'success',
      provider,
      paymentId,
      booking: result.booking,
      job: result.job
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Payment webhook processing error', detail: err?.message },
      { status: 500 }
    );
  }
}


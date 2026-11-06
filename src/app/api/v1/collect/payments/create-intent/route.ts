import { NextRequest, NextResponse } from 'next/server';
import { collectStore } from '@/lib/collect/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Missing required field "bookingId"' },
        { status: 400 }
      );
    }

    const booking = collectStore.getBooking(bookingId);
    if (!booking) {
      return NextResponse.json(
        { error: `Booking "${bookingId}" not found.` },
        { status: 404 }
      );
    }

    if (booking.netPayable <= 0) {
      return NextResponse.json(
        { error: 'Payable amount must be greater than zero.' },
        { status: 400 }
      );
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_TIoMgoerMx4pbE';
    const amountInPaise = Math.round(booking.netPayable * 100);
    const orderId = `order_collect_${Date.now().toString().slice(-8)}`;

    return NextResponse.json({
      status: 'success',
      key_id: keyId,
      order_id: orderId,
      amount: amountInPaise,
      currency: 'INR',
      bookingId: booking.bookingId,
      name: 'QXL Diagnostics',
      description: `Home Sample Collection — Booking ${booking.bookingId}`
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to create payment intent', detail: err?.message },
      { status: 500 }
    );
  }
}


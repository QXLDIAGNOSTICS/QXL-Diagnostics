import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required verification fields" },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET || "Stp3feTSa3RL2hzk8CrHNTRL";

    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isVerified = generatedSignature === razorpay_signature;

    if (!isVerified) {
      console.warn("Razorpay signature verification failed for payment:", razorpay_payment_id);
      return NextResponse.json(
        { error: "Invalid payment signature", verified: false },
        { status: 400 }
      );
    }

    return NextResponse.json({
      id: `pay_${razorpay_payment_id}`,
      booking_id: body.booking_id || "confirmed",
      extra_booking_ids: null,
      razorpay_order_id,
      razorpay_payment_id,
      amount: body.amount || 0,
      currency: "INR",
      status: "captured",
      verified: true,
    });
  } catch (err: any) {
    console.error("Error verifying Razorpay payment:", err);
    return NextResponse.json(
      { error: "Internal server error verifying payment", detail: err?.message },
      { status: 500 }
    );
  }
}

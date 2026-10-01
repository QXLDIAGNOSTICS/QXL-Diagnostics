import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_TIoMgoerMx4pbE";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "Stp3feTSa3RL2hzk8CrHNTRL";

    let amountInPaise = 100; // minimum fallback 1 INR in paise if unspecified
    if (typeof body.amount === "number" && body.amount > 0) {
      amountInPaise = Math.round(body.amount * 100);
    } else if (body.amount_paise && typeof body.amount_paise === "number") {
      amountInPaise = body.amount_paise;
    }

    const currency = body.currency || "INR";
    const bookingIds = body.booking_ids || body.bookingIds || [];

    // Call Razorpay REST API to create a genuine live order
    const authHeader = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const rzpResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency,
        receipt: `qxl_rcpt_${Date.now().toString().slice(-8)}`,
        notes: {
          booking_ids: Array.isArray(bookingIds) ? bookingIds.join(",") : String(bookingIds),
          merchant: "QXL Diagnostics",
        },
      }),
    });

    const rzpData = await rzpResponse.json();

    if (!rzpResponse.ok || !rzpData.id) {
      console.error("Razorpay API order creation failed:", rzpData);
      return NextResponse.json(
        {
          error: "Failed to create Razorpay live order",
          detail: rzpData,
          key_id: keyId,
        },
        { status: rzpResponse.status || 400 }
      );
    }

    return NextResponse.json({
      key_id: keyId,
      order_id: rzpData.id,
      amount: rzpData.amount,
      currency: rzpData.currency,
      booking_ids: bookingIds,
      name: "QXL Diagnostics",
      description: "Diagnostic test / package booking",
    });
  } catch (err: any) {
    console.error("Error creating Razorpay payment order:", err);
    return NextResponse.json(
      { error: "Internal server error creating payment order", detail: err?.message },
      { status: 500 }
    );
  }
}

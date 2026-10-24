import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_TIoMgoerMx4pbE";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "Stp3feTSa3RL2hzk8CrHNTRL";
    const currency = "INR";

    const bookingIds = body.booking_ids || body.bookingIds || [];
    const rawAmount =
      typeof body.amount === "number"
        ? body.amount
        : typeof body.amount_paise === "number"
        ? body.amount_paise / 100
        : 0;

    // Strict validation: Reject empty cart or ₹0 payable amount
    if ((!bookingIds.length && !body.items?.length && rawAmount <= 0) || rawAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid payable amount. Cart cannot be empty and amount must be greater than zero." },
        { status: 400 }
      );
    }

    const amountInPaise = Math.round(rawAmount * 100);

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

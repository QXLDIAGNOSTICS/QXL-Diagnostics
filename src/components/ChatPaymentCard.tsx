"use client";
import React, { useState } from "react";
import { CreditCard, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { openRazorpayCheckout } from "@/lib/razorpay";

export interface ChatPaymentOrder {
  key_id: string;
  order_id: string;
  amount: number;
  currency: string;
  booking_ids: string[];
  total_rupees: number;
}

interface ChatPaymentCardProps {
  order: ChatPaymentOrder;
  patientName?: string;
  patientPhone?: string;
}

/**
 * Renders a real, working "Pay Now" button directly inside an assistant chat
 * bubble from a `payment_order` SSE event (see chat_service.py /
 * chat_tools.py `create_payment_order`). Opens the actual Razorpay Checkout
 * modal — the chat itself never collects card/UPI details, only triggers
 * the same secure gateway used on the booking confirmation page.
 */
export default function ChatPaymentCard({ order, patientName, patientPhone }: ChatPaymentCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);

  const handlePay = async () => {
    setError(null);
    setLoading(true);
    try {
      await openRazorpayCheckout({
        order: {
          key_id: order.key_id,
          order_id: order.order_id,
          amount: order.amount,
          currency: order.currency,
          name: "QXL Diagnostics",
          description: "Diagnostic test / package booking",
        },
        prefill: { name: patientName, contact: patientPhone },
        onSuccess: async (payload) => {
          try {
            await api.payments.verify(payload);
            setPaid(true);
          } catch (err) {
            setError(
              err instanceof ApiError
                ? err.message
                : "We could not verify your payment. If money was deducted, please contact support with your payment ID."
            );
          } finally {
            setLoading(false);
          }
        },
        onFailure: (message) => {
          setError(message);
          setLoading(false);
        },
        onDismiss: () => setLoading(false),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start the payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-blue-100 p-3.5 flex flex-col gap-2.5 min-w-[220px]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#0f2d5e] uppercase tracking-wide">
          {order.booking_ids.length > 1 ? `${order.booking_ids.length} tests — combined total` : "Amount due"}
        </span>
        <span className="text-sm font-extrabold text-[#0f2d5e]">₹{order.total_rupees}</span>
      </div>
      {paid ? (
        <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" /> Payment successful
        </div>
      ) : (
        <button
          type="button"
          onClick={handlePay}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 bg-[#2563eb] text-white font-bold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider hover:bg-[#1d4ed8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
          {loading ? "Processing…" : `Pay ₹${order.total_rupees} Now`}
        </button>
      )}
      {error && (
        <p className="flex items-start gap-1.5 text-[11px] font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-2.5 py-2">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> {error}
        </p>
      )}
    </div>
  );
}

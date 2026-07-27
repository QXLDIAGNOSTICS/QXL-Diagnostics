"use client";

import React, { useState } from "react";
import { Loader2, CreditCard, CheckCircle2, AlertTriangle } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { openRazorpayCheckout } from "@/lib/razorpay";

interface RazorpayCheckoutButtonProps {
  /** All booking ids to pay for together in a single combined order. */
  bookingIds: string[];
  /** Display amount in rupees (informational only — the real amount is
   * always re-derived server-side from the bookings' catalog items). */
  amountRupees?: number | null;
  patientName?: string;
  patientEmail?: string | null;
  patientPhone?: string;
  onPaid?: () => void;
  className?: string;
}

export default function RazorpayCheckoutButton({
  bookingIds,
  amountRupees,
  patientName,
  patientEmail,
  patientPhone,
  onPaid,
  className,
}: RazorpayCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);

  const handlePay = async () => {
    setError(null);
    setLoading(true);
    try {
      const order = await api.payments.createOrder(bookingIds);
      await openRazorpayCheckout({
        order,
        prefill: { name: patientName, email: patientEmail, contact: patientPhone },
        onSuccess: async (payload) => {
          try {
            await api.payments.verify(payload);
            setPaid(true);
            onPaid?.();
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
      setError(
        err instanceof ApiError
          ? err.message
          : err instanceof Error
          ? err.message
          : "Could not start the payment. Please try again."
      );
      setLoading(false);
    }
  };

  if (paid) {
    return (
      <div className={`inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2 text-xs font-bold ${className || ""}`}>
        <CheckCircle2 className="w-4 h-4" /> Payment successful
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handlePay}
        disabled={loading}
        className={
          className ||
          "inline-flex items-center justify-center gap-2 bg-[#2563eb] text-white font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider hover:bg-[#1d4ed8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        }
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
        {loading ? "Processing…" : amountRupees != null ? `Pay ₹${amountRupees}` : "Pay Now"}
      </button>
      {error && (
        <p className="flex items-start gap-1.5 text-[11px] font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 max-w-xs">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> {error}
        </p>
      )}
    </div>
  );
}

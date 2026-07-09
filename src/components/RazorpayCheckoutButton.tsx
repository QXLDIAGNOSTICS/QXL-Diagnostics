"use client";

import React, { useState } from "react";
import { Loader2, CreditCard, CheckCircle2, AlertTriangle } from "lucide-react";
import { api, ApiError } from "@/lib/api";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

let checkoutScriptPromise: Promise<void> | null = null;

function loadCheckoutScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"));
  if (window.Razorpay) return Promise.resolve();
  if (checkoutScriptPromise) return checkoutScriptPromise;

  checkoutScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${CHECKOUT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Razorpay checkout script")));
      return;
    }
    const script = document.createElement("script");
    script.src = CHECKOUT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout script"));
    document.body.appendChild(script);
  });
  return checkoutScriptPromise;
}

interface RazorpayCheckoutButtonProps {
  bookingId: string;
  /** Display amount in rupees (informational only — the real amount is
   * always re-derived server-side from the booking's catalog item). */
  amountRupees?: number | null;
  patientName?: string;
  patientEmail?: string | null;
  patientPhone?: string;
  onPaid?: () => void;
  className?: string;
}

export default function RazorpayCheckoutButton({
  bookingId,
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
      await loadCheckoutScript();
      const order = await api.payments.createOrder(bookingId);

      if (!window.Razorpay) {
        throw new Error("Payment gateway could not be loaded. Please check your connection and try again.");
      }

      const rzp = new window.Razorpay({
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: order.name,
        description: order.description,
        order_id: order.order_id,
        prefill: {
          name: patientName || undefined,
          email: patientEmail || undefined,
          contact: patientPhone || undefined,
        },
        theme: { color: "#2563eb" },
        handler: async (response: unknown) => {
          const res = response as {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          };
          try {
            await api.payments.verify({
              razorpay_order_id: res.razorpay_order_id,
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_signature: res.razorpay_signature,
            });
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
        modal: {
          ondismiss: () => {
            // User closed the checkout modal without completing payment.
            setLoading(false);
          },
        },
      });

      rzp.on("payment.failed", (response: unknown) => {
        const err = (response as { error?: { description?: string } })?.error;
        setError(err?.description || "Payment failed. Please try again.");
        setLoading(false);
      });

      rzp.open();
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

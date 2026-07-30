"use client";

import React, { useState } from "react";
import { Loader2, CreditCard, CheckCircle2, AlertTriangle, X, ShieldCheck } from "lucide-react";
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
  const [showConsent, setShowConsent] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);

  const handlePay = async () => {
    setError(null);
    setLoading(true);
    setShowConsent(false);
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
    <div className="flex flex-col gap-2 relative">
      <button
        type="button"
        onClick={() => setShowConsent(true)}
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

      {/* Consent Modal */}
      {showConsent && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#f0f9ff] border-b border-[#bae6fd] px-5 py-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#2563eb]" />
              <h3 className="font-extrabold text-[#0f2d5e] text-lg">Mandatory Checkout Consent</h3>
              <button 
                onClick={() => setShowConsent(false)}
                className="ml-auto w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5">
              <p className="text-xs font-bold text-[#0f2d5e] uppercase tracking-wider mb-3">Consent Declaration (Displayed at Checkout)</p>
              
              <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb]"
                />
                <p className="text-[13px] text-slate-700 font-medium leading-relaxed">
                  I confirm that the booking and payment details are accurate, that I am authorised to use the selected payment method, and that I have read and agree to QXL Diagnostics&apos; Online Payment Terms and Conditions, Cancellation and Refund Policy, Privacy Policy and Website Terms of Use. If I am paying for another patient, I understand that payment does not authorise disclosure of that patient&apos;s medical information to me unless I am legally authorised to receive it.
                </p>
              </label>

              <div className="mt-5 flex justify-end gap-3">
                <button 
                  onClick={() => setShowConsent(false)}
                  className="px-5 py-2.5 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePay}
                  disabled={!consentAccepted}
                  className="flex items-center gap-2 bg-[#2563eb] text-white px-6 py-2.5 rounded-full text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1d4ed8] transition-colors shadow-sm"
                >
                  Accept & Pay {amountRupees != null ? `₹${amountRupees}` : ""}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

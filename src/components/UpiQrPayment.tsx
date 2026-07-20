"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Copy, Check } from "lucide-react";
import { UPI_ID, UPI_PAYEE_NAME, UPI_QR_SRC } from "@/lib/upiPayment";

interface UpiQrPaymentProps {
  /** Amount in rupees to show (optional). */
  amountRupees?: number | null;
  /** Compact layout for chat bubbles. */
  compact?: boolean;
  className?: string;
  /** Called when the customer taps “I have paid”. */
  onPaid?: () => void;
}

/**
 * Shows the QXL UPI QR + VPA for manual payment (no Razorpay).
 * Customer scans with any UPI app and pays; lab confirms offline.
 */
export default function UpiQrPayment({ amountRupees, compact = false, className, onPaid }: UpiQrPaymentProps) {
  const [copied, setCopied] = useState(false);
  const [markedPaid, setMarkedPaid] = useState(false);

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const markPaid = () => {
    setMarkedPaid(true);
    onPaid?.();
  };

  return (
    <div
      className={`bg-white rounded-xl border border-blue-100 flex flex-col items-center text-center ${
        compact ? "p-3 gap-2 min-w-[200px]" : "p-5 gap-3"
      } ${className || ""}`}
    >
      <div className="w-full flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-[#0f2d5e] uppercase tracking-wide">
          Pay via UPI
        </span>
        {amountRupees != null && (
          <span className="text-sm font-extrabold text-[#0f2d5e]">₹{amountRupees}</span>
        )}
      </div>

      <div className={`relative w-full ${compact ? "max-w-[180px]" : "max-w-[240px]"} mx-auto`}>
        <Image
          src={UPI_QR_SRC}
          alt={`UPI QR code for ${UPI_PAYEE_NAME} — ${UPI_ID}`}
          width={452}
          height={680}
          className="w-full h-auto rounded-lg border border-slate-100"
          priority={false}
        />
      </div>

      <p className="text-[12px] font-extrabold text-[#0f2d5e] break-all">
        UPI ID: {UPI_ID}
      </p>

      <button
        type="button"
        onClick={copyUpi}
        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? "Copied" : "Copy UPI ID"}
      </button>

      <p className="text-[10px] text-slate-500 font-medium leading-snug">
        Scan with GPay / PhonePe / Paytm / any UPI app
        {amountRupees != null ? ` and pay ₹${amountRupees}` : ""}. Our team will confirm your booking once payment is received.
      </p>

      {!markedPaid ? (
        <button
          type="button"
          onClick={markPaid}
          className="w-full mt-1 bg-[#2563eb] text-white font-bold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider hover:bg-[#1d4ed8] transition-colors"
        >
          I have paid
        </button>
      ) : (
        <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 text-xs font-bold w-full justify-center">
          <CheckCircle2 className="w-4 h-4" /> Thanks — we&apos;ll verify shortly
        </div>
      )}
    </div>
  );
}

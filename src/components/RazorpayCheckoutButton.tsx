"use client";

import React from "react";
import UpiQrPayment from "@/components/UpiQrPayment";

interface RazorpayCheckoutButtonProps {
  /** Kept for API compatibility with book/dashboard pages. */
  bookingIds: string[];
  amountRupees?: number | null;
  patientName?: string;
  patientEmail?: string | null;
  patientPhone?: string;
  onPaid?: () => void;
  className?: string;
}

/**
 * Booking payment UI — UPI QR (temporary replacement for Razorpay).
 * Component name kept so existing imports on /book and /dashboard keep working.
 */
export default function RazorpayCheckoutButton({
  amountRupees,
  onPaid,
  className,
}: RazorpayCheckoutButtonProps) {
  return (
    <UpiQrPayment
      amountRupees={amountRupees}
      onPaid={onPaid}
      className={className || "w-full"}
    />
  );
}

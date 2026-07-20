"use client";
import React from "react";
import UpiQrPayment from "@/components/UpiQrPayment";

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
 * In-chat payment UI — UPI QR (temporary replacement for Razorpay checkout).
 */
export default function ChatPaymentCard({ order }: ChatPaymentCardProps) {
  return (
    <UpiQrPayment
      amountRupees={order.total_rupees}
      compact
    />
  );
}

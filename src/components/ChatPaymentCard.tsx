"use client";
import React from "react";
import { Phone } from "lucide-react";

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
 * Renders a payment summary card inside an assistant chat bubble.
 * Directs the patient to call/WhatsApp for payment — online checkout removed.
 */
export default function ChatPaymentCard({ order }: ChatPaymentCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 p-4 flex flex-col gap-3 min-w-[240px] items-center text-center shadow-sm">
      <div className="w-full flex items-center justify-between border-b border-slate-100 pb-2 mb-1">
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
          {order.booking_ids.length > 1
            ? `${order.booking_ids.length} tests total`
            : "Amount due"}
        </span>
        <span className="text-base font-black text-[#2563eb]">₹{order.total_rupees}</span>
      </div>
      
      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 max-w-[150px]">
        <img
          src="/images/payment_qr.png"
          alt="Scan to Pay via UPI"
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>

      <div className="text-[10px] text-slate-500 font-bold leading-normal">
        <p className="mb-0.5 text-slate-600">Scan QR to pay using any UPI app</p>
        <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded font-mono text-[9px] select-all cursor-pointer">
          qxl-diagnostics@pingpay
        </span>
      </div>

      <a
        href="https://api.whatsapp.com/send?phone=919964639639"
        target="_blank"
        rel="noreferrer"
        className="w-full inline-flex items-center justify-center gap-1.5 bg-[#25D366] text-white font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-wider hover:bg-[#1ebe57] transition-colors cursor-pointer"
      >
        Share Screenshot
      </a>
    </div>
  );
}

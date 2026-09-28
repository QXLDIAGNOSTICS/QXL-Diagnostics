"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, CheckCircle2, CreditCard, QrCode, Building2, Wallet, X, Loader2, ArrowRight } from "lucide-react";

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  patientName: string;
  patientPhone: string;
  orderDescription?: string;
  onSuccess: (payload: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => void;
}

export default function RazorpayModal({
  isOpen,
  onClose,
  amount,
  patientName,
  patientPhone,
  orderDescription = "Diagnostic test / package booking",
  onSuccess,
}: RazorpayModalProps) {
  const [activeTab, setActiveTab] = useState<"upi" | "card" | "netbanking" | "wallet">("upi");
  const [upiId, setUpiId] = useState(`${patientPhone || "9037090838"}@upi`);
  const [cardNumber, setCardNumber] = useState("4111 1111 1111 1111");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("123");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [selectedWallet, setSelectedWallet] = useState("Paytm");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      const fakePaymentId = "pay_QXL_" + Math.random().toString(36).substring(2, 12).toUpperCase();
      const fakeOrderId = "order_QXL_" + Math.random().toString(36).substring(2, 10).toUpperCase();

      setTimeout(() => {
        onSuccess({
          razorpay_order_id: fakeOrderId,
          razorpay_payment_id: fakePaymentId,
          razorpay_signature: "sig_qxl_verified_" + Date.now(),
        });
      }, 800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100000] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden relative flex flex-col my-auto animate-in zoom-in-95 duration-200">
        
        {/* Razorpay Brand Header */}
        <div className="bg-[#0B2545] text-white p-5 relative">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="absolute top-4 right-4 text-slate-300 hover:text-white w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
          >
            ✕
          </button>

          <div className="flex items-center gap-2 mb-2">
            {/* Razorpay Shield Logo SVG */}
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-sm tracking-wide">Razorpay</span>
            <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ml-auto mr-8">
              TEST MODE
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-white/10">
            <div>
              <p className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider">QXL Diagnostics</p>
              <p className="text-xs text-slate-200 font-medium truncate max-w-[200px]">{orderDescription}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Amount Due</p>
              <p className="text-2xl font-black text-amber-300">₹{amount}</p>
            </div>
          </div>
        </div>

        {/* Patient Info Strip */}
        <div className="bg-blue-50/70 border-b border-blue-100 px-5 py-2.5 flex items-center justify-between text-xs font-bold text-[#0B2545]">
          <span className="truncate">Patient: {patientName || "Guest Patient"}</span>
          <span className="text-slate-500 font-semibold shrink-0">📞 {patientPhone}</span>
        </div>

        {/* Main Content Area */}
        <div className="p-5">
          {isSuccess ? (
            <div className="py-8 text-center space-y-3 animate-in zoom-in duration-300">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-[#0B2545]">Payment Authorized!</h3>
              <p className="text-xs font-semibold text-slate-500">
                Transaction ID: <span className="font-mono text-slate-800 font-bold">pay_QXL_{Math.floor(100000 + Math.random() * 900000)}</span>
              </p>
              <p className="text-xs text-emerald-700 font-bold bg-emerald-50 py-2 px-4 rounded-xl border border-emerald-200 inline-block">
                Completing your lab booking...
              </p>
            </div>
          ) : isProcessing ? (
            <div className="py-12 text-center space-y-4">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
              <div>
                <h3 className="text-base font-black text-[#0B2545]">Contacting Payment Gateway...</h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">Authorizing ₹{amount} via Razorpay Secure Gateway</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePaySubmit} className="space-y-4">
              {/* Payment Method Tabs */}
              <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveTab("upi")}
                  className={`py-2 px-1 rounded-xl text-[11px] font-extrabold flex flex-col items-center gap-1 transition-all ${
                    activeTab === "upi" ? "bg-[#0B2545] text-white shadow-xs" : "hover:bg-slate-200"
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("card")}
                  className={`py-2 px-1 rounded-xl text-[11px] font-extrabold flex flex-col items-center gap-1 transition-all ${
                    activeTab === "card" ? "bg-[#0B2545] text-white shadow-xs" : "hover:bg-slate-200"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("netbanking")}
                  className={`py-2 px-1 rounded-xl text-[11px] font-extrabold flex flex-col items-center gap-1 transition-all ${
                    activeTab === "netbanking" ? "bg-[#0B2545] text-white shadow-xs" : "hover:bg-slate-200"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Netbank</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("wallet")}
                  className={`py-2 px-1 rounded-xl text-[11px] font-extrabold flex flex-col items-center gap-1 transition-all ${
                    activeTab === "wallet" ? "bg-[#0B2545] text-white shadow-xs" : "hover:bg-slate-200"
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  <span>Wallets</span>
                </button>
              </div>

              {/* Tab 1: UPI & QR Code */}
              {activeTab === "upi" && (
                <div className="space-y-3 pt-1">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📱</span>
                      <div>
                        <p className="text-xs font-extrabold text-[#0B2545]">Instant UPI Payment</p>
                        <p className="text-[10.5px] text-slate-500">GPay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                      0% Fee
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@upi or 9876543210@ybl"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-extrabold outline-none focus:border-blue-600 focus:bg-white"
                      required
                    />
                  </div>

                  {/* Pre-filled Popular UPI Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["Google Pay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setUpiId(`${patientPhone || "9037090838"}@${app.toLowerCase().replace(/\s+/g, "")}`)}
                        className="text-[10.5px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg border border-slate-200 cursor-pointer"
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Cards */}
              {activeTab === "card" && (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4111 1111 1111 1111"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-extrabold outline-none focus:border-blue-600 focus:bg-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-extrabold outline-none focus:border-blue-600 focus:bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-extrabold outline-none focus:border-blue-600 focus:bg-white"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Netbanking */}
              {activeTab === "netbanking" && (
                <div className="space-y-2 pt-1">
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                    Select Your Bank
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Bank", "Punjab National Bank"].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                          selectedBank === bank
                            ? "bg-blue-50 border-blue-600 text-blue-900"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Wallets */}
              {activeTab === "wallet" && (
                <div className="space-y-2 pt-1">
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1">
                    Select Digital Wallet
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Paytm", "PhonePe Wallet", "Mobikwik"].map((wallet) => (
                      <button
                        key={wallet}
                        type="button"
                        onClick={() => setSelectedWallet(wallet)}
                        className={`p-3 rounded-xl border text-center text-xs font-extrabold transition-all cursor-pointer ${
                          selectedWallet === wallet
                            ? "bg-blue-50 border-blue-600 text-blue-900"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {wallet}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Payment Button */}
              <button
                type="submit"
                className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Lock className="w-4 h-4 text-blue-200" />
                <span>Pay ₹{amount} Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10.5px] font-bold text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted Razorpay Gateway</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

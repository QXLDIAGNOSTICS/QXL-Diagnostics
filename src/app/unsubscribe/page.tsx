"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { BellOff, CheckCircle2, Loader2, Mail, MessageSquareOff } from "lucide-react";
import { api, ApiError, type UnsubscribeLookup } from "@/lib/api";

type Channel = "email" | "sms" | "both";

export default function UnsubscribePage() {
  return (
    <Suspense fallback={null}>
      <UnsubscribePageInner />
    </Suspense>
  );
}

function UnsubscribePageInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const initialChannel = (searchParams.get("channel") as Channel | null) || "both";

  const [lookup, setLookup] = useState<UnsubscribeLookup | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [loadingLookup, setLoadingLookup] = useState(!!token);

  const [channel, setChannel] = useState<Channel>(initialChannel);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    setLoadingLookup(true);
    api.unsubscribe
      .lookup(token)
      .then((res) => {
        if (cancelled) return;
        setLookup(res);
      })
      .catch((err) => {
        if (cancelled) return;
        setLookupError(err instanceof ApiError ? err.message : "This unsubscribe link is invalid or has expired.");
      })
      .finally(() => {
        if (!cancelled) setLoadingLookup(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!token && !email.trim() && !phone.trim()) {
      setError("Please enter your email or phone number.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.unsubscribe.submit({
        token: token || undefined,
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        channel,
      });
      setResult(res.message);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8faff] min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-140 bg-white border border-gray-150 rounded-3xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <BellOff className="w-6 h-6 text-slate-500" />
          </div>
          <h1 className="text-[#0f2d5e] text-xl font-bold mb-1">Manage email &amp; SMS preferences</h1>
          <p className="text-slate-500 text-xs font-semibold max-w-sm mx-auto">
            Stop receiving promotional offers and automated reminders from QXL Diagnostics. Booking
            confirmations, payment receipts and other essential messages about your own appointments are
            never affected.
          </p>
        </div>

        {result ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            <p className="text-sm font-semibold text-slate-700">{result}</p>
            <p className="text-xs text-slate-400">Changed your mind? You can resubscribe any time by contacting us.</p>
          </div>
        ) : loadingLookup ? (
          <div className="py-10 flex justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {token && !lookupError && lookup && (
              <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 text-xs text-slate-500 space-y-1">
                {lookup.masked_email && (
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> {lookup.masked_email}
                    {lookup.already_opted_out_email && (
                      <span className="text-emerald-600 font-semibold">already unsubscribed</span>
                    )}
                  </p>
                )}
                {lookup.masked_phone && (
                  <p className="flex items-center gap-2">
                    <MessageSquareOff className="w-3.5 h-3.5" /> {lookup.masked_phone}
                    {lookup.already_opted_out_sms && (
                      <span className="text-emerald-600 font-semibold">already unsubscribed</span>
                    )}
                  </p>
                )}
              </div>
            )}
            {token && lookupError && (
              <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-700">
                {lookupError} You can still unsubscribe below by entering your details directly.
              </div>
            )}

            {(!token || lookupError) && (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Unsubscribe from
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["email", "sms", "both"] as Channel[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setChannel(c)}
                    className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide border transition-colors ${
                      channel === c
                        ? "bg-[#2563eb] border-[#2563eb] text-white"
                        : "bg-gray-50/50 border-gray-200 text-slate-500 hover:border-slate-300"
                    }`}
                  >
                    {c === "both" ? "Both" : c}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] disabled:opacity-60 text-white text-sm font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Unsubscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

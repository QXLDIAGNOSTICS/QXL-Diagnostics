"use client";
import { useState } from "react";
import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/businessInfo";

/**
 * Kannada "request a callback" form (Home section 1.17).
 * Same delivery path as the English CallbackModal: opens a pre-filled WhatsApp message.
 */
export default function KnCallbackForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (!name.trim() || digits.length < 10) {
      setError("ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಸರಿಯಾದ 10-ಅಂಕಿಯ ದೂರವಾಣಿ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.");
      return;
    }
    if (!consent) {
      setError("ಮುಂದುವರಿಯಲು ದಯವಿಟ್ಟು ಒಪ್ಪಿಗೆ ಪೆಟ್ಟಿಗೆಯನ್ನು ಗುರುತಿಸಿ.");
      return;
    }
    setError("");
    const text = `ಕರೆಗಾಗಿ ವಿನಂತಿ (Callback request – Kannada site)\nಹೆಸರು: ${name.trim()}\nದೂರವಾಣಿ: ${digits}${
      message.trim() ? `\nಸಂದೇಶ: ${message.trim()}` : ""
    }`;
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }

  const input = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" noValidate>
      <div>
        <p className="text-lg font-bold text-slate-900">ಮರಳಿ ಕರೆ ಮಾಡಲು ವಿನಂತಿಸಿ</p>
        <p className="text-sm text-slate-600">ನಿಮ್ಮ ಸಂಖ್ಯೆಯನ್ನು ನೀಡಿ, ನಾವು ತಕ್ಷಣ ಕರೆ ಮಾಡುತ್ತೇವೆ.</p>
      </div>
      <label className="block space-y-1">
        <span className="text-sm font-bold text-slate-800">ಪೂರ್ಣ ಹೆಸರು *</span>
        <input className={input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-bold text-slate-800">ದೂರವಾಣಿ ಸಂಖ್ಯೆ *</span>
        <input className={input} value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" required />
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-bold text-slate-800">ಸಂದೇಶ (ಐಚ್ಛಿಕ)</span>
        <textarea className={input} rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <label className="flex items-start gap-3 text-sm text-slate-700">
        <input type="checkbox" className="mt-1 h-4 w-4" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          QXL ಡಯಾಗ್ನೋಸ್ಟಿಕ್ಸ್ ನನ್ನನ್ನು ಕರೆ/WhatsApp ಮೂಲಕ ಸಂಪರ್ಕಿಸಲು ಹಾಗೂ DPDP ಮಾರ್ಗಸೂಚಿಗಳು ಮತ್ತು{" "}
          <Link href="/privacy-policy" className="font-semibold text-[#2563eb] underline">
            ಗೌಪ್ಯತಾ ನೀತಿಯ
          </Link>{" "}
          ಪ್ರಕಾರ ನನ್ನ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸಲು ನಾನು ಒಪ್ಪಿಗೆ ನೀಡುತ್ತೇನೆ.
        </span>
      </label>
      {error && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
      <button type="submit" className="w-full rounded-xl bg-[#2563eb] px-5 py-3 font-bold text-white hover:bg-blue-700">
        ಕರೆಗಾಗಿ ವಿನಂತಿಸಿ
      </button>
    </form>
  );
}

"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Globe, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ─── Supported languages ─────────────────────────────────────────── */
const LANGUAGES = [
  { code: "en", label: "English",   native: "English"   },
  { code: "hi", label: "Hindi",     native: "हिन्दी"   },
  { code: "kn", label: "Kannada",   native: "ಕನ್ನಡ"   },
  { code: "ta", label: "Tamil",     native: "தமிழ்"   },
  { code: "te", label: "Telugu",    native: "తెలుగు"  },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
] as const;
type LangCode = typeof LANGUAGES[number]["code"];

const STORAGE_KEY = "qxl_language";

/* ─── Cookie helpers ───────────────────────────────────────────────── */
function setGoogTransCookie(lang: LangCode) {
  const value = lang === "en" ? "/en/en" : `/en/${lang}`;
  const domain = window.location.hostname;
  // Set for both the exact host and .domain (subdomains)
  document.cookie = `googtrans=${value}; path=/; domain=${domain}; SameSite=Lax`;
  document.cookie = `googtrans=${value}; path=/`;
}

function getGoogTransCookie(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

/* ─── Programmatic translation via Google Translate select ────────── */
function doTranslate(lang: LangCode) {
  setGoogTransCookie(lang);

  if (lang === "en") {
    // Restore original — Google Translate exposes a "restore" method
    const frameEl = document.querySelector<HTMLIFrameElement>(
      "iframe.goog-te-banner-frame, .skiptranslate iframe"
    );
    // Try the select element inside the widget
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = "en";
      select.dispatchEvent(new Event("change"));
    }
    // Also attempt the newer API
    const w = window as any;
    if (w.google?.translate?.TranslateElement) {
      try {
        // Some versions expose restore() on the element
        const el = document.querySelector("#google_translate_element") as any;
        if (el?.__googleTranslateWidget?.restore) {
          el.__googleTranslateWidget.restore();
          return;
        }
      } catch {}
    }
    // Fallback: reload with cleared cookies
    location.reload();
    return;
  }

  // For non-English — use the hidden select if widget is ready
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event("change"));
    return;
  }

  // Widget not yet ready — reload so the cookie takes effect on next load
  location.reload();
}

/* ════════════════════════════════════════════════════════════════════ */
export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<LangCode>("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Initialise on mount */
  useEffect(() => {
    // 1. Read saved language
    const saved = (localStorage.getItem(STORAGE_KEY) as LangCode) || "en";
    setActiveLang(saved);

    // 2. If there's a saved language, wait for the widget's select to appear and apply
    if (saved !== "en") {
      const tryApply = (retries = 20) => {
        const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
        if (select && select.options.length > 1) {
          select.value = saved;
          select.dispatchEvent(new Event("change"));
          setIsTranslating(false);
        } else if (retries > 0) {
          setTimeout(() => tryApply(retries - 1), 300);
        } else {
          setIsTranslating(false);
        }
      };
      setIsTranslating(true);
      setTimeout(() => tryApply(), 500);
    }

    // 3. Close dropdown on outside click
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  /* Select a language */
  const selectLanguage = useCallback((lang: typeof LANGUAGES[number]) => {
    if (lang.code === activeLang) { setOpen(false); return; }
    setActiveLang(lang.code);
    setIsTranslating(true);
    localStorage.setItem(STORAGE_KEY, lang.code);
    setOpen(false);
    // Small delay so the UI updates before potential reload
    setTimeout(() => doTranslate(lang.code), 80);
  }, [activeLang]);

  const currentLang = LANGUAGES.find(l => l.code === activeLang) ?? LANGUAGES[0];

  return (
    <>
      {/* ── Suppress Google Translate toolbar ────────────────────── */}
      <style>{`
        /* Hide the Google Translate banner/toolbar that pushes the page down */
        .goog-te-banner-frame.skiptranslate,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        .goog-tooltip,
        .goog-tooltip:hover,
        .goog-text-highlight,
        .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
        .VIpgJd-ZVi9od-aZ2wEe-OiiCO-Ti6j7c,
        .VIpgJd-ZVi9od-l4eHX-hSRGPd,
        .VIpgJd-yAWNEb-L7lbkb {
          display: none !important;
          visibility: hidden !important;
        }
        /* Prevent the body from shifting down when the bar appears */
        body { top: 0 !important; }
        /* Hide the outer skip-translate wrapper Google injects */
        .skiptranslate:not(#google_translate_element) { display: none !important; }
        /* Preserve font rendering for Indic scripts */
        html[lang^="hi"] body, html[lang^="kn"] body,
        html[lang^="ta"] body, html[lang^="te"] body,
        html[lang^="ml"] body {
          font-family: 'Noto Sans', 'Lato', sans-serif;
        }
      `}</style>

      <div className="relative notranslate" ref={ref}>
        {/* ── Globe Button ─────────────────────────────────────── */}
        <button
          id="qxl-language-switcher-btn"
          onClick={() => setOpen(v => !v)}
          aria-label="Select Language"
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center justify-center rounded-full w-8 h-8 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-300/60"
          style={{
            background: "rgba(224,242,254,0.65)",
            border: "1px solid rgba(125,199,232,0.35)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 2px 12px rgba(14,165,233,0.15), inset 0 1px 0 rgba(255,255,255,0.85)",
          }}
        >
          {isTranslating ? (
            <svg className="w-4 h-4 text-[#0284c7] animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
          ) : (
            <div className="flex flex-col items-center justify-center -mt-0.5">
              <Globe className="w-3.5 h-3.5 text-[#0284c7]" />
              <span className="text-[7px] font-bold text-[#0284c7] uppercase leading-none mt-0.5">{activeLang}</span>
            </div>
          )}
        </button>

        {/* ── Dropdown ─────────────────────────────────────────── */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.16 }}
              className="absolute right-0 top-full mt-2 w-54 rounded-2xl py-1.5 z-[9999] origin-top-right"
              style={{
                width: "210px",
                background: "rgba(240,249,255,0.98)",
                backdropFilter: "blur(28px) saturate(200%)",
                border: "1px solid rgba(125,199,232,0.3)",
                boxShadow: "0 24px 64px rgba(14,165,233,0.18), 0 1px 0 rgba(255,255,255,0.95) inset",
              }}
              role="listbox"
              aria-label="Language selection"
            >
              {/* Header */}
              <div className="px-3.5 pt-2 pb-1.5">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#0369a1]/50">
                  🌐 Select Language
                </p>
              </div>

              {/* Divider */}
              <div className="mx-3 mb-1 h-px bg-blue-100/80" />

              {/* Options */}
              {LANGUAGES.map((lang) => {
                const isActive = activeLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => selectLanguage(lang)}
                    role="option"
                    aria-selected={isActive}
                    className={`w-full flex items-center justify-between px-3.5 py-2 text-left transition-all duration-150 focus:outline-none ${
                      isActive
                        ? "bg-sky-50"
                        : "hover:bg-sky-50/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div>
                        <p className={`text-[12.5px] font-extrabold leading-tight ${isActive ? "text-[#0284c7]" : "text-[#0f2d5e]"}`}>
                          {lang.native}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
                          {lang.label}
                        </p>
                      </div>
                    </div>
                    {isActive && (
                      <span className="w-5 h-5 rounded-full bg-[#0284c7] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Footer note */}
              <div className="mx-3 mt-1 mb-2 h-px bg-blue-100/80" />
              <p className="text-[9px] text-slate-400 text-center pb-2 font-medium">
                Powered by Google Translate
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

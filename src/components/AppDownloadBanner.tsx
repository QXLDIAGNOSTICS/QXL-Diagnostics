"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Download, X, ChevronLeft, ChevronRight, Share, MoreVertical, PlusSquare, Info } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    tag: "📱 App Download",
    title: "Your Health, Always Within Reach",
    desc: "Download the QXL Diagnostics App to book tests, access reports, and manage your healthcare anytime, anywhere.",
    feature: ["Anytime access", "Manage healthcare", "Book tests"],
    accent: "#2563eb",
    screen: "/images/app_ui/slide1.png",
  },
  {
    id: 2,
    tag: "🚀 Fast & Smart",
    title: "Smarter Healthcare Starts Here",
    desc: "Get the QXL Diagnostics App for faster bookings, instant reports, and exclusive app-only offers.",
    feature: ["Faster bookings", "Instant reports", "Exclusive offers"],
    accent: "#7c3aed",
    screen: "/images/app_ui/slide2.png",
  },
  {
    id: 3,
    tag: "✨ Simple",
    title: "Healthcare Made Simple",
    desc: "Book lab tests, track appointments, and view reports securely with the QXL Diagnostics App.",
    feature: ["Track appointments", "Secure viewing", "Easy booking"],
    accent: "#059669",
    screen: "/images/app_ui/slide3.png",
  },
  {
    id: 4,
    tag: "🤝 Companion",
    title: "Your Complete Health Companion",
    desc: "Experience seamless diagnostics with online bookings, digital reports, and personalised health services.",
    feature: ["Online bookings", "Digital reports", "Personalised"],
    accent: "#0284c7",
    screen: "/images/app_ui/slide4.png",
  },
  {
    id: 5,
    tag: "🏃 Care",
    title: "Care That Moves With You",
    desc: "Install the QXL Diagnostics App to stay connected to your health wherever life takes you.",
    feature: ["Stay connected", "Mobile access", "Health tracking"],
    accent: "#d97706",
    screen: "/images/app_ui/slide1.png",
  },
  {
    id: 6,
    tag: "🌟 All-in-One",
    title: "Everything You Need for Better Health",
    desc: "From booking tests to downloading reports, manage it all in one powerful app.",
    feature: ["Manage everything", "Powerful tools", "All-in-one"],
    accent: "#db2777",
    screen: "/images/app_ui/slide2.png",
  },
  {
    id: 7,
    tag: "⚡ Fast & Secure",
    title: "Fast. Secure. Convenient.",
    desc: "Download the QXL Diagnostics App for quick appointments, secure health records, and exclusive savings.",
    feature: ["Quick appointments", "Secure records", "Savings"],
    accent: "#ea580c",
    screen: "/images/app_ui/slide3.png",
  },
  {
    id: 8,
    tag: "💡 Smart Booking",
    title: "The Smarter Way to Book Lab Tests",
    desc: "Skip the wait—schedule tests, access reports, and enjoy app-exclusive benefits in just a few taps.",
    feature: ["Skip the wait", "App exclusives", "Few taps"],
    accent: "#4f46e5",
    screen: "/images/app_ui/slide4.png",
  },
  {
    id: 9,
    tag: "🤝 Partner",
    title: "Your Digital Health Partner",
    desc: "Take control of your healthcare with instant bookings, digital reports, health packages, and more.",
    feature: ["Take control", "Instant bookings", "Health packages"],
    accent: "#0891b2",
    screen: "/images/app_ui/slide1.png",
  },
  {
    id: 10,
    tag: "👆 Fingertips",
    title: "Health Services at Your Fingertips",
    desc: "Download the QXL Diagnostics App today and enjoy a faster, smarter, and more convenient healthcare experience.",
    feature: ["Faster experience", "Smarter", "Convenient"],
    accent: "#be185d",
    screen: "/images/app_ui/slide2.png",
  },
];

export default function AppDownloadBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setInstalled(true);
      }
      if ((window as any).deferredPWAInstallPrompt) {
        setDeferredPrompt((window as any).deferredPWAInstallPrompt);
      }
    }
    const handler = (e: any) => { e.preventDefault(); setDeferredPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    const onInstalled = () => setInstalled(true);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      setInstalling(true);
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setInstalled(true);
      setDeferredPrompt(null);
      setInstalling(false);
    } else {
      setShowInstructions(true);
    }
  };

  if (dismissed || installed) return null;

  const slide = slides[current];

  return (
    <>
      <section
        className="relative overflow-hidden mx-4 sm:mx-auto sm:max-w-5xl my-8 rounded-3xl"
        style={{
          background: "linear-gradient(135deg, rgba(224,242,254,0.85) 0%, rgba(240,249,255,0.92) 50%, rgba(214,234,253,0.88) 100%)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1.5px solid rgba(125,199,232,0.4)",
          boxShadow: "0 20px 60px rgba(14,165,233,0.12), 0 1px 0 rgba(255,255,255,0.9) inset",
        }}
      >
        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-sky-100/50 hover:scale-105 active:scale-95"
          style={{ background: "rgba(125,199,232,0.25)", border: "1px solid rgba(125,199,232,0.4)" }}
          aria-label="Dismiss app download banner"
        >
          <X className="w-4 h-4 text-[#0284c7]" />
        </button>

        {/* Decorative orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div style={{ position:"absolute", top:"-60px", right:"20%", width:"260px", height:"260px", borderRadius:"50%", background:"radial-gradient(circle,rgba(147,210,255,0.3) 0%,transparent 70%)", filter:"blur(40px)" }} />
          <div style={{ position:"absolute", bottom:"-40px", left:"10%", width:"180px", height:"180px", borderRadius:"50%", background:"radial-gradient(circle,rgba(186,230,255,0.25) 0%,transparent 70%)", filter:"blur(30px)" }} />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-0 sm:gap-0">
          
          {/* Left: Phone mockup */}
          <div className="flex-shrink-0 flex items-center justify-center px-6 pt-7 pb-4 sm:pb-7 sm:pl-8 sm:pr-4">
            {/* Phone shell */}
            <div
              className="relative w-[240px] h-[520px] sm:w-[260px] sm:h-[560px] rounded-[36px] sm:rounded-[44px] overflow-hidden shadow-2xl flex flex-col bg-white"
              style={{
                border: "6px solid rgba(255,255,255,1)",
                boxShadow: "0 30px 80px rgba(14,165,233,0.35), 0 4px 0 rgba(255,255,255,0.4) inset",
              }}
            >
              {/* Screen content */}
              <div className="relative flex-1 w-full h-full overflow-hidden bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image 
                      src={slide.screen} 
                      alt="App UI Screen" 
                      fill 
                      className="object-cover w-full h-full"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right: Slide content */}
          <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left px-6 sm:pr-14 pt-2 sm:pt-7 pb-7">
            
            {/* Tag */}
            <span
              className="inline-block text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3"
              style={{ background: "rgba(37,99,235,0.12)", color: "#1d4ed8", border: "1px solid rgba(37,99,235,0.2)" }}
            >
              {slide.tag}
            </span>

            {/* Title */}
            <h2
              className="text-xl sm:text-2xl font-black mb-2 leading-tight transition-all"
              style={{ color: "#0f2d5e" }}
            >
              {slide.title}
            </h2>

            {/* Desc */}
            <p className="text-slate-500 text-xs sm:text-sm font-medium mb-4 leading-relaxed max-w-md">
              {slide.desc}
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mb-5 justify-center sm:justify-start">
              {slide.feature.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1 text-[11px] font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(37,99,235,0.08)",
                    color: "#1d4ed8",
                    border: "1px solid rgba(37,99,235,0.15)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] flex-shrink-0" />
                  {f}
                </span>
              ))}
            </div>

            {/* Slider dots + arrows */}
            <div className="flex items-center gap-3 mb-5">
              <button
                onClick={prev}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.2)" }}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 text-[#2563eb]" />
              </button>
              <div className="flex gap-1.5 items-center">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="transition-all rounded-full"
                    style={{
                      width: i === current ? "24px" : "8px",
                      height: "8px",
                      background: i === current ? "#2563eb" : "rgba(37,99,235,0.25)",
                    }}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.2)" }}
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 text-[#2563eb]" />
              </button>
            </div>

            {/* Install button */}
            <button
              onClick={handleInstall}
              disabled={installing}
              className="flex items-center gap-2.5 font-extrabold px-7 py-3.5 rounded-2xl text-sm shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-70 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)",
                color: "white",
                boxShadow: "0 8px 28px rgba(14,165,233,0.35)",
              }}
              aria-label="Install QXL Diagnostics app"
            >
              {installing ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              <span>{installing ? "Installing…" : "Download App"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── CUSTOM PWA INSTALLATION GUIDE MODAL ─── */}
      <AnimatePresence>
        {showInstructions && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInstructions(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl z-10 p-6 md:p-8"
              style={{ border: "1px solid rgba(125,199,232,0.3)" }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowInstructions(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0f2d5e] text-lg">Install QXL Diagnostics</h3>
                  <p className="text-slate-500 text-xs font-semibold">Easy guide to add the app to your device</p>
                </div>
              </div>

              {/* Instructions Grid */}
              <div className="space-y-6">
                {/* iOS Instructions */}
                <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-5">
                  <h4 className="font-bold text-[#0c4a6e] text-[13.5px] uppercase tracking-wide mb-3 flex items-center gap-2">
                    🍎 Apple iOS (iPhone/iPad)
                  </h4>
                  <ol className="list-decimal list-inside text-xs text-slate-600 space-y-2.5 pl-1 leading-relaxed">
                    <li>
                      Open this website in your <span className="font-extrabold text-slate-700">Safari</span> browser.
                    </li>
                    <li className="flex items-center gap-1.5 flex-wrap">
                      Tap the <span className="font-extrabold text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200">Share <Share className="w-3.5 h-3.5 inline text-blue-600" /></span> button at the bottom navigation bar.
                    </li>
                    <li className="flex items-center gap-1.5 flex-wrap">
                      Scroll down and tap <span className="font-extrabold text-slate-700 flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200">Add to Home Screen <PlusSquare className="w-3.5 h-3.5 inline text-slate-700" /></span>.
                    </li>
                    <li>
                      Tap <span className="font-extrabold text-[#2563eb]">Add</span> in the top-right corner to complete.
                    </li>
                  </ol>
                </div>

                {/* Android / Chrome Instructions */}
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5">
                  <h4 className="font-bold text-[#065f46] text-[13.5px] uppercase tracking-wide mb-3 flex items-center gap-2">
                    🤖 Android &amp; Chrome Desktop
                  </h4>
                  <ol className="list-decimal list-inside text-xs text-slate-600 space-y-2.5 pl-1 leading-relaxed">
                    <li className="flex items-center gap-1.5 flex-wrap">
                      Tap the <span className="font-extrabold text-slate-700 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-slate-200"><MoreVertical className="w-3.5 h-3.5 inline text-slate-700" /> menu</span> button in your browser's address bar.
                    </li>
                    <li>
                      Select <span className="font-extrabold text-slate-700 bg-white px-2 py-1 rounded border border-slate-200">Install App</span> or <span className="font-extrabold text-slate-700 bg-white px-2 py-1 rounded border border-slate-200">Add to Home Screen</span>.
                    </li>
                    <li>
                      Confirm by clicking <span className="font-extrabold text-[#16a34a]">Install</span> on the popup.
                    </li>
                  </ol>
                </div>
              </div>

              {/* Close Button at bottom */}
              <button
                onClick={() => setShowInstructions(false)}
                className="w-full mt-6 bg-[#2563eb] text-white font-extrabold py-3.5 rounded-2xl hover:bg-[#1d4ed8] transition-colors text-sm shadow-md"
              >
                Got It, Thanks!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}


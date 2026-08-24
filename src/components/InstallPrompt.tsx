"use client";
import React, { useEffect, useState } from 'react';
import { Download, CheckCircle, X, Share, PlusSquare, MoreVertical, Info } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    // Don't show if already running as installed PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((err) => console.error('SW registration failed', err));
    }

    // Grab prompt if already captured by layout.tsx early script
    if ((window as any).deferredPWAInstallPrompt) {
      setDeferredPrompt((window as any).deferredPWAInstallPrompt);
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      (window as any).deferredPWAInstallPrompt = e;
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      if (outcome === 'accepted') {
        setStatus('success');
        setTimeout(() => setIsInstalled(true), 1500);
      }
    } else {
      setShowGuide(true);
    }
  };

  // Only hide if app is already installed (running in standalone mode)
  if (isInstalled) return null;

  return (
    <>
      <button
        onClick={handleInstallClick}
        className={`w-full min-h-[48px] px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 text-sm font-extrabold ${status === 'success' ? 'text-white' : 'text-[#0369a1] bg-[#f0f9ff] hover:bg-[#e0f2fe]'}`}
        style={{
          background: status === 'success'
            ? 'linear-gradient(135deg, #16a34a, #15803d)'
            : undefined,
        }}
        aria-label="Install App"
      >
        {status === 'success' ? (
          <>
            <CheckCircle className="w-4 h-4 text-white" />
            <span>Installed!</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Install App</span>
          </>
        )}
      </button>

      {/* Direct Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center px-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            onClick={() => setShowGuide(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl z-10 p-6 text-center border border-slate-100 animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              aria-label="Close guide"
            >
              <X className="w-4 h-4" />
            </button>

            {/* QXL App Logo Icon */}
            <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-white p-2 border-2 border-emerald-100 shadow-md flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/btjglif5/image/upload/v1784150000/Assets-QXL/legacy-assets/image/qxl_logo_main.png"
                alt="QXL Diagnostics Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Title & Description */}
            <h3 className="font-black text-[#0f2d5e] text-lg mb-1">Install QXL Diagnostics</h3>
            <p className="text-slate-500 text-xs font-medium mb-5 px-2">
              Fast diagnostic bookings, same-day digital reports &amp; 1-click home sample collection.
            </p>

            {/* Direct Install CTA Button */}
            <button
              onClick={async () => {
                if ((window as any).deferredPWAInstallPrompt) {
                  const prompt = (window as any).deferredPWAInstallPrompt;
                  prompt.prompt();
                  const { outcome } = await prompt.userChoice;
                  if (outcome === 'accepted') setIsInstalled(true);
                  setShowGuide(false);
                } else {
                  alert("To install QXL Diagnostics:\n\n• On iPhone/iOS: Tap 'Share' in Safari → 'Add to Home Screen'\n• On Android/Chrome: Tap 3 dots menu → 'Install App'");
                }
              }}
              className="w-full bg-gradient-to-r from-[#2563eb] to-[#0284c7] hover:from-blue-700 hover:to-sky-700 text-white font-black py-3.5 px-6 rounded-2xl shadow-lg active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 mb-3 cursor-pointer"
            >
              <Download className="w-4 h-4 text-white" />
              <span>INSTALL APP NOW</span>
            </button>

            {/* iOS / Safari Quick Hint */}
            <div className="bg-sky-50/80 border border-sky-100 rounded-xl p-3 text-left text-[11px] text-slate-600 space-y-1">
              <p className="font-bold text-[#0c4a6e] flex items-center gap-1">
                <span>📱 iOS / Safari User?</span>
              </p>
              <p className="leading-tight">
                Tap <span className="font-extrabold text-slate-800">Share <Share className="w-3 h-3 inline text-blue-600" /></span> → tap <span className="font-extrabold text-slate-800">Add to Home Screen <PlusSquare className="w-3 h-3 inline" /></span>.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

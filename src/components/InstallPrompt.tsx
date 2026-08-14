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

      {/* Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center px-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            onClick={() => setShowGuide(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl z-10 p-6 md:p-8 animate-in zoom-in-95 duration-200 border border-slate-100 text-left">
            {/* Close Button */}
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              aria-label="Close guide"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-[#0f2d5e] text-base">Install QXL Diagnostics</h3>
                <p className="text-slate-500 text-[11px] font-semibold">Add our app to your browser or home screen</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-4">
              {/* iOS Instructions */}
              <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4">
                <h4 className="font-bold text-[#0c4a6e] text-[12px] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  🍎 Apple iOS (Safari)
                </h4>
                <ol className="list-decimal list-inside text-[11px] text-slate-600 space-y-2 pl-0.5 leading-relaxed">
                  <li>
                    Open this page in the <span className="font-extrabold text-slate-700">Safari</span> browser.
                  </li>
                  <li className="flex items-center gap-1 flex-wrap">
                    Tap the <span className="font-extrabold text-slate-700 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px]">Share <Share className="w-3 h-3 text-blue-600" /></span> button in Safari.
                  </li>
                  <li className="flex items-center gap-1 flex-wrap">
                    Select <span className="font-extrabold text-slate-700 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px]">Add to Home Screen <PlusSquare className="w-3.5 h-3.5" /></span>.
                  </li>
                  <li>
                    Tap <span className="font-extrabold text-[#2563eb]">Add</span> in the top right to install.
                  </li>
                </ol>
              </div>

              {/* Android & Desktop Chrome */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
                <h4 className="font-bold text-[#065f46] text-[12px] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  🤖 Chrome / Edge / Firefox
                </h4>
                <ol className="list-decimal list-inside text-[11px] text-slate-600 space-y-2 pl-0.5 leading-relaxed">
                  <li className="flex items-center gap-1 flex-wrap">
                    Tap the <span className="font-extrabold text-slate-700 flex items-center gap-1 bg-white px-1 py-0.5 rounded border border-slate-200 text-[10px]"><MoreVertical className="w-3 h-3" /> menu</span> icon in your browser.
                  </li>
                  <li>
                    Click <span className="font-extrabold text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px]">Install App</span> or <span className="font-extrabold text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px]">Add to Home Screen</span>.
                  </li>
                  <li>
                    Confirm and click <span className="font-extrabold text-[#16a34a]">Install</span> on the prompt.
                  </li>
                </ol>
              </div>
            </div>

            {/* OK Button */}
            <button
              onClick={() => setShowGuide(false)}
              className="w-full mt-6 bg-[#2563eb] text-white font-extrabold py-3 rounded-2xl hover:bg-[#1d4ed8] transition-colors text-xs uppercase tracking-wider shadow-md"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
}

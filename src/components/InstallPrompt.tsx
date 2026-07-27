"use client";
import React, { useEffect, useState } from 'react';
import { Download, X, Share, Monitor, Smartphone, AlertCircle } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'desktop'>('desktop');

  useEffect(() => {
    // Detect device for tailored instructions
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setDeviceType('ios');
    } else if (/android/.test(ua)) {
      setDeviceType('android');
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Register Service Worker if supported
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('Service Worker registered', reg))
        .catch((err) => console.error('Service Worker registration failed', err));
    }

    // Check if already captured by the early script in layout.tsx
    if (typeof window !== 'undefined' && (window as any).deferredPWAInstallPrompt) {
      setDeferredPrompt((window as any).deferredPWAInstallPrompt);
      setIsInstallable(true);
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      (window as any).deferredPWAInstallPrompt = e;
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
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
    if (!deferredPrompt) {
      // Show custom fallback modal instead of ugly alert
      setShowFallback(true);
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
  };

  if (isInstalled) {
    return null; // Don't render anything if it's already installed
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="w-full min-h-[48px] px-4 rounded-xl flex items-center justify-center gap-2 transition-all bg-[#2563eb] text-white font-extrabold shadow-md hover:bg-[#1d4ed8] active:scale-95 text-sm"
        aria-label="Install App"
      >
        <Download className="w-4 h-4 text-white" />
        <span>Install App</span>
      </button>

      {/* Fallback Instructions Modal */}
      {showFallback && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#f8fafc] p-4 flex items-center justify-between border-b border-gray-100">
              <h3 className="font-extrabold text-[#0f2d5e] flex items-center gap-2">
                <Download className="w-5 h-5 text-[#2563eb]" />
                Install QXL App
              </h3>
              <button 
                onClick={() => setShowFallback(false)}
                className="p-1 rounded-full hover:bg-slate-200 transition-colors text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {deviceType === 'ios' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#0369a1] bg-sky-50 p-3 rounded-xl border border-sky-100">
                    <Smartphone className="w-6 h-6 flex-shrink-0" />
                    <p className="text-sm font-bold leading-tight">Install on iOS Safari</p>
                  </div>
                  <ol className="space-y-3 text-sm text-slate-600 font-medium">
                    <li className="flex gap-2">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex-shrink-0">1</span>
                      <span>Tap the <Share className="inline w-4 h-4 mx-1" /> <b>Share</b> icon at the bottom of Safari.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex-shrink-0">2</span>
                      <span>Scroll down and tap <b>Add to Home Screen</b>.</span>
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[#0369a1] bg-sky-50 p-3 rounded-xl border border-sky-100">
                    <Monitor className="w-6 h-6 flex-shrink-0" />
                    <p className="text-sm font-bold leading-tight">Installation Info</p>
                  </div>
                  <div className="space-y-3 text-sm text-slate-600 font-medium">
                    <p>The automatic install prompt couldn't be loaded. This usually happens if:</p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-500">
                      <li>You are using an unsupported browser (Try Chrome).</li>
                      <li>The app is <b>already installed</b> on your device.</li>
                    </ul>
                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 flex gap-2 text-amber-800 text-xs mt-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p>If you already installed it previously, you must uninstall the old version from <b>chrome://apps</b> or your device settings to see the prompt again.</p>
                    </div>
                  </div>
                </div>
              )}

              <button 
                onClick={() => setShowFallback(false)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors text-sm"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

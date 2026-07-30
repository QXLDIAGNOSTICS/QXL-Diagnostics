"use client";
import React, { useEffect, useState } from 'react';
import { Download, CheckCircle } from 'lucide-react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

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
      alert("To install the QXL Diagnostics app, tap 'Share' then 'Add to Home Screen' (on iOS/Safari), or click the install icon in your browser's address bar (on Chrome/Edge).");
    }
  };

  // Only hide if app is already installed (running in standalone mode)
  if (isInstalled) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="w-full min-h-[48px] px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 text-sm font-extrabold text-white"
      style={{
        background: status === 'success'
          ? 'linear-gradient(135deg, #16a34a, #15803d)'
          : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
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
          <Download className="w-4 h-4 text-white" />
          <span>Install App</span>
        </>
      )}
    </button>
  );
}

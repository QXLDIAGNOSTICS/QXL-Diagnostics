"use client";
import React from 'react';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#f8faff] flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-blue-100 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-2xl font-black text-[#0f2d5e] mb-3">You're Offline</h1>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          It looks like you've lost your internet connection. Please check your network and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-[#2563eb] text-white font-extrabold py-3.5 rounded-xl shadow-md hover:bg-[#1d4ed8] transition-all text-sm uppercase tracking-wider"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

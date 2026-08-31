"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart3, ArrowRight, CheckCircle2, Copy, Sparkles, Shield, Compass, FileText } from 'lucide-react';
import { isChatGPTReferral } from '@/lib/chatgptAnalytics';

export default function ChatGPTAnalyticsPage() {
  const [copied, setCopied] = useState(false);
  const [testSlug, setTestSlug] = useState('cbc-test-bangalore');
  const [isReferralActive, setIsReferralActive] = useState(false);

  useEffect(() => {
    setIsReferralActive(isChatGPTReferral());
  }, []);

  const generatedUrl = `https://qxldiagnostics.com/tests/${testSlug}?utm_source=chatgpt.com&utm_medium=referral&utm_campaign=chatgpt_recommendation`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-[#0f2d5e] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="absolute right-4 top-4 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> GA4 Tracking Active
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mb-2">ChatGPT Traffic &amp; Conversion Analytics</h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-medium leading-relaxed">
            Track and measure all traffic originating from ChatGPT recommendations (<code className="bg-blue-900/60 px-1.5 py-0.5 rounded text-amber-300">utm_source=chatgpt.com</code> or direct referrals).
          </p>
        </div>

        {/* Live Status Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${isReferralActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-300'}`} />
            <div>
              <h3 className="font-extrabold text-[#0f2d5e] text-sm">
                Current Session Status: {isReferralActive ? 'Active ChatGPT Session' : 'Standard Web Session'}
              </h3>
              <p className="text-slate-500 text-xs font-medium">
                {isReferralActive
                  ? 'All pageviews and booking funnel steps in this session are tagged for GA4 ChatGPT Reporting.'
                  : 'Test referral tracking by opening a URL with utm_source=chatgpt.com.'}
              </p>
            </div>
          </div>
          <Link
            href="/cbc-test-bangalore?utm_source=chatgpt.com&utm_medium=referral"
            className="bg-[#2563eb] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all flex items-center gap-1.5 shrink-0"
          >
            Test ChatGPT Link <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* GA4 Reporting Specs */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-lg font-black text-[#0f2d5e] flex items-center gap-2 border-b border-slate-100 pb-3">
            <BarChart3 className="w-5 h-5 text-[#2563eb]" />
            GA4 Custom Event Metric Schema
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">Metric 1</span>
              <h3 className="font-bold text-[#0f2d5e] text-sm">1. Landing Page Views</h3>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                Event: <code className="bg-white border text-blue-800 font-mono px-1 py-0.5 rounded">chatgpt_session_start</code><br />
                Measures initial entry point when ChatGPT refers a patient.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
              <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">Metric 2</span>
              <h3 className="font-bold text-[#0f2d5e] text-sm">2. Test Views</h3>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                Event: <code className="bg-white border text-emerald-800 font-mono px-1 py-0.5 rounded">chatgpt_test_view</code><br />
                Measures specific test landing page views (CBC, HbA1c, TSH, etc.).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2">
              <span className="bg-amber-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">Metric 3</span>
              <h3 className="font-bold text-[#0f2d5e] text-sm">3. Booking Start</h3>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                Event: <code className="bg-white border text-amber-800 font-mono px-1 py-0.5 rounded">chatgpt_booking_start</code><br />
                Measures patients entering the booking checkout with tests selected.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
              <span className="bg-purple-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">Metric 4</span>
              <h3 className="font-bold text-[#0f2d5e] text-sm">4. Completed Bookings</h3>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">
                Event: <code className="bg-white border text-purple-800 font-mono px-1 py-0.5 rounded">chatgpt_booking_completed</code><br />
                Measures revenue, order value, and completed booking conversions.
              </p>
            </div>
          </div>
        </div>

        {/* ChatGPT Link Builder */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg font-black text-[#0f2d5e] flex items-center gap-2 border-b border-slate-100 pb-3">
            <Compass className="w-5 h-5 text-[#2563eb]" />
            ChatGPT URL Builder
          </h2>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Select Test Slug:</label>
            <select
              value={testSlug}
              onChange={(e) => setTestSlug(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800"
            >
              <option value="cbc-test-bangalore">Complete Blood Count (CBC)</option>
              <option value="hba1c-test-bangalore">HbA1c Glycated Hemoglobin</option>
              <option value="tsh-test-bangalore">Thyroid Stimulating Hormone (TSH)</option>
              <option value="vitamin-d-test-bangalore">Vitamin D (25-OH)</option>
              <option value="lipid-profile-test-bangalore">Lipid Profile Test</option>
              <option value="liver-function-test-bangalore">Liver Function Test (LFT)</option>
              <option value="kidney-function-test-bangalore">Kidney Function Test (KFT)</option>
            </select>
          </div>

          <div className="p-4 bg-slate-900 rounded-2xl text-slate-100 flex items-center justify-between gap-3 text-xs font-mono break-all">
            <span>{generatedUrl}</span>
            <button
              onClick={copyToClipboard}
              className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg font-sans text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy URL'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

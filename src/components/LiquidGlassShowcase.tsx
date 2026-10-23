"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  ShoppingCart, 
  Search, 
  PhoneCall, 
  ShieldCheck, 
  HeartPulse, 
  Microscope,
  CheckCircle2,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LiquidGlassShowcase() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"buttons" | "cards" | "docks" | "inputs">("buttons");

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="relative py-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient background light orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="liquid-glass-badge mb-4 mx-auto w-fit">
          <span className="liquid-dot" />
          <span>Spatial & Fluid Dynamics</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-[#0f2d5e] tracking-tight mb-4">
          Liquid Glass <span className="text-[#2563EB]">Design System</span>
        </h2>
        <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
          Ultra-refined liquid glassmorphism featuring multi-layered specular reflections, curved meniscus highlights, dynamic refraction shimmers, and tactile fluid interactions.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {[
            { id: "buttons", label: "Liquid Buttons" },
            { id: "cards", label: "Glass Cards" },
            { id: "docks", label: "Floating Docks" },
            { id: "inputs", label: "Refractive Inputs" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "liquid-glass-btn-primary !py-2 !px-5 text-white shadow-md scale-105"
                  : "liquid-glass-pill hover:scale-102"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB 1: BUTTONS ── */}
      {activeTab === "buttons" && (
        <div className="space-y-12">
          {/* Grid of Variants */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Primary Liquid Glass */}
            <div className="liquid-glass-card p-6 flex flex-col justify-between items-center text-center space-y-6">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 block mb-1">
                  Primary Variant
                </span>
                <h3 className="text-lg font-black text-[#0f2d5e]">Electric Sky</h3>
                <p className="text-xs text-slate-500 mt-1">High-specular royal & cyan liquid gel with animated shimmer sweep.</p>
              </div>

              <div className="py-4">
                <button className="liquid-glass-btn-primary">
                  <span>Book A Test</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <code className="text-[11px] bg-blue-50 text-blue-700 px-2 py-1 rounded">.liquid-glass-btn-primary</code>
                <button
                  onClick={() => copyToClipboard('<button className="liquid-glass-btn-primary">Book A Test</button>', 'btn-primary')}
                  className="p-1.5 hover:text-blue-600 transition-colors"
                  title="Copy code"
                >
                  {copiedCode === 'btn-primary' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 2. Secondary Frosted Glass */}
            <div className="liquid-glass-card p-6 flex flex-col justify-between items-center text-center space-y-6">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                  Secondary Variant
                </span>
                <h3 className="text-lg font-black text-[#0f2d5e]">Frosted Milk</h3>
                <p className="text-xs text-slate-500 mt-1">Crystal clear frosted glass with crisp white specular top rim.</p>
              </div>

              <div className="py-4">
                <button className="liquid-glass-btn-secondary">
                  <span>View Catalogue</span>
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </button>
              </div>

              <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <code className="text-[11px] bg-slate-100 text-slate-700 px-2 py-1 rounded">.liquid-glass-btn-secondary</code>
                <button
                  onClick={() => copyToClipboard('<button className="liquid-glass-btn-secondary">View Catalogue</button>', 'btn-sec')}
                  className="p-1.5 hover:text-blue-600 transition-colors"
                  title="Copy code"
                >
                  {copiedCode === 'btn-sec' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 3. Midnight Navy Glass */}
            <div className="liquid-glass-navy p-6 rounded-3xl flex flex-col justify-between items-center text-center space-y-6 text-white">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-300 block mb-1">
                  Spatial Navy Variant
                </span>
                <h3 className="text-lg font-black text-white">Deep Midnight</h3>
                <p className="text-xs text-sky-200/70 mt-1">Dark sapphire glass with neon refraction borders for dark sections.</p>
              </div>

              <div className="py-4">
                <button className="liquid-glass-btn-navy">
                  <span>Doctor Review</span>
                  <ShieldCheck className="w-4 h-4 text-sky-300" />
                </button>
              </div>

              <div className="w-full pt-4 border-t border-white/10 flex items-center justify-between text-xs text-sky-300/80">
                <code className="text-[11px] bg-white/10 text-sky-200 px-2 py-1 rounded">.liquid-glass-btn-navy</code>
                <button
                  onClick={() => copyToClipboard('<button className="liquid-glass-btn-navy">Doctor Review</button>', 'btn-navy')}
                  className="p-1.5 hover:text-white transition-colors"
                  title="Copy code"
                >
                  {copiedCode === 'btn-navy' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 4. Emerald Health Glass */}
            <div className="liquid-glass-card p-6 flex flex-col justify-between items-center text-center space-y-6">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 block mb-1">
                  Health & WhatsApp
                </span>
                <h3 className="text-lg font-black text-[#0f2d5e]">Emerald Pure</h3>
                <p className="text-xs text-slate-500 mt-1">Medical verification green with vivid inner refraction & shine.</p>
              </div>

              <div className="py-4">
                <button className="liquid-glass-btn-emerald">
                  <span>Chat On WhatsApp</span>
                  <PhoneCall className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <code className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded">.liquid-glass-btn-emerald</code>
                <button
                  onClick={() => copyToClipboard('<button className="liquid-glass-btn-emerald">Chat On WhatsApp</button>', 'btn-eme')}
                  className="p-1.5 hover:text-blue-600 transition-colors"
                  title="Copy code"
                >
                  {copiedCode === 'btn-eme' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>

          {/* Icon Button Orbs & Pills Row */}
          <div className="liquid-glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-base font-black text-[#0f2d5e]">Liquid Glass Action Orbs & Capsules</h4>
              <p className="text-xs text-slate-500">Tactile circular glass buttons for carts, triggers, and live status capsules.</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="liquid-glass-icon-btn shadow-lg" title="Cart Orb">
                <ShoppingCart className="w-5 h-5 text-white" />
              </button>
              <button className="liquid-glass-icon-btn shadow-lg" title="Search Orb">
                <Search className="w-5 h-5 text-white" />
              </button>
              <button className="liquid-glass-icon-btn shadow-lg" title="Diagnostics Orb">
                <Microscope className="w-5 h-5 text-white" />
              </button>

              <div className="liquid-glass-pill cursor-pointer">
                <span className="liquid-dot" />
                <span>NABL Accredited</span>
              </div>

              <div className="liquid-glass-pill cursor-pointer">
                <HeartPulse className="w-4 h-4 text-rose-500" />
                <span>60-Min Home Pickup</span>
              </div>
            </div>
          </div>

          {/* Shadcn UI Integration */}
          <div className="liquid-glass-card p-8">
            <h4 className="text-base font-black text-[#0f2d5e] mb-2">Shadcn / Base UI Integration</h4>
            <p className="text-xs text-slate-500 mb-6">Use directly via the React <code>&lt;Button variant=&quot;liquid&quot;&gt;</code> component.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="liquid" size="lg">
                &lt;Button variant=&quot;liquid&quot;&gt;
              </Button>
              <Button variant="liquid-outline" size="lg">
                &lt;Button variant=&quot;liquid-outline&quot;&gt;
              </Button>
              <Button variant="liquid-navy" size="lg">
                &lt;Button variant=&quot;liquid-navy&quot;&gt;
              </Button>
              <Button variant="liquid-emerald" size="lg">
                &lt;Button variant=&quot;liquid-emerald&quot;&gt;
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: CARDS ── */}
      {activeTab === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="liquid-glass-card p-6 space-y-4">
            <div className="liquid-glass-badge">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Full Body Checkup</span>
            </div>
            <h3 className="text-xl font-black text-[#0f2d5e]">Comprehensive Health Panel</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Includes 84 vital parameters covering Liver, Kidney, Lipid, Thyroid, and Blood Complete Count with home collection.
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-2xl font-black text-[#2563EB]">₹999</span>
              <button className="liquid-glass-btn-primary !px-4 !py-2 !text-xs">Book</button>
            </div>
          </div>

          <div className="liquid-glass-sky p-6 rounded-3xl space-y-4">
            <div className="liquid-glass-badge !bg-white/80">
              <Microscope className="w-3.5 h-3.5" />
              <span>Advanced Biomarkers</span>
            </div>
            <h3 className="text-xl font-black text-[#0f2d5e]">Cardiac Risk Score</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              hs-CRP, Homocysteine, Apolipoproteins, and Lipid profile evaluated by senior cardiologists.
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-blue-200/60">
              <span className="text-2xl font-black text-[#0284C7]">₹1,499</span>
              <button className="liquid-glass-btn-secondary !px-4 !py-2 !text-xs">Details</button>
            </div>
          </div>

          <div className="liquid-glass-navy p-6 rounded-3xl space-y-4 text-white">
            <div className="liquid-glass-badge !bg-white/10 !text-sky-300 !border-white/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Doctor-Led Diagnostics</span>
            </div>
            <h3 className="text-xl font-black text-white">Pathology Review</h3>
            <p className="text-xs text-sky-100/75 leading-relaxed">
              Every critical value is independently verified and signed off by a certified MD Biochemist.
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <span className="text-2xl font-black text-sky-300">Free</span>
              <button className="liquid-glass-btn-navy !px-4 !py-2 !text-xs !bg-blue-600">Consult</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: DOCKS ── */}
      {activeTab === "docks" && (
        <div className="space-y-6">
          <div className="p-8 bg-gradient-to-r from-blue-500/10 via-sky-400/10 to-indigo-500/10 rounded-3xl border border-blue-100 flex flex-col items-center justify-center min-h-[300px]">
            <p className="text-xs font-black uppercase tracking-wider text-blue-600 mb-6">
              Interactive Floating Liquid Glass Dock
            </p>

            <div className="liquid-glass-dock max-w-lg w-full flex items-center justify-between px-5 py-3.5 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="liquid-glass-icon-btn !w-10 !h-10 rounded-2xl shadow-md">
                  <ShoppingCart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-black text-[#0B2545] text-sm block leading-tight">
                    3 Tests Selected · ₹1,998
                  </span>
                  <span className="text-[11px] text-[#0284c7] font-bold flex items-center gap-1.5 mt-0.5">
                    <span className="liquid-dot" />
                    <span>Free Doorstep Phlebotomist</span>
                  </span>
                </div>
              </div>

              <button className="liquid-glass-btn-primary !px-5 !py-2.5 !text-xs">
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: INPUTS ── */}
      {activeTab === "inputs" && (
        <div className="liquid-glass-card p-8 max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h4 className="text-lg font-black text-[#0f2d5e]">Refractive Liquid Glass Inputs</h4>
            <p className="text-xs text-slate-500">Translucent form controls with specular highlight focus rings.</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 1,200+ diagnostic tests & profiles..."
                className="liquid-glass-input w-full pl-11 pr-32 py-3 rounded-full text-xs font-medium text-[#0f2d5e] outline-none"
              />
              <button className="liquid-glass-btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 !px-4 !py-1.5 !text-[11px]">
                Search
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Patient Full Name"
                className="liquid-glass-input w-full px-4 py-2.5 rounded-2xl text-xs font-medium text-[#0f2d5e] outline-none"
              />
              <input
                type="tel"
                placeholder="WhatsApp Phone Number"
                className="liquid-glass-input w-full px-4 py-2.5 rounded-2xl text-xs font-medium text-[#0f2d5e] outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

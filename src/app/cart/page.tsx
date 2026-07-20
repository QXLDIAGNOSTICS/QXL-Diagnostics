"use client";
import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, Trash2, Shield, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { api } from "../../lib/api";

const DEFAULT_PACKAGES = [
  {
    id: "pkg-1",
    name: "Quick Fit Package",
    tag: "QUICK",
    price: 1770,
    old_price: 4696,
    save_amount: 2926,
    parameters: "13 Parameters",
    includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Liver Function Tests, Kidney Function Tests (Creatinine, Urea, BUN, Uric Acid), TSH, Vitamin D, CBC, ESR, Urine Routine & Microscopy.",
    who_should_take: "All adults",
    age: "18-99 yrs",
    gender: "Both",
    doctor_recommended: true,
    home_collection_available: true,
    benefits: ["Complete metabolic screening", "Same-day electronic reports"]
  },
  {
    id: "pkg-2",
    name: "Q-Screen Diabetes Package",
    tag: "DIABETES",
    price: 1900,
    old_price: 4960,
    save_amount: 3060,
    parameters: "12 Parameters",
    includes: "FBS, HbA1c, eAG, Urine Microalbumin, Protein/Creatinine Ratio, C-Peptide, Lipid Profile, Liver Function Test, Kidney Function Test (Creatinine, Urea, BUN, Sodium, Potassium, Chloride), TSH, CBC, ESR, Urine Routine & Microscopy.",
    who_should_take: "Diabetic & pre-diabetic individuals",
    age: "18-99 yrs",
    gender: "Both",
    doctor_recommended: true,
    home_collection_available: true,
    benefits: ["Detailed diabetic monitoring", "Microalbumin screening included"]
  },
  {
    id: "pkg-3",
    name: "Q-Master Health Pro Package",
    tag: "PRO",
    price: 4600,
    old_price: 9600,
    save_amount: 5000,
    parameters: "20 Parameters",
    includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Apo A-1, Apo-B, Apo B/A1 Ratio, Liver Function Tests, Kidney Screen (Creatinine, Urea, BUN, Uric Acid, Sodium, Potassium, Chloride), Thyroid Function Tests (T3, T4, TSH), Vitamin D, Vitamin B12, CBC, ESR, Urine Routine & Microscopy, Gastritis Screen (H. pylori IgG Antibodies), hs-CRP.",
    who_should_take: "Advanced full body assessment",
    age: "18-99 yrs",
    gender: "Both",
    doctor_recommended: true,
    home_collection_available: true,
    benefits: ["Apolipoproteins assessment", "Gastritis & H. pylori screen"]
  },
  {
    id: "pkg-4",
    name: "Q-Oncoscreen Package",
    tag: "ONCOSCREEN",
    price: 7900,
    old_price: 13600,
    save_amount: 5700,
    parameters: "10 Parameters",
    includes: "Cancer Markers (Alpha Fetoprotein AFP, Carcinoembryonic Antigen (CEA), Beta HCG, Prostate-Specific Antigen (PSA) - Male, CA-125 (Ovarian Cancer Marker) - Female, CA-19.9 (Pancreatic Cancer Marker)), CBC, ESR, Urine Routine & Microscopy, Calprotectin in Stool, Fecal Occult Blood Test (FOBT), Protein Electrophoresis.",
    who_should_take: "Cancer risk screening",
    age: "18-99 yrs",
    gender: "Both",
    doctor_recommended: false,
    home_collection_available: true,
    benefits: ["Key cancer tumor markers", "Stool calprotectin screening"]
  },
  {
    id: "pkg-5",
    name: "Q-Advanced Arthritis and Autoimmune Panel",
    tag: "ARTHRITIS",
    price: 6900,
    old_price: 12660,
    save_amount: 5760,
    parameters: "22 Parameters",
    includes: "FBS, HbA1c, eAG, Lipid Profile, hs-CRP, Liver Function Tests, Kidney Function Tests, Thyroid Screen (T3, T4, TSH), Iron Studies (Iron, TIBC, Transferrin), Bone Health (Calcium, Phosphorus), Vitamin B12, Vitamin D, Autoimmune Tests (RF, Anti-CCP, ANA), DHEA-S, Cortisol, CBC, ESR, Urine Routine & Microscopy.",
    who_should_take: "Joint pain & swelling concerns",
    age: "18-99 yrs",
    gender: "Both",
    doctor_recommended: false,
    home_collection_available: true,
    benefits: ["Rheumatoid Factor & Anti-CCP", "Bone & Joint markers", "ANA autoimmune check"]
  },
  {
    id: "pkg-6",
    name: "Q-Hypertension and Cardiovascular Risk Assessment Package",
    tag: "CARDIAC",
    price: 9000,
    old_price: 18900,
    save_amount: 9900,
    parameters: "25 Parameters",
    includes: "CBC, Lipid Profile, Kidney Screen (BUN, Urea, Creatinine, Sodium, Potassium, Chloride), Urine Routine & Microscopy, FBS, Apo A1, Apo B, Apo B/A1 Ratio, hs-CRP, Lipoprotein(a), Fibrinogen, Homocysteine, NT-proBNP, Insulin, C-Peptide, Thyroid Screen (T3, T4, TSH), Cortisol Level, Serum Magnesium.",
    who_should_take: "Cardiovascular health assessment",
    age: "18-99 yrs",
    gender: "Both",
    doctor_recommended: true,
    home_collection_available: true,
    benefits: ["NT-proBNP cardiac marker", "Lp(a), Homocysteine & Fibrinogen", "Apo-A1 & Apo-B ratio"]
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [catalogPackages, setCatalogPackages] = useState<any[]>(DEFAULT_PACKAGES);

  useEffect(() => {
    // Load current cart items
    if (typeof window !== 'undefined') {
      try {
        setCartItems(JSON.parse(localStorage.getItem('qxl_cart') || '[]'));
      } catch {}
    }

    // Load actual packages if available from API
    let cancelled = false;
    api.packages
      .list()
      .then((data) => {
        if (cancelled) return;
        const fetched = data.map((p) => ({
          ...p,
          age: p.age_group,
          benefits: p.benefits ? JSON.parse(p.benefits) : [],
        }));
        const merged: any[] = [...DEFAULT_PACKAGES];
        for (const f of fetched) {
          if (!merged.some(m => m.name.toLowerCase() === f.name.toLowerCase())) {
            merged.push(f);
          }
        }
        setCatalogPackages(merged);
      })
      .catch((err) => {
        console.error("Failed to load catalog packages in cart page", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleRemoveItem = (name: string) => {
    const updated = cartItems.filter(item => item !== name);
    setCartItems(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('qxl_cart', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('cartChange'));
    }
  };

  const handleAddSuggested = (name: string) => {
    if (!cartItems.includes(name)) {
      const updated = [...cartItems, name];
      setCartItems(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('qxl_cart', JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('cartChange'));
      }
    }
  };

  // Find detailed objects for added packages
  const addedDetails = catalogPackages.filter(pkg => cartItems.includes(pkg.name));
  
  // Find other packages to suggest (not in cart)
  const suggestedPackages = catalogPackages.filter(pkg => !cartItems.includes(pkg.name));

  const totalPrice = addedDetails.reduce((sum, item) => sum + (item.price || 0), 0);
  const totalOldPrice = addedDetails.reduce((sum, item) => sum + (item.old_price || item.price || 0), 0);
  const totalDiscount = totalOldPrice - totalPrice;

  return (
    <div className="bg-[#f8faff] min-h-screen py-12">
      <div className="max-w-[1200px] mx-auto px-4 w-full">
        <div className="flex items-center gap-2 mb-8">
          <span className="bg-blue-600/10 text-blue-600 p-2 rounded-xl">
            <ShoppingBag className="w-6 h-6" />
          </span>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">My Selection Cart</h1>
            <p className="text-slate-500 text-xs">Review chosen diagnostics packages and checkout.</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-blue-100 rounded-3xl p-12 text-center shadow-sm max-w-xl mx-auto mb-16">
            <div className="w-16 h-16 bg-blue-50 text-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Your selection is empty</h2>
            <p className="text-slate-500 text-xs max-w-md mx-auto mb-8 font-medium">
              You haven&apos;t added any health packages yet. Choose from our recommended premium checks below.
            </p>
            <Link 
              href="/packages"
              className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-extrabold px-8 py-3 rounded-full hover:bg-[#1d4ed8] active:scale-95 transition-all text-xs uppercase tracking-wider shadow-md"
            >
              Browse All Packages <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Active Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-start">
            {/* Added Items List */}
            <div className="lg:col-span-2 space-y-4">
              {addedDetails.map((item) => (
                <div key={item.id} className="bg-white border border-blue-100/50 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row justify-between gap-4 hover:border-blue-300 transition-colors">
                  <div className="flex-1">
                    <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider mb-2 border border-blue-100">
                      {item.tag || "HEALTH"}
                    </span>
                    <h3 className="font-extrabold text-slate-800 text-sm md:text-base leading-snug mb-1">{item.name}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mb-3">Includes: {item.parameters}</p>
                    <p className="text-[10px] text-slate-500 line-clamp-2 hover:line-clamp-none cursor-pointer leading-relaxed">{item.includes}</p>
                  </div>
                  
                  <div className="flex sm:flex-col justify-between items-end gap-3 sm:border-l sm:border-slate-100 sm:pl-5 shrink-0">
                    <button 
                      onClick={() => handleRemoveItem(item.name)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-colors cursor-pointer"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="text-right">
                      {item.old_price && (
                        <span className="text-[10px] text-slate-400 line-through block mb-0.5">₹{item.old_price}</span>
                      )}
                      <span className="text-lg font-black text-slate-900">₹{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selection Summary Panel */}
            <div className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm">
              <h3 className="text-slate-800 font-extrabold text-sm uppercase tracking-wider mb-5 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> Selection Summary
              </h3>
              
              <div className="space-y-3.5 mb-6 text-xs font-semibold text-slate-600">
                <div className="flex justify-between">
                  <span>Packages ({addedDetails.length})</span>
                  <span className="text-slate-800">₹{totalOldPrice}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount Saved</span>
                    <span>- ₹{totalDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Home Sample Collection</span>
                  <span className="text-emerald-600">FREE</span>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between text-sm font-extrabold text-slate-800">
                  <span>Total Amount</span>
                  <span className="text-base text-blue-600">₹{totalPrice}</span>
                </div>
              </div>

              <Link 
                href="/book"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#2563eb] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#1d4ed8] active:scale-95 transition-all shadow-md text-center"
              >
                Proceed to Book <ArrowRight className="w-4 h-4" />
              </Link>
              
              <div className="mt-4 flex items-start gap-2 bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                <Shield className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-blue-700/80 leading-relaxed font-semibold">
                  Sample collection is performed inside the safety of your home by certified phlebotomists.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Health Packages Section */}
        {suggestedPackages.length > 0 && (
          <div className="mt-12 pt-10 border-t border-slate-200">
            <div className="mb-6">
              <h2 className="text-slate-800 font-extrabold text-lg flex items-center gap-1.5">
                Add Premium Health Packages
              </h2>
              <p className="text-slate-500 text-xs">Choose and customize your diagnostic checklist.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedPackages.slice(0, 6).map((pkg) => (
                <div key={pkg.id} className="bg-white border border-blue-100/40 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all">
                  <div>
                    <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider mb-2 border border-blue-100">
                      {pkg.tag || "HEALTH"}
                    </span>
                    <h3 className="font-bold text-slate-800 text-xs md:text-sm mb-1 leading-snug">{pkg.name}</h3>
                    <p className="text-[10px] text-slate-500 line-clamp-2 mb-3 leading-relaxed">{pkg.includes}</p>
                  </div>
                  
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4 mt-4">
                    <div>
                      {pkg.old_price && (
                        <span className="text-[9px] text-slate-400 line-through block mb-0.5">₹{pkg.old_price}</span>
                      )}
                      <span className="text-sm font-black text-slate-800">₹{pkg.price}</span>
                    </div>
                    <button
                      onClick={() => handleAddSuggested(pkg.name)}
                      className="bg-white hover:bg-blue-50 text-[#2563eb] border border-blue-100 hover:border-blue-300 text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

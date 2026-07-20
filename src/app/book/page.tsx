"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, User, Phone, MapPin, Shield, X, Mail, LocateFixed, CheckCircle2, Loader2, Home, Building2, AlertTriangle } from 'lucide-react';
import { api, type TestCatalogItem, type HealthPackage, type Booking } from '../../lib/api';
import { useAuth } from '../../lib/useAuth';


type CatalogEntry = {
  id: string;
  name: string;
  kind: 'test' | 'package';
  price: number | null;
  home_collection_available: boolean;
  parameters?: string | null;
  includes?: string | null;
  old_price?: number | null;
};

export default function BookPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    date: '',
    collectionType: 'home' as 'home' | 'center',
  });

  // ── Master catalog (the only source of truth for bookable items) ──────────
  const [catalog, setCatalog] = useState<CatalogEntry[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<CatalogEntry[]>([]);
  const [testInput, setTestInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [createdBookings, setCreatedBookings] = useState<Booking[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Recommended test/package names carried over from an AI prescription
  // analysis (via /book?tests=...) that we couldn't match to anything in
  // our bookable catalog — surfaced to the user instead of silently dropped.
  const [unmatchedRecommended, setUnmatchedRecommended] = useState<string[]>([]);

  // ── Geolocation ─────────────────────────────────────────────────────────────
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [detectedAddress, setDetectedAddress] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Silently request location on page load, same as the rest of the site —
  // this is just a hint; we re-confirm with the user explicitly before booking.
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setCoords(null),
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setCatalogLoading(true);
      try {
        const tests = await api.tests.list().catch(() => []);
        const packages = await api.packages.list().catch(() => []);
        if (cancelled) return;
        
        // Define fallback DEFAULT_PACKAGES to resolve client-side matches
        const fallbackPackages = [
          {
            id: "pkg-1",
            name: "Quick Fit Package",
            kind: 'package' as const,
            price: 1770,
            old_price: 4696,
            home_collection_available: true,
            parameters: "13 Parameters",
            includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Liver Function Tests, Kidney Function Tests (Creatinine, Urea, BUN, Uric Acid), TSH, Vitamin D, CBC, ESR, Urine Routine & Microscopy."
          },
          {
            id: "pkg-2",
            name: "Q-Screen Diabetes Package",
            kind: 'package' as const,
            price: 1900,
            old_price: 4960,
            home_collection_available: true,
            parameters: "12 Parameters",
            includes: "FBS, HbA1c, eAG, Urine Microalbumin, Protein/Creatinine Ratio, C-Peptide, Lipid Profile, Liver Function Test, Kidney Function Test (Creatinine, Urea, BUN, Sodium, Potassium, Chloride), TSH, CBC, ESR, Urine Routine & Microscopy."
          },
          {
            id: "pkg-3",
            name: "Q-Master Health Pro Package",
            kind: 'package' as const,
            price: 4600,
            old_price: 9600,
            home_collection_available: true,
            parameters: "20 Parameters",
            includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Apo A-1, Apo-B, Apo B/A1 Ratio, Liver Function Tests, Kidney Screen (Creatinine, Urea, BUN, Uric Acid, Sodium, Potassium, Chloride), Thyroid Function Tests (T3, T4, TSH), Vitamin D, Vitamin B12, CBC, ESR, Urine Routine & Microscopy, Gastritis Screen (H. pylori IgG Antibodies), hs-CRP."
          },
          {
            id: "pkg-4",
            name: "Q-Oncoscreen Package",
            kind: 'package' as const,
            price: 7900,
            old_price: 13600,
            home_collection_available: true,
            parameters: "10 Parameters",
            includes: "Cancer Markers (Alpha Fetoprotein AFP, Carcinoembryonic Antigen (CEA), Beta HCG, Prostate-Specific Antigen (PSA) - Male, CA-125 (Ovarian Cancer Marker) - Female, CA-19.9 (Pancreatic Cancer Marker)), CBC, ESR, Urine Routine & Microscopy, Calprotectin in Stool, Fecal Occult Blood Test (FOBT), Protein Electrophoresis."
          },
          {
            id: "pkg-5",
            name: "Q-Advanced Arthritis and Autoimmune Panel",
            kind: 'package' as const,
            price: 6900,
            old_price: 12660,
            home_collection_available: true,
            parameters: "22 Parameters",
            includes: "FBS, HbA1c, eAG, Lipid Profile, hs-CRP, Liver Function Tests, Kidney Function Tests, Thyroid Screen (T3, T4, TSH), Iron Studies (Iron, TIBC, Transferrin), Bone Health (Calcium, Phosphorus), Vitamin B12, Vitamin D, Autoimmune Tests (RF, Anti-CCP, ANA), DHEA-S, Cortisol, CBC, ESR, Urine Routine & Microscopy."
          },
          {
            id: "pkg-6",
            name: "Q-Hypertension and Cardiovascular Risk Assessment Package",
            kind: 'package' as const,
            price: 9000,
            old_price: 18900,
            home_collection_available: true,
            parameters: "25 Parameters",
            includes: "CBC, Lipid Profile, Kidney Screen (BUN, Urea, Creatinine, Sodium, Potassium, Chloride), Urine Routine & Microscopy, FBS, Apo A1, Apo B, Apo B/A1 Ratio, hs-CRP, Lipoprotein(a), Fibrinogen, Homocysteine, NT-proBNP, Insulin, C-Peptide, Thyroid Screen (T3, T4, TSH), Cortisol Level, Serum Magnesium."
          }
        ];

        const merged: CatalogEntry[] = [
          ...packages.map((p: HealthPackage): CatalogEntry => ({
            id: p.id,
            name: p.name,
            kind: 'package',
            price: p.price,
            old_price: p.old_price,
            home_collection_available: p.home_collection_available,
            parameters: p.parameters,
            includes: p.includes,
          })),
          ...tests.map((t: TestCatalogItem): CatalogEntry => ({
            id: t.id,
            name: t.name,
            kind: 'test',
            price: t.price,
            home_collection_available: t.home_collection_available,
          })),
        ];

        // Merge fallback packages if they aren't loaded in merged yet
        for (const fb of fallbackPackages) {
          if (!merged.some(m => m.name.toLowerCase() === fb.name.toLowerCase())) {
            merged.push(fb);
          }
        }

        setCatalog(merged);
      } catch {
        const fallbackPackages = [
          {
            id: "pkg-1",
            name: "Quick Fit Package",
            kind: 'package' as const,
            price: 1770,
            old_price: 4696,
            home_collection_available: true,
            parameters: "13 Parameters",
            includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Liver Function Tests, Kidney Function Tests (Creatinine, Urea, BUN, Uric Acid), TSH, Vitamin D, CBC, ESR, Urine Routine & Microscopy."
          },
          {
            id: "pkg-2",
            name: "Q-Screen Diabetes Package",
            kind: 'package' as const,
            price: 1900,
            old_price: 4960,
            home_collection_available: true,
            parameters: "12 Parameters",
            includes: "FBS, HbA1c, eAG, Urine Microalbumin, Protein/Creatinine Ratio, C-Peptide, Lipid Profile, Liver Function Test, Kidney Function Test (Creatinine, Urea, BUN, Sodium, Potassium, Chloride), TSH, CBC, ESR, Urine Routine & Microscopy."
          },
          {
            id: "pkg-3",
            name: "Q-Master Health Pro Package",
            kind: 'package' as const,
            price: 4600,
            old_price: 9600,
            home_collection_available: true,
            parameters: "20 Parameters",
            includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Apo A-1, Apo-B, Apo B/A1 Ratio, Liver Function Tests, Kidney Screen (Creatinine, Urea, BUN, Uric Acid, Sodium, Potassium, Chloride), Thyroid Function Tests (T3, T4, TSH), Vitamin D, Vitamin B12, CBC, ESR, Urine Routine & Microscopy, Gastritis Screen (H. pylori IgG Antibodies), hs-CRP."
          },
          {
            id: "pkg-4",
            name: "Q-Oncoscreen Package",
            kind: 'package' as const,
            price: 7900,
            old_price: 13600,
            home_collection_available: true,
            parameters: "10 Parameters",
            includes: "Cancer Markers (Alpha Fetoprotein AFP, Carcinoembryonic Antigen (CEA), Beta HCG, Prostate-Specific Antigen (PSA) - Male, CA-125 (Ovarian Cancer Marker) - Female, CA-19.9 (Pancreatic Cancer Marker)), CBC, ESR, Urine Routine & Microscopy, Calprotectin in Stool, Fecal Occult Blood Test (FOBT), Protein Electrophoresis."
          },
          {
            id: "pkg-5",
            name: "Q-Advanced Arthritis and Autoimmune Panel",
            kind: 'package' as const,
            price: 6900,
            old_price: 12660,
            home_collection_available: true,
            parameters: "22 Parameters",
            includes: "FBS, HbA1c, eAG, Lipid Profile, hs-CRP, Liver Function Tests, Kidney Function Tests, Thyroid Screen (T3, T4, TSH), Iron Studies (Iron, TIBC, Transferrin), Bone Health (Calcium, Phosphorus), Vitamin B12, Vitamin D, Autoimmune Tests (RF, Anti-CCP, ANA), DHEA-S, Cortisol, CBC, ESR, Urine Routine & Microscopy."
          },
          {
            id: "pkg-6",
            name: "Q-Hypertension and Cardiovascular Risk Assessment Package",
            kind: 'package' as const,
            price: 9000,
            old_price: 18900,
            home_collection_available: true,
            parameters: "25 Parameters",
            includes: "CBC, Lipid Profile, Kidney Screen (BUN, Urea, Creatinine, Sodium, Potassium, Chloride), Urine Routine & Microscopy, FBS, Apo A1, Apo B, Apo B/A1 Ratio, hs-CRP, Lipoprotein(a), Fibrinogen, Homocysteine, NT-proBNP, Insulin, C-Peptide, Thyroid Screen (T3, T4, TSH), Cortisol Level, Serum Magnesium."
          }
        ];
        setCatalog(fallbackPackages);
      } finally {
        if (!cancelled) setCatalogLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Normalize a name for fuzzy comparison: lowercase, strip punctuation, collapse whitespace.
  const normalizeName = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

  // Find the best catalog match for a recommended test/package name. Prefers
  // an exact (normalized) match, then falls back to a substring match in
  // either direction, then a significant-word-overlap match — because AI- or
  // prescription-derived names (e.g. "HbA1c") rarely match our catalog's
  // exact formatting (e.g. "HbA1c, Glycated Hemoglobin") character-for-character.
  const findCatalogMatch = (wanted: string, items: CatalogEntry[]): CatalogEntry | undefined => {
    const nw = normalizeName(wanted);
    if (!nw) return undefined;
    let match = items.find((c) => normalizeName(c.name) === nw);
    if (match) return match;
    match = items.find((c) => {
      const nc = normalizeName(c.name);
      return nc.includes(nw) || nw.includes(nc);
    });
    if (match) return match;
    const wantedTokens = new Set(nw.split(' ').filter((t) => t.length > 2));
    if (wantedTokens.size === 0) return undefined;
    let bestOverlap = 0;
    for (const c of items) {
      const cTokens = normalizeName(c.name).split(' ').filter((t) => t.length > 2);
      const overlap = cTokens.filter((t) => wantedTokens.has(t)).length;
      if (overlap > bestOverlap && overlap >= Math.min(wantedTokens.size, cTokens.length) * 0.5) {
        bestOverlap = overlap;
        match = c;
      }
    }
    return match;
  };

  useEffect(() => {
    if (catalog.length === 0) return;
    const params = new URLSearchParams(window.location.search);
    const wanted = [...params.getAll('tests').map(t => t.trim()), params.get('package') || ''].filter(Boolean);
    
    try {
      const cart = JSON.parse(localStorage.getItem('qxl_cart') || '[]');
      for (const item of cart) {
        if (!wanted.includes(item)) {
          wanted.push(item);
        }
      }
    } catch {}

    if (!wanted.length) return;

    const matches: CatalogEntry[] = [];
    const unmatched: string[] = [];
    for (const w of wanted) {
      const match = findCatalogMatch(w, catalog);
      if (match) matches.push(match);
      else unmatched.push(w);
    }

    if (matches.length) {
      setSelectedItems(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        return [...prev, ...matches.filter(m => !existingIds.has(m.id))];
      });
    }
    setUnmatchedRecommended(unmatched);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog]);

  useEffect(() => {
    if (!user) return;
    setFormData(prev => ({
      ...prev,
      name: prev.name || user.name || '',
      phone: prev.phone || user.phone || '',
      email: prev.email || user.email || '',
    }));
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = testInput.trim()
    ? catalog
        .filter(c => c.name.toLowerCase().includes(testInput.trim().toLowerCase()))
        .filter(c => !selectedItems.some(s => s.id === c.id))
        .slice(0, 8)
    : [];

  const addItem = (item: CatalogEntry) => {
    setSelectedItems(prev => (prev.some(p => p.id === item.id) ? prev : [...prev, item]));
    setTestInput('');
    setShowSuggestions(false);
    try {
      const cart = JSON.parse(localStorage.getItem('qxl_cart') || '[]');
      if (!cart.includes(item.name)) {
        cart.push(item.name);
        localStorage.setItem('qxl_cart', JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cartChange'));
      }
    } catch {}
  };

  const removeItem = (id: string) => {
    setSelectedItems(prev => {
      const target = prev.find(i => i.id === id);
      if (target) {
        try {
          const cart = JSON.parse(localStorage.getItem('qxl_cart') || '[]');
          const updated = cart.filter((item: string) => item !== target.name);
          localStorage.setItem('qxl_cart', JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent('cartChange'));
        } catch {}
      }
      return prev.filter(i => i.id !== id);
    });
  };

  // Tests/packages in the current selection that can't be home-collected —
  // cross-checked live against the master catalog's home_collection_available flag.
  const centerOnlyItems = selectedItems.filter(i => !i.home_collection_available);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
            { headers: { Accept: 'application/json' } }
          );
          const data = await res.json();
          setDetectedAddress(data?.display_name || null);
          if (!data?.display_name) {
            setLocationError('Could not resolve an address for your location — please enter it manually.');
          }
        } catch {
          setLocationError('Could not resolve an address for your location — please enter it manually.');
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocationError('Unable to access your location. Please check browser permissions or enter your address manually.');
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const useDetectedAddress = () => {
    if (detectedAddress) setFormData(prev => ({ ...prev, address: detectedAddress }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    let currentSelected = [...selectedItems];
    if (testInput.trim()) {
      const match = findCatalogMatch(testInput.trim(), catalog);
      if (match && !currentSelected.some(s => s.id === match.id)) {
        currentSelected.push(match);
        setSelectedItems(currentSelected);
        setTestInput('');
      }
    }

    if (currentSelected.length === 0) {
      setError('Please select at least one test or health package from our catalog.');
      return;
    }
    if (formData.collectionType === 'home' && centerOnlyItems.length > 0) {
      setError(
        `${centerOnlyItems.map(i => i.name).join(', ')} ${centerOnlyItems.length > 1 ? 'are' : 'is'} only available as a center visit. Please remove ${centerOnlyItems.length > 1 ? 'them' : 'it'} or switch to "Walk-in Lab Center".`
      );
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      // One booking per selected catalog item — each is cross-checked against
      // the master Test/Package list server-side via test_id/package_id.
      const created: Booking[] = [];
      for (const item of currentSelected) {
        const isLocalFallback = item.id.startsWith('pkg-') || item.id.startsWith('test-');
        const booking = await api.bookings.create({
          patient_name: formData.name,
          patient_phone: formData.phone,
          patient_email: formData.email || undefined,
          test_name: (!isLocalFallback) ? undefined : item.name,
          test_id: (!isLocalFallback && item.kind === 'test') ? item.id : undefined,
          package_id: (!isLocalFallback && item.kind === 'package') ? item.id : undefined,
          collection_type: formData.collectionType,
          collection_address: formData.collectionType === 'home' ? formData.address || undefined : undefined,
          preferred_date: formData.date || undefined,
        });
        created.push(booking);
      }
      setCreatedBookings(created);
      setSubmitted(true);
      try {
        localStorage.removeItem('qxl_cart');
        window.dispatchEvent(new CustomEvent('cartChange'));
      } catch {}
    } catch (err) {
      console.error('Booking submission failed', err);
      const message = err instanceof Error ? err.message : null;
      setError(message || 'We could not submit your booking. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* Page Hero */}
      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#fbf8f5] py-12 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-3">Book a Health Test</h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl font-medium">
            Schedule a certified home sample collection or request an appointment at our laboratory in Bengaluru.
          </p>
          <div className="w-16 h-1 bg-[#2563eb] rounded-full mt-4"></div>
        </div>
      </section>

      {/* Main Content Form */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 w-full flex flex-col lg:flex-row gap-10">
          
          {/* Left Form */}
          <div className="w-full lg:w-2/3 bg-white border border-gray-150 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#dbeafe] text-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-extrabold">✓</div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Booking Request Received!</h2>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-6 font-medium">
                  Thank you, <strong className="text-slate-700">{formData.name}</strong>. Our clinical coordinator will call you back at <strong className="text-slate-700">{formData.phone}</strong> within 15 minutes to confirm your test slot.
                </p>

                <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 max-w-sm mx-auto mb-8 flex flex-col items-center text-center shadow-sm">
                  <img
                    src="/upi.jpg"
                    alt="Scan to Pay via UPI"
                    className="w-48 h-48 object-contain rounded-xl border border-slate-200 bg-white p-2 shadow-sm mb-3"
                  />
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-0.5">UPI Payment</span>
                  <p className="text-xs font-semibold text-slate-700 mb-2">
                    Scan with GPay, PhonePe, Paytm or any UPI app to pay
                  </p>
                  <span className="inline-block bg-blue-50 text-[#2563eb] text-xs font-mono font-bold px-3 py-1 rounded-lg border border-blue-100">
                    qxl-diagnostics@pingpay
                  </span>
                </div>




                <button 
                  onClick={() => { setSubmitted(false); setCreatedBookings([]); setFormData({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '', address: '', date: '', collectionType: 'home' }); setSelectedItems([]); setTestInput(''); setUnmatchedRecommended([]); }} 
                  className="bg-[#2563eb] text-white font-bold px-8 py-2.5 rounded-full hover:bg-[#1d4ed8] transition-colors text-sm uppercase tracking-wider"
                >
                  Book Another Test
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-slate-800 text-xl font-bold mb-4">Patient & Test Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#0f2d5e]" /> Patient Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter patient name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#0f2d5e]" /> Phone Number
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 Contact number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#0f2d5e]" /> Email
                    </label>
                    <input
                      type="email"
                      placeholder="Optional email for reports"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="flex flex-col relative" ref={suggestionsRef}>
                  <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#0f2d5e]" /> Tests / Packages to Book
                  </label>
                  {selectedItems.length > 0 && unmatchedRecommended.length === 0 && (
                    <p className="text-[11px] text-emerald-600 font-semibold mb-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Added from your prescription analysis — remove any you don&apos;t need.
                    </p>
                  )}
                  {unmatchedRecommended.length > 0 && (
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mb-3">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
                        {selectedItems.length > 0
                          ? 'We added what we could match below. '
                          : ''}
                        <strong>{unmatchedRecommended.join(', ')}</strong>{' '}
                        {unmatchedRecommended.length > 1 ? "aren't" : "isn't"} in our online catalog yet — please call{' '}
                        <a href="tel:+919964639639" className="underline font-bold">+91 99646 39639</a> or WhatsApp us to book{' '}
                        {unmatchedRecommended.length > 1 ? 'them' : 'it'} directly.
                      </p>
                    </div>
                  )}
                  {selectedItems.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedItems.map((item) => (
                        <span
                          key={item.id}
                          className={`inline-flex items-center gap-1.5 text-xs font-bold pl-3 pr-2 py-1.5 rounded-full ${
                            !item.home_collection_available && formData.collectionType === 'home'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-[#dbeafe] text-[#0f2d5e]'
                          }`}
                        >
                          {item.name}
                          {!item.home_collection_available && (
                            <span title="Center visit only"><Building2 className="w-3 h-3" /></span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="hover:bg-white/50 rounded-full p-0.5 transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder={catalogLoading ? 'Loading catalog\u2026' : 'Search our test/package catalog, e.g. Complete Blood Count'}
                    value={testInput}
                    disabled={catalogLoading}
                    onChange={(e) => { setTestInput(e.target.value); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50 disabled:opacity-60"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-150 rounded-xl shadow-xl z-20 max-h-64 overflow-y-auto">
                      {suggestions.map((s) => (
                        <button
                          type="button"
                          key={s.id}
                          onClick={() => addItem(s)}
                          className="w-full text-left px-4 py-2.5 hover:bg-blue-50 flex items-center justify-between gap-3 border-b border-gray-50 last:border-0"
                        >
                          <span className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">{s.name}</span>
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{s.kind === 'package' ? 'Health Package' : 'Lab Test'}{!s.home_collection_available ? ' \u00b7 Center visit only' : ''}</span>
                          </span>
                          {s.price != null && <span className="text-xs font-extrabold text-[#2563eb]">₹{s.price}</span>}
                        </button>
                      ))}
                    </div>
                  )}
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">
                    Only tests/packages from our master catalog can be booked — start typing to search and select.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Preferred Date */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#0f2d5e]" /> Preferred Date
                    </label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50 text-slate-600"
                    />
                  </div>
                </div>

                {/* Collection Method */}
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-3 uppercase tracking-wider block">Sample Collection Method</label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer border border-gray-150 rounded-xl p-4 flex-1 hover:bg-gray-50/50 transition-colors">
                      <input 
                        type="radio" 
                        name="collectionType" 
                        value="home"
                        checked={formData.collectionType === 'home'}
                        onChange={() => setFormData({...formData, collectionType: 'home'})}
                        className="text-[#2563eb] focus:ring-[#2563eb] mr-3 w-4 h-4"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5"><Home className="w-3.5 h-3.5" /> Home Collection</span>
                        <span className="text-[10px] text-slate-400 font-semibold block">We collect sample from your address</span>
                      </div>
                    </label>
                    
                    <label className="flex items-center cursor-pointer border border-gray-150 rounded-xl p-4 flex-1 hover:bg-gray-50/50 transition-colors">
                      <input 
                        type="radio" 
                        name="collectionType" 
                        value="center"
                        checked={formData.collectionType === 'center'}
                        onChange={() => setFormData({...formData, collectionType: 'center'})}
                        className="text-[#2563eb] focus:ring-[#2563eb] mr-3 w-4 h-4"
                      />
                      <div>
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> Walk-in Lab Center</span>
                        <span className="text-[10px] text-slate-400 font-semibold block">Visit our Kengeri lab in Bengaluru</span>
                      </div>
                    </label>
                  </div>
                  {formData.collectionType === 'home' && centerOnlyItems.length > 0 && (
                    <p className="mt-3 flex items-start gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {centerOnlyItems.map(i => i.name).join(', ')} {centerOnlyItems.length > 1 ? 'are' : 'is'} only available at our lab center, not for home collection. Remove {centerOnlyItems.length > 1 ? 'them' : 'it'} or switch to a center visit.
                    </p>
                  )}
                </div>

                {/* Home Address + Location Confirmation */}
                {formData.collectionType === 'home' && (
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0f2d5e]" /> Home Address
                    </label>

                    <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <p className="text-[11px] text-slate-500 font-semibold">
                          Confirm your current location so we can verify home collection is available at your address.
                        </p>
                        <button
                          type="button"
                          onClick={detectLocation}
                          disabled={locating}
                          className="inline-flex items-center gap-1.5 bg-[#2563eb] text-white text-xs font-bold px-3.5 py-2 rounded-full hover:bg-[#1d4ed8] transition-colors disabled:opacity-60 flex-shrink-0"
                        >
                          {locating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LocateFixed className="w-3.5 h-3.5" />}
                          {locating ? 'Detecting\u2026' : 'Use my current location'}
                        </button>
                      </div>

                      {detectedAddress && (
                        <div className="bg-white border border-blue-100 rounded-lg p-3 flex flex-col gap-2">
                          <p className="text-xs text-slate-600 font-medium">
                            <span className="font-bold text-[#0f2d5e]">Detected: </span>{detectedAddress}
                          </p>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={useDetectedAddress}
                              className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-emerald-700 transition-colors"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Yes, this is correct — use it
                            </button>
                            <button
                              type="button"
                              onClick={() => setDetectedAddress(null)}
                              className="inline-flex items-center gap-1.5 border border-gray-200 text-slate-500 text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors"
                            >
                              No, I&apos;ll enter manually
                            </button>
                          </div>
                        </div>
                      )}
                      {locationError && (
                        <p className="text-[11px] font-semibold text-amber-700">{locationError}</p>
                      )}
                    </div>

                    <textarea 
                      rows={3}
                      required
                      placeholder="Enter full address for sample collection in Bengaluru"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50 resize-none"
                    />
                  </div>
                )}

                {error && (
                  <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>
                )}

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-[#2563eb] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors uppercase tracking-wider text-xs shadow-md mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting…' : 'Submit Booking Request'}
                </button>

                {/* Suggested Health Packages */}
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <h3 className="text-slate-800 text-sm font-extrabold mb-4 uppercase tracking-wider">Suggested Health Packages</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {catalog
                      .filter(item => item.kind === 'package')
                      .filter(item => !selectedItems.some(s => s.id === item.id))
                      .slice(0, 4)
                      .map(pkg => (
                        <div 
                          key={pkg.id} 
                          onClick={() => addItem(pkg)}
                          className="border border-slate-150 rounded-2xl p-4 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200 transition-all cursor-pointer flex justify-between items-center group"
                        >
                          <div className="pr-4 flex-1">
                            <h4 className="font-bold text-slate-800 text-[11px] leading-tight mb-1 group-hover:text-[#2563eb] transition-colors">{pkg.name}</h4>
                            <p className="text-[10px] text-slate-500 line-clamp-1">{pkg.includes}</p>
                            <div className="flex items-center gap-1.5 mt-2">
                              <span className="text-xs font-black text-slate-800">₹{pkg.price}</span>
                              {pkg.old_price && <span className="text-[10px] text-slate-400 line-through">₹{pkg.old_price}</span>}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="text-blue-600 font-extrabold text-[10px] uppercase tracking-wider bg-white border border-blue-100 px-3 py-1.5 rounded-xl shrink-0 shadow-sm group-hover:bg-[#2563eb] group-hover:text-white group-hover:border-blue-600 transition-all cursor-pointer"
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Info Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            {selectedItems.filter(i => i.kind === 'package').map((pkg) => (
              <div key={pkg.id} className="bg-white border border-[#2563eb]/20 rounded-3xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#2563eb] text-white px-3 py-1 rounded-bl-xl text-[10px] font-extrabold uppercase tracking-wider">
                  Selected
                </div>
                <h3 className="font-extrabold text-[#0f2d5e] text-lg mb-2 pr-16">{pkg.name}</h3>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-black text-[#2563eb]">₹{pkg.price}</span>
                  <span className="text-sm text-slate-400 line-through">₹{pkg.old_price}</span>
                </div>
                
                <div className="mb-4">
                  <p className="text-[11px] text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#0f2d5e]" /> {pkg.parameters}
                  </p>
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                    <strong>Includes:</strong> {pkg.includes}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="bg-gradient-to-br from-[#0f2d5e] to-[#0e4253] text-white rounded-3xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4">Why Book with QXL?</h3>
              <ul className="space-y-4 text-xs font-semibold">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">✓</span>
                  <span>Advanced NABL accredited standards with expert validation</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">✓</span>
                  <span>100% sterile vacuum containers for collection</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">✓</span>
                  <span>Cold-chain logistics ensures sample integrity</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white">✓</span>
                  <span>Secure digital PDF reports directly on WhatsApp</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.01)] text-center">
              <h3 className="font-bold text-slate-800 text-sm mb-2">Need Instant Help?</h3>
              <p className="text-slate-500 text-xs mb-4 font-semibold">Speak directly with our test booking coordinators</p>
              <a href="tel:+919964639639" className="inline-flex items-center gap-2 bg-[#dbeafe] text-[#2563eb] font-extrabold px-6 py-2.5 rounded-full text-xs hover:bg-[#d5e8ed] transition-colors">
                <Phone className="w-4 h-4" /> Call +91 9964 639639
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

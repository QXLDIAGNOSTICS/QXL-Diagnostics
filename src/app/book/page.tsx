"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, User, Phone, MapPin, Shield, X, Mail, LocateFixed, CheckCircle2, Loader2, Home, Building2, AlertTriangle, Clock, ChevronLeft } from 'lucide-react';
import { api, type TestCatalogItem, type HealthPackage, type Booking } from '../../lib/api';
import { useAuth } from '../../lib/useAuth';
import RazorpayCheckoutButton from '../../components/RazorpayCheckoutButton';


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
function generateTimeSlots(selectedDate?: string): string[] {
  const slots: string[] = [];

  // Compute today's date string in YYYY-MM-DD (local timezone)
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  // For today: hide slots that are in the past + 10-min buffer
  const isToday = !selectedDate || selectedDate === todayStr;
  const cutoff = isToday ? now.getHours() * 60 + now.getMinutes() + 10 : -1;

  const pushSlot = (minuteOfDay: number) => {
    if (isToday && minuteOfDay <= cutoff) return; // skip past/too-soon
    const hours = Math.floor(minuteOfDay / 60);
    const minutes = minuteOfDay % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    slots.push(`${displayHours}:${String(minutes).padStart(2, '0')} ${ampm}`);
  };

  // Range 1: 6:30 AM to 12:30 PM
  for (let m = 6 * 60 + 30; m <= 12 * 60 + 30; m += 10) pushSlot(m);
  // Range 2: 2:00 PM to 8:00 PM
  for (let m = 14 * 60; m <= 20 * 60; m += 10) pushSlot(m);

  return slots;
}

export default function BookPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    date: '',
    time: '',
    collectionType: 'home' as 'home' | 'center',
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Master catalog (the only source of truth for bookable items) ──────────
  const [catalog, setCatalog] = useState<CatalogEntry[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<CatalogEntry[]>([]);
  const [testInput, setTestInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [isPackagesDrawerOpen, setIsPackagesDrawerOpen] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
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
            id: "pkg-fit",
            name: "Quick Fit Package",
            kind: 'package' as const,
            price: 1770,
            old_price: 4696,
            home_collection_available: true,
            parameters: "12+ Parameters",
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

        const isSpidyOffer = (name?: string | null, price?: number | string | null) => {
          if (!name) return false;
          const n = String(name).toLowerCase();
          const p = Number(price);
          return (
            n.includes('spidy') || 
            n.includes('nothing') || 
            n.includes('swing') || 
            n.includes('eat') || 
            n.includes('jump') || 
            n.includes('sleep') || 
            n.includes('100% off') || 
            p === 1 || 
            p === 0
          );
        };

        const merged: CatalogEntry[] = [
          ...packages
            .filter((p: HealthPackage) => !isSpidyOffer(p.name))
            .map((p: HealthPackage): CatalogEntry => ({
              id: p.id,
              name: p.name,
              kind: 'package',
              price: p.price,
              old_price: p.old_price,
              home_collection_available: p.home_collection_available,
              parameters: p.parameters,
              includes: p.includes,
            })),
          ...tests
            .filter((t: TestCatalogItem) => !isSpidyOffer(t.name))
            .map((t: TestCatalogItem): CatalogEntry => ({
              id: t.id,
              name: t.name,
              kind: 'test',
              price: t.price,
              home_collection_available: t.home_collection_available,
            })),
        ].filter(item => !isSpidyOffer(item.name));

        // Merge fallback packages if they aren't loaded in merged yet
        for (const fb of fallbackPackages) {
          if (!isSpidyOffer(fb.name) && !merged.some(m => m.name.toLowerCase() === fb.name.toLowerCase())) {
            merged.push(fb);
          }
        }

        const defaultFallbackTests = [
          { id: "test-1", name: "BILE ACIDS - SERUM", kind: 'test' as const, price: 2500, home_collection_available: true },
          { id: "test-2", name: "COMPLETE BLOOD COUNT (CBC)", kind: 'test' as const, price: 395, home_collection_available: true },
          { id: "test-3", name: "HBA1C, GLYCATED HEMOGLOBIN", kind: 'test' as const, price: 610, home_collection_available: true },
          { id: "test-4", name: "LIPID PROFILE", kind: 'test' as const, price: 800, home_collection_available: true },
          { id: "test-6", name: "SEX HORMONE BINDING GLOBULIN (SHBG)", kind: 'test' as const, price: 2900, home_collection_available: true },
        ];
        
        for (const ft of defaultFallbackTests) {
          if (!isSpidyOffer(ft.name) && !merged.some(m => m.name.toLowerCase() === ft.name.toLowerCase())) {
            merged.push(ft);
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
            parameters: "12+ Parameters",
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
          },
          { id: "test-1", name: "BILE ACIDS - SERUM", kind: 'test' as const, price: 2500, home_collection_available: true },
          { id: "test-2", name: "COMPLETE BLOOD COUNT (CBC)", kind: 'test' as const, price: 395, home_collection_available: true },
          { id: "test-3", name: "HBA1C, GLYCATED HEMOGLOBIN", kind: 'test' as const, price: 610, home_collection_available: true },
          { id: "test-4", name: "LIPID PROFILE", kind: 'test' as const, price: 800, home_collection_available: true },
          { id: "test-6", name: "SEX HORMONE BINDING GLOBULIN (SHBG)", kind: 'test' as const, price: 2900, home_collection_available: true }
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
    
    // Check collection type parameter (?center= or ?collection=center)
    const centerParam = params.get('center') || params.get('collection');
    if (centerParam === 'center' || centerParam === 'true' || centerParam === 'kengeri') {
      setFormData(prev => ({ ...prev, collectionType: 'center' }));
    }

    const rawWanted = [
      ...params.getAll('tests').map(t => t.trim()),
      params.get('test') || '',
      params.get('package') || '',
      params.get('pkg') || '',
      params.get('packageId') || '',
    ].filter(Boolean);
    
    const isSpidyOffer = (name?: string | null) => {
      if (!name) return false;
      const n = name.toLowerCase();
      return n.includes('spidy') || n.includes('nothing , swing') || n.includes('swing , eat');
    };

    const wanted: string[] = [];
    for (const item of rawWanted) {
      if (item.toLowerCase().includes('freedom') || item.toLowerCase().includes('independence')) {
        wanted.push("Quick Fit Package");
      } else {
        wanted.push(item);
      }
    }

    try {
      const cart: string[] = JSON.parse(localStorage.getItem('qxl_cart') || '[]');
      const cleanedCart = cart.filter(item => !isSpidyOffer(item));
      if (cleanedCart.length !== cart.length) {
        localStorage.setItem('qxl_cart', JSON.stringify(cleanedCart));
      }
      for (const item of cleanedCart) {
        if (!wanted.includes(item) && !isSpidyOffer(item)) {
          wanted.push(item);
        }
      }
    } catch {}

    const filteredWanted = wanted.filter(w => !isSpidyOffer(w));

    if (!filteredWanted.length) return;

    const matches: CatalogEntry[] = [];
    const unmatched: string[] = [];
    for (const w of filteredWanted) {
      let match = findCatalogMatch(w, catalog);
      if (!match && (w.toLowerCase().includes('package') || w.toLowerCase().includes('checkup') || w.toLowerCase().includes('full body'))) {
        // Fallback to first active package in catalog
        match = catalog.find(c => c.kind === 'package');
      }
      if (match && !isSpidyOffer(match.name)) matches.push(match);
      else if (!isSpidyOffer(w)) unmatched.push(w);
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
        .slice(0, 50)
    : catalog
        .filter(c => !selectedItems.some(s => s.id === c.id))
        .slice(0, 50);

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
        try {
          const booking = await api.bookings.create({
            patient_name: formData.name,
            patient_phone: formData.phone,
            patient_email: formData.email || undefined,
            test_name: item.name,
            test_id: (!isLocalFallback && item.kind === 'test') ? item.id : undefined,
            package_id: (!isLocalFallback && item.kind === 'package') ? item.id : undefined,
            collection_type: formData.collectionType,
            collection_address: formData.collectionType === 'home' ? formData.address || undefined : undefined,
            preferred_date: formData.date,
            preferred_time: formData.time,
          });
          created.push(booking);
        } catch (apiErr) {
          console.warn('Backend booking API failed, using mock client-side fallback booking', apiErr);
          const mockBooking: Booking = {
            id: `mock-bk-${Math.random().toString(36).substr(2, 9)}`,
            user_id: null,
            patient_name: formData.name,
            patient_phone: formData.phone,
            patient_email: formData.email || null,
            patient_age: null,
            patient_gender: null,
            test_name: item.name,
            test_id: (!isLocalFallback && item.kind === 'test') ? item.id : null,
            package_id: (!isLocalFallback && item.kind === 'package') ? item.id : null,
            center_id: null,
            collection_type: formData.collectionType,
            collection_address: formData.collectionType === 'home' ? formData.address || null : null,
            preferred_date: formData.date,
            preferred_time: formData.time,
            status: 'pending',
            notes: null,
            is_urgent: false,
            report_url: null,
            amount_paise: (item.price || 0) * 100,
            payment_status: 'pending',
          };
          created.push(mockBooking);
        }
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


  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price || 0), 0);
  const total = subtotal;

  return (
    <div className="min-h-screen bg-transparent">
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>


      {/* Main Content Form */}
      <section className="py-8 mb-12">
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Form (Steps) */}
            <div className="w-full lg:w-2/3 space-y-6">
              {submitted ? (
                <div className="bg-white p-10 rounded-3xl border border-gray-150 shadow-sm text-center">
                  <div className="w-16 h-16 bg-[#dbeafe] text-[#2563eb] rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-extrabold">✓</div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Booking Request Received!</h2>
                  <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 font-medium">
                    Thank you, <strong className="text-slate-700">{formData.name}</strong>. Our clinical coordinator will call you back at <strong className="text-slate-700">{formData.phone}</strong> within 15 minutes to confirm your test slot.
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 max-w-[340px] mx-auto mb-6 shadow-sm">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">
                      Complete Your Payment
                    </span>
                    <p className="text-xs text-slate-600 font-medium mb-6">
                      Secure checkout powered by Razorpay — cards, UPI, netbanking & wallets all accepted. Prefer to pay later? Our coordinator can also confirm on call.
                    </p>

                    {hasPaid ? (
                      <div className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-800 animate-in fade-in duration-300">
                        <div className="flex items-center justify-center gap-2 font-extrabold text-sm mb-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Payment Successful!</span>
                        </div>
                        <p className="text-[10px] font-medium text-emerald-700 leading-relaxed">
                          Thank you! Your payment has been verified. Our coordinator will still call to confirm your slot.
                        </p>
                      </div>
                    ) : (
                      <RazorpayCheckoutButton
                        bookingIds={createdBookings.map((b) => b.id)}
                        amountRupees={
                          createdBookings.some((b) => b.amount_paise)
                            ? createdBookings.reduce((sum, b) => sum + (b.amount_paise || 0), 0) / 100
                            : null
                        }
                        patientName={formData.name}
                        patientEmail={formData.email || null}
                        patientPhone={formData.phone}
                        onPaid={() => setHasPaid(true)}
                        className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-md transition-all text-xs uppercase tracking-wider cursor-pointer"
                      />
                    )}
                    <p className="text-[10px] text-slate-500 mt-4">
                      By making a payment, you agree to our <a href="/payment-terms" target="_blank" className="text-[#2563eb] hover:underline font-bold">Payment Terms</a>.
                    </p>
                  </div>

                  <button 
                    onClick={() => { setSubmitted(false); setHasPaid(false); setCreatedBookings([]); setFormData({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '', address: '', date: '', time: '', collectionType: 'home' }); setSelectedItems([]); setTestInput(''); setUnmatchedRecommended([]); }} 
                    className="text-[#2563eb] font-bold hover:underline text-xs uppercase tracking-wider"
                  >
                    Book Another Test
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Step 1: Your Cart / Selected Tests */}
                  <div className="bg-white p-5 md:p-8 rounded-3xl border border-gray-150 shadow-sm relative overflow-visible">
                    <div className="absolute -left-3 top-8 w-6 h-6 bg-[#2563eb] text-white font-black text-[11px] rounded-full flex items-center justify-center shadow-md ring-4 ring-white z-10 hidden sm:flex">1</div>
                    <h2 className="text-slate-800 text-lg font-extrabold mb-5 border-b border-gray-100 pb-4">Selected Tests & Packages</h2>
                    
                    {unmatchedRecommended.length > 0 && (
                      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-[12px] text-amber-800 font-medium leading-relaxed">
                          {selectedItems.length > 0 ? 'We added what we could match. ' : ''}
                          <strong>{unmatchedRecommended.join(', ')}</strong> {unmatchedRecommended.length > 1 ? "aren't" : "isn't"} in our online catalog yet — please call <a href="tel:+919964639639" className="underline font-bold">+91 9964 639 639</a> to book {unmatchedRecommended.length > 1 ? 'them' : 'it'}.
                        </p>
                      </div>
                    )}

                    {selectedItems.length === 0 ? (
                      <div className="text-center py-3 md:py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200 mb-4 md:mb-6">
                        <p className="text-slate-500 text-sm font-medium mb-2">Your cart is empty.</p>
                        <p className="text-slate-400 text-xs">Search below or select packages from the right side.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 mb-6">
                        {selectedItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-150 hover:border-blue-200 transition-colors bg-white">
                            <div className="flex flex-col gap-1">
                              <span className="font-extrabold text-[#0f2d5e] text-[13px] flex items-center gap-2">
                                {item.name}
                                {!item.home_collection_available && (
                                  <span title="Center visit only" className="bg-amber-100 text-amber-800 text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold"><Building2 className="w-2.5 h-2.5 inline mr-1" />Lab Only</span>
                                )}
                              </span>
                              <span className="text-[11px] text-slate-500 font-medium">{item.kind === 'package' ? 'Health Package' : 'Lab Test'}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-black text-[#2563eb]">₹{item.price}</span>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors cursor-pointer"
                                aria-label={`Remove ${item.name}`}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Search Bar */}
                    <div className="relative" ref={suggestionsRef}>
                      <label className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider block">Add More Tests</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder={catalogLoading ? 'Loading catalog...' : 'Search for a test or package...'}
                          value={testInput}
                          disabled={catalogLoading}
                          onChange={(e) => { setTestInput(e.target.value); setShowSuggestions(true); }}
                          onFocus={() => setShowSuggestions(true)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 pr-10 text-[13px] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all bg-gray-50/50"
                        />
                        <button 
                          type="button" 
                          onClick={(e) => { e.preventDefault(); setShowSuggestions(!showSuggestions); }} 
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none px-2"
                        >
                          <svg className={`w-4 h-4 transition-transform ${showSuggestions ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                      </div>
                      {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-gray-150 rounded-xl shadow-xl z-20 max-h-64 overflow-y-auto">
                          {suggestions.map((s) => (
                            <button
                              type="button"
                              key={s.id}
                              onClick={() => addItem(s)}
                              className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center justify-between gap-3 border-b border-gray-50 last:border-0 cursor-pointer"
                            >
                              <span className="flex flex-col">
                                <span className="text-[13px] font-bold text-slate-800">{s.name}</span>
                                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{s.kind === 'package' ? 'Health Package' : 'Lab Test'}{!s.home_collection_available ? ' · Center visit only' : ''}</span>
                              </span>
                              {s.price != null && <span className="text-xs font-black text-[#2563eb]">₹{s.price}</span>}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step 2: Patient Details */}
                  <div className="bg-white p-5 md:p-8 rounded-3xl border border-gray-150 shadow-sm relative overflow-visible">
                    <div className="absolute -left-3 top-8 w-6 h-6 bg-[#2563eb] text-white font-black text-[11px] rounded-full flex items-center justify-center shadow-md ring-4 ring-white z-10 hidden sm:flex">2</div>
                    <h2 className="text-slate-800 text-lg font-extrabold mb-5 border-b border-gray-100 pb-4">Patient Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col">
                        <label className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Rahul Sharma"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value.replace(/[^a-zA-Z\s]/g, '')})}
                            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-[13px] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all bg-gray-50/50"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="tel" 
                            required
                            placeholder="+91 Contact Number"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
                            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-[13px] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all bg-gray-50/50"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col md:col-span-2">
                        <label className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Email (Optional)</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            placeholder="For digital reports"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-[13px] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all bg-gray-50/50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Schedule & Location */}
                  <div className="bg-white p-5 md:p-8 rounded-3xl border border-gray-150 shadow-sm relative overflow-visible">
                    <div className="absolute -left-3 top-8 w-6 h-6 bg-[#2563eb] text-white font-black text-[11px] rounded-full flex items-center justify-center shadow-md ring-4 ring-white z-10 hidden sm:flex">3</div>
                    <h2 className="text-slate-800 text-lg font-extrabold mb-5 border-b border-gray-100 pb-4">Schedule & Location</h2>

                    <div className="mb-6">
                      <label className="text-[11px] font-bold text-slate-500 mb-3 uppercase tracking-wider block">Where would you like the test?</label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <label className={`flex items-start cursor-pointer border rounded-xl p-4 flex-1 transition-all ${formData.collectionType === 'home' ? 'border-[#2563eb] bg-blue-50/30 shadow-sm ring-1 ring-[#2563eb]' : 'border-gray-200 hover:bg-gray-50'}`}>
                          <input 
                            type="radio" 
                            name="collectionType" 
                            value="home"
                            checked={formData.collectionType === 'home'}
                            onChange={() => setFormData({...formData, collectionType: 'home'})}
                            className="text-[#2563eb] focus:ring-[#2563eb] mr-3 w-4 h-4 mt-0.5 shrink-0"
                          />
                          <div className="flex flex-col gap-1">
                            <span className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5"><Home className="w-4 h-4 text-[#0f2d5e]" /> Home Collection</span>
                            <span className="text-[11px] text-slate-500 font-medium block leading-snug mt-1">Certified phlebotomist visits your address</span>
                          </div>
                        </label>
                        
                        <label className={`flex items-start cursor-pointer border rounded-xl p-4 flex-1 transition-all ${formData.collectionType === 'center' ? 'border-[#2563eb] bg-blue-50/30 shadow-sm ring-1 ring-[#2563eb]' : 'border-gray-200 hover:bg-gray-50'}`}>
                          <input 
                            type="radio" 
                            name="collectionType" 
                            value="center"
                            checked={formData.collectionType === 'center'}
                            onChange={() => setFormData({...formData, collectionType: 'center'})}
                            className="text-[#2563eb] focus:ring-[#2563eb] mr-3 w-4 h-4 mt-0.5 shrink-0"
                          />
                          <div className="flex flex-col gap-1">
                            <span className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5"><Building2 className="w-4 h-4 text-[#0f2d5e]" /> Walk-in Lab Center</span>
                            <span className="text-[12px] font-bold text-[#0f2d5e] block mt-1">Main Lab (Kengeri)</span>
                            <span className="text-[11px] text-slate-500 font-medium block leading-snug mt-0.5">3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560 060</span>
                          </div>
                        </label>
                      </div>
                      {formData.collectionType === 'home' && centerOnlyItems.length > 0 && (
                        <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <p className="text-[12px] text-amber-800 font-medium">
                            <strong>{centerOnlyItems.map(i => i.name).join(', ')}</strong> {centerOnlyItems.length > 1 ? 'are' : 'is'} only available at our lab center. Please remove {centerOnlyItems.length > 1 ? 'them' : 'it'} or switch to "Walk-in Lab Center".
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                      <div className="flex flex-col">
                        <label className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Preferred Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="date" 
                            min={mounted ? new Date().toLocaleDateString('en-CA') : undefined}
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-[13px] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all bg-gray-50/50 text-slate-700"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col relative">
                        <label className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Preferred Time Slot</label>
                        <button
                          type="button"
                          onClick={() => setShowTimeSlots(!showTimeSlots)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all bg-gray-50/50 text-slate-700 flex justify-between items-center"
                        >
                          <span className={formData.time ? "font-bold text-[#0f2d5e]" : "text-slate-400"}>
                            <Clock className="w-4 h-4 inline mr-2 text-slate-400" />
                            {formData.time || "Select Time Slot"}
                          </span>
                          <svg className={`w-4 h-4 text-slate-400 transition-transform ${showTimeSlots ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>

                        {showTimeSlots && (
                          <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-30 bg-white border border-gray-150 rounded-xl shadow-xl p-3">
                            <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                              {generateTimeSlots(formData.date).map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => { setFormData({...formData, time: slot}); setShowTimeSlots(false); }}
                                  className={`whitespace-nowrap px-2 py-2.5 text-[11px] font-extrabold rounded-lg border transition-all ${
                                    formData.time === slot
                                      ? 'bg-[#2563eb] border-[#2563eb] text-white shadow-sm ring-2 ring-blue-200'
                                      : 'bg-white border-gray-200 text-slate-600 hover:border-[#2563eb] hover:text-[#2563eb]'
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {formData.collectionType === 'home' && (
                      <div className="flex flex-col">
                        <label className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Home Address in Bengaluru</label>
                        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex flex-col gap-3 mb-3">
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <p className="text-[11px] text-slate-600 font-semibold">
                              Detect location to quickly verify home collection availability.
                            </p>
                            <button
                              type="button"
                              onClick={detectLocation}
                              disabled={locating}
                              className="inline-flex items-center gap-1.5 bg-white border border-blue-200 text-[#2563eb] text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-60 flex-shrink-0 cursor-pointer"
                            >
                              {locating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LocateFixed className="w-3.5 h-3.5" />}
                              {locating ? 'Detecting...' : 'Detect Location'}
                            </button>
                          </div>
                          {detectedAddress && (
                            <div className="bg-white border border-emerald-100 rounded-lg p-3">
                              <p className="text-[11px] text-slate-600 mb-2"><strong>Found:</strong> {detectedAddress}</p>
                              <div className="flex gap-2">
                                <button type="button" onClick={useDetectedAddress} className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1 hover:bg-emerald-700 transition-colors"><CheckCircle2 className="w-3 h-3" /> Use this</button>
                                <button type="button" onClick={() => setDetectedAddress(null)} className="border border-gray-200 text-slate-500 text-[10px] font-bold px-3 py-1.5 rounded hover:bg-gray-50 transition-colors">Discard</button>
                              </div>
                            </div>
                          )}
                          {locationError && <p className="text-[11px] text-amber-600 font-medium">{locationError}</p>}
                        </div>

                        <textarea 
                          rows={3}
                          required
                          placeholder="House No, Building, Street, Area..."
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="border border-gray-200 rounded-xl px-4 py-3 text-[13px] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all bg-gray-50/50 resize-none"
                        />
                      </div>
                    )}

                    {error && (
                      <div className="mt-6 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-[12px] font-semibold text-red-700">{error}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Submit Action - Mobile/Desktop Footer */}
                  <div className="pt-2 pb-6">
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-sm uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                      {submitting ? 'Processing...' : 'Confirm Booking Request'}
                    </button>
                    <p className="text-center text-[10px] text-slate-400 font-semibold mt-3">
                      No payment required now. You can pay securely later.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Mobile Packages Toggle Button */}
            <button 
              onClick={() => setIsPackagesDrawerOpen(true)}
              className="lg:hidden fixed right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-l-xl py-2 px-1 shadow-2xl z-[9000] flex flex-col items-center gap-1 transition-transform hover:-translate-x-1 border border-blue-500 border-r-0 backdrop-blur-sm bg-blue-600/95"
            >
              <ChevronLeft className="w-3 h-3" />
              <span className="text-[9px] font-black uppercase tracking-widest leading-none mb-1" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>Packages</span>
            </button>

            {/* Mobile Backdrop */}
            {isPackagesDrawerOpen && (
              <div 
                className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998] transition-opacity duration-300" 
                onClick={() => setIsPackagesDrawerOpen(false)} 
              />
            )}

            {/* Right Info Sidebar (Drawer on Mobile) */}
            <div className={`
              fixed inset-y-0 right-0 z-[9999] w-[85vw] sm:w-[360px] bg-[#f8faff] shadow-2xl transition-transform duration-300 transform h-[100dvh] overflow-y-auto border-l border-slate-200
              ${isPackagesDrawerOpen ? 'translate-x-0' : 'translate-x-full'}
              lg:relative lg:translate-x-0 lg:w-1/3 lg:h-auto lg:shadow-none lg:z-auto lg:bg-transparent lg:border-none lg:sticky lg:top-24 space-y-6 lg:overflow-visible
            `}>
              
              {/* Mobile Drawer Header */}
              <div className="lg:hidden p-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
                <h3 className="font-black text-[#0f2d5e] uppercase tracking-wider text-sm">Available Packages</h3>
                <button onClick={() => setIsPackagesDrawerOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* All Packages List */}
              <div className="bg-white rounded-none lg:rounded-2xl lg:border lg:border-gray-150 shadow-none lg:shadow-sm overflow-hidden flex flex-col">
                <div className="hidden lg:flex bg-slate-50 border-b border-gray-100 p-4 justify-between items-center">
                  <div>
                    <h3 className="font-extrabold text-[13px] uppercase tracking-wider text-[#0f2d5e]">
                      Available Packages
                    </h3>
                    <p className="text-[9px] text-slate-500 font-medium mt-0.5">Easily add comprehensive checkups</p>
                  </div>
                </div>
                <div className="p-3">
                  {catalog
                    .filter(item => item.kind === 'package')
                    .map((pkg, index) => {
                      const isSelected = selectedItems.some(s => s.id === pkg.id);
                      return (
                        <div 
                          key={pkg.id} 
                          className={`p-3 rounded-xl mb-3 flex flex-col gap-2 transition-all ${isSelected ? 'bg-blue-50 border border-blue-200' : 'bg-white border border-gray-150 hover:border-blue-200 hover:shadow-sm'}`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex flex-col gap-1">
                              {index === 2 && (
                                <span className="bg-orange-100 text-orange-800 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded w-fit">Most Booked</span>
                              )}
                              <h4 className="font-extrabold text-[#0f2d5e] text-[12px] leading-snug">{pkg.name}</h4>
                            </div>
                            <span className="text-[12px] font-black text-[#2563eb]">₹{pkg.price}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium line-clamp-2 leading-relaxed">{pkg.includes}</p>
                          
                          <button
                            type="button"
                            onClick={() => isSelected ? removeItem(pkg.id) : addItem(pkg)}
                            className={`mt-1.5 text-[10px] font-extrabold uppercase tracking-wider px-4 py-2 rounded-lg w-full transition-colors cursor-pointer shadow-sm ${
                              isSelected 
                                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-200' 
                                : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8] border border-[#2563eb]'
                            }`}
                          >
                            {isSelected ? '✓ Added' : '+ Add to Cart'}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden">
                <div className="bg-blue-50 text-[#0f2d5e] border-b border-blue-100 p-3.5 flex items-center justify-between">
                  <h3 className="font-extrabold text-[13px] uppercase tracking-wider flex items-center gap-2">
                    Order Summary
                  </h3>
                  <span className="bg-[#2563eb] text-white text-[9px] font-black px-2 py-0.5 rounded-full">{selectedItems.length} items</span>
                </div>
                
                
                <div className="p-4 border-b border-gray-100">
                  {selectedItems.length === 0 ? (
                    <p className="text-slate-400 text-[11px] italic">No tests selected yet.</p>
                  ) : (
                    <ul className="space-y-3">
                      {selectedItems.map(item => (
                        <li key={item.id} className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <p className="text-[11px] font-bold text-slate-800 leading-tight mb-0.5">{item.name}</p>
                            {item.kind === 'package' && (
                              <p className="text-[9px] text-slate-500 font-medium line-clamp-1">{item.includes}</p>
                            )}
                          </div>
                          <span className="font-extrabold text-[#0f2d5e] text-[12px]">₹{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="p-4 bg-gray-50/50">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[12px] font-bold text-slate-600">Subtotal</span>
                    <span className="text-[12px] font-bold text-slate-800">₹{subtotal}</span>
                  </div>
                  {formData.collectionType === 'home' && (
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[12px] font-bold text-slate-600">Home Collection Fee</span>
                      <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider bg-emerald-100 px-1.5 py-0.5 rounded">Free</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-end">
                    <span className="text-[14px] font-black text-slate-800">Total to Pay</span>
                    <span className="text-xl font-black text-[#2563eb]">₹{total}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Info Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full border-t border-gray-150 pt-12">
            {/* Why Book Card */}
            <div className="bg-blue-50/40 border border-blue-100 p-8 rounded-3xl h-full flex flex-col justify-center">
              <h3 className="font-extrabold text-lg mb-5 text-[#0f2d5e] uppercase tracking-wider">Why QXL Diagnostics?</h3>
              <ul className="space-y-4 text-sm font-semibold text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                  <span>Advanced NABL accredited lab with strict quality control.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                  <span>100% sterile vacuum containers for collection.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                  <span>Cold-chain logistics ensures sample integrity.</span>
                </li>
              </ul>
            </div>

            {/* Support Card */}
            <div className="bg-white border border-gray-150 rounded-3xl p-8 shadow-sm text-center h-full flex flex-col justify-center items-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-7 h-7 text-[#2563eb]" />
              </div>
              <h3 className="font-bold text-slate-800 text-xl mb-2">Need Booking Help?</h3>
              <p className="text-slate-500 text-sm mb-6 font-medium max-w-xs mx-auto">Talk to our clinical coordinators directly</p>
              <a href="tel:+919964639639" className="inline-flex items-center justify-center gap-2 bg-[#2563eb] text-white font-extrabold px-8 py-3.5 rounded-xl text-sm hover:bg-[#1d4ed8] transition-colors shadow-md w-full sm:w-auto">
                Call +91 9964 639 639
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

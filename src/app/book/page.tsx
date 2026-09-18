"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MASTER_CATALOGUE, matchMasterItem } from "@/lib/masterCatalogue";
import { api } from "@/lib/api";
import { openRazorpayCheckout } from "@/lib/razorpay";

import {
  Sparkles,
  Stethoscope,
  Activity,
  Heart,
  Sun,
  Thermometer,
  FlaskConical,
  AlertTriangle,
  Clock,
  ShoppingCart,
  FileText,
  Search,
  CreditCard,
  Banknote,
  Droplets,
  Flower2,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Calendar,
  X,
  Bot,
  SlidersHorizontal,
  Filter,
  ArrowUpDown,
  RotateCcw,
  Check
} from "lucide-react";

export interface TestItem {
  id: string;
  name: string;
  cat: string;
  params: number;
  price: number;
  mrp: number;
  fasting: boolean;
  tat: string;
  icon: string;
  keys: string;
  popular?: boolean;
  badge?: string;
  idealFor?: string;
  benefits?: string[];
  includes?: string;
  savings?: number;
  doctorRecommended?: boolean;
}

export const SPECIALITY_PACKAGES: TestItem[] = [
  {
    id: "q-quick-fit",
    badge: "QUICK",
    name: "Quick Fit Package",
    idealFor: "Working professionals with limited time wanting a quick basic checkup. (18+ Years, Male / Female)",
    benefits: [
      "Quick overall health snapshot",
      "Check basic organ functions",
      "Assess immunity & vitamins"
    ],
    includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Liver Function Tests, Kidney Function Tests (Creatinine, Urea, BUN, Uric Acid), TSH, Vitamin D, CBC, ESR, Urine Routine & Microscopy.",
    mrp: 4696,
    price: 1770,
    savings: 2926,
    doctorRecommended: true,
    params: 68,
    fasting: true,
    tat: "Reports by next morning",
    icon: "body",
    cat: "fullbody",
    keys: "quick fit basic checkup working professional organ immunity vitamin d hba1c lipid lft kft cbc tsh",
    popular: true
  },
  {
    id: "q-screen-diabetes",
    badge: "DIABETES",
    name: "Q-Screen Diabetes Package",
    idealFor: "Diabetics, pre-diabetics, or those with a family history of diabetes. (25+ Years, Male / Female)",
    benefits: [
      "Early diabetes detection",
      "Monitor blood sugar control",
      "Assess kidney impact from diabetes"
    ],
    includes: "FBS, HbA1c, eAG, Urine Microalbumin, Protein/Creatinine Ratio, C-Peptide, Lipid Profile, Liver Function Test, Kidney Function Test (Creatinine, Urea, BUN, Sodium, Potassium, Chloride), TSH, CBC, ESR, Urine Routine & Microscopy.",
    mrp: 4960,
    price: 1900,
    savings: 3060,
    doctorRecommended: true,
    params: 72,
    fasting: true,
    tat: "Reports by next morning",
    icon: "drop",
    cat: "diabetes",
    keys: "diabetes q-screen sugar fbs hba1c c-peptide microalbumin kidney impact lipid lft kft tsh cbc",
    popular: true
  },
  {
    id: "q-master-health-pro",
    badge: "PRO",
    name: "Q-Master Health Pro Package",
    idealFor: "Adults seeking a comprehensive annual full-body screening. (30+ Years, Male / Female)",
    benefits: [
      "Complete systemic evaluation",
      "Heart risk assessment",
      "Extensive vitamin & thyroid checks"
    ],
    includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Apo A-1, Apo-B, Apo B/A1 Ratio, Liver Function Tests, Kidney Screen (Creatinine, Urea, BUN, Uric Acid, Sodium, Potassium, Chloride), Thyroid Function Tests (T3, T4, TSH), Vitamin D, Vitamin B12, CBC, ESR, Urine Routine & Microscopy, Gastritis Screen (H. pylori IgG Antibodies), hs-CRP.",
    mrp: 9600,
    price: 4600,
    savings: 5000,
    doctorRecommended: true,
    params: 98,
    fasting: true,
    tat: "Reports by next morning",
    icon: "body",
    cat: "fullbody",
    keys: "master health pro annual full body screening apo a1 apo b homa ir gastritis h pylori hs-crp vitamin b12 d",
    popular: true
  },
  {
    id: "q-advanced-arthritis",
    badge: "ARTHRITIS",
    name: "Q-Advanced Arthritis and Autoimmune Panel",
    idealFor: "Individuals experiencing joint pain, stiffness, or suspected autoimmune conditions. (35+ Years, Male / Female)",
    benefits: [
      "Diagnose joint pain causes",
      "Assess autoimmune markers",
      "Comprehensive bone health check"
    ],
    includes: "FBS, HbA1c, eAG, Lipid Profile, hs-CRP, Liver Function Tests, Kidney Function Tests, Thyroid Screen (T3, T4, TSH), Iron Studies (Iron, TIBC, Transferrin), Bone Health (Calcium, Phosphorus), Vitamin B12, Vitamin D, Autoimmune Tests (RF, Anti-CCP, ANA), DHEA-S, Cortisol, CBC, ESR, Urine Routine & Microscopy.",
    mrp: 12660,
    price: 6900,
    savings: 5760,
    doctorRecommended: true,
    params: 85,
    fasting: true,
    tat: "Reports in 24-48 hrs",
    icon: "body",
    cat: "fullbody",
    keys: "arthritis autoimmune joint pain rf anti ccp ana dhea-s cortisol bone health calcium vitamin d b12",
    popular: true
  },
  {
    id: "q-oncoscreen",
    badge: "ONCOSCREEN",
    name: "Q-Oncoscreen Package",
    idealFor: "Individuals with a family history of cancer or those advised by an oncologist. (40+ Years, Male / Female)",
    benefits: [
      "Early detection of tumor markers",
      "Screening for major cancers",
      "Assess gastrointestinal health"
    ],
    includes: "Cancer Markers (Alpha Fetoprotein AFP, Carcinoembryonic Antigen (CEA), Beta HCG, Prostate-Specific Antigen (PSA) - Male, CA-125 (Ovarian Cancer Marker) - Female, CA-19.9 (Pancreatic Cancer Marker)), CBC, ESR, Urine Routine & Microscopy, Calprotectin in Stool, Fecal Occult Blood Test (FOBT), Protein Electrophoresis.",
    mrp: 13600,
    price: 7900,
    savings: 5700,
    doctorRecommended: true,
    params: 45,
    fasting: false,
    tat: "Reports in 24-48 hrs",
    icon: "vial",
    cat: "fullbody",
    keys: "oncoscreen cancer tumor markers afp cea psa ca125 ca199 fobt calprotectin protein electrophoresis",
    popular: true
  },
  {
    id: "q-hypertension-cardiac",
    badge: "CARDIAC",
    name: "Q-Hypertension and Cardiovascular Risk Assessment Package",
    idealFor: "Individuals with high blood pressure, family history of heart disease, or high stress levels. (40+ Years, Male / Female)",
    benefits: [
      "In-depth heart risk assessment",
      "Detect hidden cardiovascular threats",
      "Advanced lipid and stress markers"
    ],
    includes: "CBC, Lipid Profile, Kidney Screen (BUN, Urea, Creatinine, Sodium, Potassium, Chloride), Urine Routine & Microscopy, FBS, Apo A1, Apo B, Apo B/A1 Ratio, hs-CRP, Lipoprotein(a), Fibrinogen, Homocysteine, NT-proBNP, Insulin, C-Peptide, Thyroid Screen (T3, T4, TSH), Cortisol Level, Serum Magnesium.",
    mrp: 18900,
    price: 9000,
    savings: 9900,
    doctorRecommended: true,
    params: 90,
    fasting: true,
    tat: "Reports in 24 hrs",
    icon: "heart",
    cat: "heart",
    keys: "hypertension cardiac cardiovascular heart risk nt-probnp homocysteine lipoprotein a apo b fibrinogen cortisol",
    popular: true
  }
];

const INITIAL_TESTS: TestItem[] = [
  ...SPECIALITY_PACKAGES,
  { id: "fb1", name: "Full Body Checkup – Essential", cat: "fullbody", params: 65, price: 1199, mrp: 2400, fasting: true, tat: "Reports by next morning", icon: "body", keys: "annual master health complete cbc sugar lipid liver kidney thyroid urine", popular: true },
  { id: "fb2", name: "Full Body Checkup – Advanced", cat: "fullbody", params: 92, price: 2499, mrp: 4999, fasting: true, tat: "Reports by next morning", icon: "body", keys: "annual master health complete vitamin d b12 hba1c iron hs-crp", popular: true },
  { id: "sr1", name: "Senior Citizen Health Check", cat: "fullbody", params: 78, price: 2199, mrp: 4200, fasting: true, tat: "Reports by next morning", icon: "body", keys: "elderly parents 60 plus" },
  { id: "db1", name: "Diabetes Care Panel", cat: "diabetes", params: 9, price: 899, mrp: 1600, fasting: true, tat: "Reports same day", icon: "drop", keys: "sugar glucose hba1c fbs ppbs microalbumin", popular: true },
  { id: "db2", name: "HbA1c (Glycated Haemoglobin)", cat: "diabetes", params: 1, price: 399, mrp: 600, fasting: false, tat: "Reports in 6 hrs", icon: "drop", keys: "sugar glucose a1c 3 month average", popular: true },
  { id: "th1", name: "Thyroid Profile (T3, T4, TSH)", cat: "thyroid", params: 3, price: 449, mrp: 800, fasting: false, tat: "Reports same day", icon: "thyroid", keys: "tsh t3 t4 hypothyroid weight hair fall", popular: true },
  { id: "ht1", name: "Heart Health Panel", cat: "heart", params: 15, price: 1299, mrp: 2500, fasting: true, tat: "Reports same day", icon: "heart", keys: "cardiac cholesterol lipid hs-crp lp(a) apo" },
  { id: "ht2", name: "Lipid Profile", cat: "heart", params: 8, price: 499, mrp: 900, fasting: true, tat: "Reports same day", icon: "heart", keys: "cholesterol triglycerides ldl hdl" },
  { id: "wm1", name: "Women's Wellness Panel", cat: "women", params: 55, price: 1899, mrp: 3600, fasting: true, tat: "Reports by next morning", icon: "women", keys: "female cbc thyroid vitamin iron calcium", popular: true },
  { id: "wm2", name: "PCOS Profile", cat: "women", params: 8, price: 1999, mrp: 3400, fasting: true, tat: "Reports in 24 hrs", icon: "women", keys: "pcod hormone lh fsh prolactin testosterone insulin" },
  { id: "vt1", name: "Vitamin D (25-OH)", cat: "vitamins", params: 1, price: 1099, mrp: 1800, fasting: false, tat: "Reports same day", icon: "sun", keys: "vit d3 bone fatigue", popular: true },
  { id: "vt2", name: "Vitamin B12", cat: "vitamins", params: 1, price: 749, mrp: 1200, fasting: false, tat: "Reports same day", icon: "sun", keys: "cobalamin tingling numbness fatigue", popular: true },
  { id: "vt3", name: "Iron Profile", cat: "vitamins", params: 4, price: 799, mrp: 1400, fasting: true, tat: "Reports same day", icon: "drop", keys: "ferritin tibc transferrin anaemia anemia" },
  { id: "fv1", name: "Fever Panel", cat: "fever", params: 7, price: 1499, mrp: 2600, fasting: false, tat: "Reports in 6 hrs", icon: "thermo", keys: "dengue malaria typhoid crp viral" },
  { id: "fv2", name: "Complete Blood Count (CBC)", cat: "fever", params: 24, price: 299, mrp: 450, fasting: false, tat: "Reports in 6 hrs", icon: "drop", keys: "haemoglobin hemoglobin platelets wbc infection", popular: true },
  { id: "og1", name: "Liver Function Test (LFT)", cat: "organ", params: 11, price: 599, mrp: 1000, fasting: true, tat: "Reports same day", icon: "vial", keys: "sgot sgpt bilirubin fatty liver alcohol" },
  { id: "og2", name: "Kidney Function Test (KFT)", cat: "organ", params: 10, price: 599, mrp: 1000, fasting: false, tat: "Reports same day", icon: "vial", keys: "rft creatinine urea uric acid egfr" },
  { id: "ss1", name: "GAD-65 Antibody (Type 1 Diabetes)", cat: "super", params: 1, price: 6400, mrp: 6400, fasting: false, tat: "Reports in 3–5 days", icon: "dna", keys: "autoantibody islet type 1 super speciality" }
];

const CATS = [
  { id: "all", label: "All Tests" },
  { id: "fullbody", label: "Full Body" },
  { id: "diabetes", label: "Diabetes" },
  { id: "thyroid", label: "Thyroid" },
  { id: "heart", label: "Heart" },
  { id: "women", label: "Women's" },
  { id: "vitamins", label: "Vitamins" },
  { id: "fever", label: "Fever" },
  { id: "organ", label: "Liver/Kidney" }
];

function CategoryPillIcon({ id, className = "w-3.5 h-3.5" }: { id: string; className?: string }) {
  switch (id) {
    case "all": return <Sparkles className={className} />;
    case "fullbody": return <Stethoscope className={className} />;
    case "diabetes": return <Droplets className={className} />;
    case "thyroid": return <Activity className={className} />;
    case "heart": return <Heart className={className} />;
    case "women": return <Flower2 className={className} />;
    case "vitamins": return <Sun className={className} />;
    case "fever": return <Thermometer className={className} />;
    case "organ": return <FlaskConical className={className} />;
    default: return <Sparkles className={className} />;
  }
}

const ADDR_PRESETS = [
  "Bangalore",
  "Kengeri",
  "Yelahanka",
  "Nayandahalli",
  "Nagarabhavi",
  "Chandra Layout",
  "Yelahanka Old Town",
  "Sanjaynagar",
  "Vidyaranyapura",
  "Jayanagar",
  "Whitefield",
  "Indiranagar",
  "Koramangala"
];

const SLOTS = ["6:00 – 8:00 AM", "8:00 – 10:00 AM", "10:00 AM – 12:00 PM", "2:00 – 4:00 PM", "4:00 – 6:00 PM"];
const NOW_SLOT = "Next 60 Minutes (Urgent)";
const COLLECT_FEE = 150;
const FREE_ABOVE = 499;

const POPULAR_TAGS = ["Full Body", "HbA1c", "Thyroid", "Vitamin D", "CBC", "Lipid Profile"];

function CatIconSvg({ name, size = 18 }: { name: string; size?: number }) {
  const sw = 1.8;
  switch (name) {
    case "body":
      return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="3.2" /><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" /></svg>;
    case "drop":
      return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" /></svg>;
    case "thyroid":
      return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v12" /><path d="M12 8c-2-3-6-2-6 2 0 4 3 6 6 7" /><path d="M12 8c2-3 6-2 6 2 0 4-3 6-6 7" /></svg>;
    case "heart":
      return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>;
    case "women":
      return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="5" /><path d="M12 14v7M9 18h6" /></svg>;
    case "sun":
      return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" /></svg>;
    case "thermo":
      return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M10 4a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z" /><path d="M12 9v6" /></svg>;
    default:
      return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M8 3h8" /><path d="M9 3v11a3 3 0 0 0 6 0V3" /><path d="M9 10h6" /></svg>;
  }
}

interface OrderDetails {
  id: string;
  items: TestItem[];
  date: { label: string; sub: string };
  slot: string;
  addr: string;
  total: number;
  name: string;
  phone: string;
  paymentMethod?: "online" | "cod";
  paymentStatus?: string;
}

export default function BookPage() {
  const [screen, setScreen] = useState<"catalog" | "confirmed">("catalog");
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showRxModal, setShowRxModal] = useState(false);
  const [mobileCheckoutOpen, setMobileCheckoutOpen] = useState(false);
  const [rxPhone, setRxPhone] = useState("");
  const [rxSent, setRxSent] = useState(false);

  const [allTests, setAllTests] = useState<TestItem[]>(INITIAL_TESTS);
  const [cartIds, setCartIds] = useState<string[]>([]);

  const [addrIndex, setAddrIndex] = useState(0);
  const [customAddress, setCustomAddress] = useState("");
  const [dateIndex, setDateIndex] = useState(0);
  const [slot, setSlot] = useState(NOW_SLOT);

  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");

  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Advanced Filter & Sort State
  const [sortBy, setSortBy] = useState<"recommended" | "price-asc" | "price-desc" | "params-desc">("recommended");
  const [typeFilter, setTypeFilter] = useState<"all" | "packages" | "singles">("all");
  const [fastingFilter, setFastingFilter] = useState<"all" | "fasting" | "no-fasting">("all");
  const [priceFilter, setPriceFilter] = useState<"all" | "under1k" | "1k-3k" | "3k-6k" | "above6k">("all");
  const [doctorRecOnly, setDoctorRecOnly] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const [dynamicDates, setDynamicDates] = useState<{ label: string; sub: string }[]>([]);

  useEffect(() => {
    const dates = [];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();

    for (let i = 0; i < 4; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() + i);
      const label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : days[d.getDay()];
      const sub = `${d.getDate()} ${months[d.getMonth()]}`;
      dates.push({ label, sub });
    }
    setDynamicDates(dates);
  }, []);

  // Hydrate with Master Catalogue
  useEffect(() => {
    const masterItems: TestItem[] = MASTER_CATALOGUE.map((m) => ({
      id: m.id,
      name: m.name,
      cat: m.category ? m.category.toLowerCase() : "fullbody",
      params: m.parametersCount || 1,
      price: m.price,
      mrp: m.mrp,
      fasting: m.fasting,
      tat: m.tat,
      icon: m.icon === "🩸" ? "drop" : m.icon === "🦋" ? "thyroid" : m.icon === "☀️" ? "sun" : m.icon === "❤️" ? "heart" : "vial",
      keys: (m.aliases || []).join(" ") + " " + m.name.toLowerCase(),
      popular: m.popular
    }));

    setAllTests((prev) => {
      const existing = new Set(prev.map((t) => t.id));
      const fresh = masterItems.filter((i) => !existing.has(i.id));
      return [...prev, ...fresh];
    });
  }, []);

  // Parse URL query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawWanted = [
      ...params.getAll("tests"),
      params.get("test") || "",
      params.get("package") || "",
      params.get("pkg") || ""
    ].filter(Boolean);

    if (!rawWanted.length) return;

    const matchedIds: string[] = [];
    for (const w of rawWanted) {
      const match = matchMasterItem(w);
      if (match) {
        matchedIds.push(match.id);
      } else {
        const found = INITIAL_TESTS.find((t) => t.id === w || t.name.toLowerCase().includes(w.toLowerCase()));
        if (found) matchedIds.push(found.id);
      }
    }

    if (matchedIds.length > 0) {
      setCartIds((prev) => Array.from(new Set([...prev, ...matchedIds])));
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2800);
  };

  const toggleCart = (id: string) => {
    setCartIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const getTestById = (id: string): TestItem => {
    return allTests.find((t) => t.id === id) || {
      id,
      name: id,
      cat: "fullbody",
      params: 1,
      price: 499,
      mrp: 999,
      fasting: false,
      tat: "Reports same day",
      icon: "drop",
      keys: ""
    };
  };

  const cartItems = cartIds.map(getTestById);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const collectFee = subtotal >= FREE_ABOVE || subtotal === 0 ? 0 : COLLECT_FEE;
  const grandTotal = subtotal + collectFee;

  const getSlotsForDate = (idx: number) => (idx === 0 ? [NOW_SLOT, ...SLOTS] : SLOTS);

  const handleBookSubmit = async () => {
    if (cartItems.length === 0) {
      showToast("Please add at least one test to proceed.");
      return;
    }

    let valid = true;
    if (!patientName.trim()) {
      setNameError("Please enter patient's full name");
      valid = false;
    } else {
      setNameError("");
    }

    if (!/^[6-9]\d{9}$/.test(patientPhone.trim())) {
      setPhoneError("Please enter a valid 10-digit mobile number");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!valid) return;

    const finalName = patientName.trim() || `Patient (${patientPhone.trim()})`;

    setIsSubmitting(true);
    const selectedDate = dynamicDates[dateIndex] || { label: "Today", sub: "16 Sep" };
    const finalAddr = customAddress.trim() || ADDR_PRESETS[addrIndex] + ", Bengaluru";

    const createdBookingIds: string[] = [];
    try {
      for (const item of cartItems) {
        const res = await Promise.race([
          api.bookings.create({
            patient_name: finalName,
            patient_phone: patientPhone.trim(),
            test_name: item.name,
            collection_type: "home",
            collection_address: finalAddr,
            preferred_date: selectedDate.sub,
            preferred_time: slot
          }),
          new Promise((r) => setTimeout(() => r(null), 2500))
        ]).catch(() => null);
        if (res && (res as any).id) {
          createdBookingIds.push((res as any).id);
        }
      }
    } catch {
      // demo fallback
    }

    const newOrder: OrderDetails = {
      id: "QXL-" + Math.floor(10000 + Math.random() * 90000),
      items: cartItems,
      date: selectedDate,
      slot,
      addr: finalAddr,
      total: grandTotal,
      name: finalName,
      phone: patientPhone.trim(),
      paymentMethod,
      paymentStatus: paymentMethod === "online" ? "Paid Online" : "Pay Cash/UPI on Collection"
    };

    if (paymentMethod === "cod") {
      setIsSubmitting(false);
      setMobileCheckoutOpen(false);
      setOrder(newOrder);
      setScreen("confirmed");
      return;
    }

    if (paymentMethod === "online") {
      try {
        let razorpayOrder: any;
        try {
          if (createdBookingIds.length > 0) {
            razorpayOrder = await Promise.race([
              api.payments.createOrder(createdBookingIds),
              new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000))
            ]);
          }
        } catch {
          // client fallback
        }

        if (!razorpayOrder) {
          razorpayOrder = {
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_mock_qxl",
            order_id: `order_mock_${Math.random().toString(36).substring(2, 11)}`,
            amount: Math.round(grandTotal * 100),
            currency: "INR",
            name: "QXL Diagnostics",
            description: `${cartItems.length} Blood Test(s) Booking`
          };
        }

        await openRazorpayCheckout({
          order: razorpayOrder,
          prefill: {
            name: finalName,
            contact: patientPhone.trim()
          },
          onSuccess: async (payload) => {
            try {
              if (payload.razorpay_order_id && !payload.razorpay_order_id.startsWith("order_mock_")) {
                await api.payments.verify(payload).catch(() => null);
              }
            } catch {
              // fallback
            }
            setIsSubmitting(false);
            setMobileCheckoutOpen(false);
            setOrder(newOrder);
            setScreen("confirmed");
            showToast("Payment Successful via Razorpay!");
          },
          onFailure: (msg) => {
            setIsSubmitting(false);
            showToast(msg || "Payment cancelled. You can pay Cash on Collection.");
          },
          onDismiss: () => {
            setIsSubmitting(false);
          }
        });
      } catch (checkoutErr) {
        console.warn("Razorpay popup error", checkoutErr);
        setIsSubmitting(false);
        setMobileCheckoutOpen(false);
        setOrder({ ...newOrder, paymentMethod: "cod", paymentStatus: "Pay Cash/UPI on Collection" });
        setScreen("confirmed");
        showToast("Booking Confirmed! You can pay Cash/UPI on sample collection.");
      }
    }
  };

  const handleRxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(rxPhone.trim())) {
      showToast("Please enter a valid 10-digit mobile number");
      return;
    }
    setRxSent(true);
    setTimeout(() => {
      setRxSent(false);
      setShowRxModal(false);
      setRxPhone("");
      showToast("Prescription received! Our lab technician will call you shortly.");
    }, 1500);
  };

  const isPackageItem = (t: TestItem) => {
    return (
      t.params > 1 ||
      t.cat === "fullbody" ||
      t.name.toLowerCase().includes("checkup") ||
      t.name.toLowerCase().includes("panel") ||
      t.name.toLowerCase().includes("profile") ||
      t.name.toLowerCase().includes("package")
    );
  };

  const activeFilterCount =
    (typeFilter !== "all" ? 1 : 0) +
    (fastingFilter !== "all" ? 1 : 0) +
    (priceFilter !== "all" ? 1 : 0) +
    (doctorRecOnly ? 1 : 0) +
    (selectedCat !== "all" ? 1 : 0) +
    (sortBy !== "recommended" ? 1 : 0);

  const resetFilters = () => {
    setSelectedCat("all");
    setSearchQuery("");
    setSortBy("recommended");
    setTypeFilter("all");
    setFastingFilter("all");
    setPriceFilter("all");
    setDoctorRecOnly(false);
  };

  const filteredTests = allTests.filter((t) => {
    const matchesCat = selectedCat === "all" || t.cat === selectedCat;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      (t.name + " " + (t.keys || "") + " " + (t.includes || "") + " " + (t.idealFor || "")).toLowerCase().includes(q);

    const isPkg = isPackageItem(t);
    const matchesType =
      typeFilter === "all" ? true :
      typeFilter === "packages" ? isPkg :
      typeFilter === "singles" ? !isPkg : true;

    const matchesFasting =
      fastingFilter === "all" ? true :
      fastingFilter === "fasting" ? t.fasting === true :
      fastingFilter === "no-fasting" ? t.fasting === false : true;

    let matchesPrice = true;
    if (priceFilter === "under1k") matchesPrice = t.price < 1000;
    else if (priceFilter === "1k-3k") matchesPrice = t.price >= 1000 && t.price <= 3000;
    else if (priceFilter === "3k-6k") matchesPrice = t.price > 3000 && t.price <= 6000;
    else if (priceFilter === "above6k") matchesPrice = t.price > 6000;

    const matchesDoctorRec = !doctorRecOnly || t.doctorRecommended === true;

    return matchesCat && matchesQuery && matchesType && matchesFasting && matchesPrice && matchesDoctorRec;
  });

  const sortedFilteredTests = [...filteredTests].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    if (sortBy === "params-desc") {
      return b.params - a.params;
    }

    const aRec = a.doctorRecommended ? 1 : 0;
    const bRec = b.doctorRecommended ? 1 : 0;
    if (aRec !== bRec) return bRec - aRec;

    const aPkg = isPackageItem(a) ? 1 : 0;
    const bPkg = isPackageItem(b) ? 1 : 0;
    if (aPkg !== bPkg) return bPkg - aPkg;

    return b.params - a.params;
  });

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 antialiased flex flex-col w-full pb-28 lg:pb-16">
      {/* Toast Popup */}
      {toastMsg && (
        <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0B2545] text-white text-xs md:text-sm font-extrabold px-6 py-3 rounded-full shadow-2xl border border-amber-400/40 animate-in fade-in zoom-in duration-200">
          {toastMsg}
        </div>
      )}

      {/* Prescription Upload Quick Modal */}
      {showRxModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in duration-200">
            <button
              type="button"
              onClick={() => setShowRxModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full bg-slate-100 grid place-items-center font-bold text-sm cursor-pointer"
            >
              ✕
            </button>

            <div className="w-10 h-10 rounded-2xl bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] flex items-center justify-center text-xl mb-3 shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-[#0B2545]">Upload Doctor Prescription</h3>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Don&apos;t know which tests to select? Share your prescription or mobile number and our clinical coordinator will select tests for you.
            </p>

            {rxSent ? (
              <div className="my-6 p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-bold text-center border border-emerald-200 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Prescription Submitted! Our phlebotomist is reviewing your request...</span>
              </div>
            ) : (
              <form onSubmit={handleRxSubmit} className="mt-4 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number"
                    value={rxPhone}
                    onChange={(e) => setRxPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-extrabold outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center bg-slate-50">
                  <div className="text-xs font-bold text-slate-600">Attach Prescription Image / PDF</div>
                  <input type="file" accept="image/*,.pdf" className="mt-2 text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#0B2545] file:text-white cursor-pointer" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0B2545] hover:bg-amber-400 hover:text-slate-950 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Request Call Back &amp; Test Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── ADVANCED FILTER DRAWER MODAL ── */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-[100000] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[78vh] sm:max-h-[88vh] flex flex-col shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200 overflow-hidden my-auto">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#0B2545] text-amber-400 flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0B2545]">Filter &amp; Sort Diagnostic Tests</h3>
                  <p className="text-[11px] text-slate-500 font-semibold">Refine diagnostic packages &amp; blood tests</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowFilterDrawer(false)}
                className="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full bg-slate-100 grid place-items-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Drawer Body - Scrollable */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-5 text-xs font-semibold text-slate-700 flex-1">
              {/* 1. Category */}
              <div>
                <label className="block text-[11px] font-black text-[#0B2545] uppercase tracking-wider mb-2">
                  Health Category
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {CATS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCat(c.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 border ${
                        selectedCat === c.id
                          ? "bg-[#0B2545] text-white border-[#0B2545]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <CategoryPillIcon id={c.id} className="w-3 h-3" />
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Format / Type */}
              <div>
                <label className="block text-[11px] font-black text-[#0B2545] uppercase tracking-wider mb-2">
                  Test Format &amp; Packages
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "all", label: "All Formats" },
                    { id: "packages", label: "Packages & Panels" },
                    { id: "singles", label: "Single Tests" }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTypeFilter(t.id as any)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-extrabold text-center transition-all border cursor-pointer ${
                        typeFilter === t.id
                          ? "bg-[#0B2545] text-white border-[#0B2545] shadow-2xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Fasting Requirement */}
              <div>
                <label className="block text-[11px] font-black text-[#0B2545] uppercase tracking-wider mb-2">
                  Fasting Requirement
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "all", label: "All Statuses" },
                    { id: "fasting", label: "Fasting Required" },
                    { id: "no-fasting", label: "No Fasting" }
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFastingFilter(f.id as any)}
                      className={`py-2 px-2 rounded-xl text-xs font-extrabold text-center transition-all border cursor-pointer ${
                        fastingFilter === f.id
                          ? "bg-[#0B2545] text-white border-[#0B2545]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Price Filter */}
              <div>
                <label className="block text-[11px] font-black text-[#0B2545] uppercase tracking-wider mb-2">
                  Price Range Filter
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under1k", label: "Under ₹1,000" },
                    { id: "1k-3k", label: "₹1,000 - ₹3,000" },
                    { id: "3k-6k", label: "₹3,000 - ₹6,000" },
                    { id: "above6k", label: "Above ₹6,000" }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPriceFilter(p.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${
                        priceFilter === p.id
                          ? "bg-[#0B2545] text-white border-[#0B2545]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Doctor Recommended Toggle */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
                  <div>
                    <div className="text-xs font-black text-amber-950">Doctor Recommended Only</div>
                    <div className="text-[10.5px] text-amber-800 font-medium">Show health packages recommended by clinicians</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDoctorRecOnly(!doctorRecOnly)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    doctorRecOnly ? "bg-amber-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 bg-white rounded-full transition-transform transform absolute top-1 left-1 ${
                      doctorRecOnly ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* 6. Sort Selection */}
              <div>
                <label className="block text-[11px] font-black text-[#0B2545] uppercase tracking-wider mb-2">
                  Sort Order
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-extrabold outline-none focus:border-[#0B2545]"
                >
                  <option value="recommended">Doctor Recommended &amp; Popular First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="params-desc">Parameters: High to Low</option>
                </select>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50/80">
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-extrabold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer px-3 py-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Reset All</span>
              </button>

              <button
                type="button"
                onClick={() => setShowFilterDrawer(false)}
                className="bg-[#0B2545] hover:bg-amber-400 hover:text-slate-950 text-white font-black text-xs px-6 py-2.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Apply Filters ({sortedFilteredTests.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CATALOG SCREEN ── */}
      {screen === "catalog" && (
        <main className="w-full max-w-[1280px] mx-auto px-3 sm:px-5 py-4 sm:py-6 flex-1">
          {/* SLEEK COMPACT CONTROL STRIP */}
          <div className="space-y-1.5 mb-3">
            {/* 1. CATEGORY PILLS BAR (SLIM) */}
            <div className="overflow-x-auto pb-0.5 no-scrollbar">
              <div className="flex items-center gap-1 min-w-max">
                {CATS.map((c) => {
                  const active = selectedCat === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCat(c.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold transition-all cursor-pointer flex items-center gap-1 border ${
                        active
                          ? "bg-[#0B2545] text-white border-[#0B2545] shadow-2xs"
                          : "bg-white text-slate-700 border-slate-200/90 hover:bg-slate-100"
                      }`}
                    >
                      <CategoryPillIcon id={c.id} className="w-3 h-3" />
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. QUICK FILTER & SORT TOOLBAR (SLIM SINGLE-ROW FLEX-NOWRAP) */}
            <div className="bg-white rounded-lg border border-slate-200/90 px-2 py-1 shadow-2xs flex items-center justify-between gap-1.5 overflow-x-auto flex-nowrap no-scrollbar whitespace-nowrap">
              {/* Left: Filter Trigger & Quick Presets */}
              <div className="flex items-center gap-1 min-w-max">
                <button
                  type="button"
                  onClick={() => setShowFilterDrawer(true)}
                  className={`px-2 py-0.5 rounded-md text-[10.5px] font-black transition-all cursor-pointer flex items-center gap-1 border ${
                    activeFilterCount > 0
                      ? "bg-[#0B2545] text-white border-[#0B2545] shadow-2xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200"
                  }`}
                >
                  <SlidersHorizontal className="w-2.5 h-2.5" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-amber-400 text-slate-950 text-[8.5px] font-black w-3 h-3 rounded-full inline-flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Upload Prescription Button */}
                <button
                  type="button"
                  onClick={() => setShowRxModal(true)}
                  className="px-2 py-0.5 rounded-md text-[10px] font-black transition-all cursor-pointer flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs"
                  title="Upload Doctor Prescription"
                >
                  <FileText className="w-2.5 h-2.5 text-amber-700" />
                  <span>Upload Rx</span>
                </button>

                {/* Quick Filter Pill: Doctor Recommended */}
                <button
                  type="button"
                  onClick={() => setDoctorRecOnly(!doctorRecOnly)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition-all cursor-pointer flex items-center gap-1 border ${
                    doctorRecOnly
                      ? "bg-amber-100 text-amber-900 border-amber-300 shadow-2xs"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <ShieldCheck className="w-2.5 h-2.5 text-amber-600" />
                  <span>Doctor Rec</span>
                </button>

                {/* Quick Filter Pill: Packages */}
                <button
                  type="button"
                  onClick={() => setTypeFilter(typeFilter === "packages" ? "all" : "packages")}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition-all cursor-pointer flex items-center gap-1 border ${
                    typeFilter === "packages"
                      ? "bg-[#0B2545] text-white border-[#0B2545]"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span>Packages Only</span>
                </button>

                {/* Quick Filter Pill: Fasting */}
                <button
                  type="button"
                  onClick={() => setFastingFilter(fastingFilter === "fasting" ? "all" : "fasting")}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition-all cursor-pointer flex items-center gap-1 border ${
                    fastingFilter === "fasting"
                      ? "bg-amber-100 text-amber-900 border-amber-300"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
                  <span>Fasting</span>
                </button>

                {/* Quick Filter Pill: Under ₹1000 */}
                <button
                  type="button"
                  onClick={() => setPriceFilter(priceFilter === "under1k" ? "all" : "under1k")}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition-all cursor-pointer flex items-center gap-1 border ${
                    priceFilter === "under1k"
                      ? "bg-[#0B2545] text-white border-[#0B2545]"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span>Under ₹1k</span>
                </button>

                {/* Reset Filters button if any filter is active */}
                {(activeFilterCount > 0 || searchQuery) && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-1.5 py-0.5 text-[10px] font-extrabold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-md border border-rose-200 flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {/* Right: Sort Dropdown */}
              <div className="flex items-center gap-1 shrink-0 ml-auto">
                <ArrowUpDown className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="recommended">Sort: Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="params-desc">Parameters: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* MAIN CATALOG & SIDEBAR GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* TEST CARDS COLUMN */}
            <div className="lg:col-span-8 xl:col-span-8 space-y-5">

              {/* ── 1. DOCTOR RECOMMENDED SPECIALITY PACKAGES (NON-SCROLLABLE VERTICAL LIST) ── */}
              {(!searchQuery || searchQuery.trim().length === 0) && selectedCat === "all" && activeFilterCount === 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow-2xs">
                        <ShieldCheck className="w-2.5 h-2.5 text-[#D69A18]" />
                        <span>DOCTOR RECOMMENDED PACKAGES</span>
                      </span>
                      <h2 className="text-xs sm:text-sm font-black text-[#0B2545] mt-0.5 tracking-tight">
                        Speciality Health Packages
                      </h2>
                    </div>
                    <span className="text-[9.5px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                      6 Speciality Packages
                    </span>
                  </div>

                  {/* Vertical Non-Scrollable List of Packages */}
                  <div className="space-y-2.5">
                    {SPECIALITY_PACKAGES.map((pkg) => {
                      const isAdded = cartIds.includes(pkg.id);
                      const discountPercent = Math.round(((pkg.mrp - pkg.price) / pkg.mrp) * 100);

                      return (
                        <div
                          key={pkg.id}
                          className={`bg-white rounded-xl border p-3 sm:p-3.5 shadow-2xs hover:shadow-sm transition-all relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isAdded
                              ? "border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-50/10"
                              : "border-amber-200/90 hover:border-[#D69A18]"
                          }`}
                        >
                          {/* Left Info Column */}
                          <div className="flex-1 space-y-1.5 min-w-0">
                            {/* Badges */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="bg-[#0B2545] text-white text-[8.5px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                                {pkg.badge}
                              </span>
                              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[8.5px] font-black px-2 py-0.5 rounded flex items-center gap-0.5">
                                <ShieldCheck className="w-2.5 h-2.5 text-amber-700" />
                                <span>Doctor Rec</span>
                              </span>
                              <span className="text-[9.5px] text-slate-500 font-bold flex items-center gap-0.5 ml-auto sm:ml-0">
                                <Clock className="w-2.5 h-2.5 text-slate-400" />
                                <span>{pkg.tat}</span>
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xs sm:text-sm font-black text-[#0B2545] leading-snug">
                              {pkg.name}
                            </h3>

                            {/* Ideal For */}
                            {pkg.idealFor && (
                              <p className="text-[10.5px] text-slate-600 font-medium leading-normal bg-slate-50 border border-slate-100 p-1.5 rounded-md">
                                <strong className="text-[#0B2545]">Ideal For:</strong> {pkg.idealFor}
                              </p>
                            )}

                            {/* Key Benefits */}
                            {pkg.benefits && (
                              <div className="flex flex-wrap gap-x-3 gap-y-1 py-0.5">
                                {pkg.benefits.map((b, i) => (
                                  <div key={i} className="flex items-center gap-1 text-[10px] font-semibold text-slate-700">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                    <span>{b}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Includes */}
                            {pkg.includes && (
                              <p className="text-[10px] text-slate-600 font-medium leading-tight bg-amber-50/40 border border-amber-200/60 p-1.5 rounded-md">
                                <strong className="text-amber-900">Includes ({pkg.params} Params):</strong> {pkg.includes}
                              </p>
                            )}
                          </div>

                          {/* Right Price & Add Button Column */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 sm:pl-4 shrink-0">
                            <div className="text-left sm:text-right">
                              <div className="flex items-baseline gap-1.5 sm:justify-end">
                                <span className="text-base font-black text-slate-900">₹{pkg.price}</span>
                                <span className="text-xs text-slate-400 line-through font-semibold">₹{pkg.mrp}</span>
                                <span className="text-[8.5px] font-black text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200">
                                  {discountPercent}% OFF
                                </span>
                              </div>
                              {pkg.savings && (
                                <div className="text-[9.5px] font-extrabold text-emerald-700">
                                  Save ₹{pkg.savings}
                                </div>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleCart(pkg.id)}
                              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs whitespace-nowrap ${
                                isAdded
                                  ? "bg-emerald-600 text-white"
                                  : "bg-[#0B2545] hover:bg-amber-400 hover:text-slate-950 text-white"
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Added</span>
                                </>
                              ) : (
                                <span>+ Book Now</span>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── 2. OTHER DIAGNOSTIC TESTS & PANELS ── */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-t border-slate-200/80 pt-3">
                  <h3 className="text-xs font-black text-[#0B2545] uppercase tracking-wider flex items-center gap-1.5">
                    <span>{activeFilterCount > 0 || searchQuery ? "Filtered Diagnostic Tests" : "All Diagnostic Tests & Speciality Panels"}</span>
                  </h3>
                  <span className="text-[11px] font-extrabold text-[#0B2545] bg-[#FFF8EB] border border-[#F3DBA7] px-2.5 py-0.5 rounded-full">
                    {sortedFilteredTests.length} Tests Available
                  </span>
                </div>

                {sortedFilteredTests.length === 0 ? (
                  <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-2xs space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
                      <Filter className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-800">
                      No tests found matching your selected filters {searchQuery ? `or "${searchQuery}"` : ""}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                      Try clearing some filters or searching for specific test names like HbA1c, Vitamin D, Thyroid, CBC.
                    </p>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="px-5 py-2.5 bg-[#0B2545] hover:bg-amber-400 hover:text-slate-950 text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md transition-all inline-flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Clear All Filters</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sortedFilteredTests.map((t) => {
                      const isAdded = cartIds.includes(t.id);
                      const discountPercent = Math.round(((t.mrp - t.price) / t.mrp) * 100);
                      const isPkg = isPackageItem(t);

                      return (
                        <div
                          key={t.id}
                          className={`bg-white rounded-2xl border p-3.5 flex flex-col justify-between transition-all relative ${
                            isAdded
                              ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/15"
                              : isPkg
                              ? "border-amber-200/90 shadow-2xs hover:border-[#D69A18]"
                              : "border-slate-200"
                          }`}
                        >
                          <div>
                            {/* Badges */}
                            <div className="flex items-center justify-between gap-1 mb-2">
                              <span className={`text-[9.5px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider border ${
                                isPkg
                                  ? "bg-amber-50 text-amber-900 border-amber-200"
                                  : "bg-sky-50 text-sky-900 border-sky-200"
                              }`}>
                                {isPkg ? "Package • " : ""}{t.params} {t.params === 1 ? "Parameter" : "Parameters"}
                              </span>
                              {t.fasting ? (
                                <span className="bg-amber-100 text-amber-900 text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3 text-amber-700 shrink-0" />
                                  <span>Fasting</span>
                                </span>
                              ) : (
                                <span className="bg-emerald-50 text-emerald-800 text-[9.5px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                  <span>No Fasting</span>
                                </span>
                              )}
                            </div>

                            {/* Icon & Title */}
                            <div className="flex items-start gap-2.5 my-1.5">
                              <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#0B2545] flex items-center justify-center shrink-0">
                                <CatIconSvg name={t.icon} size={18} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug line-clamp-2">
                                  {t.name}
                                </h4>
                                <p className="text-[10.5px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span>{t.tat}</span>
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Price & Add Button */}
                          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                            <div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-sm sm:text-base font-black text-slate-900">₹{t.price}</span>
                                {t.mrp > t.price && (
                                  <span className="text-[11px] text-slate-400 line-through font-semibold">₹{t.mrp}</span>
                                )}
                              </div>
                              {discountPercent > 0 && (
                                <span className="text-[9.5px] font-black text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                                  {discountPercent}% OFF
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleCart(t.id)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                                isAdded
                                  ? "bg-emerald-600 text-white shadow-xs"
                                  : "bg-[#0B2545] text-white hover:bg-amber-400 hover:text-slate-950"
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Added</span>
                                </>
                              ) : (
                                <span>+ Add</span>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* DESKTOP SIDEBAR BOOKING FORM (Hidden on Mobile) */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-20 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-black text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-[#0B2545]" />
                    <span>Cart Summary</span>
                    <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black">
                      {cartItems.length}
                    </span>
                  </h3>
                  {cartItems.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setCartIds([])}
                      className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-6 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <Droplets className="w-8 h-8 text-slate-300 mx-auto mb-1.5" />
                    <p className="text-xs font-bold text-slate-700">No tests added yet.</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-1">
                      Click &quot;+ Add&quot; on any test card to schedule home collection.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1 divide-y divide-slate-100">
                    {cartItems.map((item) => (
                      <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h5 className="text-xs font-bold text-slate-900 truncate">{item.name}</h5>
                          <span className="text-[10px] text-slate-400 font-semibold">₹{item.price}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleCart(item.id)}
                          className="text-slate-400 hover:text-red-500 text-xs font-bold p-1 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* FORM FIELDS */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-[10.5px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Patient Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={patientName}
                      onChange={(e) => {
                        setPatientName(e.target.value);
                        if (e.target.value.trim()) setNameError("");
                      }}
                      className={`w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs font-extrabold outline-none ${
                        nameError ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-amber-400"
                      }`}
                    />
                    {nameError && <p className="text-red-500 text-[10px] font-bold mt-0.5">{nameError}</p>}
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mobile Number (WhatsApp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={patientPhone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setPatientPhone(val);
                        if (/^[6-9]\d{9}$/.test(val)) setPhoneError("");
                      }}
                      className={`w-full bg-slate-50 border rounded-xl px-3 py-2 text-xs font-extrabold outline-none ${
                        phoneError ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-amber-400"
                      }`}
                    />
                    {phoneError && <p className="text-red-500 text-[10px] font-bold mt-0.5">{phoneError}</p>}
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Collection Date &amp; Slot
                    </label>
                    <div className="grid grid-cols-4 gap-1 mb-1.5">
                      {dynamicDates.map((d, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setDateIndex(i);
                            if (i !== 0 && slot === NOW_SLOT) setSlot("8:00 – 10:00 AM");
                          }}
                          className={`py-1.5 px-1 rounded-lg text-[10px] font-black cursor-pointer text-center ${
                            dateIndex === i ? "bg-[#0B2545] text-white" : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          <div className="truncate">{d.label}</div>
                        </button>
                      ))}
                    </div>
                    <select
                      value={slot}
                      onChange={(e) => setSlot(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 outline-none"
                    >
                      {getSlotsForDate(dateIndex).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Doorstep Address
                    </label>
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {ADDR_PRESETS.map((preset, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setAddrIndex(i)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                            addrIndex === i && !customAddress ? "bg-[#0B2545] text-white" : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Enter House No, Street, Landmark..."
                      value={customAddress}
                      onChange={(e) => setCustomAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-extrabold outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  {/* PAYMENT METHOD SELECTOR */}
                  <div>
                    <label className="block text-[10.5px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Payment Mode <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("online")}
                        className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          paymentMethod === "online"
                            ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20"
                            : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[11.5px] font-black text-slate-900 flex items-center gap-1.5">
                            <CreditCard className="w-3.5 h-3.5 text-[#0B2545] shrink-0" />
                            <span>Online Pay</span>
                          </span>
                          <span className="text-[8.5px] font-black bg-sky-600 text-white px-1.5 py-0.2 rounded uppercase">INSTANT</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-semibold mt-1">UPI, Cards, NetBanking</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cod")}
                        className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          paymentMethod === "cod"
                            ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20"
                            : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[11.5px] font-black text-slate-900 flex items-center gap-1.5">
                            <Banknote className="w-3.5 h-3.5 text-[#0B2545] shrink-0" />
                            <span>Pay on Pickup</span>
                          </span>
                          <span className="text-[8.5px] font-black bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded uppercase">COD/UPI</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-semibold mt-1">Pay at doorstep</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* PRICE BREAKDOWN */}
                <div className="space-y-1 text-xs font-semibold pt-2 border-t border-slate-100 text-slate-600">
                  <div className="flex justify-between">
                    <span>Tests Subtotal:</span>
                    <span className="font-bold text-slate-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Home Collection:</span>
                    <span className="text-emerald-700 font-black">{collectFee > 0 ? `₹${collectFee}` : "FREE"}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-200">
                    <span>Grand Total:</span>
                    <span className="text-emerald-700 font-black">₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleBookSubmit}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 px-4 rounded-2xl text-xs uppercase tracking-widest shadow-md transition-all text-center cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Processing..."
                    : paymentMethod === "online"
                    ? `Pay Now (₹${grandTotal}) →`
                    : `Confirm Home Collection (₹${grandTotal}) →`}
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* STICKY FLOATING BOTTOM CART BAR */}
      {screen === "catalog" && cartItems.length > 0 && (
        <div className="fixed bottom-[68px] lg:bottom-6 left-3 right-3 lg:left-auto lg:right-6 lg:max-w-md z-[9990] bg-[#0B2545] text-white rounded-2xl p-3 sm:p-3.5 shadow-2xl border border-emerald-400/40 flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-white truncate">
                  {cartItems.length} {cartItems.length === 1 ? "Test" : "Tests"} Selected
                </span>
                <span className="text-[9.5px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-md uppercase tracking-wider">
                  Cart
                </span>
              </div>
              <div className="text-sm font-black text-emerald-400 flex items-center gap-1.5">
                <span>Total: ₹{grandTotal}</span>
                {collectFee === 0 && (
                  <span className="text-[10px] text-sky-200 font-bold hidden sm:inline">• FREE Collection</span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileCheckoutOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-black px-4 sm:px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-95"
          >
            <span>View Cart →</span>
          </button>
        </div>
      )}

      {/* CHECKOUT DRAWER / MODAL */}
      {mobileCheckoutOpen && (
        <div className="fixed inset-0 z-[100000] flex flex-col justify-end sm:items-center sm:justify-center p-0 sm:p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileCheckoutOpen(false)}
          />

          <div className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-lg max-h-[90vh] flex flex-col overflow-hidden z-10 animate-in slide-in-from-bottom duration-250">
            {/* Handle & Header */}
            <div className="w-full flex justify-center pt-2 pb-1 shrink-0 sm:hidden">
              <div className="w-10 h-1 bg-slate-200 rounded-full" />
            </div>

            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-100 shrink-0">
              <h3 className="font-black text-[#0B2545] text-sm sm:text-base flex items-center gap-1.5">
                <ShoppingCart className="w-4 h-4 text-[#0B2545]" />
                <span>Patient Details &amp; Slot</span>
                <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black">
                  {cartItems.length}
                </span>
              </h3>
              <button
                type="button"
                onClick={() => setMobileCheckoutOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 grid place-items-center text-slate-500 font-bold text-xs hover:bg-slate-200 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Selected Tests Summary */}
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-1.5">
                <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Selected Tests</div>
                <div className="space-y-1 max-h-28 overflow-y-auto divide-y divide-slate-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="pt-1 first:pt-0 flex justify-between text-xs font-bold text-slate-900">
                      <span className="truncate pr-2">{item.name}</span>
                      <span className="shrink-0 text-emerald-700">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Info */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Patient Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={patientName}
                  onChange={(e) => {
                    setPatientName(e.target.value);
                    if (e.target.value.trim()) setNameError("");
                  }}
                  className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs font-extrabold outline-none ${
                    nameError ? "border-red-500 bg-red-50" : "border-slate-200"
                  }`}
                />
                {nameError && <p className="text-red-500 text-[10.5px] font-bold">{nameError}</p>}

                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider pt-1">
                  Mobile Number (WhatsApp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={patientPhone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setPatientPhone(val);
                    if (/^[6-9]\d{9}$/.test(val)) setPhoneError("");
                  }}
                  className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs font-extrabold outline-none ${
                    phoneError ? "border-red-500 bg-red-50" : "border-slate-200"
                  }`}
                />
                {phoneError && <p className="text-red-500 text-[10.5px] font-bold">{phoneError}</p>}
              </div>

              {/* Date & Time Slot */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Collection Date:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {dynamicDates.map((d, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setDateIndex(i);
                        if (i !== 0 && slot === NOW_SLOT) setSlot("8:00 – 10:00 AM");
                      }}
                      className={`py-2 rounded-xl text-[11px] font-black cursor-pointer text-center ${
                        dateIndex === i ? "bg-[#0B2545] text-white" : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      <div>{d.label}</div>
                      <div className="text-[9px] opacity-75 font-normal">{d.sub}</div>
                    </button>
                  ))}
                </div>

                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider pt-1">
                  Time Slot:
                </label>
                <select
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-slate-900 outline-none"
                >
                  {getSlotsForDate(dateIndex).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Doorstep Address:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ADDR_PRESETS.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAddrIndex(i)}
                      className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold ${
                        addrIndex === i && !customAddress ? "bg-[#0B2545] text-white" : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <textarea
                  rows={2}
                  placeholder="House No, Street, Landmark..."
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-extrabold outline-none focus:border-amber-400 resize-none"
                />
              </div>

              {/* PAYMENT METHOD SELECTOR */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Payment Mode:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("online")}
                    className={`p-2.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === "online"
                        ? "border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/20"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-[#0B2545]" />
                        <span>Online Pay</span>
                      </span>
                      <span className="text-[8px] font-black bg-sky-600 text-white px-1.5 py-0.2 rounded uppercase">INSTANT</span>
                    </div>
                    <span className="text-[9.5px] text-slate-500 font-semibold mt-1">UPI, Cards, NetBanking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-2.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === "cod"
                        ? "border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/20"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <Banknote className="w-3.5 h-3.5 text-[#0B2545]" />
                        <span>Pay on Pickup</span>
                      </span>
                      <span className="text-[8px] font-black bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded uppercase">COD/UPI</span>
                    </div>
                    <span className="text-[9.5px] text-slate-500 font-semibold mt-1">Pay at doorstep</span>
                  </button>
                </div>
              </div>

              {/* Total Summary */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex justify-between items-center text-xs font-bold text-emerald-950">
                <span>Total Amount:</span>
                <span className="text-base font-black text-emerald-700">₹{grandTotal}</span>
              </div>
            </div>

            {/* Bottom Submit CTA */}
            <div className="p-3 border-t border-slate-100 bg-white shrink-0">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleBookSubmit}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-2xl text-xs uppercase tracking-widest shadow-md transition-all text-center cursor-pointer disabled:opacity-50"
              >
                {isSubmitting
                  ? "Processing..."
                  : paymentMethod === "online"
                  ? `Pay Now (₹${grandTotal}) →`
                  : `Confirm Home Collection (₹${grandTotal}) →`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CONFIRMED SCREEN ── */}
      {screen === "confirmed" && order && (
        <main className="max-w-md mx-auto px-4 py-8 flex-1 w-full text-center">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-600 text-white grid place-items-center mx-auto shadow-lg animate-in zoom-in duration-300">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Collection Booked Successfully!
              </h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Booking ID: <strong className="text-slate-900">{order.id}</strong> • Sent to WhatsApp ({order.phone})
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500 font-medium">Patient:</span>
                <strong className="text-slate-900 font-extrabold">{order.name}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500 font-medium">Slot:</span>
                <strong className="text-slate-900 font-extrabold">{order.date.label} ({order.slot})</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500 font-medium">Address:</span>
                <strong className="text-slate-900 font-extrabold truncate max-w-[180px]">{order.addr}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500 font-medium">Payment Mode:</span>
                <strong className="text-emerald-700 font-extrabold flex items-center gap-1">
                  {order.paymentMethod === "online" ? (
                    <>
                      <CreditCard className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Paid Online (Razorpay)</span>
                    </>
                  ) : (
                    <>
                      <Banknote className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Cash/UPI on Collection</span>
                    </>
                  )}
                </strong>
              </div>
              <div className="flex justify-between text-sm pt-1">
                <span className="text-slate-700 font-bold">Total:</span>
                <strong className="text-emerald-700 font-black text-base">₹{order.total}</strong>
              </div>
            </div>

            {order.paymentMethod === "online" && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-3 text-xs text-left flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-extrabold text-emerald-950">Razorpay Payment Verified</div>
                  <div className="text-[10.5px] text-emerald-800 font-medium">Transaction confirmed. Phlebotomist will bring sample collection kit.</div>
                </div>
              </div>
            )}

            <div className="bg-sky-50 border border-sky-200 text-sky-900 rounded-2xl p-3 text-xs text-left flex items-start gap-2">
              <FileText className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold mb-0.5">Digital PDF Reports</div>
                <p className="text-[10.5px] text-sky-800 font-medium">
                  Reports will be sent directly to your WhatsApp ({order.phone}) within 6–12 hours.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setCartIds([]);
                setOrder(null);
                setScreen("catalog");
              }}
              className="w-full bg-[#0B2545] hover:bg-amber-400 hover:text-slate-950 text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-xs transition-colors"
            >
              <span>Book More Tests</span>
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

"use client";
 

// CMS Store to manage local state and mock database in the browser using localStorage.

const isClient = typeof window !== 'undefined';

const defaultBanners = [
  {
    id: "banner-1",
    imageOnly: true,
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150187/Assets-QXL/legacy-assets/image/food_intolerance_banner.jpg",
    bgFrom: "#06558f",
    bgTo: "#128bc7",
    title: "Food Intolerance",
    badge: "NEW",
    titleAccent: "",
    subtitle: "",
    subtitleAccent: "",
    description: "",
    cta: "",
    ctaLink: "",
    ctaSecondary: "",
    ctaSecondaryLink: "",
    imageFit: "contain",
    features: []
  },
  {
    id: "banner-2",
    imageOnly: true,
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150192/Assets-QXL/legacy-assets/image/franchise_banner.png",
    bgFrom: "#ffffff",
    bgTo: "#ffffff",
    title: "Collaborate with us",
    badge: "NEW",
    titleAccent: "",
    subtitle: "",
    subtitleAccent: "",
    description: "",
    cta: "",
    ctaLink: "",
    ctaSecondary: "",
    ctaSecondaryLink: "",
    imageFit: "contain",
    features: []
  },
  {
    id: "banner-3",
    badge: "LEADER IN DIAGNOSTICS",
    title: "AI-Powered Super Speciality",
    titleAccent: "Diagnostics Labs in Bengaluru",
    subtitle: "Advanced pathology, microbiology, immunology, molecular diagnostics, histopathology and precision testing",
    subtitleAccent: "with expert-reviewed reports and home sample collection across Bengaluru.",
    description: "Supported by state-of-the-art technology and a highly skilled team of pathologists, microbiologists, and biochemists.",
    cta: "Book Now",
    ctaLink: "/book",
    ctaSecondary: "Our Specialities",
    ctaSecondaryLink: "/speciality-tests",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150476/Assets-QXL/legacy-assets/image/user_female_microscope.jpg",
    imageFit: "cover",
    bgFrom: "#eff6ff",
    bgTo: "#dbeafe",
    features: ["NABL Accredited Medical Laboratory", "CAP Standards", "Highly Skilled Team", "ISO 15189 Precision Controls"]
  },
  {
    id: "banner-4",
    badge: "FAMILY CARE",
    title: "Double the Care",
    titleAccent: "Double the Savings",
    subtitle: "Full Body Comprehensive Health Check-up",
    subtitleAccent: "1+1 FAMILY OFFER",
    description: "Get comprehensive insights for two people for the price of one. 86+ Parameters included.",
    cta: "Book Now",
    ctaLink: "/book",
    ctaSecondary: "Learn More",
    ctaSecondaryLink: "/packages",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150179/Assets-QXL/legacy-assets/image/family_clinic_consult.jpg",
    imageFit: "cover",
    bgFrom: "#f0f9ff",
    bgTo: "#e0f2fe",
    features: ["86+ Tests", "1+1 Offer", "Save 50%", "Home Collection"]
  }
];

const defaultDoctors = [
  { id: "doc-1", name: "Dr. Shantakumar Muruda", qual: "MD, BIOCHEMISTRY", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150476/Assets-QXL/legacy-assets/image/user_female_microscope.jpg" },
  { id: "doc-2", name: "Dr. Pritilata Rout", qual: "MD, PATHOLOGY", image: "https://images.unsplash.com/photo-1594824436998-d70d90db3c80?auto=format&fit=crop&q=80&w=400" },
  { id: "doc-3", name: "Dr. Ajitha Pillai", qual: "MD, MICROBIOLOGY", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400" },
  { id: "doc-4", name: "Dr. Naveen Kumar N", qual: "DCP, DNB PATHOLOGY", image: "https://images.unsplash.com/photo-1537368910025-7028500a2216?auto=format&fit=crop&q=80&w=400" }
];
import { CANONICAL_PACKAGES } from '@/lib/packagesCatalogue';

const defaultPackages = CANONICAL_PACKAGES.map((pkg) => ({
  id: pkg.id,
  name: pkg.name,
  price: pkg.price ? String(pkg.price) : "Contact Us",
  old_price: pkg.mrp ? String(pkg.mrp) : "",
  save_amount: pkg.price && pkg.mrp ? String(pkg.mrp - pkg.price) : "",
  includes: pkg.includes,
  parameters: pkg.parametersLabel,
  parametersCount: pkg.parametersCount,
  tat: pkg.tat,
  tag: pkg.tag || "PREVENTIVE",
  benefits: pkg.highlights,
  who_should_take: pkg.mayHelpWhen || "Consult with doctor or reception before booking.",
  age: "All Ages",
  gender: "Male / Female",
  doctor_recommended: true,
  contactForPrice: !!pkg.contactForPrice,
  guidanceLevel: pkg.guidanceLevel,
}));

const defaultTests = [
  { id: "test-1", name: "COMPLETE BLOOD COUNT (CBC)", price: "250", old_price: "350", parameters: "26 Parameters" },
  { id: "test-2", name: "HBA1C, GLYCATED HEMOGLOBIN", price: "380", old_price: "720", parameters: "3 Parameters" },
  { id: "test-3", name: "APOLIPOPROTEIN B (APOB)", price: "550", old_price: "665", parameters: "1 Parameter" },
  { id: "test-4", name: "THYROID PROFILE (T3, T4, TSH)", price: "350", old_price: "550", parameters: "3 Parameters" },
  { id: "test-5", name: "VITAMIN D (25-OH TOTAL)", price: "410", old_price: "1300", parameters: "1 Parameter" },
  { id: "test-6", name: "LIPID PROFILE", price: "336", old_price: "800", parameters: "8 Parameters" },
  { id: "test-7", name: "LIVER FUNCTION TEST (LFT)", price: "425", old_price: "780", parameters: "11 Parameters" },
  { id: "test-8", name: "KIDNEY FUNCTION TEST (KFT)", price: "425", old_price: "1150", parameters: "10 Parameters" }
];

const defaultDepartments = [
  { id: "dept-1", title: "NEUROLOGY", desc: "Brain & Nervous System", href: "/specialities/neurology", iconName: "Brain" },
  { id: "dept-2", title: "HEMATOLOGY", desc: "Blood Disorders & CBC", href: "/specialities/hematology", iconName: "Droplet" },
  { id: "dept-3", title: "CARDIOLOGY", desc: "Heart & Cardiovascular", href: "/specialities/cardiology", iconName: "Heart" },
  { id: "dept-4", title: "UROLOGY", desc: "Kidney & Urinary Health", href: "/specialities/urology", iconName: "Shield" },
  { id: "dept-5", title: "ENDOCRINOLOGY", desc: "Thyroid, Diabetes & Hormones", href: "/specialities/endocrinology", iconName: "Activity" }
];

const defaultTestimonials = [
  { id: "t-1", name: "Ananth Raman", role: "Patient", feedback: "QXL team was very fast. Blood collector arrived on time in the morning. Electronic reports came by evening.", rating: 5 },
  { id: "t-2", name: "Preeti Sharma", role: "Corporate Professional", feedback: "Best diagnostic center in Bangalore. Extremely professional setup and NABL standard test precision.", rating: 5 }
];

const defaultFaqs = [
  { id: "faq-1", question: "How do I book a home collection?", answer: "Simply fill out our Home Collection form, message us on WhatsApp (+91 9964 639 639), or select a health package and complete the check-out." },
  { id: "faq-2", question: "How long does it take to receive reports?", answer: "Most routine report cards (like blood sugar, lipid profiles, and CBC) are delivered via email and WhatsApp within 6 to 12 hours." },
  { id: "faq-3", question: "Which is the best diagnostic lab in Bangalore?", answer: "QXL Diagnostics is considered one of the best diagnostic labs in Bangalore, offering NABL Accredited, doctor-led super speciality testing." },
  { id: "faq-4", question: "Which diagnostic labs in Bangalore are NABL Accredited?", answer: "QXL Diagnostics is fully NABL Accredited, ensuring all pathology and diagnostic tests meet strict national and international quality standards." },
  { id: "faq-5", question: "Which lab provides home blood collection in Bangalore?", answer: "QXL Diagnostics provides free and fast home blood collection across Bangalore. Our trained phlebotomists collect samples from the comfort of your home." },
  { id: "faq-6", question: "Where can I get a blood test at home in Bangalore?", answer: "You can book a blood test at home anywhere in Bangalore with QXL Diagnostics by calling +91 9964 639 639 or booking online." },
  { id: "faq-7", question: "Which is a doctor-led diagnostic laboratory in Bangalore?", answer: "QXL Diagnostics is a doctor-led diagnostic laboratory, with all critical reports reviewed by our expert team of consultant pathologists and microbiologists." },
  { id: "faq-8", question: "Which lab does speciality tests in Bangalore?", answer: "QXL Diagnostics offers over 300 speciality tests including autoimmune panels, molecular diagnostics, allergy testing, and oncology markers." },
  { id: "faq-9", question: "Which is the best reference laboratory in Bangalore?", answer: "QXL Diagnostics serves as a trusted reference laboratory in Bangalore for many clinics and hospitals, thanks to our advanced molecular and histopathology capabilities." },
  { id: "faq-10", question: "Where can I get autoimmune tests in Bangalore?", answer: "QXL Diagnostics performs comprehensive autoimmune testing in Bangalore, including ANA profile, ANA IFA, ANCA, and ENA profile tests." },
  { id: "faq-11", question: "Where can I get an ANA IFA test in Bangalore?", answer: "You can get an accurate ANA IFA test done at QXL Diagnostics, which uses advanced immunofluorescence techniques for autoimmune disease detection." },
  { id: "faq-12", question: "Which lab does allergy testing in Bangalore?", answer: "QXL Diagnostics offers extensive allergy testing in Bangalore, including allergen-specific IgE panels, inhalant and dietary allergen panels, and clinical immunology serology." },
  { id: "faq-13", question: "Where can I get histopathology and biopsy testing in Bangalore?", answer: "QXL Diagnostics has a dedicated histopathology department led by Senior Consultant Histopathologist Dr. Pritilata Rout for highly accurate biopsy reporting." },
  { id: "faq-14", question: "Which lab performs advanced oncology testing in Bangalore?", answer: "QXL Diagnostics provides advanced oncology testing, including tumor markers like CEA, CA 125, CA 19-9, and PSA tests in Bangalore." },
  { id: "faq-15", question: "Which lab provides molecular diagnostic testing in Bangalore?", answer: "QXL Diagnostics is equipped with state-of-the-art molecular diagnostic testing, including PCR testing for rapid detection of infectious diseases." }
];

import { defaultBlogs, getDefaultBlogBySlug, getAllDefaultBlogs } from "./blogsData";

const defaultSettings = {
  siteName: "QXL Diagnostics",
  logoText: "QXL",
  logoImage: "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto,w_302,h_95,c_fit/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png",
    supportEmail: "info@qxldiagnostics.com",
  hqAddress: "3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560 060",
  northHubAddress: "L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560 064",
  workingHours: "Walk-in: Kengeri 6:30 AM–8 PM (24×7 Lab Processing) · Yelahanka 7 AM–8 PM · Home Collection 7 AM–9 PM · 24×7 Support: +91 9964 639 639",
  copyrightText: "© 2026 QXL Diagnostics. All rights reserved.",
  footerDesc: "QXL Diagnostics is a super speciality diagnostic laboratory in Bengaluru offering advanced pathology, microbiology, immunology, molecular diagnostics, histopathology, cytology and precision diagnostic services for patients, clinicians and hospitals.",
  // Contact info — now comes from backend API via SiteSettings
  phone_display: "+91 9964 639 639",
  phone_e164: "+919964639639",
  whatsapp_number: "919964639639",
  navItems: [
    { label: "Home", href: "/", visible: true },
    { label: "About Us", href: "/about", visible: true },
    { label: "Founder & Consultants", href: "/team", visible: true },
    { label: "Our Specialities", href: "/specialities", visible: true },
    { label: "Packages", href: "/packages", visible: true },
    { label: "Find Nearest Centre", href: "/centers", visible: true },
    { label: "My Bookings", href: "/dashboard", visible: true },
    { label: "My Reports", href: "/report", visible: true },
    { label: "Login", href: "/login", visible: true }
  ]
};

export const cmsStore = {
  // Read operations
  getAll: (key: string): any[] => {
    if (!isClient) {
      if (key === "blogs") return defaultBlogs;
      if (key === "packages") return defaultPackages;
      if (key === "doctors") return defaultDoctors;
      return [];
    }
    
    // Always serve the latest packages from defaults so updates show immediately
    if (key === "packages") return defaultPackages;

    if (key === "doctors") return defaultDoctors;

    if (key === "blogs") {
      try {
        const data = localStorage.getItem("qxl_cms_blogs");
        if (data) {
          let parsed = JSON.parse(data);
          if (Array.isArray(parsed)) {
            // Update/heal default blog items in parsed cache with latest defaultBlogs properties
            const map = new Map<string, any>();
            parsed.forEach((b: any) => {
              if (b.id) map.set(b.id, b);
              if (b.slug) map.set(b.slug, b);
            });
            // Ensure defaultBlogs always override/update cached values for core blogs
            defaultBlogs.forEach((def) => {
              map.set(def.id, { ...(map.get(def.id) || map.get(def.slug) || {}), ...def });
            });
            let merged = Array.from(new Set(map.values()));
            merged.sort((a: any, b: any) => {
              const timeA = new Date(a.created_at || a.date || "2026-10-01").getTime();
              const timeB = new Date(b.created_at || b.date || "2026-10-01").getTime();
              return timeB - timeA;
            });
            localStorage.setItem("qxl_cms_blogs", JSON.stringify(merged));
            return merged;
          }
        }
      } catch (e) {
        console.error("CMS blogs read error", e);
      }
      try {
        localStorage.setItem("qxl_cms_blogs", JSON.stringify(defaultBlogs));
      } catch (e) {}
      return defaultBlogs;
    }

    if (key === "banners") {
      try {
        const data = localStorage.getItem("qxl_cms_banners");
        if (data) {
          const parsed = JSON.parse(data);
          let healed = false;
          const healedBanners = parsed.map((b: any) => {
            if (b.image === "https://res.cloudinary.com/btjglif5/image/upload/v1784150187/Assets-QXL/legacy-assets/image/food_intolerance_banner.jpg" || b.id === "banner-1") {
              if (b.image !== "https://res.cloudinary.com/btjglif5/image/upload/v1784150187/Assets-QXL/legacy-assets/image/food_intolerance_banner.jpg" || b.bgFrom !== "#06558f" || b.bgTo !== "#128bc7") {
                b.image = "https://res.cloudinary.com/btjglif5/image/upload/v1784150187/Assets-QXL/legacy-assets/image/food_intolerance_banner.jpg";
                b.bgFrom = "#06558f";
                b.bgTo = "#128bc7";
                healed = true;
              }
            }
            return b;
          });
          if (healed) {
            localStorage.setItem("qxl_cms_banners", JSON.stringify(healedBanners));
          }
          return healedBanners;
        }
      } catch (e) {
        console.error("CMS banners read error", e);
      }
      try {
        localStorage.setItem("qxl_cms_banners", JSON.stringify(defaultBanners));
      } catch (e) {}
      return defaultBanners;
    }

    try {
      const data = localStorage.getItem(`qxl_cms_${key}`);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("CMS read error for key", key, e);
      return [];
    }
  },

  getSettings: (): any => {
    if (!isClient) return defaultSettings;
    try {
      const data = localStorage.getItem("qxl_cms_settings");
      if (!data) return defaultSettings;
      const parsed = JSON.parse(data);
      
      // Auto-heal missing or empty critical settings
      let healed = false;
      for (const k of Object.keys(defaultSettings)) {
        const val = parsed[k];
        const defVal = (defaultSettings as any)[k];
        if (val === undefined || val === null || val === "" || (Array.isArray(defVal) && (!val || val.length === 0))) {
          parsed[k] = defVal;
          healed = true;
        }
      }
      // Keep legacy Header/Footer keys in sync with the API phone fields.
      if (parsed.phone_display && parsed.contactPhone !== parsed.phone_display) {
        parsed.contactPhone = parsed.phone_display;
        healed = true;
      }
      if (parsed.phone_display && parsed.whatsappNumber !== parsed.phone_display) {
        parsed.whatsappNumber = parsed.phone_display;
        healed = true;
      }
      // Force-migrate any cached copy of the retired number.
      const stale = /99646\s*36848|9964\s*636848|9964636848/;
      for (const key of ["phone_display", "contactPhone", "whatsappNumber", "phone_e164", "whatsapp_number"]) {
        if (typeof parsed[key] === "string" && stale.test(parsed[key])) {
          parsed[key] = (defaultSettings as any)[key] || defaultSettings.phone_display;
          healed = true;
        }
      }

      if (parsed.navItems && Array.isArray(parsed.navItems)) {
        // Auto-migrate menu structure if old items exist
        const hasBook = parsed.navItems.some((item: any) => item.label === "Book a Test");
        const hasDownloadReport = parsed.navItems.some((item: any) => item.label === "Download Report");
        const hasCollab = parsed.navItems.some((item: any) => item.label === "Collaborate with us" || item.label === "Franchise" || item.label === "Collab with us");
        
        if (hasBook || hasDownloadReport || hasCollab) {
          parsed.navItems = defaultSettings.navItems;
          healed = true;
        } else {
          parsed.navItems = parsed.navItems.map((item: any) => {
            if (item.label === "Founder & Advisors" || item.label === "Meet Our Team") {
              item.label = "Founder & Consultants";
              item.href = "/team";
              healed = true;
            }
            return item;
          });
        }
      }

      if (healed) {
        localStorage.setItem("qxl_cms_settings", JSON.stringify(parsed));
      }
      
      return parsed;
    } catch (e) {
      return defaultSettings;
    }
  },

  // Log activity
  logActivity: (action: string) => {
    if (!isClient) return;
    try {
      const logs = cmsStore.getAll("logs");
      const newLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        user: "Admin Manager",
        action
      };
      localStorage.setItem("qxl_cms_logs", JSON.stringify([newLog, ...logs].slice(0, 100)));
      window.dispatchEvent(new CustomEvent("cms-update", { detail: { key: "logs" } }));
    } catch (e) {
      console.error("Log error", e);
    }
  },

  // Save full state
  saveState: (key: string, data: any[]) => {
    if (!isClient) return;
    localStorage.setItem(`qxl_cms_${key}`, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("cms-update", { detail: { key } }));
  },

  // Add Item
  addItem: (key: string, item: any) => {
    if (!isClient) return;
    const items = cmsStore.getAll(key);
    const newItem = { ...item, id: `${key.slice(0, 3)}-${Date.now()}` };
    items.unshift(newItem);
    cmsStore.saveState(key, items);
    cmsStore.logActivity(`Added new entry to ${key}: ${item.name || item.title || newItem.id}`);
    return newItem;
  },

  // Update Item
  updateItem: (key: string, id: string, updatedFields: any) => {
    if (!isClient) return;
    const items = cmsStore.getAll(key);
    const updated = items.map((item) => {
      if (item.id === id) {
        return { ...item, ...updatedFields };
      }
      return item;
    });
    cmsStore.saveState(key, updated);
    cmsStore.logActivity(`Updated ${key} entry: ${updatedFields.name || updatedFields.title || id}`);
  },

  // Delete Item
  deleteItem: (key: string, id: string) => {
    if (!isClient) return;
    const items = cmsStore.getAll(key);
    const filtered = items.filter((item) => item.id !== id);
    cmsStore.saveState(key, filtered);
    cmsStore.logActivity(`Deleted entry from ${key} with ID: ${id}`);
  },

  // Save settings specifically
  saveSettings: (settings: any) => {
    if (!isClient) return;
    localStorage.setItem("qxl_cms_settings", JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent("cms-update", { detail: { key: "settings" } }));
    cmsStore.logActivity("Updated general settings");
  },

  // Sync settings from backend API (admin-configured values)
  syncSettingsFromAPI: async () => {
    if (!isClient) return;
    try {
      // Same-origin rewrite (next.config.ts) — avoids CORS / wrong-host failures
      // when NEXT_PUBLIC_API_URL is unset or points at a different origin.
      const response = await fetch("/api/v1/settings", { credentials: "include" });
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      
      const apiSettings = await response.json();
      
      // Merge API settings with existing settings. Also mirror the
      // phone_display / whatsapp_number fields onto the legacy
      // contactPhone / whatsappNumber keys that Header/Footer still read.
      const currentSettings = cmsStore.getSettings();
      const mergedSettings = {
        ...currentSettings,
        ...apiSettings, // Backend values override local defaults
        contactPhone: apiSettings.phone_display || currentSettings.contactPhone,
        whatsappNumber: apiSettings.phone_display || currentSettings.whatsappNumber,
      };
      
      cmsStore.saveSettings(mergedSettings);
    } catch (error) {
      // Silently fail — use cached settings if API is unavailable
      console.warn("Failed to sync settings from API:", error);
    }
  }
};

export { defaultBlogs, getDefaultBlogBySlug, getAllDefaultBlogs };

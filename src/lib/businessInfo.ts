// Centralized NAP (Name / Address / Phone) and business facts.
//
// SEO/Local-SEO requires the exact same name, address, and phone number
// everywhere the business is mentioned (site footer, header, structured
// data, Google Business Profile, directory listings, etc.). Import these
// constants instead of hardcoding phone/address strings in components.
//
// Contact info (phone, WhatsApp) is now admin-configurable via the backend
// SiteSettings API. These functions fetch from the CMS store which is
// synchronized with the backend.

import { cmsStore } from './cmsStore';

export const BUSINESS_NAME = "QXL Diagnostics";
export const BUSINESS_LEGAL_NAME = "QXL Diagnostics Super Speciality Lab";
export const BUSINESS_PARENT_COMPANY = "Qualitify Healthtech Pvt Ltd";

export const SITE_URL = "https://qxldiagnostics.com";

// Contact info — dynamically fetched from admin settings (SiteSettings API)
export const getPhoneDisplay = (): string => {
  const settings = cmsStore.getSettings();
  return settings?.phone_display || "+91 99646 39639";
};

export const getPhoneE164 = (): string => {
  const settings = cmsStore.getSettings();
  return settings?.phone_e164 || "+919964639639";
};

export const getWhatsAppNumber = (): string => {
  const settings = cmsStore.getSettings();
  return settings?.whatsapp_number || "919964639639";
};

export const getWhatsAppLink = (): string => {
  return `https://wa.me/${getWhatsAppNumber()}`;
};

// Fallback constants for static contexts (structured data, pre-render)
export const PHONE_DISPLAY = "+91 99646 39639";
export const PHONE_E164 = "+919964639639";
export const WHATSAPP_NUMBER = "919964639639";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const EMAIL = "qxldiagnostics@gmail.com";

/** NABL certificate number — must match Google Business / accreditation docs */
export const NABL_CERTIFICATE = "MC-6849";
/** Medical-lab quality standard (not ISO 9001) */
export const ISO_STANDARD = "ISO 15189:2022";

export interface BusinessLocation {
  slug: string;
  name: string;
  shortName: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  /** Single-line formatted address for display. */
  displayAddress: string;
  phone: string;
  lat: number;
  lng: number;
  isNabl: boolean;
  hours: string;
  googleMapsUrl: string;
}

export const LOCATIONS: BusinessLocation[] = [
  {
    slug: "kengeri-main-lab",
    name: "QXL Diagnostics — Kengeri Main Lab",
    shortName: "Kengeri Main Lab",
    streetAddress: "3rd Floor, SLN Complex, Mysore Road, Kengeri",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560060",
    addressCountry: "IN",
    displayAddress: "3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru 560060",
    phone: PHONE_DISPLAY,
    lat: 12.9113827,
    lng: 77.4850301,
    isNabl: true,
    hours: "Mon–Sat 7:00 AM–9:00 PM, Sun 7:00 AM–2:00 PM",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=QXL+Diagnostics+Kengeri+Bengaluru",
  },
  {
    slug: "yelahanka-north-hub",
    name: "QXL Diagnostics — Yelahanka North Hub",
    shortName: "Yelahanka North Hub",
    streetAddress: "L Square, opposite RMZ Galleria Mall, Yelahanka",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560064",
    addressCountry: "IN",
    displayAddress: "L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru 560064",
    phone: PHONE_DISPLAY,
    lat: 13.1007,
    lng: 77.5963,
    isNabl: true,
    hours: "Mon–Sat 7:00 AM–9:00 PM, Sun 7:00 AM–2:00 PM",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=QXL+Diagnostics+Yelahanka+Bengaluru",
  },
];

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/qxldiagnostics",
  linkedin: "https://www.linkedin.com/company/qxl-diagnostics",
  twitter: "https://twitter.com/qxldiagnostics",
  instagram: "https://www.instagram.com/qxldiagnostics",
};

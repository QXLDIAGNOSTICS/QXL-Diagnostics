/**
 * QXL Diagnostics — Central Site & Entity Configuration
 * Single Source of Truth for Legal Entity, Physical Labs, and Contact Details
 * 
 * Enforces unified brand NAP (Name, Address, Phone) across pages, schemas, and components.
 */

export const qxl = {
  brand: {
    name: "QXL Diagnostics",
    legalName: "Qualitify Healthtech Private Limited",
    tagline: "Doctor-Led Diagnostic Laboratory in Bengaluru",
    phoneDisplay: "+91 9964 639 639",
    phone: "+919964639639",
    whatsapp: "919964639639",
    email: "info@qxldiagnostics.com",
    website: "https://qxldiagnostics.com"
  },
  primaryLab: {
    id: "kengeri-main-lab",
    name: "QXL Diagnostics — Kengeri Main Laboratory",
    address1: "3rd Floor, SLN Complex, Mysore Road, Kengeri",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560060",
    country: "IN",
    walkInHours: "6:30 AM – 8:00 PM",
    laboratoryProcessing: "24×7",
    url: "/locations/kengeri"
  },
  northHub: {
    id: "yelahanka-north-hub",
    name: "QXL Diagnostics — Yelahanka North Hub",
    address1: "L Square, opposite RMZ Galleria Mall, Yelahanka",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560064",
    country: "IN",
    walkInHours: "7:00 AM – 8:00 PM",
    url: "/locations/yelahanka"
  },
  homeCollection: {
    start: "07:00",
    end: "21:00",
    url: "/home-blood-collection-bangalore"
  }
} as const;

export default qxl;

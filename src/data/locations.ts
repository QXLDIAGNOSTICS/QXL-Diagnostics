import type { QxlLocation } from "@/types/catalogue";

/**
 * QXL Diagnostics — Master Locations Directory
 * 
 * CRITICAL LOCAL SEO RULE:
 * Separate physical laboratories (with verified walk-in facilities, phone, and staff)
 * from dispatch hubs and doorstep service areas.
 * Only physical_lab entries receive DiagnosticLab / LocalBusiness schema.
 */
export const LOCATIONS: QxlLocation[] = [
  // ── PHYSICAL LABORATORIES ──────────────────────────────────────────────────
  {
    id: "kengeri",
    slug: "diagnostic-lab-kengeri",
    type: "physical_lab",
    publicName: "QXL Diagnostics — Kengeri Main Laboratory",
    address: {
      street: "3rd Floor, SLN Complex, Mysore Road, Kengeri",
      locality: "Kengeri",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560060",
      country: "IN"
    },
    phone: "+919964639639",
    walkInHours: "6:30 AM–8:00 PM Mon–Sun",
    processingHours: "24×7 emergency and laboratory processing",
    homeCollectionHours: "6:00 AM–8:00 PM Mon–Sun",
    lat: 12.9177,
    lng: 77.4837
  },

  // ── SERVICE DISPATCH HUBS (COLD-CHAIN COURIER & PHLEBOTOMY HUBS) ───────────
  {
    id: "yelahanka-hub",
    slug: "locations/yelahanka",
    type: "service_hub",
    publicName: "QXL Diagnostics — North Bengaluru Phlebotomy Dispatch Hub",
    address: {
      street: "L Square, Near RMZ Galleria Mall, Yelahanka",
      locality: "Yelahanka",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560064",
      country: "IN"
    },
    phone: "+919964639639",
    walkInHours: "7:00 AM–7:00 PM Mon–Sun (Phlebotomy station)",
    processingHours: "Centralized processing at Kengeri Main Lab",
    homeCollectionHours: "6:00 AM–8:00 PM Mon–Sun"
  },
  {
    id: "indiranagar-hub",
    slug: "locations/indiranagar",
    type: "service_hub",
    publicName: "QXL Diagnostics — East Bengaluru Express Phlebotomy Hub",
    phone: "+919964639639",
    homeCollectionHours: "6:00 AM–8:00 PM Mon–Sun",
    processingHours: "Centralized processing at Kengeri Main Lab"
  },
  {
    id: "whitefield-hub",
    slug: "locations/whitefield",
    type: "service_hub",
    publicName: "QXL Diagnostics — Whitefield IT Corridor Phlebotomy Hub",
    phone: "+919964639639",
    homeCollectionHours: "6:00 AM–8:00 PM Mon–Sun",
    processingHours: "Centralized processing at Kengeri Main Lab"
  },

  // ── DOORSTEP SERVICE COVERAGE LOCALITIES ────────────────────────────────────
  {
    id: "rajarajeshwari-nagar",
    slug: "locations/rajarajeshwari-nagar",
    type: "service_area",
    publicName: "QXL Home Blood Collection — Rajarajeshwari Nagar (RR Nagar)",
    homeCollectionHours: "6:00 AM–8:00 PM Mon–Sun"
  },
  {
    id: "nagarabhavi",
    slug: "locations/nagarabhavi",
    type: "service_area",
    publicName: "QXL Home Blood Collection — Nagarabhavi",
    homeCollectionHours: "6:00 AM–8:00 PM Mon–Sun"
  },
  {
    id: "vijayanagar",
    slug: "locations/vijayanagar",
    type: "service_area",
    publicName: "QXL Home Blood Collection — Vijayanagar",
    homeCollectionHours: "6:00 AM–8:00 PM Mon–Sun"
  },
  {
    id: "banashankari",
    slug: "locations/banashankari",
    type: "service_area",
    publicName: "QXL Home Blood Collection — Banashankari",
    homeCollectionHours: "6:00 AM–8:00 PM Mon–Sun"
  },
  {
    id: "jayanagar",
    slug: "locations/jayanagar",
    type: "service_area",
    publicName: "QXL Home Blood Collection — Jayanagar",
    homeCollectionHours: "6:00 AM–8:00 PM Mon–Sun"
  },
  {
    id: "koramangala",
    slug: "locations/koramangala",
    type: "service_area",
    publicName: "QXL Home Blood Collection — Koramangala",
    homeCollectionHours: "6:00 AM–8:00 PM Mon–Sun"
  },
  {
    id: "hsr-layout",
    slug: "locations/hsr-layout",
    type: "service_area",
    publicName: "QXL Home Blood Collection — HSR Layout",
    homeCollectionHours: "6:00 AM–8:00 PM Mon–Sun"
  },
  {
    id: "electronic-city",
    slug: "locations/electronic-city",
    type: "service_area",
    publicName: "QXL Home Blood Collection — Electronic City",
    homeCollectionHours: "6:00 AM–8:00 PM Mon–Sun"
  }
];

export const locationsById: Record<string, QxlLocation> = Object.fromEntries(
  LOCATIONS.map(l => [l.id, l])
);

export const KENGERI_MAIN_LAB = LOCATIONS[0];

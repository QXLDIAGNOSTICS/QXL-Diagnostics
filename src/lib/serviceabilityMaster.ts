/**
 * QXL Diagnostics — Central Serviceability Master
 * Single Source of Truth for Home Sample Collection & Geographical Logistics
 *
 * Governs PIN code validation, service zones, phlebotomy hubs,
 * operational slot timings, and uniform serviceability claims.
 */

export interface ServiceabilityEntry {
  pincode: string;
  locality: string;
  slug: string;
  zone: "South" | "West" | "North" | "East" | "Central";
  eligible: boolean;
  collection_fee: number; // 0 for free home collection
  minimum_order: number;
  first_slot: string;     // e.g. "06:30 AM"
  last_slot: string;      // e.g. "08:00 PM"
  processing_hub: string; // "Kengeri Central Reference Lab" | "Yelahanka North Hub"
  special_conditions?: string;
}

export const APPROVED_HOME_COLLECTION_CLAIM = 
  "Free home sample collection across eligible Bengaluru PIN codes (covering 60+ verified localities)";

export const SERVICEABILITY_MASTER: ServiceabilityEntry[] = [
  // ── SOUTH & WEST (SERVED BY KENGERI CENTRAL REFERENCE LAB) ────────────────
  { pincode: "560060", locality: "Kengeri", slug: "kengeri", zone: "West", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560059", locality: "Kengeri Satellite Town", slug: "kengeri", zone: "West", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560098", locality: "Rajarajeshwari Nagar (RR Nagar)", slug: "rajarajeshwari-nagar", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560072", locality: "Nagarabhavi", slug: "nagarabhavi", zone: "West", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560040", locality: "Vijayanagar", slug: "vijayanagar", zone: "West", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560026", locality: "Mysore Road", slug: "mysore-road", zone: "West", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560085", locality: "Banashankari 3rd Stage", slug: "banashankari", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560070", locality: "Banashankari 2nd Stage", slug: "banashankari", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560011", locality: "Jayanagar", slug: "jayanagar", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560078", locality: "JP Nagar", slug: "jp-nagar", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560061", locality: "Uttarahalli", slug: "uttarahalli", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560062", locality: "Kanakapura Road", slug: "kanakapura-road", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560076", locality: "Bannerghatta Road", slug: "bannerghatta-road", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560068", locality: "Bommanahalli", slug: "bommanahalli", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560029", locality: "BTM Layout", slug: "btm-layout", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560102", locality: "HSR Layout", slug: "hsr-layout", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560034", locality: "Koramangala", slug: "koramangala", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560100", locality: "Electronic City", slug: "electronic-city", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560035", locality: "Sarjapur Road", slug: "sarjapur-road", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560103", locality: "Bellandur", slug: "bellandur", zone: "East", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },

  // ── EAST BENGALURU ─────────────────────────────────────────────────────────
  { pincode: "560066", locality: "Whitefield", slug: "whitefield", zone: "East", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560037", locality: "Marathahalli", slug: "marathahalli", zone: "East", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560048", locality: "Mahadevapura", slug: "mahadevapura", zone: "East", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560036", locality: "KR Puram", slug: "kr-puram", zone: "East", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560038", locality: "Indiranagar", slug: "indiranagar", zone: "East", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560071", locality: "Domlur", slug: "domlur", zone: "East", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560008", locality: "Ulsoor (Halasuru)", slug: "ulsoor", zone: "Central", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560016", locality: "Ramamurthy Nagar", slug: "ramamurthy-nagar", zone: "East", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560043", locality: "Banaswadi", slug: "banaswadi", zone: "East", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560043", locality: "Kalyan Nagar", slug: "kalyan-nagar", zone: "East", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560077", locality: "Hennur", slug: "hennur", zone: "North", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Yelahanka North Hub" },

  // ── NORTH BENGALURU (SERVED BY YELAHANKA NORTH HUB) ───────────────────────
  { pincode: "560064", locality: "Yelahanka", slug: "yelahanka", zone: "North", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Yelahanka North Hub" },
  { pincode: "560092", locality: "Sahakara Nagar", slug: "sahakara-nagar", zone: "North", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Yelahanka North Hub" },
  { pincode: "560024", locality: "Hebbal", slug: "hebbal", zone: "North", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Yelahanka North Hub" },
  { pincode: "560097", locality: "Vidyaranyapura", slug: "vidyaranyapura", zone: "North", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Yelahanka North Hub" },
  { pincode: "560094", locality: "Sanjaynagar", slug: "sanjaynagar", zone: "North", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Yelahanka North Hub" },
  { pincode: "560013", locality: "Jalahalli", slug: "jalahalli", zone: "North", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Yelahanka North Hub" },
  { pincode: "560058", locality: "Peenya", slug: "peenya", zone: "West", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Yelahanka North Hub" },
  { pincode: "560022", locality: "Yeshwanthpur", slug: "yeshwanthpur", zone: "North", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Yelahanka North Hub" },
  { pincode: "560003", locality: "Malleshwaram", slug: "malleshwaram", zone: "West", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Yelahanka North Hub" },
  { pincode: "560010", locality: "Rajajinagar", slug: "rajajinagar", zone: "West", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560079", locality: "Basaveshwaranagar", slug: "basaveshwaranagar", zone: "West", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560086", locality: "Mahalakshmi Layout", slug: "mahalakshmi-layout", zone: "West", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560023", locality: "Magadi Road", slug: "magadi-road", zone: "West", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },

  // ── CENTRAL BENGALURU ──────────────────────────────────────────────────────
  { pincode: "560005", locality: "Frazer Town", slug: "frazer-town", zone: "Central", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560051", locality: "Shivajinagar", slug: "shivajinagar", zone: "Central", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560052", locality: "Vasanth Nagar", slug: "vasanth-nagar", zone: "Central", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560001", locality: "MG Road", slug: "mg-road", zone: "Central", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560025", locality: "Richmond Town", slug: "richmond-town", zone: "Central", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560027", locality: "Shantinagar", slug: "shantinagar", zone: "Central", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560030", locality: "Wilson Garden", slug: "wilson-garden", zone: "Central", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560004", locality: "Basavanagudi", slug: "basavanagudi", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560070", locality: "Padmanabhanagar", slug: "padmanabhanagar", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560078", locality: "Kumaraswamy Layout", slug: "kumaraswamy-layout", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560062", locality: "Yelachenahalli", slug: "yelachenahalli", zone: "South", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560039", locality: "Nayandahalli", slug: "nayandahalli", zone: "West", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560040", locality: "Chandra Layout", slug: "chandra-layout", zone: "West", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "560074", locality: "Kumbalgodu", slug: "kumbalgodu", zone: "West", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "06:30 AM", last_slot: "08:00 PM", processing_hub: "Kengeri Central Reference Lab" },
  { pincode: "562110", locality: "Devanahalli", slug: "devanahalli", zone: "North", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "07:00 AM", last_slot: "07:00 PM", processing_hub: "Yelahanka North Hub" },
  { pincode: "560300", locality: "Bengaluru Airport (KIADB)", slug: "bengaluru-airport", zone: "North", eligible: true, collection_fee: 0, minimum_order: 0, first_slot: "07:00 AM", last_slot: "07:00 PM", processing_hub: "Yelahanka North Hub" },
];

/**
 * Check if a 6-digit PIN code is serviceable.
 */
export function isPincodeEligible(pincode: string): boolean {
  const cleanPin = pincode.trim();
  return SERVICEABILITY_MASTER.some((entry) => entry.pincode === cleanPin && entry.eligible);
}

/**
 * Get detailed serviceability entry by PIN code.
 */
export function getServiceabilityByPincode(pincode: string): ServiceabilityEntry | undefined {
  const cleanPin = pincode.trim();
  return SERVICEABILITY_MASTER.find((entry) => entry.pincode === cleanPin);
}

/**
 * Get all unique serviceable PIN codes.
 */
export function getServiceablePincodes(): string[] {
  return Array.from(new Set(SERVICEABILITY_MASTER.filter((e) => e.eligible).map((e) => e.pincode)));
}


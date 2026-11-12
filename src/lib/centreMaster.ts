/**
 * QXL DIAGNOSTICS — PHYSICAL CENTRE MASTER (SINGLE SOURCE OF TRUTH)
 * Governs all physical facilities, laboratory hubs, and collection centers.
 * 
 * Clinical Rule: Distinguishes full reference laboratory capabilities
 * (Kengeri Central Lab) from regional accessioning hubs (Yelahanka North Hub).
 */

export interface PhysicalCentre {
  id: string;
  name: string;
  shortName: string;
  type: 'CENTRAL_REFERENCE_LAB' | 'REGIONAL_PROCESSING_HUB' | 'COLLECTION_CENTRE';
  isPhysicalHub: boolean;
  address: {
    building: string;
    street: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    fullFormatted: string;
    landmarks?: string;
  };
  geo: {
    lat: number;
    lng: number;
  };
  contact: {
    phoneDisplay: string;
    phoneE164: string;
    email: string;
    whatsappNumber: string;
  };
  operatingHours: {
    walkIn: string;
    processing: string;
    emergencyStatTesting: string;
  };
  nablScope: {
    isNablFacility: boolean;
    certificateNumber: string;
    scopeNote: string;
  };
  capabilities: string[];
}

export const CENTRE_MASTER: Record<string, PhysicalCentre> = {
  KENGERI_MAIN_LAB: {
    id: "CTR-BLR-KNG-01",
    name: "QXL Diagnostics Super Speciality Reference Laboratory",
    shortName: "Kengeri Central Lab",
    type: "CENTRAL_REFERENCE_LAB",
    isPhysicalHub: true,
    address: {
      building: "3rd Floor, SLN Complex",
      street: "Mysore Road",
      locality: "Kengeri",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560060",
      fullFormatted: "3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru, Karnataka 560060",
      landmarks: "Near Kengeri Bus Terminal / Metro Station",
    },
    geo: {
      lat: 12.9177,
      lng: 77.4838,
    },
    contact: {
      phoneDisplay: "+91 9964 639 639",
      phoneE164: "+919964639639",
      email: "info@qxldiagnostics.com",
      whatsappNumber: "919964639639",
    },
    operatingHours: {
      walkIn: "6:30 AM – 8:00 PM (Monday – Sunday)",
      processing: "24×7 Central Laboratory & Emergency Processing",
      emergencyStatTesting: "24×7 Available for Inpatient and Critical Care Hospital Partners",
    },
    nablScope: {
      isNablFacility: true,
      certificateNumber: "MC-6849",
      scopeNote: "Primary accredited medical testing facility under ISO 15189:2022 standard.",
    },
    capabilities: [
      "Clinical Biochemistry",
      "Haematology & Coagulation",
      "Clinical Pathology",
      "Serology & Immunology",
      "Microbiology & Molecular Infectious Disease",
      "Histopathology & Cytopathology",
      "Central Cold-Chain Storage & B2B Logistics Routing",
    ],
  },

  YELAHANKA_NORTH_HUB: {
    id: "CTR-BLR-YLH-02",
    name: "QXL Diagnostics North Bengaluru Regional Accessioning Hub",
    shortName: "Yelahanka North Hub",
    type: "REGIONAL_PROCESSING_HUB",
    isPhysicalHub: true,
    address: {
      building: "L Square",
      street: "Opposite RMZ Galleria Mall",
      locality: "Yelahanka",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560064",
      fullFormatted: "L Square, Opposite RMZ Galleria Mall, Yelahanka, Bengaluru, Karnataka 560064",
      landmarks: "Opposite RMZ Galleria Mall",
    },
    geo: {
      lat: 13.1007,
      lng: 77.5963,
    },
    contact: {
      phoneDisplay: "+91 9964 639 639",
      phoneE164: "+919964639639",
      email: "info@qxldiagnostics.com",
      whatsappNumber: "919964639639",
    },
    operatingHours: {
      walkIn: "7:00 AM – 8:00 PM (Monday – Sunday)",
      processing: "7:00 AM – 8:30 PM (Pre-analytical centrifugation & regional dispatch)",
      emergencyStatTesting: "Primary centrifugation & rapid courier transfer to Kengeri Central Lab",
    },
    nablScope: {
      isNablFacility: true,
      certificateNumber: "MC-6849",
      scopeNote: "Operating under central clinical governance and NABL quality management systems.",
    },
    capabilities: [
      "Patient Walk-in Sample Collection",
      "North Bengaluru Phlebotomy Field Dispatch Base",
      "Immediate Centrifugation & Cold-Chain Pre-Analytical Packaging",
      "Rapid Express Transit Link to Kengeri Central Lab",
    ],
  },
};

/**
 * Helper to retrieve a centre by ID or key
 */
export function getCentre(keyOrId: string): PhysicalCentre | undefined {
  if (CENTRE_MASTER[keyOrId]) return CENTRE_MASTER[keyOrId];
  return Object.values(CENTRE_MASTER).find(
    (c) => c.id.toLowerCase() === keyOrId.toLowerCase() || c.shortName.toLowerCase() === keyOrId.toLowerCase()
  );
}

/**
 * Returns all active physical diagnostic centres
 */
export function getAllCentres(): PhysicalCentre[] {
  return Object.values(CENTRE_MASTER);
}


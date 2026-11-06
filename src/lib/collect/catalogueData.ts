/**
 * QXL COLLECT — CATALOGUE & PRE-ANALYTICAL SOP DATA
 * Master specifications for vacutainer tubes, container mapping, Bengaluru service zones,
 * and phlebotomist roster.
 */

import { ContainerType, SpecimenRequirement, CollectorProfile } from './types';

// ── 1. PRE-ANALYTICAL VACUTAINER & CONTAINER SOP MATRIX ──────────────────────

export const CONTAINER_SOP_MAP: Record<ContainerType, SpecimenRequirement> = {
  EDTA_LAVENDER: {
    containerType: 'EDTA_LAVENDER',
    tubeName: 'K2 EDTA Lavender Top Tube',
    nominalVolumeMl: 3.0,
    minimumVolumeMl: 1.5,
    inversionCount: 8,
    transportTemp: '2-8C',
    maxTransportHours: 24,
    centrifugationRequired: false,
    specialHandlingNotes: 'Mix gently 8–10 times immediately after venipuncture to prevent micro-clots.'
  },
  SST_GOLD_YELLOW: {
    containerType: 'SST_GOLD_YELLOW',
    tubeName: 'SST Gold Gel-Separator Tube (Serum)',
    nominalVolumeMl: 5.0,
    minimumVolumeMl: 2.0,
    inversionCount: 5,
    transportTemp: '2-8C',
    maxTransportHours: 24,
    centrifugationRequired: true,
    specialHandlingNotes: 'Allow 30 min upright clot formation before refrigeration. Do not freeze whole tube.'
  },
  SODIUM_FLUORIDE_GREY: {
    containerType: 'SODIUM_FLUORIDE_GREY',
    tubeName: 'Sodium Fluoride / Potassium Oxalate Grey Top Tube',
    nominalVolumeMl: 2.0,
    minimumVolumeMl: 1.0,
    inversionCount: 8,
    transportTemp: '2-8C',
    maxTransportHours: 24,
    centrifugationRequired: false,
    specialHandlingNotes: 'Glycolytic inhibitor tube for plasma glucose. Invert 8 times promptly.'
  },
  SODIUM_CITRATE_BLUE: {
    containerType: 'SODIUM_CITRATE_BLUE',
    tubeName: '3.2% Buffered Sodium Citrate Light Blue Top Tube',
    nominalVolumeMl: 2.7,
    minimumVolumeMl: 2.4, // Strict 9:1 blood to anticoagulant ratio
    inversionCount: 4,
    transportTemp: '15-25C',
    maxTransportHours: 4,
    centrifugationRequired: true,
    specialHandlingNotes: 'Strict fill volume critical: exactly to the fill mark (9:1 ratio). Underfilling rejects test.'
  },
  HEPARIN_GREEN: {
    containerType: 'HEPARIN_GREEN',
    tubeName: 'Sodium Heparin Green Top Tube',
    nominalVolumeMl: 4.0,
    minimumVolumeMl: 2.0,
    inversionCount: 8,
    transportTemp: '2-8C',
    maxTransportHours: 12,
    centrifugationRequired: false,
    specialHandlingNotes: 'Invert gently 8 times.'
  },
  STERILE_URINE_CONTAINER: {
    containerType: 'STERILE_URINE_CONTAINER',
    tubeName: 'Sterile Screw-Cap Specimen Container (Urine)',
    nominalVolumeMl: 30.0,
    minimumVolumeMl: 10.0,
    inversionCount: 0,
    transportTemp: '2-8C',
    maxTransportHours: 6,
    centrifugationRequired: false,
    specialHandlingNotes: 'First-catch or mid-stream clean catch as clinically instructed. Keep chilled.'
  },
  VIRAL_TRANSPORT_MEDIUM: {
    containerType: 'VIRAL_TRANSPORT_MEDIUM',
    tubeName: 'VTM Vial with Dacron/Flocked Swab',
    nominalVolumeMl: 3.0,
    minimumVolumeMl: 2.0,
    inversionCount: 0,
    transportTemp: '2-8C',
    maxTransportHours: 24,
    centrifugationRequired: false,
    specialHandlingNotes: 'Break swab applicator cleanly at scored breakpoint into VTM vial.'
  },
  STOOL_CONTAINER: {
    containerType: 'STOOL_CONTAINER',
    tubeName: 'Sterile Stool Specimen Vial with Spoon',
    nominalVolumeMl: 15.0,
    minimumVolumeMl: 5.0,
    inversionCount: 0,
    transportTemp: '2-8C',
    maxTransportHours: 12,
    centrifugationRequired: false,
    specialHandlingNotes: 'Collect stool specimen without urine contamination.'
  }
};

// ── 2. TEST TO CONTAINER & ITDOSE MAPPING ────────────────────────────────────

export interface TestPreAnalyticalProfile {
  testId: string;
  itdoseCode: string;
  name: string;
  sampleType: string;
  fasting: boolean;
  requiredContainers: ContainerType[];
  tatHours: number;
}

export const TEST_PRE_ANALYTICAL_DIRECTORY: Record<string, TestPreAnalyticalProfile> = {
  'cbc': {
    testId: 'cbc',
    itdoseCode: 'ITD-HAEM-001',
    name: 'Complete Blood Count (CBC with Automated 5-Part Differential)',
    sampleType: 'Whole Blood EDTA',
    fasting: false,
    requiredContainers: ['EDTA_LAVENDER'],
    tatHours: 4
  },
  'lipid-profile': {
    testId: 'lipid-profile',
    itdoseCode: 'ITD-BIO-012',
    name: 'Lipid Profile Comprehensive',
    sampleType: 'Serum',
    fasting: true,
    requiredContainers: ['SST_GOLD_YELLOW'],
    tatHours: 6
  },
  'lft': {
    testId: 'lft',
    itdoseCode: 'ITD-BIO-015',
    name: 'Liver Function Test (LFT with Enzymes & Proteins)',
    sampleType: 'Serum',
    fasting: false,
    requiredContainers: ['SST_GOLD_YELLOW'],
    tatHours: 6
  },
  'kft': {
    testId: 'kft',
    itdoseCode: 'ITD-BIO-018',
    name: 'Kidney Function Test (KFT / RFT with Electrolytes)',
    sampleType: 'Serum',
    fasting: false,
    requiredContainers: ['SST_GOLD_YELLOW'],
    tatHours: 6
  },
  'glucose-fasting': {
    testId: 'glucose-fasting',
    itdoseCode: 'ITD-BIO-003',
    name: 'Fasting Blood Glucose (FBS)',
    sampleType: 'Fluoride Plasma',
    fasting: true,
    requiredContainers: ['SODIUM_FLUORIDE_GREY'],
    tatHours: 4
  },
  'hba1c': {
    testId: 'hba1c',
    itdoseCode: 'ITD-BIO-005',
    name: 'HbA1c (Glycated Hemoglobin by HPLC)',
    sampleType: 'Whole Blood EDTA',
    fasting: false,
    requiredContainers: ['EDTA_LAVENDER'],
    tatHours: 4
  },
  'thyroid-profile': {
    testId: 'thyroid-profile',
    itdoseCode: 'ITD-IMM-022',
    name: 'Thyroid Function Profile (Total T3, Total T4, Ultra TSH)',
    sampleType: 'Serum',
    fasting: false,
    requiredContainers: ['SST_GOLD_YELLOW'],
    tatHours: 6
  },
  'vitamin-d': {
    testId: 'vitamin-d',
    itdoseCode: 'ITD-IMM-031',
    name: 'Vitamin D 25-Hydroxy (25-OH Vitamin D Total)',
    sampleType: 'Serum',
    fasting: false,
    requiredContainers: ['SST_GOLD_YELLOW'],
    tatHours: 8
  },
  'vitamin-b12': {
    testId: 'vitamin-b12',
    itdoseCode: 'ITD-IMM-035',
    name: 'Vitamin B12 (Cyanocobalamin)',
    sampleType: 'Serum',
    fasting: false,
    requiredContainers: ['SST_GOLD_YELLOW'],
    tatHours: 8
  },
  'hiv-screening': {
    testId: 'hiv-screening',
    itdoseCode: 'ITD-SERO-041',
    name: 'HIV-1 & HIV-2 4th Generation Ag/Ab Duo Screen',
    sampleType: 'Serum',
    fasting: false,
    requiredContainers: ['SST_GOLD_YELLOW'],
    tatHours: 6
  },
  'vdrl-rpr': {
    testId: 'vdrl-rpr',
    itdoseCode: 'ITD-SERO-044',
    name: 'VDRL / RPR Syphilis Screen with Quantitative Titer',
    sampleType: 'Serum',
    fasting: false,
    requiredContainers: ['SST_GOLD_YELLOW'],
    tatHours: 6
  },
  'chlamydia-gonorrhea-pcr': {
    testId: 'chlamydia-gonorrhea-pcr',
    itdoseCode: 'ITD-MOL-088',
    name: 'Chlamydia trachomatis & Neisseria gonorrhoeae Real-Time PCR (NAAT)',
    sampleType: 'First-catch Urine',
    fasting: false,
    requiredContainers: ['STERILE_URINE_CONTAINER'],
    tatHours: 24
  },
  'pt-inr': {
    testId: 'pt-inr',
    itdoseCode: 'ITD-COAG-002',
    name: 'Prothrombin Time with INR (PT/INR)',
    sampleType: 'Citrated Plasma',
    fasting: false,
    requiredContainers: ['SODIUM_CITRATE_BLUE'],
    tatHours: 4
  }
};

// ── 3. BENGALURU SERVICE ZONES & PINCODE MATRIX ──────────────────────────────

export interface ServiceZone {
  zoneId: string;
  zoneName: string;
  servicingHub: 'KENGERI_REFERENCE_LAB' | 'YELAHANKA_HUB';
  leadTransitHours: number;
  coveredPincodes: string[];
  activeCollectorCapacity: number;
}

export const SERVICE_ZONES: ServiceZone[] = [
  {
    zoneId: 'ZONE_SOUTH_WEST',
    zoneName: 'South-West Bengaluru (Kengeri, RR Nagar, Nagarbhavi, Vijayanagar)',
    servicingHub: 'KENGERI_REFERENCE_LAB',
    leadTransitHours: 0.75,
    coveredPincodes: ['560060', '560098', '560072', '560040', '560085', '560056', '560039'],
    activeCollectorCapacity: 6
  },
  {
    zoneId: 'ZONE_NORTH',
    zoneName: 'North Bengaluru (Yelahanka, Hebbal, Sahakara Nagar, Vidyaranyapura)',
    servicingHub: 'YELAHANKA_HUB',
    leadTransitHours: 1.0,
    coveredPincodes: ['560064', '560092', '560024', '560097', '560065', '560077'],
    activeCollectorCapacity: 4
  },
  {
    zoneId: 'ZONE_CENTRAL_EAST',
    zoneName: 'Central & East Bengaluru (Indiranagar, Koramangala, Domlur, CBD)',
    servicingHub: 'KENGERI_REFERENCE_LAB',
    leadTransitHours: 1.5,
    coveredPincodes: ['560038', '560034', '560001', '560025', '560008', '560071'],
    activeCollectorCapacity: 5
  },
  {
    zoneId: 'ZONE_TECH_CORRIDOR',
    zoneName: 'East Tech Corridor (Whitefield, Bellandur, Marathahalli, HSR Layout)',
    servicingHub: 'KENGERI_REFERENCE_LAB',
    leadTransitHours: 1.75,
    coveredPincodes: ['560066', '560103', '560037', '560102', '560048', '560067'],
    activeCollectorCapacity: 4
  },
  {
    zoneId: 'ZONE_SOUTH',
    zoneName: 'South Bengaluru (Jayanagar, JP Nagar, Banashankari, BTM)',
    servicingHub: 'KENGERI_REFERENCE_LAB',
    leadTransitHours: 1.25,
    coveredPincodes: ['560011', '560078', '560070', '560076', '560068', '560041'],
    activeCollectorCapacity: 5
  }
];

// ── 4. PHLEBOTOMIST ROSTER ───────────────────────────────────────────────────

export const PHLEBOTOMIST_ROSTER: CollectorProfile[] = [
  {
    collectorId: 'QXL-COL-101',
    fullName: 'Ramesh Gowda',
    mobileNumber: '+91 98450 11223',
    homeBaseZone: 'ZONE_SOUTH_WEST',
    currentLat: 12.915,
    currentLng: 77.485,
    shiftHours: '06:00 - 14:00',
    competencies: ['ROUTINE_VENIPUNCTURE', 'GERIATRIC', 'DIFFICULT_DRAW'],
    activeJobsCount: 2,
    dailyCapacityMax: 8,
    isOnDuty: true
  },
  {
    collectorId: 'QXL-COL-102',
    fullName: 'Priya Sundaram',
    mobileNumber: '+91 97420 33445',
    homeBaseZone: 'ZONE_NORTH',
    currentLat: 13.101,
    currentLng: 77.596,
    shiftHours: '06:30 - 14:30',
    competencies: ['ROUTINE_VENIPUNCTURE', 'PEDIATRIC', 'SWAB_COLLECTION'],
    activeJobsCount: 1,
    dailyCapacityMax: 8,
    isOnDuty: true
  },
  {
    collectorId: 'QXL-COL-103',
    fullName: 'Karthik Balaji',
    mobileNumber: '+91 99001 55667',
    homeBaseZone: 'ZONE_CENTRAL_EAST',
    currentLat: 12.971,
    currentLng: 77.641,
    shiftHours: '06:00 - 14:00',
    competencies: ['ROUTINE_VENIPUNCTURE', 'DIFFICULT_DRAW', 'SWAB_COLLECTION'],
    activeJobsCount: 3,
    dailyCapacityMax: 8,
    isOnDuty: true
  },
  {
    collectorId: 'QXL-COL-104',
    fullName: 'Siddhesh Nambiar',
    mobileNumber: '+91 96112 77889',
    homeBaseZone: 'ZONE_TECH_CORRIDOR',
    currentLat: 12.969,
    currentLng: 77.749,
    shiftHours: '07:00 - 15:00',
    competencies: ['ROUTINE_VENIPUNCTURE', 'PEDIATRIC'],
    activeJobsCount: 1,
    dailyCapacityMax: 7,
    isOnDuty: true
  },
  {
    collectorId: 'QXL-COL-105',
    fullName: 'Manjunath Reddy',
    mobileNumber: '+91 98863 99001',
    homeBaseZone: 'ZONE_SOUTH',
    currentLat: 12.925,
    currentLng: 77.583,
    shiftHours: '06:00 - 14:00',
    competencies: ['ROUTINE_VENIPUNCTURE', 'GERIATRIC', 'DIFFICULT_DRAW'],
    activeJobsCount: 2,
    dailyCapacityMax: 8,
    isOnDuty: true
  }
];

// ── 5. TIME SLOTS INVENTORY ──────────────────────────────────────────────────

export interface TimeSlotWindow {
  startTime: string;
  endTime: string;
  label: string;
  isFastingPriority: boolean;
}

export const APPOINTMENT_TIME_SLOTS: TimeSlotWindow[] = [
  { startTime: '06:30', endTime: '07:30', label: '06:30 AM – 07:30 AM (Fasting Priority)', isFastingPriority: true },
  { startTime: '07:30', endTime: '08:30', label: '07:30 AM – 08:30 AM (Fasting Priority)', isFastingPriority: true },
  { startTime: '08:30', endTime: '09:30', label: '08:30 AM – 09:30 AM (Fasting Priority)', isFastingPriority: true },
  { startTime: '09:30', endTime: '10:30', label: '09:30 AM – 10:30 AM (Regular / Post-Meal)', isFastingPriority: false },
  { startTime: '10:30', endTime: '11:30', label: '10:30 AM – 11:30 AM (Regular Collection)', isFastingPriority: false },
  { startTime: '11:30', endTime: '13:00', label: '11:30 AM – 01:00 PM (Afternoon Window)', isFastingPriority: false },
  { startTime: '15:00', endTime: '17:00', label: '03:00 PM – 05:00 PM (Evening Non-Fasting)', isFastingPriority: false }
];


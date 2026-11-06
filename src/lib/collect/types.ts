/**
 * QXL COLLECT — EIGHT-STAGE WORKFLOW TYPES & DATA MODELS
 * Authoritative TypeScript specifications for QXL Diagnostics Home Collection Management Platform
 * Conforming to Developer Functional & Technical Specification V1.0 (Nov 2026)
 */

// ── 1. MASTER ENUMS & SEPARATE STATE MACHINES ────────────────────────────────

export type BookingStatus =
  | 'DRAFT'
  | 'PENDING_PAYMENT'
  | 'CONFIRMED'
  | 'ALLOCATED'
  | 'EN_ROUTE'
  | 'IN_PROGRESS'
  | 'COLLECTED'
  | 'IN_TRANSIT'
  | 'ACCESSIONED'
  | 'TESTING'
  | 'AUTHORIZED'
  | 'DELIVERED'
  | 'FAILED_RECOLLECT'
  | 'CANCELLED';

export type PaymentStatus =
  | 'PENDING'
  | 'VERIFIED'
  | 'PAY_AT_COLLECTION'
  | 'FAILED'
  | 'PARTIALLY_REFUNDED'
  | 'REFUNDED';

export type JobStatus =
  | 'UNASSIGNED'
  | 'ALLOCATED'
  | 'ACKNOWLEDGED'
  | 'EN_ROUTE'
  | 'ARRIVED'
  | 'IN_PROGRESS'
  | 'COLLECTION_COMPLETE'
  | 'FAILED'
  | 'CANCELLED';

export type SpecimenStatus =
  | 'ORDERED'
  | 'LABEL_PRINTED'
  | 'COLLECTED'
  | 'IN_TRANSIT'
  | 'HUB_RECEIVED'
  | 'LAB_RECEIVED'
  | 'ACCESSIONED'
  | 'REJECTED'
  | 'ON_HOLD'
  | 'PROCESSED';

export type LisSyncStatus =
  | 'NOT_APPLICABLE'
  | 'PENDING'
  | 'SYNCED'
  | 'FAILED_RETRY'
  | 'DEAD_LETTER';

export type ReportStatus =
  | 'NOT_READY'
  | 'PROCESSING'
  | 'CLINICALLY_UNDER_REVIEW'
  | 'PARTIALLY_AUTHORIZED'
  | 'AUTHORIZED'
  | 'AMENDED'
  | 'REVOKED';

export type BookingSource = 'WEBSITE' | 'WHATSAPP' | 'CALL_CENTRE' | 'INSTITUTIONAL_PARTNER';

export type UserRole =
  | 'PATIENT'
  | 'CUSTOMER_SERVICE'
  | 'DISPATCHER'
  | 'PHLEBOTOMIST'
  | 'COURIER_RUNNER'
  | 'LAB_ACCESSION_TECH'
  | 'AUTHORIZED_SIGNATORY'
  | 'QUALITY_MANAGER'
  | 'FINANCE'
  | 'CEO_MANAGEMENT';

// ── 2. PRE-ANALYTICAL SPECIMEN & CONTAINER TYPES ─────────────────────────────

export type ContainerType =
  | 'EDTA_LAVENDER'
  | 'SST_GOLD_YELLOW'
  | 'SODIUM_FLUORIDE_GREY'
  | 'SODIUM_CITRATE_BLUE'
  | 'HEPARIN_GREEN'
  | 'STERILE_URINE_CONTAINER'
  | 'VIRAL_TRANSPORT_MEDIUM'
  | 'STOOL_CONTAINER';

export interface SpecimenRequirement {
  containerType: ContainerType;
  tubeName: string;
  nominalVolumeMl: number;
  minimumVolumeMl: number;
  inversionCount: number;
  transportTemp: '2-8C' | '15-25C' | 'FROZEN_MINUS_20C';
  maxTransportHours: number;
  centrifugationRequired: boolean;
  specialHandlingNotes?: string;
}

// ── 3. CORE ENTITY SCHEMAS ───────────────────────────────────────────────────

export interface PatientInfo {
  patientId: string;       // QXL-PAT-XXXXXX
  fullName: string;
  dateOfBirth: string;     // YYYY-MM-DD
  ageYears?: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  mobileNumber: string;
  email?: string;
  relationshipToBooker: 'SELF' | 'SPOUSE' | 'CHILD' | 'PARENT' | 'OTHER';
}

export interface CollectionAddress {
  houseFlat: string;
  streetName: string;
  locality: string;        // e.g. "Kengeri", "Yelahanka", "Indiranagar"
  pincode: string;         // 6-digit Bengaluru PIN code
  landmark?: string;
  elevatorAvailable: boolean;
  specialAccessInstructions?: string;
  latitude?: number;
  longitude?: number;
}

export interface OrderItemSnapshot {
  testId: string;
  testName: string;
  kind: 'test' | 'package';
  priceSnapshot: number;
  mrpSnapshot: number;
  fastingRequired: boolean;
  sampleType: string;
  tatHours: number;
  requiredContainers: ContainerType[];
}

export interface BookingPatientEntry {
  patient: PatientInfo;
  orderItems: OrderItemSnapshot[];
  itemTotal: number;
}

export interface SlotReservation {
  slotDate: string;        // YYYY-MM-DD
  slotStartTime: string;   // e.g. "06:30"
  slotEndTime: string;     // e.g. "07:30"
  isFastingPriority: boolean;
  zoneId: string;
  expiresAt: string;       // ISO Timestamp (15 min hold)
}

export interface BookingRecord {
  bookingId: string;       // QXL-HC-YYYYMMDD-XXXX
  orderId: string;         // QXL-ORD-XXXXXX
  source: BookingSource;
  createdAt: string;       // ISO Timestamp
  updatedAt: string;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  
  // Patients & Items
  patients: BookingPatientEntry[];
  address: CollectionAddress;
  slot: SlotReservation;
  
  // Financials
  grossAmount: number;
  discountAmount: number;
  collectionFee: number;
  netPayable: number;
  currency: 'INR';
  
  // Consent
  consentVersion: string;
  sensitiveClinicalConsentAccepted: boolean;
  promotionalConsentAccepted: boolean;
  
  // Relationships
  assignedJobId?: string;
  paymentId?: string;
  cancellationReason?: string;
}

// ── 4. STAGE 03 DISPATCH & JOB ───────────────────────────────────────────────

export interface CollectorProfile {
  collectorId: string;     // QXL-COL-XXXX
  fullName: string;
  mobileNumber: string;
  homeBaseZone: string;
  currentLat?: number;
  currentLng?: number;
  shiftHours: string;      // "06:00 - 14:00"
  competencies: Array<'ROUTINE_VENIPUNCTURE' | 'PEDIATRIC' | 'GERIATRIC' | 'DIFFICULT_DRAW' | 'SWAB_COLLECTION'>;
  activeJobsCount: number;
  dailyCapacityMax: number;
  isOnDuty: boolean;
}

export interface FieldJob {
  jobId: string;           // QXL-JOB-XXXXXX
  bookingId: string;
  collectorId?: string;
  jobStatus: JobStatus;
  scheduledDate: string;
  scheduledTimeWindow: string;
  allocatedAt?: string;
  acknowledgedAt?: string;
  enRouteAt?: string;
  arrivedAt?: string;
  completedAt?: string;
  slaBreachRisk?: boolean;
  collectorNotes?: string;
  manualOverrideReason?: string;
  dispatcherId?: string;
}

// ── 5. STAGE 04 BEDSIDE SPECIMEN ─────────────────────────────────────────────

export interface BedsideSpecimen {
  specimenId: string;      // QXL-SPC-YYYYMMDD-XXXX
  bookingId: string;
  patientId: string;
  patientName: string;
  associatedTestIds: string[];
  containerType: ContainerType;
  tubeColor: string;
  barcode: string;         // Encodes specimenId
  status: SpecimenStatus;
  collectedAt?: string;
  collectorId?: string;
  volumeCollectedMl?: number;
  drawDifficulty?: 'NORMAL' | 'FRAGILE_VEIN' | 'PEDIATRIC_RESTRAINT' | 'SECOND_ATTEMPT';
  complicationsNotes?: string;
  verifiedWithTwoIdentifiers: boolean;
  firstIdentifier: string; // "Full Name"
  secondIdentifier: string;// "DOB (YYYY-MM-DD)" or "Patient ID"
}

// ── 6. STAGE 05 LOGISTICS & MANIFEST ─────────────────────────────────────────

export interface TransportManifest {
  manifestId: string;      // QXL-MFT-YYYYMMDD-XXXX
  originType: 'COLLECTOR_BAG' | 'NORTH_HUB' | 'KENGERI_LAB';
  destinationLab: 'KENGERI_REFERENCE_LAB' | 'YELAHANKA_HUB';
  riderUserId: string;
  riderName: string;
  vehicleMode: 'TWO_WHEELER_COLD_BOX' | 'VAN';
  insulatedBoxId: string;
  specimenIds: string[];
  createdAt: string;
  dispatchedAt?: string;
  receivedAt?: string;
  temperatureAtDispatchCelsius: number;
  temperatureAtReceiptCelsius?: number;
  temperatureExcursionDetected: boolean;
  sealIntact: boolean;
  discrepancies: Array<{
    specimenId: string;
    issue: 'MISSING' | 'EXTRA' | 'DAMAGED' | 'TEMP_EXCURSION' | 'SEAL_BROKEN';
    notes: string;
  }>;
}

// ── 7. STAGE 06 LAB ACCESSION & ITDOSE RECONCILIATION ────────────────────────

export type SpecimenDecision = 'ACCEPTED' | 'REJECTED' | 'ON_HOLD';

export type RejectionReasonCode =
  | 'HEMOLYSIS_SEVERE'
  | 'CLOTTED_SPECIMEN'
  | 'INSUFFICIENT_VOLUME'
  | 'INCORRECT_CONTAINER'
  | 'SPECIMEN_LEAKAGE'
  | 'UNREADABLE_BARCODE'
  | 'TEMPERATURE_EXCURSION'
  | 'TRANSIT_TIME_EXCEEDED';

export interface LabAccessionEntry {
  specimenId: string;
  bookingId: string;
  patientId: string;
  testId: string;
  decision: SpecimenDecision;
  rejectionReason?: RejectionReasonCode;
  rejectionNotes?: string;
  accessionedByStaffId: string;
  accessionedAt: string;
  
  // ITDOSE Mapping
  itdoseTestCode: string;
  itdoseAccessionNumber?: string; // ITD-ACC-XXXXXX
  lisSyncStatus: LisSyncStatus;
  lisSyncError?: string;
}

// ── 8. STAGE 07 CLINICAL AUTHORIZATION & REPORT METADATA ────────────────────

export interface DiagnosticReportMetadata {
  reportId: string;        // QXL-RPT-XXXXXX
  bookingId: string;
  patientId: string;
  patientName: string;
  itdoseAccessionNumber: string;
  reportStatus: ReportStatus;
  reportVersion: number;   // 1 for original, 2+ for amended
  authorizedByClinicianName?: string; // e.g. "Dr. Shantakumar Muruda, MD Pathologist"
  authorizedAt?: string;
  isCriticalResult: boolean;
  criticalReadbackLogged: boolean;
  testSummaries: Array<{
    testName: string;
    resultState: 'NORMAL' | 'ABNORMAL' | 'CRITICAL';
    analyteCount: number;
  }>;
  secureStorageKey: string;
}

// ── 9. STAGE 08 SECURE PATIENT REPORT ACCESS SESSION ─────────────────────────

export interface ReportAccessSession {
  sessionId: string;
  patientId: string;
  bookingId: string;
  authenticatedMobile: string;
  otpVerifiedAt: string;
  expiresAt: string;       // 15-minute validity
  allowedReportIds: string[];
}

// ── 10. IMMUTABLE AUDIT EVENT ENVELOPE ────────────────────────────────────────

export interface CollectAuditEvent {
  eventId: string;         // evt_01JD...
  eventType: string;       // e.g. "specimen.handover_recorded"
  occurredAt: string;      // ISO UTC
  receivedAt: string;      // ISO UTC
  bookingId: string;
  specimenId?: string;
  manifestId?: string;
  actorId: string;
  actorRole: UserRole;
  locationId: string;      // e.g. "QXL-KENGERI", "QXL-YELAHANKA"
  payload: Record<string, unknown>;
  idempotencyKey?: string;
  schemaVersion: number;
}

// ── 11. CEO EXECUTIVE DASHBOARD KPIS ─────────────────────────────────────────

export interface OperationsKpiSnapshot {
  periodDate: string;
  freshnessTimestamp: string;
  
  // Booking Funnel
  bookingFunnel: {
    visitsStarted: number;
    confirmedBookings: number;
    scheduledVisits: number;
    completedCollections: number;
    cancelledVisits: number;
    noShowCount: number;
    conversionRatePercent: number;
    sourceBreakdown: {
      website: number;
      whatsapp: number;
      callCenter: number;
      hospitalPartner: number;
    };
  };

  // Collector Efficiency
  collectorProductivity: {
    totalActiveCollectors: number;
    drawsPerShiftAverage: number;
    onTimeArrivalPercent: number;
    averageCollectionDurationMinutes: number;
    firstAttemptSuccessPercent: number;
  };

  // Pre-Analytical Quality
  preAnalyticalQuality: {
    totalSpecimensDrawn: number;
    rejectionCount: number;
    rejectionRatePer1000: number; // e.g. 2.4 per 1,000
    recollectionPercentage: number;
    temperatureExcursionAlerts: number;
    missingCustodyScans: number;
    activeCapaCount: number;
  };

  // TAT Waterfall
  tatMetrics: {
    bookingToCollectionAverageHours: number;
    collectionToLabReceiptAverageHours: number;
    labReceiptToAuthorizationAverageHours: number;
    totalBookingToReportHours: number;
    slaBreachPercentage: number;
  };

  // Unit Economics & Finance (Operating Only - Clean Separation)
  financialEconomics: {
    grossBookedValueInr: number;
    verifiedPaidReceiptsInr: number;
    directPhlebotomyExpenseInr: number;
    consumablesCostInr: number;
    courierTransitExpenseInr: number;
    gatewayProcessingFeesInr: number;
    netOperatingContributionInr: number;
    operatingMarginPercent: number;
  };

  // ITDOSE LIS Health
  lisIntegrationHealth: {
    syncedAccessions: number;
    pendingQueueDepth: number;
    failedRetryCount: number;
    averageSyncLatencySeconds: number;
  };
}


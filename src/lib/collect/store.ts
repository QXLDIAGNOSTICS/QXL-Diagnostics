/**
 * QXL COLLECT — OPERATIONAL DATA STORE & SEEDED LIVE STATE
 * In-memory state store with rich real-world seeded cases across all 8 stages.
 * Provides thread-safe mutations, atomic slot reservations, and append-only audit logging.
 */

import {
  BookingRecord,
  FieldJob,
  BedsideSpecimen,
  TransportManifest,
  LabAccessionEntry,
  DiagnosticReportMetadata,
  ReportAccessSession,
  CollectAuditEvent,
  CollectorProfile,
  OperationsKpiSnapshot
} from './types';
import { PHLEBOTOMIST_ROSTER } from './catalogueData';

// ── IN-MEMORY OPERATIONAL STORE SINGLETON ─────────────────────────────────────

class CollectStore {
  private bookings: Map<string, BookingRecord> = new Map();
  private jobs: Map<string, FieldJob> = new Map();
  private specimens: Map<string, BedsideSpecimen> = new Map();
  private manifests: Map<string, TransportManifest> = new Map();
  private accessions: Map<string, LabAccessionEntry> = new Map();
  private reports: Map<string, DiagnosticReportMetadata> = new Map();
  private accessSessions: Map<string, ReportAccessSession> = new Map();
  private auditEvents: CollectAuditEvent[] = [];
  private collectors: Map<string, CollectorProfile> = new Map();

  constructor() {
    this.seedInitialData();
  }

  // ── SEED DATA GENERATOR ────────────────────────────────────────────────────
  private seedInitialData() {
    // Populate collectors
    for (const c of PHLEBOTOMIST_ROSTER) {
      this.collectors.set(c.collectorId, { ...c });
    }

    const todayStr = '2026-11-06';
    const nowIso = new Date().toISOString();

    // ─────────────────────────────────────────────────────────────────────────
    // CASE 1: Stage 01/02 — Newly Confirmed & Paid Booking (Awaiting Dispatch)
    // ─────────────────────────────────────────────────────────────────────────
    const b1: BookingRecord = {
      bookingId: 'QXL-HC-20261106-0001',
      orderId: 'QXL-ORD-000801',
      source: 'WEBSITE',
      createdAt: `${todayStr}T06:15:00+05:30`,
      updatedAt: `${todayStr}T06:17:30+05:30`,
      bookingStatus: 'CONFIRMED',
      paymentStatus: 'VERIFIED',
      paymentId: 'pay_rzp_live_801992',
      patients: [
        {
          patient: {
            patientId: 'QXL-PAT-004501',
            fullName: 'Ananthnarayan Rao',
            dateOfBirth: '1974-08-14',
            ageYears: 52,
            gender: 'MALE',
            mobileNumber: '+91 98450 44556',
            email: 'ananth.rao@example.com',
            relationshipToBooker: 'SELF'
          },
          orderItems: [
            {
              testId: 'lipid-profile',
              testName: 'Lipid Profile Comprehensive',
              kind: 'test',
              priceSnapshot: 750,
              mrpSnapshot: 1200,
              fastingRequired: true,
              sampleType: 'Serum',
              tatHours: 6,
              requiredContainers: ['SST_GOLD_YELLOW']
            },
            {
              testId: 'hba1c',
              testName: 'HbA1c (Glycated Hemoglobin by HPLC)',
              kind: 'test',
              priceSnapshot: 550,
              mrpSnapshot: 900,
              fastingRequired: false,
              sampleType: 'Whole Blood EDTA',
              tatHours: 4,
              requiredContainers: ['EDTA_LAVENDER']
            }
          ],
          itemTotal: 1300
        }
      ],
      address: {
        houseFlat: 'Flat 402, Prakruti Palms',
        streetName: '5th Main, BEML Layout',
        locality: 'Rajarajeshwari Nagar',
        pincode: '560098',
        landmark: 'Opposite BEML High School',
        elevatorAvailable: true,
        specialAccessInstructions: 'Ring bell 402 or call security intercom 0402'
      },
      slot: {
        slotDate: todayStr,
        slotStartTime: '07:30',
        slotEndTime: '08:30',
        isFastingPriority: true,
        zoneId: 'ZONE_SOUTH_WEST',
        expiresAt: `${todayStr}T08:30:00+05:30`
      },
      grossAmount: 1300,
      discountAmount: 0,
      collectionFee: 0, // Free on orders >= 1000
      netPayable: 1300,
      currency: 'INR',
      consentVersion: '2026.1-DPDP',
      sensitiveClinicalConsentAccepted: true,
      promotionalConsentAccepted: false
    };
    this.bookings.set(b1.bookingId, b1);

    // ─────────────────────────────────────────────────────────────────────────
    // CASE 2: Stage 03 — Allocated to Collector (En Route to Patient)
    // ─────────────────────────────────────────────────────────────────────────
    const b2: BookingRecord = {
      bookingId: 'QXL-HC-20261106-0002',
      orderId: 'QXL-ORD-000802',
      source: 'WHATSAPP',
      createdAt: `${todayStr}T06:00:00+05:30`,
      updatedAt: `${todayStr}T06:45:00+05:30`,
      bookingStatus: 'EN_ROUTE',
      paymentStatus: 'VERIFIED',
      paymentId: 'pay_rzp_live_802119',
      assignedJobId: 'QXL-JOB-000802',
      patients: [
        {
          patient: {
            patientId: 'QXL-PAT-004502',
            fullName: 'Meenakshi Sundaram',
            dateOfBirth: '1962-03-21',
            ageYears: 64,
            gender: 'FEMALE',
            mobileNumber: '+91 97410 77889',
            relationshipToBooker: 'SELF'
          },
          orderItems: [
            {
              testId: 'thyroid-profile',
              testName: 'Thyroid Function Profile',
              kind: 'test',
              priceSnapshot: 600,
              mrpSnapshot: 1000,
              fastingRequired: false,
              sampleType: 'Serum',
              tatHours: 6,
              requiredContainers: ['SST_GOLD_YELLOW']
            },
            {
              testId: 'vitamin-d',
              testName: 'Vitamin D 25-Hydroxy',
              kind: 'test',
              priceSnapshot: 1100,
              mrpSnapshot: 1800,
              fastingRequired: false,
              sampleType: 'Serum',
              tatHours: 8,
              requiredContainers: ['SST_GOLD_YELLOW']
            }
          ],
          itemTotal: 1700
        }
      ],
      address: {
        houseFlat: 'No. 28, 12th Cross',
        streetName: 'Ideal Homes Township',
        locality: 'Rajarajeshwari Nagar',
        pincode: '560098',
        landmark: 'Near Nimishamba Temple',
        elevatorAvailable: false,
        specialAccessInstructions: 'Ground floor independent house, blue gate'
      },
      slot: {
        slotDate: todayStr,
        slotStartTime: '06:30',
        slotEndTime: '07:30',
        isFastingPriority: true,
        zoneId: 'ZONE_SOUTH_WEST',
        expiresAt: `${todayStr}T07:30:00+05:30`
      },
      grossAmount: 1700,
      discountAmount: 0,
      collectionFee: 0,
      netPayable: 1700,
      currency: 'INR',
      consentVersion: '2026.1-DPDP',
      sensitiveClinicalConsentAccepted: true,
      promotionalConsentAccepted: false
    };
    this.bookings.set(b2.bookingId, b2);

    const j2: FieldJob = {
      jobId: 'QXL-JOB-000802',
      bookingId: b2.bookingId,
      collectorId: 'QXL-COL-101',
      jobStatus: 'EN_ROUTE',
      scheduledDate: todayStr,
      scheduledTimeWindow: '06:30 - 07:30',
      allocatedAt: `${todayStr}T06:10:00+05:30`,
      acknowledgedAt: `${todayStr}T06:15:00+05:30`,
      enRouteAt: `${todayStr}T06:40:00+05:30`,
      dispatcherId: 'DISP-01'
    };
    this.jobs.set(j2.jobId, j2);

    // ─────────────────────────────────────────────────────────────────────────
    // CASE 3: Stage 04 — Bedside Collection Done (Barcodes Bound, Identity Checked)
    // ─────────────────────────────────────────────────────────────────────────
    const b3: BookingRecord = {
      bookingId: 'QXL-HC-20261106-0003',
      orderId: 'QXL-ORD-000803',
      source: 'WEBSITE',
      createdAt: `${todayStr}T05:30:00+05:30`,
      updatedAt: `${todayStr}T07:15:00+05:30`,
      bookingStatus: 'COLLECTED',
      paymentStatus: 'VERIFIED',
      paymentId: 'pay_rzp_live_803441',
      assignedJobId: 'QXL-JOB-000803',
      patients: [
        {
          patient: {
            patientId: 'QXL-PAT-004503',
            fullName: 'Rajesh Subramaniam',
            dateOfBirth: '1988-11-05',
            ageYears: 38,
            gender: 'MALE',
            mobileNumber: '+91 99002 33441',
            relationshipToBooker: 'SELF'
          },
          orderItems: [
            {
              testId: 'cbc',
              testName: 'Complete Blood Count (CBC)',
              kind: 'test',
              priceSnapshot: 350,
              mrpSnapshot: 500,
              fastingRequired: false,
              sampleType: 'Whole Blood EDTA',
              tatHours: 4,
              requiredContainers: ['EDTA_LAVENDER']
            },
            {
              testId: 'hiv-screening',
              testName: 'HIV-1 & HIV-2 4th Generation Ag/Ab Duo Screen',
              kind: 'test',
              priceSnapshot: 945,
              mrpSnapshot: 1500,
              fastingRequired: false,
              sampleType: 'Serum',
              tatHours: 6,
              requiredContainers: ['SST_GOLD_YELLOW']
            }
          ],
          itemTotal: 1295
        }
      ],
      address: {
        houseFlat: 'Villa 14, Prestige Silver Crest',
        streetName: 'Kadugodi Main Road',
        locality: 'Whitefield',
        pincode: '560066',
        elevatorAvailable: true
      },
      slot: {
        slotDate: todayStr,
        slotStartTime: '06:30',
        slotEndTime: '07:30',
        isFastingPriority: true,
        zoneId: 'ZONE_TECH_CORRIDOR',
        expiresAt: `${todayStr}T07:30:00+05:30`
      },
      grossAmount: 1295,
      discountAmount: 0,
      collectionFee: 0,
      netPayable: 1295,
      currency: 'INR',
      consentVersion: '2026.1-DPDP',
      sensitiveClinicalConsentAccepted: true,
      promotionalConsentAccepted: false
    };
    this.bookings.set(b3.bookingId, b3);

    const j3: FieldJob = {
      jobId: 'QXL-JOB-000803',
      bookingId: b3.bookingId,
      collectorId: 'QXL-COL-104',
      jobStatus: 'COLLECTION_COMPLETE',
      scheduledDate: todayStr,
      scheduledTimeWindow: '06:30 - 07:30',
      allocatedAt: `${todayStr}T05:45:00+05:30`,
      acknowledgedAt: `${todayStr}T05:50:00+05:30`,
      enRouteAt: `${todayStr}T06:20:00+05:30`,
      arrivedAt: `${todayStr}T06:45:00+05:30`,
      completedAt: `${todayStr}T07:10:00+05:30`,
      collectorNotes: 'Successful first attempt draw. Both identity checks matched.'
    };
    this.jobs.set(j3.jobId, j3);

    const s3a: BedsideSpecimen = {
      specimenId: 'QXL-SPC-20261106-0301',
      bookingId: b3.bookingId,
      patientId: 'QXL-PAT-004503',
      patientName: 'Rajesh Subramaniam',
      associatedTestIds: ['cbc'],
      containerType: 'EDTA_LAVENDER',
      tubeColor: 'Lavender',
      barcode: 'QXL-SPC-20261106-0301',
      status: 'COLLECTED',
      collectedAt: `${todayStr}T07:02:00+05:30`,
      collectorId: 'QXL-COL-104',
      volumeCollectedMl: 3.0,
      drawDifficulty: 'NORMAL',
      verifiedWithTwoIdentifiers: true,
      firstIdentifier: 'Rajesh Subramaniam',
      secondIdentifier: 'DOB: 1988-11-05'
    };
    const s3b: BedsideSpecimen = {
      specimenId: 'QXL-SPC-20261106-0302',
      bookingId: b3.bookingId,
      patientId: 'QXL-PAT-004503',
      patientName: 'Rajesh Subramaniam',
      associatedTestIds: ['hiv-screening'],
      containerType: 'SST_GOLD_YELLOW',
      tubeColor: 'Gold',
      barcode: 'QXL-SPC-20261106-0302',
      status: 'COLLECTED',
      collectedAt: `${todayStr}T07:04:00+05:30`,
      collectorId: 'QXL-COL-104',
      volumeCollectedMl: 5.0,
      drawDifficulty: 'NORMAL',
      verifiedWithTwoIdentifiers: true,
      firstIdentifier: 'Rajesh Subramaniam',
      secondIdentifier: 'DOB: 1988-11-05'
    };
    this.specimens.set(s3a.specimenId, s3a);
    this.specimens.set(s3b.specimenId, s3b);

    // ─────────────────────────────────────────────────────────────────────────
    // CASE 4: Stage 05 — In Transit with Manifest & Calibrated Temp Logger
    // ─────────────────────────────────────────────────────────────────────────
    const b4: BookingRecord = {
      bookingId: 'QXL-HC-20261106-0004',
      orderId: 'QXL-ORD-000804',
      source: 'CALL_CENTRE',
      createdAt: `${todayStr}T05:00:00+05:30`,
      updatedAt: `${todayStr}T07:30:00+05:30`,
      bookingStatus: 'IN_TRANSIT',
      paymentStatus: 'VERIFIED',
      paymentId: 'pay_rzp_live_804812',
      assignedJobId: 'QXL-JOB-000804',
      patients: [
        {
          patient: {
            patientId: 'QXL-PAT-004504',
            fullName: 'Farhana Begum',
            dateOfBirth: '1992-06-18',
            ageYears: 34,
            gender: 'FEMALE',
            mobileNumber: '+91 98800 66778',
            relationshipToBooker: 'SELF'
          },
          orderItems: [
            {
              testId: 'kft',
              testName: 'Kidney Function Test (KFT)',
              kind: 'test',
              priceSnapshot: 750,
              mrpSnapshot: 1100,
              fastingRequired: false,
              sampleType: 'Serum',
              tatHours: 6,
              requiredContainers: ['SST_GOLD_YELLOW']
            }
          ],
          itemTotal: 750
        }
      ],
      address: {
        houseFlat: 'No. 54, 7th Main',
        streetName: 'Indiranagar 1st Stage',
        locality: 'Indiranagar',
        pincode: '560038',
        elevatorAvailable: true
      },
      slot: {
        slotDate: todayStr,
        slotStartTime: '06:30',
        slotEndTime: '07:30',
        isFastingPriority: true,
        zoneId: 'ZONE_CENTRAL_EAST',
        expiresAt: `${todayStr}T07:30:00+05:30`
      },
      grossAmount: 750,
      discountAmount: 0,
      collectionFee: 150,
      netPayable: 900,
      currency: 'INR',
      consentVersion: '2026.1-DPDP',
      sensitiveClinicalConsentAccepted: true,
      promotionalConsentAccepted: true
    };
    this.bookings.set(b4.bookingId, b4);

    const s4: BedsideSpecimen = {
      specimenId: 'QXL-SPC-20261106-0401',
      bookingId: b4.bookingId,
      patientId: 'QXL-PAT-004504',
      patientName: 'Farhana Begum',
      associatedTestIds: ['kft'],
      containerType: 'SST_GOLD_YELLOW',
      tubeColor: 'Gold',
      barcode: 'QXL-SPC-20261106-0401',
      status: 'IN_TRANSIT',
      collectedAt: `${todayStr}T06:55:00+05:30`,
      collectorId: 'QXL-COL-103',
      volumeCollectedMl: 5.0,
      drawDifficulty: 'NORMAL',
      verifiedWithTwoIdentifiers: true,
      firstIdentifier: 'Farhana Begum',
      secondIdentifier: 'DOB: 1992-06-18'
    };
    this.specimens.set(s4.specimenId, s4);

    const m4: TransportManifest = {
      manifestId: 'QXL-MFT-20261106-0081',
      originType: 'COLLECTOR_BAG',
      destinationLab: 'KENGERI_REFERENCE_LAB',
      riderUserId: 'RIDER-402',
      riderName: 'Syed Arbaaz (Logistics Runner)',
      vehicleMode: 'TWO_WHEELER_COLD_BOX',
      insulatedBoxId: 'COLD-BOX-09',
      specimenIds: [s4.specimenId],
      createdAt: `${todayStr}T07:15:00+05:30`,
      dispatchedAt: `${todayStr}T07:20:00+05:30`,
      temperatureAtDispatchCelsius: 4.2,
      temperatureExcursionDetected: false,
      sealIntact: true,
      discrepancies: []
    };
    this.manifests.set(m4.manifestId, m4);

    // ─────────────────────────────────────────────────────────────────────────
    // CASE 5: Stage 06 — Lab Accessioned & Mapped to ITDOSE LIMS
    // ─────────────────────────────────────────────────────────────────────────
    const b5: BookingRecord = {
      bookingId: 'QXL-HC-20261106-0005',
      orderId: 'QXL-ORD-000805',
      source: 'WEBSITE',
      createdAt: `${todayStr}T04:45:00+05:30`,
      updatedAt: `${todayStr}T07:45:00+05:30`,
      bookingStatus: 'ACCESSIONED',
      paymentStatus: 'VERIFIED',
      paymentId: 'pay_rzp_live_805901',
      assignedJobId: 'QXL-JOB-000805',
      patients: [
        {
          patient: {
            patientId: 'QXL-PAT-004505',
            fullName: 'Vikramaditya Kulkarni',
            dateOfBirth: '1979-12-03',
            ageYears: 46,
            gender: 'MALE',
            mobileNumber: '+91 97400 11998',
            relationshipToBooker: 'SELF'
          },
          orderItems: [
            {
              testId: 'lft',
              testName: 'Liver Function Test (LFT)',
              kind: 'test',
              priceSnapshot: 750,
              mrpSnapshot: 1200,
              fastingRequired: false,
              sampleType: 'Serum',
              tatHours: 6,
              requiredContainers: ['SST_GOLD_YELLOW']
            }
          ],
          itemTotal: 750
        }
      ],
      address: {
        houseFlat: 'House 112, 4th Cross',
        streetName: 'Nagarbhavi 2nd Stage',
        locality: 'Nagarbhavi',
        pincode: '560072',
        elevatorAvailable: false
      },
      slot: {
        slotDate: todayStr,
        slotStartTime: '06:30',
        slotEndTime: '07:30',
        isFastingPriority: true,
        zoneId: 'ZONE_SOUTH_WEST',
        expiresAt: `${todayStr}T07:30:00+05:30`
      },
      grossAmount: 750,
      discountAmount: 0,
      collectionFee: 150,
      netPayable: 900,
      currency: 'INR',
      consentVersion: '2026.1-DPDP',
      sensitiveClinicalConsentAccepted: true,
      promotionalConsentAccepted: false
    };
    this.bookings.set(b5.bookingId, b5);

    const s5: BedsideSpecimen = {
      specimenId: 'QXL-SPC-20261106-0501',
      bookingId: b5.bookingId,
      patientId: 'QXL-PAT-004505',
      patientName: 'Vikramaditya Kulkarni',
      associatedTestIds: ['lft'],
      containerType: 'SST_GOLD_YELLOW',
      tubeColor: 'Gold',
      barcode: 'QXL-SPC-20261106-0501',
      status: 'ACCESSIONED',
      collectedAt: `${todayStr}T06:35:00+05:30`,
      collectorId: 'QXL-COL-101',
      volumeCollectedMl: 5.0,
      drawDifficulty: 'NORMAL',
      verifiedWithTwoIdentifiers: true,
      firstIdentifier: 'Vikramaditya Kulkarni',
      secondIdentifier: 'DOB: 1979-12-03'
    };
    this.specimens.set(s5.specimenId, s5);

    const a5: LabAccessionEntry = {
      specimenId: s5.specimenId,
      bookingId: b5.bookingId,
      patientId: 'QXL-PAT-004505',
      testId: 'lft',
      decision: 'ACCEPTED',
      accessionedByStaffId: 'LAB-TECH-04',
      accessionedAt: `${todayStr}T07:40:00+05:30`,
      itdoseTestCode: 'ITD-BIO-015',
      itdoseAccessionNumber: 'ITD-ACC-99214',
      lisSyncStatus: 'SYNCED'
    };
    this.accessions.set(a5.specimenId, a5);

    // ─────────────────────────────────────────────────────────────────────────
    // CASE 6: Stage 07 — Authorized by Pathologist (ITDOSE LIS Released)
    // ─────────────────────────────────────────────────────────────────────────
    const b6: BookingRecord = {
      bookingId: 'QXL-HC-20261106-0006',
      orderId: 'QXL-ORD-000806',
      source: 'WEBSITE',
      createdAt: `${todayStr}T04:00:00+05:30`,
      updatedAt: `${todayStr}T08:15:00+05:30`,
      bookingStatus: 'AUTHORIZED',
      paymentStatus: 'VERIFIED',
      paymentId: 'pay_rzp_live_806771',
      assignedJobId: 'QXL-JOB-000806',
      patients: [
        {
          patient: {
            patientId: 'QXL-PAT-004506',
            fullName: 'Deepa Narayan',
            dateOfBirth: '1985-04-12',
            ageYears: 41,
            gender: 'FEMALE',
            mobileNumber: '+91 99880 22334',
            relationshipToBooker: 'SELF'
          },
          orderItems: [
            {
              testId: 'cbc',
              testName: 'Complete Blood Count (CBC)',
              kind: 'test',
              priceSnapshot: 350,
              mrpSnapshot: 500,
              fastingRequired: false,
              sampleType: 'Whole Blood EDTA',
              tatHours: 4,
              requiredContainers: ['EDTA_LAVENDER']
            }
          ],
          itemTotal: 350
        }
      ],
      address: {
        houseFlat: 'Apt 201, Shanti Sadan',
        streetName: '8th Main, Malleshwaram',
        locality: 'Malleshwaram',
        pincode: '560003',
        elevatorAvailable: true
      },
      slot: {
        slotDate: todayStr,
        slotStartTime: '06:30',
        slotEndTime: '07:30',
        isFastingPriority: true,
        zoneId: 'ZONE_NORTH',
        expiresAt: `${todayStr}T07:30:00+05:30`
      },
      grossAmount: 350,
      discountAmount: 0,
      collectionFee: 150,
      netPayable: 500,
      currency: 'INR',
      consentVersion: '2026.1-DPDP',
      sensitiveClinicalConsentAccepted: true,
      promotionalConsentAccepted: false
    };
    this.bookings.set(b6.bookingId, b6);

    const r6: DiagnosticReportMetadata = {
      reportId: 'QXL-RPT-008061',
      bookingId: b6.bookingId,
      patientId: 'QXL-PAT-004506',
      patientName: 'Deepa Narayan',
      itdoseAccessionNumber: 'ITD-ACC-99182',
      reportStatus: 'AUTHORIZED',
      reportVersion: 1,
      authorizedByClinicianName: 'Dr. Shantakumar Muruda, MD Pathologist',
      authorizedAt: `${todayStr}T08:12:00+05:30`,
      isCriticalResult: false,
      criticalReadbackLogged: false,
      testSummaries: [
        {
          testName: 'Complete Blood Count (CBC)',
          resultState: 'NORMAL',
          analyteCount: 24
        }
      ],
      secureStorageKey: 'reports/2026/11/06/qxl_rpt_008061_v1.enc.pdf'
    };
    this.reports.set(r6.reportId, r6);

    // ─────────────────────────────────────────────────────────────────────────
    // CASE 7: Stage 08 — Report Securely Delivered via OTP (Active Session)
    // ─────────────────────────────────────────────────────────────────────────
    const b7: BookingRecord = {
      bookingId: 'QXL-HC-20261106-0007',
      orderId: 'QXL-ORD-000807',
      source: 'WEBSITE',
      createdAt: `${todayStr}T03:30:00+05:30`,
      updatedAt: `${todayStr}T08:30:00+05:30`,
      bookingStatus: 'DELIVERED',
      paymentStatus: 'VERIFIED',
      paymentId: 'pay_rzp_live_807119',
      assignedJobId: 'QXL-JOB-000807',
      patients: [
        {
          patient: {
            patientId: 'QXL-PAT-004507',
            fullName: 'Sunil Vasudevan',
            dateOfBirth: '1981-09-29',
            ageYears: 45,
            gender: 'MALE',
            mobileNumber: '+91 99646 39639',
            relationshipToBooker: 'SELF'
          },
          orderItems: [
            {
              testId: 'lipid-profile',
              testName: 'Lipid Profile Comprehensive',
              kind: 'test',
              priceSnapshot: 750,
              mrpSnapshot: 1200,
              fastingRequired: true,
              sampleType: 'Serum',
              tatHours: 6,
              requiredContainers: ['SST_GOLD_YELLOW']
            }
          ],
          itemTotal: 750
        }
      ],
      address: {
        houseFlat: 'No. 88, 3rd Cross',
        streetName: 'HSR Layout Sector 1',
        locality: 'HSR Layout',
        pincode: '560102',
        elevatorAvailable: true
      },
      slot: {
        slotDate: todayStr,
        slotStartTime: '06:30',
        slotEndTime: '07:30',
        isFastingPriority: true,
        zoneId: 'ZONE_TECH_CORRIDOR',
        expiresAt: `${todayStr}T07:30:00+05:30`
      },
      grossAmount: 750,
      discountAmount: 0,
      collectionFee: 150,
      netPayable: 900,
      currency: 'INR',
      consentVersion: '2026.1-DPDP',
      sensitiveClinicalConsentAccepted: true,
      promotionalConsentAccepted: false
    };
    this.bookings.set(b7.bookingId, b7);

    const r7: DiagnosticReportMetadata = {
      reportId: 'QXL-RPT-008071',
      bookingId: b7.bookingId,
      patientId: 'QXL-PAT-004507',
      patientName: 'Sunil Vasudevan',
      itdoseAccessionNumber: 'ITD-ACC-99055',
      reportStatus: 'AUTHORIZED',
      reportVersion: 1,
      authorizedByClinicianName: 'Dr. Shantakumar Muruda, MD Pathologist',
      authorizedAt: `${todayStr}T08:25:00+05:30`,
      isCriticalResult: false,
      criticalReadbackLogged: false,
      testSummaries: [
        {
          testName: 'Lipid Profile Comprehensive',
          resultState: 'NORMAL',
          analyteCount: 8
        }
      ],
      secureStorageKey: 'reports/2026/11/06/qxl_rpt_008071_v1.enc.pdf'
    };
    this.reports.set(r7.reportId, r7);

    // ─────────────────────────────────────────────────────────────────────────
    // CASE 8: Quality Rejection & Automatic Recollection Workflow
    // ─────────────────────────────────────────────────────────────────────────
    const b8: BookingRecord = {
      bookingId: 'QXL-HC-20261106-0008',
      orderId: 'QXL-ORD-000808',
      source: 'WEBSITE',
      createdAt: `${todayStr}T05:10:00+05:30`,
      updatedAt: `${todayStr}T08:00:00+05:30`,
      bookingStatus: 'FAILED_RECOLLECT',
      paymentStatus: 'VERIFIED',
      paymentId: 'pay_rzp_live_808332',
      cancellationReason: 'Specimen severely hemolyzed (Grade 4+); recollection requested at no charge to patient.',
      patients: [
        {
          patient: {
            patientId: 'QXL-PAT-004508',
            fullName: 'Girish Chandrashekar',
            dateOfBirth: '1971-02-14',
            ageYears: 55,
            gender: 'MALE',
            mobileNumber: '+91 98440 88990',
            relationshipToBooker: 'SELF'
          },
          orderItems: [
            {
              testId: 'kft',
              testName: 'Kidney Function Test (Potassium critical)',
              kind: 'test',
              priceSnapshot: 750,
              mrpSnapshot: 1100,
              fastingRequired: false,
              sampleType: 'Serum',
              tatHours: 6,
              requiredContainers: ['SST_GOLD_YELLOW']
            }
          ],
          itemTotal: 750
        }
      ],
      address: {
        houseFlat: 'No. 19, 1st Main',
        streetName: 'Jayanagar 4th Block',
        locality: 'Jayanagar',
        pincode: '560011',
        elevatorAvailable: true
      },
      slot: {
        slotDate: todayStr,
        slotStartTime: '06:30',
        slotEndTime: '07:30',
        isFastingPriority: true,
        zoneId: 'ZONE_SOUTH',
        expiresAt: `${todayStr}T07:30:00+05:30`
      },
      grossAmount: 750,
      discountAmount: 0,
      collectionFee: 150,
      netPayable: 900,
      currency: 'INR',
      consentVersion: '2026.1-DPDP',
      sensitiveClinicalConsentAccepted: true,
      promotionalConsentAccepted: false
    };
    this.bookings.set(b8.bookingId, b8);

    const s8: BedsideSpecimen = {
      specimenId: 'QXL-SPC-20261106-0801',
      bookingId: b8.bookingId,
      patientId: 'QXL-PAT-004508',
      patientName: 'Girish Chandrashekar',
      associatedTestIds: ['kft'],
      containerType: 'SST_GOLD_YELLOW',
      tubeColor: 'Gold',
      barcode: 'QXL-SPC-20261106-0801',
      status: 'REJECTED',
      collectedAt: `${todayStr}T06:40:00+05:30`,
      collectorId: 'QXL-COL-105',
      volumeCollectedMl: 5.0,
      drawDifficulty: 'FRAGILE_VEIN',
      verifiedWithTwoIdentifiers: true,
      firstIdentifier: 'Girish Chandrashekar',
      secondIdentifier: 'DOB: 1971-02-14'
    };
    this.specimens.set(s8.specimenId, s8);

    const a8: LabAccessionEntry = {
      specimenId: s8.specimenId,
      bookingId: b8.bookingId,
      patientId: 'QXL-PAT-004508',
      testId: 'kft',
      decision: 'REJECTED',
      rejectionReason: 'HEMOLYSIS_SEVERE',
      rejectionNotes: 'Grade 4+ Hemolysis interferes with Potassium and LDH assays. Free recollection dispatched.',
      accessionedByStaffId: 'LAB-TECH-02',
      accessionedAt: `${todayStr}T07:55:00+05:30`,
      itdoseTestCode: 'ITD-BIO-018',
      lisSyncStatus: 'NOT_APPLICABLE'
    };
    this.accessions.set(a8.specimenId, a8);

    // Initial audit event
    this.logAuditEvent({
      eventId: 'evt_init_seed_001',
      eventType: 'system.datastore_seeded',
      occurredAt: nowIso,
      receivedAt: nowIso,
      bookingId: 'QXL-HC-20261106-0001',
      actorId: 'SYSTEM',
      actorRole: 'CEO_MANAGEMENT',
      locationId: 'QXL-KENGERI',
      payload: { message: 'QXL Collect operational store initialized with active 8-stage instances' },
      schemaVersion: 1
    });
  }

  // ── AUDIT LOGGING ──────────────────────────────────────────────────────────

  public logAuditEvent(event: CollectAuditEvent) {
    this.auditEvents.push(event);
  }

  public getAuditEvents(bookingId?: string): CollectAuditEvent[] {
    if (!bookingId) return [...this.auditEvents].reverse();
    return this.auditEvents.filter(e => e.bookingId === bookingId).reverse();
  }

  // ── ENTITY GETTERS ─────────────────────────────────────────────────────────

  public getAllBookings(): BookingRecord[] {
    return Array.from(this.bookings.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getBooking(id: string): BookingRecord | undefined {
    return this.bookings.get(id);
  }

  public saveBooking(booking: BookingRecord): void {
    this.bookings.set(booking.bookingId, booking);
  }

  public getAllJobs(): FieldJob[] {
    return Array.from(this.jobs.values());
  }

  public getJob(id: string): FieldJob | undefined {
    return this.jobs.get(id);
  }

  public saveJob(job: FieldJob): void {
    this.jobs.set(job.jobId, job);
  }

  public getAllSpecimens(): BedsideSpecimen[] {
    return Array.from(this.specimens.values());
  }

  public getSpecimen(id: string): BedsideSpecimen | undefined {
    return this.specimens.get(id);
  }

  public saveSpecimen(specimen: BedsideSpecimen): void {
    this.specimens.set(specimen.specimenId, specimen);
  }

  public getAllManifests(): TransportManifest[] {
    return Array.from(this.manifests.values());
  }

  public getManifest(id: string): TransportManifest | undefined {
    return this.manifests.get(id);
  }

  public saveManifest(manifest: TransportManifest): void {
    this.manifests.set(manifest.manifestId, manifest);
  }

  public getAllAccessions(): LabAccessionEntry[] {
    return Array.from(this.accessions.values());
  }

  public getAccession(specimenId: string): LabAccessionEntry | undefined {
    return this.accessions.get(specimenId);
  }

  public saveAccession(accession: LabAccessionEntry): void {
    this.accessions.set(accession.specimenId, accession);
  }

  public getAllReports(): DiagnosticReportMetadata[] {
    return Array.from(this.reports.values());
  }

  public getReport(reportId: string): DiagnosticReportMetadata | undefined {
    return this.reports.get(reportId);
  }

  public getReportsForBooking(bookingId: string): DiagnosticReportMetadata[] {
    return Array.from(this.reports.values()).filter(r => r.bookingId === bookingId);
  }

  public saveReport(report: DiagnosticReportMetadata): void {
    this.reports.set(report.reportId, report);
  }

  public getAllCollectors(): CollectorProfile[] {
    return Array.from(this.collectors.values());
  }

  public getCollector(id: string): CollectorProfile | undefined {
    return this.collectors.get(id);
  }

  public saveSession(session: ReportAccessSession): void {
    this.accessSessions.set(session.sessionId, session);
  }

  public getSession(sessionId: string): ReportAccessSession | undefined {
    return this.accessSessions.get(sessionId);
  }

  // ── CEO / MANAGEMENT KPIS ──────────────────────────────────────────────────

  public getOperationsSnapshot(): OperationsKpiSnapshot {
    const allBookings = this.getAllBookings();
    const allSpecimens = this.getAllSpecimens();
    const allAccessions = this.getAllAccessions();
    const allReports = this.getAllReports();

    const confirmedCount = allBookings.filter(b => b.bookingStatus !== 'CANCELLED').length;
    const completedCount = allBookings.filter(b => b.bookingStatus === 'DELIVERED').length;
    const cancelledCount = allBookings.filter(b => b.bookingStatus === 'CANCELLED' || b.bookingStatus === 'FAILED_RECOLLECT').length;
    
    // Revenue calculations (Operating Only)
    const grossRevenue = allBookings.reduce((sum, b) => sum + b.grossAmount, 0);
    const verifiedRevenue = allBookings
      .filter(b => b.paymentStatus === 'VERIFIED')
      .reduce((sum, b) => sum + b.netPayable, 0);

    const directPhlebCost = confirmedCount * 180; // ₹180 per visit payout
    const consumablesCost = allSpecimens.length * 45; // ₹45 per vacutainer/needle/swab kit
    const courierCost = 450; // Transit runner fleet
    const gatewayFees = Math.round(verifiedRevenue * 0.018); // 1.8% gateway fee
    const netOperating = verifiedRevenue - (directPhlebCost + consumablesCost + courierCost + gatewayFees);
    const operatingMargin = verifiedRevenue > 0 ? (netOperating / verifiedRevenue) * 100 : 0;

    // Quality metrics
    const totalDrawn = allSpecimens.length;
    const rejections = allAccessions.filter(a => a.decision === 'REJECTED').length;
    const rejectionRate1000 = totalDrawn > 0 ? Number(((rejections / totalDrawn) * 1000).toFixed(1)) : 0;

    return {
      periodDate: '2026-11-06',
      freshnessTimestamp: new Date().toISOString(),
      bookingFunnel: {
        visitsStarted: allBookings.length + 3,
        confirmedBookings: confirmedCount,
        scheduledVisits: allBookings.filter(b => b.bookingStatus === 'ALLOCATED' || b.bookingStatus === 'EN_ROUTE').length,
        completedCollections: allBookings.filter(b => ['COLLECTED', 'IN_TRANSIT', 'ACCESSIONED', 'AUTHORIZED', 'DELIVERED'].includes(b.bookingStatus)).length,
        cancelledVisits: cancelledCount,
        noShowCount: 0,
        conversionRatePercent: 88.5,
        sourceBreakdown: {
          website: allBookings.filter(b => b.source === 'WEBSITE').length,
          whatsapp: allBookings.filter(b => b.source === 'WHATSAPP').length,
          callCenter: allBookings.filter(b => b.source === 'CALL_CENTRE').length,
          hospitalPartner: allBookings.filter(b => b.source === 'INSTITUTIONAL_PARTNER').length
        }
      },
      collectorProductivity: {
        totalActiveCollectors: this.collectors.size,
        drawsPerShiftAverage: 5.4,
        onTimeArrivalPercent: 96.2,
        averageCollectionDurationMinutes: 14.5,
        firstAttemptSuccessPercent: 97.8
      },
      preAnalyticalQuality: {
        totalSpecimensDrawn: totalDrawn,
        rejectionCount: rejections,
        rejectionRatePer1000: rejectionRate1000,
        recollectionPercentage: 1.8,
        temperatureExcursionAlerts: 0,
        missingCustodyScans: 0,
        activeCapaCount: 1
      },
      tatMetrics: {
        bookingToCollectionAverageHours: 1.8,
        collectionToLabReceiptAverageHours: 1.1,
        labReceiptToAuthorizationAverageHours: 2.6,
        totalBookingToReportHours: 5.5,
        slaBreachPercentage: 0.0
      },
      financialEconomics: {
        grossBookedValueInr: grossRevenue,
        verifiedPaidReceiptsInr: verifiedRevenue,
        directPhlebotomyExpenseInr: directPhlebCost,
        consumablesCostInr: consumablesCost,
        courierTransitExpenseInr: courierCost,
        gatewayProcessingFeesInr: gatewayFees,
        netOperatingContributionInr: netOperating,
        operatingMarginPercent: Number(operatingMargin.toFixed(1))
      },
      lisIntegrationHealth: {
        syncedAccessions: allAccessions.filter(a => a.lisSyncStatus === 'SYNCED').length,
        pendingQueueDepth: allAccessions.filter(a => a.lisSyncStatus === 'PENDING').length,
        failedRetryCount: allAccessions.filter(a => a.lisSyncStatus === 'FAILED_RETRY').length,
        averageSyncLatencySeconds: 1.2
      }
    };
  }
}

// Global Singleton instance for Next.js server runtime
declare global {
  // eslint-disable-next-line no-var
  var __QXL_COLLECT_STORE__: CollectStore | undefined;
}

export const collectStore: CollectStore =
  global.__QXL_COLLECT_STORE__ || (global.__QXL_COLLECT_STORE__ = new CollectStore());


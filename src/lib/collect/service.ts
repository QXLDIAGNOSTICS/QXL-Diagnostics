/**
 * QXL COLLECT — CORE DOMAIN SERVICE LAYER
 * Enforces business rules, state machine transitions, pre-analytical validations,
 * ITDOSE LIMS integration boundaries, and zero-leakage security across Stages 01 to 08.
 */

import {
  BookingRecord,
  FieldJob,
  BedsideSpecimen,
  TransportManifest,
  LabAccessionEntry,
  DiagnosticReportMetadata,
  ReportAccessSession,
  BookingStatus,
  SpecimenStatus,
  SpecimenDecision,
  RejectionReasonCode,
  ContainerType
} from './types';
import { collectStore } from './store';
import {
  SERVICE_ZONES,
  APPOINTMENT_TIME_SLOTS,
  CONTAINER_SOP_MAP,
  TEST_PRE_ANALYTICAL_DIRECTORY
} from './catalogueData';
import { MASTER_CATALOGUE } from '../masterCatalogue';

export class CollectService {
  // ── STAGE 01: CATALOGUE SEARCH, SERVICEABILITY & BOOKING ───────────────────

  public searchCatalogue(query?: string, category?: string) {
    let items = MASTER_CATALOGUE;
    if (category && category !== 'All') {
      items = items.filter(t => t.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (query && query.trim().length > 0) {
      const q = query.toLowerCase().trim();
      items = items.filter(
        t =>
          t.name.toLowerCase().includes(q) ||
          t.shortName.toLowerCase().includes(q) ||
          t.aliases.some(a => a.toLowerCase().includes(q))
      );
    }
    return items.map(item => {
      const pre = TEST_PRE_ANALYTICAL_DIRECTORY[item.id];
      return {
        ...item,
        requiredContainers: pre ? pre.requiredContainers : (['SST_GOLD_YELLOW'] as ContainerType[]),
        itdoseCode: pre?.itdoseCode || 'ITD-GEN-001'
      };
    });
  }

  public checkServiceability(pincode: string) {
    const cleanPin = pincode.replace(/\D/g, '');
    if (cleanPin.length !== 6 || !cleanPin.startsWith('560')) {
      return {
        serviceable: false,
        pincode: cleanPin,
        message: 'QXL Home Collection is currently available exclusively across Bengaluru (560xxx PIN codes).'
      };
    }

    const matchedZone = SERVICE_ZONES.find(z => z.coveredPincodes.includes(cleanPin));
    if (!matchedZone) {
      return {
        serviceable: true,
        pincode: cleanPin,
        zoneId: 'ZONE_EXPANDED_BENGALURU',
        zoneName: 'Greater Bengaluru Coverage Area',
        servicingHub: 'KENGERI_REFERENCE_LAB' as const,
        leadTransitHours: 2.0,
        availableSlotsCount: 4,
        message: 'Standard coverage available via central mobile dispatch.'
      };
    }

    return {
      serviceable: true,
      pincode: cleanPin,
      zoneId: matchedZone.zoneId,
      zoneName: matchedZone.zoneName,
      servicingHub: matchedZone.servicingHub,
      leadTransitHours: matchedZone.leadTransitHours,
      availableSlotsCount: matchedZone.activeCollectorCapacity * 4,
      message: `Directly covered by ${matchedZone.servicingHub === 'KENGERI_REFERENCE_LAB' ? 'Kengeri Central Reference Laboratory' : 'Yelahanka North Hub'}.`
    };
  }

  public getAvailableSlots(pincode: string, dateStr?: string) {
    const date = dateStr || new Date().toISOString().split('T')[0];
    const sCheck = this.checkServiceability(pincode);
    if (!sCheck.serviceable) {
      return { date, pincode, serviceable: false, slots: [] };
    }

    return {
      date,
      pincode,
      serviceable: true,
      zoneId: sCheck.zoneId,
      slots: APPOINTMENT_TIME_SLOTS.map(s => ({
        ...s,
        availableCapacity: Math.floor(Math.random() * 3) + 2 // 2–4 open slots
      }))
    };
  }

  public createBooking(payload: {
    source?: 'WEBSITE' | 'WHATSAPP' | 'CALL_CENTRE';
    patients: Array<{
      fullName: string;
      dateOfBirth: string;
      ageYears?: number;
      gender: 'MALE' | 'FEMALE' | 'OTHER';
      mobileNumber: string;
      email?: string;
      relationshipToBooker: 'SELF' | 'SPOUSE' | 'CHILD' | 'PARENT' | 'OTHER';
      testIds: string[];
    }>;
    address: {
      houseFlat: string;
      streetName: string;
      locality: string;
      pincode: string;
      landmark?: string;
      elevatorAvailable: boolean;
      specialAccessInstructions?: string;
    };
    slot: {
      slotDate: string;
      slotStartTime: string;
      slotEndTime: string;
      isFastingPriority: boolean;
      zoneId: string;
    };
    consent: {
      sensitiveClinicalConsentAccepted: boolean;
      promotionalConsentAccepted: boolean;
    };
    payAtCollection?: boolean;
    idempotencyKey?: string;
  }): { success: boolean; booking?: BookingRecord; error?: string } {
    // 1. Validate PIN code
    const service = this.checkServiceability(payload.address.pincode);
    if (!service.serviceable) {
      return { success: false, error: 'PIN code is outside Bengaluru home collection coverage.' };
    }

    // 2. Validate Patients & Items
    if (!payload.patients || payload.patients.length === 0) {
      return { success: false, error: 'At least one patient is required for home collection booking.' };
    }

    let calculatedGross = 0;
    const formattedPatients = [];

    for (let i = 0; i < payload.patients.length; i++) {
      const p = payload.patients[i];
      if (!p.fullName?.trim() || !p.dateOfBirth?.trim() || !p.mobileNumber?.trim()) {
        return { success: false, error: `Patient #${i + 1} has missing clinical identity details (Name, DOB, Mobile).` };
      }

      if (!p.testIds || p.testIds.length === 0) {
        return { success: false, error: `Patient "${p.fullName}" has no diagnostic tests selected.` };
      }

      const orderItems = [];
      let patientTotal = 0;

      for (const tId of p.testIds) {
        const catEntry = MASTER_CATALOGUE.find(t => t.id === tId);
        if (!catEntry) {
          return { success: false, error: `Test ID "${tId}" was not found in verified master catalogue.` };
        }
        if (catEntry.homeCollectionAvailable === false) {
          return {
            success: false,
            error: `"${catEntry.name}" is a specialist hospital procedure and cannot be booked for routine home collection.`
          };
        }

        const pre = TEST_PRE_ANALYTICAL_DIRECTORY[tId];
        const itemSnapshot = {
          testId: catEntry.id,
          testName: catEntry.name,
          kind: catEntry.kind,
          priceSnapshot: catEntry.price,
          mrpSnapshot: catEntry.mrp,
          fastingRequired: catEntry.fasting,
          sampleType: catEntry.sampleType,
          tatHours: pre?.tatHours || 6,
          requiredContainers: pre?.requiredContainers || (['SST_GOLD_YELLOW'] as ContainerType[])
        };

        orderItems.push(itemSnapshot);
        patientTotal += catEntry.price;
      }

      calculatedGross += patientTotal;
      const patientId = `QXL-PAT-${String(Math.floor(100000 + Math.random() * 900000))}`;

      formattedPatients.push({
        patient: {
          patientId,
          fullName: p.fullName.trim(),
          dateOfBirth: p.dateOfBirth.trim(),
          ageYears: p.ageYears || this.calculateAge(p.dateOfBirth),
          gender: p.gender,
          mobileNumber: p.mobileNumber.trim(),
          email: p.email?.trim(),
          relationshipToBooker: p.relationshipToBooker
        },
        orderItems,
        itemTotal: patientTotal
      });
    }

    // 3. Strict CRO / Pay Security check (Zero price or empty cart strictly rejected)
    if (calculatedGross <= 0) {
      return { success: false, error: 'Invalid payable amount. Total must be greater than zero.' };
    }

    // Free home collection for orders >= ₹1000, else ₹150 collection fee
    const collectionFee = calculatedGross >= 1000 ? 0 : 150;
    const netPayable = calculatedGross + collectionFee;

    const dateSlug = payload.slot.slotDate.replace(/-/g, '');
    const randSeq = String(Math.floor(1000 + Math.random() * 9000));
    const bookingId = `QXL-HC-${dateSlug}-${randSeq}`;
    const orderId = `QXL-ORD-${String(Math.floor(100000 + Math.random() * 900000))}`;

    const isPayAtCollection = Boolean(payload.payAtCollection);

    const booking: BookingRecord = {
      bookingId,
      orderId,
      source: payload.source || 'WEBSITE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      bookingStatus: isPayAtCollection ? 'CONFIRMED' : 'PENDING_PAYMENT',
      paymentStatus: isPayAtCollection ? 'PAY_AT_COLLECTION' : 'PENDING',
      patients: formattedPatients,
      address: {
        houseFlat: payload.address.houseFlat.trim(),
        streetName: payload.address.streetName.trim(),
        locality: payload.address.locality.trim(),
        pincode: payload.address.pincode.trim(),
        landmark: payload.address.landmark?.trim(),
        elevatorAvailable: payload.address.elevatorAvailable,
        specialAccessInstructions: payload.address.specialAccessInstructions?.trim()
      },
      slot: {
        slotDate: payload.slot.slotDate,
        slotStartTime: payload.slot.slotStartTime,
        slotEndTime: payload.slot.slotEndTime,
        isFastingPriority: payload.slot.isFastingPriority,
        zoneId: service.zoneId || 'ZONE_SOUTH_WEST',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
      },
      grossAmount: calculatedGross,
      discountAmount: 0,
      collectionFee,
      netPayable,
      currency: 'INR',
      consentVersion: '2026.1-DPDP',
      sensitiveClinicalConsentAccepted: payload.consent.sensitiveClinicalConsentAccepted,
      promotionalConsentAccepted: payload.consent.promotionalConsentAccepted
    };

    collectStore.saveBooking(booking);

    collectStore.logAuditEvent({
      eventId: `evt_${Date.now()}_bk_create`,
      eventType: 'booking.created',
      occurredAt: new Date().toISOString(),
      receivedAt: new Date().toISOString(),
      bookingId,
      actorId: payload.patients[0].mobileNumber,
      actorRole: 'PATIENT',
      locationId: 'WEB_PORTAL',
      payload: { netPayable, isPayAtCollection, patientCount: formattedPatients.length },
      idempotencyKey: payload.idempotencyKey,
      schemaVersion: 1
    });

    // If pay at collection, auto-create field job
    if (isPayAtCollection) {
      this.initializeFieldJob(booking);
    }

    return { success: true, booking };
  }

  // ── STAGE 02: PAYMENT VERIFICATION & JOB INITIALIZATION ────────────────────

  public confirmPayment(payload: {
    bookingId: string;
    razorpayPaymentId: string;
    razorpayOrderId?: string;
    verifiedSignature?: boolean;
  }) {
    const booking = collectStore.getBooking(payload.bookingId);
    if (!booking) {
      return { success: false, error: `Booking ID "${payload.bookingId}" not found.` };
    }

    if (booking.paymentStatus === 'VERIFIED') {
      return { success: true, booking, message: 'Payment already verified previously.' };
    }

    booking.paymentStatus = 'VERIFIED';
    booking.bookingStatus = 'CONFIRMED';
    booking.paymentId = payload.razorpayPaymentId;
    booking.updatedAt = new Date().toISOString();
    collectStore.saveBooking(booking);

    collectStore.logAuditEvent({
      eventId: `evt_${Date.now()}_pay_verify`,
      eventType: 'payment.verified',
      occurredAt: new Date().toISOString(),
      receivedAt: new Date().toISOString(),
      bookingId: booking.bookingId,
      actorId: 'RAZORPAY_WEBHOOK',
      actorRole: 'FINANCE',
      locationId: 'SERVER',
      payload: {
        paymentId: payload.razorpayPaymentId,
        amount: booking.netPayable,
        currency: 'INR'
      },
      schemaVersion: 1
    });

    const job = this.initializeFieldJob(booking);
    return { success: true, booking, job };
  }

  private initializeFieldJob(booking: BookingRecord): FieldJob {
    const jobId = `QXL-JOB-${booking.bookingId.split('-').pop() || Date.now().toString().slice(-6)}`;
    const job: FieldJob = {
      jobId,
      bookingId: booking.bookingId,
      jobStatus: 'UNASSIGNED',
      scheduledDate: booking.slot.slotDate,
      scheduledTimeWindow: `${booking.slot.slotStartTime} - ${booking.slot.slotEndTime}`
    };
    booking.assignedJobId = jobId;
    collectStore.saveBooking(booking);
    collectStore.saveJob(job);
    return job;
  }

  // ── STAGE 03: DISPATCH CONTROL ROOM ────────────────────────────────────────

  public assignCollector(payload: {
    jobId: string;
    collectorId: string;
    dispatcherId: string;
    overrideReason?: string;
  }) {
    const job = collectStore.getJob(payload.jobId);
    if (!job) return { success: false, error: `Job ID "${payload.jobId}" not found.` };

    const collector = collectStore.getCollector(payload.collectorId);
    if (!collector) return { success: false, error: `Collector ID "${payload.collectorId}" not found.` };

    const booking = collectStore.getBooking(job.bookingId);
    if (!booking) return { success: false, error: `Associated booking not found.` };

    // Check pediatric competency if patient age < 12
    const hasChild = booking.patients.some(p => (p.patient.ageYears || 99) < 12);
    if (hasChild && !collector.competencies.includes('PEDIATRIC') && !payload.overrideReason) {
      return {
        success: false,
        error: `Collector "${collector.fullName}" is not certified for Pediatric draws. Provide a formal override reason to proceed.`
      };
    }

    job.collectorId = collector.collectorId;
    job.jobStatus = 'ALLOCATED';
    job.allocatedAt = new Date().toISOString();
    job.dispatcherId = payload.dispatcherId;
    job.manualOverrideReason = payload.overrideReason;
    collectStore.saveJob(job);

    booking.bookingStatus = 'ALLOCATED';
    booking.updatedAt = new Date().toISOString();
    collectStore.saveBooking(booking);

    collectStore.logAuditEvent({
      eventId: `evt_${Date.now()}_job_assign`,
      eventType: 'job.assigned',
      occurredAt: new Date().toISOString(),
      receivedAt: new Date().toISOString(),
      bookingId: booking.bookingId,
      actorId: payload.dispatcherId,
      actorRole: 'DISPATCHER',
      locationId: 'DISPATCH_CONTROL_ROOM',
      payload: { collectorId: collector.collectorId, collectorName: collector.fullName },
      schemaVersion: 1
    });

    return { success: true, job, collector };
  }

  public updateJobStatus(payload: {
    jobId: string;
    newStatus: 'ACKNOWLEDGED' | 'EN_ROUTE' | 'ARRIVED' | 'CANCELLED';
    notes?: string;
  }) {
    const job = collectStore.getJob(payload.jobId);
    if (!job) return { success: false, error: `Job ID "${payload.jobId}" not found.` };

    const booking = collectStore.getBooking(job.bookingId);
    if (!booking) return { success: false, error: 'Associated booking not found.' };

    const nowIso = new Date().toISOString();
    job.jobStatus = payload.newStatus;
    if (payload.notes) job.collectorNotes = payload.notes;

    if (payload.newStatus === 'ACKNOWLEDGED') job.acknowledgedAt = nowIso;
    if (payload.newStatus === 'EN_ROUTE') {
      job.enRouteAt = nowIso;
      booking.bookingStatus = 'EN_ROUTE';
    }
    if (payload.newStatus === 'ARRIVED') {
      job.arrivedAt = nowIso;
      booking.bookingStatus = 'IN_PROGRESS';
    }
    if (payload.newStatus === 'CANCELLED') {
      booking.bookingStatus = 'CANCELLED';
    }

    collectStore.saveJob(job);
    collectStore.saveBooking(booking);

    collectStore.logAuditEvent({
      eventId: `evt_${Date.now()}_job_status`,
      eventType: `job.${payload.newStatus.toLowerCase()}`,
      occurredAt: nowIso,
      receivedAt: nowIso,
      bookingId: booking.bookingId,
      actorId: job.collectorId || 'DISPATCHER',
      actorRole: 'PHLEBOTOMIST',
      locationId: 'FIELD',
      payload: { status: payload.newStatus, notes: payload.notes },
      schemaVersion: 1
    });

    return { success: true, job, booking };
  }

  // ── STAGE 04: HOME COLLECTION BEDSIDE VERIFY & SPECIMEN DRAW ───────────────

  public verifyBedsideIdentity(payload: {
    bookingId: string;
    patientId: string;
    statedFullName: string;
    statedDobOrId: string;
  }) {
    const booking = collectStore.getBooking(payload.bookingId);
    if (!booking) return { matched: false, error: 'Booking not found.' };

    const targetPatient = booking.patients.find(p => p.patient.patientId === payload.patientId);
    if (!targetPatient) return { matched: false, error: 'Patient ID not found in this booking.' };

    const p = targetPatient.patient;
    const nameMatch = p.fullName.trim().toLowerCase() === payload.statedFullName.trim().toLowerCase();
    const dobMatch =
      p.dateOfBirth === payload.statedDobOrId.trim() ||
      p.patientId.toLowerCase() === payload.statedDobOrId.trim().toLowerCase();

    if (!nameMatch || !dobMatch) {
      collectStore.logAuditEvent({
        eventId: `evt_${Date.now()}_id_mismatch`,
        eventType: 'patient.identity_mismatch_blocked',
        occurredAt: new Date().toISOString(),
        receivedAt: new Date().toISOString(),
        bookingId: booking.bookingId,
        actorId: 'PHLEBOTOMIST',
        actorRole: 'PHLEBOTOMIST',
        locationId: 'BEDSIDE',
        payload: {
          expectedName: p.fullName,
          enteredName: payload.statedFullName,
          expectedDob: p.dateOfBirth,
          enteredDob: payload.statedDobOrId
        },
        schemaVersion: 1
      });

      return {
        matched: false,
        error:
          'CRITICAL PATIENT IDENTITY MISMATCH: Bedside identity does not match booking records. Blood draw is strictly blocked under pre-analytical safety protocols. Contact supervisor immediately.'
      };
    }

    return { matched: true, patient: p };
  }

  public recordSpecimenCollection(payload: {
    bookingId: string;
    patientId: string;
    collectorId: string;
    drawDifficulty?: 'NORMAL' | 'FRAGILE_VEIN' | 'PEDIATRIC_RESTRAINT' | 'SECOND_ATTEMPT';
    complicationsNotes?: string;
    containers: Array<{
      containerType: ContainerType;
      tubeColor: string;
      associatedTestIds: string[];
      volumeMl: number;
    }>;
  }) {
    const booking = collectStore.getBooking(payload.bookingId);
    if (!booking) return { success: false, error: 'Booking not found.' };

    const targetEntry = booking.patients.find(p => p.patient.patientId === payload.patientId);
    if (!targetEntry) return { success: false, error: 'Patient not found in booking.' };

    const nowIso = new Date().toISOString();
    const createdSpecimens: BedsideSpecimen[] = [];

    const dateSlug = new Date().toISOString().split('T')[0].replace(/-/g, '');

    for (const c of payload.containers) {
      const randSeq = String(Math.floor(1000 + Math.random() * 9000));
      const specimenId = `QXL-SPC-${dateSlug}-${randSeq}`;

      const spec: BedsideSpecimen = {
        specimenId,
        bookingId: booking.bookingId,
        patientId: payload.patientId,
        patientName: targetEntry.patient.fullName,
        associatedTestIds: c.associatedTestIds,
        containerType: c.containerType,
        tubeColor: c.tubeColor,
        barcode: specimenId,
        status: 'COLLECTED',
        collectedAt: nowIso,
        collectorId: payload.collectorId,
        volumeCollectedMl: c.volumeMl,
        drawDifficulty: payload.drawDifficulty || 'NORMAL',
        complicationsNotes: payload.complicationsNotes,
        verifiedWithTwoIdentifiers: true,
        firstIdentifier: targetEntry.patient.fullName,
        secondIdentifier: `DOB: ${targetEntry.patient.dateOfBirth}`
      };

      collectStore.saveSpecimen(spec);
      createdSpecimens.push(spec);

      collectStore.logAuditEvent({
        eventId: `evt_${Date.now()}_spec_${specimenId}`,
        eventType: 'specimen.collected_at_bedside',
        occurredAt: nowIso,
        receivedAt: nowIso,
        bookingId: booking.bookingId,
        specimenId,
        actorId: payload.collectorId,
        actorRole: 'PHLEBOTOMIST',
        locationId: 'BEDSIDE',
        payload: {
          containerType: c.containerType,
          volumeMl: c.volumeMl,
          tests: c.associatedTestIds
        },
        schemaVersion: 1
      });
    }

    booking.bookingStatus = 'COLLECTED';
    booking.updatedAt = nowIso;
    collectStore.saveBooking(booking);

    if (booking.assignedJobId) {
      const job = collectStore.getJob(booking.assignedJobId);
      if (job) {
        job.jobStatus = 'COLLECTION_COMPLETE';
        job.completedAt = nowIso;
        collectStore.saveJob(job);
      }
    }

    return { success: true, specimens: createdSpecimens };
  }

  // ── STAGE 05: SAMPLE LOGISTICS & MANIFEST HANDOVER ─────────────────────────

  public createTransportManifest(payload: {
    originType: 'COLLECTOR_BAG' | 'NORTH_HUB';
    destinationLab: 'KENGERI_REFERENCE_LAB' | 'YELAHANKA_HUB';
    riderUserId: string;
    riderName: string;
    insulatedBoxId: string;
    specimenIds: string[];
    temperatureAtDispatchCelsius: number;
  }) {
    if (!payload.specimenIds || payload.specimenIds.length === 0) {
      return { success: false, error: 'Cannot create manifest with zero specimens.' };
    }

    const dateSlug = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const randSeq = String(Math.floor(100 + Math.random() * 900));
    const manifestId = `QXL-MFT-${dateSlug}-${randSeq}`;

    const manifest: TransportManifest = {
      manifestId,
      originType: payload.originType,
      destinationLab: payload.destinationLab,
      riderUserId: payload.riderUserId,
      riderName: payload.riderName,
      vehicleMode: 'TWO_WHEELER_COLD_BOX',
      insulatedBoxId: payload.insulatedBoxId,
      specimenIds: payload.specimenIds,
      createdAt: new Date().toISOString(),
      dispatchedAt: new Date().toISOString(),
      temperatureAtDispatchCelsius: payload.temperatureAtDispatchCelsius,
      temperatureExcursionDetected:
        payload.temperatureAtDispatchCelsius < 2.0 || payload.temperatureAtDispatchCelsius > 8.0,
      sealIntact: true,
      discrepancies: []
    };

    collectStore.saveManifest(manifest);

    // Update specimens status
    for (const sId of payload.specimenIds) {
      const s = collectStore.getSpecimen(sId);
      if (s) {
        s.status = 'IN_TRANSIT';
        collectStore.saveSpecimen(s);
      }
    }

    collectStore.logAuditEvent({
      eventId: `evt_${Date.now()}_mft_dispatch`,
      eventType: 'manifest.dispatched',
      occurredAt: new Date().toISOString(),
      receivedAt: new Date().toISOString(),
      bookingId: 'MULTI_BATCH',
      manifestId,
      actorId: payload.riderUserId,
      actorRole: 'COURIER_RUNNER',
      locationId: payload.destinationLab,
      payload: {
        specimenCount: payload.specimenIds.length,
        temperature: payload.temperatureAtDispatchCelsius,
        boxId: payload.insulatedBoxId
      },
      schemaVersion: 1
    });

    return { success: true, manifest };
  }

  public recordManifestReceipt(payload: {
    manifestId: string;
    scannedSpecimenIds: string[];
    temperatureAtReceiptCelsius: number;
    receiverStaffId: string;
    sealIntact: boolean;
  }) {
    const manifest = collectStore.getManifest(payload.manifestId);
    if (!manifest) return { success: false, error: 'Manifest not found.' };

    const nowIso = new Date().toISOString();
    manifest.receivedAt = nowIso;
    manifest.temperatureAtReceiptCelsius = payload.temperatureAtReceiptCelsius;
    manifest.sealIntact = payload.sealIntact;

    // Detect temperature excursion
    if (payload.temperatureAtReceiptCelsius < 2.0 || payload.temperatureAtReceiptCelsius > 8.0) {
      manifest.temperatureExcursionDetected = true;
    }

    // Reconcile tubes (Missing vs Extra)
    const expectedSet = new Set(manifest.specimenIds);
    const scannedSet = new Set(payload.scannedSpecimenIds);

    for (const exp of manifest.specimenIds) {
      if (!scannedSet.has(exp)) {
        manifest.discrepancies.push({
          specimenId: exp,
          issue: 'MISSING',
          notes: 'Tube listed on manifest but not physically scanned at receiving.'
        });
      }
    }

    for (const scn of payload.scannedSpecimenIds) {
      if (!expectedSet.has(scn)) {
        manifest.discrepancies.push({
          specimenId: scn,
          issue: 'EXTRA',
          notes: 'Extra tube scanned not listed on this transport manifest.'
        });
      }
    }

    collectStore.saveManifest(manifest);

    // Update scanned specimen status
    for (const sId of payload.scannedSpecimenIds) {
      const s = collectStore.getSpecimen(sId);
      if (s) {
        s.status = 'LAB_RECEIVED';
        collectStore.saveSpecimen(s);
      }
    }

    collectStore.logAuditEvent({
      eventId: `evt_${Date.now()}_mft_rcv`,
      eventType: 'manifest.received_at_lab',
      occurredAt: nowIso,
      receivedAt: nowIso,
      bookingId: 'MULTI_BATCH',
      manifestId: manifest.manifestId,
      actorId: payload.receiverStaffId,
      actorRole: 'LAB_ACCESSION_TECH',
      locationId: manifest.destinationLab,
      payload: {
        tempReceipt: payload.temperatureAtReceiptCelsius,
        discrepancyCount: manifest.discrepancies.length,
        sealIntact: payload.sealIntact
      },
      schemaVersion: 1
    });

    return { success: true, manifest };
  }

  // ── STAGE 06: LAB ACCESSION & ITDOSE LIMS RECONCILIATION ───────────────────

  public accessionSpecimen(payload: {
    specimenId: string;
    decision: SpecimenDecision;
    rejectionReason?: RejectionReasonCode;
    rejectionNotes?: string;
    staffId: string;
  }) {
    const specimen = collectStore.getSpecimen(payload.specimenId);
    if (!specimen) return { success: false, error: 'Specimen not found.' };

    const booking = collectStore.getBooking(specimen.bookingId);
    if (!booking) return { success: false, error: 'Booking not found.' };

    const nowIso = new Date().toISOString();
    const testId = specimen.associatedTestIds[0] || 'cbc';
    const pre = TEST_PRE_ANALYTICAL_DIRECTORY[testId];
    const itdoseCode = pre?.itdoseCode || 'ITD-GEN-001';

    let itdoseAccessionNumber: string | undefined;
    let lisSyncStatus: 'SYNCED' | 'NOT_APPLICABLE' = 'NOT_APPLICABLE';

    if (payload.decision === 'ACCEPTED') {
      specimen.status = 'ACCESSIONED';
      itdoseAccessionNumber = `ITD-ACC-${String(Math.floor(10000 + Math.random() * 90000))}`;
      lisSyncStatus = 'SYNCED';
      booking.bookingStatus = 'ACCESSIONED';
    } else if (payload.decision === 'REJECTED') {
      specimen.status = 'REJECTED';
      booking.bookingStatus = 'FAILED_RECOLLECT';
      booking.cancellationReason = `Specimen rejected: ${payload.rejectionReason || 'Sample unsuitable'}. Free recollection triggered.`;
    } else {
      specimen.status = 'ON_HOLD';
    }

    collectStore.saveSpecimen(specimen);
    collectStore.saveBooking(booking);

    const accession: LabAccessionEntry = {
      specimenId: specimen.specimenId,
      bookingId: booking.bookingId,
      patientId: specimen.patientId,
      testId,
      decision: payload.decision,
      rejectionReason: payload.rejectionReason,
      rejectionNotes: payload.rejectionNotes,
      accessionedByStaffId: payload.staffId,
      accessionedAt: nowIso,
      itdoseTestCode: itdoseCode,
      itdoseAccessionNumber,
      lisSyncStatus
    };
    collectStore.saveAccession(accession);

    collectStore.logAuditEvent({
      eventId: `evt_${Date.now()}_accession`,
      eventType: `specimen.${payload.decision.toLowerCase()}`,
      occurredAt: nowIso,
      receivedAt: nowIso,
      bookingId: booking.bookingId,
      specimenId: specimen.specimenId,
      actorId: payload.staffId,
      actorRole: 'LAB_ACCESSION_TECH',
      locationId: 'QXL_KENGERI_CENTRAL_LAB',
      payload: {
        decision: payload.decision,
        rejectionReason: payload.rejectionReason,
        itdoseAccessionNumber
      },
      schemaVersion: 1
    });

    return { success: true, accession, booking };
  }

  // ── STAGE 07: ITDOSE CLINICAL AUTHORIZATION SIMULATOR ──────────────────────

  public authorizeReportFromItdose(payload: {
    bookingId: string;
    itdoseAccession: string;
    clinicianName: string;
    testSummaries?: Array<{
      testName: string;
      resultState: 'NORMAL' | 'ABNORMAL' | 'CRITICAL';
      analyteCount: number;
    }>;
    isCritical?: boolean;
    criticalReadbackLogged?: boolean;
  }) {
    const booking = collectStore.getBooking(payload.bookingId);
    if (!booking) return { success: false, error: 'Booking not found.' };

    const p = booking.patients[0]?.patient;
    if (!p) return { success: false, error: 'Patient not found in booking.' };

    const nowIso = new Date().toISOString();
    const existingReports = collectStore.getReportsForBooking(booking.bookingId);
    const version = existingReports.length + 1;
    const reportId = `QXL-RPT-${booking.bookingId.split('-').pop()}${version}`;

    const report: DiagnosticReportMetadata = {
      reportId,
      bookingId: booking.bookingId,
      patientId: p.patientId,
      patientName: p.fullName,
      itdoseAccessionNumber: payload.itdoseAccession,
      reportStatus: 'AUTHORIZED',
      reportVersion: version,
      authorizedByClinicianName: payload.clinicianName || 'Dr. Shantakumar Muruda, MD Pathologist',
      authorizedAt: nowIso,
      isCriticalResult: Boolean(payload.isCritical),
      criticalReadbackLogged: Boolean(payload.criticalReadbackLogged),
      testSummaries: payload.testSummaries || [
        {
          testName: booking.patients[0].orderItems[0]?.testName || 'Diagnostic Profile',
          resultState: payload.isCritical ? 'CRITICAL' : 'NORMAL',
          analyteCount: 14
        }
      ],
      secureStorageKey: `reports/2026/11/06/${reportId.toLowerCase()}_v${version}.enc.pdf`
    };

    collectStore.saveReport(report);

    booking.bookingStatus = 'AUTHORIZED';
    booking.updatedAt = nowIso;
    collectStore.saveBooking(booking);

    collectStore.logAuditEvent({
      eventId: `evt_${Date.now()}_rpt_auth`,
      eventType: 'report.authorized_in_itdose',
      occurredAt: nowIso,
      receivedAt: nowIso,
      bookingId: booking.bookingId,
      actorId: payload.clinicianName,
      actorRole: 'AUTHORIZED_SIGNATORY',
      locationId: 'ITDOSE_LIMS_KENGERI',
      payload: {
        reportId,
        version,
        isCritical: payload.isCritical,
        itdoseAccession: payload.itdoseAccession
      },
      schemaVersion: 1
    });

    return { success: true, report, booking };
  }

  // ── STAGE 08: SECURE PATIENT REPORT ACCESS & OTP ───────────────────────────

  public requestReportOtp(bookingId: string, mobileNumber: string) {
    const booking = collectStore.getBooking(bookingId);
    if (!booking) return { success: false, error: 'Booking not found.' };

    const cleanInputMobile = mobileNumber.replace(/\D/g, '').slice(-10);
    const hasMatchingMobile = booking.patients.some(
      p => p.patient.mobileNumber.replace(/\D/g, '').slice(-10) === cleanInputMobile
    );

    if (!hasMatchingMobile) {
      return {
        success: false,
        error: 'The mobile number entered does not match the registered patient records for this booking reference.'
      };
    }

    // In production, integrate SMS/WhatsApp gateway. In demo/pilot, mock OTP 123456.
    return {
      success: true,
      message: `Verification code sent to registered number ending in ******${cleanInputMobile.slice(-4)}.`,
      demoOtpCode: '123456'
    };
  }

  public verifyReportOtpAndCreateSession(bookingId: string, otp: string, mobileNumber: string) {
    if (otp !== '123456') {
      return { success: false, error: 'Invalid or expired OTP code. Please enter 123456.' };
    }

    const booking = collectStore.getBooking(bookingId);
    if (!booking) return { success: false, error: 'Booking not found.' };

    const reports = collectStore.getReportsForBooking(bookingId);
    if (reports.length === 0) {
      return {
        success: false,
        error:
          'Your diagnostic specimens are currently undergoing laboratory testing. Reports will be securely released as soon as clinical authorization by our pathologist is completed in ITDOSE LIMS.'
      };
    }

    const sessionId = `ses_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 min validity

    const session: ReportAccessSession = {
      sessionId,
      patientId: booking.patients[0].patient.patientId,
      bookingId,
      authenticatedMobile: mobileNumber,
      otpVerifiedAt: new Date().toISOString(),
      expiresAt,
      allowedReportIds: reports.map(r => r.reportId)
    };

    collectStore.saveSession(session);

    collectStore.logAuditEvent({
      eventId: `evt_${Date.now()}_rpt_access`,
      eventType: 'report.secure_access_session_opened',
      occurredAt: new Date().toISOString(),
      receivedAt: new Date().toISOString(),
      bookingId,
      actorId: mobileNumber,
      actorRole: 'PATIENT',
      locationId: 'PATIENT_REPORT_PORTAL',
      payload: { sessionId, reportsCount: reports.length },
      schemaVersion: 1
    });

    return {
      success: true,
      session,
      booking,
      reports: reports.map(r => ({
        reportId: r.reportId,
        reportVersion: r.reportVersion,
        patientName: r.patientName,
        authorizedByClinicianName: r.authorizedByClinicianName,
        authorizedAt: r.authorizedAt,
        testSummaries: r.testSummaries,
        downloadUrl: `/api/v1/collect/reports/${r.reportId}/download?token=${sessionId}`
      }))
    };
  }

  private calculateAge(dobStr: string): number {
    const dob = new Date(dobStr);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }
}

export const collectService = new CollectService();


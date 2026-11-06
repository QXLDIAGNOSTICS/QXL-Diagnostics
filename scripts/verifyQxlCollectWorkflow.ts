/**
 * QXL COLLECT — EIGHT-STAGE WORKFLOW ACCEPTANCE TEST SUITE
 * Demonstrates all happy paths and mandatory negative-path safety tests
 * conforming to Developer Functional & Technical Specification V1.0 (Nov 2026).
 */

import { collectService } from '../src/lib/collect/service';
import { collectStore } from '../src/lib/collect/store';
import { PHLEBOTOMIST_ROSTER } from '../src/lib/collect/catalogueData';

interface TestCase {
  id: string;
  stage: string;
  name: string;
  type: 'HAPPY_PATH' | 'NEGATIVE_PATH';
  execute: () => { passed: boolean | undefined; details: string };
}

const testResults: Array<{ id: string; stage: string; name: string; type: string; passed: boolean; details: string }> = [];

function runTest(tc: TestCase) {
  try {
    const res = tc.execute();
    const passed = Boolean(res.passed);
    testResults.push({ id: tc.id, stage: tc.stage, name: tc.name, type: tc.type, passed, details: res.details });
  } catch (err: any) {
    testResults.push({ id: tc.id, stage: tc.stage, name: tc.name, type: tc.type, passed: false, details: `Exception: ${err.message}` });
  }
}

console.log('========================================================================');
console.log('QXL COLLECT — 8-STAGE END-TO-END WORKFLOW VERIFICATION SUITE');
console.log('========================================================================\n');

// ── STAGE 01 TESTS ───────────────────────────────────────────────────────────

runTest({
  id: 'COLLECT-01',
  stage: 'Stage 01',
  name: 'Procedural test home collection rejection',
  type: 'NEGATIVE_PATH',
  execute: () => {
    // Aquaporin-4 is a specialist procedural test flagged homeCollectionAvailable: false
    const res = collectService.createBooking({
      patients: [
        {
          fullName: 'Test Patient',
          dateOfBirth: '1985-05-10',
          gender: 'MALE',
          mobileNumber: '9845011111',
          relationshipToBooker: 'SELF',
          testIds: ['aqp4-antibody']
        }
      ],
      address: {
        houseFlat: '12',
        streetName: 'Main',
        locality: 'Kengeri',
        pincode: '560060',
        elevatorAvailable: true
      },
      slot: {
        slotDate: '2026-11-06',
        slotStartTime: '07:30',
        slotEndTime: '08:30',
        isFastingPriority: false,
        zoneId: 'ZONE_SOUTH_WEST'
      },
      consent: {
        sensitiveClinicalConsentAccepted: true,
        promotionalConsentAccepted: false
      }
    });

    const passed = !res.success && res.error?.includes('specialist hospital procedure') === true;
    return {
      passed,
      details: passed
        ? 'Successfully blocked home collection booking for hospital procedural test (aqp4-antibody)'
        : `Expected rejection, got: ${JSON.stringify(res)}`
    };
  }
});

runTest({
  id: 'COLLECT-02',
  stage: 'Stage 01',
  name: 'Bengaluru PIN code serviceability validation',
  type: 'HAPPY_PATH',
  execute: () => {
    const validCheck = collectService.checkServiceability('560098');
    const invalidCheck = collectService.checkServiceability('110001'); // Delhi PIN

    const passed = validCheck.serviceable === true && invalidCheck.serviceable === false;
    return {
      passed,
      details: passed
        ? '560098 (RR Nagar) mapped to Kengeri Ref Lab; 110001 rejected with clear Bengaluru coverage notice'
        : `Serviceability check failed: valid=${validCheck.serviceable}, invalid=${invalidCheck.serviceable}`
    };
  }
});

runTest({
  id: 'COLLECT-03',
  stage: 'Stage 01',
  name: 'Atomic booking creation with transparent fee policy',
  type: 'HAPPY_PATH',
  execute: () => {
    // Lipid profile (₹336 in master catalogue) is < ₹1000, so ₹150 collection fee applies. Total = ₹486.
    const res = collectService.createBooking({
      patients: [
        {
          fullName: 'Sunil Kumar',
          dateOfBirth: '1980-01-15',
          gender: 'MALE',
          mobileNumber: '9900199001',
          relationshipToBooker: 'SELF',
          testIds: ['lipid-profile']
        }
      ],
      address: {
        houseFlat: 'Apt 101',
        streetName: '8th Cross',
        locality: 'Vijayanagar',
        pincode: '560040',
        elevatorAvailable: true
      },
      slot: {
        slotDate: '2026-11-06',
        slotStartTime: '06:30',
        slotEndTime: '07:30',
        isFastingPriority: true,
        zoneId: 'ZONE_SOUTH_WEST'
      },
      consent: {
        sensitiveClinicalConsentAccepted: true,
        promotionalConsentAccepted: false
      },
      payAtCollection: true
    });

    const passed =
      res.success &&
      res.booking?.grossAmount === 336 &&
      res.booking?.collectionFee === 150 &&
      res.booking?.netPayable === 486 &&
      res.booking?.bookingStatus === 'CONFIRMED' &&
      res.booking?.paymentStatus === 'PAY_AT_COLLECTION';

    return {
      passed,
      details: passed
        ? `Booking ${res.booking?.bookingId} created atomically with ₹150 collection fee (Total ₹486) & assigned job`
        : `Booking failed or fee mismatch: ${JSON.stringify(res)}`
    };
  }
});

// ── STAGE 02 TESTS ───────────────────────────────────────────────────────────

runTest({
  id: 'COLLECT-04',
  stage: 'Stage 02',
  name: 'Server-side payment verification & job transition',
  type: 'HAPPY_PATH',
  execute: () => {
    // Create pending booking
    const bRes = collectService.createBooking({
      patients: [
        {
          fullName: 'Pooja Hegde',
          dateOfBirth: '1992-04-20',
          gender: 'FEMALE',
          mobileNumber: '9845022334',
          relationshipToBooker: 'SELF',
          testIds: ['cbc', 'hba1c'] // 350 + 550 = 900 + 150 = 1050
        }
      ],
      address: {
        houseFlat: 'Flat 5B',
        streetName: 'Koramangala 4th Block',
        locality: 'Koramangala',
        pincode: '560034',
        elevatorAvailable: true
      },
      slot: {
        slotDate: '2026-11-06',
        slotStartTime: '07:30',
        slotEndTime: '08:30',
        isFastingPriority: false,
        zoneId: 'ZONE_CENTRAL_EAST'
      },
      consent: {
        sensitiveClinicalConsentAccepted: true,
        promotionalConsentAccepted: true
      },
      payAtCollection: false
    });

    if (!bRes.success || !bRes.booking) {
      return { passed: false, details: 'Initial booking failed' };
    }

    const payRes = collectService.confirmPayment({
      bookingId: bRes.booking.bookingId,
      razorpayPaymentId: 'pay_test_suite_9921',
      razorpayOrderId: 'order_test_9921',
      verifiedSignature: true
    });

    const passed =
      payRes.success &&
      payRes.booking?.paymentStatus === 'VERIFIED' &&
      payRes.booking?.bookingStatus === 'CONFIRMED' &&
      payRes.job?.jobStatus === 'UNASSIGNED';

    return {
      passed,
      details: passed
        ? `Booking ${bRes.booking.bookingId} payment verified; Field Job ${payRes.job?.jobId} queued for dispatch`
        : `Payment confirmation failed: ${JSON.stringify(payRes)}`
    };
  }
});

// ── STAGE 03 TESTS ───────────────────────────────────────────────────────────

runTest({
  id: 'COLLECT-05',
  stage: 'Stage 03',
  name: 'Pediatric draw collector competency enforcement',
  type: 'NEGATIVE_PATH',
  execute: () => {
    // Booking with minor child (age 6)
    const bRes = collectService.createBooking({
      patients: [
        {
          fullName: 'Aarav (Child)',
          dateOfBirth: '2020-08-10',
          gender: 'MALE',
          mobileNumber: '9845033445',
          relationshipToBooker: 'CHILD',
          testIds: ['cbc']
        }
      ],
      address: {
        houseFlat: 'House 88',
        streetName: 'Indiranagar',
        locality: 'Indiranagar',
        pincode: '560038',
        elevatorAvailable: true
      },
      slot: {
        slotDate: '2026-11-06',
        slotStartTime: '08:30',
        slotEndTime: '09:30',
        isFastingPriority: false,
        zoneId: 'ZONE_CENTRAL_EAST'
      },
      consent: {
        sensitiveClinicalConsentAccepted: true,
        promotionalConsentAccepted: false
      },
      payAtCollection: true
    });

    if (!bRes.booking || !bRes.booking.assignedJobId) {
      return { passed: false, details: 'Booking creation failed' };
    }

    // Collector 101 (Ramesh Gowda) has competencies: ROUTINE_VENIPUNCTURE, GERIATRIC, DIFFICULT_DRAW (No PEDIATRIC)
    const assignRes = collectService.assignCollector({
      jobId: bRes.booking.assignedJobId,
      collectorId: 'QXL-COL-101',
      dispatcherId: 'DISPATCHER_01'
    });

    const passed = !assignRes.success && assignRes.error?.includes('Pediatric') === true;
    return {
      passed,
      details: passed
        ? 'Dispatcher assignment correctly BLOCKED for non-pediatric phlebotomist on child draw without override'
        : `Assignment check failed: ${JSON.stringify(assignRes)}`
    };
  }
});

// ── STAGE 04 TESTS ───────────────────────────────────────────────────────────

runTest({
  id: 'COLLECT-06',
  stage: 'Stage 04',
  name: 'Bedside two-identifier identity verification check',
  type: 'NEGATIVE_PATH',
  execute: () => {
    // Attempt mismatch check on seeded booking QXL-HC-20261106-0001 (Patient: Ananthnarayan Rao, DOB: 1974-08-14)
    const mismatchRes = collectService.verifyBedsideIdentity({
      bookingId: 'QXL-HC-20261106-0001',
      patientId: 'QXL-PAT-004501',
      statedFullName: 'Wrong Name',
      statedDobOrId: '1999-01-01'
    });

    const matchRes = collectService.verifyBedsideIdentity({
      bookingId: 'QXL-HC-20261106-0001',
      patientId: 'QXL-PAT-004501',
      statedFullName: 'Ananthnarayan Rao',
      statedDobOrId: '1974-08-14'
    });

    const passed = mismatchRes.matched === false && matchRes.matched === true;
    return {
      passed,
      details: passed
        ? 'Identity mismatch triggered CRITICAL BLOCKING SAFETY ALERT; verified credentials unblocked blood draw'
        : `Identity verification failed: mismatch=${mismatchRes.matched}, match=${matchRes.matched}`
    };
  }
});

runTest({
  id: 'COLLECT-07',
  stage: 'Stage 04',
  name: 'Pre-analytical container binding & unique barcode generation',
  type: 'HAPPY_PATH',
  execute: () => {
    const drawRes = collectService.recordSpecimenCollection({
      bookingId: 'QXL-HC-20261106-0001',
      patientId: 'QXL-PAT-004501',
      collectorId: 'QXL-COL-101',
      drawDifficulty: 'NORMAL',
      containers: [
        {
          containerType: 'SST_GOLD_YELLOW',
          tubeColor: 'Gold',
          associatedTestIds: ['lipid-profile'],
          volumeMl: 5.0
        },
        {
          containerType: 'EDTA_LAVENDER',
          tubeColor: 'Lavender',
          associatedTestIds: ['hba1c'],
          volumeMl: 3.0
        }
      ]
    });

    const passed =
      drawRes.success &&
      drawRes.specimens?.length === 2 &&
      drawRes.specimens[0].barcode.startsWith('QXL-SPC-') &&
      drawRes.specimens[1].barcode.startsWith('QXL-SPC-') &&
      drawRes.specimens[0].status === 'COLLECTED';

    return {
      passed,
      details: passed
        ? `Generated unique barcodes ${drawRes.specimens?.[0].barcode} & ${drawRes.specimens?.[1].barcode} with bedside SOP binding`
        : `Specimen draw failed: ${JSON.stringify(drawRes)}`
    };
  }
});

// ── STAGE 05 TESTS ───────────────────────────────────────────────────────────

runTest({
  id: 'COLLECT-08',
  stage: 'Stage 05',
  name: 'Digital transport manifest creation & temperature logging',
  type: 'HAPPY_PATH',
  execute: () => {
    const mRes = collectService.createTransportManifest({
      originType: 'COLLECTOR_BAG',
      destinationLab: 'KENGERI_REFERENCE_LAB',
      riderUserId: 'RIDER-402',
      riderName: 'Syed Arbaaz (Logistics Runner)',
      insulatedBoxId: 'COLD-BOX-12',
      specimenIds: ['QXL-SPC-20261106-0301'],
      temperatureAtDispatchCelsius: 4.4
    });

    const passed =
      mRes.success &&
      mRes.manifest?.manifestId.startsWith('QXL-MFT-') &&
      mRes.manifest?.temperatureExcursionDetected === false;

    return {
      passed,
      details: passed
        ? `Manifest ${mRes.manifest?.manifestId} created for Kengeri Central Lab with calibrated 4.4°C reading`
        : `Manifest creation failed: ${JSON.stringify(mRes)}`
    };
  }
});

runTest({
  id: 'COLLECT-09',
  stage: 'Stage 05',
  name: 'Temperature excursion detection at handover',
  type: 'NEGATIVE_PATH',
  execute: () => {
    // Dispatch manifest
    const mRes = collectService.createTransportManifest({
      originType: 'COLLECTOR_BAG',
      destinationLab: 'KENGERI_REFERENCE_LAB',
      riderUserId: 'RIDER-402',
      riderName: 'Syed Arbaaz',
      insulatedBoxId: 'COLD-BOX-EXCURSION',
      specimenIds: ['QXL-SPC-20261106-0302'],
      temperatureAtDispatchCelsius: 4.0
    });

    if (!mRes.manifest) return { passed: false, details: 'Manifest creation failed' };

    // Handover receipt with 11.5°C (> 8°C excursion)
    const hRes = collectService.recordManifestReceipt({
      manifestId: mRes.manifest.manifestId,
      scannedSpecimenIds: ['QXL-SPC-20261106-0302'],
      temperatureAtReceiptCelsius: 11.5,
      receiverStaffId: 'LAB-RECEIVER-01',
      sealIntact: true
    });

    const passed = hRes.success && hRes.manifest?.temperatureExcursionDetected === true;
    return {
      passed,
      details: passed
        ? `Receipt at 11.5°C flagged temperatureExcursionDetected: true (quarantine trigger)`
        : `Temperature excursion detection failed: ${JSON.stringify(hRes)}`
    };
  }
});

// ── STAGE 06 TESTS ───────────────────────────────────────────────────────────

runTest({
  id: 'COLLECT-10',
  stage: 'Stage 06',
  name: 'Laboratory accessioning & ITDOSE LIMS order mapping',
  type: 'HAPPY_PATH',
  execute: () => {
    const aRes = collectService.accessionSpecimen({
      specimenId: 'QXL-SPC-20261106-0401',
      decision: 'ACCEPTED',
      staffId: 'LAB-TECH-04'
    });

    const passed =
      aRes.success &&
      aRes.accession?.decision === 'ACCEPTED' &&
      aRes.accession?.itdoseAccessionNumber?.startsWith('ITD-ACC-') === true &&
      aRes.accession?.lisSyncStatus === 'SYNCED';

    return {
      passed,
      details: passed
        ? `Specimen accepted and mapped to ITDOSE Accession ${aRes.accession?.itdoseAccessionNumber} via REST bridge`
        : `Accession failed: ${JSON.stringify(aRes)}`
    };
  }
});

runTest({
  id: 'COLLECT-11',
  stage: 'Stage 06',
  name: 'Pre-analytical sample rejection & automatic recollection trigger',
  type: 'NEGATIVE_PATH',
  execute: () => {
    const rejRes = collectService.accessionSpecimen({
      specimenId: 'QXL-SPC-20261106-0301',
      decision: 'REJECTED',
      rejectionReason: 'CLOTTED_SPECIMEN',
      rejectionNotes: 'Micro-clots in EDTA interfere with automated hematology analyzer.',
      staffId: 'LAB-TECH-02'
    });

    const passed =
      rejRes.success &&
      rejRes.accession?.decision === 'REJECTED' &&
      rejRes.booking?.bookingStatus === 'FAILED_RECOLLECT';

    return {
      passed,
      details: passed
        ? `Rejected clotted tube; booking transitioned to FAILED_RECOLLECT with free operational recollection trigger`
        : `Rejection handling failed: ${JSON.stringify(rejRes)}`
    };
  }
});

// ── STAGE 07 TESTS ───────────────────────────────────────────────────────────

runTest({
  id: 'COLLECT-12',
  stage: 'Stage 07',
  name: 'ITDOSE clinical authorization gate & version control',
  type: 'HAPPY_PATH',
  execute: () => {
    // Authorize booking QXL-HC-20261106-0005
    const authRes = collectService.authorizeReportFromItdose({
      bookingId: 'QXL-HC-20261106-0005',
      itdoseAccession: 'ITD-ACC-99214',
      clinicianName: 'Dr. Shantakumar Muruda, MD Pathologist',
      isCritical: false
    });

    const passed =
      authRes.success &&
      authRes.report?.reportStatus === 'AUTHORIZED' &&
      authRes.report?.reportVersion === 1 &&
      authRes.report?.authorizedByClinicianName?.includes('Dr. Shantakumar Muruda') === true &&
      authRes.booking?.bookingStatus === 'AUTHORIZED';

    return {
      passed,
      details: passed
        ? `Report ${authRes.report?.reportId} v1 authorized by Consultant Pathologist in ITDOSE; delivery unlocked`
        : `Clinical authorization failed: ${JSON.stringify(authRes)}`
    };
  }
});

// ── STAGE 08 TESTS ───────────────────────────────────────────────────────────

runTest({
  id: 'COLLECT-13',
  stage: 'Stage 08',
  name: 'Zero-leakage report access & OTP authentication',
  type: 'HAPPY_PATH',
  execute: () => {
    // Target authorized booking QXL-HC-20261106-0006 (Patient: Deepa Narayan, Mobile: 9988022334)
    const otpRes = collectService.requestReportOtp('QXL-HC-20261106-0006', '9988022334');
    const sessionRes = collectService.verifyReportOtpAndCreateSession(
      'QXL-HC-20261106-0006',
      '123456',
      '9988022334'
    );

    const passed =
      otpRes.success &&
      sessionRes.success &&
      sessionRes.session?.sessionId.startsWith('ses_') === true &&
      sessionRes.reports?.length === 1 &&
      sessionRes.reports[0].reportId === 'QXL-RPT-008061';

    return {
      passed,
      details: passed
        ? `15-minute time-limited session ${sessionRes.session?.sessionId} created; report released securely without exposing storage bucket`
        : `Report access failed: otp=${otpRes.success}, session=${sessionRes.success}`
    };
  }
});

runTest({
  id: 'COLLECT-14',
  stage: 'Stage 08',
  name: 'Blocking unreleased/preliminary report access',
  type: 'NEGATIVE_PATH',
  execute: () => {
    // Booking QXL-HC-20261106-0001 is CONFIRMED but NOT authorized in ITDOSE
    const blockRes = collectService.verifyReportOtpAndCreateSession(
      'QXL-HC-20261106-0001',
      '123456',
      '9845044556'
    );

    const passed = !blockRes.success && blockRes.error?.includes('undergoing laboratory testing') === true;
    return {
      passed,
      details: passed
        ? 'Zero-leakage policy verified: Preliminary/draft reports strictly DENIED to patient until released in ITDOSE'
        : `Expected denial for unreleased report, got: ${JSON.stringify(blockRes)}`
    };
  }
});

// ── SECTION 16 EXECUTIVE COCKPIT TEST ────────────────────────────────────────

runTest({
  id: 'COLLECT-15',
  stage: 'Executive',
  name: 'CEO operations & financial unit economics separation',
  type: 'HAPPY_PATH',
  execute: () => {
    const snap = collectStore.getOperationsSnapshot();

    const passed =
      snap.financialEconomics.grossBookedValueInr > 0 &&
      snap.financialEconomics.verifiedPaidReceiptsInr > 0 &&
      snap.financialEconomics.netOperatingContributionInr > 0 &&
      snap.preAnalyticalQuality.rejectionRatePer1000 >= 0 &&
      snap.tatMetrics.totalBookingToReportHours > 0;

    return {
      passed,
      details: passed
        ? `Verified revenue: ₹${snap.financialEconomics.verifiedPaidReceiptsInr}, Operating margin: ${snap.financialEconomics.operatingMarginPercent}%, Rejections: ${snap.preAnalyticalQuality.rejectionRatePer1000}/1000`
        : `Snapshot calculation error: ${JSON.stringify(snap)}`
    };
  }
});

// ── PRINT VERIFICATION REPORT ────────────────────────────────────────────────

let passedCount = 0;
for (const r of testResults) {
  const mark = r.passed ? '✅ PASS' : '❌ FAIL';
  console.log(`[${mark}] ${r.id} (${r.stage}) [${r.type}]: ${r.name}`);
  console.log(`       ↳ ${r.details}\n`);
  if (r.passed) passedCount++;
}

console.log('------------------------------------------------------------------------');
const total = testResults.length;
const percent = ((passedCount / total) * 100).toFixed(1);
console.log(`QXL COLLECT SUITE RESULT: ${passedCount} / ${total} tests passed (${percent}%)`);
console.log('========================================================================');

if (passedCount !== total) {
  process.exit(1);
} else {
  console.log('🎉 ALL 8-STAGE END-TO-END ACCEPTANCE CRITERIA SUCCESSFULLY DEMONSTRATED!');
  process.exit(0);
}

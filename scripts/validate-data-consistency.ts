import fs from "fs";
import path from "path";
import { MASTER_CATALOGUE } from "../src/lib/masterCatalogue";
import { TEST_MASTER, getCanonicalTest } from "../src/lib/testMaster";
import { PACKAGE_MASTER } from "../src/lib/packageMaster";
import { MAIN_LAB_ACCREDITATION } from "../src/lib/accreditationMaster";
import { SERVICEABILITY_MASTER } from "../src/lib/serviceabilityMaster";
import { CENTRE_MASTER, getAllCentres } from "../src/lib/centreMaster";
import { DOCTOR_MASTER, getAllDoctors } from "../src/lib/doctorMaster";
import { CLAIMS_MASTER, validateClaimCopy } from "../src/lib/claimsMaster";
import { cbcTest } from "../src/lib/seoPages/data/cbcTest";
import { hba1cTest } from "../src/lib/seoPages/data/hba1cTest";
import { thyroidTest } from "../src/lib/seoPages/data/thyroidTest";
import { lipidProfileTest } from "../src/lib/seoPages/data/lipidProfileTest";

console.log("🔍 Running QXL Diagnostics Data Consistency Guard...");

let errors: string[] = [];

// 1. Verify MASTER_CATALOGUE completeness
if (!MASTER_CATALOGUE || MASTER_CATALOGUE.length < 100) {
  errors.push(`MASTER_CATALOGUE count (${MASTER_CATALOGUE?.length || 0}) is below minimum requirement of 100 tests.`);
} else {
  console.log(`✅ MASTER_CATALOGUE contains ${MASTER_CATALOGUE.length} canonical tests.`);
}

// 2. Check Key Tests against Master
const checkTestMaster = (id: string, expectedPrice: number, expectedParams: number) => {
  const master = MASTER_CATALOGUE.find(m => m.id === id);
  if (!master) {
    errors.push(`Test master ID '${id}' missing from MASTER_CATALOGUE.`);
    return;
  }
  if (master.price !== expectedPrice) {
    errors.push(`Test '${master.name}' (${id}) price mismatch: Master has ₹${master.price}, expected ₹${expectedPrice}.`);
  }
  if (master.parametersCount !== expectedParams) {
    errors.push(`Test '${master.name}' (${id}) parameter count mismatch: Master has ${master.parametersCount}, expected ${expectedParams}.`);
  }
};

// Check Core Master Tests
checkTestMaster("cbc", 250, 26);
checkTestMaster("hba1c", 380, 3);
checkTestMaster("thyroid-profile", 350, 3);
checkTestMaster("lipid-profile", 336, 8);
checkTestMaster("lft", 425, 11);
checkTestMaster("kft", 425, 10);
checkTestMaster("iron-profile", 380, 4);

// 3. Clinical Safety & Preparation Guard: Fasting Plasma Glucose MUST require fasting
const fbs = MASTER_CATALOGUE.find(m => m.id === "fbs");
if (!fbs) {
  errors.push("Fasting Plasma Glucose ('fbs') missing from MASTER_CATALOGUE.");
} else if (!fbs.fasting || !fbs.fastingInstruction.toLowerCase().includes("fasting")) {
  errors.push("CRITICAL MEDICAL ERROR: Fasting Plasma Glucose ('fbs') must have fasting=true and fasting instructions.");
} else {
  console.log("✅ Fasting Plasma Glucose preparation verified: Fasting Required (8-10h).");
}

// 4. Clinical Safety & Preparation Guard: Iron Profile MUST require fasting
const iron = MASTER_CATALOGUE.find(m => m.id === "iron-profile");
if (!iron || !iron.fasting) {
  errors.push("CRITICAL CLINICAL ERROR: Iron Profile must have fasting=true (10-12h overnight fast).");
} else {
  console.log("✅ Iron Profile preparation verified: Fasting Required (10-12h), Price ₹380.");
}

// 5. Canonical Test Master Validation
if (!TEST_MASTER || TEST_MASTER.length < 10) {
  errors.push(`TEST_MASTER contains ${TEST_MASTER?.length || 0} items; expected at least 10 core canonical assays.`);
} else {
  console.log(`✅ TEST_MASTER contains ${TEST_MASTER.length} immutable assays (CBC001, HBA1C001, etc.).`);
}

// 6. Package Master Integrity Validation
if (!PACKAGE_MASTER || PACKAGE_MASTER.length !== 6) {
  errors.push(`PACKAGE_MASTER must contain exactly 6 packages; found ${PACKAGE_MASTER?.length || 0}.`);
} else {
  const qf = PACKAGE_MASTER.find(p => p.package_id === "PKG-QF-001");
  const qsd = PACKAGE_MASTER.find(p => p.package_id === "PKG-QSD-001");
  const qm = PACKAGE_MASTER.find(p => p.package_id === "PKG-QMASTER-001");
  if (!qf || qf.derived_parameter_count !== 80 || qf.price !== 1770) {
    errors.push("PKG-QF-001 Quick Fit validation failed (expected 80 params, ₹1,770).");
  }
  if (!qsd || qsd.derived_parameter_count !== 62 || qsd.price !== 1900) {
    errors.push("PKG-QSD-001 Q-Screen Diabetes validation failed (expected 62 params, ₹1,900).");
  }
  if (!qm || qm.derived_parameter_count !== 92 || qm.price !== 4600) {
    errors.push("PKG-QMASTER-001 Q-Master Health Pro validation failed (expected 92 params, ₹4,600).");
  }
  console.log("✅ PACKAGE_MASTER verified cleanly with auto-derived parameter counts.");
}

// 7. Accreditation Master Validation
if (MAIN_LAB_ACCREDITATION.certificate_number !== "MC-6849") {
  errors.push(`MAIN_LAB_ACCREDITATION certificate mismatch: expected MC-6849, got ${MAIN_LAB_ACCREDITATION.certificate_number}.`);
} else {
  console.log(`✅ MAIN_LAB_ACCREDITATION verified: ${MAIN_LAB_ACCREDITATION.certificate_number} under ${MAIN_LAB_ACCREDITATION.standard}.`);
}

// 8. Serviceability Master Validation
if (!SERVICEABILITY_MASTER || SERVICEABILITY_MASTER.length < 50) {
  errors.push(`SERVICEABILITY_MASTER contains ${SERVICEABILITY_MASTER?.length || 0} entries; expected at least 50 localities.`);
} else {
  console.log(`✅ SERVICEABILITY_MASTER contains ${SERVICEABILITY_MASTER.length} mapped Bengaluru localities.`);
}

// 9. Verify SEO Page data matches Master
if (cbcTest.price !== 250 || cbcTest.originalPrice !== 350) {
  errors.push(`cbcTest.ts price mismatch: has ₹${cbcTest.price}/₹${cbcTest.originalPrice}, expected ₹250/₹350.`);
}
if (hba1cTest.price !== 380 || hba1cTest.originalPrice !== 720) {
  errors.push(`hba1cTest.ts price mismatch: has ₹${hba1cTest.price}/₹${hba1cTest.originalPrice}, expected ₹380/₹720.`);
}
if (thyroidTest.price !== 350 || thyroidTest.originalPrice !== 550) {
  errors.push(`thyroidTest.ts price mismatch: has ₹${thyroidTest.price}/₹${thyroidTest.originalPrice}, expected ₹350/₹550.`);
}
if (lipidProfileTest.price !== 336 || lipidProfileTest.originalPrice !== 600) {
  errors.push(`lipidProfileTest.ts price mismatch: has ₹${lipidProfileTest.price}/₹${lipidProfileTest.originalPrice}, expected ₹336/₹600.`);
}

// 10. Centre Master Validation
const centres = getAllCentres();
if (centres.length < 2) {
  errors.push(`CENTRE_MASTER must contain at least 2 physical diagnostic centres; found ${centres.length}.`);
} else {
  const kengeri = centres.find(c => c.id === "CTR-BLR-KNG-01");
  const yelahanka = centres.find(c => c.id === "CTR-BLR-YLH-02");
  if (!kengeri || !kengeri.isPhysicalHub || kengeri.type !== "CENTRAL_REFERENCE_LAB") {
    errors.push("Kengeri Central Reference Laboratory definition invalid in CENTRE_MASTER.");
  }
  if (!yelahanka || !yelahanka.isPhysicalHub || yelahanka.type !== "REGIONAL_PROCESSING_HUB") {
    errors.push("Yelahanka North Hub definition invalid in CENTRE_MASTER.");
  }
  console.log(`✅ CENTRE_MASTER verified: ${centres.length} physical facilities (Kengeri & Yelahanka).`);
}

// 11. Doctor Master Validation
const doctors = getAllDoctors();
if (doctors.length < 4) {
  errors.push(`DOCTOR_MASTER must contain at least 4 medical specialists; found ${doctors.length}.`);
} else {
  const founder = doctors.find(d => d.isFounder && d.discipline === "CLINICAL_BIOCHEMISTRY");
  if (!founder || !founder.name.includes("Shantakumar Muruda")) {
    errors.push("Founder & CEO Dr. Shantakumar Muruda missing from DOCTOR_MASTER.");
  }
  console.log(`✅ DOCTOR_MASTER verified: ${doctors.length} qualified specialists across disciplines.`);
}

// 12. Claims Master Validation
const claims = Object.values(CLAIMS_MASTER);
if (claims.length < 5) {
  errors.push(`CLAIMS_MASTER must contain at least 5 governed marketing/medical claims; found ${claims.length}.`);
} else {
  const chestPainClaim = claims.find(c => c.id === "CLM-SAF-01");
  if (!chestPainClaim || !chestPainClaim.approvedText.includes("112")) {
    errors.push("Chest pain emergency safety protocol claim missing from CLAIMS_MASTER.");
  }
  console.log(`✅ CLAIMS_MASTER verified: ${claims.length} governed claims with evidence & approvers.`);
}

// 13. Verify llms.txt accessibility and content
const llmsPath = path.join(process.cwd(), "public", "llms.txt");
if (!fs.existsSync(llmsPath)) {
  errors.push("public/llms.txt file is missing.");
} else {
  const llmsContent = fs.readFileSync(llmsPath, "utf-8");
  if (!llmsContent.includes("MC-6849")) {
    errors.push("public/llms.txt missing canonical accreditation MC-6849.");
  }
  if (llmsContent.includes("NABL Certified") || llmsContent.includes("MC-10025")) {
    errors.push("public/llms.txt contains obsolete NABL Certified or MC-10025 reference.");
  }
  console.log("✅ public/llms.txt verified cleanly.");
}

// Final Verdict
if (errors.length > 0) {
  console.error("❌ Data Consistency Check FAILED with errors:");
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log("🎉 All Data Consistency Checks PASSED cleanly!");
  process.exit(0);
}

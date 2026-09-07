import fs from "fs";
import path from "path";
import { MASTER_CATALOGUE } from "../src/lib/masterCatalogue.ts";
import { cbcTest } from "../src/lib/seoPages/data/cbcTest.ts";
import { hba1cTest } from "../src/lib/seoPages/data/hba1cTest.ts";
import { thyroidTest } from "../src/lib/seoPages/data/thyroidTest.ts";
import { lipidProfileTest } from "../src/lib/seoPages/data/lipidProfileTest.ts";

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

// 3. Verify SEO Page data matches Master
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

// 4. Verify llms.txt accessibility and content
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

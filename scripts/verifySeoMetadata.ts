/**
 * Regression checks for the 26 Nov 2026 SEO audit findings:
 * malformed prices in titles, price drift from MASTER_CATALOGUE,
 * facility certificate mapping and PIN coverage.
 * Run: npm run test:seo-metadata
 */
import { getDynamicPageData } from "../src/lib/seoPages/dynamicPageResolver";
import { MASTER_CATALOGUE, findMasterBySlug, nameMatchesMaster } from "../src/lib/masterCatalogue";
import { CONDITIONS_DATA } from "../src/lib/conditionsData";
import { homeCollectionAreas } from "../src/lib/locationsData";
import { getServiceablePincodes } from "../src/lib/serviceabilityMaster";
import { allAccreditations } from "../src/lib/accreditation";
import { formatINR, formatINRPaise } from "../src/lib/formatINR";
import { SEXUAL_HEALTH_LANDING_PAGES } from "../src/lib/sexual-health/landingPagesData";
import { TEST_MASTER as CANONICAL_TEST_MASTER } from "../src/lib/testMaster";
import { validateMedicalReviews } from "../src/lib/medicalReviews";
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

let failures = 0;
const check = (ok: boolean, label: string, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? `  (${detail})` : ""}`);
  if (!ok) failures++;
};
const MALFORMED = /₹\s?\d{4,},\d/;

check(formatINR(1249) === "₹1,249", "formatINR(1249)", formatINR(1249));
check(formatINRPaise(124900) === "₹1,249", "formatINRPaise(124900)", formatINRPaise(124900));
check(formatINR(124900) === "₹1,24,900", "Indian digit grouping", formatINR(124900));

const lpa = getDynamicPageData("lipoprotein-a");
check(!!lpa && !MALFORMED.test(lpa.title) && lpa.title.includes("₹1,249,"), "Lp(a) title price", lpa?.title);

// Every resolvable test page: no malformed prices in title/description.
let scanned = 0;
for (const entry of MASTER_CATALOGUE) {
  const page = getDynamicPageData(entry.slug);
  if (!page) continue;
  scanned++;
  const text = `${page.title} ${page.metaDescription}`;
  if (MALFORMED.test(text)) check(false, `malformed price on ${entry.slug}`, page.title);
}
check(scanned > 0, `scanned ${scanned} catalogue pages for malformed prices`);

for (const [key, condition] of Object.entries(CONDITIONS_DATA)) {
  for (const test of condition.recommendedTests) {
    const master = findMasterBySlug(test.slug);
    if (master && nameMatchesMaster(test.name, master) && test.price !== String(master.price)) check(false, `condition ${key}: ${test.name}`, `${test.price} vs master ${master.price}`);
  }
}
check(Object.keys(CONDITIONS_DATA).length > 0, "condition prices compared against master catalogue");

const lipid = findMasterBySlug("/lipid-profile-test");
check(lipid?.id === "lipid-profile", "lipid profile resolves to master entry", lipid?.id);

const bengaluru = homeCollectionAreas.find((a) => a.slug === "bengaluru");
check(!!bengaluru && bengaluru.pincodes.length === getServiceablePincodes().length, "Bengaluru page lists every serviceable PIN", String(bengaluru?.pincodes.length));

const certs = Object.fromEntries(allAccreditations.map((a) => [a.facilityId, a.certificateNumber]));
check(certs["kengeri-main-lab"] === "NABLM1126KA10694", "Kengeri certificate", certs["kengeri-main-lab"]);
check(certs["yelahanka-north-hub"] === "MC-10025", "North Hub certificate", certs["yelahanka-north-hub"]);

const sti = JSON.stringify(SEXUAL_HEALTH_LANDING_PAGES);
check(!/definitive exclusion across all global guidelines|Privacy Guarantee|100% Confidential/i.test(sti), "no absolute STI conclusiveness/privacy claims");

// ── Thyroid: ₹350 = Total profile, ₹750 = Free profile (owner decision, 26 Nov 2026) ──
const thyroidTotal = MASTER_CATALOGUE.find((m) => m.id === "thyroid-profile");
const thyroidFree = MASTER_CATALOGUE.find((m) => m.id === "thyroid-profile-free");
check(thyroidTotal?.price === 350 && /Total/.test(thyroidTotal.name) && !/Free/.test(thyroidTotal.name), "₹350 thyroid panel is the Total profile", thyroidTotal?.name);
check(thyroidFree?.price === 750 && thyroidFree.mrp === 1200, "Free thyroid profile ₹750 (MRP ₹1,200)", String(thyroidFree?.price));
const tmTotal = CANONICAL_TEST_MASTER.find((t) => t.test_id === "THYROID001");
const tmFree = CANONICAL_TEST_MASTER.find((t) => t.test_id === "THYROID002");
check(tmTotal?.price === thyroidTotal?.price && tmFree?.price === thyroidFree?.price, "testMaster and booking catalogue agree on thyroid prices");
const llmsFull = readFileSync("public/llms-full.txt", "utf8");
const llms = readFileSync("public/llms.txt", "utf8");
check(!/Total Thyroid Profile[^\n]*₹400|Free Thyroid Profile[^\n]*₹650|Thyroid Profile \(TSH, FT3, FT4\): ₹350/.test(llmsFull + llms), "AI files carry no stale thyroid prices");

// ── Lipid profile: 8 parameters including Non-HDL, same price everywhere ──
const tmLipid = CANONICAL_TEST_MASTER.find((t) => t.test_id === "LIPID001");
check(tmLipid?.parameter_count === 8 && tmLipid.parameters.length === 8 && tmLipid.parameters.some((p) => /Non-HDL/.test(p)), "lipid profile defines 8 unique parameters incl. Non-HDL");
check(lipid?.parametersCount === tmLipid?.parameter_count && lipid?.price === tmLipid?.price, "booking catalogue matches testMaster for lipid profile");
check(/Lipid Profile \(8 parameters:[^\n]*Non-HDL[^\n]*₹336/.test(llmsFull), "llms-full lists all 8 lipid parameters at ₹336");

// ── Packages in llms-full.txt match the booking catalogue ──
for (const pkg of MASTER_CATALOGUE.filter((m) => m.kind === "package")) {
  const line = llmsFull.split("\n").find((l) => l.includes(`package=${pkg.id}`));
  check(!!line && line.includes(formatINR(pkg.price)) && line.includes(`(${pkg.parametersCount} Parameters)`), `llms-full package ${pkg.id}`, line?.slice(0, 80));
}

// ── Medical review dates: registry only, no bulk/hard-coded dates ──
const reviewProblems = validateMedicalReviews();
check(reviewProblems.length === 0, "medical review registry is valid", reviewProblems.join("; "));
const hardCoded = execSync(
  `grep -rlE '(lastReviewed|reviewedDate|lastReviewedDate)"?: *"(20[0-9]{2}|[A-Z][a-z]+ [0-9]{1,2}, 20)' src || true`,
  { encoding: "utf8" }
).trim();
check(hardCoded === "" || hardCoded.split("\n").every((f) => /blogsData|qxlSeriesBlogsData/.test(f)), "no hard-coded review dates in page code", hardCoded.replace(/\n/g, ", "));

// ── Yelahanka / North Hub pages never show the Kengeri certificate ──
for (const file of ["src/app/qxl/yelahanka/page.tsx", "src/app/qxl/northhub/page.tsx"]) {
  const src = readFileSync(file, "utf8");
  // The Kengeri number may appear only in a sentence that explicitly names Kengeri.
  const misattributed = src.split(/(?<=[.!?])\s+/).filter((sentence) => sentence.includes("NABLM1126KA10694") && !/Kengeri/.test(sentence));
  check(!src.includes("NABL_CERTIFICATE") && misattributed.length === 0 && src.includes("MC-10025"), `${file} attributes certificates to the right lab`);
}

console.log(failures ? `\n${failures} check(s) failed` : "\nAll SEO metadata checks passed");
process.exit(failures ? 1 : 0);

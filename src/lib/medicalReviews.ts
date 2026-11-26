/**
 * QXL Diagnostics — Medical Review Registry (single source of truth for review dates).
 *
 * A page may show "Medically reviewed on <date>" and emit schema.org `lastReviewed` /
 * `reviewedBy` ONLY when it has a record here. A record means a named clinician actually
 * reviewed the rendered page content on that date and the sign-off is traceable through
 * `approvalRef` (e-mail, ticket or signed review form ID).
 *
 * Rules
 * - Never add a record on someone's behalf, never back-date, never bulk-fill dates.
 * - Record the genuine review date, not today's date or a build date.
 * - Re-review (and update the record) after substantive clinical edits to the page.
 * - Pages without a record show their assigned reviewer as "review pending" and emit no
 *   `lastReviewed`. Bulk dates previously written into page data (e.g. 20 Oct 2026) were
 *   not review records and are no longer displayed.
 *
 * Example (add only after the doctor's sign-off):
 *   { path: "/thyroid-test", reviewerSlug: "dr-shantakumar-muruda",
 *     reviewerName: "Dr. Shantakumar Muruda", reviewedOn: "2026-12-02",
 *     approvalRef: "QXL-MR-2026-0142" },
 */

export type MedicalReviewRecord = {
  /** Site path of the reviewed page, e.g. "/thyroid-test" or "/blog/some-slug". */
  path: string;
  /** Profile slug of the reviewing clinician (must have a public profile page). */
  reviewerSlug: string;
  reviewerName: string;
  /** Genuine review date, YYYY-MM-DD. */
  reviewedOn: string;
  /** Traceable sign-off reference held by QXL (not displayed publicly). */
  approvalRef: string;
};

export const MEDICAL_REVIEW_RECORDS: MedicalReviewRecord[] = [];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const normalisePath = (path: string) => {
  const clean = path.replace(/^https?:\/\/[^/]+/, "").split(/[?#]/)[0].replace(/\/+$/, "");
  return clean.startsWith("/") ? clean || "/" : `/${clean}`;
};

export function getMedicalReview(path?: string | null): MedicalReviewRecord | undefined {
  if (!path) return undefined;
  const target = normalisePath(path);
  return MEDICAL_REVIEW_RECORDS.find((r) => normalisePath(r.path) === target);
}

export function formatReviewDate(iso: string, format: "display" | "iso" = "display"): string {
  if (format === "iso") return iso;
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** Review date for a page from the registry, or null when no genuine review is recorded. */
export function getReviewDate(path: string | null | undefined, format: "display" | "iso" = "display"): string | null {
  const record = getMedicalReview(path);
  return record ? formatReviewDate(record.reviewedOn, format) : null;
}

/** Validates the registry (used by scripts/verifySeoMetadata.ts). Returns problems found. */
export function validateMedicalReviews(today = new Date().toISOString().slice(0, 10)): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();
  for (const r of MEDICAL_REVIEW_RECORDS) {
    const key = normalisePath(r.path);
    if (seen.has(key)) problems.push(`duplicate review record for ${key}`);
    seen.add(key);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(r.reviewedOn) || Number.isNaN(Date.parse(r.reviewedOn))) problems.push(`${key}: invalid reviewedOn`);
    if (r.reviewedOn > today) problems.push(`${key}: review date is in the future`);
    if (!r.reviewerName.trim() || !r.reviewerSlug.trim()) problems.push(`${key}: reviewer missing`);
    if (!r.approvalRef.trim()) problems.push(`${key}: approvalRef missing`);
  }
  return problems;
}

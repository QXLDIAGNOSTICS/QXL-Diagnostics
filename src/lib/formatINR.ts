/**
 * Indian-rupee formatting shared by page titles, meta descriptions, booking displays
 * and machine-readable files. Prices come from MASTER_CATALOGUE (whole rupees).
 *
 * formatINR(1249)      -> "₹1,249"
 * formatINRPaise(124900) -> "₹1,249"
 */
const inr = (fractionDigits: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: 2,
  });

export function formatINRPaise(paise: number): string {
  if (!Number.isSafeInteger(paise) || paise < 0) throw new Error(`Invalid price (paise): ${paise}`);
  return inr(paise % 100 ? 2 : 0).format(paise / 100);
}

export function formatINR(rupees: number | string): string {
  const value = typeof rupees === "string" ? Number(rupees.replace(/[₹,\s]/g, "")) : rupees;
  if (!Number.isFinite(value) || value < 0) throw new Error(`Invalid price: ${rupees}`);
  return formatINRPaise(Math.round(value * 100));
}

/**
 * Matches a rupee amount already written into copy, including Indian digit grouping
 * ("₹1,249", "₹ 1,24,900", "Rs. 336", "1249.50"). Used to swap stale prices for the
 * catalogue price without leaving fragments such as "₹1249,249".
 */
export const RUPEE_AMOUNT = String.raw`(?:₹|Rs\.?|INR)?\s*\d+(?:,\d{2,3})*(?:\.\d{1,2})?`;

/**
 * QXL Diagnostics - Privacy-Compliant GA4 & Telemetry Event Layer
 * 
 * Strict Healthcare Privacy Protection:
 * Under no circumstances may patient PII (name, phone, email, address) or
 * sensitive health data (HIV status, medical diagnosis, lab values, prescriptions)
 * be forwarded to analytics platforms or advertising pixels.
 */

export type QxlAnalyticsEvent =
  | "search_test"
  | "view_test"
  | "add_to_cart"
  | "remove_from_cart"
  | "begin_checkout"
  | "select_collection_mode"
  | "select_slot"
  | "upload_prescription"
  | "click_whatsapp"
  | "click_call"
  | "booking_complete"
  | "payment_complete"
  | "ai_assistant_open"
  | "ai_to_test"
  | "ai_to_booking"
  | "hospital_lead";

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

const FORBIDDEN_PII_KEYS = new Set([
  "name",
  "patientname",
  "phone",
  "phonenumber",
  "mobile",
  "email",
  "address",
  "pincode",
  "prescription",
  "prescriptionurl",
  "diagnosis",
  "hiv",
  "result",
  "testresult",
  "medicalhistory",
  "dob",
  "age",
  "gender"
]);

/**
 * Strips any sensitive health data or PII before sending to dataLayer
 */
function sanitizeEventData(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (FORBIDDEN_PII_KEYS.has(normalizedKey)) {
      continue; // Drop PII
    }
    sanitized[key] = value;
  }

  return sanitized;
}

export function trackEvent(
  event: QxlAnalyticsEvent,
  data: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  const sanitizedData = sanitizeEventData(data);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...sanitizedData,
    timestamp: Date.now()
  });

  if (process.env.NODE_ENV !== "production") {
    console.debug(`[Analytics Event: ${event}]`, sanitizedData);
  }
}

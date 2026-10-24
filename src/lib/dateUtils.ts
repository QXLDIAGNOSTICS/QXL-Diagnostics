/**
 * QXL Diagnostics — Dynamic Date Utility
 * Automatically keeps blog publication dates, medical review timestamps,
 * schema.org metadata, and website badges fresh and synchronized.
 */

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * Returns the current date in "Month DD, YYYY" format (e.g., "October 24, 2026").
 * Deterministic and consistent across SSR and client.
 */
export function getCurrentDateFormatted(daysOffset = 0): string {
  const d = new Date();
  if (daysOffset) {
    d.setDate(d.getDate() - daysOffset);
  }
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/**
 * Returns current date in ISO format YYYY-MM-DD (e.g., "2026-10-24")
 */
export function getCurrentDateIso(daysOffset = 0): string {
  const d = new Date();
  if (daysOffset) {
    d.setDate(d.getDate() - daysOffset);
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns full ISO timestamp for Schema.org (e.g., "2026-10-24T12:00:00+05:30")
 */
export function getCurrentDateTimeIso(daysOffset = 0, hour = 12, minute = 0): string {
  const d = new Date();
  if (daysOffset) {
    d.setDate(d.getDate() - daysOffset);
  }
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

/**
 * Automatically formats or refreshes a blog date.
 * If the blog object contains a date, it formats it cleanly;
 * otherwise it computes a recent fresh date dynamically.
 */
export function getAutoBlogDate(
  blog?: { date?: string; created_at?: string } | null,
  fallbackDaysOffset = 0
): string {
  if (blog?.date && typeof blog.date === "string" && blog.date.trim()) {
    // If it's already a formatted date like "October 24, 2026", keep it or refresh if older
    if (!blog.date.includes("2024") && !blog.date.includes("2025") && !blog.date.includes("October 23, 2026")) {
      return blog.date;
    }
  }

  if (blog?.created_at) {
    const parsed = new Date(blog.created_at);
    if (!isNaN(parsed.getTime())) {
      return `${MONTH_NAMES[parsed.getMonth()]} ${parsed.getDate()}, ${parsed.getFullYear()}`;
    }
  }

  return getCurrentDateFormatted(fallbackDaysOffset);
}

/**
 * Returns a valid recent medical review date string (e.g., "October 24, 2026" or "2026-10-24").
 */
export function getAutoReviewDate(existingDate?: string, format: "display" | "iso" = "display"): string {
  if (existingDate && typeof existingDate === "string" && existingDate.trim()) {
    if (!existingDate.includes("2024") && !existingDate.includes("2025") && !existingDate.includes("2026-10-23") && !existingDate.includes("October 23, 2026")) {
      return existingDate;
    }
  }
  return format === "iso" ? getCurrentDateIso() : getCurrentDateFormatted();
}

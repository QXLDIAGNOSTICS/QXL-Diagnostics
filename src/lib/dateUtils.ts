/**
 * QXL Diagnostics — Content Date Utility
 * Publication / last-updated dates for content, schema.org and feeds.
 * Medical REVIEW dates do not come from here: they come only from genuine sign-offs in
 * src/lib/medicalReviews.ts.
 */

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * Site-wide content publication / last-updated date used in visible labels, Schema.org,
 * Open Graph, sitemaps and feeds. It is NOT a medical review date.
 * Change this one value to re-date the whole site.
 */
export const SITE_CONTENT_DATE = "2026-10-20";
export const SITE_CONTENT_DATE_DISPLAY = "October 20, 2026";
export const SITE_CONTENT_DATETIME = "2026-10-20T09:00:00+05:30";

function anchorDate(daysOffset = 0): Date {
  const [y, m, d] = SITE_CONTENT_DATE.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  if (daysOffset) date.setUTCDate(date.getUTCDate() - daysOffset);
  return date;
}

/**
 * Returns the current date in "Month DD, YYYY" format (e.g., "October 24, 2026").
 * Deterministic and consistent across SSR and client.
 */
export function getCurrentDateFormatted(daysOffset = 0): string {
  const d = anchorDate(daysOffset);
  return `${MONTH_NAMES[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/**
 * Returns current date in ISO format YYYY-MM-DD (e.g., "2026-10-24")
 */
export function getCurrentDateIso(daysOffset = 0): string {
  return anchorDate(daysOffset).toISOString().slice(0, 10);
}

/**
 * Returns full ISO timestamp for Schema.org (e.g., "2026-10-24T12:00:00+05:30")
 */
export function getCurrentDateTimeIso(daysOffset = 0, hour = 12, minute = 0): string {
  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  return `${getCurrentDateIso(daysOffset)}T${hh}:${mm}:00+05:30`;
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
  // Content first published after the site anchor date keeps its real date (never backdated).
  if (blog?.date && blog.created_at && blog.created_at.slice(0, 10) > SITE_CONTENT_DATE) {
    return blog.date;
  }
  return getCurrentDateFormatted(fallbackDaysOffset);
}

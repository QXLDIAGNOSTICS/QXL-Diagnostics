// Maps packages from the CMS API (`/packages`) onto the shape the package
// grid renders.
import type { HealthPackage } from "./api";
import type { PackageItem } from "./packagesCatalogue";

function parseList(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    // Admin-entered text rather than JSON: treat each line / comma item as one.
    return raw.split(/\r?\n|,/).map((s) => s.trim()).filter(Boolean);
  }
}

/** Placeholder/test entries (e.g. a ₹1 promo) are never shown in the public grid. */
export function isPublicPackage(p: HealthPackage): boolean {
  if (!p.is_active) return false;
  if (/spidy/i.test(p.name)) return false;
  return p.contact_for_price || p.price > 1;
}

export function toPackageItem(p: HealthPackage): PackageItem {
  const d = p.details ?? {};
  const priced = !p.contact_for_price && p.price > 0;
  return {
    id: p.slug,
    slug: p.slug,
    name: p.name,
    price: priced ? p.price : undefined,
    mrp: priced && p.old_price ? p.old_price : undefined,
    parametersCount: d.parameters_count,
    parametersLabel: p.parameters || "",
    category: p.category || "General",
    tag: p.tag || undefined,
    includes: p.includes || "",
    highlights: parseList(p.benefits),
    fastingHours: d.fasting_hours,
    tat: d.tat,
    sampleType: d.sample_type,
    isPopular: p.most_booked,
    contactForPrice: p.contact_for_price,
    priceDisplay: d.price_display,
    guidanceLevel: d.guidance_level,
    mayHelpWhen: d.may_help_when,
    beforeBooking: d.before_booking,
    keyTests: d.key_tests,
    guideNumber: d.guide_number,
    detailedBreakdown: d.detailed_breakdown,
  };
}

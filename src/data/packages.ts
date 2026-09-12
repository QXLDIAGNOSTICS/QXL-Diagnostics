import { CANONICAL_PACKAGES } from '@/lib/packagesCatalogue';

export const packagesData = CANONICAL_PACKAGES.map((pkg) => ({
  id: pkg.id,
  name: pkg.name,
  price: pkg.price ? String(pkg.price) : "Contact Us",
  old_price: pkg.mrp ? String(pkg.mrp) : "",
  save: pkg.price && pkg.mrp ? String(pkg.mrp - pkg.price) : "",
  includes: pkg.includes,
  parameters: pkg.parametersLabel,
  tag: pkg.tag || "DIAGNOSTIC",
  highlights: pkg.highlights,
  most_booked: !!pkg.isPopular,
  contactForPrice: !!pkg.contactForPrice,
  guidanceLevel: pkg.guidanceLevel,
}));


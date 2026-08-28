/**
 * Automated Package Parameter & Pricing Validation Utility
 * Validates that package parameter claims match actual included parameter counts.
 */

export interface PackageValidationResult {
  packageId: string;
  packageName: string;
  claimedParameters: number;
  actualParametersCount: number;
  isValid: boolean;
  mrp: number;
  offerPrice: number;
  isPricingValid: boolean;
  discrepancyReason?: string;
}

export function validatePackageParameters(pkg: {
  id: string;
  name: string;
  price: number | string;
  old_price?: number | string;
  originalPrice?: number | string;
  parametersCount?: number;
  parameterCount?: number;
  includes?: string[] | string;
  packageInclusions?: { count: number; items: string[] }[];
}): PackageValidationResult {
  const offerPrice = Number(pkg.price);
  const mrp = Number(pkg.old_price || pkg.originalPrice || offerPrice);
  
  let actualCount = 0;
  if (Array.isArray(pkg.packageInclusions)) {
    actualCount = pkg.packageInclusions.reduce((sum, inc) => sum + (inc.count || inc.items.length), 0);
  } else if (Array.isArray(pkg.includes)) {
    actualCount = pkg.includes.length;
  } else if (typeof pkg.includes === 'string') {
    actualCount = pkg.includes.split(',').length;
  }

  const claimedCount = pkg.parameterCount || pkg.parametersCount || actualCount;
  const isPricingValid = mrp >= offerPrice && offerPrice > 0;
  const isValid = actualCount > 0 && isPricingValid;

  let discrepancyReason: string | undefined;
  if (!isPricingValid) {
    discrepancyReason = `MRP (₹${mrp}) must be greater than or equal to offer price (₹${offerPrice}).`;
  }

  return {
    packageId: pkg.id,
    packageName: pkg.name,
    claimedParameters: claimedCount,
    actualParametersCount: actualCount,
    isValid,
    mrp,
    offerPrice,
    isPricingValid,
    discrepancyReason
  };
}

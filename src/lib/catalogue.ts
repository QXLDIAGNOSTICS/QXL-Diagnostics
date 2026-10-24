/**
 * QXL Diagnostics — Central Catalogue Accessor
 * 
 * Fundamental Rule:
 * A medical or commercial fact must exist once.
 * All surfaces (homepage, /tests, booking, cart, AI Assistant, and JSON-LD)
 * consume from this single master layer.
 */

import { TESTS, testsById } from "@/data/tests";
import { PACKAGES, packagesById } from "@/data/packages";
import { LOCATIONS, locationsById, KENGERI_MAIN_LAB } from "@/data/locations";
import { DOCTORS, doctorsById } from "@/data/doctors";
import { calculatePackageParameterCount, validatePackages } from "@/lib/packageCount";
import type { DiagnosticTest, HealthPackage, QxlLocation, DoctorReviewer } from "@/types/catalogue";

export {
  TESTS,
  testsById,
  PACKAGES,
  packagesById,
  LOCATIONS,
  locationsById,
  DOCTORS,
  doctorsById,
  KENGERI_MAIN_LAB,
  calculatePackageParameterCount,
  validatePackages
};

export function getTest(id: string): DiagnosticTest {
  const test = testsById[id];

  if (!test || !test.active) {
    throw new Error(`Unknown test: ${id}`);
  }

  return test;
}

export function getPackage(id: string): HealthPackage {
  const pkg = packagesById[id];

  if (!pkg || !pkg.active) {
    throw new Error(`Unknown package: ${id}`);
  }

  return pkg;
}

export function getLocation(id: string): QxlLocation {
  const loc = locationsById[id];

  if (!loc) {
    throw new Error(`Unknown location: ${id}`);
  }

  return loc;
}

export function getDoctor(id: string): DoctorReviewer {
  const doc = doctorsById[id];

  if (!doc) {
    throw new Error(`Unknown doctor: ${id}`);
  }

  return doc;
}

export function getAllCanonicalTests(): DiagnosticTest[] {
  return TESTS.filter(t => t.active);
}

export function getAllCanonicalPackages(): HealthPackage[] {
  return PACKAGES.filter(p => p.active);
}

export function getAllIndexableLocations(): QxlLocation[] {
  return LOCATIONS.filter(l => l.type === "physical_lab" || l.type === "service_hub");
}

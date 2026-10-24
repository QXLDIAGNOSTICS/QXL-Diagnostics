/**
 * QXL Diagnostics — Master Catalogue Types
 * Single source of truth for tests, packages, collection modes, specimens, and doctor attributions.
 */

export type CollectionMode =
  | "home_blood"
  | "home_urine"
  | "home_swab"
  | "centre_collection"
  | "hospital_procedure"
  | "submitted_specimen"
  | "conditional";

export interface SpecimenOption {
  specimen: string;
  collectionMode: CollectionMode;
  note?: string;
}

export interface DiagnosticTest {
  id: string;
  slug: string;

  name: string;
  shortName?: string;
  aliases: string[];

  category: string;
  department: string;

  specimenOptions: SpecimenOption[];

  fasting:
    | "required"
    | "not_required"
    | "conditional";

  preparationText: string;

  tatMinutesMin?: number;
  tatMinutesMax?: number;
  tatDisplay: string;

  /**
   * Real analyte IDs from LIS/catalogue.
   * Enables package parameter counts to be dynamically calculated
   * rather than manually typed.
   */
  parameterIds: string[];

  sellingPrice: number;
  mrp: number;

  methodology?: string;

  reviewerId?: string;
  reviewedDate?: string;

  active: boolean;
}

export interface HealthPackage {
  id: string;
  slug: string;

  name: string;
  aliases: string[];

  includedTestIds: string[];

  /**
   * Calculated clinical measurements such as eAG or HOMA-IR,
   * legitimately reported as separate laboratory parameters.
   */
  derivedParameterIds?: string[];

  mrp: number;
  sellingPrice: number;

  fasting:
    | "required"
    | "not_required"
    | "conditional";

  tatDisplay: string;

  guidance:
    | "self_request"
    | "consultation_recommended"
    | "doctor_directed";

  active: boolean;
  tag?: string;
  highlights?: string[];
  idealFor?: string;
}

export interface DoctorReviewer {
  id: string;
  name: string;
  qualification: string;
  department: string;
  registrationNumber?: string;
  profileUrl: string;
  avatarUrl?: string;
}

export interface QxlLocation {
  id: string;
  slug: string;

  type:
    | "physical_lab"
    | "service_hub"
    | "service_area";

  publicName: string;

  address?: {
    street: string;
    locality: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  phone?: string;

  walkInHours?: string;
  processingHours?: string;
  homeCollectionHours?: string;

  lat?: number;
  lng?: number;
}

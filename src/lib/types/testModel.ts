/**
 * Structured Test Model for QXL Diagnostics Test Database
 * Ensures standardized SEO, pricing, TAT, clinical interpretation, and doctor attribution.
 */

export interface DoctorReviewer {
  id: string;
  name: string;
  qualifications: string;
  speciality: string;
  profileSlug: string;
}

export interface TestParameter {
  name: string;
  unit?: string;
  description?: string;
}

export interface TestModel {
  test_name: string;
  short_name: string;
  slug: string;
  synonyms: string[];
  seo_title: string;
  meta_description: string;
  h1: string;
  test_code?: string;
  department: string;
  speciality: string;
  sample_type: string;
  tube_type?: string;
  sample_volume?: string;
  fasting_required: boolean;
  fasting_duration?: string;
  preparation: string;
  report_tat: string;
  price: number;
  discount_price?: number;
  home_collection_available: boolean;
  parameters_count: number;
  parameters: (string | TestParameter)[];
  method?: string;
  clinical_indications: string[];
  what_is_test: string;
  why_ordered: string;
  interpretation: string;
  limitations?: string;
  interferences?: string;
  related_tests?: string[];
  related_packages?: string[];
  reviewer: DoctorReviewer;
  review_date: string;
  references: string[];
  locations_available: string[];
}

// QXL Collect operations API (dispatch, collectors, lab, reports, metrics).
// Mirrors qxl-backend/app/api/v1/endpoints/collect_ops.py — see
// qxl-backend/docs/COLLECT.md for the status machines.

import { request } from "@/lib/api";

const get = <T>(path: string) => request<T>(path);
const post = <T>(path: string, body?: unknown) =>
  request<T>(path, {
    method: "POST",
    body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
  });
const put = <T>(path: string, body: unknown) => request<T>(path, { method: "PUT", body: JSON.stringify(body) });
const del = <T>(path: string) => request<T>(path, { method: "DELETE" });

const qs = (params: Record<string, string | number | boolean | undefined | null>) => {
  const s = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") s.set(k, String(v));
  });
  const out = s.toString();
  return out ? `?${out}` : "";
};

export interface QueueJob {
  id: string;
  reference: string;
  kind: "initial" | "recollection";
  status: string;
  is_delayed: boolean;
  collector_id: string | null;
  collector_name: string | null;
  assigned_at: string | null;
  acknowledged_at: string | null;
  last_location_at: string | null;
}

export interface QueueVisit {
  id: string;
  reference: string;
  status: string;
  payment_mode: "online" | "pay_on_visit";
  patient_name: string;
  patient_phone: string;
  pincode: string;
  locality: string;
  zone: string;
  address: string;
  lat: number | null;
  lng: number | null;
  slot_date: string;
  slot_label: string;
  tests: string[];
  total_paise: number;
  job: QueueJob | null;
}

export interface VisitDetail {
  id: string;
  reference: string;
  status: string;
  stage: string;
  payment_mode: string;
  payment_status: string;
  total_paise: number;
  collection_fee_paise: number;
  patient: { name: string; date_of_birth: string | null; gender: string | null; phone: string };
  address: { line: string; lat: number | null; lng: number | null; instructions: string | null; pincode: string };
  slot_date: string;
  slot_label: string;
  job: { id: string; reference: string; kind: string; status: string; outcome_reason: string | null } | null;
  collector: { name: string; employee_code: string; phone: string | null } | null;
  tests: { booking_id: string; name: string; lab_status: string; payment_status: string }[];
  specimens: { barcode: string | null; container_type: string; status: string; collected_at: string; decision_reason: string | null }[];
  reports: { id: string; title: string; version: number; status: string; released_at: string | null }[];
  timeline: { event: string; status: string | null; at: string; details: Record<string, unknown> | null }[];
  suggestions: { user_id: string; display_name: string; employee_code: string; jobs_that_day: number; jobs_in_slot: number; distance_m: number | null; on_duty: boolean }[];
  visit_payments: { id: string; amount_paise: number; mode: string; reference: string | null; at: string; reconciled_at: string | null }[];
}

export interface Collector {
  user_id: string;
  role: string | null;
  employee_code: string;
  display_name: string;
  phone: string | null;
  zone: string;
  shift_start: string;
  shift_end: string;
  working_days: number[];
  competencies: string[];
  qualification: string | null;
  max_daily_jobs: number;
  is_active: boolean;
  on_duty: boolean;
  jobs_today: number;
  last_location: { lat: number; lng: number; at: string } | null;
  photo_url: string | null;
  // Login account (from the user record).
  email?: string | null;
  login_phone?: string;
  date_of_birth?: string | null;
  account_active?: boolean;
  must_change_password?: boolean;
  password_changed_at?: string | null;
  locked?: boolean;
}

export interface FieldStaffCreate {
  role: "collector" | "courier";
  name: string;
  phone: string;
  email: string;
  date_of_birth?: string | null;
  employee_code: string;
  zone?: string;
  shift_start?: string;
  shift_end?: string;
  working_days?: number[];
  competencies?: string[];
  qualification?: string | null;
  max_daily_jobs?: number;
}

export interface FieldUser {
  id: string;
  name: string | null;
  phone: string;
  role: string;
  has_profile: boolean;
}

export interface ServiceArea {
  id: string;
  pincode: string;
  locality: string | null;
  zone: string;
  is_active: boolean;
  collection_fee_paise: number | null;
  lab_center_id: string | null;
}

export interface Alert {
  type: string;
  severity: "high" | "medium" | "low";
  visit_id?: string;
  reference?: string;
  job_id?: string;
  slot_date?: string;
  slot_label?: string;
  patient_name?: string;
  barcode?: string;
  note?: string | null;
  minutes?: number;
}

export interface LiveJob {
  job_id: string;
  reference: string;
  visit_id: string;
  visit_reference: string;
  status: string;
  collector_name: string | null;
  destination: { lat: number | null; lng: number | null; address: string };
  slot_label: string;
  slot_date: string;
  location: { lat: number; lng: number; at: string } | null;
  is_delayed: boolean;
}

export interface ManifestView {
  id: string;
  reference: string;
  status: string;
  custodian: { name: string; employee_code: string } | null;
  destination: { id: string; name: string } | null;
  container_ref: string | null;
  seal_intact: boolean | null;
  temperature_note: string | null;
  dispatched_at: string | null;
  received_at: string | null;
  created_at: string;
  specimens: { barcode: string; status: string; container_type: string; visit_id: string; collected_at: string }[];
}

export interface SpecimenView {
  barcode: string;
  status: string;
  container_type: string;
  sample_type: string | null;
  volume_ml: number | null;
  observations: string | null;
  collected_at: string;
  received_at: string | null;
  decision_reason: string | null;
  decision_notes: string | null;
  visit: { id: string; reference: string; patient_name: string; patient_dob: string | null; patient_gender: string | null };
  tests: { booking_id: string; name: string; lab_status: string; lis_accession: string | null }[];
  manifest: { id: string; reference: string; status: string; seal_intact: boolean | null; temperature_note: string | null } | null;
  history: { event: string; from: string | null; to: string | null; at: string; actor_role: string | null; details: Record<string, unknown> | null }[];
}

export interface WorklistItem {
  booking_id: string;
  visit_id: string;
  visit_reference: string | null;
  test: string;
  patient_name: string;
  lab_status: string;
  lis_accession: string | null;
  updated_at: string;
}

export interface LabReport {
  id: string;
  reference: string;
  visit_id: string;
  title: string;
  version: number;
  status: string;
  is_partial: boolean;
  booking_ids: string[];
  lis_accession: string | null;
  authorized_by_name: string | null;
  authorized_at: string | null;
  released_at: string | null;
  supersedes_id: string | null;
  amendment_note: string | null;
  created_at: string;
}

export interface LisTask {
  id: string;
  kind: string;
  entity_id: string;
  status: string;
  attempts: number;
  last_error: string | null;
  next_attempt_at: string | null;
  created_at: string;
}

export interface MetricsSummary {
  count: number;
  median_minutes: number | null;
  max_minutes: number | null;
}

export interface Metrics {
  range: { from: string; to: string };
  bookings: { visits: number; by_status: Record<string, number>; by_source: Record<string, number>; by_zone: Record<string, number>; tests: number; conversion_paid_or_confirmed_pct: number | null };
  revenue: { online_verified_paise: number; collected_at_visit_paise: number; unreconciled_at_visit_paise: number; pay_on_visit_outstanding_paise: number; refunded_paise: number };
  field: {
    job_outcomes: Record<string, number>;
    assign_to_acknowledge: MetricsSummary;
    travel_time: MetricsSummary;
    time_at_patient: MetricsSummary;
    recollections: number;
    collectors: { collector_id: string; name: string; assigned: number; collected: number; partial: number; unsuccessful: number }[];
  };
  transport: { collection_to_lab_receipt: MetricsSummary; missing: number; damaged: number };
  lab: {
    specimens_by_status: Record<string, number>;
    rejection_rate_pct: number | null;
    rejection_reasons: Record<string, number>;
    receipt_to_report_release: MetricsSummary;
    reports_released: number;
    amended_reports: number;
  };
}

export const collectApi = {
  visits: (params: { date?: string; status?: string; zone?: string; job_status?: string; q?: string; limit?: number; offset?: number }) =>
    get<{ items: QueueVisit[]; count: number }>(`/ops/visits${qs(params)}`),
  visit: (id: string) => get<VisitDetail>(`/ops/visits/${id}`),
  assign: (id: string, collectorId: string, reason?: string) =>
    post<VisitDetail>(`/ops/visits/${id}/assign`, { collector_id: collectorId, reason }),
  autoAssign: (id: string) => post<VisitDetail>(`/ops/visits/${id}/auto-assign`),
  autoAssignDay: (date: string) =>
    post<{ assigned: string[]; failed: { reference: string; reason: string }[] }>(`/ops/visits/auto-assign-day${qs({ date })}`),
  unassign: (id: string, reason?: string) => post<VisitDetail>(`/ops/visits/${id}/unassign`, { reason }),
  reschedule: (id: string, slotDate: string, slotLabel: string) =>
    post<VisitDetail>(`/ops/visits/${id}/reschedule`, { slot_date: slotDate, slot_label: slotLabel }),
  cancel: (id: string, reason?: string) => post<VisitDetail>(`/ops/visits/${id}/cancel`, { reason }),
  recollect: (id: string, reason?: string) => post<VisitDetail>(`/ops/visits/${id}/recollect`, { reason }),
  reconcile: (paymentIds: string[]) => post<{ reconciled: number }>(`/ops/visit-payments/reconcile`, { payment_ids: paymentIds }),
  slots: (date: string, pincode: string) =>
    get<{ slots: { label: string; available: boolean; unavailable_reason: string | null }[] }>(
      `/home-collection/slots${qs({ date, pincode })}`,
    ),

  collectors: (includeInactive = false) => get<Collector[]>(`/ops/collectors${qs({ include_inactive: includeInactive })}`),
  fieldUsers: () => get<FieldUser[]>(`/ops/field-users`),
  saveCollector: (userId: string, body: Partial<Collector> & { employee_code?: string; contact_phone?: string | null }) =>
    put<Collector>(`/ops/collectors/${userId}`, body),
  createFieldStaff: (body: FieldStaffCreate) =>
    post<{ member: Collector; temporary_password: string }>(`/ops/field-staff`, body),
  resetFieldPassword: (userId: string) =>
    post<{ temporary_password: string }>(`/ops/field-staff/${userId}/reset-password`),
  setFieldStatus: (userId: string, active: boolean, reason?: string) =>
    post<Collector>(`/ops/field-staff/${userId}/status`, { active, reason }),
  live: () => get<{ jobs: LiveJob[]; collectors: Collector[] }>(`/ops/live`),
  alerts: () => get<Alert[]>(`/ops/alerts`),
  serviceAreas: () => get<ServiceArea[]>(`/ops/service-areas`),
  saveServiceArea: (body: Omit<ServiceArea, "id">) => put<ServiceArea>(`/ops/service-areas`, body),
  disableServiceArea: (pincode: string) => del<void>(`/ops/service-areas/${pincode}`),
  metrics: (from: string, to: string) => get<Metrics>(`/ops/metrics${qs({ from, to })}`),

  labManifests: (status = "in_transit") => get<ManifestView[]>(`/lab/manifests${qs({ status })}`),
  receiveManifest: (id: string, barcodes: string[], sealIntact: boolean | null, temperatureNote: string | null) =>
    post<{ received: number; missing: string[]; unexpected: string[] }>(`/lab/manifests/${id}/receive`, {
      barcodes,
      seal_intact: sealIntact,
      temperature_note: temperatureNote,
    }),
  specimen: (barcode: string) => get<SpecimenView>(`/lab/specimens/${encodeURIComponent(barcode)}`),
  receiveSpecimen: (barcode: string) => post<SpecimenView>(`/lab/specimens/${encodeURIComponent(barcode)}/receive`),
  decide: (barcode: string, decision: "accept" | "reject" | "hold", reason?: string, notes?: string) =>
    post<{ barcode: string; status: string; recollection_opened: boolean }>(
      `/lab/specimens/${encodeURIComponent(barcode)}/decision`,
      { decision, reason, notes },
    ),
  rejectionReasons: () => get<string[]>(`/lab/rejection-reasons`),
  worklist: () => get<WorklistItem[]>(`/lab/worklist`),
  setLabStatus: (bookingId: string, labStatus: string, accession?: string, note?: string) =>
    post<{ booking_id: string; lab_status: string; lis_accession: string | null }>(`/lab/bookings/${bookingId}/status`, {
      lab_status: labStatus,
      lis_accession: accession || undefined,
      note: note || undefined,
    }),

  reports: (params: { visit_id?: string; status?: string }) => get<LabReport[]>(`/lab/reports${qs(params)}`),
  uploadReport: (form: FormData) => post<LabReport>(`/lab/reports`, form),
  releaseReport: (id: string) => post<LabReport>(`/lab/reports/${id}/release`),
  revokeReport: (id: string, reason: string) => post<LabReport>(`/lab/reports/${id}/revoke`, { reason }),
  previewReport: (id: string) => get<{ url: string }>(`/lab/reports/${id}/preview`),
  lisTasks: (status?: string) => get<{ adapter: string; items: LisTask[] }>(`/lab/lis/tasks${qs({ status })}`),
  retryLisTask: (id: string) => post<{ id: string; status: string }>(`/lab/lis/tasks/${id}/retry`),
};

export const rupees = (paise: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: paise % 100 ? 2 : 0 }).format(
    paise / 100,
  );

export const when = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—";

export const human = (value: string | null | undefined) =>
  (value || "").replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

export const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

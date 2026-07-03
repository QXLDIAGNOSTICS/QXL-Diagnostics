// Central API client for the QXL backend.
//
// All calls are relative (`/api/v1/...`) so Next.js's rewrite in
// next.config.ts proxies them to the FastAPI backend same-origin — the
// httpOnly session cookie set by the Auth0 callback is sent automatically,
// no token plumbing required.

export class ApiError extends Error {
  status: number;
  detail: unknown;
  constructor(status: number, message: string, detail?: unknown) {
    super(message);
    this.status = status;
    this.detail = detail;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api/v1${path}`, {
    credentials: 'include',
    headers: init?.body instanceof FormData ? undefined : { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    let detail: unknown = null;
    try {
      detail = await res.json();
    } catch {
      /* no JSON body */
    }
    let message = res.statusText || 'Request failed';
    if (detail && typeof detail === 'object' && 'message' in detail) {
      message = String((detail as { message: unknown }).message);
    }
    throw new ApiError(res.status, message, detail);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

const get = <T>(path: string) => request<T>(path);
const post = <T>(path: string, body?: unknown) =>
  request<T>(path, {
    method: 'POST',
    body: body instanceof FormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
  });
const patch = <T>(path: string, body?: unknown) =>
  request<T>(path, { method: 'PATCH', body: body !== undefined ? JSON.stringify(body) : undefined });
const del = <T>(path: string) => request<T>(path, { method: 'DELETE' });

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Center {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string | null;
  hours: string | null;
  lat: number | null;
  lng: number | null;
  is_nabl: boolean;
  is_active: boolean;
  sort_order: number;
}

export interface HealthPackage {
  id: string;
  name: string;
  slug: string;
  tag: string | null;
  price: number;
  old_price: number | null;
  save_amount: number | null;
  parameters: string | null;
  includes: string | null;
  benefits: string | null; // JSON-encoded string[]
  who_should_take: string | null;
  age_group: string | null;
  gender: string | null;
  doctor_recommended: boolean;
  is_active: boolean;
  sort_order: number;
}

export interface TestCatalogItem {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  description: string | null;
  price: number | null;
  preparation: string | null;
  turnaround_hours: number | null;
  is_active: boolean;
}

export interface Booking {
  id: string;
  user_id: string | null;
  patient_name: string;
  patient_phone: string;
  patient_email: string | null;
  patient_age: number | null;
  patient_gender: string | null;
  test_name: string | null;
  package_id: string | null;
  center_id: string | null;
  collection_type: string;
  collection_address: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  status: string;
  notes: string | null;
  is_urgent: boolean;
}

export interface BookingCreate {
  patient_name: string;
  patient_phone: string;
  patient_email?: string | null;
  patient_age?: number | null;
  patient_gender?: string | null;
  test_name?: string | null;
  package_id?: string | null;
  center_id?: string | null;
  collection_type: 'home' | 'center';
  collection_address?: string | null;
  preferred_date?: string | null;
  preferred_time?: string | null;
  notes?: string | null;
  is_urgent?: boolean;
}

export interface PrescriptionAnalysis {
  tests: string[];
  medications: string[];
  diagnosis_hints: string[];
  summary: string;
  raw_text: string;
  disclaimer: string;
}

export interface Prescription {
  id: string;
  user_id: string;
  file_id: string | null;
  filename: string;
  content_type: string;
  analysis_status: 'pending' | 'processing' | 'completed' | 'failed';
  analysis: PrescriptionAnalysis | null;
  error_message: string | null;
}

export interface Doctor {
  id: string;
  name: string;
  qualification: string | null;
  specialization: string | null;
  bio: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface Banner {
  id: string;
  title: string | null;
  title_accent: string | null;
  subtitle: string | null;
  subtitle_accent: string | null;
  description: string | null;
  badge: string | null;
  cta_label: string | null;
  cta_link: string | null;
  cta_secondary_label: string | null;
  cta_secondary_link: string | null;
  image_url: string | null;
  image_fit: string | null;
  image_only: boolean;
  bg_from: string | null;
  bg_to: string | null;
  features: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface CollaborationLeadCreate {
  name: string;
  phone: string;
  email?: string | null;
  city?: string | null;
  interest?: string | null;
  message?: string | null;
}

export interface ContactInquiryCreate {
  name: string;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  message: string;
}

// ── API surface ───────────────────────────────────────────────────────────────

export const api = {
  centers: {
    list: (city?: string) => get<Center[]>(`/centers${city ? `?city=${encodeURIComponent(city)}` : ''}`),
  },
  packages: {
    list: () => get<HealthPackage[]>('/packages'),
    get: (id: string) => get<HealthPackage>(`/packages/${id}`),
  },
  tests: {
    list: (q?: string) => get<TestCatalogItem[]>(`/tests${q ? `?q=${encodeURIComponent(q)}` : ''}`),
  },
  bookings: {
    create: (data: BookingCreate) => post<Booking>('/bookings', data),
    mine: () => get<{ items: Booking[]; count: number }>('/bookings/me'),
  },
  prescriptions: {
    upload: (file: File) => {
      const form = new FormData();
      form.append('file', file);
      return post<Prescription>('/prescriptions', form);
    },
    mine: () => get<{ items: Prescription[]; count: number }>('/prescriptions'),
    get: (id: string) => get<Prescription>(`/prescriptions/${id}`),
  },
  doctors: {
    list: () => get<Doctor[]>('/doctors'),
  },
  banners: {
    list: () => get<Banner[]>('/banners'),
  },
  faqs: {
    list: (category?: string) => get<FAQItem[]>(`/faqs${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  },
  leads: {
    collaboration: (data: CollaborationLeadCreate) => post('/leads/collaboration', data),
    contact: (data: ContactInquiryCreate) => post('/leads/contact', data),
  },
};

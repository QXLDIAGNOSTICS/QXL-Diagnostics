// Central API client for the QXL backend.
//
// All calls are relative (`/api/v1/...`) so Next.js's rewrite in
// next.config.ts proxies them to the FastAPI backend same-origin — the
// httpOnly session cookie set by our first-party auth (see `auth` below) is
// sent automatically, no token plumbing required. There is no Auth0/JWT.

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
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      /* no JSON body */
    }
    // Backend error envelope is `{ error: { code, message, detail } }` — see
    // app.core.exceptions._envelope. Fall back to statusText only if the
    // body doesn't match that shape.
    let message = res.statusText || 'Request failed';
    let detail: unknown = body;
    if (body && typeof body === 'object' && 'error' in body) {
      const err = (body as { error: unknown }).error;
      if (err && typeof err === 'object' && 'message' in err) {
        message = String((err as { message: unknown }).message);
      }
      if (err && typeof err === 'object' && 'detail' in err) {
        detail = (err as { detail: unknown }).detail;
      }
    } else if (body && typeof body === 'object' && 'message' in body) {
      message = String((body as { message: unknown }).message);
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
  slug: string;
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
  home_collection_available: boolean;
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
  home_collection_available: boolean;
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
  test_id: string | null;
  package_id: string | null;
  center_id: string | null;
  collection_type: 'home' | 'center';
  collection_address: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  status: string;
  notes: string | null;
  is_urgent: boolean;
  report_url: string | null;
  amount_paise: number | null;
  payment_status: string;
}

export interface BookingCreate {
  patient_name: string;
  patient_phone: string;
  patient_email?: string | null;
  patient_age?: number | null;
  patient_gender?: string | null;
  test_name?: string | null;
  test_id?: string | null;
  package_id?: string | null;
  center_id?: string | null;
  collection_type: 'home' | 'center';
  collection_address?: string | null;
  preferred_date?: string | null;
  preferred_time?: string | null;
  notes?: string | null;
  is_urgent?: boolean;
}

export interface BookingAdminUpdate {
  status?: string;
  report_url?: string | null;
  notes?: string | null;
  is_urgent?: boolean;
  center_id?: string | null;
  preferred_date?: string | null;
  preferred_time?: string | null;
}

export interface CenterCreate {
  name: string;
  slug?: string | null;
  address: string;
  city: string;
  phone?: string | null;
  hours?: string | null;
  lat?: number | null;
  lng?: number | null;
  is_nabl?: boolean;
  is_active?: boolean;
  sort_order?: number;
}
export type CenterUpdate = Partial<CenterCreate>;

export interface HealthPackageCreate {
  name: string;
  slug?: string | null;
  tag?: string | null;
  price: number;
  old_price?: number | null;
  save_amount?: number | null;
  parameters?: string | null;
  includes?: string | null;
  benefits?: string | null;
  who_should_take?: string | null;
  age_group?: string | null;
  gender?: string | null;
  doctor_recommended?: boolean;
  is_active?: boolean;
  home_collection_available?: boolean;
  sort_order?: number;
}
export type HealthPackageUpdate = Partial<Omit<HealthPackageCreate, 'slug'>>;

export interface TestCatalogCreate {
  name: string;
  slug?: string | null;
  category?: string | null;
  description?: string | null;
  price?: number | null;
  preparation?: string | null;
  turnaround_hours?: number | null;
  is_active?: boolean;
  home_collection_available?: boolean;
}
export type TestCatalogUpdate = Partial<Omit<TestCatalogCreate, 'slug'>>;

export interface DoctorCreate {
  name: string;
  slug?: string | null;
  qualification?: string | null;
  specialization?: string | null;
  bio?: string | null;
  image_url?: string | null;
  is_active?: boolean;
  sort_order?: number;
}
export type DoctorUpdate = Partial<DoctorCreate>;

export interface BannerCreate {
  title?: string | null;
  title_accent?: string | null;
  subtitle?: string | null;
  subtitle_accent?: string | null;
  description?: string | null;
  badge?: string | null;
  cta_label?: string | null;
  cta_link?: string | null;
  cta_secondary_label?: string | null;
  cta_secondary_link?: string | null;
  image_url?: string | null;
  image_fit?: string | null;
  image_only?: boolean;
  bg_from?: string | null;
  bg_to?: string | null;
  features?: string | null;
  is_active?: boolean;
  sort_order?: number;
}
export type BannerUpdate = Partial<BannerCreate>;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  author: string | null;
  category: string | null;
  image_url: string | null;
  tags: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}
export interface BlogPostCreate {
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  content?: string | null;
  author?: string | null;
  category?: string | null;
  image_url?: string | null;
  tags?: string | null;
  is_published?: boolean;
  sort_order?: number;
}
export type BlogPostUpdate = Partial<BlogPostCreate>;

export interface FAQCreate {
  question: string;
  answer: string;
  category?: string | null;
  is_active?: boolean;
  sort_order?: number;
}
export type FAQUpdate = Partial<FAQCreate>;

export interface CollaborationLeadRead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  interest: string | null;
  message: string | null;
  is_read: boolean;
}

export interface ContactInquiryRead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
}

export interface AdminUser {
  id: string;
  email: string | null;
  phone: string;
  name: string | null;
  date_of_birth?: string | null;
  role: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  created_at: string;
}

export interface AdminStats {
  total_users: number;
  total_bookings: number;
  pending_bookings: number;
  total_prescriptions: number;
  unread_collaboration_leads: number;
  unread_contact_inquiries: number;
}

export interface CreateOrderResponse {
  key_id: string;
  order_id: string;
  amount: number;
  currency: string;
  booking_ids: string[];
  name: string;
  description: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface PaymentRead {
  id: string;
  booking_id: string;
  extra_booking_ids: string[] | null;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  amount: number;
  currency: string;
  status: string;
}

export interface KnowledgeDocument {
  id: string;
  filename: string;
  content_type: string;
  size: number;
  created_at: string;
  chunk_count: number;
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
  slug: string;
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

export interface ReviewItem {
  id: string;
  author_name: string;
  rating: number;
  content: string;
  source: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface ReviewCreate {
  author_name: string;
  rating: number;
  content: string;
  source?: string | null;
  is_published?: boolean;
  sort_order?: number;
}
export type ReviewUpdate = Partial<ReviewCreate>;

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

// ── Auth types ───────────────────────────────────────────────────────────────

export interface AuthMeResponse {
  id: string;
  email: string | null;
  phone: string;
  name: string | null;
  date_of_birth: string | null;
  role: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
}

export interface UserProfileUpdate {
  email?: string | null;
  name?: string | null;
  date_of_birth?: string | null;
}

export interface RegisterRequest {
  email: string;
  phone: string;
  name?: string | null;
  password: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  phone: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface PhoneOtpLoginRequest {
  phone: string;
}

export interface LoginChallengeResponse {
  challenge_id: string;
  masked_email: string;
  masked_phone: string;
  otp_expires_in: number;
  otp_verified: boolean;
  requires_admin_secret: boolean;
}

export interface LoginStatusResponse {
  challenge_id: string;
  otp_verified: boolean;
  completed: boolean;
}

export interface AdminUserCreate {
  email: string;
  phone: string;
  name?: string | null;
  password: string;
  role?: 'patient' | 'admin';
}

// ── API surface ───────────────────────────────────────────────────────────────

export const api = {
  auth: {
    register: (data: RegisterRequest) => post<RegisterResponse>('/auth/register', data),
    login: (data: LoginRequest) => post<LoginChallengeResponse>('/auth/login', data),
    loginPhoneOtp: (data: PhoneOtpLoginRequest) => post<LoginChallengeResponse>('/auth/login/phone', data),
    verifyOtp: (challenge_id: string, otp: string, admin_secret_key?: string) =>
      post<LoginStatusResponse>('/auth/login/otp', { challenge_id, otp, admin_secret_key }),
    loginStatus: (challengeId: string) =>
      get<LoginStatusResponse>(`/auth/login/status?challenge_id=${encodeURIComponent(challengeId)}`),
    logout: () => post<void>('/auth/logout'),
    me: () => get<AuthMeResponse>('/auth/me'),
  },
  users: {
    me: () => get<AuthMeResponse>('/users/me'),
    updateMe: (data: UserProfileUpdate) => patch<AuthMeResponse>('/users/me', data),
  },
  centers: {
    list: (city?: string) => get<Center[]>(`/centers${city ? `?city=${encodeURIComponent(city)}` : ''}`),
    get: (slug: string) => get<Center>(`/centers/${encodeURIComponent(slug)}`),
    adminList: (limit = 100, offset = 0) =>
      get<{ items: Center[]; count: number }>(`/centers/admin?limit=${limit}&offset=${offset}`),
    create: (data: CenterCreate) => post<Center>('/centers', data),
    update: (id: string, data: CenterUpdate) => patch<Center>(`/centers/${id}`, data),
    remove: (id: string) => del<void>(`/centers/${id}`),
  },
  packages: {
    list: () => get<HealthPackage[]>('/packages'),
    get: (id: string) => get<HealthPackage>(`/packages/${id}`),
    adminList: (limit = 100, offset = 0) =>
      get<{ items: HealthPackage[]; count: number }>(`/packages/admin?limit=${limit}&offset=${offset}`),
    create: (data: HealthPackageCreate) => post<HealthPackage>('/packages', data),
    update: (id: string, data: HealthPackageUpdate) => patch<HealthPackage>(`/packages/${id}`, data),
    remove: (id: string) => del<void>(`/packages/${id}`),
  },
  tests: {
    list: (q?: string) => get<TestCatalogItem[]>(`/tests${q ? `?q=${encodeURIComponent(q)}` : ''}`),
    get: (id: string) => get<TestCatalogItem>(`/tests/${id}`),
    adminList: (limit = 200, offset = 0) =>
      get<{ items: TestCatalogItem[]; count: number }>(`/tests/admin?limit=${limit}&offset=${offset}`),
    create: (data: TestCatalogCreate) => post<TestCatalogItem>('/tests', data),
    update: (id: string, data: TestCatalogUpdate) => patch<TestCatalogItem>(`/tests/${id}`, data),
    remove: (id: string) => del<void>(`/tests/${id}`),
  },
  bookings: {
    create: (data: BookingCreate) => post<Booking>('/bookings', data),
    mine: () => get<{ items: Booking[]; count: number }>('/bookings/me'),
    adminList: (status?: string, limit = 100, offset = 0) =>
      get<{ items: Booking[]; count: number }>(
        `/bookings?limit=${limit}&offset=${offset}${status ? `&status=${encodeURIComponent(status)}` : ''}`
      ),
    updateStatus: (id: string, status: string) => patch<Booking>(`/bookings/${id}/status`, { status }),
    update: (id: string, data: BookingAdminUpdate) => patch<Booking>(`/bookings/${id}`, data),
  },
  payments: {
    createOrder: (bookingIds: string[]) =>
      post<CreateOrderResponse>('/payments/orders', { booking_ids: bookingIds }),
    verify: (data: VerifyPaymentRequest) => post<PaymentRead>('/payments/verify', data),
    reconcile: (paymentId: string) => post<PaymentRead>(`/payments/${paymentId}/reconcile`),
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
    get: (slug: string) => get<Doctor>(`/doctors/${encodeURIComponent(slug)}`),
    adminList: (limit = 100, offset = 0) => get<Doctor[]>(`/doctors/admin?limit=${limit}&offset=${offset}`),
    create: (data: DoctorCreate) => post<Doctor>('/doctors', data),
    update: (id: string, data: DoctorUpdate) => patch<Doctor>(`/doctors/${id}`, data),
    remove: (id: string) => del<void>(`/doctors/${id}`),
  },
  banners: {
    list: () => get<Banner[]>('/banners'),
    adminList: (limit = 100, offset = 0) => get<Banner[]>(`/banners/admin?limit=${limit}&offset=${offset}`),
    create: (data: BannerCreate) => post<Banner>('/banners', data),
    update: (id: string, data: BannerUpdate) => patch<Banner>(`/banners/${id}`, data),
    remove: (id: string) => del<void>(`/banners/${id}`),
  },
  blog: {
    list: (limit = 50, offset = 0) => get<{ items: BlogPost[]; count: number }>(`/blog?limit=${limit}&offset=${offset}`),
    adminList: (limit = 100, offset = 0) =>
      get<{ items: BlogPost[]; count: number }>(`/blog/admin?limit=${limit}&offset=${offset}`),
    get: (slug: string) => get<BlogPost>(`/blog/${encodeURIComponent(slug)}`),
    create: (data: BlogPostCreate) => post<BlogPost>('/blog', data),
    update: (id: string, data: BlogPostUpdate) => patch<BlogPost>(`/blog/${id}`, data),
    remove: (id: string) => del<void>(`/blog/${id}`),
  },
  faqs: {
    list: (category?: string) => get<FAQItem[]>(`/faqs${category ? `?category=${encodeURIComponent(category)}` : ''}`),
    adminList: (limit = 100, offset = 0) => get<FAQItem[]>(`/faqs/admin?limit=${limit}&offset=${offset}`),
    create: (data: FAQCreate) => post<FAQItem>('/faqs', data),
    update: (id: string, data: FAQUpdate) => patch<FAQItem>(`/faqs/${id}`, data),
    remove: (id: string) => del<void>(`/faqs/${id}`),
  },
  reviews: {
    list: (limit = 20, offset = 0) => get<{ items: ReviewItem[]; count: number }>(`/reviews?limit=${limit}&offset=${offset}`),
    adminList: (limit = 100, offset = 0) =>
      get<{ items: ReviewItem[]; count: number }>(`/reviews/admin?limit=${limit}&offset=${offset}`),
    create: (data: ReviewCreate) => post<ReviewItem>('/reviews', data),
    update: (id: string, data: ReviewUpdate) => patch<ReviewItem>(`/reviews/${id}`, data),
    remove: (id: string) => del<void>(`/reviews/${id}`),
  },
  leads: {
    collaboration: (data: CollaborationLeadCreate) => post('/leads/collaboration', data),
    contact: (data: ContactInquiryCreate) => post('/leads/contact', data),
    adminListCollaboration: (unreadOnly = false, limit = 100, offset = 0) =>
      get<{ items: CollaborationLeadRead[]; count: number }>(
        `/leads/collaboration?unread_only=${unreadOnly}&limit=${limit}&offset=${offset}`
      ),
    markCollaborationRead: (id: string) => patch<CollaborationLeadRead>(`/leads/collaboration/${id}/read`),
    adminListContact: (unreadOnly = false, limit = 100, offset = 0) =>
      get<{ items: ContactInquiryRead[]; count: number }>(
        `/leads/contact?unread_only=${unreadOnly}&limit=${limit}&offset=${offset}`
      ),
    markContactRead: (id: string) => patch<ContactInquiryRead>(`/leads/contact/${id}/read`),
  },
  admin: {
    users: (role?: string, limit = 100, offset = 0) =>
      get<{ items: AdminUser[]; count: number }>(
        `/admin/users?limit=${limit}&offset=${offset}${role ? `&role=${encodeURIComponent(role)}` : ''}`
      ),
    createUser: (data: AdminUserCreate) => post<AdminUser>('/admin/users', data),
    updateUserRole: (id: string, role: string) => patch<AdminUser>(`/admin/users/${id}/role`, { role }),
    stats: () => get<AdminStats>('/admin/stats'),
  },
  knowledgeBase: {
    list: (limit = 100, offset = 0) =>
      get<{ items: KnowledgeDocument[]; count: number }>(`/admin/knowledge-base?limit=${limit}&offset=${offset}`),
    upload: (file: File) => {
      const form = new FormData();
      form.append('file', file);
      return post<KnowledgeDocument>('/admin/knowledge-base', form);
    },
    remove: (id: string) => del<void>(`/admin/knowledge-base/${id}`),
  },
  uploads: {
    /** Uploads an image (doctor photo, banner art, blog cover, etc.) to
     * Cloudinary and returns its permanent public URL. Admin only. */
    image: (file: File) => {
      const form = new FormData();
      form.append('file', file);
      return post<{ url: string }>('/uploads/image', form);
    },
  },
};

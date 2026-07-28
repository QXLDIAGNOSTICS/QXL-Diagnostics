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
const put = <T>(path: string, body?: unknown) =>
  request<T>(path, { method: 'PUT', body: body !== undefined ? JSON.stringify(body) : undefined });
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
  image_url: string | null;
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
  image_url: string | null;
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
  image_url: string | null;
}

export type VisitType = 'scheduled' | 'walk_in' | 'emergency';

export interface Booking {
  id: string;
  user_id: string | null;
  assigned_to_id: string | null;
  assigned_to_name: string | null;
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
  visit_type: VisitType;
  status: string;
  notes: string | null;
  is_urgent: boolean;
  is_delayed: boolean;
  was_rescheduled: boolean;
  report_url: string | null;
  amount_paise: number | null;
  payment_status: string;
  checked_in_at?: string | null;
  in_progress_at?: string | null;
  completed_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
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
  preferred_date: string;
  preferred_time: string;
  notes?: string | null;
  is_urgent?: boolean;
  visit_type?: VisitType;
}

export interface BookingAdminUpdate {
  patient_name?: string;
  patient_phone?: string;
  patient_email?: string | null;
  patient_age?: number | null;
  patient_gender?: string | null;
  test_name?: string | null;
  collection_type?: 'home' | 'center';
  collection_address?: string | null;
  status?: string;
  report_url?: string | null;
  notes?: string | null;
  is_urgent?: boolean;
  is_delayed?: boolean;
  visit_type?: VisitType;
  center_id?: string | null;
  preferred_date?: string | null;
  preferred_time?: string | null;
}

export interface AppointmentDashboardStats {
  total_appointments: number;
  today_appointments: number;
  yesterday_appointments: number;
  tomorrow_appointments: number;
  this_week_appointments: number;
  this_month_appointments: number;
  total_patients: number;
  new_patients: number;
  returning_patients: number;
  pending_appointments: number;
  confirmed_appointments: number;
  checked_in_patients: number;
  completed_appointments: number;
  cancelled_appointments: number;
  no_show_appointments: number;
  rescheduled_appointments: number;
  walk_in_patients: number;
  emergency_patients: number;
}

export interface AppointmentLiveStats {
  currently_waiting: number;
  with_doctor: number;
  avg_waiting_minutes: number | null;
  avg_consultation_minutes: number | null;
  today_patient_count: number;
  yesterday_patient_count: number;
  change_percent: number | null;
  upcoming_today: number;
}

export interface AppointmentStatsResponse {
  dashboard: AppointmentDashboardStats;
  live: AppointmentLiveStats;
}

export interface BookingRescheduleRequest {
  preferred_date: string;
  preferred_time: string;
  notify?: boolean;
  channel?: 'sms' | 'email' | 'both';
}

export type NotificationChannel = 'sms' | 'email' | 'both';
export type NotificationType =
  | 'confirmation'
  | 'payment'
  | 'payment_reminder'
  | 'reminder'
  | 'reschedule'
  | 'cancellation'
  | 'offer'
  | 'marketing'
  | 'custom';

export type AutomationRuleType = 'payment_reminder' | 'booking_reminder' | 'marketing';

export interface NotificationRule {
  id: string;
  name: string;
  rule_type: AutomationRuleType;
  channel: NotificationChannel;
  interval_days: number;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  template: string | null;
  subject: string | null;
  message: string | null;
  last_run_at: string | null;
  created_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface NotificationRuleCreate {
  name: string;
  rule_type: AutomationRuleType;
  channel: NotificationChannel;
  interval_days: number;
  start_date?: string | null;
  end_date?: string | null;
  is_active?: boolean;
  template?: string | null;
  subject?: string | null;
  message?: string | null;
}

export type NotificationRuleUpdate = Partial<Omit<NotificationRuleCreate, 'rule_type'>>;

export interface MessageTemplateOption {
  key: string;
  label: string;
  subject_preview: string;
  message_preview: string;
}

export interface NotifyRequest {
  channel: NotificationChannel;
  type: NotificationType;
  subject?: string | null;
  message?: string | null;
  scheduled_at?: string | null;
}

export interface NotificationRecord {
  id: string;
  booking_id: string;
  channel: NotificationChannel;
  type: NotificationType;
  subject: string | null;
  message: string;
  scheduled_at: string | null;
  sent_at: string | null;
  status: 'pending' | 'scheduled' | 'sent' | 'failed' | 'partial';
  error: string | null;
  created_by: string | null;
  created_at: string | null;
}

export interface ReceiptPaymentEntry {
  id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  amount: number;
  currency: string;
  status: string;
  paid_at: string | null;
  created_at: string | null;
}

export interface BookingFeedItem {
  id: string;
  kind: 'new_booking' | 'payment';
  patient_name: string;
  test_name: string | null;
  status: string;
  visit_type: string | null;
  payment_status: string | null;
  amount_paise: number | null;
  assigned_to_id: string | null;
  assigned_to_name: string | null;
  created_at: string;
  event_at: string | null;
}

export interface BookingFeed {
  items: BookingFeedItem[];
  server_time: string;
}

export interface BookingReceipt {
  booking_id: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string | null;
  item_name: string | null;
  collection_type: string;
  preferred_date: string | null;
  preferred_time: string | null;
  payment_status: string;
  amount_paise: number | null;
  payments: ReceiptPaymentEntry[];
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
  image_url?: string | null;
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
  image_url?: string | null;
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
  image_url?: string | null;
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

export interface PermissionCatalogItem {
  key: string;
  label: string;
  group: string;
}

export interface RoleRecord {
  id: string;
  key: string;
  label: string;
  tier: "staff" | "admin";
  permissions: string[];
  is_system: boolean;
}

export interface RoleCreatePayload {
  key: string;
  label: string;
  tier: "staff" | "admin";
  permissions: string[];
}

export interface RoleUpdatePayload {
  label?: string;
  tier?: "staff" | "admin";
  permissions?: string[];
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

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface GalleryItemCreate {
  title: string;
  image_url: string;
  category?: string | null;
  is_active?: boolean;
  sort_order?: number;
}
export type GalleryItemUpdate = Partial<GalleryItemCreate>;

export interface SiteSettings {
  theme_primary: string;
  theme_secondary: string;
  maintenance_mode: boolean;
  cookie_banner: boolean;
  ai_chat_enabled: boolean;
  announcement: string | null;
  custom_scripts: string | null;
  live_chat_widget_id: string | null;
}
export type SiteSettingsUpdate = Partial<SiteSettings>;

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
  /** DB-aware role-tier flags — account for super-admin-created custom roles. */
  is_staff: boolean;
  is_admin: boolean;
  is_super_admin: boolean;
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

export type StaffRole = 'front_office' | 'staff' | 'reception' | 'marketing' | 'sales' | 'admin';

export interface AdminUserCreate {
  email: string;
  phone: string;
  name?: string | null;
  password: string;
  /** Built-in or super-admin-defined custom role key. */
  role?: string;
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
    me: () => get<AuthMeResponse | null>('/auth/me'),
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
    remove: (id: string) => del<void>(`/bookings/${id}`),
    exportUrl: (status?: string) =>
      `/api/v1/bookings/export${status ? `?status=${encodeURIComponent(status)}` : ''}`,
    stats: () => get<AppointmentStatsResponse>('/bookings/stats'),
    checkIn: (id: string) => post<Booking>(`/bookings/${id}/checkin`),
    start: (id: string) => post<Booking>(`/bookings/${id}/start`),
    complete: (id: string) => post<Booking>(`/bookings/${id}/complete`),
    noShow: (id: string) => post<Booking>(`/bookings/${id}/no-show`),
    toggleDelay: (id: string, isDelayed: boolean) =>
      patch<Booking>(`/bookings/${id}/delay?is_delayed=${isDelayed}`),
    reschedule: (id: string, data: BookingRescheduleRequest) =>
      post<Booking>(`/bookings/${id}/reschedule`, data),
    notify: (id: string, data: NotifyRequest) => post<NotificationRecord>(`/bookings/${id}/notify`, data),
    notifications: (id: string) =>
      get<{ items: NotificationRecord[]; count: number }>(`/bookings/${id}/notifications`),
    receipt: (id: string) => get<BookingReceipt>(`/bookings/${id}/receipt`),
    notificationsFeed: (since?: string, limit = 20) =>
      get<BookingFeed>(
        `/bookings/notifications-feed?limit=${limit}${since ? `&since=${encodeURIComponent(since)}` : ''}`
      ),
  },
  payments: {
    createOrder: (bookingIds: string[]) =>
      post<CreateOrderResponse>('/payments/orders', { booking_ids: bookingIds }),
    verify: (data: VerifyPaymentRequest) => post<PaymentRead>('/payments/verify', data),
    reconcile: (paymentId: string) => post<PaymentRead>(`/payments/${paymentId}/reconcile`),
  },
  notificationRules: {
    list: () => get<{ items: NotificationRule[]; count: number }>('/notification-rules'),
    create: (data: NotificationRuleCreate) => post<NotificationRule>('/notification-rules', data),
    update: (id: string, data: NotificationRuleUpdate) =>
      patch<NotificationRule>(`/notification-rules/${id}`, data),
    remove: (id: string) => del<void>(`/notification-rules/${id}`),
    messageTemplates: () =>
      get<Record<AutomationRuleType, MessageTemplateOption[]>>('/notification-rules/message-templates'),
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
  gallery: {
    list: () => get<{ items: GalleryItem[]; count: number }>('/gallery'),
    adminList: (limit = 100, offset = 0) =>
      get<{ items: GalleryItem[]; count: number }>(`/gallery/admin?limit=${limit}&offset=${offset}`),
    create: (data: GalleryItemCreate) => post<GalleryItem>('/gallery', data),
    update: (id: string, data: GalleryItemUpdate) => patch<GalleryItem>(`/gallery/${id}`, data),
    remove: (id: string) => del<void>(`/gallery/${id}`),
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
    stats: () => get<AdminStats>('/stats'),
  },
  roles: {
    list: () => get<RoleRecord[]>('/admin/roles'),
    permissionsCatalog: () => get<PermissionCatalogItem[]>('/admin/roles/permissions-catalog'),
    create: (data: RoleCreatePayload) => post<RoleRecord>('/admin/roles', data),
    update: (id: string, data: RoleUpdatePayload) => patch<RoleRecord>(`/admin/roles/${id}`, data),
    remove: (id: string) => del<void>(`/admin/roles/${id}`),
  },
  knowledgeBase: {
    list: (limit = 100, offset = 0) =>
      get<{ items: KnowledgeDocument[]; count: number }>(`/admin/knowledge-base?limit=${limit}&offset=${offset}`),
    upload: (file: File) => {
      const form = new FormData();
      form.append('file', file);
      return post<KnowledgeDocument>('/knowledge-base', form);
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
  settings: {
    get: () => get<SiteSettings>('/settings'),
    update: (data: SiteSettingsUpdate) => put<SiteSettings>('/settings', data),
  },
};

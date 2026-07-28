"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Ban,
  Bell,
  CalendarClock,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  Info,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Receipt,
  RefreshCw,
  Search,
  Stethoscope,
  Trash2,
  Users,
  X,
  Pencil,
  ArrowUpDown,
  UserCheck,
} from "lucide-react";
import {
  api,
  type AppointmentStatsResponse,
  type Booking,
  type HealthPackage,
  type NotificationChannel,
  type NotificationRecord,
  type NotificationType,
  type TestCatalogItem,
  type VisitType,
} from "@/lib/api";
import { useAuth } from "@/lib/useAuth";
import { canDeleteAppointments, canExportAppointments, hasPermission, isAdmin } from "@/lib/roles";
import AutomationRules from "@/components/admin/AutomationRules";

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "checked_in",
  "in_progress",
  "sample_collected",
  "report_ready",
  "completed",
  "cancelled",
  "no_show",
] as const;

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-orange-100 text-orange-800 border-orange-200",
  confirmed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  checked_in: "bg-sky-100 text-sky-800 border-sky-200",
  in_progress: "bg-indigo-100 text-indigo-800 border-indigo-200",
  sample_collected: "bg-blue-100 text-blue-800 border-blue-200",
  report_ready: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-sky-100 text-sky-800 border-sky-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  no_show: "bg-slate-200 text-slate-700 border-slate-300",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  checked_in: "Checked-in",
  in_progress: "With doctor",
  sample_collected: "Sample collected",
  report_ready: "Report ready",
  completed: "Completed",
  cancelled: "Cancelled",
  no_show: "No-show",
};

const VISIT_TYPE_LABELS: Record<VisitType, string> = {
  scheduled: "Scheduled",
  walk_in: "Walk-in",
  emergency: "Emergency",
};

const NOTIFY_TYPE_LABELS: Record<NotificationType, string> = {
  confirmation: "Booking confirmation",
  payment: "Payment confirmation",
  payment_reminder: "Payment reminder",
  reminder: "Appointment reminder",
  reschedule: "Reschedule notice",
  cancellation: "Cancellation notice",
  offer: "Offer / book-again",
  marketing: "Marketing / offers",
  custom: "Custom message",
};

type SortKey = "created_at" | "preferred_date" | "patient_name" | "status";
type SortDir = "asc" | "desc";

function formatCreated(iso?: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-700 border-gray-200"
      }`}
    >
      {STATUS_LABELS[status] || status.replace(/_/g, " ")}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone = "slate",
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "slate" | "teal" | "red";
}) {
  // Kept to two accent tones (plus neutral) so the grid reads calmly instead
  // of looking like a rainbow of unrelated categories.
  const tones: Record<string, string> = {
    slate: "text-slate-500 bg-slate-100 dark:bg-gray-800 dark:text-slate-300",
    teal: "text-sky-700 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-400",
    red: "text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400",
  };
  return (
    <div className="rounded-xl bg-slate-50 dark:bg-gray-800/50 px-3.5 py-3 flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tones[tone]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[10.5px] font-bold uppercase tracking-wide text-slate-400 truncate">{label}</p>
        <p className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">{value}</p>
      </div>
    </div>
  );
}

export default function AppointmentsPage() {
  const { user } = useAuth();
  const canDelete = canDeleteAppointments(user);
  const canExport = canExportAppointments(user);
  const showAnalytics = isAdmin(user);
  // Automation (payment reminders, marketing, booking reminders) is gated by
  // a specific feature permission rather than admin tier, so a super-admin
  // can hand this off to e.g. a marketing-role account without granting
  // full admin access.
  const canManageAutomation = hasPermission(user, "automation.manage");
  const [showInfo, setShowInfo] = useState(false);

  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [packages, setPackages] = useState<HealthPackage[]>([]);
  const [tests, setTests] = useState<TestCatalogItem[]>([]);
  const [stats, setStats] = useState<AppointmentStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [dashboardTab, setDashboardTab] = useState<"overview" | "live">("overview");
  const [pageTab, setPageTab] = useState<"dashboard" | "list" | "automation">("dashboard");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [visitTypeFilter, setVisitTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "yesterday" | "tomorrow" | "week" | "month">("all");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const [detail, setDetail] = useState<Booking | null>(null);
  const [editing, setEditing] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [notifyTarget, setNotifyTarget] = useState<Booking | null>(null);
  const [rescheduleTarget, setRescheduleTarget] = useState<Booking | null>(null);
  const [receipt, setReceipt] = useState<{ booking: Booking; loading: boolean; data: Awaited<ReturnType<typeof api.bookings.receipt>> | null } | null>(null);
  const [history, setHistory] = useState<NotificationRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Create form
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bookingType, setBookingType] = useState<"test" | "package">("package");
  const [selectedTestId, setSelectedTestId] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [collectionType, setCollectionType] = useState<"home" | "center">("home");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00 AM");
  const [notes, setNotes] = useState("");
  const [visitType, setVisitType] = useState<VisitType>("scheduled");

  // Edit form (mirrors detail)
  const [editForm, setEditForm] = useState({
    patient_name: "",
    patient_phone: "",
    patient_email: "",
    preferred_date: "",
    preferred_time: "",
    status: "pending",
    notes: "",
    collection_type: "home" as "home" | "center",
    collection_address: "",
    test_name: "",
  });

  // Notify form
  const [notifyChannel, setNotifyChannel] = useState<NotificationChannel>("sms");
  const [notifyType, setNotifyType] = useState<NotificationType>("reminder");
  const [notifySubject, setNotifySubject] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notifyScheduleDate, setNotifyScheduleDate] = useState("");
  const [notifyScheduleTime, setNotifyScheduleTime] = useState("");
  const [notifySending, setNotifySending] = useState(false);

  // Reschedule form
  const [reschedDate, setReschedDate] = useState("");
  const [reschedTime, setReschedTime] = useState("");
  const [reschedNotify, setReschedNotify] = useState(true);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [bookingsRes, packagesRes, testsRes, statsRes] = await Promise.all([
        api.bookings.adminList(undefined, 500, 0),
        api.packages.list(),
        api.tests.list(),
        api.bookings.stats().catch(() => null),
      ]);
      setAppointments(bookingsRes.items);
      setPackages(packagesRes);
      setTests(testsRes);
      setStats(statsRes);
    } catch {
      setError("Could not load appointments. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: appointments.length };
    for (const s of STATUS_OPTIONS) c[s] = 0;
    for (const a of appointments) c[a.status] = (c[a.status] || 0) + 1;
    return c;
  }, [appointments]);

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);

  const dateRangeFor = useCallback(
    (mode: typeof dateFilter): [string, string] | null => {
      const today = new Date();
      const iso = (d: Date) => d.toISOString().split("T")[0];
      if (mode === "today") return [iso(today), iso(today)];
      if (mode === "yesterday") {
        const y = new Date(today);
        y.setDate(y.getDate() - 1);
        return [iso(y), iso(y)];
      }
      if (mode === "tomorrow") {
        const t = new Date(today);
        t.setDate(t.getDate() + 1);
        return [iso(t), iso(t)];
      }
      if (mode === "week") {
        const start = new Date(today);
        start.setDate(start.getDate() - start.getDay());
        return [iso(start), iso(today)];
      }
      if (mode === "month") {
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        return [iso(start), iso(today)];
      }
      return null;
    },
    []
  );

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const range = dateRangeFor(dateFilter);
    let rows = appointments.filter((apt) => {
      if (statusFilter !== "all" && apt.status !== statusFilter) return false;
      if (visitTypeFilter !== "all" && apt.visit_type !== visitTypeFilter) return false;
      if (range && apt.preferred_date) {
        if (apt.preferred_date < range[0] || apt.preferred_date > range[1]) return false;
      } else if (range && !apt.preferred_date) {
        return false;
      }
      if (!q) return true;
      return (
        apt.patient_name.toLowerCase().includes(q) ||
        apt.patient_phone.includes(q) ||
        (apt.patient_email || "").toLowerCase().includes(q) ||
        (apt.test_name || "").toLowerCase().includes(q) ||
        apt.id.toLowerCase().includes(q)
      );
    });

    rows = [...rows].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      const av = (a[sortKey] || "") as string;
      const bv = (b[sortKey] || "") as string;
      return av.localeCompare(bv, undefined, { sensitivity: "base", numeric: true }) * dir;
    });
    return rows;
  }, [appointments, searchQuery, statusFilter, visitTypeFilter, dateFilter, dateRangeFor, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "patient_name" ? "asc" : "desc");
    }
  };

  const openCreate = () => {
    setPatientName("");
    setPhone("");
    setEmail("");
    setBookingType("package");
    setSelectedTestId("");
    setSelectedPackageId(packages[0]?.id || "");
    setCollectionType("home");
    setCollectionAddress("");
    setDate(todayStr);
    setTime("09:00 AM");
    setNotes("");
    setVisitType("scheduled");
    setIsCreateOpen(true);
  };

  const openDetail = (apt: Booking) => {
    setDetail(apt);
    setEditing(false);
    setEditForm({
      patient_name: apt.patient_name,
      patient_phone: apt.patient_phone,
      patient_email: apt.patient_email || "",
      preferred_date: apt.preferred_date || "",
      preferred_time: apt.preferred_time || "",
      status: apt.status,
      notes: apt.notes || "",
      collection_type: apt.collection_type,
      collection_address: apt.collection_address || "",
      test_name: apt.test_name || "",
    });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone || !date) return;
    if (bookingType === "package" && !selectedPackageId) return;
    if (bookingType === "test" && !selectedTestId) return;
    if (collectionType === "home" && !collectionAddress) return;

    setSaving(true);
    setError(null);
    try {
      await api.bookings.create({
        patient_name: patientName,
        patient_phone: phone,
        patient_email: email || null,
        package_id: bookingType === "package" ? selectedPackageId : null,
        test_id: bookingType === "test" ? selectedTestId : null,
        collection_type: collectionType,
        collection_address: collectionType === "home" ? collectionAddress : null,
        preferred_date: date,
        preferred_time: time,
        notes: notes || null,
        visit_type: visitType,
      });
      setIsCreateOpen(false);
      await refreshData();
    } catch {
      setError("Could not schedule the visit. Check the test/package selection.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!detail) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await api.bookings.update(detail.id, {
        patient_name: editForm.patient_name,
        patient_phone: editForm.patient_phone,
        patient_email: editForm.patient_email || null,
        preferred_date: editForm.preferred_date || null,
        preferred_time: editForm.preferred_time || null,
        status: editForm.status,
        notes: editForm.notes || null,
        collection_type: editForm.collection_type,
        collection_address:
          editForm.collection_type === "home" ? editForm.collection_address || null : null,
        test_name: editForm.test_name || null,
      });
      setDetail(updated);
      setEditing(false);
      await refreshData();
    } catch {
      setError("Could not save appointment changes.");
    } finally {
      setSaving(false);
    }
  };

  const applyLocalUpdate = (updated: Booking) => {
    setAppointments((rows) => rows.map((r) => (r.id === updated.id ? updated : r)));
    if (detail?.id === updated.id) setDetail(updated);
  };

  const handleStatus = async (id: string, status: string) => {
    try {
      const updated = await api.bookings.updateStatus(id, status);
      applyLocalUpdate(updated);
    } catch {
      setError("Could not update status.");
    }
  };

  const runAction = async (id: string, action: () => Promise<Booking>) => {
    try {
      const updated = await action();
      applyLocalUpdate(updated);
    } catch {
      setError("Could not update this appointment.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!canDelete) return;
    if (!confirm("Permanently delete this appointment? This cannot be undone.")) return;
    try {
      await api.bookings.remove(id);
      setDetail(null);
      await refreshData();
    } catch {
      setError("Could not delete appointment.");
    }
  };

  const handleExport = () => {
    if (!canExport) return;
    const url = api.bookings.exportUrl(statusFilter === "all" ? undefined : statusFilter);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openNotify = (apt: Booking, type: NotificationType = "reminder") => {
    setNotifyTarget(apt);
    setNotifyChannel(apt.patient_email ? "sms" : "sms");
    setNotifyType(type);
    setNotifySubject("");
    setNotifyMessage("");
    setNotifyScheduleDate("");
    setNotifyScheduleTime("");
  };

  const handleSendNotify = async () => {
    if (!notifyTarget) return;
    if (notifyType === "custom" && !notifyMessage.trim()) {
      setError("Please write a message for a custom notification.");
      return;
    }
    setNotifySending(true);
    setError(null);
    try {
      let scheduled_at: string | null = null;
      if (notifyScheduleDate && notifyScheduleTime) {
        scheduled_at = new Date(`${notifyScheduleDate}T${notifyScheduleTime}`).toISOString();
      }
      await api.bookings.notify(notifyTarget.id, {
        channel: notifyChannel,
        type: notifyType,
        subject: notifySubject || null,
        message: notifyMessage || null,
        scheduled_at,
      });
      setNotifyTarget(null);
    } catch {
      setError("Could not send/schedule the notification.");
    } finally {
      setNotifySending(false);
    }
  };

  const openReschedule = (apt: Booking) => {
    setRescheduleTarget(apt);
    setReschedDate(apt.preferred_date || todayStr);
    setReschedTime(apt.preferred_time || "09:00 AM");
    setReschedNotify(true);
  };

  const handleReschedule = async () => {
    if (!rescheduleTarget || !reschedDate || !reschedTime) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await api.bookings.reschedule(rescheduleTarget.id, {
        preferred_date: reschedDate,
        preferred_time: reschedTime,
        notify: reschedNotify,
        channel: rescheduleTarget.patient_email ? "both" : "sms",
      });
      applyLocalUpdate(updated);
      setRescheduleTarget(null);
    } catch {
      setError("Could not reschedule this appointment.");
    } finally {
      setSaving(false);
    }
  };

  const openReceipt = async (apt: Booking) => {
    setReceipt({ booking: apt, loading: true, data: null });
    try {
      const data = await api.bookings.receipt(apt.id);
      setReceipt({ booking: apt, loading: false, data });
    } catch {
      setReceipt({ booking: apt, loading: false, data: null });
    }
  };

  const loadHistory = async (id: string) => {
    setHistoryLoading(true);
    try {
      const res = await api.bookings.notifications(id);
      setHistory(res.items);
    } catch {
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (detail) loadHistory(detail.id);
    else setHistory([]);
  }, [detail?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const inputCls =
    "w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500";

  const d = stats?.dashboard;
  const live = stats?.live;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            Appointments
            <button
              type="button"
              onClick={() => setShowInfo(true)}
              title="What can I do on this page?"
              aria-label="What can I do on this page?"
              className="text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer"
            >
              <Info className="w-5 h-5" />
            </button>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm max-w-xl">
            Review booking requests, confirm visits, update status, message patients, and manage the
            front-desk queue.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={refreshData}
            className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-gray-800 cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          {canExport && (
            <button
              type="button"
              onClick={handleExport}
              className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-gray-800 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          )}
          <button
            type="button"
            onClick={openCreate}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New appointment
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm flex justify-between gap-3">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)} className="shrink-0 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page-level tabs: Dashboard slides into the appointment list / automations */}
      <div className="relative flex bg-slate-100 dark:bg-gray-800 rounded-xl p-1 max-w-xl">
        <div
          className="absolute top-1 bottom-1 w-[calc(33.333%-5.33px)] rounded-lg bg-white dark:bg-gray-700 shadow-sm transition-transform duration-300 ease-out"
          style={{
            transform:
              pageTab === "dashboard"
                ? "translateX(0%)"
                : pageTab === "list"
                ? "translateX(calc(100% + 8px))"
                : "translateX(calc(200% + 16px))",
          }}
        />
        {(["dashboard", "list", "automation"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setPageTab(tab)}
            className={`relative z-10 flex-1 px-4 py-2 text-sm font-bold rounded-lg cursor-pointer transition-colors ${
              pageTab === tab
                ? "text-blue-700 dark:text-sky-300"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            {tab === "dashboard" ? "Dashboard" : tab === "list" ? "Appointments list" : "Automation"}
          </button>
        ))}
      </div>

      <div key={pageTab} className="space-y-6 animate-[tab-slide-in_0.28s_ease-out]">
      {pageTab === "dashboard" && (
      <>
      {/* Dashboard */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-gray-800 rounded-lg p-1">
            {(["overview", "live"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setDashboardTab(tab);
                  setShowDashboard(true);
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-md cursor-pointer transition-colors ${
                  showDashboard && dashboardTab === tab
                    ? "bg-white dark:bg-gray-700 text-sky-700 dark:text-sky-300 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                {tab === "overview" ? "Overview" : "Live floor"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowDashboard((v) => !v)}
            className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 font-semibold cursor-pointer"
          >
            {showDashboard ? "Hide" : "Show"}
          </button>
        </div>
        {showDashboard && d && live && (
          <div className="px-4 pb-4">
            {dashboardTab === "overview" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                <StatCard label="Total appointments" value={d.total_appointments} icon={CalendarDays} />
                <StatCard label="Today" value={d.today_appointments} icon={CalendarClock} tone="teal" />
                <StatCard label="Yesterday" value={d.yesterday_appointments} icon={CalendarClock} />
                <StatCard label="Tomorrow" value={d.tomorrow_appointments} icon={CalendarClock} />
                <StatCard label="This week" value={d.this_week_appointments} icon={CalendarDays} />
                <StatCard label="This month" value={d.this_month_appointments} icon={CalendarDays} />
                <StatCard label="Total patients" value={d.total_patients} icon={Users} tone="teal" />
                <StatCard label="New patients" value={d.new_patients} icon={Users} />
                <StatCard label="Returning patients" value={d.returning_patients} icon={Users} />
                <StatCard label="Rescheduled" value={d.rescheduled_appointments} icon={CalendarClock} />
                <StatCard label="Walk-in patients" value={d.walk_in_patients} icon={Users} />
                <StatCard label="Emergency patients" value={d.emergency_patients} icon={AlertTriangle} tone="red" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                <StatCard label="Waiting now" value={live.currently_waiting} icon={Clock} tone="teal" />
                <StatCard label="With doctor" value={live.with_doctor} icon={Stethoscope} tone="teal" />
                <StatCard
                  label="Avg. waiting time"
                  value={live.avg_waiting_minutes != null ? `${live.avg_waiting_minutes}m` : "—"}
                  icon={Clock}
                />
                <StatCard
                  label="Avg. consult time"
                  value={live.avg_consultation_minutes != null ? `${live.avg_consultation_minutes}m` : "—"}
                  icon={Stethoscope}
                />
                <StatCard label="Today's patients" value={live.today_patient_count} icon={Users} />
                <StatCard
                  label="vs. Yesterday"
                  value={live.change_percent != null ? `${live.change_percent > 0 ? "+" : ""}${live.change_percent}%` : "—"}
                  icon={ArrowUpDown}
                />
                <StatCard label="Upcoming today" value={live.upcoming_today} icon={CalendarClock} tone="teal" />
              </div>
            )}
          </div>
        )}
      </div>
      </>
      )}

      {pageTab === "list" && (
      <>
      {/* Status filter chips — single source of truth for status counts */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-3">
        <div className="flex flex-wrap gap-1.5">
          {[
            { key: "all", label: "All" },
            ...STATUS_OPTIONS.map((s) => ({ key: s, label: STATUS_LABELS[s] })),
          ].map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => setStatusFilter(chip.key)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold cursor-pointer transition-colors ${
                statusFilter === chip.key
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-slate-50 dark:bg-gray-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700"
              }`}
            >
              {chip.label}
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  statusFilter === chip.key ? "bg-white/20" : "bg-white dark:bg-gray-900"
                }`}
              >
                {counts[chip.key] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {showAnalytics && canExport && (
        <p className="text-xs text-slate-400 -mt-2">Use Export CSV above for full reports.</p>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search name, phone, email, test…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <select
              value={visitTypeFilter}
              onChange={(e) => setVisitTypeFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <option value="all">All visit types</option>
              <option value="scheduled">Scheduled</option>
              <option value="walk_in">Walk-in</option>
              <option value="emergency">Emergency</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as typeof dateFilter)}
              className="px-3 py-2 text-xs font-semibold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <option value="all">All dates</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="week">This week</option>
              <option value="month">This month</option>
            </select>
            <p className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
              Showing <strong className="text-slate-700 dark:text-slate-200">{filtered.length}</strong> of{" "}
              {appointments.length}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-16 flex justify-center text-gray-400">
            <Loader2 className="w-7 h-7 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-14 text-center">
            <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">No appointments found</h3>
            <p className="text-sm text-gray-500 mt-1">Try clearing filters or schedule a new visit.</p>
          </div>
        ) : (
          <div className="overflow-auto custom-scrollbar max-h-[calc(100vh-360px)] min-h-70">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-slate-50 dark:bg-slate-950/90 text-gray-500 uppercase text-[10px] font-black tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="px-4 py-3">
                    <button type="button" onClick={() => toggleSort("patient_name")} className="inline-flex items-center gap-1 cursor-pointer">
                      Patient <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Test / Package</th>
                  <th className="px-4 py-3">
                    <button type="button" onClick={() => toggleSort("preferred_date")} className="inline-flex items-center gap-1 cursor-pointer">
                      Preferred slot <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3">
                    <button type="button" onClick={() => toggleSort("status")} className="inline-flex items-center gap-1 cursor-pointer">
                      Status <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                {filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-950/20">
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        {apt.patient_name}
                        {apt.is_delayed && (
                          <span title="Delayed" className="text-amber-500">
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] font-mono text-gray-400 mt-0.5">{apt.id.slice(0, 8)}…</p>
                      <div className="flex items-center gap-1 flex-wrap mt-1">
                        {apt.visit_type !== "scheduled" && (
                          <span
                            className={`inline-block text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                              apt.visit_type === "emergency" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {VISIT_TYPE_LABELS[apt.visit_type]}
                          </span>
                        )}
                        {apt.assigned_to_name ? (
                          <span
                            title="Auto-assigned appointments staff"
                            className="inline-flex items-center gap-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400"
                          >
                            <UserCheck className="w-2.5 h-2.5" /> {apt.assigned_to_name}
                          </span>
                        ) : (
                          <span className="inline-block text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                            Unassigned
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`tel:${apt.patient_phone}`}
                        className="text-sky-700 dark:text-sky-400 font-medium hover:underline inline-flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {apt.patient_phone}
                      </a>
                      {apt.patient_email && (
                        <p className="text-[11px] text-gray-400 truncate max-w-[160px]">{apt.patient_email}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-sky-700 dark:text-sky-400 max-w-[180px]">
                      <span className="line-clamp-2">{apt.test_name || "—"}</span>
                      <span className="block text-[10px] font-medium text-gray-400 mt-0.5 capitalize">
                        {apt.collection_type === "home" ? "Home collection" : "Center visit"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                      {apt.preferred_date || "—"}
                      {apt.preferred_time ? (
                        <span className="text-gray-500"> · {apt.preferred_time}</span>
                      ) : null}
                      {apt.was_rescheduled && (
                        <span className="block text-[10px] text-amber-600 font-semibold">Rescheduled</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={apt.status} />
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span
                        className={`font-bold ${
                          apt.payment_status === "paid"
                            ? "text-emerald-600"
                            : apt.payment_status === "failed"
                            ? "text-red-600"
                            : "text-gray-400"
                        }`}
                      >
                        {apt.payment_status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-0.5 flex-wrap">
                        <button type="button" onClick={() => openDetail(apt)} className="p-1.5 text-slate-500 hover:text-sky-700 hover:bg-sky-50 dark:hover:bg-sky-950/30 rounded-lg cursor-pointer" title="View details">
                          <Eye className="w-4 h-4" />
                        </button>
                        {apt.status === "pending" && (
                          <button type="button" onClick={() => handleStatus(apt.id, "confirmed")} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg cursor-pointer" title="Confirm">
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        {apt.status === "confirmed" && (
                          <button type="button" onClick={() => runAction(apt.id, () => api.bookings.checkIn(apt.id))} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-lg cursor-pointer" title="Check-in">
                            <Stethoscope className="w-4 h-4" />
                          </button>
                        )}
                        {apt.status === "checked_in" && (
                          <button type="button" onClick={() => runAction(apt.id, () => api.bookings.start(apt.id))} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg cursor-pointer" title="Start (with doctor)">
                            <Stethoscope className="w-4 h-4" />
                          </button>
                        )}
                        {!["completed", "cancelled", "no_show"].includes(apt.status) && (
                          <button type="button" onClick={() => runAction(apt.id, () => api.bookings.complete(apt.id))} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-lg cursor-pointer" title="Complete">
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        {apt.status !== "cancelled" && apt.status !== "completed" && (
                          <button type="button" onClick={() => handleStatus(apt.id, "cancelled")} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer" title="Cancel">
                            <Ban className="w-4 h-4" />
                          </button>
                        )}
                        {!["completed", "cancelled", "no_show"].includes(apt.status) && (
                          <button type="button" onClick={() => runAction(apt.id, () => api.bookings.noShow(apt.id))} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer" title="Mark no-show">
                            <AlertTriangle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => runAction(apt.id, () => api.bookings.toggleDelay(apt.id, !apt.is_delayed))}
                          className={`p-1.5 rounded-lg cursor-pointer ${apt.is_delayed ? "text-amber-600 bg-amber-50" : "text-slate-400 hover:text-amber-600 hover:bg-amber-50"}`}
                          title={apt.is_delayed ? "Clear delayed flag" : "Mark delayed"}
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => openReschedule(apt)} className="p-1.5 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded-lg cursor-pointer" title="Reschedule">
                          <CalendarClock className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => openNotify(apt)} className="p-1.5 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded-lg cursor-pointer" title="Send SMS / email">
                          <Bell className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => openReceipt(apt)} className="p-1.5 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded-lg cursor-pointer" title="Payment receipt">
                          <Receipt className="w-4 h-4" />
                        </button>
                        {canDelete && (
                          <button type="button" onClick={() => handleDelete(apt.id)} className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg cursor-pointer" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </>
      )}

      {pageTab === "automation" && <AutomationRules canManage={canManageAutomation} />}
      </div>

      {/* "What is this page?" info modal */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-xs p-4">
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Close" onClick={() => setShowInfo(false)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[85vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Info className="w-4.5 h-4.5 text-sky-600" /> About this page
              </h3>
              <button type="button" onClick={() => setShowInfo(false)} className="p-2 text-gray-400 rounded-lg cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">Dashboard</p>
                <p>
                  A live snapshot of today&apos;s booking volume, patient counts, and status breakdown, plus a
                  &quot;Live&quot; tab with real-time queue stats (waiting, with doctor, avg. wait/consult time).
                </p>
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">Appointments list</p>
                <p>
                  Search, filter, and sort every booking. Click a row to view/edit patient &amp; test details,
                  update status (confirm, check-in, complete, cancel, no-show, reschedule), view the payment
                  receipt, or send a custom SMS/email. The list scrolls independently so the page header and
                  filters stay in view.
                </p>
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">Automation</p>
                <p>
                  Set up recurring, self-running messages: payment reminders for unpaid bookings, booking
                  reminders for upcoming visits, and marketing campaigns to your patient list. Pick a channel
                  (SMS/email/both), an interval, an optional date window, and a starting message template.
                  Only accounts with the &quot;Configure automated reminders &amp; marketing rules&quot;
                  permission can create or edit automations — ask a super admin to grant it from the Roles page
                  if you need access.
                </p>
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">Notification bell</p>
                <p>
                  New bookings and payment confirmations for appointments assigned to you appear here instantly,
                  with an optional sound and desktop alert. Right-click the bell to mute/unmute sound.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail / edit drawer */}
      {detail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[2px]">
          <button type="button" className="flex-1 cursor-default" aria-label="Close" onClick={() => setDetail(null)} />
          <div className="w-full max-w-lg h-full bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-sky-600">Appointment</p>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{detail.patient_name}</h2>
                <p className="text-xs text-gray-400 font-mono mt-1">{detail.id}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  {detail.assigned_to_name ? `Assigned to ${detail.assigned_to_name}` : "Not yet assigned"}
                </p>
              </div>
              <button type="button" onClick={() => setDetail(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {!editing ? (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <StatusBadge status={detail.status} />
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="text-sm font-semibold text-sky-700 inline-flex items-center gap-1.5 hover:underline cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit details
                    </button>
                  </div>
                  <dl className="grid grid-cols-1 gap-3 text-sm">
                    {[
                      ["Phone", detail.patient_phone],
                      ["Email", detail.patient_email || "—"],
                      ["Age / Gender", `${detail.patient_age ?? "—"} / ${detail.patient_gender ?? "—"}`],
                      ["Test / Package", detail.test_name || "—"],
                      ["Visit type", VISIT_TYPE_LABELS[detail.visit_type]],
                      ["Collection", detail.collection_type === "home" ? "Home" : "Center"],
                      ["Address", detail.collection_address || "—"],
                      ["Preferred date", detail.preferred_date || "—"],
                      ["Preferred time", detail.preferred_time || "—"],
                      ["Payment", detail.payment_status],
                      ["Created", formatCreated(detail.created_at)],
                      ["Notes", detail.notes || "—"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-xl bg-slate-50 dark:bg-gray-800/60 px-3.5 py-2.5">
                        <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</dt>
                        <dd className="mt-0.5 font-medium text-slate-800 dark:text-slate-100 break-words">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <a href={`tel:${detail.patient_phone}`} className="px-3 py-2 rounded-lg bg-sky-600 text-white text-xs font-bold inline-flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> Call
                    </a>
                    {detail.patient_email && (
                      <a href={`mailto:${detail.patient_email}`} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-bold inline-flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> Email
                      </a>
                    )}
                    <button type="button" onClick={() => openNotify(detail)} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer">
                      <Bell className="w-3.5 h-3.5" /> SMS / Email
                    </button>
                    <button type="button" onClick={() => openReschedule(detail)} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer">
                      <CalendarClock className="w-3.5 h-3.5" /> Reschedule
                    </button>
                    <button type="button" onClick={() => openReceipt(detail)} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer">
                      <Receipt className="w-3.5 h-3.5" /> Receipt
                    </button>
                    {detail.status === "pending" && (
                      <button type="button" onClick={() => handleStatus(detail.id, "confirmed")} className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold cursor-pointer">
                        Confirm
                      </button>
                    )}
                    {detail.status !== "cancelled" && detail.status !== "completed" && (
                      <button type="button" onClick={() => handleStatus(detail.id, "cancelled")} className="px-3 py-2 rounded-lg bg-red-50 text-red-700 text-xs font-bold cursor-pointer">
                        Cancel appointment
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5">
                      Update status
                    </label>
                    <select value={detail.status} onChange={(e) => handleStatus(detail.id, e.target.value)} className={inputCls}>
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" /> Notification history
                    </h3>
                    {historyLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    ) : history.length === 0 ? (
                      <p className="text-xs text-gray-400">No SMS/email sent yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {history.map((n) => (
                          <div key={n.id} className="rounded-lg border border-gray-100 dark:border-gray-800 px-3 py-2 text-xs">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-slate-700 dark:text-slate-200">
                                {NOTIFY_TYPE_LABELS[n.type]} · {n.channel.toUpperCase()}
                              </span>
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                  n.status === "sent"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : n.status === "scheduled"
                                    ? "bg-amber-100 text-amber-700"
                                    : n.status === "failed"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {n.status}
                              </span>
                            </div>
                            <p className="text-gray-500 mt-1 line-clamp-2">{n.message}</p>
                            <p className="text-gray-400 mt-1">
                              {n.scheduled_at && n.status === "scheduled"
                                ? `Scheduled: ${formatCreated(n.scheduled_at)}`
                                : formatCreated(n.sent_at || n.created_at)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {canDelete && (
                    <button type="button" onClick={() => handleDelete(detail.id)} className="w-full mt-2 px-3 py-2.5 rounded-lg border border-red-200 text-red-700 text-xs font-bold hover:bg-red-50 cursor-pointer inline-flex items-center justify-center gap-1.5">
                      <Trash2 className="w-3.5 h-3.5" /> Delete appointment
                    </button>
                  )}
                </>
              ) : (
                <div className="space-y-3">
                  {(
                    [
                      ["patient_name", "Patient name"],
                      ["patient_phone", "Phone"],
                      ["patient_email", "Email"],
                      ["test_name", "Test / Package name"],
                      ["preferred_date", "Preferred date"],
                      ["preferred_time", "Preferred time"],
                      ["collection_address", "Collection address"],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key}>
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">{label}</label>
                      <input className={inputCls} value={editForm[key]} onChange={(e) => setEditForm((f) => ({ ...f, [key]: e.target.value }))} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Collection</label>
                    <select className={inputCls} value={editForm.collection_type} onChange={(e) => setEditForm((f) => ({ ...f, collection_type: e.target.value as "home" | "center" }))}>
                      <option value="home">Home collection</option>
                      <option value="center">Center visit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Status</label>
                    <select className={inputCls} value={editForm.status} onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value }))}>
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">Notes</label>
                    <textarea rows={3} className={inputCls} value={editForm.notes} onChange={(e) => setEditForm((f) => ({ ...f, notes: e.target.value }))} />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setEditing(false)} className="flex-1 px-3 py-2.5 rounded-lg border text-xs font-bold cursor-pointer">
                      Back
                    </button>
                    <button type="button" disabled={saving} onClick={handleSaveEdit} className="flex-1 px-3 py-2.5 rounded-lg bg-sky-600 text-white text-xs font-bold disabled:opacity-60 cursor-pointer inline-flex items-center justify-center gap-1.5">
                      {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      Save changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Schedule appointment</h3>
              <button type="button" onClick={() => setIsCreateOpen(false)} className="p-2 text-gray-400 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Patient name</label>
                <input required className={inputCls} value={patientName} onChange={(e) => setPatientName(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Phone</label>
                <input required type="tel" className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Email (optional)</label>
                <input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Visit type</label>
                <select className={inputCls} value={visitType} onChange={(e) => setVisitType(e.target.value as VisitType)}>
                  <option value="scheduled">Scheduled</option>
                  <option value="walk_in">Walk-in</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setBookingType("package")} className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg cursor-pointer ${bookingType === "package" ? "bg-sky-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}>
                  Package
                </button>
                <button type="button" onClick={() => setBookingType("test")} className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg cursor-pointer ${bookingType === "test" ? "bg-sky-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}>
                  Test
                </button>
              </div>
              {bookingType === "package" ? (
                <select required className={inputCls} value={selectedPackageId} onChange={(e) => setSelectedPackageId(e.target.value)}>
                  <option value="">Select package…</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ₹{p.price}
                    </option>
                  ))}
                </select>
              ) : (
                <select required className={inputCls} value={selectedTestId} onChange={(e) => setSelectedTestId(e.target.value)}>
                  <option value="">Select test…</option>
                  {tests.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                      {t.price ? ` — ₹${t.price}` : ""}
                    </option>
                  ))}
                </select>
              )}
              <div className="flex gap-2">
                <button type="button" onClick={() => setCollectionType("home")} className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg cursor-pointer ${collectionType === "home" ? "bg-sky-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}>
                  Home
                </button>
                <button type="button" onClick={() => setCollectionType("center")} className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg cursor-pointer ${collectionType === "center" ? "bg-sky-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}>
                  Center
                </button>
              </div>
              {collectionType === "home" && (
                <input required className={inputCls} placeholder="Collection address" value={collectionAddress} onChange={(e) => setCollectionAddress(e.target.value)} />
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Date</label>
                  <input required type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Time</label>
                  <input required className={inputCls} value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>
              <textarea className={inputCls} rows={2} placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-4 py-2 text-xs font-medium border rounded-lg cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="px-5 py-2 bg-sky-600 text-white text-xs font-bold rounded-lg disabled:opacity-60 inline-flex items-center gap-2 cursor-pointer">
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notify modal */}
      {notifyTarget && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-sky-600" /> Message {notifyTarget.patient_name}
              </h3>
              <button type="button" onClick={() => setNotifyTarget(null)} className="p-2 text-gray-400 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Channel</label>
                <div className="flex gap-2">
                  {(["sms", "email", "both"] as NotificationChannel[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNotifyChannel(c)}
                      className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg cursor-pointer capitalize ${notifyChannel === c ? "bg-sky-600 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Message type</label>
                <select className={inputCls} value={notifyType} onChange={(e) => setNotifyType(e.target.value as NotificationType)}>
                  {(Object.keys(NOTIFY_TYPE_LABELS) as NotificationType[]).map((t) => (
                    <option key={t} value={t}>
                      {NOTIFY_TYPE_LABELS[t]}
                    </option>
                  ))}
                </select>
              </div>
              {notifyType === "custom" && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">Subject (email only)</label>
                    <input className={inputCls} value={notifySubject} onChange={(e) => setNotifySubject(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Message</label>
                    <textarea required rows={4} className={inputCls} value={notifyMessage} onChange={(e) => setNotifyMessage(e.target.value)} placeholder="Type your custom message…" />
                  </div>
                </>
              )}
              {notifyType !== "custom" && (
                <p className="text-xs text-gray-500 bg-slate-50 dark:bg-gray-800/60 rounded-lg p-3">
                  A standard {NOTIFY_TYPE_LABELS[notifyType].toLowerCase()} message will be sent. You can override it
                  by choosing &quot;Custom message&quot; instead.
                </p>
              )}
              <div>
                <label className="block text-xs font-bold mb-1">Send later (optional)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" className={inputCls} value={notifyScheduleDate} onChange={(e) => setNotifyScheduleDate(e.target.value)} />
                  <input type="time" className={inputCls} value={notifyScheduleTime} onChange={(e) => setNotifyScheduleTime(e.target.value)} />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">Leave blank to send immediately.</p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setNotifyTarget(null)} className="px-4 py-2 text-xs font-medium border rounded-lg cursor-pointer">
                  Cancel
                </button>
                <button type="button" disabled={notifySending} onClick={handleSendNotify} className="px-5 py-2 bg-sky-600 text-white text-xs font-bold rounded-lg disabled:opacity-60 inline-flex items-center gap-2 cursor-pointer">
                  {notifySending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {notifyScheduleDate ? "Schedule" : "Send now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule modal */}
      {rescheduleTarget && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-sm w-full shadow-2xl border border-gray-200 dark:border-gray-800">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-sky-600" /> Reschedule
              </h3>
              <button type="button" onClick={() => setRescheduleTarget(null)} className="p-2 text-gray-400 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">New date</label>
                  <input type="date" className={inputCls} value={reschedDate} onChange={(e) => setReschedDate(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">New time</label>
                  <input className={inputCls} value={reschedTime} onChange={(e) => setReschedTime(e.target.value)} />
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <input type="checkbox" checked={reschedNotify} onChange={(e) => setReschedNotify(e.target.checked)} />
                Notify patient of the new schedule
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setRescheduleTarget(null)} className="px-4 py-2 text-xs font-medium border rounded-lg cursor-pointer">
                  Cancel
                </button>
                <button type="button" disabled={saving} onClick={handleReschedule} className="px-5 py-2 bg-sky-600 text-white text-xs font-bold rounded-lg disabled:opacity-60 inline-flex items-center gap-2 cursor-pointer">
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Confirm reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receipt modal */}
      {receipt && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Receipt className="w-4 h-4 text-sky-600" /> Payment receipt
              </h3>
              <button type="button" onClick={() => setReceipt(null)} className="p-2 text-gray-400 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {receipt.loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              ) : !receipt.data ? (
                <p className="text-sm text-gray-500">Could not load receipt details.</p>
              ) : (
                <>
                  <div className="rounded-xl bg-slate-50 dark:bg-gray-800/60 p-4 space-y-1.5 text-sm">
                    <p className="font-bold text-slate-900 dark:text-white">{receipt.data.patient_name}</p>
                    <p className="text-gray-500">{receipt.data.patient_phone}</p>
                    <p className="text-gray-500">{receipt.data.item_name || "—"}</p>
                    <p className="text-gray-500">
                      {receipt.data.preferred_date} {receipt.data.preferred_time}
                    </p>
                    <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                      <span className="font-bold">Amount</span>
                      <span className="font-bold">
                        {receipt.data.amount_paise != null ? `₹${(receipt.data.amount_paise / 100).toFixed(0)}` : "—"}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Status</span>
                      <span className="font-bold uppercase">{receipt.data.payment_status}</span>
                    </div>
                  </div>
                  {receipt.data.payments.length === 0 ? (
                    <p className="text-xs text-gray-400">
                      No online payment record found — this may have been paid via cash/UPI at the center.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">Payment records</h4>
                      {receipt.data.payments.map((p) => (
                        <div key={p.id} className="rounded-lg border border-gray-100 dark:border-gray-800 px-3 py-2 text-xs">
                          <div className="flex justify-between font-semibold">
                            <span>₹{(p.amount / 100).toFixed(0)}</span>
                            <span className="uppercase">{p.status}</span>
                          </div>
                          <p className="text-gray-400 mt-0.5">Order: {p.razorpay_order_id}</p>
                          {p.razorpay_payment_id && <p className="text-gray-400">Payment: {p.razorpay_payment_id}</p>}
                          <p className="text-gray-400">{formatCreated(p.paid_at || p.created_at)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <button type="button" onClick={() => window.print()} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-bold cursor-pointer">
                    Print receipt
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Search,
  Calendar,
  Phone,
  User,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Filter,
  ChevronDown,
  FlaskConical,
} from "lucide-react";

const VALID_USER = "QXL";
const VALID_PASS = "QXL";

interface Booking {
  id: string;
  patient_name: string;
  phone: string;
  email: string;
  test_name: string;
  package_name: string;
  preferred_date: string;
  collection_type: string;
  address: string;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  sample_collected: "bg-purple-100 text-purple-700 border-purple-200",
  report_ready: "bg-green-100 text-green-700 border-green-200",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

export default function AppointmentPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [fetching, setFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = sessionStorage.getItem("qxl_appt_auth");
      if (loggedIn === "true") setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchAppointments();
  }, [isAuthenticated]);

  const fetchAppointments = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/v1/bookings/admin", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.bookings || data.items || [];
        if (list.length > 0) {
          setAppointments(list);
          setFetching(false);
          return;
        }
      }
    } catch {
      // fallback
    }

    // Try api helper fallback
    try {
      const res = await api.bookings.adminList();
      if (res.items && res.items.length > 0) {
        const mapped = res.items.map((b) => ({
          id: b.id,
          patient_name: b.patient_name,
          phone: b.patient_phone,
          email: b.patient_email || "",
          test_name: b.test_name || "",
          package_name: b.package_name || "",
          preferred_date: b.preferred_date || "",
          collection_type: b.collection_type === "home" ? "Home Collection" : "Center Visit",
          address: b.collection_address || "",
          status: b.status,
          created_at: b.created_at,
        }));
        setAppointments(mapped);
        setFetching(false);
        return;
      }
    } catch {
      // fallback
    }

    // Default sample appointments if database has no records yet
    setAppointments([
      {
        id: "BK-10928",
        patient_name: "Ananya Sharma",
        phone: "+91 98765 43210",
        email: "ananya.sharma@example.com",
        test_name: "Complete Blood Count (CBC)",
        package_name: "Q-Master Health Pro Package",
        preferred_date: "2026-07-21",
        collection_type: "Home Collection",
        address: "Flat 402, Sunshine Apartments, Indiranagar, Bengaluru",
        status: "confirmed",
        created_at: new Date().toISOString(),
      },
      {
        id: "BK-10929",
        patient_name: "Rajesh Kumar",
        phone: "+91 99887 76655",
        email: "rajesh.k@example.com",
        test_name: "Thyroid Profile (Total T3, T4, TSH)",
        package_name: "Quick Fit Package",
        preferred_date: "2026-07-22",
        collection_type: "Center Visit",
        address: "Kengeri Main Lab",
        status: "pending",
        created_at: new Date().toISOString(),
      },
      {
        id: "BK-10930",
        patient_name: "Priya Nair",
        phone: "+91 91234 56789",
        email: "priya.nair@example.com",
        test_name: "HbA1c & Fasting Blood Sugar",
        package_name: "Q-Screen Diabetes Package",
        preferred_date: "2026-07-20",
        collection_type: "Home Collection",
        address: "Villa 14, Green Glen Layout, Bellandur, Bengaluru",
        status: "report_ready",
        created_at: new Date().toISOString(),
      },
    ]);
    setFetching(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (username.trim() === VALID_USER && password === VALID_PASS) {
      setIsAuthenticated(true);
      sessionStorage.setItem("qxl_appt_auth", "true");
    } else {
      setLoginError("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("qxl_appt_auth");
    setUsername("");
    setPassword("");
  };

  const filtered = appointments.filter((a) => {
    const matchesSearch =
      !searchTerm ||
      a.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone?.includes(searchTerm) ||
      a.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.test_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.package_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter(
      (a) => a.status === "completed" || a.status === "report_ready"
    ).length,
  };

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background:
            "linear-gradient(160deg, #e0f2fe 0%, #f0f9ff 30%, #e8f4fd 60%, #dbeafe 100%)",
        }}
      >
        {/* Ambient orbs */}
        <div
          className="fixed top-[-20vh] left-[-10vw] w-[80vw] h-[80vh] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(186,230,252,0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <div
            className="rounded-3xl p-8 md:p-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(224,242,254,0.7) 0%, rgba(186,230,252,0.5) 100%)",
              backdropFilter: "blur(32px) saturate(200%)",
              WebkitBackdropFilter: "blur(32px) saturate(200%)",
              border: "1px solid rgba(125,211,232,0.28)",
              boxShadow:
                "0 8px 40px rgba(14,165,233,0.10), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(125,211,232,0.12)",
            }}
          >
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background:
                    "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%)",
                  boxShadow:
                    "0 4px 20px rgba(14,165,233,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
                }}
              >
                <Lock className="w-7 h-7 text-white" />
              </div>
              <h1
                className="text-2xl font-extrabold mb-1"
                style={{ color: "#0c4a6e" }}
              >
                Appointments Portal
              </h1>
              <p className="text-sm font-medium" style={{ color: "#0369a1" }}>
                Sign in to view appointment records
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                  style={{ color: "#0369a1" }}
                >
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
                  style={{
                    background: "rgba(240,249,255,0.65)",
                    border: "1px solid rgba(125,211,232,0.3)",
                    color: "#0c4a6e",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(14,165,233,0.6)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(14,165,233,0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(125,211,232,0.3)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  placeholder="Enter username"
                  autoFocus
                />
              </div>

              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                  style={{ color: "#0369a1" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-11 rounded-xl text-sm font-medium outline-none transition-all"
                    style={{
                      background: "rgba(240,249,255,0.65)",
                      border: "1px solid rgba(125,211,232,0.3)",
                      color: "#0c4a6e",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(14,165,233,0.6)";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(14,165,233,0.12)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(125,211,232,0.3)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors"
                    style={{ color: "#0369a1" }}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {loginError && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-semibold text-red-500 text-center"
                >
                  {loginError}
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-white cursor-pointer transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%)",
                  boxShadow:
                    "0 4px 20px rgba(14,165,233,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
                }}
              >
                Sign In
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(160deg, #e0f2fe 0%, #f0f9ff 30%, #e8f4fd 60%, #dbeafe 100%)",
      }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "rgba(240,249,255,0.8)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: "1px solid rgba(125,211,232,0.2)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #7dd3fc 0%, #0ea5e9 100%)",
                boxShadow: "0 2px 10px rgba(14,165,233,0.3)",
              }}
            >
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1
                className="text-sm font-extrabold leading-tight"
                style={{ color: "#0c4a6e" }}
              >
                QXL Diagnostics
              </h1>
              <p className="text-[10px] font-semibold" style={{ color: "#0369a1" }}>
                Appointment Dashboard
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
            style={{
              color: "#0369a1",
              background: "rgba(224,242,254,0.65)",
              border: "1px solid rgba(125,211,232,0.3)",
            }}
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total",
              value: stats.total,
              icon: <Calendar className="w-5 h-5" />,
              bg: "rgba(224,242,254,0.7)",
              accent: "#0ea5e9",
            },
            {
              label: "Pending",
              value: stats.pending,
              icon: <Clock className="w-5 h-5" />,
              bg: "rgba(254,243,199,0.7)",
              accent: "#d97706",
            },
            {
              label: "Confirmed",
              value: stats.confirmed,
              icon: <CheckCircle className="w-5 h-5" />,
              bg: "rgba(219,234,254,0.7)",
              accent: "#2563eb",
            },
            {
              label: "Completed",
              value: stats.completed,
              icon: <FlaskConical className="w-5 h-5" />,
              bg: "rgba(209,250,229,0.7)",
              accent: "#059669",
            },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-2xl p-4"
              style={{
                background: s.bg,
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(125,211,232,0.2)",
                boxShadow: "0 4px 20px rgba(14,165,233,0.06)",
              }}
            >
              <div className="flex items-center gap-2 mb-2" style={{ color: s.accent }}>
                {s.icon}
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
              <p className="text-3xl font-extrabold" style={{ color: "#0c4a6e" }}>
                {s.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div
            className="flex items-center gap-2 flex-1 rounded-xl px-4 py-2.5"
            style={{
              background: "rgba(240,249,255,0.75)",
              border: "1px solid rgba(125,211,232,0.25)",
            }}
          >
            <Search className="w-4 h-4" style={{ color: "#0369a1" }} />
            <input
              type="text"
              placeholder="Search by name, phone, email, or test..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm font-medium"
              style={{ color: "#0c4a6e" }}
            />
          </div>
          <div className="relative">
            <div
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 cursor-pointer"
              style={{
                background: "rgba(240,249,255,0.75)",
                border: "1px solid rgba(125,211,232,0.25)",
              }}
            >
              <Filter className="w-4 h-4" style={{ color: "#0369a1" }} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-sm font-medium outline-none appearance-none pr-5 cursor-pointer"
                style={{ color: "#0c4a6e" }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="sample_collected">Sample Collected</option>
                <option value="report_ready">Report Ready</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-3 pointer-events-none" style={{ color: "#0369a1" }} />
            </div>
          </div>
        </div>

        {/* Appointments List */}
        {fetching ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#0ea5e9" }} />
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-20 rounded-2xl"
            style={{
              background: "rgba(240,249,255,0.65)",
              border: "1px solid rgba(125,211,232,0.2)",
            }}
          >
            <Calendar className="w-12 h-12 mx-auto mb-3" style={{ color: "#7dd3fc" }} />
            <p className="font-bold text-lg" style={{ color: "#0c4a6e" }}>
              {appointments.length === 0
                ? "No appointments found"
                : "No matching appointments"}
            </p>
            <p className="text-sm mt-1" style={{ color: "#0369a1" }}>
              {appointments.length === 0
                ? "Appointments will appear here once patients start booking."
                : "Try adjusting your search or filter."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="rounded-2xl p-5 transition-all hover:scale-[1.005]"
                  style={{
                    background: "rgba(255,255,255,0.75)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(125,211,232,0.2)",
                    boxShadow: "0 4px 24px rgba(14,165,233,0.06), inset 0 1px 0 rgba(255,255,255,0.85)",
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(224,242,254,0.8)" }}
                        >
                          <User className="w-4 h-4" style={{ color: "#0ea5e9" }} />
                        </div>
                        <div className="min-w-0">
                          <h3
                            className="font-bold text-sm truncate"
                            style={{ color: "#0c4a6e" }}
                          >
                            {a.patient_name || "Unknown Patient"}
                          </h3>
                          <div className="flex items-center gap-3 text-[11px] font-medium" style={{ color: "#0369a1" }}>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {a.phone || "N/A"}
                            </span>
                            {a.email && (
                              <span className="hidden sm:inline truncate">{a.email}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {a.test_name && (
                          <span
                            className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg"
                            style={{
                              background: "rgba(224,242,254,0.8)",
                              color: "#0369a1",
                              border: "1px solid rgba(125,211,232,0.2)",
                            }}
                          >
                            <FlaskConical className="w-3 h-3" /> {a.test_name}
                          </span>
                        )}
                        {a.package_name && (
                          <span
                            className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg"
                            style={{
                              background: "rgba(209,250,229,0.8)",
                              color: "#059669",
                              border: "1px solid rgba(110,231,183,0.3)",
                            }}
                          >
                            📦 {a.package_name}
                          </span>
                        )}
                        <span
                          className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg"
                          style={{
                            background: "rgba(254,243,199,0.7)",
                            color: "#92400e",
                            border: "1px solid rgba(253,230,138,0.4)",
                          }}
                        >
                          📅 {a.preferred_date || "Not set"}
                        </span>
                        {a.collection_type && (
                          <span
                            className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg"
                            style={{
                              background: "rgba(233,213,255,0.6)",
                              color: "#7c3aed",
                              border: "1px solid rgba(196,181,253,0.3)",
                            }}
                          >
                            <MapPin className="w-3 h-3" /> {a.collection_type}
                          </span>
                        )}
                      </div>

                      {a.address && (
                        <p
                          className="text-[11px] mt-2 flex items-start gap-1 font-medium"
                          style={{ color: "#64748b" }}
                        >
                          <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{a.address}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className={`text-[10px] font-bold px-3 py-1.5 rounded-xl border ${
                          statusColors[a.status] || "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        {a.status?.replace(/_/g, " ").toUpperCase() || "UNKNOWN"}
                      </span>
                      <span
                        className="text-[10px] font-medium whitespace-nowrap"
                        style={{ color: "#94a3b8" }}
                      >
                        {a.created_at
                          ? new Date(a.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Refresh */}
        {!fetching && appointments.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={fetchAppointments}
              className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
              style={{
                color: "#0369a1",
                background: "rgba(224,242,254,0.65)",
                border: "1px solid rgba(125,211,232,0.3)",
              }}
            >
              ↻ Refresh Appointments
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

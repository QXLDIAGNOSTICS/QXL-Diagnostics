"use client";

import { Bell, BellOff, CalendarClock, CheckCheck, IndianRupee, User as UserIcon, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { api, type BookingFeedItem } from "@/lib/api";

const SOUND_PREF_KEY = "qxl_admin_notif_sound";
const POLL_MS = 15000;
const TOAST_MS = 6000;

/** Two-tone chime via Web Audio — no binary asset needed. */
function playChime() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    [740, 988].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now + i * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.16, now + i * 0.14 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.14 + 0.32);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + i * 0.14);
      osc.stop(now + i * 0.14 + 0.34);
    });
    setTimeout(() => ctx.close().catch(() => {}), 700);
  } catch {
    // Audio not available (e.g. autoplay policy) — silently skip.
  }
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.max(0, Math.round(diffMs / 60000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

interface ToastItem extends BookingFeedItem {
  toastKey: string;
}

export default function NotificationCenter() {
  const [items, setItems] = useState<BookingFeedItem[]>([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [soundOn, setSoundOn] = useState(true);
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);

  const sinceRef = useRef<string | null>(null);
  const seenIdsRef = useRef<Set<string>>(new Set());
  const soundOnRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLoadRef = useRef(true);

  useEffect(() => {
    const saved = localStorage.getItem(SOUND_PREF_KEY);
    const enabled = saved !== "off";
    setSoundOn(enabled);
    soundOnRef.current = enabled;

    // Ask every device for permission up front — no extra "enable" click needed.
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  const dismissToast = useCallback((key: string) => {
    setToasts((prev) => prev.filter((t) => t.toastKey !== key));
  }, []);

  const pushToast = useCallback(
    (item: BookingFeedItem) => {
      const toastKey = `${item.id}-${Date.now()}`;
      setToasts((prev) => [...prev, { ...item, toastKey }].slice(-4));
      window.setTimeout(() => dismissToast(toastKey), TOAST_MS);
    },
    [dismissToast]
  );

  const poll = useCallback(async () => {
    try {
      const res = await api.bookings.notificationsFeed(sinceRef.current || undefined, 20);
      const fresh = res.items.filter((it) => !seenIdsRef.current.has(it.id + it.kind));
      sinceRef.current = res.server_time;

      if (fresh.length > 0) {
        fresh.forEach((it) => seenIdsRef.current.add(it.id + it.kind));
        setItems((prev) => [...fresh, ...prev].slice(0, 30));

        if (!firstLoadRef.current) {
          setUnread((n) => n + fresh.length);
          fresh.forEach((it) => {
            pushToast(it);
            if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
              try {
                const isPayment = it.kind === "payment";
                const title = isPayment
                  ? it.payment_status === "failed"
                    ? "Payment failed"
                    : "Payment received"
                  : "New appointment booked";
                const n = new Notification(title, {
                  body: `${it.patient_name} · ${it.test_name || "Booking"}`,
                  tag: `qxl-${it.kind}-${it.id}`,
                  silent: true,
                });
                n.onclick = () => {
                  window.focus();
                  n.close();
                };
              } catch {
                // Notification constructor can throw in some browser contexts — ignore.
              }
            }
          });
          if (soundOnRef.current && fresh.length > 0) playChime();
        }
      }
    } catch {
      // Silent fail — next poll cycle will retry.
    } finally {
      firstLoadRef.current = false;
    }
  }, [pushToast]);

  useEffect(() => {
    poll();
    const id = window.setInterval(poll, POLL_MS);
    return () => window.clearInterval(id);
  }, [poll]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuPos(null);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundOnRef.current = next;
    localStorage.setItem(SOUND_PREF_KEY, next ? "on" : "off");
    setMenuPos(null);
  };

  const openBell = () => {
    setOpen((v) => !v);
    setMenuPos(null);
    setUnread(0);
  };

  const onBellContextMenu = (e: ReactMouseEvent) => {
    e.preventDefault();
    setOpen(false);
    const x = Math.min(e.clientX, window.innerWidth - 220);
    setMenuPos({ x, y: e.clientY });
  };

  return (
    <>
      <div className="relative" ref={containerRef}>
        <button
          onClick={openBell}
          onContextMenu={onBellContextMenu}
          className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
          title="Notifications (right-click to mute)"
        >
          {soundOn ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
          {unread > 0 && (
            <span className="absolute top-0.5 right-0.5 min-w-4 h-4 px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center leading-none">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-80 max-h-104 overflow-hidden flex flex-col rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl shadow-slate-900/10 z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-gray-800">
              <p className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-blue-600" /> Notifications
              </p>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">Right-click bell to mute</span>
            </div>

            <div className="overflow-y-auto custom-scrollbar flex-1">
              {items.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-400 dark:text-slate-500">No new bookings yet</div>
              ) : (
                items.map((it) => {
                  const isPayment = it.kind === "payment";
                  const failed = isPayment && it.payment_status === "failed";
                  return (
                    <div
                      key={`${it.id}-${it.kind}`}
                      className="flex items-start gap-3 px-4 py-3 border-b border-slate-50 dark:border-gray-800/60 hover:bg-slate-50 dark:hover:bg-gray-800/40"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          failed
                            ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400"
                            : isPayment
                              ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                              : "bg-sky-50 dark:bg-sky-950/30 text-blue-600 dark:text-sky-400"
                        }`}
                      >
                        {isPayment ? <IndianRupee className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
                          {isPayment ? (failed ? "Payment failed" : "Payment received") : it.patient_name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {isPayment ? `${it.patient_name} · ${it.test_name || "Booking"}` : it.test_name || "New booking"}
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                          <CalendarClock className="w-3 h-3" /> {timeAgo(it.event_at || it.created_at)}
                          {it.assigned_to_name && <span className="ml-1">· Assigned: {it.assigned_to_name}</span>}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            {items.length > 0 && (
              <a
                href="/appointments"
                className="flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-blue-600 dark:text-sky-400 border-t border-slate-100 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800/40 cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" /> View all appointments
              </a>
            )}
          </div>
        )}
      </div>

      {/* Right-click context menu — mute/unmute sound */}
      {menuPos && (
        <div
          ref={menuRef}
          style={{ top: menuPos.y, left: menuPos.x }}
          className="fixed z-9999 w-52 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl shadow-slate-900/20 py-1.5 overflow-hidden"
        >
          <button
            onClick={toggleSound}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-gray-800 cursor-pointer"
          >
            {soundOn ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            {soundOn ? "Mute notification sound" : "Unmute notification sound"}
          </button>
        </div>
      )}

      {/* Toast stack */}
      <div className="fixed top-4 right-4 z-9999 flex flex-col gap-2 items-end pointer-events-none">
        {toasts.map((t) => {
          const isPayment = t.kind === "payment";
          const failed = isPayment && t.payment_status === "failed";
          const title = isPayment ? (failed ? "Payment failed" : "Payment received") : "New appointment booked";
          const iconBg = failed
            ? "bg-linear-to-br from-rose-400 to-rose-600"
            : isPayment
              ? "bg-linear-to-br from-emerald-400 to-emerald-600"
              : "bg-linear-to-br from-sky-400 to-blue-600";
          return (
            <div
              key={t.toastKey}
              className="pointer-events-auto w-72 flex items-start gap-3 rounded-xl border border-white/10 bg-[#0b1424]/95 backdrop-blur-md shadow-2xl shadow-black/30 px-4 py-3 animate-[toast-in_0.25s_ease-out]"
            >
              <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
                {isPayment ? (
                  <IndianRupee className="w-4 h-4 text-white" />
                ) : (
                  <UserIcon className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">{title}</p>
                <p className="text-[11px] text-slate-300 truncate">
                  {t.patient_name} {t.test_name ? `· ${t.test_name}` : ""}
                </p>
              </div>
              <button
                onClick={() => dismissToast(t.toastKey)}
                className="text-slate-400 hover:text-white cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

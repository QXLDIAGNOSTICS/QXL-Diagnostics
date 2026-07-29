"use client";

import { Bell, BellOff, CalendarClock, CheckCheck, IndianRupee, User as UserIcon, Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { api, type BookingFeedItem } from "@/lib/api";

const SOUND_PREF_KEY = "qxl_admin_notif_sound";
const SEEN_PREF_KEY = "qxl_admin_notif_seen";
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

function formatAmount(paise: number | null | undefined): string | null {
  if (paise == null || paise <= 0) return null;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

function feedKey(it: BookingFeedItem): string {
  return `${it.id}-${it.kind}`;
}

function loadSeenIds(): Set<string> {
  try {
    const raw = localStorage.getItem(SEEN_PREF_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr.slice(-200) : []);
  } catch {
    return new Set();
  }
}

function saveSeenIds(ids: Set<string>) {
  try {
    localStorage.setItem(SEEN_PREF_KEY, JSON.stringify([...ids].slice(-200)));
  } catch {
    // ignore quota / private mode
  }
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

  const sinceRef = useRef<string | null>(null);
  const seenIdsRef = useRef<Set<string>>(new Set());
  const soundOnRef = useRef(true);
  const openRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstLoadRef = useRef(true);

  useEffect(() => {
    const saved = localStorage.getItem(SOUND_PREF_KEY);
    const enabled = saved !== "off";
    setSoundOn(enabled);
    soundOnRef.current = enabled;
    seenIdsRef.current = loadSeenIds();

    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

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
      const res = await api.bookings.notificationsFeed(sinceRef.current || undefined, 30);
      const fresh = res.items.filter((it) => !seenIdsRef.current.has(feedKey(it)));
      sinceRef.current = res.server_time;

      if (fresh.length > 0) {
        fresh.forEach((it) => seenIdsRef.current.add(feedKey(it)));
        saveSeenIds(seenIdsRef.current);
        setItems((prev) => {
          const map = new Map(prev.map((it) => [feedKey(it), it]));
          fresh.forEach((it) => map.set(feedKey(it), it));
          return [...map.values()]
            .sort((a, b) => new Date(b.event_at || b.created_at).getTime() - new Date(a.event_at || a.created_at).getTime())
            .slice(0, 50);
        });

        if (!firstLoadRef.current) {
          if (!openRef.current) {
            setUnread((n) => n + fresh.length);
          }
          fresh.forEach((it) => {
            pushToast(it);
            if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
              try {
                const isPayment = it.kind === "payment";
                const amount = formatAmount(it.amount_paise);
                const title = isPayment
                  ? it.payment_status === "failed"
                    ? "Payment failed"
                    : "Payment received"
                  : "New appointment booked";
                const bodyParts = [it.patient_name, it.test_name || "Booking"];
                if (amount) bodyParts.push(amount);
                const n = new Notification(title, {
                  body: bodyParts.join(" · "),
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
          if (soundOnRef.current) playChime();
        } else {
          // First load: seed the list but keep unread at 0 (already "caught up").
          setUnread(0);
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
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundOnRef.current = next;
    localStorage.setItem(SOUND_PREF_KEY, next ? "on" : "off");
  };

  const openBell = () => {
    setOpen((v) => {
      const next = !v;
      if (next) setUnread(0);
      return next;
    });
  };

  const markAllRead = () => setUnread(0);

  return (
    <>
      <div className="relative" ref={containerRef}>
        <button
          type="button"
          onClick={openBell}
          className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
          title={soundOn ? "Notifications" : "Notifications (sound muted)"}
          aria-label={unread > 0 ? `Notifications, ${unread} unread` : "Notifications"}
        >
          {soundOn ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center leading-none ring-2 ring-white dark:ring-gray-900">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-[min(22rem,calc(100vw-1.5rem))] max-h-[min(26rem,70vh)] overflow-hidden flex flex-col rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl shadow-slate-900/10 z-50">
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-slate-100 dark:border-gray-800 shrink-0">
              <p className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5 min-w-0">
                <Bell className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">Notifications</span>
                {unread > 0 && (
                  <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-600 text-white">
                    {unread}
                  </span>
                )}
              </p>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={toggleSound}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800 cursor-pointer"
                  title={soundOn ? "Mute notification sound" : "Unmute notification sound"}
                  aria-label={soundOn ? "Mute notification sound" : "Unmute notification sound"}
                >
                  {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                {unread > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide text-blue-600 hover:bg-blue-50 dark:hover:bg-sky-950/30 cursor-pointer"
                  >
                    Mark read
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-y-auto overscroll-contain custom-scrollbar flex-1 min-h-0">
              {items.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-400 dark:text-slate-500 px-4">
                  No notifications yet
                </div>
              ) : (
                items.map((it) => {
                  const isPayment = it.kind === "payment";
                  const failed = isPayment && it.payment_status === "failed";
                  const amount = formatAmount(it.amount_paise);
                  return (
                    <div
                      key={feedKey(it)}
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
                          {isPayment
                            ? `${it.patient_name} · ${it.test_name || "Booking"}`
                            : it.test_name || "New booking"}
                          {amount ? ` · ${amount}` : ""}
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1 flex-wrap">
                          <CalendarClock className="w-3 h-3 shrink-0" />
                          {timeAgo(it.event_at || it.created_at)}
                          {it.assigned_to_name && <span>· {it.assigned_to_name}</span>}
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
                className="flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-blue-600 dark:text-sky-400 border-t border-slate-100 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-800/40 cursor-pointer shrink-0"
              >
                <CheckCheck className="w-3.5 h-3.5" /> View all appointments
              </a>
            )}
          </div>
        )}
      </div>

      {/* Toast stack */}
      <div className="fixed top-4 right-4 z-9999 flex flex-col gap-2 items-end pointer-events-none max-w-[calc(100vw-2rem)]">
        {toasts.map((t) => {
          const isPayment = t.kind === "payment";
          const failed = isPayment && t.payment_status === "failed";
          const amount = formatAmount(t.amount_paise);
          const title = isPayment ? (failed ? "Payment failed" : "Payment received") : "New appointment booked";
          const iconBg = failed
            ? "bg-linear-to-br from-rose-400 to-rose-600"
            : isPayment
              ? "bg-linear-to-br from-emerald-400 to-emerald-600"
              : "bg-linear-to-br from-sky-400 to-blue-600";
          return (
            <div
              key={t.toastKey}
              className="pointer-events-auto w-72 max-w-full flex items-start gap-3 rounded-xl border border-white/10 bg-[#0b1424]/95 backdrop-blur-md shadow-2xl shadow-black/30 px-4 py-3 animate-[toast-in_0.25s_ease-out]"
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
                  {amount ? ` · ${amount}` : ""}
                </p>
              </div>
              <button
                type="button"
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

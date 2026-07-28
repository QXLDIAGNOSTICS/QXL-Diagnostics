"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Calendar,
  Loader2,
  Mail,
  MessageSquare,
  Pencil,
  Plus,
  Power,
  Trash2,
  X,
} from "lucide-react";
import {
  api,
  ApiError,
  type AutomationRuleType,
  type MessageTemplateOption,
  type NotificationChannel,
  type NotificationRule,
  type NotificationRuleCreate,
} from "@/lib/api";

const RULE_TYPE_LABELS: Record<AutomationRuleType, string> = {
  payment_reminder: "Payment reminder",
  booking_reminder: "Booking reminder",
  marketing: "Marketing campaign",
};

const RULE_TYPE_HELP: Record<AutomationRuleType, string> = {
  payment_reminder:
    "Automatically nudges any patient with an unpaid/pending booking, repeating every N days until they pay (or the booking is cancelled).",
  booking_reminder:
    "Resends appointment details (test, date, time) to patients with an upcoming, still-active booking — repeats every N days until the visit date.",
  marketing:
    "Broadcasts a message to every patient on file, once every N days — e.g. weekly offers or a monthly check-up reminder.",
};

const INTERVAL_PRESETS = [
  { label: "Daily", days: 1 },
  { label: "Every 3 days", days: 3 },
  { label: "Weekly", days: 7 },
  { label: "Fortnightly", days: 14 },
  { label: "Monthly", days: 30 },
];

const inputCls =
  "w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500";

function emptyForm(): NotificationRuleCreate {
  return {
    name: "",
    rule_type: "payment_reminder",
    channel: "sms",
    interval_days: 7,
    start_date: "",
    end_date: "",
    // Starts paused on purpose — a rule messages EVERY matching patient the
    // moment it's active, so review the wording first and switch it on
    // deliberately rather than as a side effect of saving.
    is_active: false,
    template: "",
    subject: "",
    message: "",
  };
}

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

function formatDateTime(iso?: string | null) {
  if (!iso) return "Never run yet";
  try {
    return new Date(iso).toLocaleString(undefined, {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function AutomationRules({ canManage }: { canManage: boolean }) {
  const [rules, setRules] = useState<NotificationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<NotificationRuleCreate>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [templatesByType, setTemplatesByType] = useState<Record<string, MessageTemplateOption[]>>({});

  useEffect(() => {
    api.notificationRules
      .messageTemplates()
      .then((res) => setTemplatesByType(res as unknown as Record<string, MessageTemplateOption[]>))
      .catch(() => {});
  }, []);

  const applyTemplate = (tpl: MessageTemplateOption) => {
    setForm((f) => ({ ...f, template: tpl.key, subject: tpl.subject_preview, message: tpl.message_preview }));
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.notificationRules.list();
      setRules(res.items);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not load automation rules");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setFormError(null);
    setIsOpen(true);
  };

  const openEdit = (rule: NotificationRule) => {
    setEditingId(rule.id);
    setForm({
      name: rule.name,
      rule_type: rule.rule_type,
      channel: rule.channel,
      interval_days: rule.interval_days,
      start_date: rule.start_date || "",
      end_date: rule.end_date || "",
      is_active: rule.is_active,
      template: rule.template || "",
      subject: rule.subject || "",
      message: rule.message || "",
    });
    setFormError(null);
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setFormError("Give this automation a name");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const payload: NotificationRuleCreate = {
        ...form,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
        template: form.template || null,
        subject: form.subject || null,
        message: form.message || null,
      };
      if (editingId) {
        await api.notificationRules.update(editingId, payload);
      } else {
        await api.notificationRules.create(payload);
      }
      setIsOpen(false);
      await load();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Could not save this automation");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (rule: NotificationRule) => {
    try {
      await api.notificationRules.update(rule.id, { is_active: !rule.is_active });
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not update this automation");
    }
  };

  const handleDelete = async (rule: NotificationRule) => {
    if (!window.confirm(`Delete the "${rule.name}" automation? This cannot be undone.`)) return;
    try {
      await api.notificationRules.remove(rule.id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not delete this automation");
    }
  };

  const channelIcon = (channel: NotificationChannel) => {
    if (channel === "sms") return <MessageSquare className="w-3.5 h-3.5" />;
    if (channel === "email") return <Mail className="w-3.5 h-3.5" />;
    return (
      <span className="inline-flex items-center gap-0.5">
        <MessageSquare className="w-3.5 h-3.5" /> <Mail className="w-3.5 h-3.5" />
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-sky-600" /> Automated reminders &amp; marketing
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Set up recurring SMS/email that run on their own — payment reminders for unpaid bookings, and
              marketing blasts to your patient list. Configure the interval and an optional start/end date;
              turn a rule off anytime without losing its settings.
            </p>
          </div>
          {canManage && (
            <button
              type="button"
              onClick={openCreate}
              className="shrink-0 px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> New automation
            </button>
          )}
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

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 flex justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
          </div>
        ) : rules.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500 dark:text-slate-400">
            No automations configured yet.{" "}
            {canManage ? 'Click "New automation" to set up your first payment reminder or marketing campaign.' : ""}
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {rules.map((rule) => (
              <li key={rule.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{rule.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300">
                      {RULE_TYPE_LABELS[rule.rule_type]}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                        rule.is_active
                          ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                          : "bg-slate-200 dark:bg-gray-800 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {rule.is_active ? "Active" : "Paused"}
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1">{channelIcon(rule.channel)} {rule.channel.toUpperCase()}</span>
                    <span>Every {rule.interval_days} day{rule.interval_days === 1 ? "" : "s"}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {formatDate(rule.start_date)} → {rule.end_date ? formatDate(rule.end_date) : "No end date"}
                    </span>
                    {rule.rule_type === "marketing" && <span>Last run: {formatDateTime(rule.last_run_at)}</span>}
                  </div>
                </div>
                {canManage && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(rule)}
                      title={rule.is_active ? "Pause" : "Activate"}
                      className="p-1.5 text-slate-400 hover:text-sky-700 hover:bg-sky-50 dark:hover:bg-sky-950/30 rounded-lg cursor-pointer"
                    >
                      <Power className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEdit(rule)}
                      title="Edit"
                      className="p-1.5 text-slate-400 hover:text-sky-700 hover:bg-sky-50 dark:hover:bg-sky-950/30 rounded-lg cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(rule)}
                      title="Delete"
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {editingId ? "Edit automation" : "New automation"}
              </h3>
              <button type="button" onClick={() => setIsOpen(false)} className="p-2 text-gray-400 rounded-lg cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {formError && (
                <p className="flex items-start gap-1.5 text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 rounded-lg px-3 py-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {formError}
                </p>
              )}
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">Name</label>
                <input
                  className={inputCls}
                  placeholder="e.g. Unpaid booking follow-up"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">Automation type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(["payment_reminder", "booking_reminder", "marketing"] as AutomationRuleType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      disabled={!!editingId}
                      onClick={() => setForm((f) => ({ ...f, rule_type: t, template: "" }))}
                      className={`px-3 py-2.5 text-xs font-bold rounded-lg cursor-pointer text-left border transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                        form.rule_type === t
                          ? "bg-sky-600 text-white border-sky-600"
                          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {RULE_TYPE_LABELS[t]}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">{RULE_TYPE_HELP[form.rule_type]}</p>
              </div>

              {!!templatesByType[form.rule_type]?.length && (
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                    Message template <span className="font-normal text-slate-400">(pick a starting point, then edit below)</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {templatesByType[form.rule_type].map((tpl) => (
                      <button
                        key={tpl.key}
                        type="button"
                        onClick={() => applyTemplate(tpl)}
                        title={tpl.message_preview}
                        className={`px-2.5 py-1.5 text-[11px] font-bold rounded-full cursor-pointer border ${
                          form.template === tpl.key
                            ? "bg-sky-600 text-white border-sky-600"
                            : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {tpl.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">Channel</label>
                <div className="flex gap-2">
                  {(["sms", "email", "both"] as NotificationChannel[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, channel: c }))}
                      className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg cursor-pointer capitalize ${
                        form.channel === c ? "bg-sky-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">Repeat every</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {INTERVAL_PRESETS.map((p) => (
                    <button
                      key={p.days}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, interval_days: p.days }))}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-full cursor-pointer border ${
                        form.interval_days === p.days
                          ? "bg-sky-600 text-white border-sky-600"
                          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={365}
                    className={inputCls}
                    value={form.interval_days}
                    onChange={(e) => setForm((f) => ({ ...f, interval_days: Number(e.target.value) || 1 }))}
                  />
                  <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">day(s)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">Start date (optional)</label>
                  <input
                    type="date"
                    className={inputCls}
                    value={form.start_date || ""}
                    onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">End date (optional)</label>
                  <input
                    type="date"
                    className={inputCls}
                    value={form.end_date || ""}
                    onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Custom subject <span className="font-normal text-slate-400">(optional — email only)</span>
                </label>
                <input
                  className={inputCls}
                  value={form.subject || ""}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  placeholder="Leave blank to use the default subject"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Custom message <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  className={inputCls}
                  value={form.message || ""}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Leave blank to use the default message for this automation type"
                />
              </div>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                />
                Active
              </label>
              {form.is_active && (
                <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 px-3 py-2 text-[11px] text-amber-800 dark:text-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    This will message{" "}
                    {form.rule_type === "marketing"
                      ? "every patient on file"
                      : form.rule_type === "booking_reminder"
                      ? "every patient with an upcoming, active booking"
                      : "every patient with an unpaid/pending booking"}{" "}
                    on the very next automation check (within ~60s), and again every {form.interval_days || 7}{" "}
                    day(s) after that. Double-check the wording above before saving as Active.
                  </span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-xs font-medium border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer text-slate-600 dark:text-slate-300">
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleSave}
                  className="px-5 py-2 bg-sky-600 text-white text-xs font-bold rounded-lg disabled:opacity-60 inline-flex items-center gap-2 cursor-pointer"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save automation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

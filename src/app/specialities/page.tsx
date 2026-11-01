"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FlaskConical, Plus, Search, Edit2, Trash2, X, Loader2, ExternalLink } from "lucide-react";
import { api, ApiError, type Speciality, type SpecialityWrite } from "@/lib/api";
import ImageUploadField from "@/components/admin/ImageUploadField";

const inputCls =
  "w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500";
const labelCls = "block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1";
const sectionCls = "space-y-4 rounded-xl border border-gray-100 dark:border-gray-800 p-4";
const smallBtn =
  "px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer";

const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);
const paragraphs = (s: string) => s.split(/\n\s*\n/).map((l) => l.trim()).filter(Boolean);
const toInt = (s: string) => (s.trim() === "" || Number.isNaN(Number(s)) ? null : Math.round(Number(s)));

/** Editable copy of a speciality: list fields are plain text so they can sit in textareas. */
interface Form {
  name: string;
  slug: string;
  is_active: boolean;
  sort_order: string;
  card_image_url: string;
  hero_image_url: string;
  hero_title: string;
  hero_description: string;
  intro: string;
  who_should_take: string; // one per line
  profiles: { name: string; tests: string; tat: string; sample: string; price: string; old_price: string }[];
  clinician_notes: string; // paragraphs separated by a blank line
  disclaimer: string;
  callout: { badge: string; note: string; title: string; text: string; link: string; link_label: string };
  why_choose: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  cta_title: string;
  cta_text: string;
  help_title: string;
  help_text: string;
  seo_title: string;
  seo_description: string;
  dir_order: string;
  dir_color: string;
  dir_description: string;
  dir_who: string;
  dir_tests: string; // one per line
  dir_benefits: string; // one per line
  dir_packages: string; // one per line
}

const emptyCallout = { badge: "", note: "", title: "", text: "", link: "", link_label: "" };

const emptyForm = (): Form => ({
  name: "", slug: "", is_active: true, sort_order: "0", card_image_url: "", hero_image_url: "",
  hero_title: "", hero_description: "", intro: "", who_should_take: "", profiles: [], clinician_notes: "",
  disclaimer: "", callout: { ...emptyCallout }, why_choose: [], faqs: [], cta_title: "", cta_text: "",
  help_title: "", help_text: "", seo_title: "", seo_description: "",
  dir_order: "", dir_color: "#2563eb", dir_description: "", dir_who: "", dir_tests: "", dir_benefits: "", dir_packages: "",
});

function toForm(s: Speciality): Form {
  return {
    name: s.name,
    slug: s.slug,
    is_active: s.is_active,
    sort_order: String(s.sort_order),
    card_image_url: s.card_image_url || "",
    hero_image_url: s.hero_image_url || "",
    hero_title: s.hero_title || "",
    hero_description: s.hero_description || "",
    intro: s.intro || "",
    who_should_take: s.who_should_take.join("\n"),
    profiles: s.profiles.map((p) => ({
      name: p.name, tests: p.tests, tat: p.tat, sample: p.sample,
      price: p.price ? String(p.price) : "", old_price: p.old_price ? String(p.old_price) : "",
    })),
    clinician_notes: s.clinician_notes.join("\n\n"),
    disclaimer: s.disclaimer || "",
    callout: s.callout ? { ...s.callout } : { ...emptyCallout },
    why_choose: s.why_choose.map((w) => ({ ...w })),
    faqs: s.faqs.map((f) => ({ ...f })),
    cta_title: s.cta_title || "",
    cta_text: s.cta_text || "",
    help_title: s.help_title || "",
    help_text: s.help_text || "",
    seo_title: s.seo_title || "",
    seo_description: s.seo_description || "",
    dir_order: s.directory?.order != null ? String(s.directory.order) : "",
    dir_color: s.directory?.color || "#2563eb",
    dir_description: s.directory?.description || "",
    dir_who: s.directory?.who_should_take || "",
    dir_tests: (s.directory?.tests || []).join("\n"),
    dir_benefits: (s.directory?.benefits || []).join("\n"),
    dir_packages: (s.directory?.packages || []).join("\n"),
  };
}

function toPayload(f: Form): SpecialityWrite {
  return {
    name: f.name.trim(),
    slug: f.slug.trim() || null,
    is_active: f.is_active,
    sort_order: toInt(f.sort_order) ?? 0,
    card_image_url: f.card_image_url.trim(),
    hero_image_url: f.hero_image_url.trim(),
    hero_title: f.hero_title.trim(),
    hero_description: f.hero_description.trim(),
    intro: f.intro.trim(),
    who_should_take: lines(f.who_should_take),
    profiles: f.profiles
      .filter((p) => p.name.trim())
      .map((p) => ({
        name: p.name.trim(), tests: p.tests.trim(), tat: p.tat.trim(), sample: p.sample.trim(),
        price: toInt(p.price), old_price: toInt(p.old_price),
      })),
    clinician_notes: paragraphs(f.clinician_notes),
    // "" / empty-title mean "none": the API keeps a field when it receives null.
    disclaimer: f.disclaimer.trim(),
    callout: { ...f.callout },
    why_choose: f.why_choose.filter((w) => w.title.trim()),
    faqs: f.faqs.filter((q) => q.q.trim()),
    cta_title: f.cta_title.trim(),
    cta_text: f.cta_text.trim(),
    help_title: f.help_title.trim(),
    help_text: f.help_text.trim(),
    seo_title: f.seo_title.trim(),
    seo_description: f.seo_description.trim(),
    directory: {
      order: toInt(f.dir_order),
      color: f.dir_color || "#2563eb",
      description: f.dir_description.trim(),
      who_should_take: f.dir_who.trim(),
      tests: lines(f.dir_tests),
      benefits: lines(f.dir_benefits),
      packages: lines(f.dir_packages),
    },
  };
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

export default function SpecialitiesAdminPage() {
  const [items, setItems] = useState<Speciality[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Form>(emptyForm());

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((f) => ({ ...f, [key]: value }));

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await api.specialities.adminList(200, 0));
    } catch {
      setError("Failed to load specialities.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm());
    setIsModalOpen(true);
  };

  const openEdit = (s: Speciality) => {
    setEditingId(s.id);
    setForm(toForm(s));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const payload = toPayload(form);
      if (editingId) {
        const { slug: _slug, ...rest } = payload; // the URL slug is fixed once created
        void _slug;
        await api.specialities.update(editingId, rest);
      } else {
        await api.specialities.create(payload);
      }
      setIsModalOpen(false);
      await refreshData();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save the speciality.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (s: Speciality) => {
    if (!confirm(`Delete "${s.name}"? Its page /specialities/${s.slug} will stop working.`)) return;
    try {
      await api.specialities.remove(s.id);
      await refreshData();
    } catch {
      setError("Failed to delete the speciality.");
    }
  };

  const filtered = items.filter(
    (s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.slug.includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            Specialities
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            The clinical speciality pages and the Speciality Tests page on the website. Changes appear on the site within a few minutes.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Speciality
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search specialities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Showing {filtered.length}</div>
        </div>

        {loading ? (
          <div className="p-12 flex items-center justify-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-500">No specialities found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="text-left px-4 py-3">Speciality</th>
                  <th className="text-left px-4 py-3">Page</th>
                  <th className="text-left px-4 py-3">Profiles</th>
                  <th className="text-left px-4 py-3">FAQs</th>
                  <th className="text-left px-4 py-3">Order</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {s.card_image_url && <img src={s.card_image_url} alt="" className="w-9 h-9 object-contain rounded-md bg-sky-50" />}
                        <span className="font-bold text-slate-800 dark:text-white">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      <span className="inline-flex items-center gap-1">/specialities/{s.slug}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{s.profiles.length}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{s.faqs.length}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{s.sort_order}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          s.is_active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {s.is_active ? "LIVE" : "HIDDEN"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 justify-end">
                        <button onClick={() => openEdit(s)} className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-md cursor-pointer" title="Edit">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(s)} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md cursor-pointer" title="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-start justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full my-6 shadow-2xl border border-gray-150 dark:border-gray-800">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 rounded-t-2xl z-10">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                {editingId ? `Edit ${form.name || "Speciality"}` : "Add Speciality"}
                {editingId && (
                  <a href={`${process.env.NEXT_PUBLIC_SITE_URL || "https://qxldiagnostics.com"}/specialities/${form.slug}`} target="_blank" rel="noreferrer" className="text-sky-600 hover:text-sky-700" title="View on website">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-5">
              {/* Basics */}
              <div className={sectionCls}>
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Basics</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Name">
                    <input required className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Cardiology" />
                  </Field>
                  <Field label="Page address" hint={editingId ? "Fixed once created." : "Leave empty to generate it from the name."}>
                    <input className={inputCls} value={form.slug} disabled={!!editingId} onChange={(e) => set("slug", e.target.value)} placeholder="cardiology" />
                  </Field>
                  <Field label="Order on the Specialities page" hint="Lower numbers come first.">
                    <input type="number" className={inputCls} value={form.sort_order} onChange={(e) => set("sort_order", e.target.value)} />
                  </Field>
                  <label className="flex items-center gap-2.5 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer self-end">
                    <input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} className="w-4 h-4 accent-sky-600" />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Show on the website</span>
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ImageUploadField label="Card icon (Specialities page)" value={form.card_image_url} onChange={(v) => set("card_image_url", v)} />
                  <ImageUploadField label="Page banner image" value={form.hero_image_url} onChange={(v) => set("hero_image_url", v)} />
                </div>
              </div>

              {/* Page header */}
              <div className={sectionCls}>
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Page header &amp; introduction</h4>
                <Field label="Headline">
                  <input className={inputCls} value={form.hero_title} onChange={(e) => set("hero_title", e.target.value)} placeholder="Advanced Cardiac Risk & Heart Health Testing in Bengaluru" />
                </Field>
                <Field label="Sub-headline">
                  <textarea rows={2} className={inputCls} value={form.hero_description} onChange={(e) => set("hero_description", e.target.value)} />
                </Field>
                <Field label="Introduction paragraph">
                  <textarea rows={3} className={inputCls} value={form.intro} onChange={(e) => set("intro", e.target.value)} />
                </Field>
                <Field label="Who should take these tests" hint="One point per line.">
                  <textarea rows={5} className={inputCls} value={form.who_should_take} onChange={(e) => set("who_should_take", e.target.value)} />
                </Field>
              </div>

              {/* Test profiles */}
              <div className={sectionCls}>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Test profiles ({form.profiles.length})</h4>
                  <button type="button" className={smallBtn} onClick={() => set("profiles", [...form.profiles, { name: "", tests: "", tat: "", sample: "", price: "", old_price: "" }])}>
                    + Add profile
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 -mt-2">
                  Add a price to show a price and a &quot;Book Now @ ₹…&quot; button; leave it empty for a plain &quot;Book Now&quot; button.
                </p>
                {form.profiles.map((p, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-6 gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/40">
                    <input className={`${inputCls} sm:col-span-4`} placeholder="Profile name" value={p.name} onChange={(e) => set("profiles", form.profiles.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
                    <input className={inputCls} placeholder="Price ₹" value={p.price} onChange={(e) => set("profiles", form.profiles.map((x, j) => (j === i ? { ...x, price: e.target.value } : x)))} />
                    <input className={inputCls} placeholder="MRP ₹" value={p.old_price} onChange={(e) => set("profiles", form.profiles.map((x, j) => (j === i ? { ...x, old_price: e.target.value } : x)))} />
                    <textarea rows={2} className={`${inputCls} sm:col-span-6`} placeholder="Tests included" value={p.tests} onChange={(e) => set("profiles", form.profiles.map((x, j) => (j === i ? { ...x, tests: e.target.value } : x)))} />
                    <input className={`${inputCls} sm:col-span-3`} placeholder="Turnaround (e.g. Same Day)" value={p.tat} onChange={(e) => set("profiles", form.profiles.map((x, j) => (j === i ? { ...x, tat: e.target.value } : x)))} />
                    <input className={`${inputCls} sm:col-span-2`} placeholder="Sample (e.g. Fasting blood)" value={p.sample} onChange={(e) => set("profiles", form.profiles.map((x, j) => (j === i ? { ...x, sample: e.target.value } : x)))} />
                    <button type="button" className="text-xs text-red-600 hover:bg-red-50 rounded-lg cursor-pointer" onClick={() => set("profiles", form.profiles.filter((_, j) => j !== i))}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Clinicians, disclaimer, callout */}
              <div className={sectionCls}>
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">For clinicians, disclaimer &amp; featured card</h4>
                <Field label="For Clinicians text" hint="Separate paragraphs with a blank line. Leave empty to hide the box.">
                  <textarea rows={5} className={inputCls} value={form.clinician_notes} onChange={(e) => set("clinician_notes", e.target.value)} />
                </Field>
                <Field label="Clinical disclaimer" hint="Leave empty for no disclaimer box.">
                  <textarea rows={3} className={inputCls} value={form.disclaimer} onChange={(e) => set("disclaimer", e.target.value)} />
                </Field>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300">Featured card (e.g. a clinical guide) - leave the title empty for none</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input className={inputCls} placeholder="Badge (Featured Clinical Guide)" value={form.callout.badge} onChange={(e) => set("callout", { ...form.callout, badge: e.target.value })} />
                  <input className={inputCls} placeholder="Note (2026 Evidence Review)" value={form.callout.note} onChange={(e) => set("callout", { ...form.callout, note: e.target.value })} />
                  <input className={`${inputCls} sm:col-span-2`} placeholder="Title" value={form.callout.title} onChange={(e) => set("callout", { ...form.callout, title: e.target.value })} />
                  <textarea rows={2} className={`${inputCls} sm:col-span-2`} placeholder="Text" value={form.callout.text} onChange={(e) => set("callout", { ...form.callout, text: e.target.value })} />
                  <input className={inputCls} placeholder="Link (/blog/...)" value={form.callout.link} onChange={(e) => set("callout", { ...form.callout, link: e.target.value })} />
                  <input className={inputCls} placeholder="Button label" value={form.callout.link_label} onChange={(e) => set("callout", { ...form.callout, link_label: e.target.value })} />
                </div>
              </div>

              {/* Why choose */}
              <div className={sectionCls}>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">&quot;Why choose QXL&quot; points ({form.why_choose.length})</h4>
                  <button type="button" className={smallBtn} onClick={() => set("why_choose", [...form.why_choose, { title: "", desc: "" }])}>
                    + Add point
                  </button>
                </div>
                {form.why_choose.map((w, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-3">
                    <input className={inputCls} placeholder="Title" value={w.title} onChange={(e) => set("why_choose", form.why_choose.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
                    <input className={inputCls} placeholder="Description" value={w.desc} onChange={(e) => set("why_choose", form.why_choose.map((x, j) => (j === i ? { ...x, desc: e.target.value } : x)))} />
                    <button type="button" className="text-xs text-red-600 hover:bg-red-50 rounded-lg px-2 cursor-pointer" onClick={() => set("why_choose", form.why_choose.filter((_, j) => j !== i))}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* FAQs */}
              <div className={sectionCls}>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">FAQs ({form.faqs.length})</h4>
                  <button type="button" className={smallBtn} onClick={() => set("faqs", [...form.faqs, { q: "", a: "" }])}>
                    + Add FAQ
                  </button>
                </div>
                {form.faqs.map((f, i) => (
                  <div key={i} className="space-y-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/40">
                    <input className={inputCls} placeholder="Question" value={f.q} onChange={(e) => set("faqs", form.faqs.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))} />
                    <textarea rows={2} className={inputCls} placeholder="Answer" value={f.a} onChange={(e) => set("faqs", form.faqs.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)))} />
                    <button type="button" className="text-xs text-red-600 hover:bg-red-50 rounded-lg px-2 py-1 cursor-pointer" onClick={() => set("faqs", form.faqs.filter((_, j) => j !== i))}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* CTA & sidebar */}
              <div className={sectionCls}>
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Booking banner &amp; sidebar help box</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Booking banner title">
                    <input className={inputCls} value={form.cta_title} onChange={(e) => set("cta_title", e.target.value)} placeholder="Ready to Book Your Cardiac Profile?" />
                  </Field>
                  <Field label="Booking banner text">
                    <input className={inputCls} value={form.cta_text} onChange={(e) => set("cta_text", e.target.value)} />
                  </Field>
                  <Field label="Sidebar help title">
                    <input className={inputCls} value={form.help_title} onChange={(e) => set("help_title", e.target.value)} placeholder="Need help choosing the right test?" />
                  </Field>
                  <Field label="Sidebar help text">
                    <input className={inputCls} value={form.help_text} onChange={(e) => set("help_text", e.target.value)} />
                  </Field>
                </div>
              </div>

              {/* Speciality Tests page */}
              <div className={sectionCls}>
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">&quot;Speciality Tests&quot; page (/speciality-tests)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Position in the tab list" hint="Lower numbers come first. Leave empty to hide this speciality from that page.">
                    <input type="number" className={inputCls} value={form.dir_order} onChange={(e) => set("dir_order", e.target.value)} />
                  </Field>
                  <Field label="Accent colour">
                    <input type="color" className="h-10 w-20 rounded-lg border border-gray-200 cursor-pointer" value={form.dir_color} onChange={(e) => set("dir_color", e.target.value)} />
                  </Field>
                </div>
                <Field label="Description">
                  <textarea rows={3} className={inputCls} value={form.dir_description} onChange={(e) => set("dir_description", e.target.value)} />
                </Field>
                <Field label="Who should take these tests">
                  <textarea rows={3} className={inputCls} value={form.dir_who} onChange={(e) => set("dir_who", e.target.value)} />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field label="Tests offered" hint="One per line.">
                    <textarea rows={8} className={inputCls} value={form.dir_tests} onChange={(e) => set("dir_tests", e.target.value)} />
                  </Field>
                  <Field label="Key benefits" hint="One per line.">
                    <textarea rows={8} className={inputCls} value={form.dir_benefits} onChange={(e) => set("dir_benefits", e.target.value)} />
                  </Field>
                  <Field label="Packages" hint="One per line, e.g. Bone Health Panel ₹1,500.">
                    <textarea rows={8} className={inputCls} value={form.dir_packages} onChange={(e) => set("dir_packages", e.target.value)} />
                  </Field>
                </div>
              </div>

              {/* SEO */}
              <div className={sectionCls}>
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Search engine listing</h4>
                <Field label="Page title">
                  <input className={inputCls} value={form.seo_title} onChange={(e) => set("seo_title", e.target.value)} />
                </Field>
                <Field label="Meta description">
                  <textarea rows={2} className={inputCls} value={form.seo_description} onChange={(e) => set("seo_description", e.target.value)} />
                </Field>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 text-xs font-medium cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="px-5 py-2 bg-sky-600 hover:bg-sky-700 disabled:opacity-60 text-white rounded-lg text-xs font-medium shadow-sm cursor-pointer flex items-center gap-2">
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save Speciality
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

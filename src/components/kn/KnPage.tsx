import Link from "next/link";
import { AlertTriangle, CheckCircle2, ChevronRight, Info, MessageCircle, Phone } from "lucide-react";
import type { KnBlock, KnInline, KnLink, KnPageData, KnSection } from "@/content/kn/types";
import KnCallbackForm from "./KnCallbackForm";

const isExternal = (href: string) => /^(https?:|tel:|mailto:)/.test(href);

function SmartLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  if (isExternal(href)) {
    const blank = href.startsWith("http");
    return (
      <a href={href} className={className} {...(blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

const btnStyles: Record<NonNullable<KnLink["variant"]>, string> = {
  primary: "bg-[#2563eb] text-white hover:bg-blue-700",
  secondary: "bg-white text-[#2563eb] border border-blue-200 hover:bg-blue-50",
  whatsapp: "bg-[#25D366] text-white hover:bg-green-600",
  call: "bg-slate-900 text-white hover:bg-slate-800",
};

export function KnButton({ link }: { link: KnLink }) {
  const v = link.variant ?? "secondary";
  return (
    <SmartLink
      href={link.href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold leading-snug transition-colors ${btnStyles[v]}`}
    >
      {v === "call" && <Phone className="h-4 w-4 shrink-0" aria-hidden />}
      {v === "whatsapp" && <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />}
      <span>{link.label}</span>
    </SmartLink>
  );
}

function Inline({ item }: { item: KnInline }) {
  if (typeof item === "string") return <>{item}</>;
  return (
    <SmartLink href={item.href} className="font-semibold text-[#2563eb] hover:underline">
      {item.text}
    </SmartLink>
  );
}

function Block({ block }: { block: KnBlock }) {
  switch (block.type) {
    case "p":
      return <p className={`leading-relaxed text-slate-700 ${block.strong ? "font-bold text-slate-900" : ""}`}>{block.text}</p>;

    case "bullets":
      return (
        <ul className="space-y-2">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-2 leading-relaxed text-slate-700">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
              <span>
                <Inline item={it} />
              </span>
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((s, i) => (
            <li key={i} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-1 text-slate-800">{s}</span>
            </li>
          ))}
        </ol>
      );

    case "chips":
      return (
        <div className="flex flex-wrap gap-2">
          {block.items.map((c, i) =>
            typeof c === "string" ? (
              <span key={i} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-800">
                {c}
              </span>
            ) : (
              <SmartLink
                key={i}
                href={c.href}
                className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-800 hover:bg-blue-100"
              >
                {c.text}
              </SmartLink>
            ),
          )}
        </div>
      );

    case "buttons":
      return (
        <div className="flex flex-wrap gap-3">
          {block.items.map((l, i) => (
            <KnButton key={i} link={l} />
          ))}
        </div>
      );

    case "kv":
      return (
        <dl className="grid gap-3 sm:grid-cols-2">
          {block.items.map((r, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
              <dt className="text-xs font-bold uppercase tracking-wide text-emerald-700">{r.k}</dt>
              <dd className="mt-1 text-slate-800">{r.v}</dd>
            </div>
          ))}
        </dl>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            {block.caption && <caption className="p-3 text-left text-sm text-slate-500">{block.caption}</caption>}
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                {block.headers.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {block.rows.map((row, i) => (
                <tr key={i} className="align-top">
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row" className="px-4 py-3 font-semibold text-slate-900">
                        {cell}
                      </th>
                    ) : (
                      <td key={j} className="px-4 py-3 text-slate-700">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "faq":
      return (
        <div className="space-y-3">
          {block.items.map((f, i) =>
            f.a ? (
              <details key={i} className="group rounded-xl border border-slate-200 bg-white p-4 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-bold text-slate-900">
                  <span>ಪ್ರ: {f.q}</span>
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-open:rotate-90" aria-hidden />
                </summary>
                <p className="mt-3 leading-relaxed text-slate-700">ಉ: {f.a}</p>
                {block.footer && <p className="mt-3 text-sm text-slate-500">{block.footer}</p>}
              </details>
            ) : (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-900">
                {f.q}
              </div>
            ),
          )}
        </div>
      );

    case "notice": {
      const tone = {
        warning: "border-amber-300 bg-amber-50 text-amber-950",
        info: "border-blue-200 bg-blue-50 text-blue-950",
        success: "border-emerald-200 bg-emerald-50 text-emerald-950",
      }[block.tone];
      const Icon = block.tone === "warning" ? AlertTriangle : block.tone === "success" ? CheckCircle2 : Info;
      return (
        <div className={`rounded-xl border p-5 ${tone}`} role={block.tone === "warning" ? "note" : undefined}>
          <div className="flex gap-3">
            <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <div className="space-y-2">
              {block.title && <p className="font-bold">{block.title}</p>}
              <p className="leading-relaxed">{block.text}</p>
              {block.links && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {block.links.map((l, i) => (
                    <KnButton key={i} link={l} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    case "cards": {
      const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[block.cols ?? 3];
      return (
        <div className={`grid gap-4 ${cols}`}>
          {block.items.map((c, i) => {
            const inner = (
              <>
                {c.badge && (
                  <span className="mb-2 inline-block rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                    {c.badge}
                  </span>
                )}
                <h3 className="text-base font-bold leading-snug text-slate-900">{c.title}</h3>
                {c.body && <p className="mt-2 text-sm leading-relaxed text-slate-700">{c.body}</p>}
                {c.lines && (
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    {c.lines.map((l, j) => (
                      <li key={j}>{l}</li>
                    ))}
                  </ul>
                )}
                {c.kv && (
                  <dl className="mt-3 space-y-1.5 text-sm">
                    {c.kv.map((r, j) => (
                      <div key={j}>
                        <dt className="inline font-semibold text-slate-900">{r.k}: </dt>
                        <dd className="inline text-slate-700">{r.v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {c.cta && (
                  <div className="mt-4">
                    <KnButton link={c.cta} />
                  </div>
                )}
              </>
            );
            return c.href ? (
              <SmartLink key={i} href={c.href} className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md">
                {inner}
              </SmartLink>
            ) : (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5">
                {inner}
              </div>
            );
          })}
        </div>
      );
    }

    case "profiles":
      return (
        <div className="grid gap-4 md:grid-cols-2">
          {block.items.map((p, i) => (
            <article key={i} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                <span className="font-semibold text-slate-900">ಒಳಗೊಂಡಿದೆ: </span>
                {p.includes}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {p.tat && <span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-blue-800">ವರದಿ ಅವಧಿ: {p.tat}</span>}
                {p.sample && <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">ಮಾದರಿ: {p.sample}</span>}
                {p.price && <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-800">ದರ: {p.price}</span>}
              </div>
              <div className="mt-auto pt-4">
                <KnButton link={p.cta ?? { label: "ಈಗಲೇ ಬುಕ್ ಮಾಡಿ", href: "/home-blood-collection-bangalore", variant: "primary" }} />
              </div>
            </article>
          ))}
        </div>
      );

    case "callback":
      return <KnCallbackForm />;
  }
}

function Section({ section }: { section: KnSection }) {
  const bg = { white: "bg-white", muted: "bg-slate-50", blue: "bg-blue-50/60" }[section.tone ?? "white"];
  return (
    <section id={section.id} className={`${bg} py-10 sm:py-14`}>
      <div className="mx-auto max-w-6xl space-y-6 px-4">
        {(section.eyebrow || section.title || section.subtitle) && (
          <header className="max-w-3xl space-y-2">
            {section.eyebrow && <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">{section.eyebrow}</p>}
            {section.title && <h2 className="text-2xl font-extrabold leading-snug text-slate-900 sm:text-3xl">{section.title}</h2>}
            {section.subtitle && <p className="leading-relaxed text-slate-600">{section.subtitle}</p>}
          </header>
        )}
        {section.blocks.map((b, i) => (
          <Block key={i} block={b} />
        ))}
      </div>
    </section>
  );
}

export default function KnPage({ page }: { page: KnPageData }) {
  const { hero } = page;
  return (
    <article>
      <section className="border-b border-blue-100 bg-gradient-to-b from-blue-50 to-white py-10 sm:py-16">
        <div className="mx-auto max-w-6xl space-y-5 px-4">
          {page.breadcrumb && (
            <nav aria-label="ಬ್ರೆಡ್‌ಕ್ರಂಬ್" className="text-sm text-slate-500">
              <ol className="flex flex-wrap items-center gap-1">
                {page.breadcrumb.map((b, i) => (
                  <li key={i} className="flex items-center gap-1">
                    {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden />}
                    {b.href ? (
                      <Link href={b.href} className="hover:text-[#2563eb]">
                        {b.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-slate-700">
                        {b.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {hero.eyebrow && <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">{hero.eyebrow}</p>}
          <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">{hero.title}</h1>
          {hero.subtitle && <p className="max-w-3xl text-lg font-semibold leading-relaxed text-slate-700">{hero.subtitle}</p>}
          {hero.body?.map((t, i) => (
            <p key={i} className="max-w-3xl leading-relaxed text-slate-700">
              {t}
            </p>
          ))}
          {hero.badges && (
            <div className="flex flex-wrap gap-2">
              {hero.badges.map((b) => (
                <span key={b} className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold text-emerald-800">
                  ✓ {b}
                </span>
              ))}
            </div>
          )}
          {hero.stats && (
            <dl className="grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
              {hero.stats.map((s) => (
                <div key={s.k} className="rounded-xl border border-blue-100 bg-white p-3">
                  <dt className="text-xs font-bold text-emerald-700">{s.k}</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">{s.v}</dd>
                </div>
              ))}
            </dl>
          )}
          {hero.ctas && (
            <div className="flex flex-wrap gap-3 pt-2">
              {hero.ctas.map((l, i) => (
                <KnButton key={i} link={l} />
              ))}
            </div>
          )}
        </div>
      </section>
      {page.sections.map((s, i) => (
        <Section key={s.id ?? i} section={s} />
      ))}
    </article>
  );
}

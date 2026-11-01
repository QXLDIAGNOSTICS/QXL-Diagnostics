// One-time extractor: lifts the content that used to be hard-coded in
// qxl-frontend (speciality pages, the founder/consultant team page, the
// canonical package catalogue) into JSON seed files for
// scripts/seed_cms_from_frontend.py.
//
// It parses the *pre-migration* frontend sources, so run it against a checkout
// at or before commit 0e92d02 of the client-side branch (e.g. a worktree).
// The generated files are committed under scripts/seed_data/.
//
// Usage: node scripts/export_frontend_cms.cjs <old-frontend-root> scripts/seed_data <frontend-with-node_modules>
//   e.g. git -C ../qxl-frontend archive 0e92d02 src | tar -x -C /tmp/old && \
//        node scripts/export_frontend_cms.cjs /tmp/old scripts/seed_data ../qxl-frontend
const fs = require("fs");
const path = require("path");
const root = path.resolve(process.argv[2]);
const outDir = path.resolve(process.argv[3]);
const tsRoot = path.resolve(process.argv[4] || process.argv[2]);
const ts = require(path.join(tsRoot, "node_modules/typescript"));
const { SyntaxKind: K } = ts;

fs.mkdirSync(outDir, { recursive: true });
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const parse = (rel) => ts.createSourceFile(rel, read(rel), ts.ScriptTarget.ES2020, true, ts.ScriptKind.TSX);

// ── generic helpers ─────────────────────────────────────────────────────────
const ENTITIES = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'", "&nbsp;": " ", "&rsquo;": "’", "&lsquo;": "‘" };
const decode = (s) => s.replace(/&[a-z]+;/g, (m) => ENTITIES[m] ?? m);

function walk(node, fn) {
  fn(node);
  ts.forEachChild(node, (c) => walk(c, fn));
}

// Evaluate a literal AST node (strings, numbers, arrays, objects). JSX values
// (icons) are dropped.
function lit(node) {
  switch (node.kind) {
    case K.StringLiteral:
    case K.NoSubstitutionTemplateLiteral:
      return node.text;
    case K.NumericLiteral:
      return Number(node.text);
    case K.TrueKeyword:
      return true;
    case K.FalseKeyword:
      return false;
    case K.NullKeyword:
      return null;
    case K.PrefixUnaryExpression:
      return node.operator === K.MinusToken ? -lit(node.operand) : undefined;
    case K.ParenthesizedExpression:
    case K.AsExpression:
      return lit(node.expression);
    case K.ArrayLiteralExpression:
      return node.elements.map(lit);
    case K.ObjectLiteralExpression: {
      const o = {};
      for (const p of node.properties) {
        if (p.kind !== K.PropertyAssignment) continue;
        const key = p.name.text ?? p.name.getText();
        const v = lit(p.initializer);
        if (v !== undefined) o[key] = v;
      }
      return o;
    }
    default:
      return undefined;
  }
}

// Visible text of a JSX element, the way React renders it.
function jsxText(el) {
  let out = "";
  const visit = (n) => {
    if (n.kind === K.JsxText) {
      out += decode(n.text).replace(/\s+/g, " ");
    } else if (n.kind === K.JsxExpression && n.expression) {
      const v = lit(n.expression);
      if (typeof v === "string") out += v;
    } else if (n.kind === K.JsxElement) {
      n.children.forEach(visit);
    }
  };
  (el.children || []).forEach(visit);
  return out.trim().replace(/\s+/g, " ");
}

const tagOf = (el) => (el.openingElement ? el.openingElement.tagName.getText() : el.tagName.getText());
const attrsOf = (el) => (el.openingElement ? el.openingElement.attributes : el.attributes).properties;
function cls(el) {
  const a = attrsOf(el).find((p) => p.name && p.name.getText() === "className");
  if (!a || !a.initializer) return "";
  return a.initializer.kind === K.StringLiteral ? a.initializer.text : a.initializer.getText();
}
const jsxElements = (sf) => {
  const out = [];
  walk(sf, (n) => { if (n.kind === K.JsxElement) out.push(n); });
  return out;
};

// ── specialities ────────────────────────────────────────────────────────────
const SPEC_DIR = "src/app/specialities";
const index = parse(`${SPEC_DIR}/page.tsx`);
const cards = [];
walk(index, (n) => {
  if (n.kind === K.VariableDeclaration && n.name.getText() === "specialities") {
    for (const o of n.initializer.elements) cards.push(lit(o));
  }
});

const imageMap = JSON.parse(fs.readFileSync(path.join(__dirname, "cloudinary_image_map.json"), "utf8"));
const DEAD_HERO_FALLBACKS = {
  "bone-disorders": "/images/banners/bone_joint.png",
  cardiology: "/images/banners/heart_organ.png",
  urology: "/image/slide_liver_kidney.png",
  oncology: "/image/slide_scientist_new.jpg",
};

function extractSpeciality(card, order) {
  const slug = card.href.split("/").pop();
  const dir = `${SPEC_DIR}/${slug}`;
  const sf = parse(`${dir}/SpecialityContent.tsx`);
  const pageSrc = read(`${dir}/page.tsx`);
  const spec = {
    name: card.name,
    slug,
    card_image_url: card.icon,
    sort_order: order,
    is_active: true,
    seo_title: (pageSrc.match(/const TITLE =\s*"([^"]*)"/) || [])[1] || null,
    seo_description: (pageSrc.match(/const DESCRIPTION =\s*\n?\s*"([^"]*)"/) || [])[1] || null,
    who_should_take: [], profiles: [], clinician_notes: [], why_choose: [], faqs: [],
    disclaimer: null, callout: null,
  };

  const els = jsxElements(sf);

  // hero image, title, description
  const heroBg = read(`${dir}/SpecialityContent.tsx`).match(/bg-\[url\('([^']+)'\)\]/);
  spec.hero_image_url = heroBg ? heroBg[1] : null;
  const h1 = els.find((e) => tagOf(e) === "h1");
  spec.hero_title = jsxText(h1);
  const heroP = els.find((e) => tagOf(e) === "p" && cls(e).includes("text-slate-700") && cls(e).includes("md:text-lg"));
  spec.hero_description = jsxText(heroP);

  // intro: first big paragraph inside the main column
  const intro = els.find((e) => tagOf(e) === "p" && cls(e).includes("text-lg leading-relaxed") && cls(e).includes("text-gray-700"));
  spec.intro = jsxText(intro);

  // FAQs (const faqs = [...])
  walk(sf, (n) => {
    if (n.kind === K.VariableDeclaration && n.name.getText() === "faqs") spec.faqs = lit(n.initializer);
  });

  // inline array.map(...) literals
  walk(sf, (n) => {
    if (n.kind !== K.CallExpression || n.expression.kind !== K.PropertyAccessExpression) return;
    if (n.expression.name.text !== "map") return;
    const recv = n.expression.expression;
    if (recv.kind !== K.ArrayLiteralExpression || !recv.elements.length) return;
    const first = recv.elements[0];
    const items = lit(recv);
    if (first.kind === K.StringLiteral) {
      // "Who should take" list (skip the SPECIALITIES sidebar const - that is a variable, not inline)
      spec.who_should_take = items;
    } else if (first.kind === K.ObjectLiteralExpression) {
      const keys = first.properties.map((p) => p.name.getText());
      if (keys.includes("tests")) {
        spec.profiles = items.map((p) => {
          const o = { name: p.name, tests: p.tests, tat: p.tat, sample: p.sample };
          if (p.price !== undefined) o.price = Number(p.price);
          if (p.oldPrice !== undefined) o.old_price = Number(p.oldPrice);
          return o;
        });
      } else if (keys.includes("icon") && keys.includes("title")) {
        spec.why_choose = items.map((w) => ({ title: w.title, desc: w.desc }));
      }
    }
  });

  // "For Clinicians" paragraphs
  const clin = els.find((e) => tagOf(e) === "section" && /For Clinicians/.test(jsxTextDeep(e)));
  if (clin) {
    spec.clinician_notes = clin.children
      .filter((c) => c.kind === K.JsxElement && tagOf(c) === "p")
      .map(jsxText);
  }

  // optional clinical disclaimer (amber callout)
  const disc = els.find((e) => tagOf(e) === "div" && cls(e).includes("bg-amber-50"));
  if (disc) {
    spec.disclaimer = jsxText(disc).replace(/^\S*\s*Clinical Disclaimer:\s*/, "").trim();
    // jsxText drops <strong> children; rebuild from the raw children instead
    let raw = "";
    for (const c of disc.children) {
      if (c.kind === K.JsxText) raw += decode(c.text);
      else if (c.kind === K.JsxElement) raw += jsxText(c);
    }
    raw = raw.replace(/\s+/g, " ").trim().replace(/^\S+\s*Clinical Disclaimer:\s*/, "");
    spec.disclaimer = raw;
  }

  // optional featured callout (women's health clinical-guide card)
  const callout = els.find((e) => tagOf(e) === "div" && cls(e).includes("via-indigo-50"));
  if (callout) {
    const spans = jsxElementsIn(callout).filter((e) => tagOf(e) === "span");
    const h3 = jsxElementsIn(callout).find((e) => tagOf(e) === "h3");
    const p = jsxElementsIn(callout).find((e) => tagOf(e) === "p");
    const a = jsxElementsIn(callout).find((e) => ["Link", "a"].includes(tagOf(e)));
    const href = attrsOf(a).find((x) => x.name.getText() === "href").initializer;
    spec.callout = {
      badge: jsxText(spans[0]),
      note: jsxText(spans[1]),
      title: jsxText(h3),
      text: jsxText(p),
      link: href.kind === K.StringLiteral ? href.text : href.expression.text,
      link_label: jsxText(a).trim(),
    };
  }

  // closing CTA banner
  const cta = els.find((e) => tagOf(e) === "section" && cls(e).includes("bg-gradient-to-r") && cls(e).includes("to-sky-"));
  const ctaH3 = jsxElementsIn(cta).find((e) => tagOf(e) === "h3");
  const ctaP = jsxElementsIn(cta).find((e) => tagOf(e) === "p");
  spec.cta_title = jsxText(ctaH3);
  spec.cta_text = jsxText(ctaP);

  // sidebar "need help?" box (first from-sky-600 gradient div after the main column)
  const help = els.find((e) => tagOf(e) === "div" && cls(e).includes("bg-gradient-to-br") && cls(e).includes("from-sky-600"));
  spec.help_title = jsxText(jsxElementsIn(help).find((e) => tagOf(e) === "h3"));
  spec.help_text = jsxText(jsxElementsIn(help).find((e) => tagOf(e) === "p"));

  // Some Unsplash hero photos have since been deleted (404); use an image the
  // site already has on Cloudinary instead.
  const dead = DEAD_HERO_FALLBACKS[slug];
  if (dead && imageMap[dead]) spec.hero_image_url = imageMap[dead];
  return spec;
}

function jsxTextDeep(el) {
  let out = "";
  walk(el, (n) => { if (n.kind === K.JsxText) out += n.text; });
  return out;
}
function jsxElementsIn(el) {
  const out = [];
  walk(el, (n) => { if (n !== el && n.kind === K.JsxElement) out.push(n); });
  return out;
}

const specialities = cards.map(extractSpeciality);

// The tabbed /speciality-tests page keeps its own copy of each speciality.
const dirPage = parse("src/app/speciality-tests/page.tsx");
walk(dirPage, (n) => {
  if (n.kind === K.VariableDeclaration && n.name.getText() === "specialities") {
    n.initializer.elements.forEach((el, order) => {
      const o = lit(el);
      const spec = specialities.find((s) => s.slug === o.id);
      if (!spec) throw new Error(`speciality-tests: unknown speciality ${o.id}`);
      spec.directory = {
        order, color: o.color, description: o.description, who_should_take: o.whoShouldTake,
        tests: o.tests, benefits: o.benefits, packages: o.packages,
      };
    });
  }
});
fs.writeFileSync(path.join(outDir, "specialities.json"), JSON.stringify(specialities, null, 1));

// ── team (founder + consultants) ────────────────────────────────────────────
const team = [];
walk(parse("src/app/team/page.tsx"), (n) => {
  if (n.kind === K.VariableDeclaration && n.name.getText() === "doctors") n.initializer.elements.forEach((o) => team.push(lit(o)));
});
const reviewers = [];
walk(parse("src/data/doctors.ts"), (n) => {
  if (n.kind === K.VariableDeclaration && n.name.getText() === "DOCTORS") n.initializer.elements.forEach((o) => reviewers.push(lit(o)));
});
// The homepage "Meet Our Team" strip has its own copy: short qualification,
// shorter role and a different founder photo.
const homeTeam = [];
walk(parse("src/app/page.tsx"), (n) => {
  if (n.kind !== K.CallExpression || n.expression.kind !== K.PropertyAccessExpression || n.expression.name.text !== "map") return;
  const recv = n.expression.expression;
  if (recv.kind !== K.ArrayLiteralExpression || !recv.elements.length) return;
  const first = recv.elements[0];
  if (first.kind !== K.ObjectLiteralExpression) return;
  const keys = first.properties.map((p) => p.name.getText());
  if (keys.includes("qual") && keys.includes("role") && keys.includes("slug")) recv.elements.forEach((o) => homeTeam.push(lit(o)));
});
if (homeTeam.length !== team.length) throw new Error(`homepage team has ${homeTeam.length} entries, team page ${team.length}`);

const stripTransform = (u) => (u || "").replace(/\/upload\/[^/]*?(?:f_auto|q_auto)[^/]*\//, "/upload/");
const teamOut = team.map((d, i) => {
  const r = reviewers.find((x) => x.profileUrl === d.slug) || {};
  const h = homeTeam.find((x) => `/${x.slug}` === d.slug);
  if (!h) throw new Error(`no homepage entry for ${d.name}`);
  return {
    name: d.name,
    title: d.role,
    short_title: h.role === d.role ? null : h.role,
    qualification: h.qual,
    card_qualification: d.qualification === h.qual ? null : d.qualification,
    image_url: h.image,
    card_image_url: stripTransform(d.image) === stripTransform(h.image) ? null : d.image,
    image_position: d.imagePosition || h.imagePosition || null,
    profile_path: d.slug,
    is_founder: !!d.isFounder,
    bio: d.description,
    experience: d.experience,
    expertise: d.expertise,
    achievements: d.achievements,
    contribution: d.contribution,
    department: r.department || null,
    registration_number: r.registrationNumber || null,
    sort_order: i,
  };
});
fs.writeFileSync(path.join(outDir, "team.json"), JSON.stringify(teamOut, null, 1));

// ── packages (canonical catalogue) ──────────────────────────────────────────
function load(rel) {
  const out = ts.transpileModule(read(rel), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const mod = { exports: {} };
  new Function("module", "exports", "require", out)(mod, mod.exports, (n) => { throw new Error(`unexpected import ${n}`); });
  return mod.exports;
}
const pk = load("src/lib/packagesCatalogue.ts");
const packages = pk.CANONICAL_PACKAGES.map((p, i) => ({
  id: p.id, slug: p.slug, name: p.name, price: p.price ?? null, mrp: p.mrp ?? null,
  category: p.category || null, tag: p.tag || null, parameters: p.parametersLabel || null,
  includes: p.includes || null, highlights: p.highlights || [], most_booked: !!p.isPopular,
  contact_for_price: !!p.contactForPrice,
  details: {
    parameters_count: p.parametersCount ?? null, fasting_hours: p.fastingHours ?? null, tat: p.tat ?? null,
    sample_type: p.sampleType ?? null, guidance_level: p.guidanceLevel ?? null, may_help_when: p.mayHelpWhen ?? null,
    before_booking: p.beforeBooking ?? null, key_tests: p.keyTests ?? null, guide_number: p.guideNumber ?? null,
    detailed_breakdown: p.detailedBreakdown ?? null, price_display: p.priceDisplay ?? null,
  },
  sort_order: i,
}));
fs.writeFileSync(path.join(outDir, "packages.json"), JSON.stringify(packages, null, 1));

console.log(`specialities ${specialities.length}, team ${teamOut.length}, packages ${packages.length}`);
for (const s of specialities) {
  console.log(`${s.slug.padEnd(20)} who=${s.who_should_take.length} prof=${s.profiles.length} clin=${s.clinician_notes.length} why=${s.why_choose.length} faq=${s.faqs.length}` +
    ` disc=${s.disclaimer ? "y" : "-"} callout=${s.callout ? "y" : "-"} priced=${s.profiles.some((p) => p.price) ? "y" : "-"} hero=${s.hero_image_url ? "y" : "-"} seo=${s.seo_title ? "y" : "-"}/${s.seo_description ? "y" : "-"}`);
}

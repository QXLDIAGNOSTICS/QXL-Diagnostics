// Exports every bookable item (name, price, mrp, ...) from qxl-frontend's
// catalogue sources as JSON, for scripts/sync_catalog_from_frontend.py.
//
// Usage: node scripts/export_frontend_catalog.cjs ../qxl-frontend catalog.json
const fs = require("fs");
const path = require("path");
const root = path.resolve(process.argv[2]);
const ts = require(path.join(root, "node_modules/typescript"));

function load(rel, exportsWanted) {
  let src = fs.readFileSync(path.join(root, rel), "utf8");
  const out = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.Preserve } }).outputText;
  const mod = { exports: {} };
  const req = (name) => { throw new Error(`unexpected import ${name} in ${rel}`); };
  new Function("module", "exports", "require", out)(mod, mod.exports, req);
  return mod.exports;
}

function loadFromBookPage() {
  const src = fs.readFileSync(path.join(root, "src/app/book/page.tsx"), "utf8");
  const grab = (name) => {
    const start = src.indexOf(`const ${name}`);
    const eq = src.indexOf("[", src.indexOf("=", start));
    let depth = 0, i = eq;
    for (; i < src.length; i++) { if (src[i] === "[") depth++; else if (src[i] === "]") { depth--; if (depth === 0) break; } }
    return src.slice(eq, i + 1);
  };
  const spec = grab("SPECIALITY_PACKAGES");
  const init = grab("INITIAL_TESTS").replace("...SPECIALITY_PACKAGES,", "");
  const js = ts.transpileModule(`module.exports = { SPECIALITY_PACKAGES: ${spec}, INITIAL_TESTS: ${init} };`, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} };
  new Function("module", "exports", js)(mod, mod.exports);
  return mod.exports;
}

const items = [];
const push = (source, o) => items.push({ source, ...o });
const master = load("src/lib/masterCatalogue.ts").MASTER_CATALOGUE;
for (const m of master) push("master", { id: m.id, name: m.name, kind: m.kind, category: m.category, price: m.price, mrp: m.mrp, params: m.paramText, fasting: m.fastingInstruction, tat: m.tat, home: m.homeCollectionAvailable, includes: m.includes || null });
const book = loadFromBookPage();
for (const t of [...book.SPECIALITY_PACKAGES, ...book.INITIAL_TESTS]) push("book", { id: t.id, name: t.name, kind: t.params > 1 ? "package" : "test", category: t.cat, price: t.price, mrp: t.mrp, params: t.params ? `${t.params} Parameters` : null, fasting: t.fasting === true ? "Fasting Required" : t.fasting === false ? "No Fasting Required" : null, tat: t.tat, home: true, includes: t.includes || null });
const priceOf = (o) => Number(o.price ?? o.discountedPrice ?? o.offerPrice ?? o.sellingPrice ?? NaN);
for (const [rel, names] of [["src/data/tests.ts", ["TESTS"]], ["src/data/packages.ts", ["PACKAGES"]], ["src/lib/packagesCatalogue.ts", ["PREVENTIVE_PACKAGES", "PATIENT_GUIDE_PACKAGES"]], ["src/lib/testsData.ts", ["topTests"]]]) {
  const mod = load(rel);
  for (const n of names) for (const o of mod[n] || []) {
    const price = priceOf(o);
    if (!o.name || !Number.isFinite(price) || price <= 0) continue;
    push(rel.split("/").pop().replace(/\.ts$/, "") + ":" + n, { id: o.id, name: o.name, kind: rel.includes("ackage") ? "package" : "test", category: o.category || null, price, mrp: Number(o.mrp) || null, params: null, fasting: null, tat: o.tat || o.turnaround || null, home: o.homeCollectionAvailable ?? true, includes: null });
  }
}
fs.writeFileSync(process.argv[3], JSON.stringify(items, null, 1));
console.log("items", items.length);

"""Rebuild src/content/kn/blog/posts.ts from docs/content-packs/kannada-21-blogs (run from repo root: python3 scripts/kn-blogs/build-posts.py)."""
import csv, json, re, sys, os
pack = sys.argv[1] if len(sys.argv) > 1 else "docs/content-packs/kannada-21-blogs"
out = sys.argv[2] if len(sys.argv) > 2 else "src/content/kn/blog/posts.ts"
BOOK = {
  "cbc-test": "/cbc-test", "hba1c-test": "/hba1c-test", "thyroid-profile-test": "/thyroid-test",
  "tsh-test": "/thyroid-test", "vitamin-d-test": "/vitamin-d-test", "vitamin-b12-test": "/vitamin-b12-test",
  "lipid-profile-test": "/lipid-profile-test", "liver-function-test": "/liver-function-test",
  "kidney-function-test": "/kidney-function-test", "creatinine-test": "/kidney-function-test",
  "hiv-test": "/tests/hiv-4th-generation-test",
}
def fix_links(md):
    md = re.sub(r"https://(www\.)?qxldiagnostics\.com(/kn/blog/[a-z0-9-]+)", r"\2", md)
    return md
rows = list(csv.DictReader(open(os.path.join(pack, "SEO-upload-map.csv"), encoding="utf-8-sig")))
posts = []
mdfiles = {f.split("-", 1)[1][:-3]: f for f in os.listdir(os.path.join(pack, "markdown"))}
for r in rows:
    slug = r["Proposed route"].rsplit("/", 1)[1]
    p = {"id": int(r["ID"]), "slug": slug, "enName": r["English test name"], "seoTitle": r["SEO title"],
         "description": r["Meta description"], "keywords": r["Editorial keyword ideas (not meta keywords)"],
         "bookHref": BOOK.get(slug, "/home-blood-collection-bangalore")}
    if slug in mdfiles:
        md = open(os.path.join(pack, "markdown", mdfiles[slug]), encoding="utf-8").read()
        p["markdown"] = fix_links(md).strip()
    posts.append(p)
assert len(posts) == 22, len(posts)
assert sum(1 for p in posts if "markdown" in p) == 21
body = "/* Generated from the QXL Kannada 21-blog developer pack (27 Nov 2026). Do not hand-edit long text here; edit the article and regenerate. */\n"
body += "export type KnBlogPost = { id: number; slug: string; enName: string; seoTitle: string; description: string; keywords: string; bookHref: string; markdown?: string };\n\n"
body += "export const KN_BLOG_POSTS: KnBlogPost[] = " + json.dumps(posts, ensure_ascii=False, indent=1) + ";\n"
open(out, "w", encoding="utf-8").write(body)
print("wrote", len(posts))

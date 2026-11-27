# Kannada medical knowledge hub — 21 articles + pillar guide

Source pack delivered 27 Nov 2026 (see `START-HERE-DEVELOPER.txt` for the original handover).

**In this repo**

- Live routes: `/kn/blog/laboratory-tests-guide` (pillar/index) and `/kn/blog/{slug}` for the 21 articles. `/kn/blog` redirects to the pillar guide.
- Page data: `src/content/kn/blog/posts.ts`, generated from `markdown/` + `SEO-upload-map.csv` by `python3 scripts/kn-blogs/build-posts.py`. Edit the markdown here, then regenerate — don't hand-edit `posts.ts`.
- Rendering: `src/app/kn/blog/[slug]/page.tsx` (Article JSON-LD, self-canonical on `https://qxldiagnostics.com`), `src/components/kn/KnArticle.tsx`.
- Sitemap: listed in `/sitemap-kannada.xml` (registered in `/sitemap.xml`). No hreflang — these articles have no equivalent English article.
- Booking buttons link to the existing English test pages where one exists (CBC, HbA1c, thyroid, vitamin D/B12, lipid, LFT, KFT, HIV 4th gen); other articles link to home collection booking.
- Not imported (duplicates of the markdown): `cms-html/`, `pages/`, `ALL-21-BLOGS.md`, `kannada.css` (styling is done in the component), `sitemap-kannada.xml` (replaced by the dynamic route, non-www host).
- No `datePublished` is set in schema: add the real publication date at deployment.

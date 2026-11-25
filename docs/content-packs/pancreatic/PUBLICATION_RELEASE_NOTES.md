# QXL pancreatic content publication release — 20 November 2026

## Medical approval received

Dr. Shantakumar Muruda, MD (Medical Biochemistry), Senior Consultant and Founder & CEO, QXL Diagnostics, stated that he personally reviewed all nine articles in detail and requested publication-ready deliverables. This authorisation is recorded with **reviewedOn: 2026-11-20** in all nine Next.js page records and Markdown frontmatter. **It is not a claim that the website has been deployed.**

## Exact QXL management-supplied commercial display copy

- **TAT: Same Day** (indicative, test/cut-off confirmation required)
- **Test available at QXL Diagnostics** (confirm individual analyte)
- **Test Details: Contact QXL Diagnostics Super Speciality Lab Bengaluru**
- **Unconfirmed Details: Contact QXL Diagnostics Super Speciality Lab Bengaluru**
- **WhatsApp for Details:** https://wa.me/919964639639?text=Hello%20QXL%20Diagnostics%2C%20please%20share%20the%20test%20details%2C%20sample%20requirements%2C%20current%20price%20and%20confirmed%20turnaround%20time%20for%20pancreatic%20or%20gastrointestinal%20laboratory%20tests.

The click-to-chat link is configured with QXL's existing contact number **+91 99646 39639**. A website administrator must verify this number has an active WhatsApp account. If a separate QXL WhatsApp Business number is used, update all generated links before public launch.

## Important operational boundaries

The medically reviewed patient articles are ready for technical deployment, but the five clinician-directed package definitions are **not enabled for ecommerce** (`bookingEnabled: false`). Package price, per-test LIS codes, actual availability, test-specific method/specimen and validated TAT are not established by this document. Faecal elastase and H. pylori stool antigen in particular should **not** be promised a firm same-day result without verified laboratory workflow. Individual assay TAT may extend beyond same day. Some medical symptoms require urgent imaging or emergency intervention; do not divert patients to WhatsApp or home collection.

## Release checklist for developer

1. Verify WhatsApp on +91 99646 39639; edit links if QXL's designated WhatsApp Business account differs.
2. Integrate routes into existing GitHub / Vercel website without overwriting current pages.
3. Inspect live duplicate routes, canonicals, article body and FAQ schema, structured reviewer attribution.
4. If the first actual public deployment is after 20 November 2026, update `publicationDate` and `published_on` to that actual date across Next.js content JSON, SEO JSON and Markdown frontmatter.
5. Ensure the existing blog index, internal links, XML sitemap and mobile layouts include all nine pages.
6. Check sample cut-offs, price, collection methods and referral/escalation instructions and enable package booking only after full QA sign-off.

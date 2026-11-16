Copy the existing routes into the current Next.js App Router.
If /sexual-health/symptoms already exists: merge its content manually instead of overwriting.
If Next.js project is without src/ strip src/ from all paths.
For route params, code targets Next.js 15+ Promise-based params. In Next 14 you may use synchronous params or await an object.
Production symptom pages return 404 unless QXL_SYMPTOM_CONTENT_APPROVED=true, then have index/follow metadata. Set flag ONLY after real sign-off.
The package catalogue and existing sexual health hub are not included or overwritten in this expansion.

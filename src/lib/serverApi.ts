// Server-side data fetching for the QXL backend.
//
// Unlike `api.ts` (which uses relative `/api/v1/...` URLs that only resolve
// inside the browser via the Next.js rewrite proxy), Server Components,
// `generateMetadata`, and `sitemap.ts` run outside of any HTTP request
// context and need an absolute URL. We talk directly to the FastAPI backend
// using the same `BACKEND_INTERNAL_URL` env var the rewrite proxy uses.
//
// All helpers fail soft (return null / empty array) instead of throwing so
// that a backend outage never breaks the build or takes down a page/sitemap.

import type { Doctor, Center, ReviewItem, BlogPost, Speciality, HealthPackage } from "./api";

const isDev = process.env.NODE_ENV !== "production";
const BACKEND_URL =
  process.env.BACKEND_INTERNAL_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (isDev ? "http://localhost:8000" : "https://qxl-diagnostics-production.up.railway.app");

async function serverGet<T>(path: string, revalidate = 3600): Promise<T | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1${path}`, {
      // Revalidate hourly so new CMS content (doctors, centers, reviews)
      // shows up without a full redeploy.
      next: { revalidate },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export const serverApi = {
  specialities: {
    list: async (): Promise<Speciality[]> => (await serverGet<Speciality[]>("/specialities", 300)) ?? [],
    get: (slug: string) => serverGet<Speciality>(`/specialities/${encodeURIComponent(slug)}`),
  },
  packages: {
    list: async (): Promise<HealthPackage[]> => (await serverGet<HealthPackage[]>("/packages", 300)) ?? [],
  },
  doctors: {
    list: async (): Promise<Doctor[]> => (await serverGet<Doctor[]>("/doctors", 300)) ?? [],
    get: (slug: string) => serverGet<Doctor>(`/doctors/${encodeURIComponent(slug)}`),
  },
  centers: {
    list: async (): Promise<Center[]> => (await serverGet<Center[]>("/centers")) ?? [],
    get: (slug: string) => serverGet<Center>(`/centers/${encodeURIComponent(slug)}`),
  },
  reviews: {
    list: async (limit = 20): Promise<{ items: ReviewItem[]; count: number }> =>
      (await serverGet<{ items: ReviewItem[]; count: number }>(`/reviews?limit=${limit}`)) ?? {
        items: [],
        count: 0,
      },
  },
  blog: {
    list: async (limit = 100): Promise<{ items: BlogPost[]; count: number }> =>
      (await serverGet<{ items: BlogPost[]; count: number }>(`/blog?limit=${limit}`)) ?? {
        items: [],
        count: 0,
      },
  },
};

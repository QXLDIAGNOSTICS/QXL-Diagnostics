import { serverApi } from "@/lib/serverApi";
import type { Speciality } from "@/lib/api";
import fallbackSpecialities from "@/data/specialitiesFallback.json";
import SpecialitiesGrid from "./SpecialitiesGrid";

export const revalidate = 300;

export default async function SpecialitiesPage() {
  const live = await serverApi.specialities.list();
  const specialities = live.length > 0 ? live : (fallbackSpecialities as unknown as Speciality[]);

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <section
        className="relative overflow-hidden py-12 border-b border-sky-100"
        style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 55%, #eff6ff 100%)' }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-10 right-20 w-64 h-64 rounded-full bg-sky-300/25 blur-3xl" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0c4a6e] mb-3 tracking-tight">Our Clinical Specialities</h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl font-medium">
            Discover specialized laboratory diagnostic tests, panels, and clinical profiles tailored to distinct medical disciplines.
          </p>
          <div className="w-16 h-1 bg-[#0284c7] rounded-full mt-4" />
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          <SpecialitiesGrid specialities={specialities} />
        </div>
      </section>
    </div>
  );
}

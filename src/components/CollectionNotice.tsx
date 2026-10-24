"use client";

import React from "react";
import type { DiagnosticTest } from "@/types/catalogue";
import { AlertTriangle, Home, Building2 } from "lucide-react";

export function CollectionNotice({
  test
}: {
  test: DiagnosticTest;
}) {
  const home = test.specimenOptions.filter(
    s =>
      s.collectionMode === "home_blood" ||
      s.collectionMode === "home_urine" ||
      s.collectionMode === "home_swab"
  );

  const procedure = test.specimenOptions.filter(
    s => s.collectionMode === "hospital_procedure"
  );

  if (home.length && procedure.length) {
    return (
      <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs space-y-1.5 text-amber-900" role="note">
        <div className="flex items-center gap-1.5 font-bold text-amber-950">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Collection requirements vary by specimen:</span>
        </div>
        <div className="space-y-1 pl-5">
          {home.map(item => (
            <p key={item.specimen} className="text-amber-800">
              <span className="font-semibold">{item.specimen}:</span> Home blood collection may be available.
            </p>
          ))}
          {procedure.map(item => (
            <p key={item.specimen} className="text-amber-900 font-medium">
              <span className="font-semibold">{item.specimen}:</span> Specialist procedural collection required under clinical supervision ({item.note || "hospital procedure"}).
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (procedure.length) {
    return (
      <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 font-medium flex items-start gap-2" role="alert">
        <Building2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold text-rose-950">Specialist specimen collection required.</strong>
          This investigation requires a specialised procedural sample (e.g. CSF, bone marrow, or biopsy) collected under clinical supervision in a hospital setting. Please contact QXL before booking.
        </div>
      </div>
    );
  }

  return (
    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
      <Home className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
      <span>Hygienic doorstep sample collection available across Bengaluru.</span>
    </div>
  );
}

export default CollectionNotice;

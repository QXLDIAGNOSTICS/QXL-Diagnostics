"use client";

import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef, useState } from "react";
import type * as Leaflet from "leaflet";
import type { Collector, LiveJob } from "@/lib/collectApi";

// OpenStreetMap tiles. The public OSM tile server has a fair-use policy that
// does not allow heavy production traffic — set NEXT_PUBLIC_MAP_TILE_URL to a
// paid or self-hosted provider before go-live (same as the mobile apps).
const TILE_URL = process.env.NEXT_PUBLIC_MAP_TILE_URL || "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION = process.env.NEXT_PUBLIC_MAP_ATTRIBUTION || "&copy; OpenStreetMap contributors";
const BENGALURU: [number, number] = [12.9716, 77.5946];

export type FocusTarget = { lat: number; lng: number } | null;

/** Collector positions (navy) and visit destinations (gold; red when delayed). */
export default function LiveMap({
  jobs,
  collectors,
  focus,
}: {
  jobs: LiveJob[];
  collectors: Collector[];
  focus: FocusTarget;
}) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<Leaflet.Map | null>(null);
  const layer = useRef<Leaflet.LayerGroup | null>(null);
  const lib = useRef<typeof Leaflet | null>(null);
  const fitted = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !el.current || map.current) return;
      lib.current = L;
      map.current = L.map(el.current, { center: BENGALURU, zoom: 12 });
      L.tileLayer(TILE_URL, { attribution: ATTRIBUTION, maxZoom: 19 }).addTo(map.current);
      layer.current = L.layerGroup().addTo(map.current);
      setReady(true);
    })();
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
      layer.current = null;
    };
  }, []);

  useEffect(() => {
    if (!ready || !lib.current || !layer.current || !map.current) return;
    const fit = drawLayers(lib.current, layer.current, jobs, collectors);
    if (!fitted.current && fit) {
      fitted.current = true;
      map.current.fitBounds(fit, { padding: [40, 40], maxZoom: 15 });
    }
  }, [ready, jobs, collectors]);

  useEffect(() => {
    if (focus && map.current) map.current.setView([focus.lat, focus.lng], 15);
  }, [focus]);

  return <div ref={el} className="h-[520px] w-full overflow-hidden rounded-xl border border-slate-200 dark:border-gray-800" />;
}

/** Redraws every marker; returns the bounds of what was drawn, if anything. */
function drawLayers(L: typeof Leaflet, layer: Leaflet.LayerGroup, jobs: LiveJob[], collectors: Collector[]) {
  layer.clearLayers();
  const points: [number, number][] = [];

  for (const j of jobs) {
    if (j.destination.lat == null || j.destination.lng == null) continue;
    const p: [number, number] = [j.destination.lat, j.destination.lng];
    points.push(p);
    L.circleMarker(p, {
      radius: 8,
      color: j.is_delayed ? "#b91c1c" : "#8a5d00",
      weight: 2,
      fillColor: j.is_delayed ? "#ef4444" : "#D69A18",
      fillOpacity: 0.9,
    })
      .bindTooltip(`${j.visit_reference} · ${j.slot_label} · ${j.status.replace(/_/g, " ")}`)
      .addTo(layer);
    if (j.location) {
      L.polyline([[j.location.lat, j.location.lng], p], { color: "#182A5C", weight: 2, dashArray: "4 6", opacity: 0.6 }).addTo(layer);
    }
  }

  for (const c of collectors) {
    if (!c.last_location) continue;
    const p: [number, number] = [c.last_location.lat, c.last_location.lng];
    points.push(p);
    L.circleMarker(p, { radius: 9, color: "#ffffff", weight: 3, fillColor: "#182A5C", fillOpacity: 1 })
      .bindTooltip(`${c.display_name} · ${new Date(c.last_location.at).toLocaleTimeString("en-IN", { timeStyle: "short" })}`)
      .addTo(layer);
  }

  return points.length ? L.latLngBounds(points) : null;
}

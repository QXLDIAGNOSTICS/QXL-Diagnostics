"use client";
import { useEffect, useMemo, useState } from "react";
import { api } from "./api";

/**
 * Reconciles a list of bundled test/package entries with the backend catalog
 * (managed in the admin panel): entries the backend doesn't offer are dropped,
 * and prices follow the backend. Until the backend answers - or if it can't be
 * reached - the bundled list is returned unchanged.
 */
export function useBackendCatalog<T extends { name: string; price: number; mrp?: number }>(items: T[]): T[] {
  const [live, setLive] = useState<Map<string, number> | null>(null);

  useEffect(() => {
    let cancelled = false;
    const names = Array.from(new Set(items.map((i) => i.name)));
    const chunks: string[][] = [];
    for (let i = 0; i < names.length; i += 500) chunks.push(names.slice(i, i + 500));
    Promise.all(chunks.map((c) => api.catalog.resolve(c)))
      .then((responses) => {
        if (cancelled) return;
        const byName = new Map<string, number>();
        responses.flatMap((r) => r.results).forEach((match, i) => {
          if (match) byName.set(names[i], match.price ?? 0);
        });
        setLive(byName);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [items]);

  return useMemo(() => {
    if (!live) return items;
    return items
      .filter((i) => live.has(i.name))
      .map((i) => {
        const price = live.get(i.name);
        return price && price !== i.price ? { ...i, price, mrp: Math.max(i.mrp ?? price, price) } : i;
      });
  }, [items, live]);
}

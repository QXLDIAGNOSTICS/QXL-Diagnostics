"use client";

import { useEffect } from "react";

export default function WebVitalsReporter() {
  useEffect(() => {
    // Dynamically load web-vitals in browser environment
    import("web-vitals").then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
      function sendMetric(metric: { name: string; value: number; rating: string; id: string }) {
        const body = JSON.stringify({
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          id: metric.id,
          page: window.location.pathname,
          timestamp: Date.now()
        });

        if (navigator.sendBeacon) {
          navigator.sendBeacon("/api/web-vitals", body);
        } else {
          fetch("/api/web-vitals", {
            body,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            keepalive: true
          }).catch(() => {});
        }
      }

      onCLS(sendMetric);
      onINP(sendMetric);
      onLCP(sendMetric);
      onFCP(sendMetric);
      onTTFB(sendMetric);
    }).catch(() => {
      // web-vitals not loaded or unavailable
    });
  }, []);

  return null;
}

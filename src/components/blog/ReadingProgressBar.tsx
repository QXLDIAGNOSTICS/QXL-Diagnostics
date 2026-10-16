"use client";

import React, { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (windowHeight === 0) return setCompletion(0);

      const currentPercent = (totalScroll / windowHeight) * 100;
      setCompletion(Math.min(100, Math.max(0, currentPercent)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-transparent pointer-events-none"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(completion)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-100 ease-out shadow-[0_0_8px_rgba(37,99,235,0.5)]"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}

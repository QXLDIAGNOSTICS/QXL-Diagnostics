"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamCarouselProps<T> {
  items: T[];
  renderItem: (item: T, idx: number) => React.ReactNode;
  ariaLabel?: string;
  /** Extra classes for the arrow buttons (e.g. smaller on mobile). */
  arrowClassName?: string;
}

/**
 * Horizontally-scrolling carousel with left/right arrow controls that
 * appear only when there's more to scroll to. Works for any number of
 * team members — as the roster grows, cards just keep scrolling instead
 * of forcing an ever-taller grid.
 */
export default function TeamCarousel<T>({
  items,
  renderItem,
  ariaLabel = 'Team members carousel',
  arrowClassName = '',
}: TeamCarouselProps<T>) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateArrows, items.length]);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 600) * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="relative" role="region" aria-label={ariaLabel}>
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          aria-label="Scroll team left"
          className={`absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-lg border border-gray-150 flex items-center justify-center text-[#0f2d5e] hover:bg-blue-50 hover:scale-105 transition-all ${arrowClassName || 'w-9 h-9 sm:w-11 sm:h-11'}`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto gap-5 sm:gap-6 scrollbar-none pb-2 snap-x snap-mandatory scroll-smooth"
      >
        {items.map((item, idx) => (
          <div key={idx} className="snap-start shrink-0">
            {renderItem(item, idx)}
          </div>
        ))}
      </div>
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          aria-label="Scroll team right"
          className={`absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-lg border border-gray-150 flex items-center justify-center text-[#0f2d5e] hover:bg-blue-50 hover:scale-105 transition-all ${arrowClassName || 'w-9 h-9 sm:w-11 sm:h-11'}`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

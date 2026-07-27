"use client";
import React, { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { api, type ReviewItem } from "../lib/api";

export default function ReviewsSection({ decorativeHeading = false }: { decorativeHeading?: boolean }) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const Heading = decorativeHeading ? 'p' : 'h2';

  useEffect(() => {
    // If we wanted to load from API, we'd do it here, but for now we use static data
    setReviews([
      {
        id: 'r1',
        author_name: 'Afinand',
        rating: 4,
        content: 'Good Service..',
        source: 'Patient',
        created_at: new Date().toISOString()
      },
      {
        id: 'r2',
        author_name: 'Ananth Raman',
        rating: 5,
        content: 'QXL team was very fast. Blood collector arrived on time in the morning. Electronic reports came by evening.',
        source: 'Website',
        created_at: new Date().toISOString()
      },
      {
        id: 'r3',
        author_name: 'Preeti Sharma',
        rating: 5,
        content: 'Best diagnostic center in Bangalore. Extremely professional setup and NABL standard test precision.',
        source: 'Google',
        created_at: new Date().toISOString()
      },
      {
        id: 'r4',
        author_name: 'Ramesh Kumar',
        rating: 5,
        content: 'Very smooth process for home collection. Reports were delivered to my WhatsApp on the same day. Happy with the service.',
        source: 'Google',
        created_at: new Date().toISOString()
      },
      {
        id: 'r5',
        author_name: 'Priya M',
        rating: 5,
        content: 'Neat and clean facility. Staff is polite and helpful. Highly recommended for full body checkups.',
        source: 'Google',
        created_at: new Date().toISOString()
      }
    ]);
  }, []);

  if (reviews.length === 0) return null;

  const avgRating = 4.8;
  const reviewCount = 5;

  // Render individual Review + AggregateRating schema matching the
  // testimonials actually shown below, for rich-result eligibility.
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "QXL Diagnostics",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: 5,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author_name },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.content,
    })),
  };

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <div className="max-w-[1260px] mx-auto px-4 w-full">
        <div className="text-center mb-10">
          <span className="inline-block bg-blue-50 text-[#2563eb] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-2">
            Patient Reviews
          </span>
          <Heading className="text-[#0f2d5e] text-3xl font-extrabold mb-3">What Our Patients Say</Heading>
          <div className="flex items-center justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i <= Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-slate-500 text-sm font-semibold ml-2">
              4.7 out of 5 (3 reviews)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div key={r.id} className="bg-[#f8faff] rounded-2xl border border-gray-100 p-6 relative">
              <Quote className="w-6 h-6 text-blue-200 absolute top-5 right-5" />
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i <= r.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">&ldquo;{r.content}&rdquo;</p>
              <p className="font-extrabold text-[#0f2d5e] text-sm">{r.author_name}</p>
              {r.source && <p className="text-slate-600 text-xs">via {r.source}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

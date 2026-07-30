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
      },
      {
        id: 'r6',
        author_name: 'Vikram Reddy',
        rating: 5,
        content: 'I booked the Q-Master Health Pro package for my parents. The phlebotomist was very patient and skilled. Excellent experience.',
        source: 'Website',
        created_at: new Date().toISOString()
      },
      {
        id: 'r7',
        author_name: 'Meenakshi Iyer',
        rating: 4,
        content: 'Reliable reports and good customer support. They answered all my queries regarding the diabetes package clearly.',
        source: 'Google',
        created_at: new Date().toISOString()
      },
      {
        id: 'r8',
        author_name: 'Karthik Shenoy',
        rating: 5,
        content: 'Zero pain during blood draw! The staff is highly trained. Prices are also very reasonable for the quality they provide.',
        source: 'Patient',
        created_at: new Date().toISOString()
      },
      {
        id: 'r9',
        author_name: 'Neha Gupta',
        rating: 5,
        content: 'Got my thyroid tests done here. Accurate results and very clean lab environment at their Bangalore center.',
        source: 'Google',
        created_at: new Date().toISOString()
      },
      {
        id: 'r10',
        author_name: 'Suresh Patil',
        rating: 5,
        content: 'Quick scheduling and prompt report delivery. The UI for booking on the website is also very user friendly.',
        source: 'Website',
        created_at: new Date().toISOString()
      },
      {
        id: 'r11',
        author_name: 'Lakshmi Nair',
        rating: 4,
        content: 'Very satisfied with the home collection service. The technician maintained proper hygiene and used sterile equipment.',
        source: 'Patient',
        created_at: new Date().toISOString()
      },
      {
        id: 'r12',
        author_name: 'Arjun Desai',
        rating: 5,
        content: 'One of the most trusted labs in the city. Their NABL accreditation gives me confidence in their reports. Will visit again.',
        source: 'Google',
        created_at: new Date().toISOString()
      },
      {
        id: 'r13',
        author_name: 'Rajesh Pillai',
        rating: 5,
        content: 'Very professional phlebotomist. Home collection process was super easy. Reports sent on WhatsApp right on time.',
        source: 'Google',
        created_at: new Date().toISOString()
      },
      {
        id: 'r14',
        author_name: 'Sunitha Krishnan',
        rating: 5,
        content: 'Excellent service. NABL certification makes them highly reliable. The Bangalore center is very clean and well maintained.',
        source: 'Google',
        created_at: new Date().toISOString()
      },
      {
        id: 'r15',
        author_name: 'Amit Verma',
        rating: 5,
        content: 'Highly recommend QXL Diagnostics. The staff is polite, blood collection was completely painless, and prices are fair.',
        source: 'Google',
        created_at: new Date().toISOString()
      },
      {
        id: 'r16',
        author_name: 'Deepa Ravindran',
        rating: 4,
        content: 'Easy to book through their website. Standard full body checkup packages are reasonably priced. Fast turnaround time.',
        source: 'Google',
        created_at: new Date().toISOString()
      },
      {
        id: 'r17',
        author_name: 'Vijay Raghavan',
        rating: 5,
        content: 'Professional team. Booking home collection for my elderly grandparents was seamless. Reports delivered by evening.',
        source: 'Google',
        created_at: new Date().toISOString()
      },
      {
        id: 'r18',
        author_name: 'Shalini Hegde',
        rating: 5,
        content: 'Clean lab, polite desk staff, and quick tests. They are NABL accredited, which gives peace of mind. Very efficient.',
        source: 'Google',
        created_at: new Date().toISOString()
      },
      {
        id: 'r19',
        author_name: 'Manoj Gowda',
        rating: 5,
        content: 'Prompt and reliable. The blood collector was extremely skilled. No bruising or pain whatsoever. Kudos to the team.',
        source: 'Google',
        created_at: new Date().toISOString()
      },
      {
        id: 'r20',
        author_name: 'Ananya Rao',
        rating: 5,
        content: 'Got my allergy tests done. Simple booking, detailed reports, and excellent response from their support team.',
        source: 'Google',
        created_at: new Date().toISOString()
      },
      {
        id: 'r21',
        author_name: 'Sandeep Mehta',
        rating: 4,
        content: 'Superb experience with QXL home collection. Clean, sterile, and punctual. Reports received on WhatsApp within hours.',
        source: 'Google',
        created_at: new Date().toISOString()
      },
      {
        id: 'r22',
        author_name: 'Geetha Balaji',
        rating: 5,
        content: 'Best experience with diagnostic services so far. Professional, fast, and excellent pricing on health packages.',
        source: 'Google',
        created_at: new Date().toISOString()
      }
    ].map(r => ({
      is_published: true,
      sort_order: 0,
      ...r
    })));
  }, []);

  if (reviews.length === 0) return null;

  const avgRating = 4.8;
  const reviewCount = 22;

  // Render individual Review + AggregateRating schema matching the
  // testimonials actually shown below, for rich-result eligibility.
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "QXL Diagnostics",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: 22,
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
              4.9 out of 5
            </span>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes slide-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: slide-left 90s linear infinite;
          }
          .marquee-container:hover .animate-marquee {
            animation-play-state: paused;
          }
        `}} />
        
        <div className="flex overflow-hidden marquee-container w-full relative py-2">
          {/* Fading Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Single track: original + duplicate side-by-side for seamless loop */}
          <div className="flex gap-5 animate-marquee" style={{ width: 'max-content' }}>
            {[...reviews, ...reviews].map((r, idx) => (
              <div key={`${r.id}-${idx}`} className="w-[300px] sm:w-[350px] bg-[#f8faff] rounded-2xl border border-gray-100 p-6 relative flex-shrink-0 whitespace-normal hover:shadow-md transition-shadow">
                <Quote className="w-6 h-6 text-blue-200 absolute top-5 right-5" />
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i <= r.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-slate-600 text-[13px] sm:text-sm leading-relaxed mb-4">&ldquo;{r.content}&rdquo;</p>
                <div className="mt-auto">
                  <p className="font-extrabold text-[#0f2d5e] text-sm">{r.author_name}</p>
                  {r.source && <p className="text-slate-600 text-xs mt-0.5">via {r.source}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Hidden — replaced by inline duplicate above */}
          <div className="hidden" aria-hidden="true">
            {null /* content moved to combined array above */}
          </div>
        </div>
      </div>
    </section>
  );
}

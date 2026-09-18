import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";

export function MediaCoverageSection() {
  const mediaLogos = [
    {
      name: "Business Standard",
      logo: "/images/media/business-standard.svg",
      url: "https://www.business-standard.com/content/press-releases-ani/qxl-diagnostics-targets-60-hospital-laboratory-partnerships-by-2028-126091600351_1.html",
      ariaLabel: "Read QXL Diagnostics coverage in Business Standard",
      width: 180,
      height: 50,
    },
    {
      name: "The Hindu",
      logo: "/images/media/the-hindu.svg",
      url: "https://www.thehindu.com/brandhub/pr-release/qxl-diagnostics-targets-60-hospital-laboratory-partnerships-by-2028/article71471156.ece",
      ariaLabel: "Read QXL Diagnostics coverage in The Hindu",
      width: 180,
      height: 50,
    },
    {
      name: "The Hindu BusinessLine",
      logo: "/images/media/businessline.svg",
      url: "https://www.thehindubusinessline.com/brandhub/pr-release/qxl-diagnostics-targets-60-hospital-laboratory-partnerships-by-2028/article71471158.ece",
      ariaLabel: "Read QXL Diagnostics coverage in The Hindu BusinessLine",
      width: 180,
      height: 50,
    },
    {
      name: "News18",
      logo: "/images/media/news18.svg",
      url: "https://www.news18.com/amp/agency-feeds/qxl-diagnostics-targets-60-hospital-laboratory-partnerships-by-2028-10333227.html",
      ariaLabel: "Read QXL Diagnostics coverage on News18",
      width: 150,
      height: 50,
    },
    {
      name: "The Tribune",
      logo: "/images/media/the-tribune.svg",
      url: "https://www.tribuneindia.com/news/business/qxl-diagnostics-targets-60-hospital-laboratory-partnerships-by-2028-2-2/",
      ariaLabel: "Read QXL Diagnostics coverage in The Tribune",
      width: 180,
      height: 50,
    },
  ];

  return (
    <section className="qxl-media-section py-16 bg-gradient-to-b from-white via-slate-50/50 to-white border-y border-slate-200/80" aria-labelledby="qxl-media-heading">
      <div className="qxl-container">
        <p className="qxl-media-eyebrow">MEDIA COVERAGE</p>

        <h2 id="qxl-media-heading">
          QXL Diagnostics in the News
        </h2>

        <p className="qxl-media-intro">
          QXL Diagnostics&apos; Hospital Laboratory Management expansion has been covered by leading national business and news publications.
        </p>

        <div className="qxl-media-logos flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {mediaLogos.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel}
              className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-[#D69A18] transition-all duration-300 min-h-[90px] sm:min-h-[105px] flex items-center justify-center"
            >
              <Image
                src={item.logo}
                alt={item.name}
                width={200}
                height={60}
                loading="lazy"
                className="max-h-[52px] sm:max-h-[64px] w-auto object-contain"
              />
            </a>
          ))}
        </div>

        <article className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 max-w-[920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/10] bg-gradient-to-br from-[#0B2545] via-[#0f2d5e] to-[#164263] p-2 flex items-center justify-center border border-slate-200">
            <Image
              src="/images/news/qxl-hlm-expansion-banner.svg"
              alt="QXL Diagnostics Targets 60 Hospital Laboratory Partnerships by 2028"
              width={600}
              height={380}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="md:col-span-7 text-left space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                FEATURED RELEASE
              </span>
              <span className="text-xs text-slate-400 font-semibold">• 177 Postings</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#0f2d5e] leading-snug m-0">
              QXL Diagnostics Targets 60 Hospital Laboratory Partnerships by 2028
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed m-0">
              QXL Diagnostics is expanding its Hospital Laboratory Management model to support hospitals with laboratory operations, quality systems, diagnostics infrastructure and reference laboratory services.
            </p>

            <div className="pt-2">
              <Link
                className="qxl-media-button"
                href="/news/qxl-diagnostics-60-hospital-laboratory-partnerships-2028/"
              >
                <span>View Full Media Coverage</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

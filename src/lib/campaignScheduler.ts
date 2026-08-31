export interface Campaign {
  id: string;
  name: string;
  startDate: string; // ISO YYYY-MM-DD
  endDate: string;   // ISO YYYY-MM-DD
  announcementText: string;
  badgeText: string;
  ctaText: string;
  ctaLink: string;
}

// Active campaigns registry. Offers automatically deactivate past endDate.
export const CAMPAIGNS: Campaign[] = [
  // Example future seasonal campaign placeholder:
  // {
  //   id: "monsoon-wellness-2026",
  //   name: "Monsoon Health Checkup",
  //   startDate: "2026-09-01",
  //   endDate: "2026-09-30",
  //   announcementText: "Monsoon Preventive Health Panel — Free Home Sample Collection",
  //   badgeText: "SEASONAL WELLNESS",
  //   ctaText: "Book Wellness Check",
  //   ctaLink: "/packages",
  // }
];

export const STANDARD_ANNOUNCEMENT = {
  announcementText: "NABL Certified Medical Laboratory (MC-6849) • Free Home Blood Collection Across Bengaluru • 6-Hour Digital Reports",
  badgeText: "NABL ACCREDITED (MC-6849)",
  ctaText: "BOOK A TEST NOW",
  ctaLink: "/book",
};

/**
 * Returns the currently active campaign based on system date.
 * If no campaign is active or past end date, returns STANDARD_ANNOUNCEMENT.
 */
export function getActiveCampaign(): {
  isCampaignActive: boolean;
  announcementText: string;
  badgeText: string;
  ctaText: string;
  ctaLink: string;
  remainingSeconds: number;
} {
  const now = new Date();
  const nowTime = now.getTime();

  for (const campaign of CAMPAIGNS) {
    const start = new Date(campaign.startDate).getTime();
    const end = new Date(campaign.endDate + "T23:59:59").getTime();

    if (nowTime >= start && nowTime <= end) {
      const remainingSeconds = Math.max(0, Math.floor((end - nowTime) / 1000));
      return {
        isCampaignActive: true,
        announcementText: campaign.announcementText,
        badgeText: campaign.badgeText,
        ctaText: campaign.ctaText,
        ctaLink: campaign.ctaLink,
        remainingSeconds,
      };
    }
  }

  return {
    isCampaignActive: false,
    ...STANDARD_ANNOUNCEMENT,
    remainingSeconds: 0,
  };
}

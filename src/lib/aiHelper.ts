// AI Helper to power the content assistant in the admin panel.
// Simulates highly intelligent medical marketing copy and design attributes.

export interface AIBannerOutput {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  subtitleAccent: string;
  description: string;
  bgFrom: string;
  bgTo: string;
  features: string[];
  cta: string;
  ctaLink: string;
}

export interface AIBlogOutput {
  title: string;
  excerpt: string;
  content: string;
  author: string;
}

export interface AISEOOutput {
  title: string;
  description: string;
  keywords: string;
}

export const aiHelper = {
  // Simulate AI Banner Generation
  generateBanner: async (prompt: string): Promise<AIBannerOutput> => {
    // Artificial delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const lower = prompt.toLowerCase();
    
    if (lower.includes("diab") || lower.includes("sugar")) {
      return {
        badge: "DIABETES CONTROL",
        title: "QXL ADVANCED DIABETIC",
        titleAccent: "COMPREHENSIVE PROFILE",
        subtitle: "Track HbA1c, Insulin & HOMA-IR",
        subtitleAccent: "FREE DIET CONSULTATION",
        description: "Know your insulin sensitivity and organ wellness parameters to manage diabetes effectively. Fasting Blood Sugar + Average Sugar + Organ Screen.",
        bgFrom: "#eff6ff",
        bgTo: "#dbeafe",
        features: ["14 Parameters", "Home Collection", "Same Day Report", "Expert Reviewed"],
        cta: "Book Package",
        ctaLink: "/book?package=Diabetes"
      };
    }

    if (lower.includes("heart") || lower.includes("cardio") || lower.includes("lipid")) {
      return {
        badge: "CARDIAC WELLNESS",
        title: "QXL HEALTHY HEART",
        titleAccent: "RISK RISK CHECK",
        subtitle: "Apo A-1 & B + hs-CRP + Lipoprotein",
        subtitleAccent: "AT ₹2,499 ONLY",
        description: "Early detection of cardiovascular blockages and systemic inflammation markers. Keep your heart rhythm at peak excellence.",
        bgFrom: "#f0f9ff",
        bgTo: "#e0f2fe",
        features: ["hs-CRP Included", "Apo-B/A1 ratio", "Accurate Profiling", "Report in 8 Hrs"],
        cta: "Screen Now",
        ctaLink: "/book"
      };
    }

    if (lower.includes("women") || lower.includes("female") || lower.includes("thyroid")) {
      return {
        badge: "WOMEN'S SPECIAL",
        title: "COMPLETE HORMONE &",
        titleAccent: "THYROID HEALTH CHECK",
        subtitle: "TSH, LH, FSH, Vitamin D & CBC",
        subtitleAccent: "SAVE 40% TODAY",
        description: "Designed for metabolic regulation, fatigue evaluation, and polycystic ovarian health checks. Reclaim your biological energy balance.",
        bgFrom: "#fdf2f8",
        bgTo: "#fce7f3",
        features: ["Thyroid Full Profile", "PCOS Screen", "Vitamins & Calcium", "NABL Accredited"],
        cta: "Schedule Test",
        ctaLink: "/book"
      };
    }

    // Default Custom Generator (Parses words from the prompt)
    const keywords = prompt.split(" ").slice(0, 3).map(w => w.toUpperCase()).join(" ");
    return {
      badge: "EXECUTIVE SCREENING",
      title: `QXL SPECIALIZED ${keywords || "PREVENTIVE"}`,
      titleAccent: "HEALTH ASSESSMENT PANEL",
      subtitle: `Exclusive Campaign: ${prompt}`,
      subtitleAccent: "UP TO 50% SPECIAL SAVINGS",
      description: `Complete diagnostic evaluation tailored for "${prompt}". Processed using NABL standard automated analyzers.`,
      bgFrom: "#eff6ff",
      bgTo: "#dbeafe",
      features: ["Certified Accuracy", "Phlebotomist Home Visit", "Online Report PDF", "Free Consult"],
      cta: "Book Now",
      ctaLink: "/book"
    };
  },

  // Simulate AI Blog Writing
  generateBlogPost: async (topic: string): Promise<AIBlogOutput> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const title = `Understanding ${topic || "Your Wellness Markers"}`;
    const excerpt = `Discover how to decode symptoms, schedule correct diagnostic screenings, and improve your daily metabolic parameters for ${topic || "optimum longevity"}.`;
    const content = `Maintaining good health requires a balance of regular physical activity, a low glycemic index diet, and routine screenings. When discussing ${topic || "general health panels"}, standard indicators like Liver Function Tests (LFT), Kidney Function Tests (KFT), Fasting Blood Sugar, and Lipid Profiles serve as vital alarm clocks. Early anomalies can often be managed through minor dietary adjustments before they progress into chronic conditions. Consistently testing these values ensures your body is operating efficiently.`;
    
    return {
      title,
      excerpt,
      content,
      author: "QXL Medical Editorial Team"
    };
  },

  // Simulate AI SEO Tags
  generateSEO: async (pageName: string): Promise<AISEOOutput> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      title: `${pageName} | Certified Diagnostic Screenings | QXL Diagnostics`,
      description: `Book diagnostic services for ${pageName} online. Best labs in Bengaluru featuring NABL standard processing, home blood sample collection, and instant electronic reports.`,
      keywords: `qxl diagnostics, ${pageName.toLowerCase()}, blood tests, diagnostics center, health checkup`
    };
  },

  // Simulate AI Response Generator
  generateReply: async (subject: string, message: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return `Dear Patient,

Thank you for reaching out to QXL Diagnostics regarding "${subject}". 

We have received your message: "${message.substring(0, 60)}..." 

One of our certified medical coordinators will contact you shortly on your provided phone number to assist with scheduling, collection timings, and test requirements. If this is an urgent inquiry, you can connect directly with our WhatsApp Support at +91 9964 639639.

Warm regards,
Patient Care Team
QXL Diagnostics`;
  }
};

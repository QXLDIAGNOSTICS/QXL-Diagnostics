import type { KnPageData } from "../types";
import { KN_BLOG_POSTS } from "./posts";
import { callBtn, waBtn } from "../common";

const articles = KN_BLOG_POSTS.filter((p) => p.markdown);

/** Pillar guide (/kn/blog/laboratory-tests-guide) — text from the developer pack's 00-laboratory-tests-guide.html. */
export const pillarPage: KnPageData = {
  enPath: "/blog",
  knPath: "/kn/blog/laboratory-tests-guide",
  seoTitle: KN_BLOG_POSTS[0].seoTitle,
  description: KN_BLOG_POSTS[0].description,
  breadcrumb: [{ label: "ಮುಖಪುಟ", href: "/kn" }, { label: "ಕನ್ನಡ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶಿ" }],
  hero: {
    eyebrow: "ಲೇಖನ ಮತ್ತು ವೈದ್ಯಕೀಯ ಅನುಮೋದನೆ: ಡಾ.ಶಾಂತಕುಮಾರ್ ಮುರುಡ · ಎಂಡಿ ವೈದ್ಯಕೀಯ ಜೀವರಸಾಯನಶಾಸ್ತ್ರ · ಸಂಸ್ಥಾಪಕ ಮತ್ತು ಸಿಇಒ ಕ್ಯೂಎಕ್ಸ್ಎಲ್ ಡಯಾಗ್ನೋಸ್ಟಿಕ್ಸ್, ಬೆಂಗಳೂರು",
    title: "21 ಪ್ರಮುಖ ರಕ್ತ ಮತ್ತು ಮೂತ್ರ ಪರೀಕ್ಷೆಗಳು: ಕನ್ನಡ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶಿ",
    body: [
      "ಯಾವ ರಕ್ತ ಅಥವಾ ಮೂತ್ರ ಪರೀಕ್ಷೆ ಏಕೆ ಮಾಡಿಸಬೇಕು? ಯಾವಾಗ ಉಪವಾಸ ಬೇಕು? ವರದಿಯ ಅರ್ಥವೇನು? ನಿಮ್ಮ ವೈದ್ಯರೊಂದಿಗೆ ಸೂಕ್ತ ಪರೀಕ್ಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಲು ಈ ಕನ್ನಡ ಮಾರ್ಗದರ್ಶಿ ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಎಲ್ಲರಿಗೂ ಎಲ್ಲ ಪರೀಕ್ಷೆಗಳು ಅಗತ್ಯವಿಲ್ಲ.",
    ],
  },
  sections: [
    {
      title: "ಪರೀಕ್ಷೆಗಳ ಪಟ್ಟಿ",
      blocks: [
        {
          type: "cards",
          cols: 3,
          items: articles.map((p, i) => ({
            badge: `${i + 1}`,
            title: p.seoTitle.replace(/\s*\|\s*QXL$/, ""),
            body: p.description,
            href: `/kn/blog/${p.slug}`,
          })),
        },
      ],
    },
    {
      tone: "muted",
      title: "ಪರೀಕ್ಷೆಗೆ ಮೊದಲು ಗಮನಿಸಬೇಕಾದ ವಿಷಯಗಳು",
      blocks: [{ type: "p", text: "ಔಷಧಗಳನ್ನು ಸ್ವತಃ ನಿಲ್ಲಿಸಬೇಡಿ. ಪೂರಕಗಳು, ಗರ್ಭಾವಸ್ಥೆ ಮತ್ತು ಹಿಂದಿನ ಕಾಯಿಲೆಗಳನ್ನು ತಿಳಿಸಿ. ಉಪವಾಸ ಅಗತ್ಯವಿದೆಯೇ ಎಂಬುದನ್ನು ಮುಂಚಿತವಾಗಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. ಅಸಹಜ ವರದಿ ಮಾತ್ರದಿಂದ ಕಾಯಿಲೆ ನಿರ್ಧರಿಸಬಾರದು." }],
    },
    {
      title: "ಬೆಂಗಳೂರಿನಲ್ಲಿ ಪರೀಕ್ಷೆ ಮತ್ತು ಮನೆಗೆ ಬಂದು ಮಾದರಿ ಸಂಗ್ರಹಣೆ",
      blocks: [
        { type: "p", text: "ಕ್ಯೂಎಕ್ಸ್ಎಲ್ ಡಯಾಗ್ನೋಸ್ಟಿಕ್ಸ್‌ನಲ್ಲಿ ಪರೀಕ್ಷೆಯ ಲಭ್ಯತೆ, ಪ್ರಸ್ತುತ ದರ, ಮಾದರಿ ಸಂಗ್ರಹಣೆ ಮತ್ತು ವರದಿಯ ಸಮಯವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ಸಂಪರ್ಕಿಸಿ. ಅರ್ಹ ಸೇವಾ ಪ್ರದೇಶಗಳಲ್ಲಿ ಹಾಗೂ ಸೂಕ್ತ ಪರೀಕ್ಷೆಗಳಿಗೆ ಮನೆ ಸಂಗ್ರಹಣೆ ಲಭ್ಯವಾಗಬಹುದು. ತುರ್ತು ವೈದ್ಯಕೀಯ ಸ್ಥಿತಿಗೆ ಮನೆ ಸಂಗ್ರಹಣೆಯನ್ನು ಕಾಯಬೇಡಿ." },
        { type: "buttons", items: [waBtn("ವಾಟ್ಸಾಪ್: +91 9964 639 639"), callBtn("ಕರೆ ಮಾಡಿ"), { label: "ಬೆಂಗಳೂರಿನ ಸೇವಾ ಪ್ರದೇಶಗಳು", href: "/locations/bengaluru" }] },
        { type: "notice", tone: "info", title: "ವೈದ್ಯಕೀಯ ಸೂಚನೆ", text: "ಇದು ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ಶಿಕ್ಷಣಕ್ಕೆ ಮಾತ್ರ. ವೈಯಕ್ತಿಕ ವೈದ್ಯಕೀಯ ಸಲಹೆ, ರೋಗನಿರ್ಣಯ ಅಥವಾ ಚಿಕಿತ್ಸೆಗೆ ಪರ್ಯಾಯವಲ್ಲ. ವರದಿಯಲ್ಲಿ ನೀಡಿರುವ ವಿಧಾನಕ್ಕೆ ಸೂಕ್ತ ಉಲ್ಲೇಖ ಮಿತಿ ಮತ್ತು ವೈದ್ಯರ ಸಲಹೆಯನ್ನು ಅನುಸರಿಸಿ." },
      ],
    },
    {
      tone: "muted",
      title: "ವೈದ್ಯಕೀಯ ಉಲ್ಲೇಖಗಳು ಮತ್ತು ಮುಂದಿನ ಓದು",
      subtitle: "ಪಠ್ಯಪುಸ್ತಕಗಳು ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಮತ್ತು ಪ್ರಯೋಗಾಲಯ ವಿಜ್ಞಾನದ ಹಿನ್ನೆಲೆ ಗ್ರಂಥಗಳು; ಕೆಳಗಿನ ಸಾರ್ವಜನಿಕ ಮಾರ್ಗದರ್ಶನಗಳನ್ನು ಸಹ ನೋಡಿ.",
      blocks: [
        {
          type: "bullets",
          items: [
            { text: "Harrison’s Principles of Internal Medicine, 22nd ed. McGraw Hill, 2025.", href: "https://accessmedicine.mhmedical.com/book.aspx?bookid=3541" },
            { text: "Rifai N. Tietz Textbook of Laboratory Medicine, 7th ed. Elsevier. ISBN 9780323775724.", href: "https://shop.elsevier.com/books/tietz-textbook-of-laboratory-medicine/rifai/978-0-323-77572-4" },
            { text: "MedlinePlus – ಪ್ರಯೋಗಾಲಯ ಪರೀಕ್ಷೆಗಳ ಮಾಹಿತಿ", href: "https://medlineplus.gov/lab-tests/" },
          ],
        },
      ],
    },
  ],
};

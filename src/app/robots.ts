import type { MetadataRoute } from 'next';

const SITE = 'https://qxldiagnostics.com';

// Private / transactional areas only. Everything else (tests, packages, blog, health hub,
// specialities, locations, llms.txt, sitemaps, images, /_next assets) is crawlable.
const DISALLOWED_PRIVATE_ROUTES = [
  '/api/',
  '/admin/',
  '/dashboard',
  '/account/',
  '/patient/',
  '/profile',
  '/login',
  '/my-bookings',
  '/my-reports',
  '/MyBookings',
  '/MyReports',
  '/Login',
  '/Profile',
  '/report/',
  '/reports/',
  '/checkout/',
  '/cart',
  '/unsubscribe/',
  '/delivery-control-centre',
];

// The public machine-readable catalogue is explicitly re-allowed under /api/.
const ALLOWED = ['/', '/api/tests-catalogue', '/llms.txt', '/llms-full.txt'];

// Search engines, AI answer engines and assistant fetchers. '*' already covers any bot
// not listed; naming them makes the welcome explicit for agents that look for their own group.
const CRAWLERS = [
  '*',
  // Search engines
  'Googlebot', 'Googlebot-Image', 'Googlebot-News', 'Storebot-Google', 'GoogleOther',
  'Google-Extended', 'Google-CloudVertexBot', 'Bingbot', 'BingPreview', 'MSNBot', 'Slurp',
  'DuckDuckBot', 'DuckAssistBot', 'YandexBot', 'Baiduspider', 'Applebot', 'Applebot-Extended',
  'Amazonbot', 'Bravebot', 'Qwantbot', 'SeznamBot', 'NaverBot', 'Yeti',
  // AI answer engines and assistants
  'GPTBot', 'OAI-SearchBot', 'OAI-AdsBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'Claude-Web', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User', 'Meta-ExternalAgent', 'Meta-ExternalFetcher', 'FacebookBot',
  'facebookexternalhit', 'DeepSeekBot', 'GrokBot', 'xAI-Bot', 'MistralAI-User', 'cohere-ai',
  'YouBot', 'PhindBot', 'Diffbot', 'CCBot', 'Bytespider', 'TikTokSpider', 'Timpibot',
  // Social / link previews
  'Twitterbot', 'LinkedInBot', 'WhatsApp', 'TelegramBot', 'Slackbot', 'Discordbot', 'Pinterestbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: CRAWLERS.map((userAgent) => ({
      userAgent,
      allow: ALLOWED,
      disallow: DISALLOWED_PRIVATE_ROUTES,
    })),
    sitemap: [`${SITE}/sitemap.xml`, `${SITE}/blog/feed.xml`],
    host: SITE,
  };
}

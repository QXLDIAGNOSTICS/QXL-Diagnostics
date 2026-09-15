import { MetadataRoute } from 'next';

const DISALLOWED_PRIVATE_ROUTES = [
  '/MyBookings',
  '/MyReports',
  '/Login',
  '/Profile',
  '/my-bookings',
  '/my-reports',
  '/login',
  '/profile',
  '/account/',
  '/patient/',
  '/admin/',
  '/dashboard',
  '/dashboard/',
  '/report',
  '/report/',
  '/reports/',
  '/book',
  '/book/',
  '/cart',
  '/cart/',
  '/checkout',
  '/checkout/',
  '/api/patient/',
  '/api/reports/',
  '/api/bookings/',
  '/payment-terms/',
  '/unsubscribe/',
];

export default function robots(): MetadataRoute.Robots {
  const crawlerAgents = [
    '*',
    'OAI-SearchBot',
    'ChatGPT-User',
    'GPTBot',
    'Claude-SearchBot',
    'Claude-User',
    'ClaudeBot',
    'PerplexityBot',
    'Google-Extended',
    'Googlebot',
    'bingbot',
    'DuckDuckBot',
  ];

  return {
    rules: crawlerAgents.map((agent) => ({
      userAgent: agent,
      allow: '/',
      disallow: DISALLOWED_PRIVATE_ROUTES,
    })),
    sitemap: 'https://qxldiagnostics.com/sitemap.xml',
    host: 'https://qxldiagnostics.com',
  };
}

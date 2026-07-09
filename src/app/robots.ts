import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/login', '/private/'],
      },
      // Explicitly welcome known AI/agentic crawlers so ChatGPT, Perplexity,
      // etc. can browse and cite QXL Diagnostics content directly.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: 'https://qxldiagnostics.com/sitemap.xml',
    host: 'https://qxldiagnostics.com',
  };
}

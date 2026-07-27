import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/', '/login', '/dashboard/'],
      },
    ],
    sitemap: 'https://qxldiagnostics.com/sitemap.xml',
    host: 'https://qxldiagnostics.com',
  };
}

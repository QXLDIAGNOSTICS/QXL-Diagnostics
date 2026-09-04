import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lowerPath = pathname.toLowerCase();

  // 1. Legacy WordPress junk / hello-world 301 Redirects to /blog
  if (lowerPath.startsWith('/uncategorized') || lowerPath === '/hello-world' || lowerPath === '/hello-world/') {
    return NextResponse.redirect(new URL('/blog', request.url), 301);
  }

  // 2. HTTP 410 Gone for WP scan probes & exploit scripts
  if (
    lowerPath.startsWith('/wp-content') ||
    lowerPath.startsWith('/wp-includes') ||
    lowerPath.startsWith('/wp-admin') ||
    lowerPath.startsWith('/wp-json') ||
    lowerPath === '/wp-login.php' ||
    lowerPath === '/xmlrpc.php' ||
    lowerPath.endsWith('.php')
  ) {
    return new NextResponse('Gone - Requested resource is permanently retired.', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  }

  // 2. Legacy WordPress 301 Redirects
  if (lowerPath.startsWith('/lab-tests')) {
    return NextResponse.redirect(new URL('/tests', request.url), 301);
  }
  if (lowerPath.startsWith('/health-packages')) {
    return NextResponse.redirect(new URL('/packages', request.url), 301);
  }
  if (lowerPath === '/about-us' || lowerPath === '/about-us/') {
    return NextResponse.redirect(new URL('/about', request.url), 301);
  }
  if (lowerPath === '/contact-us' || lowerPath === '/contact-us/') {
    return NextResponse.redirect(new URL('/contact', request.url), 301);
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    /*
     * Match all request paths except static files & images
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

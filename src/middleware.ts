import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Skip static assets, _next internal requests, API routes, and files with extensions
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname contains uppercase characters
  if (pathname !== pathname.toLowerCase()) {
    const lowerPath = pathname.toLowerCase();
    const url = request.nextUrl.clone();
    url.pathname = lowerPath;
    return NextResponse.redirect(url, 308);
  }

  // Common path aliases
  if (pathname === '/booking' || pathname === '/book-appointment' || pathname === '/book-test') {
    const url = request.nextUrl.clone();
    url.pathname = '/book';
    return NextResponse.rewrite(url);
  }

  if (pathname === '/locations') {
    const url = request.nextUrl.clone();
    url.pathname = '/centers';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

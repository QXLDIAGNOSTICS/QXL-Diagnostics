import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * HTTP 301 Permanent Redirect route handler for legacy WordPress uncategorized junk URLs.
 * Eliminates soft-404 search engine indexing penalties.
 */
export async function GET(request: Request) {
  return NextResponse.redirect(new URL('/blog', request.url), 301);
}

export async function HEAD(request: Request) {
  return NextResponse.redirect(new URL('/blog', request.url), 301);
}

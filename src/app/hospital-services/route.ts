import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL('/hospital-laboratory-management', request.url);
  return NextResponse.redirect(url, 301);
}

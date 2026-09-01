import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('410 Resource Permanently Gone', {
    status: 410,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

export async function HEAD() {
  return new NextResponse(null, {
    status: 410,
    headers: {
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

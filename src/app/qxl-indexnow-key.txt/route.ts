import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('qxl4a675003c401490ca9d6fb3083811f56', {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

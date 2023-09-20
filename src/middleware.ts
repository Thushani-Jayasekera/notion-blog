import getConfig from 'next/config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const {publicRuntimeConfig} = getConfig();
export function middleware(request: NextRequest) {
  const password = request.nextUrl.searchParams.get('password');

  if (password !== process.env.API_SECRET || publicRuntimeConfig.API_SECRET) {
    return NextResponse.json({ message: 'Wrong password' }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};

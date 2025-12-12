import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const res = NextResponse.redirect(new URL('/login', request.url));
  res.cookies.set('session', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });
  return res;
}


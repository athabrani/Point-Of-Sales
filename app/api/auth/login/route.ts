import { NextResponse } from 'next/server';
import { authenticate, createSessionValue } from '@/lib/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await authenticate(email, password);
  if (!user) {
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ user });
  res.cookies.set('session', createSessionValue(user), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  return res;
}

import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');

  // If there's no token and we are trying to access /dashboard, redirect to /login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
};

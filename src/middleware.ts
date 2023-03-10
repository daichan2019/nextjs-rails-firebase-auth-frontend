import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { AUTH_COOKIE_VALUE } from '@/config/index';

export const middleware = (req: NextRequest) => {
  const { cookies, nextUrl, url } = req;
  const isAuthenticated = cookies.get(AUTH_COOKIE_VALUE);

  const isAuthUrl =
    nextUrl.pathname === '/signin' ||
    nextUrl.pathname === '/signup' ||
    nextUrl.pathname === '/auth-redirect';

  if (
    nextUrl.pathname.startsWith('/_next') ||
    nextUrl.pathname.startsWith('/api') ||
    nextUrl.pathname.startsWith('/static')
  ) {
    return NextResponse.next();
  }

  // ログインしていなかったら「/signin」にリダイレクトさせる
  // ログインしていないときは「/signin」「/signup」「/auth-redirect」にはアクセスできる
  if (!isAuthenticated && !isAuthUrl) {
    return NextResponse.redirect(new URL('/signin', url));
  }
  // ログイン成功してたら「/signin, /signup」にはアクセスできない、前のURLにリダイレクトさせる
  if (isAuthenticated && isAuthUrl) {
    return NextResponse.redirect(new URL('/', url));
  }
};

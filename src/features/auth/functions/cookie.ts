import { destroyCookie, setCookie } from 'nookies';

import { AUTH_COOKIE_VALUE } from '@/config/index';

export const cookie = {
  set: () => {
    setCookie(null, AUTH_COOKIE_VALUE, 'true', {
      secure: true,
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
  },
  clear: () => {
    destroyCookie(null, AUTH_COOKIE_VALUE);
  },
};

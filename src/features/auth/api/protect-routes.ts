import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useUserState } from '@/atoms/user';

export const useProtectRoutes = () => {
  const currentUser = useUserState();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.replace('/signin');
    }
    if (/^\/(signin|signup)/.test(router.asPath) && currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);
};

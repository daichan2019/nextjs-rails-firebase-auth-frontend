import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useUserState } from '@/atoms/user';

export const useProtectRoutes = () => {
  const currentUser = useUserState();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  console.log(isAuthChecking);
  console.log(currentUser);

  useEffect(() => {
    if (currentUser) {
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }

    if (isAuthChecking) {
      return;
    }
    if (!currentUser) {
      router.push('/signin');
    } // 未ログインだったのでリダイレクト
  }, [isAuthChecking, currentUser, router]);
};

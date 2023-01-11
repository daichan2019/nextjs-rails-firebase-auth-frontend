import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useUserStateMutators } from '@/atoms/user';
import { auth } from '@/lib/firebase';

export const useAuth = () => {
  const router = useRouter();
  const setUserState = useUserStateMutators();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // 未ログインの場合
      if (!user) {
        router.push('/signin');
        setUserState(null);
        return;
      }

      setUserState(user);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

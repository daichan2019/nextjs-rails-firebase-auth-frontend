import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { useUserStateMutators } from '@/atoms/user';
import { auth } from '@/lib/firebase';

export const useAuth = () => {
  const setUserState = useUserStateMutators();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // 未ログインの場合
      if (!user) {
        setUserState(null);
        return;
      }

      const userCopy = JSON.parse(JSON.stringify(user));
      setUserState(userCopy);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

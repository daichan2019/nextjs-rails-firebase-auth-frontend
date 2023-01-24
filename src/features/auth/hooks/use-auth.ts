import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef } from 'react';

import { useUserStateMutators } from '@/atoms/user';
import { fetchCurrentUserFromAPI } from '@/features/auth';
import { auth } from '@/lib/firebase';

export const useAuth = () => {
  const setUserState = useUserStateMutators();
  const refFirstRef = useRef(true);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      if (refFirstRef.current) {
        refFirstRef.current = false;
        return;
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // 未ログインの場合
      if (!user) {
        setUserState(null);
        return;
      }

      try {
        const token = await user.getIdToken();
        const res = await fetchCurrentUserFromAPI(token);
        const { email, id, name, uid } = res;
        const userFromAPI = {
          id,
          name,
          email,
          uid,
        };

        setUserState(userFromAPI);
      } catch (err) {
        console.error(err);
        setUserState(null);
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef } from 'react';

import { useUserStateMutators } from '@/atoms/user';
import { fetchCurrentUserFromAPI } from '@/features/auth';
import { cookie } from '@/features/auth';
import { auth } from '@/lib/firebase';

export const useAuth = () => {
  const setUserState = useUserStateMutators();
  const refFirstRef = useRef(true);

  useEffect(() => {
    // useEffectが2回発火してしまう事象を防ぐ。API側に2回API Callし、同一Userを2人作成してしまうため。
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
        cookie.clear();
        return;
      }

      // firebaseでログインが成功したら、以下の処理を行う
      // 1. APIでfirebaseから返却されるtokenを検証
      // 2. tokenの検証が成功したらDBにuserを保存し、APIがuserを返却してくれるので、resをrecoilにsetする
      // 4. APIでfirebaseのtoken検証が失敗したらerrorに入るので、userStateを初期値に戻す、cookieを削除する
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
        cookie.clear();
        setUserState(null);
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

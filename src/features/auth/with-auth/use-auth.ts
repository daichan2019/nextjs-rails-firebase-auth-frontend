import { onAuthStateChanged } from 'firebase/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useUserStateMutators } from '@/atoms/user';
import { authenticateUser } from '@/features/auth';
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
        localStorage.removeItem('currentUser');
        Cookies.remove('isLoggedIn');
        return;
      }

      // 一度ログインに成功している場合は、localStorageにcurrentUserをsetし、その値をsetUserStateする
      if (localStorage.getItem('currentUser')) {
        const loggedInUser = JSON.parse(localStorage.getItem('currentUser') as string);
        setUserState(loggedInUser);
        return;
      }

      // firebaseでログインが成功したら、以下の処理を行う
      // 1. APIでfirebaseから返却されるtokenを検証
      // 2. tokenの検証が成功したらDBにuserを保存し、APIがuserを返却してくれるので、resをsetUserStateする
      // 3. ページリロードするたびに上記のAPIコールの処理が走ってしまうので、ログインに成功したら無駄なAPIコールを防ぐためresをlocalStorageにsetItemする → localStorageにcurrentUserがあればそれをsetUserStateすればよくなる
      // 4. APIでfirebaseのtoken検証が失敗したらerrorに入るので、userStateを初期値に戻す、localStorageからcurrentUserをremoveする、cookieを削除する
      try {
        const token = await user.getIdToken();
        const res = await authenticateUser(token);
        const { email, id, name, uid } = res;
        const repositoryUser = {
          id,
          name,
          email,
          uid,
        };

        setUserState(repositoryUser);
        localStorage.setItem('currentUser', JSON.stringify(repositoryUser));
      } catch (err) {
        console.error(err);
        router.push('/signin');
        setUserState(null);
        localStorage.removeItem('currentUser');
        Cookies.remove('isLoggedIn');
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

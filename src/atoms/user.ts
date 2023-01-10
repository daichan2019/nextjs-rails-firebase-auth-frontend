import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { BASE_URL } from 'src/config';

import { verifyToken } from '@/features/auth';
import { auth } from '@/lib/firebase';
import { catchFirebaseError } from '@/utils/catchFirebaseError';

export type UserState = {
  id: number;
  name: string;
  email: string;
  uid: string;
};

const userState = atom<UserState | null>({
  key: 'userState',
  default: null,
});

// userStateのgetter
export const useUserState = () => {
  return useRecoilValue(userState);
};

// userStateのsetter
export const useUserStateMutators = () => {
  const setUserState = useSetRecoilState(userState);

  return setUserState;
};

export const useSignUp = () => {
  const signUpWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user, {
        url: BASE_URL,
      });
      Cookies.set('isLoggedIn', 'true', { secure: true });
    } catch (err) {
      console.error(err);
    }
  };

  return { signUpWithEmailAndPassword };
};

// signInWithRedirectによるsignup, signin
export const useSignInWithGoogle = () => {
  const router = useRouter();
  const setUserState = useUserStateMutators();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    (async () => {
      const result = await getRedirectResult(auth)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          console.error(err);
        });
      if (result == null) {
        // result がない時は認証前
        // `auth/redirect-cancelled-by-user` 等のエラー検証が必要だが、ここでは省略
        await signInWithRedirect(auth, new GoogleAuthProvider());
      } else {
        // result がある時は認証済み
        // オープンリダイレクタ等を回避するために検証が必要だが、ここでは省略

        const token = await result.user.getIdToken();
        const res = await verifyToken(token);
        const { email, id, name, uid } = res;
        const repositoryUser = {
          id,
          name,
          email,
          uid,
        };
        setUserState(repositoryUser);
        Cookies.set('isLoggedIn', 'true', { secure: true });
        localStorage.setItem('currentUser', JSON.stringify(repositoryUser));

        const redirectUri = router.query['redirect_uri'] as string | undefined;
        router.push(redirectUri || '/');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);
};

export const useSignIn = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Cookies.set('isLoggedIn', 'true', { secure: true });
      router.push('/');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(catchFirebaseError(err));
    }
  };

  return {
    signIn,
    errorMessage,
  };
};

export const useSignOut = () => {
  const setUserState = useUserStateMutators();
  const router = useRouter();

  const logout = () => {
    try {
      signOut(auth).then(() => {
        router.push('/signin');
        setUserState(null);
      });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    logout,
  };
};

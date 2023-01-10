import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from 'firebase/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useUserStateMutators } from '@/atoms/user';
import { API_BASE_URL } from '@/config/index';
import { auth } from '@/lib/firebase';
import { catchFirebaseAuthError } from '@/utils/catch-firebase-auth-error';

export const verifyToken = async (token: string, name = '') => {
  const res = await axios.post(`${API_BASE_URL}/auth/users`, {
    token,
    user: {
      name,
    },
  });

  return res.data;
};

export const initAuthState = async () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      resolve(user);
    });

    return unsubscribe();
  });
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
      setErrorMessage(catchFirebaseAuthError(err));
    }
  };

  return {
    signIn,
    errorMessage,
  };
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

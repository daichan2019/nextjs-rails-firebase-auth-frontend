import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { BASE_URL } from 'src/config';

import { auth } from '@/lib/firebase';
import { catchFirebaseAuthError } from '@/utils/catch-firebase-auth-error';

export const useSignUp = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const signUpWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user, {
        url: BASE_URL,
      });
      Cookies.set('isLoggedIn', 'true', { secure: true });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(catchFirebaseAuthError(err));
    }
  };

  return { signUpWithEmailAndPassword, errorMessage };
};

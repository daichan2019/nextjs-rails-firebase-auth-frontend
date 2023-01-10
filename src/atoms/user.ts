import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import Cookies from 'js-cookie';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { BASE_URL } from 'src/config';

import { auth } from '@/lib/firebase';

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

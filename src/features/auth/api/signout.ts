import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

import { useUserStateMutators } from '@/atoms/user';
import { auth } from '@/lib/firebase';

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

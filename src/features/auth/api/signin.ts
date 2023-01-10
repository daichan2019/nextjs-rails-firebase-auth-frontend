import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';

import { API_BASE_URL } from '@/config/index';
import { auth } from '@/lib/firebase';

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

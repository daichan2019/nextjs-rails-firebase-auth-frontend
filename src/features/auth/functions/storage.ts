import { AUTH_STORAGE_KEY } from '@/config/index';

export const storage = {
  getUser: () => {
    return JSON.parse(window.localStorage.getItem(AUTH_STORAGE_KEY) as string);
  },
  setUser: (user: any) => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  },
  clearUser: () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};

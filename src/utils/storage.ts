export const storage = {
  getUser: () => {
    return JSON.parse(window.localStorage.getItem('current_user') as string);
  },
  setUser: (user: any) => {
    window.localStorage.setItem('current_user', JSON.stringify(user));
  },
  clearUser: () => {
    window.localStorage.removeItem('current_user');
  },
};

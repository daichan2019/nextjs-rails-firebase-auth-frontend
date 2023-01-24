export const storage = {
  getUser: () => {
    return JSON.parse(window.localStorage.getItem('currentUser') as string);
  },
  setUser: (user: any) => {
    window.localStorage.setItem('currentUser', JSON.stringify(user));
  },
  clearUser: () => {
    window.localStorage.removeItem('currentUser');
  },
};

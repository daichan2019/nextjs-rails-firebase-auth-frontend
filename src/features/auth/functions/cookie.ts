export const cookieFn = {
  set: (user: any) => {
    window.localStorage.setItem('currentUser', JSON.stringify(user));
  },
  clear: () => {
    window.localStorage.removeItem('currentUser');
  },
};

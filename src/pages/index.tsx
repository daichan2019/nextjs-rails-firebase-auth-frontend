import type { NextPage } from 'next';

import { useUserState } from '@/atoms/user';
import { useSignOut } from '@/features/auth';

const Home: NextPage = () => {
  const tasks = [
    { id: 1, title: 'title1', body: 'body1', isCompleted: false },
    { id: 2, title: 'title2', body: 'body2', isCompleted: false },
    { id: 3, title: 'title3', body: 'body3', isCompleted: false },
  ];

  return (
    <div>
      {currentUser && <p>{currentUser.name}</p>}
      <button onClick={logout}>ログアウト</button>
    </div>
  );
};

export default WithAuth(Home);

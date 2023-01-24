import type { NextPage } from 'next';

import { useUserState } from '@/atoms/user';
import { useSignOut, WithAuth } from '@/features/auth';

const Home: NextPage = () => {
  const currentUser = useUserState();
  const { logout } = useSignOut();

  return (
    <div>
      {currentUser && <p>{currentUser.displayName}</p>}
      <button onClick={logout}>ログアウト</button>
    </div>
  );
};

export default WithAuth(Home);

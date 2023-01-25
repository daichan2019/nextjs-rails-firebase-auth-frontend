import type { NextPage } from 'next';

import { useUserState } from '@/atoms/user';
import { useSignOut } from '@/features/auth';

const Home: NextPage = () => {
  const currentUser = useUserState();
  const { logout } = useSignOut();

  return (
    <div>
      {currentUser && <p>{currentUser.name}</p>}
      <button onClick={logout}>ログアウト</button>
    </div>
  );
};

export default Home;

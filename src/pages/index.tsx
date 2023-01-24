import type { NextPage } from 'next';

import { useUserState } from '@/atoms/user';
import { useSignOut, WithAuth } from '@/features/auth';

const Home: NextPage = () => {
  const currentUser = useUserState();
  const { logout } = useSignOut();
  console.log(currentUser);

  return (
    <WithAuth>
      {currentUser && <p>{currentUser.name}</p>}
      <button onClick={logout}>ログアウト</button>
    </WithAuth>
  );
};

export default Home;

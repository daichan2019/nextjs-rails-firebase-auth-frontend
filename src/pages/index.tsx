import type { NextPage } from 'next';

import { useUserState } from '@/atoms/user';
import { WithAuth } from '@/features/auth/with-auth';

const Home: NextPage = () => {
  const currentUser = useUserState();
  console.log(currentUser);

  return (
    <WithAuth>
      <div>{currentUser && <p>{currentUser?.displayName}</p>}</div>
    </WithAuth>
  );
};

export default Home;

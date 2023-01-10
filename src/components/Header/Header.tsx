import type { FC } from 'react';

import { useUserState } from '@/globalStates/user';

export const Header: FC = () => {
  const currentUser = useUserState();

  return (
    <header className='shadow-md'>
      <div className='flex justify-between py-6 px-4'>
        <h1 className='text-xl font-bold'>Next.js + Rails Task App</h1>
        <p>{currentUser?.email}</p>
      </div>
    </header>
  );
};

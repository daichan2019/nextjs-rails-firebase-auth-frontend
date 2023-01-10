import type { FC } from 'react';

import { useSignOut } from '@/globalStates/user';

export const Sidebar: FC = () => {
  const { logout } = useSignOut();
  return (
    <aside className='shadow-md max-w-[260px] w-[30%] py-14 px-4'>
      <nav>
        <ul className='flex flex-col gap-4 xl:gap-6'>
          <li>
            <button onClick={logout}>ログアウト</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

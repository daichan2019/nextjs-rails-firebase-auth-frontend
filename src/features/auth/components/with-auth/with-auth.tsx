import { useRouter } from 'next/router';
import type { FC, ReactNode } from 'react';

import { useUserState } from '@/atoms/user';
import { Spinner } from '@/components/spinner';

type Props = {
  children: ReactNode;
};

export const WithAuth: FC<Props> = ({ children }) => {
  const router = useRouter();
  const currentUser = useUserState();

  if (typeof window !== 'undefined' && currentUser === null) {
    router.push('/signin');
  }

  if (typeof window !== 'undefined' && currentUser !== null) {
    router.push('/');
  }

  if (!currentUser) {
    return (
      <div className='flex flex-col gap-4 items-center justify-center py-12 px-4'>
        <Spinner />
        <p className='text-2xl font-bold text-center'>認証中です。しばらくお待ち下さい。</p>
      </div>
    );
  }

  return <>{children}</>;
};

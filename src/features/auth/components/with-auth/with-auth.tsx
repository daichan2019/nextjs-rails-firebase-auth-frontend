import { useRouter } from 'next/router';
import type { FC, ReactElement } from 'react';

import { useUserState } from '@/atoms/user';

type Props = {
  [key: string]: any;
};

export const WithAuth = (Component: FC<Props>): FC<Props> => {
  // eslint-disable-next-line react/display-name
  return (props: Props): ReactElement => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const router = useRouter();
    const currentUser = useUserState();

    if (typeof window !== 'undefined' && currentUser === null) {
      router.push('/signin');
    }

    if (!currentUser) {
      return <h1>Loading...</h1>;
    }

    return <Component {...props} />;
  };
};

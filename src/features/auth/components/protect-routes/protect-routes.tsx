import { useRouter } from 'next/router';
import type { FC, ReactNode } from 'react';

import { Spinner } from '@/components/spinner';

type Props = {
  children: ReactNode;
};

export const WithAuth: FC<Props> = ({ children }) => {
  const router = useRouter();

  return <>{children}</>;
};

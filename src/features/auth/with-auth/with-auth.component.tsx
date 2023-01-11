import type { FC, ReactNode } from 'react';

import { useAuth } from '@/features/auth';

type Props = {
  children: ReactNode;
};

export const WithAuth: FC<Props> = ({ children }) => {
  useAuth();

  return <>{children}</>;
};

import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

import { useProtectRoutes } from '@/features/auth';

export const WithAuth: FC<Props> = ({ children }) => {
  useProtectRoutes();

  return <>{children}</>;
};

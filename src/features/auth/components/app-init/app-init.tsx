import type { FC } from 'react';

import { useAuth } from '@/features/auth';

export const AppInit: FC = () => {
  useAuth();

  return null;
};

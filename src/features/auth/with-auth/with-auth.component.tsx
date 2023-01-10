import type { NextComponentType, NextPageContext } from 'next';

import { useAuth } from '@/features/auth/with-auth/use-auth';

// eslint-disable-next-line @typescript-eslint/ban-types
export const WithAuth = (WrappedComponent: NextComponentType<NextPageContext, any, {}>) => {
  // eslint-disable-next-line react/display-name
  return () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAuth();

    return <WrappedComponent />;
  };
};

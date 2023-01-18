import '../styles/index.css';

import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import { AppInit } from '@/features/auth/components/app-init';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <AppInit />
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default MyApp;

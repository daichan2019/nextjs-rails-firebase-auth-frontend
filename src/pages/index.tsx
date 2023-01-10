import type { NextPage } from 'next';

import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { WithAuth } from '@/features/auth/with-auth';

const Home: NextPage = () => {
  return (
    <div className='flex-col flex min-h-screen'>
      <div className='flex flex-1 overflow-x-hidden'>
        <Sidebar />
        <div className='w-full'>
          <Header />
          <main></main>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Home);

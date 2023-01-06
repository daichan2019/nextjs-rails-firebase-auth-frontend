import type { NextPage } from 'next';

import { WithAuth } from '@/components/functional/WithAuth';
import { Header } from '@/components/ui/layouts/Header';
import { Sidebar } from '@/components/ui/layouts/Sidebar';

const Home: NextPage = () => {
  return (
    <WithAuth>
      <div className='flex-col flex min-h-screen'>
        <div className='flex flex-1 overflow-x-hidden'>
          <Sidebar />
          <div className='w-full'>
            <Header />
            <main></main>
          </div>
        </div>
      </div>
    </WithAuth>
  );
};

export default Home;

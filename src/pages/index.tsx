import type { NextPage } from 'next';

import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { WithAuth } from '@/features/auth/with-auth';
import { TaskList } from '@/features/tasks';

const Home: NextPage = () => {
  const tasks = [
    { id: 1, title: 'title1', body: 'body1', isCompleted: false },
    { id: 2, title: 'title2', body: 'body2', isCompleted: false },
    { id: 3, title: 'title3', body: 'body3', isCompleted: false },
  ];

  return (
    <div className='flex-col flex min-h-screen'>
      <div className='flex flex-1 overflow-x-hidden'>
        <Sidebar />
        <div className='w-full'>
          <Header />
          <main className='px-4 py-6'>
            <h2 className='text-2xl font-bold'>My Tasks</h2>
            <ul className='flex flex-col gap-4 my-3'>
              <TaskList tasks={tasks} />
            </ul>
          </main>
        </div>
      </div>
    </div>
  );
};

export default WithAuth(Home);

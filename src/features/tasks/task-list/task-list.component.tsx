import type { FC } from 'react';

import { TaskItem } from '@/features/tasks';

type Task = {
  id: number;
  title: string;
  body: string;
  isCompleted: boolean;
};

type Props = {
  tasks: Task[];
};

export const TaskList: FC<Props> = ({ tasks }) => {
  return (
    <ul className='flex flex-col gap-4 my-3'>
      {tasks.map((t) => {
        return (
          <li key={t.id}>
            <TaskItem task={t} />
          </li>
        );
      })}
    </ul>
  );
};

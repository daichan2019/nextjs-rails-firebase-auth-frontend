import type { FC } from 'react';

type Task = {
  id: number;
  title: string;
  body: string;
  isCompleted: boolean;
};

type Props = {
  task: Task;
};

export const TaskItem: FC<Props> = ({ task }) => {
  return (
    <div className='border-gray-400 p-3 border rounded shadow-md'>
      <h3 className='text-lg'>{task.title}</h3>
      <p>{task.body}</p>
    </div>
  );
};

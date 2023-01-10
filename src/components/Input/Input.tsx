import clsx from 'clsx';
import type { ChangeEventHandler, Ref } from 'react';

export type InputProps = {
  placeholder?: string;
  error?: string;
  name: string;
  type?: string;
};

export const Input = ({
  error,
  inputRef,
  name,
  onChange,
  placeholder,
  type,
  value,
}: InputProps & {
  inputRef?: Ref<HTMLInputElement>;
  isSubmitting?: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  const errorStyle = !!error && 'border-red-500 text-red-900 focus:ring-red-500';

  return (
    <div>
      <input
        onChange={onChange}
        name={name}
        value={value}
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        className={clsx(
          'w-full focus:ring-blue-500 focus:border-blue-500 valid:ring-green-500 rounded-md border-gray-300 border p-2',
          errorStyle,
        )}
      />
      {!!error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
};

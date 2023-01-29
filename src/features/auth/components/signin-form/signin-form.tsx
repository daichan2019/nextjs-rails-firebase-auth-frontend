import { Form } from '@/components/form';
import { InputControl } from '@/components/input-control';
import { FC } from 'react';
import { z } from 'zod';
import Link from 'next/link';

import { SignInWithGoogleButton } from '@/features/auth/components/signin-with-google-button';

type FormValue = {
  email: string;
  password: string;
};

export const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'メールアドレスは必ず入力してください。' })
    .regex(new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/), {
      message: 'メールアドレスの形式が不正です。',
    })
    .max(40, { message: 'メールアドレスは40文字以内で入力してください。' }),
  password: z
    .string()
    .min(8, { message: 'パスワードは8文字以上で入力してください。' })
    .max(20, { message: 'パスワードは20文字以内で入力してください。' }),
});

export const SignInForm: FC = () => {
  return (
    <div className='rounded-md px-2 shadow-lg border-gray-500 border'>
      <h2 className='text-2xl font-bold text-center'>ログイン</h2>
      <Form<FormValue, typeof validationSchema>
        id='signin-form'
        onSubmit={async (data) => {
          console.log(data);
        }}
        options={{
          reValidateMode: 'onChange',
          defaultValues: {
            email: '',
            password: '',
          },
        }}
        schema={validationSchema}
      >
        {({ control, formState }) => {
          return (
            <>
              <div>
                <InputControl name='email' type='email' control={control} />
              </div>
              <div className='rounded-lg bg-white my-3'>
                <InputControl name='password' type='password' control={control} />
              </div>
              <div className='mt-10 flex justify-center'>
                <button type='submit'>送信する</button>
              </div>
            </>
          );
        }}
      </Form>
      <SignInWithGoogleButton variant='inverse'>Googleアカウントでログイン</SignInWithGoogleButton>
      <Link href='/signup'>会員登録がまだの方はこちら</Link>
    </div>
  );
};

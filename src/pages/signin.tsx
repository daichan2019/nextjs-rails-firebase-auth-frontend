import type { NextPage } from 'next';
import Link from 'next/link';
import { z } from 'zod';

import { useSignIn } from '@/atoms/user';
import { Button } from '@/components/button';
import { Form } from '@/components/form';
import { GoogleSignInButton } from '@/components/GoogleSignInButton';
import { InputControl } from '@/components/input-control';

type SignInFormValues = {
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
    .regex(new RegExp(/^[a-zA-Z0-9]+$/), {
      message: 'パスワードの形式が不正です。',
    })
    .max(20, { message: 'パスワードは20文字以内で入力してください。' }),
});

const SignInPage: NextPage = () => {
  const { errorMessage, signIn } = useSignIn();
  return (
    <div className='max-w-xl px-4 py-12 mx-auto'>
      <h2 className='text-2xl font-bold text-center'>ログイン</h2>
      <Form<SignInFormValues, typeof validationSchema>
        id='signin-form'
        onSubmit={async (data) => {
          await signIn(data.email, data.password);
        }}
        options={{
          reValidateMode: 'onChange',
          defaultValues: {
            email: '',
            password: '',
          },
        }}
        className='pt-4'
        schema={validationSchema}
      >
        {({ control, formState }) => {
          return (
            <>
              <InputControl placeholder='Email' name='email' type='email' control={control} />
              <div className='h-5'></div>
              <InputControl
                placeholder='Password'
                name='password'
                type='password'
                control={control}
              />
              <div className='mt-10 flex justify-center'>
                <div>
                  {!!errorMessage && <p className='text-xs text-red-500'>{errorMessage}</p>}
                  <Button isLoading={formState.isSubmitting} type='submit' className='w-full'>
                    ログイン
                  </Button>
                  <GoogleSignInButton className='mt-5' variant='inverse'>
                    Googleアカウントでログイン
                  </GoogleSignInButton>
                </div>
              </div>
            </>
          );
        }}
      </Form>
      <p className='mt-5'>
        会員登録がまだの方は
        <Link href='/signup' className='text-blue-500 underline decoration-blue-500'>
          こちら
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;

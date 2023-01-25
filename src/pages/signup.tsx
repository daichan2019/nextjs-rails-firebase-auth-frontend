import type { NextPage } from 'next';
import Link from 'next/link';
import { z } from 'zod';

import { Button } from '@/components/button';
import { Form } from '@/components/form';
import { InputControl } from '@/components/input-control';
import { SignInWithGoogleButton } from '@/features/auth';

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

type SignUpFormValues = {
  email: string;
  password: string;
};

const SignUpPage: NextPage = () => {
  const { errorMessage, signUpWithEmailAndPassword } = useSignUp();

  return (
    <div className='max-w-xl px-4 py-12 mx-auto'>
      <h2 className='text-2xl font-bold text-center'>会員登録</h2>
      <Form<SignUpFormValues, typeof validationSchema>
        id='signup-form'
        onSubmit={async (data) => {
          await signUpWithEmailAndPassword(data.email, data.password);
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
              <div className='flex flex-col gap-2'>
                <p>Email</p>
                <InputControl name='email' type='email' control={control} />
              </div>
              <div className='flex flex-col gap-2 mt-5'>
                <p>Password</p>
                <InputControl name='password' type='password' control={control} />
              </div>
              <div className='mt-10 flex justify-center'>
                <div>
                  {!!errorMessage && <p className='text-xs text-red-500'>{errorMessage}</p>}
                  <Button isLoading={formState.isSubmitting} type='submit' className='w-full'>
                    会員登録する
                  </Button>
                  {!!formState.isSubmitSuccessful && (
                    <p className='mt-2 empty:hidden text-xs text-green-500'>
                      確認メールを送信しました。メールを確認し、会員登録を完了してください。
                    </p>
                  )}
                  <div className='h-5'></div>
                  <SignInWithGoogleButton variant='inverse'>
                    Googleアカウントで始める
                  </SignInWithGoogleButton>
                </div>
              </div>
            </>
          );
        }}
      </Form>
      <p className='mt-5'>
        すでに会員登録している方は
        <Link href='/signin' className='text-blue-500 underline decoration-blue-500'>
          こちら
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;

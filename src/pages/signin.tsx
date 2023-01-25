import type { NextPage } from 'next';
import Link from 'next/link';
import { SignInWithGoogleButton, useSignIn } from '@/features/auth';

const SignInPage: NextPage = () => {
  const { errorMessage, signIn } = useSignIn();
  return (
    <div className='max-w-xl px-4 py-12 mx-auto'>
      <SignInWithGoogleButton variant='inverse'>Googleアカウントでログイン</SignInWithGoogleButton>
      <Link href='/signup'>会員登録がまだの方はこちら</Link>
      <h2 className='text-2xl font-bold text-center'>ログイン</h2>
    </div>
  );
};

export default SignInPage;

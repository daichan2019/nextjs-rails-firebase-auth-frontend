import type { NextPage } from 'next';
import Link from 'next/link';

import { SignInWithGoogleButton } from '@/features/auth';

const SignInPage: NextPage = () => {
  return (
    <div className='max-w-xl px-4 py-12 mx-auto'>
      <h2 className='text-2xl font-bold text-center'>ログイン</h2>
      <SignInWithGoogleButton variant='inverse'>Googleアカウントでログイン</SignInWithGoogleButton>
      <Link href='/signup'>会員登録がまだの方はこちら</Link>
    </div>
  );
};

export default SignInPage;

import type { NextPage } from 'next';
import { SignInForm } from '@/features/auth/components/signin-form';

const SignInPage: NextPage = () => {
  return (
    <div className='max-w-xl px-4 py-12 mx-auto'>
      <SignInForm />
    </div>
  );
};

export default SignInPage;

'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email !== '' && password !== '') {
      setIsLoading(true);
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      }).then(({ ok, error }: any) => {
        if (ok) {
          toast.success('Login successful!!!');
          router.push('/');
          router.refresh();
          setIsLoading(false);
        } else {
          toast.error('Invalid Credentials!');
          setIsLoading(false);
        }
      });
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className='mx-auto flex h-screen flex-col items-center justify-center bg-gray-900'>
      <div className='max-w-[500px] bg-white p-8 space-y-2 rounded-xl'>
        <h1 className='font-bold text-3xl text-primary mb-8'>
          Login your Account
        </h1>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Email Address'
            className='input input-primary w-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='text'
            placeholder='Password'
            className='input input-primary w-full'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className='btn btn-primary'>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className='pt-3'>
          <p>
            Don't have an account?{' '}
            <Link href={'/signup'} className='text-primary hover:underline'>
              sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

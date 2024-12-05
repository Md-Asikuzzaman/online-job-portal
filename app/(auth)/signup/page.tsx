'use client';

import useCreateOperation from '@/app/hooks/useCreateOperation';
import Link from 'next/link';
import { useState } from 'react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const { mutate } = useCreateOperation({
    mutationKey: 'signup',
    queryEndpoint: '/api/signup',
    successMsg: 'User created successfully',
    refreshKey: 'no',
    replacePath: '/',
  });

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      name,
      email,
      password,
      role,
    });
  };

  return (
    <div className='mx-auto flex h-screen flex-col items-center justify-center bg-gray-900'>
      <div className='max-w-[500px] bg-white p-8 space-y-2 rounded-xl'>
        <h1 className='font-bold text-3xl text-primary mb-8'>
          Create an Account
        </h1>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Username'
            className='input input-primary w-full'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='Email Address'
            className='input input-primary w-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='Password'
            className='input input-primary w-full'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            className='select select-primary w-full'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option>Role</option>
            <option value='student'>Student</option>
            <option value='company'>Company</option>
          </select>

          <button type='submit' className='btn btn-primary'>
            Sign Up
          </button>
        </form>

        <div className='pt-3'>
          <p>
            Already have an account?{' '}
            <Link href={'/signin'} className='text-primary hover:underline'>
              sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

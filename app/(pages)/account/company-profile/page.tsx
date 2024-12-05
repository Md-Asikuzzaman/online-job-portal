'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Profile = () => {
  const [phone, setPhone] = useState<string>('');
  const [resume, setResume] = useState<string>('');
  const [graduationYear, setGraduationYear] = useState<string>('');
  const [gpa, setGpa] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className='mx-auto flex h-screen flex-col items-center justify-center bg-gray-900'>
      <div className='max-w-[500px] bg-white p-8 space-y-2 rounded-xl'>
        <h1 className='font-bold text-3xl text-primary mb-8'>
          Update your Company Profile
        </h1>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Phone Number'
            className='input input-primary w-full'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type='text'
            placeholder='Resume'
            className='input input-primary w-full'
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
          <input
            type='text'
            placeholder='Graduation Year'
            className='input input-primary w-full'
            value={graduationYear}
            onChange={(e) => setGraduationYear(e.target.value)}
          />

          <input
            type='text'
            placeholder='GPA'
            className='input input-primary w-full'
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
          />

          <button className='btn btn-primary'>Update</button>
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

export default Profile;

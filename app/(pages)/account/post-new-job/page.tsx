'use client';

import useCreateOperation from '@/app/hooks/useCreateOperation';
import React, { useState } from 'react';

const PostNewJob = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [salary, setSalary] = useState<string>('');

  const { mutate } = useCreateOperation({
    mutationKey: 'post_new_job',
    queryEndpoint: '/api/jobs',
    successMsg: 'Job created successfully',
    refreshKey: 'get_jobs',
    replacePath: '/',
  });
  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ title, description, location, salary });

    // clear all field
    setTitle('');
    setDescription('');
    setLocation('');
    setSalary('');
  };
  return (
    <div className='mx-auto flex h-screen flex-col items-center justify-center bg-gray-900'>
      <div className='max-w-[500px] bg-white p-8 space-y-2 rounded-xl'>
        <h1 className='font-bold text-3xl text-primary mb-8'>Add a new job</h1>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Title'
            className='input input-primary w-full'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type='text'
            placeholder='Description'
            className='input input-primary w-full'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type='text'
            placeholder='Location'
            className='input input-primary w-full'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type='text'
            placeholder='Salary'
            className='input input-primary w-full'
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <button className='btn btn-primary'>Add</button>
        </form>
      </div>
    </div>
  );
};

export default PostNewJob;

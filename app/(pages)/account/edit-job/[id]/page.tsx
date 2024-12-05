'use client';

import useGetByIdOperation from '@/app/hooks/useGetByIdOperation';
import useUpdateByIdOperation from '@/app/hooks/useUpdateByIdOperation';
import { JobListing } from '@prisma/client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PostNewJob = () => {
  const params = useParams();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [salary, setSalary] = useState<string>('');

  const { data } = useGetByIdOperation<JobListing>({
    queryKey: 'get_job_by_id',
    id: String(params.id),
    postfix: 'job',
    queryEndpoint: '/api/jobs',
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setLocation(data.location);
      setSalary(String(data.salary));
    }
  }, [data]);

  const { mutate } = useUpdateByIdOperation({
    mutationKey: 'post_new_job',
    queryEndpoint: '/api/jobs',
    successMsg: 'Job created successfully',
    refreshKey: 'get_jobs',
    replacePath: '/',
    id: String(params.id),
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
        <h1 className='font-bold text-3xl text-primary mb-8'>Update job</h1>
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

          <button className='btn btn-primary'>Update</button>
        </form>
      </div>
    </div>
  );
};

export default PostNewJob;

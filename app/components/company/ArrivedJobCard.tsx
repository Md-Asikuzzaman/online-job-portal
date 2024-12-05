'use client';

import useCreateOperation from '@/app/hooks/useCreateOperation';
import useDeleteByIdOperation from '@/app/hooks/useDeleteByIdOperation';
import { JobListing } from '@prisma/client';

import { NextPage } from 'next';

interface Props {
  job: JobListing;
  isApplied: boolean;
}
const ArrivedJobCard: NextPage<Props> = ({ job, isApplied }) => {
  const { mutate } = useCreateOperation({
    mutationKey: 'apply',
    queryEndpoint: '/api/apply',
    refreshKey: 'get_jobs',
    replacePath: '/',
    successMsg: 'Applied Successfully!',
  });

  const { mutate: withdraw } = useDeleteByIdOperation({
    mutationKey: 'withdraw',
    queryEndpoint: '/api/apply',
    refreshKey: 'get_jobs',
    replacePath: '/',
    successMsg: 'Withdraw application!',
  });

  const handleApply = () => {
    mutate({
      job_id: job.job_id,
    });
  };

  const handleWithdraw = () => {
    withdraw(String(job.job_id));
  };

  return (
    <div className='bg-primary text-white p-5 rounded-2xl flex flex-col'>
      <div className='space-y-3 flex-1'>
        <h3 className='text-xl font-bold'>{job.title}</h3>
        <p className='text-base'>{job.description}</p>
      </div>
      <div className='mt-5 flex items-center justify-between'>
        <p className='text-lg'>💰 Salary: {job.salary}tk</p>
        <p className='text-lg'>📍 Location: {job.location}</p>
      </div>
      <div className='flex items-center gap-3 mt-4'>
        {isApplied ? (
          <button className='btn w-full bg-rose-200' onClick={handleWithdraw}>
            Withdraw Apply
          </button>
        ) : (
          <button className='btn w-full' onClick={handleApply}>
            Easy Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default ArrivedJobCard;

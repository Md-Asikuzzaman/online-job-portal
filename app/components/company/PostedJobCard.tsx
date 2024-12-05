'use client';

import useDeleteByIdOperation from '@/app/hooks/useDeleteByIdOperation';
import { JobListing } from '@prisma/client';
import { NextPage } from 'next';
import Link from 'next/link';
import { AiFillDelete } from 'react-icons/ai';

interface Props {
  job: JobListing;
}

const PostedJobCard: NextPage<Props> = ({ job }) => {
  const { mutate } = useDeleteByIdOperation({
    mutationKey: 'delete_job',
    queryEndpoint: '/api/jobs',
    refreshKey: 'get_jobs_by_id',
    replacePath: '/',
    successMsg: 'Job deleted successfully',
    errorMsg: 'Job not deleted successfully',
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      mutate(String(job.job_id));
    }
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
      {/* <p className='mt-3'>Company: ABC</p> */}
      <div className='flex items-center gap-3 mt-4'>
        <Link className='flex-1' href={`/account/edit-job/${job.job_id}`}>
          <button className='btn w-full'>Edit Job</button>
        </Link>
        <Link className='flex-1' href={`/account/applicant/${job.job_id}`}>
          <button className='btn w-full'>Applicant</button>
        </Link>
        <div
          onClick={handleDelete}
          className='bg-rose-500 p-3 rounded-full cursor-pointer'
        >
          <AiFillDelete size={20} />
        </div>
      </div>
    </div>
  );
};

export default PostedJobCard;

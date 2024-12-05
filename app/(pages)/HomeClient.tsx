'use client';

import React from 'react';
import Container from '../components/Container';
import PostedJobCard from '../components/company/PostedJobCard';
import { NextPage } from 'next';
import useGetOperation from '../hooks/useGetOperation';
import { JobListing, StudentProfile } from '@prisma/client';
import ArrivedJobCard from '../components/company/ArrivedJobCard';
import useGetByIdOperation from '../hooks/useGetByIdOperation';

interface Props {
  user: {
    user_id?: number;
    name?: string;
    email?: string;
    role?: string;
  };
}

const HomeClient: NextPage<Props> = ({ user }) => {
  // should be edited by own id
  const { data: get_jobs_by_id } = useGetByIdOperation<JobListing[]>({
    postfix: 'jobs',
    queryEndpoint: '/api/jobs/company',
    queryKey: 'get_jobs_by_id',
    id: user.role === 'company' ? String(user.user_id) : undefined,
  });

  interface Type {
    job_id: number;
    company_id: number;
    title: string;
    description: string;
    location: string;
    salary: number | null;
    created_at: Date;
    applications: {
      job_id: number;
      application_id: number;
      student_id: number;
      applied_at: Date;
      student: StudentProfile;
    }[];
  }
  const { data: get_all_jobs } = useGetOperation<Type[]>({
    postfix: 'jobs',
    queryEndpoint: '/api/jobs',
    queryKey: 'get_jobs',
  });

  console.log(get_all_jobs);

  return (
    <div>
      <Container className='py-4'>
        {user.role === 'company' && (
          <section>
            <h2 className='text-2xl font-bold mb-5'>Posted Jobs:</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {get_jobs_by_id?.map((job) => (
                <PostedJobCard key={job.job_id} job={job} />
              ))}
            </div>
          </section>
        )}
        {user.role === 'student' && (
          <section>
            <h2 className='text-2xl font-bold mb-5'>New Arrived Jobs:</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {get_all_jobs?.map((job) => {

                const isApplied = job.applications.find(
                  (app) => app.student_id === app.student.student_id
                );

                return (
                  <ArrivedJobCard
                    key={job.job_id}
                    job={job}
                    isApplied={isApplied ? true : false}
                  />
                );
              })}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
};

export default HomeClient;

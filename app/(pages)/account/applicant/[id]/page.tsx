'use client';

import Container from '@/app/components/Container';
import useGetByIdOperation from '@/app/hooks/useGetByIdOperation';
import { User } from '@prisma/client';
import { useParams } from 'next/navigation';
import React from 'react';

interface ApplicantType {
  application_id: number;
  student_id: number;
  job_id: number;
  applied_at: Date;
  job?: {
    job_id: number;
    company_id: number;
    title: string;
    description: string;
    location: string;
    salary: number | null;
    created_at: Date;
  };
  student?: {
    student_id: number;
    user_id: number;
    phone_number: string | null;
    resume: string | null;
    graduation_year: number;
    gpa: number;
    user?: User;
  };
}

const Applicant = () => {
  const params = useParams();

  const { data } = useGetByIdOperation<ApplicantType[]>({
    queryKey: 'applicant',
    queryEndpoint: '/api/applicants',
    postfix: 'applicants',
    id: String(params?.id),
  });

  console.log(data);

  return (
    <div>
      <Container>
        <h2 className='text-2xl font-bold my-5'>Applicant Lists:</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {data && data.length <= 0 ? (
            <p className='text-xl'>No Applicant (empty)</p>
          ) : (
            data?.map((applicant) => (
              <div
                key={applicant.application_id}
                className='bg-primary text-white p-5 rounded-2xl flex flex-col'
              >
                <div>
                  <div className='space-y-3 flex-1'>
                    <h3 className='text-xl font-bold'>
                      {applicant.job?.title}
                    </h3>
                    <p className='text-base'>{applicant.job?.description}</p>
                  </div>
                  <div className='mt-5 flex items-center justify-between'>
                    <p className='text-lg'>
                      💰 Salary: {applicant.job?.salary}tk
                    </p>
                    <p className='text-lg'>
                      📍 Location: {applicant.job?.location}
                    </p>
                  </div>
                </div>

                <div className='border-b border-dashed my-3' />

                <div className='flex items-center justify-between'>
                  <p className='text-lg'>
                    Username: {applicant.student?.user?.name}
                  </p>
                  <p className='text-lg'>
                    Email:{applicant.student?.user?.email}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default Applicant;

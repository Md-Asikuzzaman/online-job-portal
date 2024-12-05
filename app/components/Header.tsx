'use client';

import React, { useEffect, useState } from 'react';
import Container from './Container';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { NextPage } from 'next';

interface Props {
  user: {
    name?: string;
    email?: string;
    role?: string;
  };
}
const Header: NextPage<Props> = ({ user }) => {
  return (
    <header className='bg-primary text-white py-4'>
      <Container className='flex justify-between'>
        <Link href='/' className='text-xl font-bold'>
          Jobs Portal
        </Link>
        <ul className='flex gap-6'>
          {user.role === 'student' && (
            <li>
              <Link href='/account/user-profile'>Profile</Link>
            </li>
          )}
          {user.role === 'company' && (
            <>
              <li>
                <Link href='/account/post-new-job'>Post New Job</Link>
              </li>

              <li>
                <Link href='/account/company-profile'>Profile</Link>
              </li>
            </>
          )}

          <li
            className='cursor-pointer text-rose-300'
            onClick={() => signOut()}
          >
            Logout
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;

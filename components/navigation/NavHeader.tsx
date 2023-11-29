'use client';

import React from 'react';
import Link from 'next/link';

import { AuthButton } from '@/components/auth/AuthButton';
import { useNav } from './NavContext';

export const NavHeader = () => {
  const { showAuthButton } = useNav();

  return (
    <header className="w-full bg-gradient-to-br from-slate-600 via-slate-800 to-slate-700 text-white py-2 pl-8 pr-4 flex flex-row justify-between items-center">
      <Link href={'/'} className='text-2xl font-bold flex flex-row justify-center items-end'>
        <img src="/bitconquest-logo.png" className="mb-[7px] mr-[5px]" height={32} width={32} alt='Bit Conquest Logo' />
        <span>Bit Conquest</span>
      </Link>
      { showAuthButton && <AuthButton /> }
    </header>
  );
};

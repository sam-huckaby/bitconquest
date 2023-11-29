'use client';

import React from 'react';

import styles from './styles.module.css';

import { useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import { useNav } from './NavContext';
import { Beenhere, EmojiObjects, TableChart } from '@mui/icons-material';

export interface NavItem {
  Icon: React.ReactNode;
  label: string;
  href: string;
};

export const NavBar = () => {
  const { sideMode: mode } = useNav();
  const theme = useTheme();
  // If the screen is smaller than medium (aka 900px)
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { Icon: TableChart, label: "Dashboard", href: `/dashboard` },
    { Icon: EmojiObjects, label: "Intelligence", href: `/dashboard/intelligence` },
    { Icon: Beenhere, label: "Reliability", href: `/dashboard/reliability` },
  ];

  const showStyles = mode === "hidden" ? "hidden" : mode === "icon" ? "hidden sm:flex sm:flex-col w-[100px]" : "hidden sm:flex sm:flex-col w-[200px]";

  return (
    <div className={`${showStyles} justify-between bg-gray-300 shadow-lg dark:bg-gray-800`}>
      <div className='flex flex-col'>
      {
        menuItems.map(({ Icon, label, href }) => (
          <Link className={`
            relative flex flex-row justify-start items-center 
            pl-6 h-16 border-l-solid border-l-4 border-l-red-500
            hover:bg-gray-400 dark:hover:bg-gray-700 
            border-b border-b-gray-400/50 dark:border-b-gray-900/75`}
            key={href} href={href}>
            {<Icon className='h-[32px] w-[32px]' />}
            { (mode === 'full' && !isSmall) && <span className='ml-2'>{label}</span> }
          </Link>
        ))
      }
      </div>
    </div>
  );
};

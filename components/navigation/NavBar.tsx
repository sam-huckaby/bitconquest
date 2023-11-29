'use client';

import React from 'react';

import styles from './styles.module.css';

import { useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import { useNav } from './NavContext';

export const NavBar = () => {
  const { sideMode } = useNav();
  const theme = useTheme();
  // If the screen is smaller than medium (aka 900px)
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { label: "Dashboard", href: `/dashboard` },
    { label: "Intelligence", href: `/dashboard/intelligence` },
    { label: "Reliability", href: `/dashboard/reliability` },
  ];

  const showStyles = sideMode === "hidden" ? "hidden" : sideMode === "icon" ? "hidden sm:flex sm:flex-col w-[75px]" : "hidden sm:flex sm:flex-col w-[250px]";

  return (
    <div className={`${showStyles} bg-gray-300 shadow-lg dark:bg-gray-800`}>
      {
        menuItems.map(({ label, href }) => <Link className={`relative flex flex-row justify-center items-center h-16 hover:bg-gray-400 dark:hover:bg-gray-700 border-b border-b-gray-400/50 dark:border-b-gray-900/75`} key={href} href={href}>{label}</Link>)
      }
    </div>
  );
};

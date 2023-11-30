import { DomainDialogProvider } from '@/components/dashboard/DomainDialogContext';
import { NavBar } from '@/components/navigation/NavBar';
import React from 'react';

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-row h-[calc(100dvh-72px)] overflow-hidden">
      <DomainDialogProvider>
        <NavBar />
        <div className='w-full h-full max-h-full p-8 overflow-scroll'>
          {children}
        </div>
      </DomainDialogProvider>
    </div>
  );
};

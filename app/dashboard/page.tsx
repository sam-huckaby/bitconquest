import React from 'react';

import { VerifiedDomains } from '@/components/dashboard/VerifiedDomains';
import { DomainCollection } from '@/components/dashboard/DomainCollection';

interface DashboardProps {
  params: { code: string }
  searchParams: { [key: string]: string | string[] | undefined }
};

export default async function Dashboard({ searchParams }: DashboardProps) {

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className='text-3xl font-bold mb-2'>My Dashboard</h1>
      <VerifiedDomains />
      <DomainCollection />
    </div>
  );
};

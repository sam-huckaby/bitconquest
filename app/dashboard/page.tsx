import React from 'react';

interface DashboardProps {
  params: { code: string }
  searchParams: { [key: string]: string | string[] | undefined }
};

export default async function Dashboard({ searchParams }: DashboardProps) {
  return <div>INFOSEC</div>;
};

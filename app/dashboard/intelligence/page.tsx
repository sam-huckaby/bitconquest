import React from 'react';

interface IntelligenceProps {
  params: { code: string }
  searchParams: { [key: string]: string | string[] | undefined }
};

export default async function Intelligence({ searchParams }: IntelligenceProps) {
  return (
    <div className="flex flex-col justify-start items-center">
      <h1 className='text-3xl font-bold'>Intelligence</h1>
    </div>
  );
};

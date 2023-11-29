import React from 'react';

interface ReliabilityProps {
  params: { code: string }
  searchParams: { [key: string]: string | string[] | undefined }
};

export default async function Reliability({ searchParams }: ReliabilityProps) {
  return (
    <div className="flex flex-col justify-start items-center">
      <h1 className='text-3xl font-bold'>Reliability</h1>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { Button } from "@mui/material";
import { PropertyDialog } from './PropertyDialog';

interface DomainAdderProps {
  verifier: string;
  domain?: string;
};

export const DomainAdder = ({ verifier, domain }: DomainAdderProps) => {
  const [adderOpen, setAdderOpen] = useState(false);

  return (
    <>
      <Button className="mx-auto block p-2 rounded" onClick={() => setAdderOpen(true)}>Activate New Property</Button>
      <PropertyDialog verifier={verifier} domain={domain} open={adderOpen} onClose={() => setAdderOpen(false)} />
    </>
  );
};

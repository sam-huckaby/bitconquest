'use client';

import React, { createContext, useContext, useState } from 'react';
import { Domain } from '@/types/types';

interface DomainContextProps {
  closeDomainEditor: () => void;
  open: boolean;
  openDomainEditor: (domain: Domain | null) => void;
  selectedDomain: Domain | null;
}

const DomainDialogContext = createContext<DomainContextProps | undefined>(undefined);

export const DomainDialogProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);

  const openDomainEditor = (domain: Domain | null) => {
    setSelectedDomain(domain);
    setOpen(true);
  };

  const closeDomainEditor = () => {
    setSelectedDomain(null);
    setOpen(false);
  };

  return (
    <DomainDialogContext.Provider value={{ closeDomainEditor, open, openDomainEditor, selectedDomain }}>
      {children}
    </DomainDialogContext.Provider>
  );
};

export const useDomainDialog = () => {
  const context = useContext(DomainDialogContext);
  if (context === undefined) {
    throw new Error('useDomainDialog must be used within a DomainDialogProvider');
  }
  return context;
};

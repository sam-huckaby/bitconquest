'use client';

import React, { createContext, useContext, useState } from 'react';

export type TopNavMode = "hidden" | "full";
export type SideNavMode = "hidden" | "icon" | "full";

interface NavContextProps {
  topMode: TopNavMode;
	setTopMode: (newMode: TopNavMode) => void;
  sideMode: SideNavMode;
	setSideMode: (newMode: SideNavMode) => void;
	showAuthButton: boolean;
	setShowAuthButton: (showAuth: boolean) => void;
}

const NavContext = createContext<NavContextProps | undefined>(undefined);

export const NavProvider = ({ children }: {
  children: React.ReactNode
}): React.ReactNode => {
  const [topMode, setTopMode] = useState<TopNavMode>("full");
  const [sideMode, setSideMode] = useState<SideNavMode>("icon");
	const [showAuthButton, setShowAuthButton] = useState<boolean>(true);

  return <NavContext.Provider value={{ topMode, setTopMode, sideMode, setSideMode, showAuthButton, setShowAuthButton }}>
    {children}
  </NavContext.Provider>;
};

export const useNav = () => {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error('useNav must be used within a NavProvider');
  }
  return context;
};


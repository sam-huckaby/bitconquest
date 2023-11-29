'use client';

import { useNav } from '@/components/navigation/NavContext';
import React, { useEffect } from 'react';

export default function({
	children,
}: {
	children: React.ReactNode
}) {
  const { setShowAuthButton } = useNav();

  useEffect(() => {
    setShowAuthButton(true);
	}, []);

	return <>
		{children}
	</>;
}

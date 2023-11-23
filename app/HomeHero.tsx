'use client';

import React, { useEffect, useState } from "react";

export const HomeHero = () => {
  const [heroHeight, setHeroHeight] = useState(318);

  useEffect(() => {
    const handleScroll = () => {
        const newHeight = Math.max(100, 318 - window.scrollY);
        setHeroHeight(newHeight);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <div className="hero-container flex flex-row" style={{ height: `${heroHeight}px` }}>
      <div className="bg-[length:350px_318px] w-[350px] h-[318px]" style={{ backgroundImage: 'url(whnvr-domaincard.png)' }}></div>
      <div className="bg-[length:350px_318px] w-[350px] h-[318px]" style={{ backgroundImage: 'url(samhuckaby-domaincard.png)' }}></div>
      <div className="bg-[length:350px_318px] w-[350px] h-[318px]" style={{ backgroundImage: 'url(bitconquest-domaincard.png)' }}></div>
    </div>
  );
};

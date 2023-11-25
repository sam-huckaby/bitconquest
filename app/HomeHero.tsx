'use client';

import React, { useEffect, useState } from "react";

export const HomeHero = () => {
  const [heroHeight, setHeroHeight] = useState(318);

  useEffect(() => {
    const handleScroll = () => {
    // Calculate the distance from the bottom of the page
        const scrollPosition = window.scrollY + window.innerHeight;
        const bottomDistance = document.body.offsetHeight - scrollPosition;

        // Set a threshold, e.g., 100 pixels or the height of your footer
        const threshold = 100;

        if (bottomDistance > threshold) {
            const newHeight = Math.max(100, 318 - window.scrollY);
            setHeroHeight(newHeight);
        }

        //const newHeight = Math.max(100, 318 - window.scrollY);
        //setHeroHeight(newHeight);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <div className="hero-container flex flex-row justify-between w-full overflow-hidden" style={{ height: `${heroHeight}px` }}>
      <img width={350} height={318} className="hidden sm:block absolute top-48 left-12 -rotate-12 z-[-2] shadow-md shadow-black" alt="Conquest Card for whnvr.com" src="whnvr-domaincard.png" />
      <img width={350} height={318} className="absolute top-32 left-[calc(50%-175px)] z-[-1] shadow-md shadow-black" alt="Conquest Card for bitconquest.com" src="bitconquest-domaincard.png" />
      <img width={350} height={318} className="hidden sm:block absolute top-48 right-12 rotate-12 z-[-2] shadow-md shadow-black" alt="Conquest Card for samhuckaby.com" src="samhuckaby-domaincard.png" />
    </div>
  );
};

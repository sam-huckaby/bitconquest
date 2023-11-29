'use client';

import React from "react";

export const HomeHero = () => {
  // This component used to have a parallax effect, but I broke it and I was on the fence about it to begin with, so I just removed it for now

  return (
    <div className="hero-container flex flex-row justify-between w-full overflow-hidden h-[318px]">
      <img width={350} height={318} className="hidden sm:block absolute top-48 left-12 -rotate-12 z-[-2] drop-shadow-[8px_4px_8px_rgba(0,0,0,0.3)]" alt="Conquest Card for whnvr.com" src="whnvr-domaincard.png" />
      <img width={350} height={318} className="absolute top-32 left-[calc(50%-175px)] z-[-1] drop-shadow-[8px_2px_8px_rgba(0,0,0,0.3)]" alt="Conquest Card for bitconquest.com" src="bitconquest-domaincard.png" />
      <img width={350} height={318} className="hidden sm:block absolute top-48 right-12 rotate-12 z-[-2] drop-shadow-[8px_0px_8px_rgba(0,0,0,0.3)]" alt="Conquest Card for samhuckaby.com" src="samhuckaby-domaincard.png" />
    </div>
  );
};

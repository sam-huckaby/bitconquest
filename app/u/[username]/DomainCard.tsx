'use client';

import { useEffect, useState } from "react";
import { tldToColorScheme } from "@/utils/art/coordination";
import { VerifyMark } from "@/components/domain/VerifyMark";
import { useAuth } from "@/components/auth/AuthContext";

export interface DomainCardProps {
  domain: string;
  flair: string;
  ownerView: boolean;
  score: number;
  tld: string;
  verified: boolean;
  verifier: string;
};

export const DomainCard = ({ domain, flair, ownerView, score, tld, verified, verifier }: DomainCardProps) => {
  const { background, separator, text, badge } = tldToColorScheme(tld);
  const [ editOpen, setEditOpen ] = useState(false);
  const { supabase } = useAuth();

  useEffect(() => {
    // If this domain has already been verified, don't allow the client to reverify it
    if( verified ) return;

    // On each page load, check to see if the domain is verified?
    const lookUpDomain = async () => {
      // Tried to use a server action and it just exploded. I'll revisit this later
      const { validated: isValid } = await (await fetch(`/api/lookup/${domain}/${tld}?key=${verifier}`, { next: { revalidate: 15 } })).json();

      // TODO: If the verified state has changed, initialize and update Supabase
      if (isValid) {
        await supabase.from('domains').update({ verified: isValid }).eq('hostname', domain).eq('tld', tld).select();
      }
    };

    if (ownerView) lookUpDomain();
  }, [domain, ownerView, tld, verified, verifier, supabase]);

  return (
    <div id={`${domain}-${tld}`} className={`relative ${background} w-[350px] rounded-lg shadow-lg p-4 flex flex-col items-center`}>
      <span className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl flex flex-row items-center justify-center w-full">
        <VerifyMark hostname={domain} tld={tld} verified={verified} />
        <span className="truncate" title={domain}>{domain}</span>
        <span className={`${text} ${badge} text-lg rounded-full ml-2 py-1 px-3 tracking-wide`}>.{tld}</span>
      </span>
      <div className={`h-1 w-16 ${separator} mt-2 mb-4`} />
      <img className="w-[300px] h-[150px]" src={flair} alt={`Flair for ${domain}.${tld}`} />
      <div className={`h-1 w-16 ${separator} mt-2 mb-4`} />
      <p className="mt-4 font-bold text-zinc-500 md:text-lg lg:text-base xl:text-lg dark:text-zinc-300">Score: {score}</p>
    </div>
  );
}

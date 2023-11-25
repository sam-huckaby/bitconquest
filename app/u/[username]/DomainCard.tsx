'use client';

import { Receipt as ReceiptIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { DomainDialog } from "./DomainDialog";
import { tldToColorScheme } from "@/utils/art/coordination";
import { createClient } from "@/utils/supabase/client";
import { VerifyMark } from "@/components/domain/VerifyMark";

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
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    // On each page load, check to see if the domain is verified?
    const lookUpDomain = async () => {
      // Tried to use a server action and it just exploded. I'll revisit this later
      const { validated: isValid } = await (await fetch(`/api/lookup/${domain}/${tld}?key=${verifier}`, { next: { revalidate: 15 } })).json();

      // TODO: If the verified state has changed, initialize and update Supabase
      if (isValid !== verified) {
        const supabase = createClient();
        await supabase.from('domains').update({ verified: isValid }).eq('hostname', domain).eq('tld', tld).select();
      }
    };

    if (ownerView) lookUpDomain();
  }, [domain, ownerView, tld, verified, verifier]);

  return (
    <div id={`${domain}-${tld}`} className={`relative ${background} min-w-[350px] rounded-lg shadow-lg p-4 flex flex-col items-center`}>
      <span className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl flex items-center">
        <VerifyMark hostname={domain} tld={tld} verified={verified} />
        {domain}<span className={`${text} ${badge} text-lg rounded-full ml-2 py-1 px-3 tracking-wide`}>.{tld}</span>
      </span>
      <div className={`h-1 w-16 ${separator} mt-2 mb-4`} />
      <img className="w-[300px] h-[150px]" src={flair} alt={`Flair for ${domain}.${tld}`} />
      <div className={`h-1 w-16 ${separator} mt-2 mb-4`} />
      <p className="mt-4 font-bold text-zinc-500 md:text-lg lg:text-base xl:text-lg dark:text-zinc-300">Score: {score}</p>
      {
        ownerView && <>
          <IconButton className="bg-black/25 absolute bottom-0 right-0 rounded-none rounded-br p-4 text-white" onClick={() => setEditOpen(true)}><ReceiptIcon /></IconButton>
          <DomainDialog open={editOpen} onClose={() => setEditOpen(false)} domain={`${domain}.${tld}`} verifier={verifier} />
        </>
      }
    </div>
  );
}


import { DomainCard } from './DomainCard';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { DomainAddButton } from './DomainAddButton';
import { CopyToClipboardButton } from '@/components/common/CopyToClipboardButton';
import { VERIFICATION_BASE } from '@/utils/verification/constants';

interface ProfileProps {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
};

export default async function Profile({
  params,
  searchParams,
}: ProfileProps) {
  // Server-side Supabase setup
  const cookieStore = cookies()
  const supabase = createClient(cookieStore);

  // Determine whether this is the current user's profile
  const { data: { user } } = await supabase.auth.getUser();
  const { username } = params;
  const isMyCollection = username === user?.user_metadata.preferred_username;
  const verifier = `${VERIFICATION_BASE}${user?.id}`;

  // Retrieve all domains associated with the current page's username
  let { data: domains, error } = await supabase
  .from('domains')
  .select(`
    hostname,
    tld,
    verifier,
    flair,
    score,
    verified,
    profiles!inner (
      user_id,
      nickname
    )
  `).eq('profiles.nickname', username)
  .order('hostname', { ascending: true });

  const hasDomains = domains && domains.length > 0;

  return (
    <main className="w-full flex flex-col items-center">
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl py-4">{isMyCollection ? "My domains" : `${username}'s domains`}</h1>
        <div className="relative p-1 pl-2 pt-4 flex flex-row items-center justify-between bg-gray-500 font-bold rounded mb-4">
          <span className='absolute top-0 left-2'>Your personal verification code:</span>
          <p className='text-sm text-black'>{verifier}</p>
          <CopyToClipboardButton valueToCopy={verifier} />
        </div>
      { isMyCollection && <DomainAddButton verifier={verifier} /> }
      <section className="flex flex-col py-4">
        <div className="w-full container flex flex-row flex-wrap gap-4 px-4 justify-center md:gap-8 md:px-6 lg:gap-10">
          { !hasDomains && <><div></div><div className="p-24 w-full flex flex-row justify-center items-center text-gray-500/50"><p>Well, this is awkward</p></div></> }
          {
            domains?.map(({ hostname, flair, score, tld, verified, verifier }) => <DomainCard key={`${hostname}.${tld}`} domain={hostname} flair={flair} score={score} tld={tld} verified={verified} verifier={verifier} ownerView={isMyCollection} />)
          }
        </div>
      </section>
    </main>
  )
}


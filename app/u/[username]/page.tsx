import { NextResponse } from 'next/server'
import { promises as dns } from 'dns';
import whois from 'whois';

import { DomainCard } from './PropertyDeed';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { DomainAddButton } from './DomainAddButton';

const lookupWhois = (domain: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    whois.lookup(domain, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Name Value (how many letters less than 10 does it have in the name)
const nValue = (name: string): number => {
  return (name.length >= 20) ? 0 : 20 - name.length;
};

// The length of time between when domains became available and when this domain was first registered
const zValue = (registeredDate: string): number => {
  // First domain registered: March 15, 1985 (Symbolics.com)
  const inputDate = new Date(registeredDate);
  const comparisonDate = new Date('1985-03-15T00:00:00.00Z');

  const diffInMilliseconds = inputDate.getTime() - comparisonDate.getTime();
  const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // Average considering leap years

  return Math.abs(diffInYears); // Return the aproximate 
};

async function lookup(domain: string, tld: string, validationKey: string) {
  if (typeof domain !== 'string' || typeof tld !== 'string') {
    throw 'Invalid domain or TLD';
  }

  try {
    const fullDomain = `${domain}.${tld}`;

    // Get TXT records
    const txtRecords = [];

    try {
      txtRecords.push(await dns.resolveTxt(fullDomain));
    } catch (e) {
      // No logging here because it will be hit a lot
    }

    let validated = false;
    for (let i = 0; i < txtRecords.length; i++) {
      if (txtRecords[i][0][0] === validationKey) {
        validated = true;
        break;
      }
    }

    // Get WHOIS data
    const whoisData: any = await lookupWhois(fullDomain);
    // Store the formatted WHOIS data
    const result: Record<string, string> = {};
    // Format the WHOIS data into something usable
    whoisData.split('\n').forEach((item: string) => {
      const [key, value] = item.split(': ');
      result[key] = value;
    });
    // Grab the date the domain came into existence
    const creationDate = result["Creation Date"] //.creationDate;

    // Calculate a completely unbiased score that will determine how awesome a domain is
    const score = Math.round(nValue(domain) + zValue(creationDate));

    // Respond with both TXT records and registration date
    return Response.json({
      domain: fullDomain,
      score,
      txtRecords,
      creationDate,
      validated,
    });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

interface ProfileProps {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
};

export default async function Profile({
  params,
  searchParams,
}: ProfileProps) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
  console.log(user?.user_metadata.preferred_username);
  const { username } = params;

  const isMyCollection = username === user?.user_metadata.preferred_username;

  const { domain, score, txtRecords, creationDate, validated } = await (await lookup('bitconquest', 'com', 'bitconquest-verifier=THISISAREALLYSPECIFICVALUE')).json();

  return (
    <main className="w-full flex flex-col items-center">
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl md:text-4xl py-4">{isMyCollection ? "My domains" : `${username}'s domains`}</h1>
      { isMyCollection && <DomainAddButton /> }
      <section className="w-full py-4">
        <div className="container grid grid-cols-3 gap-4 px-4 text-center md:gap-8 md:px-6 lg:gap-10">
          <DomainCard domain='bitconquest' tld='com' score={score} validated={validated} ownerView={isMyCollection} />
          <DomainCard domain='Example' tld='org' score={80} validated={false} ownerView={isMyCollection} />
          <DomainCard domain='my-example' tld='net' score={90} validated={false} ownerView={isMyCollection} />
          <DomainCard domain='Example' tld='io' score={90} validated={false} ownerView={isMyCollection} />
        </div>
      </section>
    </main>
  )
}

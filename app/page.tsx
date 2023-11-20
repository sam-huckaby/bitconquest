'use client';
import { LeaderPanel } from '@/components/leaderboard/LeaderPanel';
import { createClient } from '@/utils/supabase/client';

interface HomeProps {
  params: { code: string }
  searchParams: { [key: string]: string | string[] | undefined }
};

export default function Home({ searchParams }: HomeProps) {
  const supabase = createClient();

  if ( searchParams.code && typeof searchParams.code === 'string' ) {
    supabase.auth.exchangeCodeForSession(searchParams.code);
  }

  const leaders = [
  { user_name: "Big Al", stockpile_score: 4313 },
  { user_name: "Roger That", stockpile_score: 4180 },
  { user_name: "Spoon", stockpile_score: 3901 },
  { user_name: "ajhks420", stockpile_score: 3512 },
  { user_name: "undefined", stockpile_score: 3499 },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-24 py-16">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className='text-4xl italic'>Bit Conquest</h1>
      </div>


      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <h2 className='text-3xl bold underline'>Leaderboard</h2>
      </div>

      {
        leaders.map(({user_name, stockpile_score }) => <LeaderPanel key={user_name} user={user_name} score={stockpile_score} />)
      }
    </main>
  )
}

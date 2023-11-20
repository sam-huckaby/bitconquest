'use client';
import { createBrowserClient } from '@supabase/ssr';

interface HomeProps {
  params: { code: string }
  searchParams: { [key: string]: string | string[] | undefined }
};

export default function Home({ params, searchParams }: HomeProps) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  if ( searchParams.code && typeof searchParams.code === 'string' ) {
    supabase.auth.exchangeCodeForSession(searchParams.code);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-24 py-16">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className='text-4xl italic'>Bit Conquest</h1>
      </div>


      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <h2 className='text-3xl bold underline'>Leaderboard</h2>
      </div>
    </main>
  )
}

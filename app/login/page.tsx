'use client';

import { createClient } from '@/utils/supabase/client';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useSearchParams } from 'next/navigation';

export default function Login() {
  const supabase = createClient();
  const searchParams = useSearchParams()
 
  const nextRoute = searchParams.get('next') ?? '/';
  const isSignup = (searchParams.get('signup') ?? false) === 'true';

  const signInWithGithub = async () => {
    const redirectTo = isSignup ? `${process.env.NEXT_PUBLIC_ROOT_URL}/auth/callback?signup=true` : `${process.env.NEXT_PUBLIC_ROOT_URL}/auth/callback?next=${encodeURIComponent(nextRoute)}`;

    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo,
      },
    });
  }

  return (
    <main className="absolute z-10 top-0 right-0 bottom-0 left-0 flex min-h-full flex-col items-center justify-center p-24 bottom-background">
      <img src='/bitconquest-logo.png' alt='Bit Conquest Logo' width={100} height={100} />
      <p className='p-4 font-mono'>Login however you want, as long as it&apos;s with GitHub</p>
      <Button className='bg-gray-900 text-white hover:bg-gray-700 dark:border-white dark:border dark:border-solid' onClick={signInWithGithub}>
        <GitHubIcon className='mr-2' /> Login With GitHub
      </Button>
    </main>
  )
}

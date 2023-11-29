'use client';

import { useNav } from '@/components/navigation/NavContext';
import { createClient } from '@/utils/supabase/client';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const { setShowAuthButton } = useNav();

  const supabase = createClient();
  const searchParams = useSearchParams();
 
  useEffect(() => {
    setShowAuthButton(false);
  }, []);

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
    <main className="flex min-h-full flex-col items-center justify-center p-24 bottom-background">
      <img src='/bitconquest-logo.png' alt='Bit Conquest Logo' width={100} height={100} />
      <p className='p-4 font-mono'>Login however you want, as long as it&apos;s with GitHub</p>
      <Button className='bg-gray-900 text-white hover:bg-gray-700 dark:border-white dark:border dark:border-solid' onClick={signInWithGithub}>
        <GitHubIcon className='mr-2' /> Login With GitHub
      </Button>
    </main>
  )
}

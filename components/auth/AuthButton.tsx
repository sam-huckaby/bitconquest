import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import ProfileButton from './ProfileButton'
import { Button } from '@mui/material'
import { Login as LoginIcon } from '@mui/icons-material'

export const AuthButton = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <ProfileButton user={user} />
  ) : (
    <Button
      href="/login"
      className="py-2 px-4 flex flex-row justify-center items-center rounded-md no-underline text-white hover:bg-gray-800/50"
    >
      Login<LoginIcon />
    </Button>
  )
}


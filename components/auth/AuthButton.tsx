import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import ProfileButton from './ProfileButton'

export const AuthButton = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <ProfileButton user={user} />
  ) : (
    <Link
      href="/login"
      className="py-2 px-4 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  )
}


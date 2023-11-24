'use client';

import ProfileButton from './ProfileButton'
import { Button } from '@mui/material'
import { Login as LoginIcon } from '@mui/icons-material'
import { useAuth } from './AuthContext'

export const AuthButton = () => {
  const { user } = useAuth();
  
  return user ? (
    <ProfileButton />
  ) : (
    <Button
      href="/login"
      className="py-2 px-4 flex flex-row justify-center items-center rounded-md no-underline text-white hover:bg-gray-800/50"
    >
      Login<LoginIcon />
    </Button>
  )
}


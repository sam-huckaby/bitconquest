'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { VERIFICATION_BASE } from '@/utils/verification/constants';

interface AuthContextProps {
  supabase: SupabaseClient;
  user?: User;
  verifier: string;
  avatar: string | undefined;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: {
  children: React.ReactNode
}): React.ReactNode => {
  const supabase = createClient();
  const [client] = useState<SupabaseClient>(supabase);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [verifier, setVerifier] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await client.auth.getSession();
      const user = session?.user;
      setUser(user);
      setAvatar(user?.user_metadata.avatar_url);
      setVerifier(`${VERIFICATION_BASE}${user?.id}`);
    };

    fetchUser();
  }, [client]);

  const signOut = async () => {
    await client.auth.signOut();
    setUser(undefined);
    setAvatar(undefined);
  };

  return <AuthContext.Provider value={{ supabase: client, user, avatar, signOut, verifier }}>
    {children}
  </AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


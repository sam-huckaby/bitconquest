import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/auth/AuthContext';
import { StyledEngineProvider } from '@mui/material';
import { NavProvider } from '@/components/navigation/NavContext';
import { NavHeader } from '@/components/navigation/NavHeader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bit Conquest',
  description: 'Showcase your domain collection!',
  metadataBase: new URL(process.env.NEXT_PUBLIC_ROOT_URL ?? ''),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-h-[calc(100dvh)] h-[calc(100dvh)]`}>
        <StyledEngineProvider injectFirst>
          <AuthProvider>
            <NavProvider>
              <NavHeader />
              { children }
            </NavProvider>
          </AuthProvider>
        </StyledEngineProvider>
      </body>
    </html>
  )
}

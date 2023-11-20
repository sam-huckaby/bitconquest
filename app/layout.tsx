import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ProfileButton from '@/components/auth/ProfileButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bit Conquest',
  description: 'A place to showcase your property collection',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="w-full bg-gradient-to-br from-green-600 via-green-800 to-green-700 text-white py-6 text-center relative">
          <ProfileButton />
        </header>
        {children}
      </body>
    </html>
  )
}

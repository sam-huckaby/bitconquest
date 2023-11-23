import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthButton } from '@/components/auth/AuthButton';
import Link from 'next/link';

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
      <body className={`${inter.className} pt-[72px]`}>
        <header className="fixed top-0 z-10 w-full bg-gradient-to-br from-green-600 via-green-800 to-green-700 text-white py-2 pl-8 pr-4 flex flex-row justify-between items-center">
          <Link href={'/'} className='text-2xl font-bold'>Bit Conquest</Link>
          <AuthButton />
        </header>
        {children}
      </body>
    </html>
  )
}

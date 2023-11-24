import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthButton } from '@/components/auth/AuthButton';
import Link from 'next/link';
import { AuthProvider } from '@/components/auth/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bit Conquest',
  description: 'Showcase your domain collection!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} pt-[72px]`}>
        <AuthProvider>
          <header className="fixed top-0 z-10 w-full bg-gradient-to-br from-slate-600 via-slate-800 to-slate-700 text-white py-2 pl-8 pr-4 flex flex-row justify-between items-center">
            <Link href={'/'} className='text-2xl font-bold flex flex-row justify-center items-end'>
              <img src='/bitconquest-logo.png' className='mb-[7px] mr-[5px]' height={32} width={32} alt='Bit Conquest Logo' />
              <span>Bit Conquest</span>
            </Link>
            <AuthButton />
          </header>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

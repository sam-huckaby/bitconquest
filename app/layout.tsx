import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bit Conquest',
  description: 'A place to showcase your property collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="w-full bg-gradient-to-br from-green-600 via-green-800 to-green-700 text-white py-6 text-center relative">
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center">
            <span className="text-lg font-medium mr-3">Username</span>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <svg
                className=" text-gray-800"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}

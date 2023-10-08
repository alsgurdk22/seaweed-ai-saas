import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import ToasterContext from '@/app/context/toaster-context';
import AuthContext from '@/app/context/auth-context';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Seaweed Ai',
  description: 'AI Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}

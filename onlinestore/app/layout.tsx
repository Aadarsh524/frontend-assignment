"use client"

import './globals.css'
// import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from '@/components/Header';
import { RecoilRoot } from 'recoil';

// Import the Inter font with the 'latin' subset

// Create a new instance of the QueryClient
const queryClient = new QueryClient();

const font = Figtree({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Online Store',
//   description: 'Ecommerce web app',
// }



// Define the RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RecoilRoot>
          <Header />
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </RecoilRoot>
      </body>
    </html>
  )
}

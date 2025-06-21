// src/app/layout.tsx
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
// import Footer from '@components/Footer'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FitFusion AI',
  description: 'Your Personalized AI Health & Fitness Coach',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="min-h-screen bg-gray-200 text-gray-800 px-4 sm:px-8">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}

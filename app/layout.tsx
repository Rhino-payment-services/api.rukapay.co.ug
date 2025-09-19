import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rukapay API Documentation',
  description: 'Comprehensive API documentation for Rukapay payment platform. Integrate with our wallet, transaction, and financial services APIs.',
  keywords: 'Rukapay, API, documentation, payment, wallet, fintech, Uganda, mobile money',
  authors: [{ name: 'Rukapay Team' }],
  openGraph: {
    title: 'Rukapay API Documentation',
    description: 'Comprehensive API documentation for Rukapay payment platform',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rukapay API Documentation',
    description: 'Comprehensive API documentation for Rukapay payment platform',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
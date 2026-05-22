import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'RukaPay — Payment APIs',
    template: '%s | RukaPay Docs',
  },
  description:
    'RukaPay Gateway API documentation. process-transfer for MNO collections, payouts, bank transfers, bill payments, and airtime. From rdbs_core Gateway API.',
  keywords: [
    'RukaPay',
    'payment API',
    'mobile money',
    'MTN',
    'Airtel',
    'collections',
    'payouts',
    'fintech',
    'Uganda',
  ],
  authors: [{ name: 'RukaPay Team' }],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'RukaPay Payment API Documentation',
    description:
      'Secure payment APIs for businesses to collect payments, process payouts, and manage transactions.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

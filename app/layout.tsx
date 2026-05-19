import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: {
    default: 'HostPro Reviews — Best Web Hosting Compared',
    template: '%s | HostPro Reviews',
  },
  description: 'Unbiased web hosting reviews, comparisons, and tutorials. Find the best hosting for your blog or business in 2026.',
  keywords: ['web hosting', 'best web hosting', 'hosting review', 'hostinger review', 'bluehost review'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hostproreviews.com',
    siteName: 'HostPro Reviews',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'impact-site-verification': '7b833ebb-f617-4e50-950a-65585e101f5c',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}


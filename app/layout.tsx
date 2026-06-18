import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Script from 'next/script'
import { generateWebsiteSchema, SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'bunyamin.oztoprak74@gmail.com',
    contactType: 'customer support',
  },
  sameAs: [],
}

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Web Hosting Reviews 2026 - Tested & Unbiased Provider Comparisons',
    template: '%s | HostPro Reviews',
  },
  description: 'Expert-tested reviews of leading web hosting providers. Compare performance, price & support to find your perfect host.',
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
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteSchema()) }}
        />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}


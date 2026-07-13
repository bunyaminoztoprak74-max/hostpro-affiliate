import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AffiliateClickTracker from '@/components/AffiliateClickTracker'
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Web Hosting Reviews 2026 — 12 Hosts Tested for Uptime, Speed & Real Price',
    template: '%s | HostPro Reviews',
  },
  description: 'We tested 12 web hosts for 6 months: real uptime data, TTFB, support speed, and renewal costs. Hostinger leads at $2.99/mo. Compare all hosts before you buy.',
  keywords: ['web hosting reviews 2026', 'best web hosting', 'hosting comparison', 'hostinger review', 'siteground review', 'web hosting comparison'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.hostproreviews.com',
    siteName: 'HostPro Reviews',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'HostPro Reviews' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/logo.png'],
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
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3MKF850LDJ"
          strategy="afterInteractive"
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-3MKF850LDJ');",
          }}
        />
        <AffiliateClickTracker />
        <script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteSchema()) }}
        />
        <script
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

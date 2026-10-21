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
    email: 'editor@hostproreviews.com',
    contactType: 'customer support',
  },
}

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'HostPro Reviews: Independent Hosting & Software Reviews (2026)',
    template: '%s | HostPro Reviews',
  },
  description: 'Independent reviews and comparisons of web hosting, WordPress hosting, gaming network boosters, PC utilities and creative software. See who each product suits and check current pricing with each vendor.',
  keywords: ['web hosting reviews', 'wordpress hosting', 'hosting comparison', 'software reviews', 'game booster comparison'],
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
  verification: {
    yandex: 'cb99c53984cbc5d1',
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

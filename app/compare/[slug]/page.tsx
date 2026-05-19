import { getComparisonBySlug, getAllComparisonSlugs } from '@/lib/comparisons'
import { generateFAQSchema, generateBreadcrumbSchema, SITE_URL, SITE_NAME } from '@/lib/seo'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import ComparisonHero from '@/components/ComparisonHero'
import PricingBlock from '@/components/PricingBlock'
import HostingComparisonTable from '@/components/HostingComparisonTable'
import SpeedScore from '@/components/SpeedScore'
import ProsConsCard from '@/components/ProsConsCard'
import AffiliateCTA from '@/components/AffiliateCTA'
import FAQSection from '@/components/FAQSection'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const comparison = getComparisonBySlug(slug)
  if (!comparison) return { title: 'Comparison Not Found' }

  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      type: 'article',
      publishedTime: comparison.lastUpdated,
      url: `${SITE_URL}/compare/${slug}`,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: comparison.metaTitle,
      description: comparison.metaDescription,
    },
    alternates: {
      canonical: `${SITE_URL}/compare/${slug}`,
    },
  }
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params
  const comparison = getComparisonBySlug(slug)
  if (!comparison) notFound()

  const { host1, host2, winner, winnerReason, faqs } = comparison

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: comparison.title,
    description: comparison.metaDescription,
    itemListElement: [host1, host2].map((host, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: `${host.name} Web Hosting`,
        url: host.affiliateUrl,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: host.rating,
          bestRating: 5,
          worstRating: 1,
          reviewCount: 1,
        },
        offers: {
          '@type': 'Offer',
          price: host.introPrice.replace('$', ''),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  }

  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Compare', url: `${SITE_URL}/compare` },
    { name: comparison.title, url: `${SITE_URL}/compare/${slug}` },
  ])

  const schemas: object[] = [itemListSchema, faqSchema, breadcrumbSchema]

  return (
    <>
      {schemas.map((schema, i) => (
        <Script
          key={i}
          id={`schema-compare-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-indigo-600 transition-colors">Comparisons</Link>
          <span>/</span>
          <span className="text-gray-600 truncate">{comparison.title}</span>
        </nav>
      </div>

      <ComparisonHero comparison={comparison} />

      <PricingBlock host1={host1} host2={host2} winner={winner} />

      <HostingComparisonTable
        rows={comparison.tableRows}
        host1Name={host1.name}
        host2Name={host2.name}
        winner={winner}
      />

      <SpeedScore host1={host1} host2={host2} />

      {/* Pros & Cons */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
            Pros &amp; Cons
          </h2>
          <div className="space-y-6">
            <ProsConsCard host={host1} />
            <ProsConsCard host={host2} />
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-5">Our Verdict</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{comparison.verdict}</p>
          <p className="text-xs text-gray-400 mt-6">
            Last updated:{' '}
            {new Date(comparison.lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </section>

      <AffiliateCTA host1={host1} host2={host2} winner={winner} winnerReason={winnerReason} />

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection faqs={faqs} />
        </div>
      </section>

      {/* Back to comparisons */}
      <div className="py-10 bg-gray-50 text-center border-t border-gray-100">
        <Link href="/compare" className="btn-secondary">
          ← View All Comparisons
        </Link>
      </div>
    </>
  )
}

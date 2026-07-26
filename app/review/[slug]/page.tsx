import { getHostBySlug, getAllHostSlugs, hosts } from '@/lib/hosts'
import { generateBreadcrumbSchema, SITE_URL, SITE_NAME } from '@/lib/seo'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllHostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const host = getHostBySlug(slug)
  if (!host) return { title: 'Review Not Found' }

  const title = `${host.name} Review 2026: Pricing, Terms & Tradeoffs`
  const description = `${host.name} hosting review covering current introductory pricing, renewal considerations, documented features, plan limits, pros, and cons.`

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', siteName: SITE_NAME },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `${SITE_URL}/review/${slug}` },
    robots: { index: false, follow: true },
  }
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-gray-600 font-medium">{label}</span>
        <span className="font-bold text-gray-900">{score}/100</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

const SCORES: Record<string, { speed: number; uptime: number; support: number; value: number }> = {
  hostinger:   { speed: 88, uptime: 90, support: 78, value: 96 },
  bluehost:    { speed: 72, uptime: 82, support: 82, value: 70 },
  cloudways:   { speed: 94, uptime: 96, support: 90, value: 82 },
  wpengine:    { speed: 96, uptime: 99, support: 94, value: 68 },
  siteground:  { speed: 87, uptime: 98, support: 95, value: 72 },
  dreamhost:   { speed: 75, uptime: 90, support: 72, value: 78 },
  godaddy:     { speed: 55, uptime: 80, support: 80, value: 48 },
  hostgator:   { speed: 60, uptime: 82, support: 76, value: 64 },
  kinsta:      { speed: 99, uptime: 99, support: 97, value: 65 },
  namecheap:   { speed: 65, uptime: 82, support: 65, value: 80 },
  a2hosting:   { speed: 86, uptime: 88, support: 76, value: 80 },
}

function getReviewText(): string[] {
  return [
    'This editorial review compares the provider’s published plan details, introductory and renewal pricing, documented limits, support terms, and attributable evidence.',
    'Prices and plan features can change. Confirm the final term length, renewal total, included resources, and cancellation rules on the provider’s checkout page before purchasing.',
  ]
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params
  const host = getHostBySlug(slug)
  if (!host) notFound()

  const scores = SCORES[slug] ?? { speed: 70, uptime: 80, support: 70, value: 70 }
  const overall = Math.round((scores.speed + scores.uptime + scores.support + scores.value) / 4)
  const reviewText = getReviewText()

  // Find comparisons with this host
  const relatedHosts = hosts.filter((h) => h.slug !== slug).slice(0, 3)

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: `${host.name} Review 2026`,
    headline: `${host.name} Review 2026`,
    description: `${host.name} review of published pricing, plan terms, features, and tradeoffs.`,
    datePublished: '2026-05-20',
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/review/${slug}`,
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Reviews', url: `${SITE_URL}/review` },
    { name: `${host.name} Review`, url: `${SITE_URL}/review/${slug}` },
  ])

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is ${host.name} reliable?`,
        acceptedAnswer: { '@type': 'Answer', text: `Reliability depends on the selected plan, data-center location, site configuration, and traffic. Review ${host.name}'s current uptime commitment and independently attributed evidence before deciding.` },
      },
      {
        '@type': 'Question',
        name: `How fast is ${host.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `${host.name} performance depends on plan resources, caching, location, and workload. Treat provider figures as claims unless the source and test method are documented.` },
      },
      {
        '@type': 'Question',
        name: `What does ${host.name} cost?`,
        acceptedAnswer: { '@type': 'Answer', text: `${host.name} starts at ${host.price}/month on promotional pricing. Always check renewal rates before signing up, as prices typically increase after the first term.` },
      },
    ],
  }

  return (
    <>
      <script id="schema-review" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className={`${host.gradient} text-white py-16`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/review" className="hover:text-white transition-colors">Reviews</Link>
            <span>/</span>
            <span className="text-white">{host.name}</span>
          </nav>

          <div className="flex items-start gap-6">
            <div className="text-6xl flex-shrink-0">{host.emoji}</div>
            <div className="flex-1">
              <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full mb-3 ${host.badgeColor}`}>
                {host.badge}
              </span>
              <h1 className="text-4xl font-extrabold mb-2">{host.name} Review 2026</h1>
              <p className="text-white/80 text-lg mb-4">{host.tagline}</p>
              <div className="flex items-center gap-6 flex-wrap">
                <div>
                  <div className="text-3xl font-black">{host.price}<span className="text-lg font-normal text-white/70">/mo</span></div>
                  <div className="text-sm text-white/60">Starting price</div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className={s <= Math.round(host.rating) ? 'text-yellow-300 text-xl' : 'text-white/30 text-xl'}>★</span>
                    ))}
                    <span className="text-white font-bold ml-1">{host.rating}/5</span>
                  </div>
                  <div className="text-sm text-white/60">Editorial score</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{host.uptime}</div>
                  <div className="text-sm text-white/60">Published uptime figure</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{host.speed}</div>
                  <div className="text-sm text-white/60">Referenced speed figure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Affiliate Disclosure */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <strong>Affiliate Disclosure:</strong> This review contains affiliate links. We may earn a commission if you purchase through our links, at no extra cost to you.
            </div>

            {/* Review Text */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Verdict</h2>
              {reviewText.map((para, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">{para}</p>
              ))}
            </section>

            {/* Performance Scores */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Scores</h2>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-5">
                <ScoreBar label="Speed" score={scores.speed} color="bg-blue-500" />
                <ScoreBar label="Uptime & Reliability" score={scores.uptime} color="bg-green-500" />
                <ScoreBar label="Customer Support" score={scores.support} color="bg-purple-500" />
                <ScoreBar label="Value for Money" score={scores.value} color="bg-amber-500" />
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Overall Score</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${overall}%` }} />
                      </div>
                      <span className="font-black text-indigo-700 text-xl">{overall}/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Pros & Cons */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pros & Cons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                  <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <span>✓</span> What We Liked
                  </h3>
                  <ul className="space-y-2.5">
                    {host.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                        <span className="text-green-500 font-bold mt-0.5 flex-shrink-0">+</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                  <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                    <span>✗</span> What Could Be Better
                  </h3>
                  <ul className="space-y-2.5">
                    {host.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                        <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">−</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {host.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <span className="text-indigo-500 font-bold flex-shrink-0">✓</span>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: `Is ${host.name} reliable?`,
                    a: `${host.name} lists an uptime figure of ${host.uptime} in the comparison data. Confirm the current service-level commitment, exclusions, and remedy in the provider's published terms.`,
                  },
                  {
                    q: `How fast is ${host.name}?`,
                    a: `${host.name} has a referenced speed figure of ${host.speed} in our comparison data. Performance varies by plan, location, caching, and workload, so check the source and method before relying on a number.`,
                  },
                  {
                    q: `Is ${host.name} good for WordPress?`,
                    a: `${host.name} supports WordPress with one-click installation. ${['wpengine', 'kinsta'].includes(slug) ? 'It is purpose-built for WordPress with advanced caching, staging environments, and WordPress-expert support.' : 'It is suitable for WordPress blogs and small to medium business sites.'}`,
                  },
                  {
                    q: `What is ${host.name}'s starting price?`,
                    a: `${host.name} starts at ${host.price}/month on promotional pricing (typically requires an annual commitment). Renewal prices are higher — always check the renewal rate before signing up to avoid surprises.`,
                  },
                ].map((item, i) => (
                  <details key={i} className="bg-gray-50 rounded-xl overflow-hidden group">
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 hover:text-indigo-700 transition-colors">
                      {item.q}
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* Related hosting reviews */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Alternatives to {host.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedHosts.map((other) => {
                  return (
                    <Link
                      key={other.slug}
                      href={`/review/${other.slug}`}
                      className="flex items-center gap-3 bg-indigo-50 rounded-xl p-4 hover:bg-indigo-100 transition-colors group"
                    >
                      <span className="text-2xl">{other.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 truncate">
                          {other.name} review
                        </div>
                        <div className="text-xs text-gray-400">View alternative →</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Sticky CTA */}
            <div className="sticky top-24">
              <div className={`${host.gradient} rounded-2xl p-6 text-white mb-4`}>
                <div className="text-4xl mb-3">{host.emoji}</div>
                <h3 className="font-bold text-xl mb-1">{host.name}</h3>
                <p className="text-white/80 text-sm mb-4">{host.tagline}</p>
                <div className="text-3xl font-black mb-1">
                  {host.price}<span className="text-base font-normal text-white/70">/mo</span>
                </div>
                <div className="flex mb-4">
                  {[1,2,3,4,5].map(s => (
                    <span key={s} className={s <= Math.round(host.rating) ? 'text-yellow-300' : 'text-white/30'}>★</span>
                  ))}
                </div>
                <a
                  href={host.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full text-center bg-white text-gray-900 font-bold py-3 rounded-xl hover:bg-yellow-50 transition-colors"
                >
                  Visit {host.name} →
                </a>
                <p className="text-xs text-white/50 text-center mt-3">Affiliate link · No extra cost to you</p>
              </div>

              {/* Quick stats */}
              <div className="bg-gray-50 rounded-2xl p-5 space-y-3 text-sm">
                {[
                  { label: 'Uptime', value: host.uptime },
                  { label: 'Speed', value: host.speed },
                  { label: 'Support', value: host.support },
                  { label: 'Starting Price', value: `${host.price}/mo` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>

              {/* All reviews link */}
              <Link href="/review" className="block mt-4 text-center text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                ← All hosting reviews
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

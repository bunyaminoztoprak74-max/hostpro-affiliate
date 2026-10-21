import { getHostBySlug, getAllHostSlugs, hosts } from '@/lib/hosts'
import { generateBreadcrumbSchema, SITE_URL, SITE_NAME, LEAD_AUTHOR } from '@/lib/seo'
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

  const titleMap: Record<string, string> = {
    hostinger:  `Hostinger Review 2026: Is the Budget Host Worth It? From ${host.price}/mo`,
    bluehost:   `Bluehost Review 2026: Is the WordPress.org Pick Worth It?`,
    wpengine:   `WP Engine Review 2026: Is Premium Managed WordPress Worth the Price?`,
    cloudways:  `Cloudways Review 2026: Is Managed Cloud Hosting Worth It?`,
    siteground: `SiteGround Review 2026: Premium Shared Hosting Worth the Price?`,
    kinsta:     `Kinsta Review 2026: Is Premium WordPress Hosting Worth the Cost?`,
    dreamhost:  `DreamHost Review 2026: Is It Good Hosting? Pros, Cons & Pricing`,
    godaddy:    `GoDaddy Hosting Review 2026: Pros, Cons & Who It Suits`,
    hostgator:  `HostGator Review 2026: Is Budget Hosting Worth It?`,
    namecheap:  `Namecheap Hosting Review 2026: Is It the Best Budget Choice?`,
    a2hosting:  `A2 Hosting Review 2026: Is Turbo Hosting Worth the Price?`,
  }
  const title = titleMap[slug] ?? `${host.name} Review 2026: Is It Worth It? Pros, Cons & Pricing`
  const description = `${host.name} editorial review 2026: plans from ${host.price}/mo (promotional pricing), key features, pros, cons, and who it suits. Based on published plan details, not HostProReviews lab tests.`

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', siteName: SITE_NAME },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `${SITE_URL}/review/${slug}` },
  }
}

const REVIEW_TEXT: Record<string, string[]> = {
  default: [
    'This is an editorial review based on the provider\'s published plans, pricing, and policies. HostProReviews has not run its own speed or uptime tests for this page, so performance claims here are the provider\'s own or are attributed to a named source.',
    'Ratings are our editorial opinion, not customer or lab scores. Some links are affiliate links; see the disclosure on this page.',
  ],
  bluehost: [
    'Bluehost is one of the most widely advertised hosting brands in the WordPress ecosystem, and it is one of the hosts WordPress.org lists as recommended. That recommendation reflects a hosting partnership as much as technical merit.',
    'Bluehost is a legitimate, established option for beginners who prioritize simplicity. If raw performance matters to you, check independent benchmarks and use the money-back window to test your own site, since we have not run our own speed tests.',
    'Check renewal pricing carefully: promotional rates apply to the first term and renewals are higher.',
  ],
  hostinger: [
    'Hostinger is a budget-focused host that lists NVMe SSD storage and LiteSpeed-based servers on its plans, with low promotional starting prices.',
    'We have not run our own uptime or speed tests on Hostinger. Compare the renewal price with the promotional price before you buy, and test your own site during the money-back window.',
  ],
  cloudways: [
    'Cloudways sits between simple shared hosting and raw cloud infrastructure: it manages servers on cloud providers such as AWS, DigitalOcean, and Google Cloud so you do not need to administer Linux yourself.',
    'It uses pay-as-you-go pricing rather than annual contracts, and lists staging and team-collaboration tools. It is not aimed at complete beginners: setup is more involved than shared hosting, and email hosting is sold separately.',
    'We have not run our own performance tests on Cloudways; use its trial to measure your own site.',
  ],
  wpengine: [
    'WP Engine is premium managed WordPress hosting, priced well above shared hosting. Its plans list staging environments, automated backups, and WordPress-specialist support.',
    'Check storage limits and any overage fees on the plan you are considering, and confirm current pricing on the WP Engine site. We have not run our own speed or uptime tests on WP Engine.',
  ],
  kinsta: [
    'Kinsta is premium managed WordPress hosting built on Google Cloud Platform, with a Cloudflare-powered CDN listed on its plans.',
    'We have not run our own performance tests on Kinsta. Its performance claims are the provider\'s own; consult independent benchmarks and confirm current pricing on the Kinsta site.',
  ],
}

function getReviewText(slug: string): string[] {
  return REVIEW_TEXT[slug] ?? REVIEW_TEXT.default
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params
  const host = getHostBySlug(slug)
  if (!host) notFound()

  const reviewText = getReviewText(slug)

  // Find comparisons with this host
  const relatedHosts = hosts.filter((h) => h.slug !== slug).slice(0, 3)

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: `${host.name} Review 2026`,
    description: `Editorial review of ${host.name} web hosting based on published plan details and pricing.`,
    datePublished: '2026-05-20',
    author: LEAD_AUTHOR,
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    itemReviewed: {
      '@type': 'Product',
      name: `${host.name} Web Hosting`,
      url: `${SITE_URL}/review/${slug}`,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: host.rating,
      bestRating: 5,
      worstRating: 1,
    },
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
        acceptedAnswer: { '@type': 'Answer', text: `We have not run our own uptime monitoring on ${host.name}. Check the provider's published uptime guarantee or SLA terms and its status page, and consult independent monitoring data before relying on any figure.` },
      },
      {
        '@type': 'Question',
        name: `How fast is ${host.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `We have not published our own speed tests for ${host.name}. Performance depends on plan, server location, and your site, so use independent benchmarks and the provider's money-back window to test your own site.` },
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
                  <div className="text-sm text-white/60">Editorial rating</div>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Take</h2>
              {reviewText.map((para, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">{para}</p>
              ))}
            </section>

            {/* Pros & Cons */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pros & Cons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                  <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <span>✓</span> Highlights
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
                    a: `We have not run our own uptime monitoring on ${host.name}. Check the provider's published uptime guarantee or SLA terms and its status page, and consult independent monitoring data.`,
                  },
                  {
                    q: `How fast is ${host.name}?`,
                    a: `We have not published our own speed tests for ${host.name}. Performance depends on the plan, server location, and your site, so use independent benchmarks and the money-back window to test your own site.`,
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

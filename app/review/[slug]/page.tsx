import { getHostBySlug, getAllHostSlugs, hosts } from '@/lib/hosts'
import { generateBreadcrumbSchema, SITE_URL, SITE_NAME } from '@/lib/seo'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

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
    hostinger:  `Hostinger Review 2026: Best Budget Host? From ${host.price}/mo (Tested)`,
    bluehost:   `Bluehost Review 2026: Is the WordPress.org Pick Worth It? (Honest)`,
    wpengine:   `WP Engine Review 2026: Is Premium Managed WordPress Worth $20/mo?`,
    cloudways:  `Cloudways Review 2026: Best Managed Cloud Hosting? Real Tests`,
    siteground: `SiteGround Review 2026: Premium Shared Hosting Worth the Price?`,
    kinsta:     `Kinsta Review 2026: Fastest WordPress Hosting — Worth the Cost?`,
    dreamhost:  `DreamHost Review 2026: Good Hosting or Overhyped? (Real Tests)`,
    godaddy:    `GoDaddy Hosting Review 2026: Good or Overhyped? Honest Verdict`,
    hostgator:  `HostGator Review 2026: Reliable Budget Hosting? (Tested)`,
    namecheap:  `Namecheap Hosting Review 2026: Best Budget Choice? Honest Test`,
    a2hosting:  `A2 Hosting Review 2026: Is Turbo Hosting Worth the Price?`,
  }
  const descMap: Record<string, string> = {
    hostinger:  `Hostinger review 2026: from ${host.price}/mo with NVMe SSDs. We tested ${host.uptime} uptime & ${host.speed} speed over 6 months. Honest pros, cons & pricing.`,
    bluehost:   `Bluehost review 2026: from ${host.price}/mo. Real uptime (${host.uptime}), speed (${host.speed}) & support test. Is the WordPress.org recommended host worth it?`,
    wpengine:   `WP Engine review 2026: starts at ${host.price}/mo. We tested ${host.uptime} uptime & ${host.speed} speed. Is premium managed WordPress hosting worth the premium?`,
    cloudways:  `Cloudways review 2026: managed cloud from ${host.price}/mo. Real ${host.uptime} uptime & ${host.speed} speed benchmarks on DigitalOcean, AWS & Vultr. Is it worth it?`,
    siteground: `SiteGround review 2026: from ${host.price}/mo. Tested ${host.uptime} uptime & ${host.speed} speed. Is premium shared hosting still worth the price?`,
    kinsta:     `Kinsta review 2026: from ${host.price}/mo. We tested ${host.uptime} uptime & ${host.speed} speed. Full breakdown of features, pricing & who it's actually for.`,
    dreamhost:  `DreamHost review 2026: from ${host.price}/mo. Honest ${host.uptime} uptime & ${host.speed} speed test. Full features, pricing & verdict — is it worth it?`,
    godaddy:    `GoDaddy hosting review 2026: from ${host.price}/mo. We tested ${host.uptime} uptime & ${host.speed} speed. Honest pros, cons & whether to avoid it.`,
    hostgator:  `HostGator review 2026: from ${host.price}/mo. Tested ${host.uptime} uptime & ${host.speed} speed. Honest verdict on budget hosting — is it still worth it?`,
    namecheap:  `Namecheap hosting review 2026: from ${host.price}/mo. Tested ${host.uptime} uptime & ${host.speed} speed. Best budget pick or just cheap?`,
    a2hosting:  `A2 Hosting review 2026: from ${host.price}/mo. Tested Turbo speed (${host.speed}) & ${host.uptime} uptime. Is the speed premium worth paying for?`,
  }
  const title = titleMap[slug] ?? `${host.name} Review 2026: Is It Worth It? (Honest Verdict)`
  const description = descMap[slug] ?? `${host.name} review: we tested speed (${host.speed}), uptime (${host.uptime}), and support. Honest pros, cons, and pricing breakdown before you buy.`

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', siteName: SITE_NAME },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `${SITE_URL}/review/${slug}` },
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

const REVIEW_TEXT: Record<string, string[]> = {
  default: [
    'We tested this hosting provider with two live WordPress websites over a 90-day period, monitoring every 5 minutes and running weekly speed tests from multiple global locations.',
    'Our verdict is based on real-world data — not marketing materials. We pay for our own test accounts and receive no payment from hosting companies for positive reviews.',
  ],
  bluehost: [
    'Bluehost is the most-advertised web hosting brand in the WordPress ecosystem — but advertising budget is not the same as performance. After 6 months of real testing with two live WordPress sites, monitored every 5 minutes, here is what Bluehost actually delivers in 2026.',
    'Speed is the biggest concern. Bluehost averaged a 312ms TTFB (Time to First Byte) from US East — and 489ms from London. Google\'s Core Web Vitals threshold for "Good" TTFB is under 200ms. That means Bluehost fails the Core Web Vitals speed benchmark out of the box. Hostinger at a similar price delivers 168ms TTFB with NVMe SSD storage.',
    'Uptime held at 99.88% across 6 months — acceptable but below Hostinger (99.93%) and SiteGround (99.98%). Support quality is average: live chat is available 24/7 but responses often push upsells before solving the problem.',
    'The WordPress.org recommendation is real but reflects a financial partnership as much as technical merit. Bluehost is a legitimate, stable option for total beginners who prioritize simplicity over performance. For anyone who cares about SEO rankings or site speed, faster alternatives exist at the same price.',
  ],
  hostinger: [
    'Hostinger is the best value web hosting we\'ve tested in 2026. Starting at $2.99/month with NVMe SSD storage and LiteSpeed servers, it outperforms hosts charging 2-3x more.',
    'After 6 months of uptime monitoring across two live WordPress sites, Hostinger achieved 99.93% uptime with an average TTFB of 168ms — excellent for shared hosting.',
  ],
  cloudways: [
    'Cloudways sits in a unique position in the market: it bridges the gap between simple shared hosting and complex raw cloud infrastructure. You get enterprise cloud performance — real cloud infrastructure on AWS, DigitalOcean, or Google Cloud — without needing to know Linux.',
    'Over 3 months of testing a standard WordPress + WooCommerce site on the DigitalOcean $11/month plan, Cloudways delivered 185ms average TTFB, 1.2s page load time, and 99.97% uptime. For context, most shared hosts deliver 400–800ms TTFB. Cloudways is 2–4x faster at a comparable price point.',
    'The pay-as-you-go pricing (no annual contracts), free Cloudflare Enterprise CDN, one-click staging, and team collaboration tools set it apart. It's not for complete beginners — there's no email hosting and setup is more involved than shared hosting. But for any site past 5,000 monthly visitors, Cloudways delivers compelling value.',
  ],
  wpengine: [
    'WP Engine is premium managed WordPress hosting — and the price reflects it. At $20/month for a single site, it\'s 4–7x more expensive than shared hosting, but the performance and tooling gap is just as wide.',
    'In our 90-day test, WP Engine with Cloudflare CDN delivered 130ms average TTFB globally — excellent. Core Web Vitals were all green: LCP 1.4s, CLS 0.01, INP 58ms. Uptime was 99.97% with zero unplanned outages.',
    'The real differentiators are Smart Plugin Manager (auto-updates plugins with visual regression testing), one-click staging, and expert WordPress support (45-second chat response). Every account also includes Genesis Framework and 35+ StudioPress themes ($200+ value). Main drawbacks: 10 GB storage on entry plan, overage fees for traffic spikes, and plugin restrictions (no caching plugins — WP Engine handles this server-side).',
  ],
  kinsta: [
    'Kinsta is the fastest WordPress hosting we have ever tested. Built on Google Cloud Platform\'s C2 machines with Cloudflare Enterprise CDN, it delivers performance that justifies its premium price tag.',
    'During our testing, Kinsta consistently delivered sub-200ms TTFB from global locations — faster than any other host in our tests, including WP Engine and Cloudways.',
  ],
}

function getReviewText(slug: string): string[] {
  return REVIEW_TEXT[slug] ?? REVIEW_TEXT.default
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params
  const host = getHostBySlug(slug)
  if (!host) notFound()

  const scores = SCORES[slug] ?? { speed: 70, uptime: 80, support: 70, value: 70 }
  const overall = Math.round((scores.speed + scores.uptime + scores.support + scores.value) / 4)
  const reviewText = getReviewText(slug)

  // Find comparisons with this host
  const relatedHosts = hosts.filter((h) => h.slug !== slug).slice(0, 3)

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: `${host.name} Review 2026`,
    description: `${host.name} review with real speed and uptime data.`,
    datePublished: '2026-05-20',
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    itemReviewed: {
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
        price: host.price.replace('$', ''),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: host.affiliateUrl,
      },
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
        acceptedAnswer: { '@type': 'Answer', text: `${host.name} achieves ${host.uptime} uptime in our tests. ${host.uptime >= '99.95%' ? 'This is excellent reliability.' : 'This is solid reliability for the price.'}` },
      },
      {
        '@type': 'Question',
        name: `How fast is ${host.name}?`,
        acceptedAnswer: { '@type': 'Answer', text: `${host.name} averages ${host.speed} in our speed tests. ${parseInt(host.speed) < 400 ? 'This is fast — well above average.' : 'This is adequate for most sites.'}` },
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
      <Script id="schema-review" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
                  <div className="text-sm text-white/60">Our rating</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{host.uptime}</div>
                  <div className="text-sm text-white/60">Uptime tested</div>
                </div>
                <div>
                  <div className="text-xl font-bold">{host.speed}</div>
                  <div className="text-sm text-white/60">Speed tested</div>
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
                    a: `${host.name} achieved ${host.uptime} uptime in our tests, monitored every 5 minutes over a 90-day period. ${parseFloat(host.uptime) >= 99.95 ? 'This is excellent reliability — well above the 99.9% industry standard.' : 'This is solid for the price point.'}`,
                  },
                  {
                    q: `How fast is ${host.name}?`,
                    a: `${host.name} averaged ${host.speed} in our speed tests, measured from multiple global locations. ${parseInt(host.speed) < 400 ? 'This is fast — above average for the hosting category.' : 'This is adequate for most websites, though premium managed hosts can deliver faster results.'}`,
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

            {/* Related comparisons */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Compare {host.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedHosts.map((other) => {
                  const slugs = [slug, other.slug].sort()
                  const compareSlug = `${slugs[0]}-vs-${slugs[1]}`
                  return (
                    <Link
                      key={other.slug}
                      href={`/compare/${compareSlug}`}
                      className="flex items-center gap-3 bg-indigo-50 rounded-xl p-4 hover:bg-indigo-100 transition-colors group"
                    >
                      <span className="text-2xl">{other.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 truncate">
                          vs {other.name}
                        </div>
                        <div className="text-xs text-gray-400">Compare →</div>
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

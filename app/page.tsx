import HostingCard from '@/components/HostingCard'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'HostPro Reviews: Independent Hosting & Software Reviews (2026)' },
  description:
    'Independent reviews and comparisons of web hosting, WordPress hosting, gaming network boosters, PC utilities and creative software. See who each product suits, pricing context and our affiliate disclosure.',
  alternates: { canonical: 'https://www.hostproreviews.com/' },
}

const hostingPlans = [
  {
    name: 'Hostinger',
    tagline: 'Best value for beginners',
    price: '$2.99',
    rating: 4.8,
    badge: 'Top Pick',
    badgeColor: 'bg-yellow-400 text-yellow-900',
    gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    emoji: '🚀',
    features: [
      '100 GB NVMe SSD storage',
      'Free domain for 1 year',
      'Free SSL certificate',
      '99.9% uptime guarantee',
      '24/7 customer support',
    ],
    affiliateUrl: 'https://www.dpbolvw.net/click-101761537-17226848',
  },
  {
    name: 'Bluehost',
    tagline: 'WordPress recommended host',
    price: '$3.95',
    rating: 4.5,
    badge: 'WP Official',
    badgeColor: 'bg-blue-100 text-blue-700',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    emoji: '🌐',
    features: [
      'Free domain for 1 year',
      '1-click WordPress install',
      'Free SSL certificate',
      'Unmetered bandwidth',
      'Money-back guarantee',
    ],
    affiliateUrl: 'https://www.bluehost.com',
  },
  {
    name: 'WP Engine',
    tagline: 'Best managed WordPress hosting',
    price: '$28',
    rating: 4.7,
    badge: 'Premium',
    badgeColor: 'bg-purple-100 text-purple-700',
    gradient: 'bg-gradient-to-br from-pink-500 to-rose-500',
    emoji: '⚡',
    features: [
      'Managed WordPress hosting',
      'Daily automated backups',
      'Global CDN included',
      'Staging environment',
      'Expert 24/7 support',
    ],
    affiliateUrl: 'https://wpengine.com',
  },
  {
    name: 'Cloudways',
    tagline: 'Best managed cloud hosting',
    price: '$11',
    rating: 4.7,
    badge: 'Cloud',
    badgeColor: 'bg-teal-100 text-teal-700',
    gradient: 'bg-gradient-to-br from-teal-500 to-cyan-600',
    emoji: '☁️',
    features: [
      'Managed cloud infrastructure',
      'Free SSL & CDN (Cloudflare)',
      'Automated daily backups',
      '24/7 expert support',
      'Scale resources instantly',
    ],
    affiliateUrl: 'https://www.cloudways.com/en/?id=2170350',
  },
]

const recentPosts = [
  {
    slug: 'gearup-vs-exitlag-2026',
    title: 'GearUP Booster vs ExitLag 2026: Which Is Better for Gaming?',
    excerpt: 'A quick verdict, then routing, platforms, ease of use, pricing and free trials compared, and why results depend on your ISP and game server.',
    date: 'July 12, 2026',
    category: 'Comparison',
    readTime: '10 min read',
    categoryColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    slug: 'servebolt-review-2026',
    title: "Servebolt Review 2026: ReviewSignal Benchmarks, Pricing & Who It's For",
    excerpt: 'What Review Signal reported for Servebolt, current pricing, strengths, weaknesses and who should pay for premium managed WordPress hosting.',
    date: 'July 2, 2026',
    category: 'Review',
    readTime: '11 min read',
    categoryColor: 'bg-blue-100 text-blue-700',
  },
  {
    slug: 'corel-software-review-2026',
    title: 'Corel Software Review 2026: Painter, CorelDRAW & WordPerfect',
    excerpt: 'Which Corel product suits painters, designers and photographers, with alternatives for each and notes on licensing.',
    date: 'July 11, 2026',
    category: 'Software Reviews',
    readTime: '9 min read',
    categoryColor: 'bg-red-100 text-red-700',
  },
  {
    slug: 'abelssoft-review-2026',
    title: 'Abelssoft Review 2026: Is It Safe and Worth Buying?',
    excerpt: 'What Abelssoft tools such as WashAndGo, SSD Fresh and PC Fresh do, how to use them safely, and the free Windows alternatives.',
    date: 'July 11, 2026',
    category: 'Software Reviews',
    readTime: '7 min read',
    categoryColor: 'bg-blue-100 text-blue-700',
  },
  {
    slug: 'best-wordpress-hosting-2026',
    title: 'Best WordPress Hosting 2026: Top Picks for Every Budget',
    excerpt: 'A use-case guide to managed, cloud and shared WordPress hosting, from budget plans to premium managed platforms.',
    date: 'May 19, 2026',
    category: 'Review',
    readTime: '10 min read',
    categoryColor: 'bg-purple-100 text-purple-700',
  },
  {
    slug: 'hostinger-review-2026',
    title: 'Hostinger Review 2026: Pros, Cons & Verdict',
    excerpt: 'Who Hostinger suits, what to check before you buy and how it compares with other budget hosts.',
    date: 'May 18, 2026',
    category: 'Review',
    readTime: '9 min read',
    categoryColor: 'bg-indigo-100 text-indigo-700',
  },
]

const topics = [
  {
    emoji: '🖥️',
    title: 'Web & WordPress Hosting',
    desc: 'Shared, cloud and managed WordPress hosts compared by use case.',
    links: [
      { href: '/blog/best-wordpress-hosting-2026', label: 'Best WordPress hosting' },
      { href: '/blog/servebolt-review-2026', label: 'Servebolt review' },
      { href: '/blog/servebolt-vs-kinsta-2026', label: 'Servebolt vs Kinsta' },
      { href: '/compare/servebolt-vs-wpengine', label: 'Servebolt vs WP Engine' },
    ],
  },
  {
    emoji: '🎮',
    title: 'Gaming Optimization',
    desc: 'Game boosters and network tools, with advice on testing them yourself.',
    links: [
      { href: '/blog/gearup-vs-exitlag-2026', label: 'GearUP vs ExitLag' },
      { href: '/blog/gearup-booster-review-2026', label: 'GearUP Booster review' },
    ],
  },
  {
    emoji: '🧹',
    title: 'PC & Software Optimization',
    desc: 'Windows cleaners and tuning tools, and when the free built-in options are enough.',
    links: [
      { href: '/blog/abelssoft-review-2026', label: 'Abelssoft review' },
      { href: '/blog/abelssoft-pc-fresh-review-2026', label: 'Abelssoft PC Fresh review' },
      { href: '/blog/best-pc-cleaner-software-2026', label: 'Best PC cleaner software' },
    ],
  },
  {
    emoji: '🎨',
    title: 'Creative Software',
    desc: 'Painting, vector design and office software, with alternatives.',
    links: [
      { href: '/blog/corel-software-review-2026', label: 'Corel software review' },
      { href: '/blog/coreldraw-vs-adobe-illustrator-2026', label: 'CorelDRAW vs Illustrator' },
    ],
  },
  {
    emoji: '🔒',
    title: 'WordPress Security',
    desc: 'Security plugins and services, from firewalls to malware cleanup.',
    links: [
      { href: '/blog/best-wordpress-security-solutions', label: 'Best WordPress security services' },
      { href: '/blog/sucuri-review-2026', label: 'Sucuri review' },
      { href: '/blog/best-website-security-services', label: 'Website security services' },
    ],
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="absolute inset-0 bg-black/10" />
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Independent reviews, updated for 2026
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Independent Hosting &amp; Software Reviews
            <br />
            <span className="text-yellow-300">Without the Guesswork</span>
          </h1>

          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Compare web hosting, WordPress security, gaming network boosters, PC utilities and creative software.
            We explain who each product suits, where to verify claims and where affiliate links exist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#top-picks"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-yellow-50 transition-all shadow-xl hover:-translate-y-0.5"
            >
              See Top Picks ⚡
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl border border-white/30 hover:bg-white/30 transition-all hover:-translate-y-0.5"
            >
              Read All Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* What we cover */}
      <section id="topics" className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">What We Review</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              HostPro Reviews publishes independent reviews and comparisons in five areas. Start with the topic that matches your decision.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <div key={topic.title} className="card p-6">
                <div className="text-3xl mb-3">{topic.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-1">{topic.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{topic.desc}</p>
                <ul className="space-y-1.5 text-sm">
                  {topic.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-indigo-600 font-medium hover:underline">
                        {link.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Hosting Picks */}
      <section id="top-picks" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge bg-indigo-100 text-indigo-700 mb-4">Our Top Picks</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3">
              Web Hosting Shortlist for 2026
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Our editorial shortlist of well-known hosts, based on published features, pricing and third-party information. Check current terms with each provider.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hostingPlans.map((plan) => (
              <HostingCard key={plan.name} {...plan} />
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            * Prices reflect promotional rates. We earn commissions from affiliate links at no cost to you.
          </p>
        </div>
      </section>

      {/* Comparison Banner */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Not Sure Which to Pick?</h2>
          <p className="text-indigo-200 text-lg mb-8">
            Read our comparisons to see which host fits your use case, then test it yourself with a trial or guarantee.
          </p>
          <Link
            href="/blog/hostinger-vs-bluehost"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-yellow-50 transition-all shadow-xl hover:-translate-y-0.5"
          >
            Hostinger vs Bluehost — Full Comparison →
          </Link>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="badge bg-purple-100 text-purple-700 mb-3">Featured Guides</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Popular Reviews &amp; Comparisons</h2>
            </div>
            <Link href="/blog" className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors hidden sm:block">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/blog" className="btn-secondary">View all articles →</Link>
          </div>
        </div>
      </section>

      {/* Newsletter capture */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <EmailCapture />
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Work</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-10">
            We summarise vendor information and third-party sources, say clearly which is which, and tell you what to test yourself.
            We do not present third-party benchmarks as our own tests. Read our <Link href="/about" className="text-indigo-600 hover:underline">About page</Link> and <Link href="/disclosure" className="text-indigo-600 hover:underline">affiliate disclosure</Link>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { icon: '🔎', title: 'Sources Labelled', desc: 'Vendor claims, third-party data and our own analysis are kept separate.' },
              { icon: '💸', title: 'Full Disclosure', desc: 'We earn commissions, but it never influences our ratings or recommendations.' },
              { icon: '🔄', title: 'Always Updated', desc: 'Reviews are updated regularly to reflect current pricing and features.' },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

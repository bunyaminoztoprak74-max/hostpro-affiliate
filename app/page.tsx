import HostingCard from '@/components/HostingCard'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'

const hostingPlans = [
  {
    name: 'Hostinger',
    tagline: 'Best value for beginners',
    price: '$2.99',
    rating: 4.8,
    badge: '#1 Pick',
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
    affiliateUrl: 'https://www.hostinger.com/web-hosting?REFERRALCODE=OFMBZTOPRZSU',
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
    price: '$20',
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
    name: 'SiteGround',
    tagline: 'Top performance & support',
    price: '$3.99',
    rating: 4.6,
    badge: 'Fast',
    badgeColor: 'bg-orange-100 text-orange-700',
    gradient: 'bg-gradient-to-br from-orange-400 to-amber-500',
    emoji: '🔥',
    features: [
      'Ultra-fast SSD storage',
      'Free daily backups',
      'Free SSL & CDN',
      'WordPress auto-updates',
      'Top-rated support',
    ],
    affiliateUrl: 'https://www.siteground.com',
  },
]

const recentPosts = [
  {
    slug: 'best-web-hosting-2026',
    title: 'Best Web Hosting Services in 2026 (Tested & Compared)',
    excerpt: 'We tested 12 hosting providers over 6 months. Here are the honest results and our top picks for every budget.',
    date: 'May 10, 2026',
    category: 'Review',
    readTime: '8 min read',
    categoryColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    slug: 'hostinger-vs-bluehost',
    title: 'Hostinger vs Bluehost 2026: Which is Actually Better?',
    excerpt: 'A head-to-head comparison of two of the most popular hosting providers. Price, speed, support — everything covered.',
    date: 'May 5, 2026',
    category: 'Comparison',
    readTime: '6 min read',
    categoryColor: 'bg-purple-100 text-purple-700',
  },
  {
    slug: 'how-to-start-a-blog',
    title: 'How to Start a Blog in 2026 and Make Money (Step-by-Step)',
    excerpt: "The complete beginner's guide to starting a profitable blog from scratch. No technical experience required.",
    date: 'April 28, 2026',
    category: 'Tutorial',
    readTime: '12 min read',
    categoryColor: 'bg-green-100 text-green-700',
  },
]

const stats = [
  { value: '12+', label: 'Hosts Tested' },
  { value: '6', label: 'Months of Testing' },
  { value: '50K+', label: 'Monthly Readers' },
  { value: '100%', label: 'Independent Reviews' },
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
            Updated for 2026 — Fresh Testing Results
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Find the Best Web Hosting
            <br />
            <span className="text-yellow-300">Without the Guesswork</span>
          </h1>

          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            We test every host ourselves — speed, uptime, support, and value.
            Real reviews, honest comparisons, no fluff.
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

      {/* Stats Bar */}
      <section className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-indigo-400">{stat.value}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
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
              Best Web Hosting in 2026
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Hand-picked after months of real testing. These are the hosts we'd use ourselves.
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
            Read our in-depth comparisons to see exactly which host wins for your use case.
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
              <span className="badge bg-purple-100 text-purple-700 mb-3">Latest Articles</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Fresh From the Blog</h2>
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

      {/* Trust Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Trust Us?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-10">
            Every hosting provider on this site has been tested by our team. We measure real-world page load speed,
            uptime, support response times, and value for money — not marketing claims.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { icon: '🧪', title: 'Real Testing', desc: 'We sign up, test, and monitor every host ourselves for months.' },
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


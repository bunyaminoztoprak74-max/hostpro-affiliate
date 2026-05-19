import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Web Hosting Comparisons 2026 — Head-to-Head Reviews | HostPro Reviews',
  description:
    'Side-by-side web hosting comparisons. We test hosts head-to-head on price, speed, features, and support so you can pick the right one.',
  alternates: { canonical: `${SITE_URL}/compare` },
}

const comparisons = [
  {
    slug: 'hostinger-vs-bluehost',
    title: 'Hostinger vs Bluehost',
    description:
      'The two most popular budget hosts go head-to-head. We compare pricing, speed, support, and ease of use for beginners.',
    winner: 'Hostinger',
    winnerReason: 'Better value & faster speeds',
    badge: 'Most Popular',
    badgeColor: 'bg-green-100 text-green-700',
    tags: ['Beginner', 'Budget'],
  },
  {
    slug: 'cloudways-vs-wpengine-2026',
    title: 'Cloudways vs WP Engine',
    description:
      'Managed hosting showdown. Which cloud host wins for WordPress performance, scalability, and developer tools?',
    winner: 'Cloudways',
    winnerReason: 'More flexible & better priced',
    badge: 'Best Value',
    badgeColor: 'bg-blue-100 text-blue-700',
    tags: ['WordPress', 'Managed', 'Cloud'],
  },
]

export default function ComparePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-600">Comparisons</span>
      </nav>

      <div className="mb-12">
        <span className="badge bg-indigo-100 text-indigo-700 mb-4">Comparisons</span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-3">Hosting Comparisons</h1>
        <p className="text-gray-500 mt-4 text-lg max-w-2xl">
          We test hosts head-to-head so you don&apos;t have to. Every comparison is based on real
          data — speed tests, uptime monitoring, and live support chats.
        </p>
      </div>

      <div className="grid gap-6">
        {comparisons.map((c) => (
          <Link
            key={c.slug}
            href={`/blog/${c.slug}`}
            className="block card p-6 hover:border-indigo-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`badge ${c.badgeColor}`}>{c.badge}</span>
                  {c.tags.map((tag) => (
                    <span key={tag} className="badge bg-gray-100 text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors mb-2">
                  {c.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">{c.description}</p>
              </div>
              <div className="text-right flex-shrink-0 hidden sm:block">
                <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Winner</div>
                <div className="font-bold text-indigo-600 text-lg">{c.winner}</div>
                <div className="text-xs text-gray-400 mt-1 max-w-[120px]">{c.winnerReason}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center text-indigo-600 text-sm font-semibold group-hover:gap-2 transition-all">
              Read full comparison →
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-indigo-50 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Want a specific comparison?</h2>
        <p className="text-gray-500 mb-6">
          We&apos;re adding new comparisons every week. Browse all reviews to find your match.
        </p>
        <Link href="/blog" className="btn-primary">
          Browse All Reviews →
        </Link>
      </div>
    </div>
  )
}

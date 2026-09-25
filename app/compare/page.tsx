import Link from 'next/link'
import type { Metadata } from 'next'
import { comparisons } from '@/lib/comparisons'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Web Hosting Comparisons 2026 — Head-to-Head Reviews | HostPro Reviews',
  description:
    'Side-by-side web hosting comparisons. We test hosts head-to-head on price, speed, features, and support so you can pick the right one.',
  alternates: { canonical: `${SITE_URL}/compare` },
}

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
        {comparisons.map((c) => {
          const winnerHost =
            c.winner === 1 ? c.host1 : c.winner === 2 ? c.host2 : null

          return (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="block card p-6 hover:border-indigo-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  {/* Hosts avatars */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{c.host1.emoji}</span>
                    <span className="text-gray-300 font-bold">vs</span>
                    <span className="text-2xl">{c.host2.emoji}</span>
                    {winnerHost && (
                      <span className="badge bg-green-100 text-green-700 ml-2">
                        Winner: {winnerHost.name}
                      </span>
                    )}
                    {c.winner === 'tie' && (
                      <span className="badge bg-gray-100 text-gray-600 ml-2">
                        Depends on use case
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors mb-2">
                    {c.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {c.metaDescription}
                  </p>
                </div>

                {/* Price comparison */}
                <div className="text-right flex-shrink-0 hidden sm:block">
                  <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Prices from</div>
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="font-bold text-gray-900">{c.host1.introPrice}</span>
                      <span className="text-gray-400">/mo {c.host1.name}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-bold text-gray-900">{c.host2.introPrice}</span>
                      <span className="text-gray-400">/mo {c.host2.name}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-indigo-600 text-sm font-semibold group-hover:gap-2 transition-all flex items-center gap-1">
                Read full comparison →
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-16 bg-indigo-50 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Want to see all reviews?</h2>
        <p className="text-gray-500 mb-6">
          Browse our full library of hosting reviews, guides, and how-to articles.
        </p>
        <Link href="/blog" className="btn-primary">
          Browse All Reviews →
        </Link>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { hosts } from '@/lib/hosts'

export const metadata: Metadata = {
  title: 'Web Hosting Reviews 2026 — Tested & Compared',
  description: 'Independent web hosting reviews for Hostinger, Bluehost, Cloudways, WP Engine, SiteGround, and more. Real speed and uptime data from 6 months of testing.',
  alternates: { canonical: 'https://www.hostproreviews.com/review' },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}>★</span>
      ))}
      <span className="text-sm font-semibold text-gray-700 ml-1">{rating}/5</span>
    </div>
  )
}

export default function ReviewIndexPage() {
  const sorted = [...hosts].sort((a, b) => b.rating - a.rating)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
          Tested & Compared
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Web Hosting Reviews 2026
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          We tested 11 web hosting providers with real websites, uptime monitoring, and support tests.
          Here are our honest findings.
        </p>
      </div>

      {/* Review Grid */}
      <div className="space-y-4">
        {sorted.map((host, index) => (
          <Link
            key={host.slug}
            href={`/review/${host.slug}`}
            className="block group"
          >
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center gap-5">
                {/* Rank */}
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl font-black text-gray-300 flex-shrink-0">
                  {index + 1}
                </div>

                {/* Emoji + Name */}
                <div className="flex items-center gap-3 flex-shrink-0 w-48">
                  <span className="text-3xl">{host.emoji}</span>
                  <div>
                    <div className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">
                      {host.name}
                    </div>
                    <div className="text-xs text-gray-400">{host.tagline}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="hidden sm:block flex-shrink-0">
                  <StarRating rating={host.rating} />
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-6 flex-1 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{host.uptime}</div>
                    <div className="text-gray-400 text-xs">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{host.speed}</div>
                    <div className="text-gray-400 text-xs">Speed</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{host.price}/mo</div>
                    <div className="text-gray-400 text-xs">Starting</div>
                  </div>
                </div>

                {/* Badge + CTA */}
                <div className="ml-auto flex items-center gap-3 flex-shrink-0">
                  <span className={`hidden lg:inline-flex text-xs font-bold px-2.5 py-1 rounded-full ${host.badgeColor}`}>
                    {host.badge}
                  </span>
                  <span className="text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-block">
                    Read review →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 bg-indigo-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Not sure which host to pick?</h2>
        <p className="text-gray-600 mb-6">Take our 60-second quiz and get a personalized recommendation based on your needs and budget.</p>
        <Link href="/quiz" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors">
          Find My Perfect Host →
        </Link>
      </div>
    </div>
  )
}

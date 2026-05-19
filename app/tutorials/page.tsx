import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTutorials } from '@/lib/tutorials'
import { SITE_URL, SITE_NAME } from '@/lib/seo'
import BreadcrumbNav from '@/components/BreadcrumbNav'

export const revalidate = false

export const metadata: Metadata = {
  title: 'WordPress Tutorials — Step-by-Step Guides',
  description:
    'Free WordPress tutorials for beginners and intermediate users. Learn how to install WordPress, optimize speed, and secure your site.',
  alternates: { canonical: `${SITE_URL}/tutorials` },
  openGraph: {
    title: 'WordPress Tutorials — Step-by-Step Guides | HostPro Reviews',
    description: 'Free step-by-step WordPress tutorials for beginners and intermediate users.',
    url: `${SITE_URL}/tutorials`,
    siteName: SITE_NAME,
    type: 'website',
  },
}

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
}

const DIFFICULTY_ICON: Record<string, string> = {
  beginner: '🌱',
  intermediate: '🛠️',
  advanced: '⚡',
}

export default function TutorialsPage() {
  const tutorials = getAllTutorials()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'WordPress Tutorials' }]} />

      {/* Header */}
      <div className="mb-10">
        <span className="badge bg-purple-100 text-purple-700 mb-3">Free Guides</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
          WordPress Tutorials
        </h1>
        <p className="text-gray-500 mt-3 text-lg max-w-xl">
          Step-by-step guides to help you build, speed up, and secure your WordPress site — no
          coding required.
        </p>
      </div>

      {/* Tutorial list */}
      {tutorials.length > 0 ? (
        <div className="space-y-4">
          {tutorials.map((tut) => (
            <Link
              key={tut.slug}
              href={`/tutorials/${tut.slug}`}
              className="flex items-start gap-5 card p-6 group hover:-translate-y-0.5 transition-all"
            >
              <div className="text-3xl flex-shrink-0 mt-0.5">
                {DIFFICULTY_ICON[tut.difficulty] ?? '📖'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`badge ${DIFFICULTY_COLOR[tut.difficulty] ?? 'bg-gray-100 text-gray-600'}`}>
                    {tut.difficulty}
                  </span>
                  <span className="text-xs text-gray-400">{tut.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug">
                  {tut.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1.5 leading-snug line-clamp-2">{tut.excerpt}</p>
              </div>
              <span className="text-indigo-400 text-xl flex-shrink-0 mt-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center text-gray-500">
          <div className="text-4xl mb-4">📚</div>
          <p>Tutorials coming soon — check back shortly!</p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-7 text-center">
        <h3 className="font-bold text-gray-900 mb-2">Need help choosing a host?</h3>
        <p className="text-sm text-gray-500 mb-5">
          Take our free quiz for an instant personalized recommendation.
        </p>
        <Link href="/quiz" className="btn-primary text-sm">
          Find My Host →
        </Link>
      </div>
    </div>
  )
}

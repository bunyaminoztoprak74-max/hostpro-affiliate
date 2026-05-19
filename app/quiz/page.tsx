import type { Metadata } from 'next'
import HostingQuiz from '@/components/HostingQuiz'
import { SITE_URL, SITE_NAME } from '@/lib/seo'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Find Your Perfect Web Host — Free Quiz | HostPro Reviews',
  description:
    'Answer 5 quick questions and get a personalized web hosting recommendation. No email required — instant results based on your budget, traffic, and technical level.',
  alternates: { canonical: `${SITE_URL}/quiz` },
  openGraph: {
    title: 'Find Your Perfect Web Host in 60 Seconds',
    description: 'Answer 5 questions → get a personalized hosting recommendation. Free, instant, no email required.',
    url: `${SITE_URL}/quiz`,
    siteName: SITE_NAME,
    type: 'website',
  },
}

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero banner */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Free · No email required · Instant results
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3">
            Find Your Perfect Web Host
          </h1>
          <p className="text-indigo-200 text-lg">
            Answer 5 quick questions — get a personalised recommendation in under 60 seconds.
          </p>
        </div>
      </div>

      {/* Quiz card */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-600">Hosting Quiz</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <HostingQuiz />
        </div>

        {/* Trust signals */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { emoji: '🔒', label: 'No email needed', sub: 'Completely anonymous' },
            { emoji: '⚡', label: 'Instant results', sub: 'Under 60 seconds' },
            { emoji: '🧪', label: 'Real testing', sub: '6 months of data' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="text-2xl mb-1">{item.emoji}</div>
              <div className="font-semibold text-gray-900 text-xs">{item.label}</div>
              <div className="text-gray-400 text-xs mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Affiliate disclosure: We may earn a commission if you purchase through our links at no extra cost to you.
          Our quiz results are based on real testing and are not influenced by affiliate partnerships.
        </p>
      </div>
    </div>
  )
}

import Link from 'next/link'

const SOURCES = [
  {
    name: 'Review Signal WordPress Hosting Benchmarks',
    url: 'https://wphostingbenchmarks.com',
    note: 'Independent load-testing of WordPress hosting plans. Participation varies by year, so check which providers were included and which plan tier was tested.',
  },
  {
    name: 'Provider status pages and SLAs',
    url: null,
    note: 'Hosts publish uptime guarantees and incident histories. These are vendor statements about commitments, not independent measurements.',
  },
  {
    name: 'Your own trial',
    url: null,
    note: 'Most hosts offer a money-back window. Moving a copy of your site and measuring it from your visitors’ regions is the most reliable test.',
  },
]

export default function BenchmarksPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Web Hosting Performance: How to Evaluate It</h1>
      <p className="text-lg text-gray-700 mb-6">
        HostPro Reviews does not publish its own speed or uptime test results. Instead of showing
        numbers we cannot back up, this page points to independent sources and explains how to
        check performance yourself.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Where to find real benchmarks</h2>
      <ul className="space-y-4 mb-8">
        {SOURCES.map((s) => (
          <li key={s.name} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <p className="font-semibold text-gray-900">
              {s.url ? (
                <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-indigo-600 hover:underline">
                  {s.name}
                </a>
              ) : (
                s.name
              )}
            </p>
            <p className="text-sm text-gray-600 mt-1">{s.note}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What to look at</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
        <li>Server response time (TTFB) measured on an uncached page from your visitors&apos; regions</li>
        <li>Behaviour under load, not just a single-page speed test</li>
        <li>Renewal pricing and plan limits, not only the intro price</li>
        <li>Support channels and hours as stated by the provider</li>
      </ul>

      <p className="text-gray-700 mb-2">
        Our editorial comparisons and reviews are based on published plan details and cited sources:
      </p>
      <p className="text-gray-700">
        <Link href="/review" className="text-indigo-600 hover:underline">Hosting reviews</Link>
        {' · '}
        <Link href="/compare" className="text-indigo-600 hover:underline">Comparisons</Link>
        {' · '}
        <Link href="/about" className="text-indigo-600 hover:underline">How we evaluate</Link>
      </p>
    </main>
  )
}

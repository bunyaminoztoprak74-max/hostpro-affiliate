import type { Metadata } from 'next'

const SITE_URL = 'https://www.hostproreviews.com'
const affiliateFeed = `${SITE_URL}/affiliate-products.rss`

export const metadata: Metadata = {
  title: 'RSS Feeds',
  description: 'Subscribe to HostPro Reviews articles and affiliate product updates.',
  alternates: { canonical: `${SITE_URL}/rss` },
}

export default function RssPage() {
  const feedlyUrl = `https://feedly.com/i/subscription/feed/${encodeURIComponent(affiliateFeed)}`
  const inoreaderUrl = `https://www.inoreader.com/feed/${encodeURIComponent(affiliateFeed)}`

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900">HostPro Reviews RSS Feeds</h1>
      <p className="mt-4 text-lg text-gray-600">
        This feed contains only commercial articles with active CJ affiliate links. Each item
        includes a CJ-served campaign image and a clear affiliate disclosure.
      </p>

      <div className="mt-10">
        <section className="rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900">CJ Affiliate Product Updates</h2>
          <p className="mt-2 text-sm text-gray-600">
            Monetizable reviews, comparisons, coupons, and offer-related updates only.
          </p>
          <a
            className="mt-5 inline-block font-semibold text-indigo-700 hover:underline"
            href="/affiliate-products.rss"
          >
            Open affiliate RSS →
          </a>
        </section>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href={feedlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
        >
          Follow in Feedly
        </a>
        <a
          href={inoreaderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Follow in Inoreader
        </a>
      </div>
    </main>
  )
}

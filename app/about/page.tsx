import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/about` },
  title: 'About HostPro Reviews — Our Editorial Team & Methodology',
  description: 'HostPro Reviews is an independent hosting and software review site. Our editorial team researches published plans, pricing, and policies and clearly labels what is editorial opinion versus third-party data.',
  openGraph: {
    title: 'About HostPro Reviews',
    description: 'Independent hosting and software reviews. Editorial research, clearly labelled sources, and affiliate disclosure.',
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
  },
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About HostPro Reviews</h1>

      <p className="text-lg text-gray-700 mb-6">
        HostPro Reviews is an independent hosting and software review website. Our editorial team
        researches providers using their published plans, pricing, documentation, and policies, and
        cites third-party sources where we rely on them.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Our Mission</h2>
      <p className="text-gray-700 mb-6">
        The hosting review space is crowded with sites that rank providers mainly by commission
        rates. HostPro Reviews aims to give clear, sourced comparisons instead. We disclose our
        affiliate relationships on every page that contains them.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How We Evaluate</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li><strong>Published plan and pricing review</strong> — we compare features, intro and renewal pricing, and policies as listed by each provider</li>
        <li><strong>Attributed third-party data</strong> — when we cite performance or uptime figures, we name the independent source</li>
        <li><strong>Vendor claims are labelled</strong> — guarantees and SLAs are presented as the provider&apos;s own statements</li>
        <li><strong>Editorial ratings</strong> — star ratings are our editorial opinion, not customer reviews or lab test scores</li>
        <li><strong>Updates</strong> — pages are revised when pricing, plans, or policies change</li>
      </ul>
      <p className="text-gray-700 mb-6">
        Unless an article explicitly says otherwise, it does not report HostProReviews lab tests of speed or uptime.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Our Team</h2>
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-full bg-indigo-600 text-white grid place-items-center font-bold text-lg flex-shrink-0"
            aria-hidden="true"
          >
            HP
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">HostPro Reviews Editorial Team</h3>
            <p className="text-indigo-600 font-medium text-sm mb-2">Editorial Team</p>
            <p className="text-gray-600 text-sm">
              Articles on this site are published by the HostPro Reviews editorial team. We do not
              publish individual author biographies or credentials.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Affiliate Disclosure</h2>
      <p className="text-gray-700 mb-4">
        HostPro Reviews earns commissions from some of the hosting providers we review through
        affiliate programs. This means we may receive a payment when you click a link and make a
        purchase — at no additional cost to you.
      </p>
      <p className="text-gray-700 mb-4">
        We aim to keep affiliate relationships from influencing our ratings and rankings, and we
        label commercial links. Please treat our ratings as editorial opinion and compare providers
        yourself before you buy.
      </p>
      <p className="text-gray-700 mb-6">
        Read our full{' '}
        <Link href="/disclosure" className="text-indigo-600 hover:underline">
          affiliate disclosure
        </Link>{' '}
        for details.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Contact</h2>
      <p className="text-gray-700 mb-2">
        For press enquiries, corrections, or partnership requests:
      </p>
      <p className="text-gray-700">
        Email:{' '}
        <a href="mailto:editor@hostproreviews.com" className="text-indigo-600 hover:underline">
          editor@hostproreviews.com
        </a>
      </p>
    </main>
  )
}

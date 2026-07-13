import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About HostPro Reviews — Our Team & Testing Methodology',
  description: 'HostPro Reviews is an independent web hosting review site. We purchase hosting plans at retail price, test them for 3–6 months, and publish honest, data-driven reviews.',
  openGraph: {
    title: 'About HostPro Reviews',
    description: 'Independent web hosting reviews based on real testing. No sponsored rankings. We buy our own plans.',
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
  },
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About HostPro Reviews</h1>

      <p className="text-lg text-gray-700 mb-6">
        HostPro Reviews is an independent web hosting review website. We purchase hosting plans at
        retail prices — no free plans, no sponsorships — test them for a minimum of 3 months using
        standardised benchmarks, and publish our honest findings.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Our Mission</h2>
      <p className="text-gray-700 mb-4">
        The hosting review space is filled with sites that rank providers based on commission rates
        rather than actual performance. HostPro Reviews exists to provide the kind of honest,
        data-driven analysis we wished existed when we were choosing our own hosting.
      </p>
      <p className="text-gray-700 mb-6">
        Every review on this site is based on real testing. We use automated uptime monitoring
        (UptimeRobot), standardised speed benchmarks (GTmetrix, Pingdom), and direct support
        interaction to evaluate each provider. We disclose our affiliate relationships clearly on
        every page that contains them.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How We Test</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li><strong>Minimum 3 months of live testing</strong> per provider before publishing a verdict</li>
        <li><strong>Uptime monitoring</strong> via UptimeRobot (5-minute checks, 24/7)</li>
        <li><strong>Speed benchmarks</strong> via GTmetrix from multiple global locations monthly</li>
        <li><strong>Support testing</strong> via 3+ real support tickets per provider</li>
        <li><strong>Anonymous purchase</strong> — we pay retail prices so results reflect real customer experience</li>
        <li><strong>Annual re-testing</strong> — reviews updated when significant infrastructure or pricing changes occur</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Our Team</h2>
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-full bg-indigo-600 text-white grid place-items-center font-bold text-lg flex-shrink-0"
            aria-hidden="true"
          >
            MW
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Marcus Webb</h3>
            <p className="text-indigo-600 font-medium text-sm mb-2">Lead Reviewer & Founder</p>
            <p className="text-gray-600 text-sm">
              Marcus founded HostPro Reviews after spending 18 months testing web hosting providers
              across three continents. He has personally migrated over 40 websites between hosts and
              holds a degree in Computer Engineering. He tests each provider for a minimum of 3 months
              before publishing a verdict.
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
        Our affiliate relationships do not influence our ratings or rankings. We have reviewed
        providers who offer high commissions and given them mediocre scores when testing revealed
        mediocre performance. We have also recommended lower-commission providers when their
        performance justified it.
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

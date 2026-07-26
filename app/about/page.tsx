import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About HostPro Reviews — Our Team & Testing Methodology',
  description: 'How HostPro Reviews checks hosting pricing, renewal terms, product documentation, support policies, and independently published performance evidence.',
  openGraph: {
    title: 'About HostPro Reviews',
    description: 'Web hosting research with transparent sources, pricing checks, renewal warnings, and affiliate disclosure.',
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
  },
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About HostPro Reviews</h1>

      <p className="text-lg text-gray-700 mb-6">
        HostPro Reviews is a web hosting research and comparison website. We check official plan
        documentation, current checkout terms, renewal pricing, support policies, and independent
        performance publications before updating a commercial page.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Our Mission</h2>
      <p className="text-gray-700 mb-4">
        The hosting review space is filled with sites that rank providers based on commission rates
        rather than actual performance. HostPro Reviews exists to provide the kind of honest,
        data-driven analysis we wished existed when we were choosing our own hosting.
      </p>
      <p className="text-gray-700 mb-6">
        We distinguish editorial research from hands-on testing. A page may describe a hands-on test
        only when it identifies the plan, setup, location, dates, tools, and evidence needed to
        understand the result. Affiliate relationships are disclosed on every commercial page.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How We Test</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li><strong>Pricing checks</strong> include introductory term, billing duration, and renewal rate</li>
        <li><strong>Feature checks</strong> use provider documentation and current plan pages</li>
        <li><strong>Performance claims</strong> name the source and methodology</li>
        <li><strong>Hands-on claims</strong> require a documented plan, setup, date, tools, and evidence</li>
        <li><strong>Corrections</strong> are applied when a plan, policy, or cited source changes</li>
        <li><strong>Affiliate disclosure</strong> appears before commercial recommendations</li>
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
              Marcus coordinates HostPro Reviews&apos; hosting research, pricing verification, source
              review, and editorial updates. Published pages separate documented provider facts,
              attributed third-party evidence, and editorial judgment.
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

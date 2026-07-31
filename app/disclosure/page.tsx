import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'Affiliate disclosure for HostPro Reviews — how we earn commissions and maintain editorial independence.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.hostproreviews.com/disclosure' },
}

export default function DisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Affiliate Disclosure</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: May 20, 2026</p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10 text-amber-800 text-sm leading-relaxed">
        <strong>Short version:</strong> Some links on this site are affiliate links. If you buy through
        them, we may earn a commission — at no extra cost to you. This does not affect our reviews or
        rankings.
      </div>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">What Is an Affiliate Link?</h2>
          <p>
            An affiliate link is a tracking link that tells a hosting company you came from our site.
            When you click one of these links and purchase a hosting plan, we earn a small commission.
            The price you pay is identical — affiliate commissions are paid by the hosting company, not
            by you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Our Affiliate Partners</h2>
          <p>HostPro Reviews has affiliate relationships with the following hosting companies:</p>

          <div className="mt-4 divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
            {[
              {
                name: 'Hostinger',
                program: 'Hostinger Affiliate Program',
                link: 'https://www.hostinger.com/web-hosting?REFERRALCODE=OFMBZTOPRZSU',
                note: 'Referral code: OFMBZTOPRZSU',
              },
              {
                name: 'Cloudways',
                program: 'Cloudways Affiliate Program',
                link: 'https://www.cloudways.com/en/?id=2170350',
                note: 'Partner ID: 2170350',
              },
              {
                name: 'Bluehost',
                program: 'Impact.com',
                link: 'https://www.bluehost.com',
                note: 'Pending affiliate approval',
              },
              {
                name: 'WP Engine',
                program: 'WP Engine Affiliate Program',
                link: 'https://wpengine.com',
                note: 'Pending affiliate approval',
              },
            ].map((partner) => (
              <div key={partner.name} className="flex items-start gap-4 p-4 bg-white">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{partner.name}</div>
                  <div className="text-sm text-gray-500">{partner.program}</div>
                </div>
                <div className="text-xs text-gray-400 text-right">{partner.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How Commissions Work</h2>
          <p>
            When you click an affiliate link on our site and make a qualifying purchase within the
            cookie window (typically 30–90 days depending on the partner), we receive a commission
            from the hosting company. The commission is:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Paid by the hosting company — not added to your price</li>
            <li>Typically a percentage of the sale or a fixed amount per signup</li>
            <li>Tracked via cookies in your browser</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Our Editorial Independence</h2>
          <p>
            <strong>Affiliate commissions do not influence our reviews or rankings.</strong>
          </p>
          <p className="mt-3">
            Every host reviewed on this site is tested with real websites, real uptime monitoring, and
            real support conversations. Our rankings are based on measurable performance data — speed,
            uptime, support response times, and value — not on which company pays the highest
            commission.
          </p>
          <p className="mt-3">
            We recommend Hostinger as our #1 pick because it earns top marks in our tests, not because
            of commission rates. We have affiliate relationships with other hosts we rate lower than
            Hostinger, and some top-performing hosts we recommend without any affiliate relationship
            at all.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">FTC Compliance</h2>
          <p>
            This disclosure is provided in compliance with the United States Federal Trade Commission
            (FTC) guidelines on endorsements and testimonials. Where affiliate links appear in our
            content, we use labels such as &quot;affiliate link&quot; or &quot;sponsored&quot; in the
            link attributes, and we include affiliate disclosures at the top of posts containing such
            links.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How to Support Us Without Buying Anything</h2>
          <p>
            If you find our content useful but don&apos;t want to use affiliate links, you can support us
            by sharing our articles, subscribing to our newsletter, or bookmarking our site for future
            reference. These actions cost nothing and help us continue publishing independent reviews.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Questions?</h2>
          <p>
            If you have any questions about our affiliate relationships or how we review hosting
            providers, contact us at{' '}
            <a href="mailto:bunyamin.oztoprak74@gmail.com" className="text-indigo-600 hover:underline">
              bunyamin.oztoprak74@gmail.com
            </a>.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600">← Home</Link>
        <Link href="/privacy" className="hover:text-gray-600">Privacy Policy →</Link>
      </div>
    </div>
  )
}

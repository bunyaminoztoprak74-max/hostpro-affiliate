import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for HostPro Reviews — how we collect, use, and protect your data.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: May 20, 2026</p>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Who We Are</h2>
          <p>
            HostPro Reviews (<strong>hostproreviews.com</strong>) is an independent website that publishes
            web hosting reviews, comparisons, and tutorials. We are operated by an individual based in
            Turkey. You can contact us at{' '}
            <a href="mailto:bunyamin.oztoprak74@gmail.com" className="text-indigo-600 hover:underline">
              bunyamin.oztoprak74@gmail.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. What Data We Collect</h2>
          <p>We collect the following types of data:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <strong>Email address</strong> — if you voluntarily subscribe to our newsletter via
              Beehiiv. We use this solely to send you hosting tips and updates.
            </li>
            <li>
              <strong>Analytics data</strong> — page views, referral sources, and device types
              collected via privacy-friendly analytics tools. This data is aggregated and never linked
              to individuals.
            </li>
            <li>
              <strong>Cookies</strong> — we use functional cookies to improve user experience. We do
              not use advertising cookies or sell your data to third parties.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To send newsletter emails (only if you subscribed)</li>
            <li>To understand how our content is used and improve it</li>
            <li>To process affiliate referrals (through third-party affiliate programs)</li>
          </ul>
          <p className="mt-3">We do not sell, rent, or share your personal data with any third party for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Affiliate Links & Third Parties</h2>
          <p>
            This website contains affiliate links. When you click an affiliate link and make a purchase,
            we may earn a commission at no extra cost to you. Affiliate partners include:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Hostinger (via referral program)</li>
            <li>Cloudways (via affiliate program)</li>
            <li>Bluehost (via Impact.com)</li>
            <li>WP Engine (via affiliate program)</li>
          </ul>
          <p className="mt-3">
            These third-party sites have their own privacy policies, which we encourage you to review.
            We are not responsible for their data practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Newsletter (Beehiiv)</h2>
          <p>
            If you subscribe to our newsletter, your email address is stored and processed by{' '}
            <a href="https://beehiiv.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
              Beehiiv
            </a>
            , our email service provider. You can unsubscribe at any time by clicking the unsubscribe
            link at the bottom of any email we send.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your Rights (GDPR)</h2>
          <p>If you are located in the European Economic Area, you have the right to:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Request data portability</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:bunyamin.oztoprak74@gmail.com" className="text-indigo-600 hover:underline">
              bunyamin.oztoprak74@gmail.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Data Retention</h2>
          <p>
            We retain email addresses for as long as you remain subscribed to our newsletter. Analytics
            data is retained in aggregated form indefinitely and contains no personally identifiable
            information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be reflected by the "Last
            updated" date at the top of this page. Continued use of the site after changes constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact Us</h2>
          <p>
            For any privacy-related questions, contact us at{' '}
            <a href="mailto:bunyamin.oztoprak74@gmail.com" className="text-indigo-600 hover:underline">
              bunyamin.oztoprak74@gmail.com
            </a>.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600">← Home</Link>
        <Link href="/disclosure" className="hover:text-gray-600">Affiliate Disclosure →</Link>
      </div>
    </div>
  )
}

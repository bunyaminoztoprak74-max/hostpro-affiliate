import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | HostPro Reviews',
  description: 'Get in touch with the HostPro Reviews team. Questions about our hosting recommendations, affiliate disclosures, or partnership enquiries.',
  openGraph: {
    title: 'Contact Us | HostPro Reviews',
    description: 'Reach the HostPro Reviews editorial team.',
    url: 'https://hostproreviews.com/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-10">
        Have a question about one of our reviews, spotted an error, or want to discuss a
        partnership? We read every message and aim to respond within 2 business days.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Editorial Team</h2>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl flex-shrink-0">
              M
            </div>
            <div>
              <p className="font-semibold text-gray-900">Marcus Webb</p>
              <p className="text-sm text-gray-500 mb-2">Lead Reviewer &amp; Editor-in-Chief</p>
              <p className="text-sm text-gray-600">
                Marcus has been testing web hosting services since 2017. Every hosting recommendation
                on this site is based on hands-on testing using real WordPress installations — not
                vendor-supplied data.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Get in Touch</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-blue-600 mt-0.5">✉</span>
            <div>
              <p className="font-medium text-gray-900">General enquiries &amp; corrections</p>
              <a
                href="mailto:hello@hostproreviews.com"
                className="text-blue-600 hover:underline text-sm"
              >
                hello@hostproreviews.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-blue-600 mt-0.5">🤝</span>
            <div>
              <p className="font-medium text-gray-900">Partnership &amp; sponsorship</p>
              <a
                href="mailto:partners@hostproreviews.com"
                className="text-blue-600 hover:underline text-sm"
              >
                partners@hostproreviews.com
              </a>
              <p className="text-xs text-gray-500 mt-1">
                We only partner with services we genuinely recommend. See our{' '}
                <a href="/about" className="underline">
                  affiliate disclosure
                </a>{' '}
                for details.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Common Questions</h2>
        <div className="space-y-5">
          <div>
            <h3 className="font-medium text-gray-900">How do you test hosting providers?</h3>
            <p className="text-sm text-gray-600 mt-1">
              We sign up and pay for plans ourselves, install fresh WordPress sites, and run uptime
              monitoring for a minimum of 60 days before publishing a review. Load time is measured
              using GTmetrix and Google PageSpeed Insights.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Do hosts pay to be featured?</h3>
            <p className="text-sm text-gray-600 mt-1">
              No. Rankings are based solely on our test results. We earn commission when readers
              sign up through our affiliate links — this never affects our ratings. Hosts we rate
              poorly are still listed honestly.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Can I request a host review?</h3>
            <p className="text-sm text-gray-600 mt-1">
              Yes — email us the host name and why you&apos;d like it reviewed. We add promising
              suggestions to our testing queue.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Response Times</h2>
        <p className="text-sm text-gray-600">
          We aim to reply to all email enquiries within <strong>2 business days</strong> (Mon–Fri,
          GMT). For urgent corrections to published content, please mark your subject line{' '}
          <em>Correction Request</em> and we will prioritise it.
        </p>
      </section>
    </main>
  );
}

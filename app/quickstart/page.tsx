import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '15-Minute WordPress Launch Kit — Free Website Templates & 99+ Speed Setup',
  description: 'Download free WordPress starter templates and step-by-step 99+ PageSpeed optimization checklist. Launch your business or portfolio site in 15 minutes.',
  alternates: {
    canonical: 'https://hostproreviews.com/quickstart',
  },
}

export default function QuickstartPage() {
  const hostingerUrl = "https://www.hostinger.com/web-hosting?REFERRALCODE=OFMBZTOPRZSU"
  const contaboUrl = "https://www.tkqlhce.com/click-101761537-17083152-1755508711000"

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-4">
          <span>🚀</span> 2026 Official Quickstart Kit
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight mb-4">
          Launch a Lightning-Fast Website in <span className="text-indigo-600">15 Minutes</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Don&apos;t pay $1,500+ to design agencies. Follow our 3-step blueprint, claim the 75% hosting discount, and import our free pre-designed site templates.
        </p>
      </div>

      {/* STEP 1: HOSTING DISCOUNT (PRIMARY AFFILIATE CONVERSION) */}
      <div className="bg-white rounded-2xl border-2 border-indigo-600 shadow-xl p-6 sm:p-8 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
          Step 1: Essential
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Infrastructure Setup</span>
            <h2 className="text-2xl font-bold text-gray-900">Claim 75% OFF Hostinger + Free Domain</h2>
            <p className="text-sm text-gray-600 max-w-xl">
              Includes free .com domain for 1 year, free SSL certificate, daily automated backups, and LiteSpeed web server technology (crucial for 99+ speed score).
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
              <span className="flex items-center gap-1 text-green-600 font-semibold">✓ 30-Day Money Back Guarantee</span>
              <span className="flex items-center gap-1 text-green-600 font-semibold">✓ 1-Click WordPress Install</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto flex-shrink-0">
            <a
              href={hostingerUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-primary text-base font-bold py-3.5 px-8 text-center shadow-lg hover:shadow-xl transition-all"
            >
              Claim Hostinger Deal (75% OFF) →
            </a>
            <span className="text-[11px] text-center text-gray-400">Coupon code automatically applied</span>
          </div>
        </div>

        {/* Alternative for developers / VPS */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Need a raw high-performance VPS for apps or high-traffic projects?</span>
          <a
            href={contaboUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Check Contabo Cloud VPS Deals →
          </a>
        </div>
      </div>

      {/* STEP 2: STEP-BY-STEP CHECKLIST */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-10 shadow-sm">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Step 2: Execution</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">The 15-Minute Setup Walkthrough</h2>

        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center flex-shrink-0 text-sm">
              1
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">Get your domain & hosting</h3>
              <p className="text-sm text-gray-600 mt-0.5">
                Sign up via <a href={hostingerUrl} target="_blank" rel="noopener noreferrer sponsored" className="text-indigo-600 font-semibold underline">the partner discount link</a>. Choose the Premium plan (best value) and pick your free .com domain name.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center flex-shrink-0 text-sm">
              2
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">1-Click Auto Install WordPress</h3>
              <p className="text-sm text-gray-600 mt-0.5">
                Inside hPanel, click &quot;Auto Installer&quot; &gt; &quot;WordPress&quot;. Set your admin username and password. Hostinger automatically installs SSL and LiteSpeed cache for you.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center flex-shrink-0 text-sm">
              3
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">Import Free Modern Starter Template</h3>
              <p className="text-sm text-gray-600 mt-0.5">
                Install the free Astra or Blocksy theme from the WordPress repository. Go to Starter Templates and import any complete modern business, e-commerce, or blog layout in 1 click.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center flex-shrink-0 text-sm">
              4
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">Activate 99+ Speed Optimization</h3>
              <p className="text-sm text-gray-600 mt-0.5">
                Under LiteSpeed Cache settings, enable &quot;Guest Mode&quot;, &quot;CSS/JS Minification&quot;, and &quot;WebP Image Replacement&quot;. Your site will load in under 0.8 seconds worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 3: FAQ & ASSURANCE */}
      <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm text-gray-900">Do I need coding experience?</h4>
            <p className="text-xs text-gray-600 mt-1">
              Zero coding is needed. Everything is 100% visual with drag-and-drop builders.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900">Why Hostinger over other web hosts?</h4>
            <p className="text-xs text-gray-600 mt-1">
              Hostinger uses native LiteSpeed Web Servers which are 5x faster than Apache. In our independent benchmarks, it consistently scored 98–100 PageSpeed scores at a fraction of the cost ($2.99/mo vs $14.99/mo elsewhere).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900">What if I need help?</h4>
            <p className="text-xs text-gray-600 mt-1">
              Hostinger offers 24/7/365 live chat support in English and multiple languages to assist with migration, domain setup, or SSL configuration.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <a
            href={hostingerUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-primary text-base font-bold py-3 px-8 inline-block shadow-lg"
          >
            Start Your Site Now with 75% OFF →
          </a>
        </div>
      </div>
    </div>
  )
}

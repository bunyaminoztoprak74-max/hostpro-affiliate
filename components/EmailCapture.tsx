// Update subscribeUrl with your Beehiiv/Substack subscribe link
const SUBSCRIBE_URL = 'https://hostproreviews.beehiiv.com/subscribe'

const CHEAT_SHEET_ITEMS = [
  '11 hosts ranked by speed, uptime & price',
  'Renewal price traps to avoid',
  'Best host for WordPress, WooCommerce & agencies',
  'Exclusive discount codes for 2026',
]

interface Props {
  variant?: 'default' | 'compact' | 'inline'
}

export default function EmailCapture({ variant = 'default' }: Props) {
  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">📋</span>
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">Free Download</span>
        </div>
        <h3 className="font-extrabold text-gray-900 text-sm mb-1 leading-snug">
          2026 Hosting Comparison Cheat Sheet
        </h3>
        <p className="text-xs text-gray-500 mb-3 leading-snug">
          11 hosts ranked side-by-side. Renewal prices, discount codes, and our top picks — one page.
        </p>
        <a
          href={SUBSCRIBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Get It Free →
        </a>
        <p className="text-center text-xs text-gray-400 mt-2">Join 2,400+ readers · No spam</p>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6 my-8">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="text-4xl flex-shrink-0">📋</div>
          <div className="flex-1">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1">Free Download</p>
            <p className="font-extrabold text-gray-900 text-lg leading-tight mb-2">
              2026 Web Hosting Comparison Cheat Sheet
            </p>
            <ul className="space-y-1 mb-4">
              {CHEAT_SHEET_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-indigo-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors text-sm"
            >
              Get the Free Cheat Sheet →
            </a>
            <p className="text-xs text-gray-400 mt-2">Free · Join 2,400+ readers · Unsubscribe anytime</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white mt-12">
      <div className="max-w-lg mx-auto text-center">
        <div className="text-5xl mb-4">📋</div>
        <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2">Free Download</p>
        <h3 className="text-2xl font-extrabold mb-2">2026 Hosting Comparison Cheat Sheet</h3>
        <p className="text-indigo-200 text-sm leading-relaxed mb-6">
          Everything you need to pick the right host — on one page. Trusted by 2,400+ readers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7 text-left">
          {CHEAT_SHEET_ITEMS.map((item) => (
            <div key={item} className="flex items-start gap-2 bg-white/10 rounded-xl px-3 py-2.5">
              <span className="text-green-300 font-bold flex-shrink-0 mt-0.5">✓</span>
              <span className="text-sm text-white/90">{item}</span>
            </div>
          ))}
        </div>
        <a
          href={SUBSCRIBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-white text-indigo-700 font-extrabold rounded-xl hover:bg-yellow-50 transition-all shadow-lg hover:-translate-y-0.5 text-sm"
        >
          Get the Free Cheat Sheet →
        </a>
        <p className="text-indigo-300 text-xs mt-4">Free forever · No credit card · Unsubscribe anytime</p>
      </div>
    </div>
  )
}

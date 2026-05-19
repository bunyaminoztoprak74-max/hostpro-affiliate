// Update subscribeUrl with your Beehiiv/Substack subscribe link
const SUBSCRIBE_URL = 'https://hostproreviews.beehiiv.com/subscribe'

interface Props {
  variant?: 'default' | 'compact' | 'inline'
}

export default function EmailCapture({ variant = 'default' }: Props) {
  if (variant === 'compact') {
    return (
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
        <div className="text-2xl mb-2">📬</div>
        <h3 className="font-bold text-gray-900 text-sm mb-1">Free: Hosting Cheat Sheet</h3>
        <p className="text-xs text-gray-500 mb-3 leading-snug">
          Get our Web Hosting Comparison Cheat Sheet — free for subscribers.
        </p>
        <a
          href={SUBSCRIBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Get the Free Cheat Sheet →
        </a>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 my-8">
        <div className="text-4xl flex-shrink-0">📬</div>
        <div className="flex-1 text-center sm:text-left">
          <p className="font-bold text-gray-900">Free: Web Hosting Comparison Cheat Sheet</p>
          <p className="text-sm text-gray-500 mt-0.5">
            Join our free newsletter and get the cheat sheet instantly.
          </p>
        </div>
        <a
          href={SUBSCRIBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors text-sm whitespace-nowrap"
        >
          Subscribe Free →
        </a>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mt-12 text-center">
      <div className="text-4xl mb-4">📬</div>
      <h3 className="text-2xl font-extrabold mb-2">Free: Web Hosting Comparison Cheat Sheet</h3>
      <p className="text-indigo-200 text-sm leading-relaxed mb-6 max-w-md mx-auto">
        Join 2,000+ readers who get our weekly hosting deals and our free side-by-side
        comparison cheat sheet for 2026. No spam — unsubscribe anytime.
      </p>
      <a
        href={SUBSCRIBE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-yellow-50 transition-all shadow-lg hover:-translate-y-0.5"
      >
        Get the Free Cheat Sheet →
      </a>
      <p className="text-indigo-300 text-xs mt-4">Free forever. No credit card needed.</p>
    </div>
  )
}

import type { ComparisonHost } from '@/lib/comparisons'

interface Props {
  host1: ComparisonHost
  host2: ComparisonHost
  winner: 1 | 2 | 'tie'
}

interface HostCardProps {
  host: ComparisonHost
  isWinner: boolean
}

function HostCard({ host, isWinner }: HostCardProps) {
  return (
    <div
      className={`relative rounded-2xl border-2 p-6 bg-white flex flex-col ${
        isWinner ? 'border-indigo-500 shadow-xl shadow-indigo-100' : 'border-gray-200'
      }`}
    >
      {isWinner && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold bg-indigo-600 text-white shadow">
            🏆 Recommended Pick
          </span>
        </div>
      )}

      <div className="text-center mb-6 pt-2">
        <div className="text-4xl mb-2">{host.emoji}</div>
        <h3 className="text-xl font-bold text-gray-900">{host.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{host.tagline}</p>
      </div>

      <div className="border-b border-gray-100 pb-6 mb-6 text-center">
        <div className="flex items-end justify-center gap-1 mb-1">
          <span className="text-4xl font-extrabold text-gray-900">{host.introPrice}</span>
          <span className="text-gray-400 mb-1 text-sm">/mo</span>
        </div>
        <p className="text-xs text-gray-400">{host.billingNote}</p>
        <div className="flex items-center justify-center gap-2 mt-3 text-sm">
          <span className="text-gray-400">Renews at</span>
          <span className="font-semibold text-gray-600">{host.renewalPrice}/mo</span>
        </div>
      </div>

      <ul className="space-y-3 mb-6 flex-1">
        {host.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
            <span className="text-green-500 font-bold text-base flex-shrink-0">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={host.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`block w-full text-center py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 ${
          isWinner
            ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-indigo-200'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Get {host.name} →
      </a>
    </div>
  )
}

export default function PricingBlock({ host1, host2, winner }: Props) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">Pricing Comparison</h2>
          <p className="text-gray-500 mt-2">
            Intro prices are promotional. Always factor in renewal rates before committing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <HostCard host={host1} isWinner={winner === 1} />
          <HostCard host={host2} isWinner={winner === 2} />
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Prices reflect promotional rates at time of testing. We earn commissions from affiliate links at no cost to you.
        </p>
      </div>
    </section>
  )
}

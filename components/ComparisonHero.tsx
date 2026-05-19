import type { Comparison } from '@/lib/comparisons'

interface Props {
  comparison: Comparison
}

export default function ComparisonHero({ comparison }: Props) {
  const { host1, host2, winner } = comparison
  const winnerHost = winner === 1 ? host1 : winner === 2 ? host2 : null

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 text-white py-16">
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white mb-4">
            2026 Comparison
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-3 leading-tight">
            {host1.name}{' '}
            <span className="text-indigo-300">vs</span>{' '}
            {host2.name}
          </h1>
          <p className="text-white/70 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
            {comparison.winnerReason}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 items-stretch">
          {/* Host 1 */}
          <div
            className={`rounded-2xl p-6 text-center flex flex-col ${
              winner === 1
                ? 'bg-white text-gray-900 ring-4 ring-yellow-400 shadow-2xl'
                : 'bg-white/10 backdrop-blur-sm text-white'
            }`}
          >
            {winner === 1 && (
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-yellow-900 mb-3 mx-auto">
                Winner 🏆
              </div>
            )}
            <div className="text-4xl mb-3">{host1.emoji}</div>
            <h2 className="text-xl font-extrabold mb-1">{host1.name}</h2>
            <p className={`text-sm mb-3 ${winner === 1 ? 'text-gray-500' : 'text-white/60'}`}>{host1.tagline}</p>
            <div className={`text-2xl font-extrabold mb-1 ${winner === 1 ? 'text-indigo-600' : 'text-white'}`}>
              {host1.introPrice}
              <span className={`text-sm font-normal ${winner === 1 ? 'text-gray-400' : 'text-white/60'}`}>/mo</span>
            </div>
            <div className="text-amber-400 text-sm font-semibold mb-4">
              {'★'.repeat(Math.round(host1.rating))}{' '}
              <span className={winner === 1 ? 'text-gray-500' : 'text-white/50'}>{host1.rating}/5</span>
            </div>
            <a
              href={host1.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={`mt-auto block w-full py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 ${
                winner === 1
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Visit {host1.name} →
            </a>
          </div>

          {/* VS Divider */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-2xl font-black text-white shadow-inner">
              VS
            </div>
            {winnerHost ? (
              <div className="text-center">
                <p className="text-white/50 text-xs mb-1">Winner</p>
                <p className="text-white font-bold text-sm">{winnerHost.name}</p>
              </div>
            ) : (
              <p className="text-white/50 text-xs text-center">Depends on use case</p>
            )}
          </div>

          {/* Host 2 */}
          <div
            className={`rounded-2xl p-6 text-center flex flex-col ${
              winner === 2
                ? 'bg-white text-gray-900 ring-4 ring-yellow-400 shadow-2xl'
                : 'bg-white/10 backdrop-blur-sm text-white'
            }`}
          >
            {winner === 2 && (
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-yellow-900 mb-3 mx-auto">
                Winner 🏆
              </div>
            )}
            <div className="text-4xl mb-3">{host2.emoji}</div>
            <h2 className="text-xl font-extrabold mb-1">{host2.name}</h2>
            <p className={`text-sm mb-3 ${winner === 2 ? 'text-gray-500' : 'text-white/60'}`}>{host2.tagline}</p>
            <div className={`text-2xl font-extrabold mb-1 ${winner === 2 ? 'text-indigo-600' : 'text-white'}`}>
              {host2.introPrice}
              <span className={`text-sm font-normal ${winner === 2 ? 'text-gray-400' : 'text-white/60'}`}>/mo</span>
            </div>
            <div className="text-amber-400 text-sm font-semibold mb-4">
              {'★'.repeat(Math.round(host2.rating))}{' '}
              <span className={winner === 2 ? 'text-gray-500' : 'text-white/50'}>{host2.rating}/5</span>
            </div>
            <a
              href={host2.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={`mt-auto block w-full py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 ${
                winner === 2
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Visit {host2.name} →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

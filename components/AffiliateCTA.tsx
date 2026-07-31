import type { ComparisonHost } from '@/lib/comparisons'

interface Props {
  host1: ComparisonHost
  host2: ComparisonHost
  winner: 1 | 2 | 'tie'
  winnerReason: string
}

export default function AffiliateCTA({ host1, host2, winner, winnerReason }: Props) {
  const winnerHost = winner === 1 ? host1 : winner === 2 ? host2 : null
  const runnerUp = winner === 1 ? host2 : winner === 2 ? host1 : null

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {winnerHost && runnerUp ? (
          <>
            <div className="text-5xl mb-4">{winnerHost.emoji}</div>
            <h2 className="text-3xl font-extrabold mb-3">
              Our Verdict: {winnerHost.name} Wins
            </h2>
            <p className="text-indigo-200 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              {winnerReason}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={winnerHost.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-yellow-50 transition-all shadow-xl hover:-translate-y-0.5"
              >
                Get {winnerHost.name} — {winnerHost.introPrice}/mo →
              </a>
              <a
                href={runnerUp.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl border border-white/30 hover:bg-white/30 transition-all hover:-translate-y-0.5"
              >
                Try {runnerUp.name} Instead
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4">⚖️</div>
            <h2 className="text-3xl font-extrabold mb-3">It Depends on Your Needs</h2>
            <p className="text-indigo-200 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              {winnerReason}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={host1.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-yellow-50 transition-all shadow-xl hover:-translate-y-0.5"
              >
                {host1.emoji} {host1.name} — {host1.introPrice}/mo →
              </a>
              <a
                href={host2.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl border border-white/30 hover:bg-white/30 transition-all hover:-translate-y-0.5"
              >
                {host2.emoji} {host2.name} — {host2.introPrice}/mo →
              </a>
            </div>
          </>
        )}

        <p className="text-indigo-300/60 text-xs mt-8 max-w-xl mx-auto">
          Affiliate disclosure: We earn a commission if you purchase through our links, at no extra
          cost to you. Our recommendations remain independent and based on real testing.
        </p>
      </div>
    </section>
  )
}

import type { QuizResult } from '@/lib/quiz-engine'
import EmailCapture from '@/components/EmailCapture'

interface Props {
  results: QuizResult[]
  onRetake: () => void
}

function MatchBadge({ percentage, large }: { percentage: number; large?: boolean }) {
  const color =
    percentage >= 90
      ? 'bg-green-100 text-green-700 border-green-200'
      : percentage >= 75
      ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
      : 'bg-gray-100 text-gray-600 border-gray-200'

  return (
    <span
      className={`inline-flex items-center border font-bold rounded-full ${color} ${
        large ? 'px-4 py-1.5 text-base' : 'px-3 py-1 text-sm'
      }`}
    >
      {percentage}% match
    </span>
  )
}

function WinnerCard({ result }: { result: QuizResult }) {
  const { host, percentage, reasons } = result
  return (
    <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-xl shadow-indigo-100">
      {/* Gradient header */}
      <div className={`bg-gradient-to-br ${host.gradient} p-6 text-white`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-4xl">{host.emoji}</span>
              <div>
                <div className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-0.5">
                  #1 Recommended
                </div>
                <h2 className="text-2xl font-extrabold">{host.name}</h2>
              </div>
            </div>
            <p className="text-white/80 text-sm">{host.tagline}</p>
          </div>
          <MatchBadge percentage={percentage} large />
        </div>

        <div className="mt-5 flex items-end gap-1">
          <span className="text-4xl font-extrabold">{host.price}</span>
        </div>
      </div>

      {/* Reasons */}
      <div className="bg-white p-6">
        <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide mb-3">
          Why it matches you
        </h3>
        <ul className="space-y-2.5 mb-6">
          {reasons.map((r, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-snug">
              <span className="text-indigo-500 font-bold flex-shrink-0 mt-0.5">✦</span>
              {r}
            </li>
          ))}
        </ul>

        <a
          href={host.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full text-center py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-200 hover:-translate-y-0.5 text-lg"
        >
          Get {host.name} — {host.price} →
        </a>

        <p className="text-xs text-gray-400 text-center mt-3">
          Affiliate link — we may earn a commission at no extra cost to you.
        </p>
      </div>
    </div>
  )
}

function RunnerUpCard({ result, rank }: { result: QuizResult; rank: number }) {
  const { host, percentage, reasons } = result
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{host.emoji}</span>
          <div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
              #{rank} Pick
            </div>
            <h3 className="font-bold text-gray-900 text-lg">{host.name}</h3>
          </div>
        </div>
        <MatchBadge percentage={percentage} />
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-4">{reasons[0]}</p>

      <div className="flex items-center justify-between gap-3">
        <span className="font-bold text-gray-900">{host.price}</span>
        <a
          href={host.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-sm"
        >
          Visit {host.name} →
        </a>
      </div>
    </div>
  )
}

export default function QuizResults({ results, onRetake }: Props) {
  const [winner, ...runnerUps] = results

  return (
    <div className="animate-quiz-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-3xl mb-4">
          🎯
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">Your Perfect Match</h2>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          Based on your answers, here are the best hosting options for your specific needs.
        </p>
      </div>

      {/* Winner */}
      <WinnerCard result={winner} />

      {/* Runner-ups */}
      {runnerUps.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-widest mb-4 text-center">
            Other Good Options
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {runnerUps.slice(0, 2).map((result, i) => (
              <RunnerUpCard key={result.host.id} result={result} rank={i + 2} />
            ))}
          </div>
        </div>
      )}

      {/* Retake */}
      <div className="mt-10 text-center">
        <button
          onClick={onRetake}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
        >
          ↩ Retake Quiz
        </button>
        <p className="text-xs text-gray-400 mt-3">
          Change your answers to see different recommendations.
        </p>
      </div>

      {/* Newsletter */}
      <EmailCapture variant="inline" />
    </div>
  )
}

import type { ComparisonHost } from '@/lib/comparisons'

interface Props {
  host1: ComparisonHost
  host2: ComparisonHost
}

function scoreColor(score: number): string {
  if (score >= 90) return 'bg-green-500'
  if (score >= 75) return 'bg-yellow-500'
  return 'bg-red-500'
}

function ScoreBar({
  label,
  value,
  score,
  isWinner,
}: {
  label: string
  value: string
  score: number
  isWinner: boolean
}) {
  return (
    <div className={`p-4 rounded-xl ${isWinner ? 'bg-indigo-50 border border-indigo-100' : 'bg-gray-50'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className={`text-sm font-bold ${isWinner ? 'text-indigo-700' : 'text-gray-600'}`}>
          {value}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${scoreColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="text-xs text-gray-400 mt-1 text-right">{score}/100</div>
    </div>
  )
}

function HostScoreCard({ host, other }: { host: ComparisonHost; other: ComparisonHost }) {
  const metrics = [
    { label: 'Page Speed', value: host.speed, score: host.speedScore, otherScore: other.speedScore },
    { label: 'Uptime', value: host.uptime, score: host.uptimeScore, otherScore: other.uptimeScore },
    { label: 'Support Quality', value: host.support, score: host.supportScore, otherScore: other.supportScore },
    { label: 'Value for Money', value: `${host.valueScore}/100`, score: host.valueScore, otherScore: other.valueScore },
  ]

  const overall = Math.round(
    (host.speedScore + host.uptimeScore + host.supportScore + host.valueScore) / 4
  )

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{host.emoji}</span>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{host.name}</h3>
          <div className="text-amber-500 text-sm font-semibold">★ {host.rating}/5</div>
        </div>
      </div>

      <div className="space-y-3">
        {metrics.map((m) => (
          <ScoreBar
            key={m.label}
            label={m.label}
            value={m.value}
            score={m.score}
            isWinner={m.score > m.otherScore}
          />
        ))}
      </div>

      <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between">
        <span className="font-semibold text-gray-900">Overall Score</span>
        <span
          className={`text-2xl font-extrabold ${
            overall >= 85 ? 'text-green-600' : overall >= 70 ? 'text-yellow-600' : 'text-red-600'
          }`}
        >
          {overall}/100
        </span>
      </div>
    </div>
  )
}

export default function SpeedScore({ host1, host2 }: Props) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">Performance Scores</h2>
          <p className="text-gray-500 mt-2">
            Based on 6 months of real-world testing, uptime monitoring, and support evaluations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HostScoreCard host={host1} other={host2} />
          <HostScoreCard host={host2} other={host1} />
        </div>
      </div>
    </section>
  )
}

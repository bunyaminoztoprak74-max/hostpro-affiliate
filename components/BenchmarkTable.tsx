import { getBenchmarkBySlug, getAllBenchmarks, type HostBenchmark } from '@/lib/benchmarks'

function ttfbColor(ms: number): string {
  if (ms < 200) return 'text-green-700 bg-green-50'
  if (ms < 400) return 'text-yellow-700 bg-yellow-50'
  return 'text-red-700 bg-red-50'
}

function loadColor(ms: number): string {
  if (ms < 800) return 'text-green-700 bg-green-50'
  if (ms < 1200) return 'text-yellow-700 bg-yellow-50'
  return 'text-red-700 bg-red-50'
}

function uptimeColor(pct: number): string {
  if (pct >= 99.9) return 'text-green-700 bg-green-50'
  if (pct >= 99.5) return 'text-yellow-700 bg-yellow-50'
  return 'text-red-700 bg-red-50'
}

function supportColor(score: number): string {
  if (score >= 9) return 'text-green-700 bg-green-50'
  if (score >= 8) return 'text-yellow-700 bg-yellow-50'
  return 'text-red-700 bg-red-50'
}

function Chip({ value, colorClass }: { value: string; colorClass: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold ${colorClass}`}>
      {value}
    </span>
  )
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 90 ? 'bg-green-500' : score >= 75 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-bold text-gray-700 tabular-nums">{score}/100</span>
    </div>
  )
}

function BenchmarkRow({ b, isWinner }: { b: HostBenchmark; isWinner: boolean }) {
  return (
    <tr className={isWinner ? 'bg-indigo-50/60' : 'hover:bg-gray-50/60'}>
      <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">
        {b.host}
        {isWinner && (
          <span className="ml-2 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full font-semibold">
            Fastest
          </span>
        )}
      </td>
      <td className="px-4 py-3">
        <Chip value={`${b.ttfb}ms`} colorClass={ttfbColor(b.ttfb)} />
      </td>
      <td className="px-4 py-3">
        <Chip value={`${b.loadTime}ms`} colorClass={loadColor(b.loadTime)} />
      </td>
      <td className="px-4 py-3">
        <Chip value={`${b.uptime}%`} colorClass={uptimeColor(b.uptime)} />
      </td>
      <td className="px-4 py-3">
        <Chip value={`${b.supportScore}/10`} colorClass={supportColor(b.supportScore)} />
      </td>
      <td className="px-4 py-3">
        <ScoreBar score={b.speedScore} />
      </td>
    </tr>
  )
}

interface Props {
  hostSlug?: string
  showAll?: boolean
}

export default function BenchmarkTable({ hostSlug, showAll }: Props) {
  const benchmarks = showAll
    ? getAllBenchmarks()
    : hostSlug
    ? ([getBenchmarkBySlug(hostSlug)].filter(Boolean) as HostBenchmark[])
    : []

  if (benchmarks.length === 0) return null

  const fastest = [...benchmarks].sort((a, b) => b.speedScore - a.speedScore)[0]

  return (
    <div className="my-8 rounded-2xl border border-gray-200 overflow-hidden shadow-sm not-prose">
      <div className="bg-gray-900 px-5 py-3 flex items-center justify-between gap-4">
        <h3 className="text-white font-bold text-sm">
          {showAll
            ? 'Performance Benchmark — All Hosts'
            : `${benchmarks[0]?.host} Performance Benchmark`}
        </h3>
        <span className="text-xs text-gray-400 whitespace-nowrap">{benchmarks[0]?.testDate} · US East</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Host</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">TTFB</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Load Time</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Uptime</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Support</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Speed Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {benchmarks.map((b) => (
              <BenchmarkRow key={b.hostSlug} b={b} isWinner={b.hostSlug === fastest.hostSlug} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-5 py-2 border-t border-gray-200">
        <p className="text-xs text-gray-400">
          TTFB &lt;200ms = excellent · Load &lt;800ms = excellent · Uptime ≥99.9% = excellent · Tested on real WordPress sites
        </p>
      </div>
    </div>
  )
}

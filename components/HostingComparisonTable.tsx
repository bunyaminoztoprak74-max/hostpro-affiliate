import type { ComparisonRow } from '@/lib/comparisons'

interface Props {
  rows: ComparisonRow[]
  host1Name: string
  host2Name: string
  winner: 1 | 2 | 'tie'
}

function CellValue({ value, isWinner }: { value: string | boolean; isWinner: boolean }) {
  if (typeof value === 'boolean') {
    return (
      <span className={`text-xl font-bold ${value ? 'text-green-500' : 'text-red-400'}`}>
        {value ? '✓' : '✗'}
      </span>
    )
  }
  return (
    <span className={`text-sm leading-snug ${isWinner ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
      {value}
    </span>
  )
}

export default function HostingComparisonTable({ rows, host1Name, host2Name, winner }: Props) {
  const categories = Array.from(new Set(rows.map((r) => r.category)))

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">Full Feature Comparison</h2>
          <p className="text-gray-500 mt-2">
            {host1Name} vs {host2Name} — every metric compared side by side
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-3 bg-gray-900 text-white">
            <div className="p-4 text-sm font-semibold text-gray-300">Feature</div>
            <div
              className={`p-4 text-center font-bold text-sm ${
                winner === 1 ? 'bg-indigo-600' : ''
              }`}
            >
              {host1Name}
              {winner === 1 && (
                <div className="text-xs font-normal text-indigo-200 mt-0.5">Winner 🏆</div>
              )}
            </div>
            <div
              className={`p-4 text-center font-bold text-sm ${
                winner === 2 ? 'bg-indigo-600' : ''
              }`}
            >
              {host2Name}
              {winner === 2 && (
                <div className="text-xs font-normal text-indigo-200 mt-0.5">Winner 🏆</div>
              )}
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat}>
              {/* Category row */}
              <div className="bg-gray-50 px-4 py-2.5 border-t border-gray-200">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  {cat}
                </span>
              </div>

              {rows
                .filter((r) => r.category === cat)
                .map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-3 border-t border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="p-4 text-sm text-gray-700 flex items-center">{row.label}</div>
                    <div
                      className={`p-4 flex items-center justify-center gap-1.5 ${
                        row.winner === 1 ? 'bg-green-50' : ''
                      }`}
                    >
                      <CellValue value={row.host1Value} isWinner={row.winner === 1} />
                      {row.winner === 1 && (
                        <span className="text-green-500 text-xs flex-shrink-0">✦</span>
                      )}
                    </div>
                    <div
                      className={`p-4 flex items-center justify-center gap-1.5 ${
                        row.winner === 2 ? 'bg-green-50' : ''
                      }`}
                    >
                      <CellValue value={row.host2Value} isWinner={row.winner === 2} />
                      {row.winner === 2 && (
                        <span className="text-green-500 text-xs flex-shrink-0">✦</span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          ✦ indicates the winner for that metric. Data based on real-world testing, updated {new Date().getFullYear()}.
        </p>
      </div>
    </section>
  )
}

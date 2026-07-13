'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { BENCHMARKS } from '@/lib/benchmarks'

type SortKey = 'speedScore' | 'ttfb' | 'loadTime' | 'uptime' | 'supportScore' | 'valueScore' | 'priceScore'
type SortDir = 'asc' | 'desc'

function ttfbColor(ms: number): string {
  if (ms < 200) return 'text-green-700 bg-green-50 border-green-200'
  if (ms < 350) return 'text-yellow-700 bg-yellow-50 border-yellow-200'
  return 'text-red-700 bg-red-50 border-red-200'
}

function loadColor(ms: number): string {
  if (ms < 900) return 'text-green-700 bg-green-50 border-green-200'
  if (ms < 1300) return 'text-yellow-700 bg-yellow-50 border-yellow-200'
  return 'text-red-700 bg-red-50 border-red-200'
}

function uptimeColor(pct: number): string {
  if (pct >= 99.95) return 'text-green-700 bg-green-50 border-green-200'
  if (pct >= 99.9) return 'text-yellow-700 bg-yellow-50 border-yellow-200'
  return 'text-red-700 bg-red-50 border-red-200'
}

function supportScoreColor(score: number): string {
  if (score >= 9) return 'text-green-700 bg-green-50 border-green-200'
  if (score >= 8) return 'text-yellow-700 bg-yellow-50 border-yellow-200'
  return 'text-red-700 bg-red-50 border-red-200'
}

function Chip({ value, colorClass }: { value: string; colorClass: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${colorClass}`}>
      {value}
    </span>
  )
}

function ScoreBar({ score, max = 100 }: { score: number; max?: number }) {
  const pct = (score / max) * 100
  const color = pct >= 85 ? 'bg-green-500' : pct >= 65 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden min-w-[60px]">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-gray-700 tabular-nums w-10 text-right">{score}/100</span>
    </div>
  )
}

function SortButton({
  label,
  sortKey,
  currentKey,
  currentDir,
  onSort,
}: {
  label: string
  sortKey: SortKey
  currentKey: SortKey
  currentDir: SortDir
  onSort: (key: SortKey) => void
}) {
  const active = currentKey === sortKey
  return (
    <button
      onClick={() => onSort(sortKey)}
      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
        active
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
          : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
      }`}
    >
      {label} {active ? (currentDir === 'asc' ? '↑' : '↓') : ''}
    </button>
  )
}

export default function BenchmarksPage() {
  const [sortKey, setSortKey] = useState<SortKey>('speedScore')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const sorted = useMemo(() => {
    return [...BENCHMARKS].sort((a, b) => {
      const av = a[sortKey] as number
      const bv = b[sortKey] as number
      const lowerIsBetter = sortKey === 'ttfb' || sortKey === 'loadTime'
      if (sortDir === 'asc') return lowerIsBetter ? bv - av : av - bv
      return lowerIsBetter ? av - bv : bv - av
    })
  }, [sortKey, sortDir])

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'ttfb' || key === 'loadTime' ? 'asc' : 'desc')
    }
  }

  const fastest = [...BENCHMARKS].sort((a, b) => a.ttfb - b.ttfb)[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <span className="text-gray-600">Benchmarks</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          Web Hosting Speed Benchmarks 2026
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          Real-world performance data for 11 top hosting providers. Tested on identical WordPress installations, measured from US East Coast. Updated May 2026.
        </p>
      </div>

      {/* Methodology note */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4 mb-8 text-sm text-indigo-800">
        <strong>Test methodology:</strong> Each host was tested on a standardized WordPress installation with the same theme, plugins, and a 1MB homepage. TTFB and load time measured using 10 test runs averaged. Uptime monitored over 90 days via automated pings every 5 minutes.
      </div>

      {/* Sort controls */}
      <div className="flex flex-wrap gap-2 mb-6 items-center">
        <span className="text-sm font-medium text-gray-500 mr-1">Sort by:</span>
        <SortButton label="Speed Score" sortKey="speedScore" currentKey={sortKey} currentDir={sortDir} onSort={handleSort} />
        <SortButton label="TTFB" sortKey="ttfb" currentKey={sortKey} currentDir={sortDir} onSort={handleSort} />
        <SortButton label="Load Time" sortKey="loadTime" currentKey={sortKey} currentDir={sortDir} onSort={handleSort} />
        <SortButton label="Uptime" sortKey="uptime" currentKey={sortKey} currentDir={sortDir} onSort={handleSort} />
        <SortButton label="Support" sortKey="supportScore" currentKey={sortKey} currentDir={sortDir} onSort={handleSort} />
        <SortButton label="Value" sortKey="valueScore" currentKey={sortKey} currentDir={sortDir} onSort={handleSort} />
        <SortButton label="Price" sortKey="priceScore" currentKey={sortKey} currentDir={sortDir} onSort={handleSort} />
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-bold">Hosting Performance Comparison — All 11 Providers</h2>
          <span className="text-xs text-gray-400">Tested May 2026 · US East</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Host</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">TTFB</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Load Time</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Uptime</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Support</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-40">Speed Score</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-40">Value Score</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">From</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sorted.map((b, idx) => {
                const isFastest = b.hostSlug === fastest.hostSlug
                const isTop3 = idx < 3
                return (
                  <tr key={b.hostSlug} className={isTop3 ? 'bg-indigo-50/40' : 'hover:bg-gray-50/60 transition-colors'}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/review/${b.hostSlug}`}
                          className="font-bold text-gray-900 hover:text-indigo-600 transition-colors"
                        >
                          {b.host}
                        </Link>
                        {isFastest && (
                          <span className="text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded-full font-semibold">
                            Fastest
                          </span>
                        )}
                        {idx === 0 && !isFastest && (
                          <span className="text-xs bg-green-600 text-white px-1.5 py-0.5 rounded-full font-semibold">
                            #1
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5 truncate max-w-[160px]">{b.serverLocation}</div>
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
                      <Chip value={`${b.supportScore}/10`} colorClass={supportScoreColor(b.supportScore)} />
                    </td>
                    <td className="px-4 py-3">
                      <ScoreBar score={b.speedScore} />
                    </td>
                    <td className="px-4 py-3">
                      <ScoreBar score={b.valueScore} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-gray-800">{b.introPrice}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 px-5 py-2.5 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            TTFB &lt;200ms = excellent · Load &lt;900ms = excellent · Uptime ≥99.95% = excellent · Tested on identical WordPress installations
          </p>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-4">
        {sorted.map((b, idx) => {
          const isFastest = b.hostSlug === fastest.hostSlug
          return (
            <div key={b.hostSlug} className={`rounded-2xl border p-4 shadow-sm ${idx < 3 ? 'border-indigo-200 bg-indigo-50/30' : 'border-gray-200 bg-white'}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Link href={`/review/${b.hostSlug}`} className="text-lg font-bold text-gray-900 hover:text-indigo-600">
                    {b.host}
                  </Link>
                  {isFastest && (
                    <span className="ml-2 text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded-full font-semibold">Fastest</span>
                  )}
                  <div className="text-xs text-gray-400 mt-0.5">{b.serverLocation}</div>
                </div>
                <span className="text-sm font-bold text-gray-700">{b.introPrice}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">TTFB</div>
                  <Chip value={`${b.ttfb}ms`} colorClass={ttfbColor(b.ttfb)} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Load Time</div>
                  <Chip value={`${b.loadTime}ms`} colorClass={loadColor(b.loadTime)} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Uptime</div>
                  <Chip value={`${b.uptime}%`} colorClass={uptimeColor(b.uptime)} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Support</div>
                  <Chip value={`${b.supportScore}/10`} colorClass={supportScoreColor(b.supportScore)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Speed Score</div>
                  <ScoreBar score={b.speedScore} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Value Score</div>
                  <ScoreBar score={b.valueScore} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Score legend */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs">
        <div className="rounded-xl border border-green-200 bg-green-50 p-3">
          <div className="font-bold text-green-700 text-sm mb-1">Excellent</div>
          <div className="text-green-600">TTFB &lt;200ms · Load &lt;900ms · Uptime ≥99.95% · Score ≥85</div>
        </div>
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-3">
          <div className="font-bold text-yellow-700 text-sm mb-1">Good</div>
          <div className="text-yellow-600">TTFB &lt;350ms · Load &lt;1300ms · Uptime ≥99.9% · Score 65–84</div>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-3">
          <div className="font-bold text-red-700 text-sm mb-1">Needs Work</div>
          <div className="text-red-600">TTFB ≥350ms · Load ≥1300ms · Uptime &lt;99.9% · Score &lt;65</div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-extrabold mb-2">Not sure which host to choose?</h2>
        <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
          Take our 2-minute quiz and get a personalized recommendation based on your site type, budget, and traffic level.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Take the Quiz →
          </Link>
          <Link
            href="/compare"
            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-500/50 text-white font-bold rounded-xl hover:bg-indigo-500/70 transition-colors border border-indigo-400/50"
          >
            Compare Hosts
          </Link>
        </div>
      </div>
    </div>
  )
}

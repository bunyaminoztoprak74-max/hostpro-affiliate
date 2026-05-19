'use client'

import type { QuizResult } from '@/lib/quiz-engine'
import { useState, useEffect } from 'react'

interface Props {
  results: QuizResult[]
  onRetake: () => void
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? 'text-yellow-400 text-lg' : 'text-gray-300 text-lg'}>★</span>
      ))}
      <span className="text-sm font-bold text-gray-700 ml-1">{rating}/5</span>
    </div>
  )
}

function CountdownTimer() {
  const [seconds, setSeconds] = useState(15 * 60) // 15 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const expired = seconds === 0

  if (expired) return null

  return (
    <div className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-sm">
      <span className="text-red-500 text-base">⏰</span>
      <span className="text-red-700 font-medium">
        Deal price expires in{' '}
        <span className="font-black tabular-nums">
          {mins}:{secs.toString().padStart(2, '0')}
        </span>
      </span>
    </div>
  )
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

function EmailGate({ onSubmit }: { onSubmit: () => void }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setLoading(true)
    try {
      await fetch('https://hostproreviews.beehiiv.com/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        mode: 'no-cors',
      })
    } catch {
      // no-cors mode — silent fail is fine
    }
    setLoading(false)
    onSubmit()
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-indigo-200 p-8 text-center shadow-lg shadow-indigo-50">
      <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-3xl mx-auto mb-4">
        🎁
      </div>
      <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
        Your results are ready!
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        Enter your email to unlock your personalized hosting recommendation — plus our free{' '}
        <strong>Hosting Comparison Cheat Sheet</strong>.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-sm mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError('') }}
          placeholder="your@email.com"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          required
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60"
        >
          {loading ? 'Loading...' : 'Show My Recommendation →'}
        </button>
      </form>
      <button
        onClick={onSubmit}
        className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline"
      >
        Skip — show results without subscribing
      </button>
      <p className="text-xs text-gray-300 mt-2">No spam. Unsubscribe any time.</p>
    </div>
  )
}

function WinnerCard({ result }: { result: QuizResult }) {
  const { host, percentage, reasons } = result

  return (
    <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-xl shadow-indigo-100">
      {/* Top banner */}
      <div className="bg-indigo-600 text-white text-center py-2 text-sm font-bold tracking-wide">
        🏆 Your #1 Recommended Host
      </div>

      {/* Gradient header */}
      <div className={`bg-gradient-to-br ${host.gradient} p-6 text-white`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-4xl">{host.emoji}</span>
              <div>
                <h2 className="text-2xl font-extrabold">{host.name}</h2>
                <p className="text-white/80 text-sm">{host.tagline}</p>
              </div>
            </div>
          </div>
          <MatchBadge percentage={percentage} large />
        </div>

        <div className="mt-5 flex items-end gap-2">
          <span className="text-4xl font-extrabold">{host.price}</span>
          <span className="text-white/70 text-lg mb-1">/mo</span>
        </div>
        <div className="mt-1">
          <StarRating rating={host.rating} />
        </div>
      </div>

      {/* Body */}
      <div className="bg-white p-6">
        {/* Why it matches */}
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

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Uptime', value: host.uptime },
            { label: 'Speed', value: host.speed },
            { label: 'Support', value: host.support.includes('Phone') ? 'Chat + Phone' : '24/7 Chat' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="font-bold text-gray-900 text-sm truncate">{value}</div>
              <div className="text-xs text-gray-400">{label}</div>
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div className="mb-4">
          <CountdownTimer />
        </div>

        {/* Primary CTA */}
        <a
          href={host.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full text-center py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-200 hover:-translate-y-0.5 text-lg"
        >
          Get {host.name} — {host.price}/mo →
        </a>

        {/* Trust signals */}
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
          <span>✓ 30-day guarantee</span>
          <span>✓ No hidden fees</span>
          <span>✓ Affiliate link</span>
        </div>

        <p className="text-xs text-gray-400 text-center mt-2">
          Affiliate link — we earn a commission at no extra cost to you.
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
        <div>
          <div className="font-bold text-gray-900">{host.price}/mo</div>
          <StarRating rating={host.rating} />
        </div>
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
  const [unlocked, setUnlocked] = useState(false)
  const [winner, ...runnerUps] = results

  return (
    <div className="animate-quiz-in">
      {!unlocked ? (
        <EmailGate onSubmit={() => setUnlocked(true)} />
      ) : (
        <>
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

          {/* Compare CTA */}
          <div className="mt-8 bg-gray-50 rounded-2xl p-6 text-center">
            <p className="text-gray-600 text-sm mb-3">Want to dig deeper before deciding?</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <a
                href={`/compare/${winner.host.id}-vs-${runnerUps[0]?.host.id}`}
                className="inline-flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-indigo-300 hover:text-indigo-700 transition-colors bg-white"
              >
                Compare top picks →
              </a>
              <a
                href="/review"
                className="inline-flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-indigo-300 hover:text-indigo-700 transition-colors bg-white"
              >
                Read full reviews →
              </a>
            </div>
          </div>

          {/* Retake */}
          <div className="mt-6 text-center">
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
        </>
      )}
    </div>
  )
}

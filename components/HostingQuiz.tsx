'use client'

import { useState, useCallback } from 'react'
import QuizResults from './QuizResults'
import { calculateResults } from '@/lib/quiz-engine'
import type { QuizAnswers } from '@/lib/quiz-data'
import type { QuizResult } from '@/lib/quiz-engine'

// ── Step definitions ────────────────────────────────────────────────

interface StepOption {
  value: string
  label: string
  emoji: string
  desc: string
}

interface Step {
  id: keyof QuizAnswers
  question: string
  subtitle: string
  options: StepOption[]
}

const STEPS: Step[] = [
  {
    id: 'websiteType',
    question: 'What type of website are you building?',
    subtitle: 'This helps us match you to hosts optimized for your use case.',
    options: [
      { value: 'blog', label: 'Blog', emoji: '✍️', desc: 'Personal blog or content site' },
      { value: 'business', label: 'Business', emoji: '💼', desc: 'Company or service website' },
      { value: 'ecommerce', label: 'E-commerce', emoji: '🛒', desc: 'Online store selling products' },
      { value: 'portfolio', label: 'Portfolio', emoji: '🎨', desc: 'Personal portfolio or showcase' },
      { value: 'agency', label: 'Agency', emoji: '🏢', desc: 'Web agency, multiple client sites' },
    ],
  },
  {
    id: 'budget',
    question: "What's your monthly hosting budget?",
    subtitle: "Be honest — there are great options at every price point.",
    options: [
      { value: 'budget', label: 'Under $3/mo', emoji: '💚', desc: 'Maximum savings, minimum cost' },
      { value: 'low', label: '$3–$10/mo', emoji: '💙', desc: 'Good balance of price and features' },
      { value: 'mid', label: '$10–$25/mo', emoji: '💜', desc: 'Performance-focused hosting' },
      { value: 'premium', label: '$25+/mo', emoji: '🏆', desc: 'Best-in-class, premium hosting' },
    ],
  },
  {
    id: 'traffic',
    question: 'How much monthly traffic do you expect?',
    subtitle: "Don't worry — you can always upgrade later as you grow.",
    options: [
      { value: 'new_site', label: 'Just starting', emoji: '🌱', desc: 'New site, 0–1K visitors/month' },
      { value: 'small', label: 'Under 10K/mo', emoji: '📈', desc: 'Growing site, up to 10K visitors' },
      { value: 'medium', label: '10K–100K/mo', emoji: '🚀', desc: 'Established, meaningful traffic' },
      { value: 'large', label: '100K+/mo', emoji: '⚡', desc: 'High-traffic, needs to scale' },
    ],
  },
  {
    id: 'techLevel',
    question: 'How technical are you?',
    subtitle: "No wrong answer — we'll match you to your comfort level.",
    options: [
      { value: 'beginner', label: 'Beginner', emoji: '👋', desc: 'I want it to just work, no config' },
      { value: 'intermediate', label: 'Intermediate', emoji: '🛠️', desc: 'Comfortable with basic settings' },
      { value: 'developer', label: 'Developer', emoji: '💻', desc: 'I want full server control' },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most to you?',
    subtitle: 'Pick the single most important factor for your hosting decision.',
    options: [
      { value: 'speed', label: 'Speed', emoji: '⚡', desc: 'Fastest possible load times' },
      { value: 'price', label: 'Price', emoji: '💰', desc: 'Lowest cost, best value for money' },
      { value: 'support', label: 'Support', emoji: '🤝', desc: 'Expert help whenever I need it' },
      { value: 'features', label: 'Features', emoji: '🎯', desc: 'Staging, backups, developer tools' },
    ],
  },
]

// ── Progress bar ─────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <span className="font-medium">
          Step {current} of {total}
        </span>
        <span>{pct}% complete</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

// ── Option card ──────────────────────────────────────────────────────

function OptionCard({
  option,
  selected,
  onClick,
}: {
  option: StepOption
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-150 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        selected
          ? 'border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100'
          : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl flex-shrink-0">{option.emoji}</span>
        <div className="flex-1 min-w-0">
          <div
            className={`font-semibold text-sm ${
              selected ? 'text-indigo-700' : 'text-gray-900 group-hover:text-indigo-700'
            }`}
          >
            {option.label}
          </div>
          <div className="text-xs text-gray-500 leading-snug mt-0.5">{option.desc}</div>
        </div>
        <div
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            selected ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'
          }`}
        >
          {selected && <span className="text-white text-xs font-bold">✓</span>}
        </div>
      </div>
    </button>
  )
}

// ── Main quiz component ──────────────────────────────────────────────

const EMPTY_ANSWERS: QuizAnswers = {
  websiteType: null,
  budget: null,
  traffic: null,
  techLevel: null,
  priority: null,
}

export default function HostingQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>(EMPTY_ANSWERS)
  const [selected, setSelected] = useState<string | null>(null)
  const [results, setResults] = useState<QuizResult[] | null>(null)
  const [animating, setAnimating] = useState(false)

  const currentStep = STEPS[step]
  const isLastStep = step === STEPS.length - 1

  const advance = useCallback(
    (value: string) => {
      if (animating) return

      const newAnswers = { ...answers, [currentStep.id]: value }
      setAnswers(newAnswers)
      setSelected(value)

      setTimeout(() => {
        setAnimating(true)
        setTimeout(() => {
          if (isLastStep) {
            const finalAnswers = newAnswers as Required<QuizAnswers>
            setResults(calculateResults(finalAnswers))
          } else {
            setStep((s) => s + 1)
            setSelected(null)
          }
          setAnimating(false)
        }, 200)
      }, 350)
    },
    [animating, answers, currentStep.id, isLastStep]
  )

  const retake = useCallback(() => {
    setStep(0)
    setAnswers(EMPTY_ANSWERS)
    setSelected(null)
    setResults(null)
    setAnimating(false)
  }, [])

  // Results view
  if (results) {
    return <QuizResults results={results} onRetake={retake} />
  }

  return (
    <div>
      <ProgressBar current={step + 1} total={STEPS.length} />

      <div
        key={step}
        className={`transition-opacity duration-200 ${animating ? 'opacity-0' : 'opacity-100'} animate-quiz-in`}
      >
        {/* Question header */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug">
            {currentStep.question}
          </h2>
          <p className="text-gray-500 text-sm mt-1.5">{currentStep.subtitle}</p>
        </div>

        {/* Option grid — 2 columns on sm+ */}
        <div
          className={`grid gap-3 ${
            currentStep.options.length <= 3
              ? 'grid-cols-1'
              : 'grid-cols-1 sm:grid-cols-2'
          }`}
        >
          {currentStep.options.map((opt) => (
            <OptionCard
              key={opt.value}
              option={opt}
              selected={selected === opt.value}
              onClick={() => advance(opt.value)}
            />
          ))}
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === step
                  ? 'w-6 h-2 bg-indigo-500'
                  : i < step
                  ? 'w-2 h-2 bg-indigo-300'
                  : 'w-2 h-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

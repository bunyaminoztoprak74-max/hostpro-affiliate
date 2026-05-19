import { hostProfiles } from './quiz-data'
import type {
  QuizAnswers,
  HostProfile,
  WebsiteType,
  BudgetRange,
  TrafficLevel,
  TechLevel,
  Priority,
} from './quiz-data'

export interface QuizResult {
  host: HostProfile
  score: number
  maxScore: number
  percentage: number
  reasons: string[]
}

// Budget and traffic have higher weights — they most strongly determine the right host
const WEIGHTS: Record<keyof Required<QuizAnswers>, number> = {
  websiteType: 1.0,
  budget: 2.0,
  traffic: 1.5,
  techLevel: 1.5,
  priority: 1.0,
}

const MAX_SCORE =
  10 * WEIGHTS.websiteType +
  10 * WEIGHTS.budget +
  10 * WEIGHTS.traffic +
  10 * WEIGHTS.techLevel +
  10 * WEIGHTS.priority

export function calculateResults(answers: Required<QuizAnswers>): QuizResult[] {
  const results: QuizResult[] = hostProfiles.map((host) => {
    const weightedScore =
      host.scores.websiteType[answers.websiteType as WebsiteType] * WEIGHTS.websiteType +
      host.scores.budget[answers.budget as BudgetRange] * WEIGHTS.budget +
      host.scores.traffic[answers.traffic as TrafficLevel] * WEIGHTS.traffic +
      host.scores.techLevel[answers.techLevel as TechLevel] * WEIGHTS.techLevel +
      host.scores.priority[answers.priority as Priority] * WEIGHTS.priority

    // Pick the top 2 reasons: highest-scoring dimensions for this host
    // Use raw (unweighted) scores so we pick what the host is genuinely best at
    const dimensionRankings = [
      {
        score: host.scores.budget[answers.budget as BudgetRange] * 1.5, // boost budget reason priority
        reason: host.reasonMap.budget[answers.budget as BudgetRange],
      },
      {
        score: host.scores.traffic[answers.traffic as TrafficLevel] * 1.3,
        reason: host.reasonMap.traffic[answers.traffic as TrafficLevel],
      },
      {
        score: host.scores.techLevel[answers.techLevel as TechLevel],
        reason: host.reasonMap.techLevel[answers.techLevel as TechLevel],
      },
      {
        score: host.scores.priority[answers.priority as Priority],
        reason: host.reasonMap.priority[answers.priority as Priority],
      },
      {
        score: host.scores.websiteType[answers.websiteType as WebsiteType],
        reason: host.reasonMap.websiteType[answers.websiteType as WebsiteType],
      },
    ]
      .filter((d) => d.reason)
      .sort((a, b) => b.score - a.score)

    const reasons = dimensionRankings.slice(0, 2).map((d) => d.reason)

    return {
      host,
      score: weightedScore,
      maxScore: MAX_SCORE,
      percentage: Math.min(99, Math.round((weightedScore / MAX_SCORE) * 100)),
      reasons,
    }
  })

  // Sort by score descending, normalize percentages so #1 is always ≥ 80%
  const sorted = results.sort((a, b) => b.score - a.score)
  const topScore = sorted[0].score

  return sorted.map((r) => ({
    ...r,
    percentage: Math.min(99, Math.round(80 + ((r.score / topScore) * 19))),
  }))
}

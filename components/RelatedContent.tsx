import Link from 'next/link'
import { allComparisons } from '@/lib/comparisons'
import { getAllTutorials } from '@/lib/tutorials'

interface RelatedPost {
  title: string
  href: string
  type: 'blog' | 'comparison' | 'tutorial' | 'review'
}

interface Props {
  currentSlug?: string
  hostSlugs?: string[]
  tags?: string[]
  maxPosts?: number
  maxComparisons?: number
}

const typeLabel: Record<RelatedPost['type'], string> = {
  blog: 'Guide',
  comparison: 'Comparison',
  tutorial: 'Tutorial',
  review: 'Review',
}

const typeBadge: Record<RelatedPost['type'], string> = {
  blog: 'bg-blue-100 text-blue-700',
  comparison: 'bg-purple-100 text-purple-700',
  tutorial: 'bg-green-100 text-green-700',
  review: 'bg-orange-100 text-orange-700',
}

function RelatedCard({ item }: { item: RelatedPost }) {
  return (
    <Link
      href={item.href}
      className="group flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all"
    >
      <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${typeBadge[item.type]} mt-0.5`}>
        {typeLabel[item.type]}
      </span>
      <span className="text-sm font-medium text-gray-800 group-hover:text-indigo-700 transition-colors leading-snug">
        {item.title}
        <span className="ml-1 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
      </span>
    </Link>
  )
}

export default function RelatedContent({ currentSlug, hostSlugs = [], tags = [], maxPosts = 4, maxComparisons = 3 }: Props) {
  // Find related comparisons based on host slugs
  const relatedComparisons: RelatedPost[] = []
  if (hostSlugs.length > 0) {
    for (const c of allComparisons) {
      if (c.slug === currentSlug) continue
      if (hostSlugs.includes(c.host1.slug) || hostSlugs.includes(c.host2.slug)) {
        relatedComparisons.push({
          title: c.title,
          href: `/compare/${c.slug}`,
          type: 'comparison',
        })
      }
      if (relatedComparisons.length >= maxComparisons) break
    }
  }

  // Find related tutorials based on tags
  const relatedTutorials: RelatedPost[] = []
  if (tags.length > 0) {
    try {
      const allTutorials = getAllTutorials()
      for (const t of allTutorials) {
        if (t.slug === currentSlug) continue
        const tutTags = t.tags ?? []
        const overlap = tags.some((tag) => tutTags.includes(tag))
        if (overlap) {
          relatedTutorials.push({
            title: t.title,
            href: `/tutorials/${t.slug}`,
            type: 'tutorial',
          })
        }
        if (relatedTutorials.length >= maxPosts) break
      }
    } catch {
      // tutorials may not be available in all contexts
    }
  }

  // Fallback static posts if no dynamic matches
  const staticPosts: RelatedPost[] = [
    { title: 'Best Web Hosting in 2026: Our Top Picks', href: '/blog/best-web-hosting-2026', type: 'blog' },
    { title: 'Best WordPress Hosting in 2026', href: '/blog/best-wordpress-hosting-2026', type: 'blog' },
    { title: 'Best Cheap Hosting in 2026', href: '/blog/best-cheap-hosting-2026', type: 'blog' },
    { title: 'How to Install WordPress', href: '/tutorials/how-to-install-wordpress', type: 'tutorial' },
    { title: 'WordPress Speed Optimization Guide', href: '/tutorials/wordpress-speed-optimization', type: 'tutorial' },
    { title: 'How to Set Up SSL', href: '/tutorials/how-to-set-up-ssl', type: 'tutorial' },
  ]

  const allRelated = [...relatedComparisons, ...relatedTutorials]

  // Fill with static posts if we have fewer than 3 items
  if (allRelated.length < 3) {
    for (const p of staticPosts) {
      if (allRelated.length >= maxPosts + maxComparisons) break
      const alreadyAdded = allRelated.some((r) => r.href === p.href)
      if (!alreadyAdded) allRelated.push(p)
    }
  }

  if (allRelated.length === 0) return null

  // Split into two groups for display
  const comparisons = allRelated.filter((r) => r.type === 'comparison')
  const posts = allRelated.filter((r) => r.type !== 'comparison')

  return (
    <aside className="my-10 not-prose" aria-label="Related content">
      <div className="border-t border-gray-100 pt-8">
        <h3 className="text-lg font-extrabold text-gray-900 mb-5">Related Reading</h3>

        {/* Two columns on wider screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {posts.slice(0, maxPosts).map((item) => (
            <RelatedCard key={item.href} item={item} />
          ))}
        </div>

        {comparisons.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Related Comparisons</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {comparisons.map((item) => (
                <RelatedCard key={item.href} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

import Link from 'next/link'
import { getAllCategories } from '@/lib/posts'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Browse Hosting Categories — HostPro Reviews',
  description:
    'Browse web hosting reviews, comparisons, and guides by category. Find the right content for your hosting decision.',
  alternates: { canonical: `${SITE_URL}/category` },
}

const categoryMeta: Record<
  string,
  { emoji: string; description: string; color: string; bgColor: string }
> = {
  Review: {
    emoji: '⭐',
    description: 'In-depth hosting reviews based on real testing and months of data.',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-50 border-indigo-200',
  },
  Comparison: {
    emoji: '⚖️',
    description: 'Head-to-head hosting comparisons to find the clear winner.',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50 border-blue-200',
  },
  Guide: {
    emoji: '📖',
    description: 'Step-by-step guides for choosing, setting up, and optimizing hosting.',
    color: 'text-green-700',
    bgColor: 'bg-green-50 border-green-200',
  },
}

export default function CategoryIndexPage() {
  const categories = getAllCategories()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-600">Categories</span>
      </nav>

      <div className="mb-12">
        <span className="badge bg-purple-100 text-purple-700 mb-4">Categories</span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-3">Browse by Category</h1>
        <p className="text-gray-500 mt-4 text-lg">
          Find exactly what you&apos;re looking for — reviews, comparisons, or how-to guides.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map(({ category, count }) => {
          const meta = categoryMeta[category] ?? {
            emoji: '📄',
            description: `Browse all ${category.toLowerCase()} articles.`,
            color: 'text-gray-700',
            bgColor: 'bg-gray-50 border-gray-200',
          }
          return (
            <Link
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className={`block rounded-2xl border p-6 hover:shadow-md transition-all group ${meta.bgColor}`}
            >
              <div className="text-4xl mb-4">{meta.emoji}</div>
              <h2 className={`text-xl font-bold mb-2 group-hover:underline ${meta.color}`}>
                {category}
              </h2>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{meta.description}</p>
              <span className="text-sm font-semibold text-gray-400">{count} articles →</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

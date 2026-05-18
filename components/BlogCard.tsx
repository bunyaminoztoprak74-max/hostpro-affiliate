import Link from 'next/link'

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  categoryColor: string
}

export default function BlogCard({ slug, title, excerpt, date, category, readTime, categoryColor }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="card p-6 flex flex-col hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex items-center gap-2 mb-3">
        <span className={`badge ${categoryColor}`}>{category}</span>
        <span className="text-gray-400 text-xs">{readTime}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{excerpt}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{date}</span>
        <span className="text-indigo-600 text-sm font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
          Read more
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}


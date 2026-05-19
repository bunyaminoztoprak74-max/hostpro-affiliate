import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

export default function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null

  return (
    <section className="mt-12 border-t border-gray-100 pt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-5">Related Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group"
          >
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${post.categoryColor}`}
            >
              {post.category}
            </span>
            <h3 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-indigo-700 transition-colors">
              {post.title}
            </h3>
            <p className="text-xs text-gray-400 mt-2">{post.readTime}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

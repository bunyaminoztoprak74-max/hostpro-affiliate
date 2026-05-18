import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reviews & Comparisons',
  description: 'Honest web hosting reviews, comparisons, and tutorials to help you choose the best host for your needs.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 mb-4">
          All Articles
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-3">Reviews & Guides</h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Honest, tested content to help you pick the right host, build your site, and make money blogging.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-400 py-20">No posts found.</p>
      )}
    </div>
  )
}


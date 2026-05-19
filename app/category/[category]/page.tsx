import { getAllCategories, getPostsByCategory } from '@/lib/posts'
import { notFound } from 'next/navigation'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map(({ category }) => ({ category: category.toLowerCase() }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cap = category.charAt(0).toUpperCase() + category.slice(1)
  return {
    title: `${cap} — Web Hosting Articles | HostPro Reviews`,
    description: `Browse all ${cap} articles. Independent, tested hosting ${category.toLowerCase()}s from HostPro Reviews.`,
    alternates: { canonical: `${SITE_URL}/category/${category}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cap = category.charAt(0).toUpperCase() + category.slice(1)
  const posts = getPostsByCategory(cap)

  if (posts.length === 0) notFound()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/category" className="hover:text-indigo-600 transition-colors">Categories</Link>
        <span>/</span>
        <span className="text-gray-600">{cap}</span>
      </nav>

      <div className="mb-12">
        <span className="badge bg-indigo-100 text-indigo-700 mb-4">{cap}</span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-3">{cap} Articles</h1>
        <p className="text-gray-500 mt-2">
          {posts.length} article{posts.length !== 1 ? 's' : ''} — sorted by most recent
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link href="/blog" className="btn-secondary">
          View All Articles →
        </Link>
      </div>
    </div>
  )
}

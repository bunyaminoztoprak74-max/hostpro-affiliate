import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug)
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        url: `https://hostproreviews.com/blog/${params.slug}`,
        siteName: 'HostPro Reviews',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
      },
      alternates: {
        canonical: `https://hostproreviews.com/blog/${params.slug}`,
      },
    }
  } catch {
    return { title: 'Post Not Found' }
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export default async function PostPage({ params }: Props) {
  let post
  try {
    post = await getPostBySlug(params.slug)
  } catch {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': post.category === 'Review' ? 'Review' : 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'HostPro Reviews',
      url: 'https://hostproreviews.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HostPro Reviews',
      url: 'https://hostproreviews.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hostproreviews.com/blog/${params.slug}`,
    },
  }

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-gray-600 truncate">{post.title}</span>
            </nav>

            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${post.categoryColor}`}>
                  {post.category}
                </span>
                <span className="text-gray-400 text-sm">{post.readTime}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-400">
                <span>Published: {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </header>

            {/* Affiliate Disclosure */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
              <strong>Affiliate Disclosure:</strong> This article contains affiliate links. If you purchase through our links, we may earn a commission at no extra cost to you. This doesn&apos;t affect our reviews.
            </div>

            {/* Content */}
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Top Pick CTA */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="font-bold text-lg mb-2">Our #1 Pick</h3>
                <p className="text-indigo-200 text-sm mb-4">
                  Hostinger offers the best price-to-performance ratio in 2026.
                </p>
                <div className="text-2xl font-extrabold mb-1">$2.99<span className="text-sm font-normal text-indigo-300">/mo</span></div>
                <p className="text-xs text-indigo-300 mb-4">75% off — limited time</p>
                <a
                  href="https://www.hostinger.com/web-hosting?REFERRALCODE=OFMBZTOPRZSU"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block w-full text-center bg-white text-indigo-700 font-bold py-3 rounded-xl hover:bg-yellow-50 transition-colors"
                >
                  Get This Deal →
                </a>
              </div>

              {/* Quick Links */}
              <div className="card p-5">
                <h4 className="font-semibold text-gray-900 mb-4">More Reviews</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/blog/best-web-hosting-2026" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                      → Best Hosting 2026
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/best-wordpress-hosting-2026" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                      → Best WordPress Hosting
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/best-cheap-hosting-2026" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                      → Best Cheap Hosting
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/hostinger-review-2026" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                      → Hostinger Review 2026
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/hostinger-vs-bluehost" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                      → Hostinger vs Bluehost
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/cloudways-review-2026" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                      → Cloudways Review
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/cloudways-vs-wpengine-2026" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                      → Cloudways vs WP Engine
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

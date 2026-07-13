import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/posts'
import {
  generateArticleSchema,
  generateReviewSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  SITE_URL,
  SITE_NAME,
} from '@/lib/seo'
import { getAuthorBySlug } from '@/lib/authors'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import TableOfContents from '@/components/TableOfContents'
import FAQSection from '@/components/FAQSection'
import RelatedPosts from '@/components/RelatedPosts'
import BreadcrumbNav from '@/components/BreadcrumbNav'
import EmailCapture from '@/components/EmailCapture'
import BenchmarkTable from '@/components/BenchmarkTable'
import AuthorBox from '@/components/AuthorBox'
import ReviewMethodology from '@/components/ReviewMethodology'

const BENCHMARK_MAP: Record<string, string | 'all'> = {
  'hostinger-review-2026': 'hostinger',
  'cloudways-review-2026': 'cloudways',
  'wp-engine-review-2026': 'wpengine',
  'best-web-hosting-2026': 'all',
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    return {
      title: post.title,
      description: post.excerpt,
      ...(post.noindex ? { robots: { index: false, follow: false } } : {}),
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        modifiedTime: post.lastModified ?? post.date,
        url: `${SITE_URL}/blog/${slug}`,
        siteName: SITE_NAME,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
      },
      alternates: {
        canonical: `${SITE_URL}/blog/${slug}`,
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
  const { slug } = await params
  let post
  try {
    post = await getPostBySlug(slug)
  } catch {
    notFound()
  }

  const isReview = post.category === 'Review'
  const faqs = post.faq ?? []
  const relatedPosts = getRelatedPosts(post.slug, post.tags ?? [])

  // Resolve full author data from slug stored in frontmatter
  const authorSlug = post.author ?? 'marcus'
  const authorData = getAuthorBySlug(authorSlug)

  const mainSchema = isReview
    ? generateReviewSchema({ ...post, rating: post.rating })
    : generateArticleSchema(post)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ])

  const schemas: object[] = [mainSchema, breadcrumbSchema]
  if (faqs.length > 0) schemas.push(generateFAQSchema(faqs))

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          id={`schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            <BreadcrumbNav
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                { label: post.title },
              ]}
            />

            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${post.categoryColor}`}
                >
                  {post.category}
                </span>
                <span className="text-gray-400 text-sm">{post.readTime}</span>
                {post.rating != null && (
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
                    ★ {post.rating}/5
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-400">
                <time dateTime={post.date}>
                  Published:{' '}
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {post.lastModified && post.lastModified !== post.date && (
                  <time dateTime={post.lastModified}>
                    Updated:{' '}
                    {new Date(post.lastModified).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
              </div>
            </header>

            {/* Affiliate Disclosure */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
              <strong>Affiliate Disclosure:</strong> This article contains affiliate links. If you
              purchase through our links, we may earn a commission at no extra cost to you. This
              doesn&apos;t affect our reviews or ratings.
            </div>

            {/* Mobile TOC */}
            {post.toc.length > 0 && (
              <div className="lg:hidden mb-8">
                <TableOfContents items={post.toc} />
              </div>
            )}

            {/* Review methodology for Review category */}
            {isReview && <ReviewMethodology />}

            {/* Content */}
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Benchmark table for review/roundup posts */}
            {BENCHMARK_MAP[post.slug] && (
              <BenchmarkTable
                hostSlug={BENCHMARK_MAP[post.slug] !== 'all' ? (BENCHMARK_MAP[post.slug] as string) : undefined}
                showAll={BENCHMARK_MAP[post.slug] === 'all'}
              />
            )}

            {/* FAQ */}
            <FAQSection faqs={faqs} />

            {/* Author box — resolved from authors.ts by slug */}
            <AuthorBox
              name={authorData?.name ?? 'Marcus Webb'}
              slug={authorSlug}
              bio={authorData?.bio}
              role={authorData?.role ?? (isReview ? 'Hosting Analyst' : 'Content Writer')}
            />

            {/* Email capture */}
            <EmailCapture variant="inline" />

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />
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
                <div className="text-2xl font-extrabold mb-1">
                  $2.99
                  <span className="text-sm font-normal text-indigo-300">/mo</span>
                </div>
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

              {/* Table of Contents */}
              {post.toc.length > 0 && <TableOfContents items={post.toc} />}

              {/* Email capture */}
              <EmailCapture variant="compact" />

              {/* Quick Links */}
              <div className="card p-5">
                <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                  More Reviews
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { href: '/blog/best-web-hosting-2026', label: 'Best Hosting 2026' },
                    { href: '/blog/best-wordpress-hosting-2026', label: 'Best WordPress Hosting' },
                    { href: '/blog/best-cheap-hosting-2026', label: 'Best Cheap Hosting' },
                    { href: '/blog/hostinger-review-2026', label: 'Hostinger Review 2026' },
                    { href: '/blog/hostinger-vs-bluehost', label: 'Hostinger vs Bluehost' },
                    { href: '/blog/cloudways-review-2026', label: 'Cloudways Review' },
                    { href: '/blog/cloudways-vs-wpengine-2026', label: 'Cloudways vs WP Engine' },
                  ]
                    .filter((l) => l.href !== `/blog/${post.slug}`)
                    .map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                        >
                          → {link.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

import { getAuthorBySlug, getAllAuthorSlugs } from '@/lib/authors'
import { getAllPosts } from '@/lib/posts'
import { SITE_URL, SITE_NAME } from '@/lib/seo'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import BlogCard from '@/components/BlogCard'
import BreadcrumbNav from '@/components/BreadcrumbNav'

export const revalidate = false

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthorBySlug(slug)
  if (!author) return { title: 'Author Not Found' }
  return {
    title: `${author.name} — ${author.role} | ${SITE_NAME}`,
    description: author.bio,
    alternates: { canonical: `${SITE_URL}/author/${slug}` },
    openGraph: {
      title: `${author.name} — ${author.role}`,
      description: author.bio,
      url: `${SITE_URL}/author/${slug}`,
      siteName: SITE_NAME,
    },
  }
}

export function generateStaticParams() {
  return getAllAuthorSlugs().map((slug) => ({ slug }))
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  const author = getAuthorBySlug(slug)
  if (!author) notFound()

  const posts = getAllPosts().filter((p) => (p.author ?? 'marcus') === slug)

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `${SITE_URL}/author/${slug}`,
    worksFor: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  }

  return (
    <>
      <script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: author.name },
          ]}
        />

        {/* Author card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-extrabold flex-shrink-0 select-none">
              {author.avatar}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold text-gray-900">{author.name}</h1>
              <p className="text-indigo-600 font-semibold text-sm mt-0.5">{author.role}</p>
              <p className="text-gray-600 mt-3 leading-relaxed text-sm">{author.bio}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {author.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {author.twitter && (
                <a
                  href={author.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  → Follow on Twitter
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Posts by this author */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Articles by {author.name}
            <span className="ml-2 text-sm font-normal text-gray-400">({posts.length})</span>
          </h2>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        ) : (
          <div className="card p-10 text-center text-gray-500">
            <div className="text-3xl mb-3">✍️</div>
            <p className="mb-3">No articles published yet.</p>
            <Link href="/blog" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
              Browse all reviews →
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

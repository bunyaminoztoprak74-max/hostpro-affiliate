import { getTutorialBySlug, getAllTutorialSlugs } from '@/lib/tutorials'
import { SITE_URL, SITE_NAME } from '@/lib/seo'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import TableOfContents from '@/components/TableOfContents'
import BreadcrumbNav from '@/components/BreadcrumbNav'
import EmailCapture from '@/components/EmailCapture'

export const revalidate = false

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const tutorial = await getTutorialBySlug(slug)
    return {
      title: tutorial.title,
      description: tutorial.excerpt,
      alternates: { canonical: `${SITE_URL}/tutorials/${slug}` },
      openGraph: {
        title: tutorial.title,
        description: tutorial.excerpt,
        url: `${SITE_URL}/tutorials/${slug}`,
        siteName: SITE_NAME,
        type: 'article',
        publishedTime: tutorial.date,
        modifiedTime: tutorial.lastModified ?? tutorial.date,
      },
    }
  } catch {
    return { title: 'Tutorial Not Found' }
  }
}

export async function generateStaticParams() {
  return getAllTutorialSlugs().map((slug) => ({ slug }))
}

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
}

export default async function TutorialPage({ params }: Props) {
  const { slug } = await params
  let tutorial
  try {
    tutorial = await getTutorialBySlug(slug)
  } catch {
    notFound()
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Tutorials', item: `${SITE_URL}/tutorials` },
      { '@type': 'ListItem', position: 3, name: tutorial.title, item: `${SITE_URL}/tutorials/${slug}` },
    ],
  }

  const howToSchema =
    tutorial.steps && tutorial.steps.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: tutorial.title,
          description: tutorial.excerpt,
          step: tutorial.steps.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.name,
            text: s.text,
          })),
        }
      : null

  const schemas: object[] = [breadcrumbSchema, ...(howToSchema ? [howToSchema] : [])]

  return (
    <>
      {schemas.map((schema, i) => (
        <Script
          key={i}
          id={`schema-tutorial-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            <BreadcrumbNav
              items={[
                { label: 'Home', href: '/' },
                { label: 'Tutorials', href: '/tutorials' },
                { label: tutorial.title },
              ]}
            />

            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`badge ${DIFFICULTY_COLOR[tutorial.difficulty] ?? 'bg-gray-100 text-gray-600'}`}
                >
                  {tutorial.difficulty}
                </span>
                <span className="text-gray-400 text-sm">{tutorial.readTime}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                {tutorial.title}
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed">{tutorial.excerpt}</p>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-400">
                <time dateTime={tutorial.date}>
                  Published:{' '}
                  {new Date(tutorial.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {tutorial.lastModified && tutorial.lastModified !== tutorial.date && (
                  <time dateTime={tutorial.lastModified}>
                    Updated:{' '}
                    {new Date(tutorial.lastModified).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
              </div>
            </header>

            {/* Mobile TOC */}
            {tutorial.toc.length > 0 && (
              <div className="lg:hidden mb-8">
                <TableOfContents items={tutorial.toc} />
              </div>
            )}

            {/* Content */}
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: tutorial.contentHtml }}
            />

            {/* Email capture */}
            <EmailCapture variant="inline" />

            {/* Back link */}
            <div className="mt-10">
              <Link href="/tutorials" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                ← Back to all tutorials
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {tutorial.toc.length > 0 && <TableOfContents items={tutorial.toc} />}

              <div className="card p-5">
                <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                  Hosting Guides
                </h4>
                <ul className="space-y-2.5">
                  {[
                    { href: '/blog/best-web-hosting-2026', label: 'Best Hosting 2026' },
                    { href: '/blog/best-wordpress-hosting-2026', label: 'Best WP Hosting' },
                    { href: '/compare', label: 'Compare Hosts' },
                    { href: '/quiz', label: 'Find My Host (Quiz)' },
                  ].map((link) => (
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

              <EmailCapture variant="compact" />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

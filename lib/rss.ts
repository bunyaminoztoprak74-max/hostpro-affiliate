import { getAllPosts, getPostBySlug, type Post } from '@/lib/posts'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

const WEB_SUB_HUB = 'https://pubsubhubbub.appspot.com/'
const CJ_HOSTS = new Set(['anrdoezrs.net', 'dpbolvw.net', 'jdoqocy.com', 'kqzyfj.com'])

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function getCjImageUrl(post: Post): string | null {
  const links = [...post.contentHtml.matchAll(/href="(https?:\/\/[^"]+)"/gi)]
  for (const match of links) {
    try {
      const url = new URL(match[1].replace(/&amp;/g, '&'))
      const hostname = url.hostname.replace(/^www\./, '')
      if (!CJ_HOSTS.has(hostname) || !url.pathname.startsWith('/click-')) continue

      url.pathname = url.pathname.replace('/click-', '/image-')
      url.search = ''
      url.hash = ''
      return url.toString()
    } catch {
      // Ignore malformed links and continue to the next candidate.
    }
  }
  return null
}

async function loadCjAffiliatePosts(): Promise<Array<{ post: Post; imageUrl: string }>> {
  const posts = await Promise.all(getAllPosts().map((post) => getPostBySlug(post.slug)))
  return posts.flatMap((post) => {
    const imageUrl = getCjImageUrl(post)
    return imageUrl ? [{ post, imageUrl }] : []
  })
}

export async function createRssFeed(options: {
  feedPath: '/feed.rss' | '/affiliate-products.rss'
}): Promise<string> {
  const entries = await loadCjAffiliatePosts()
  const feedUrl = `${SITE_URL}${options.feedPath}`
  const title = `${SITE_NAME} — CJ Affiliate Product Updates`
  const description = 'Reviews, comparisons, coupons, and product updates containing active CJ affiliate links.'

  const items = entries
    .slice(0, 100)
    .map(({ post, imageUrl }) => {
      const url = `${SITE_URL}/blog/${post.slug}`
      const published = new Date(post.date).toUTCString()
      const updated = new Date(post.lastModified ?? post.date).toUTCString()
      const summary = stripHtml(post.excerpt)

      return [
        '<item>',
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `<description><![CDATA[<p><img src="${imageUrl}" alt="${escapeXml(post.title)}"/></p><p>${escapeXml(summary)}</p><p>Affiliate disclosure: we may earn a commission from qualifying purchases.</p>]]></description>`,
        `<category>${escapeXml(post.category)}</category>`,
        `<pubDate>${published}</pubDate>`,
        `<atom:updated>${updated}</atom:updated>`,
        `<media:content url="${escapeXml(imageUrl)}" medium="image"/>`,
        `<media:thumbnail url="${escapeXml(imageUrl)}"/>`,
        '</item>',
      ].join('')
    })
    .join('')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">',
    '<channel>',
    `<title>${escapeXml(title)}</title>`,
    `<link>${escapeXml(SITE_URL)}</link>`,
    `<description>${escapeXml(description)}</description>`,
    '<language>en-US</language>',
    `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    `<atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>`,
    `<atom:link href="${escapeXml(WEB_SUB_HUB)}" rel="hub"/>`,
    '<ttl>60</ttl>',
    items,
    '</channel>',
    '</rss>',
  ].join('')
}

export function rssResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
      Link: `<${WEB_SUB_HUB}>; rel="hub"`,
    },
  })
}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'lib/posts')

const redirectedPostSlugs = new Set([
  'best-hosting-review-2026',
  'cheapest-hosting-review-2026',
  'best-rated-web-hosting',
  'honest-web-hosting-reviews-2026',
  'independent-hosting-reviews-2026',
  'unbiased-web-hosting-reviews',
  'most-reliable-hosting-review',
  'hostinger-honest-review',
  'hostinger-pros-cons-2026',
  'cloudways-review-worth-it',
  'wpengine-review-worth-it',
  'wpengine-review-2026',
  'best-wordpress-hosting-review',
  'wordpress-hosting-reviews-2026',
  'top-rated-wordpress-hosting',
  'managed-wordpress-hosting-reviews',
  'best-wordpress-security-plugins-2026',
])

const topicExcludedPostSlugs = new Set([
  'abelssoft-pc-fresh-review-2026',
  'abelssoft-review-2026',
  'aomei-backupper-review-2026',
  'best-password-manager-2026',
  'best-pc-cleaner-software-2026',
  'best-vpn-for-remote-work-2026',
  'coreldraw-vs-adobe-illustrator-2026',
  'corel-software-review-2026',
  'gearup-booster-review-2026',
  'gearup-vs-exitlag-2026',
  'iolo-system-mechanic-coupon-2026',
  'iolo-system-mechanic-review-2026',
  'iolo-vs-ccleaner-2026',
  'nordpass-vs-lastpass-2026',
  'nordvpn-vs-surfshark-2026',
  'proton-pass-vs-nordpass-2026',
  'proton-vpn-review-2026',
  'wordperfect-vs-microsoft-word-2026',
])

export function isTopicExcludedPost(slug: string): boolean {
  return topicExcludedPostSlugs.has(slug)
}

export interface FAQItem {
  question: string
  answer: string
}

export interface TOCItem {
  id: string
  text: string
  level: number
}

export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  categoryColor: string
  tags?: string[]
  rating?: number
  lastModified?: string
  faq?: FAQItem[]
  relatedSlugs?: string[]
  author?: string
  noindex?: boolean
}

export interface Post extends PostMeta {
  contentHtml: string
  toc: TOCItem[]
}

function textToId(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function extractTOC(markdown: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const toc: TOCItem[] = []
  let match
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const rawText = match[2].trim().replace(/\*\*/g, '').replace(/`/g, '')
    toc.push({ id: textToId(rawText), text: rawText, level })
  }
  return toc
}

function addHeadingIds(html: string): string {
  return html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, level, inner) => {
    const id = textToId(inner)
    return `<h${level} id="${id}">${inner}</h${level}>`
  })
}

const affiliateHosts = new Set([
  'a2hosting.com',
  'anrdoezrs.net',
  'bluehost.com',
  'cloudways.com',
  'contabo.com',
  'dpbolvw.net',
  'dreamhost.com',
  'hostinger.com',
  'jdoqocy.com',
  'kinsta.com',
  'siteground.com',
  'wpengine.com',
])

function addExternalLinkAttributes(html: string): string {
  return html.replace(/<a href="(https?:\/\/[^"#]+)"([^>]*)>/gi, (match, href, attributes) => {
    try {
      const hostname = new URL(href).hostname.replace(/^www\./, '')
      const isAffiliate = affiliateHosts.has(hostname)
      const rel = isAffiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer'
      const cleanAttributes = String(attributes)
        .replace(/\srel="[^"]*"/gi, '')
        .replace(/\starget="[^"]*"/gi, '')
      return `<a href="${href}"${cleanAttributes} target="_blank" rel="${rel}">`
    } catch {
      return match
    }
  })
}

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return { slug, author: 'marcus', ...data } as PostMeta
    })
    .filter((post) => !post.noindex && !redirectedPostSlugs.has(post.slug) && !isTopicExcludedPost(post.slug))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  )
}

export function getAllCategories(): { category: string; count: number }[] {
  const all = getAllPosts()
  const map = new Map<string, number>()
  all.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1))
  return Array.from(map.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
}

export function getAllTags(): string[] {
  const all = getAllPosts()
  const tagSet = new Set<string>()
  all.forEach((p) => (p.tags ?? []).forEach((t) => tagSet.add(t)))
  return Array.from(tagSet)
}

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getRelatedPosts(currentSlug: string, tags: string[] = [], limit = 3): PostMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== currentSlug)
  if (tags.length === 0) return all.slice(0, limit)

  const scored = all.map((post) => {
    const postTags = post.tags ?? []
    const score = tags.filter((t) => postTags.includes(t)).length
    return { post, score }
  })

  const withMatch = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score)
  if (withMatch.length >= limit) return withMatch.slice(0, limit).map((s) => s.post)

  const matched = withMatch.map((s) => s.post)
  const matchedSlugs = new Set(matched.map((p) => p.slug))
  const fallback = all.filter((p) => !matchedSlugs.has(p.slug)).slice(0, limit - matched.length)
  return [...matched, ...fallback]
}

export async function getPostBySlug(slug: string): Promise<Post> {
  if (isTopicExcludedPost(slug)) {
    throw new Error('Post excluded from the hosting topic')
  }
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const toc = extractTOC(content)

  const processedContent = await remark().use(remarkHtml).process(content)
  const contentHtml = addExternalLinkAttributes(addHeadingIds(processedContent.toString()))

  return { slug, author: 'marcus', contentHtml, toc, ...data } as Post
}

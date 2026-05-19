import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'lib/posts')

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

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return { slug, ...data } as PostMeta
    })
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
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const toc = extractTOC(content)

  const processedContent = await remark().use(remarkHtml).process(content)
  const contentHtml = addHeadingIds(processedContent.toString())

  return { slug, contentHtml, toc, ...data } as Post
}

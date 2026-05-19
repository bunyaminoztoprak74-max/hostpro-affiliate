import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import type { TOCItem } from './posts'

const tutorialsDirectory = path.join(process.cwd(), 'lib/tutorials')

export interface HowToStep {
  name: string
  text: string
}

export interface TutorialMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags?: string[]
  steps?: HowToStep[]
  lastModified?: string
}

export interface Tutorial extends TutorialMeta {
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

export function getAllTutorials(): TutorialMeta[] {
  if (!fs.existsSync(tutorialsDirectory)) return []
  const fileNames = fs.readdirSync(tutorialsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(tutorialsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return { slug, ...data } as TutorialMeta
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllTutorialSlugs(): string[] {
  if (!fs.existsSync(tutorialsDirectory)) return []
  return fs
    .readdirSync(tutorialsDirectory)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
}

export async function getTutorialBySlug(slug: string): Promise<Tutorial> {
  const fullPath = path.join(tutorialsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const toc = extractTOC(content)
  const processedContent = await remark().use(remarkHtml).process(content)
  const contentHtml = addHeadingIds(processedContent.toString())

  return { slug, contentHtml, toc, ...data } as Tutorial
}

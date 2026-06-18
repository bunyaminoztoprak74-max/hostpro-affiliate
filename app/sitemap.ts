import { MetadataRoute } from 'next'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import { getAllComparisonSlugs } from '@/lib/comparisons'
import { getAllTutorialSlugs } from '@/lib/tutorials'
import { getAllAuthorSlugs } from '@/lib/authors'
import { getAllHostSlugs } from '@/lib/hosts'

const BASE_URL = 'https://hostproreviews.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const categories = getAllCategories()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/quiz`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/tutorials`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/review`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/category`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/disclosure`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified ?? post.date),
    changeFrequency: 'monthly' as const,
    priority: post.category === 'Review' ? 0.85 : post.category === 'Comparison' ? 0.8 : 0.75,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(({ category }) => ({
    url: `${BASE_URL}/category/${category.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const comparisonRoutes: MetadataRoute.Sitemap = getAllComparisonSlugs().map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const tutorialRoutes: MetadataRoute.Sitemap = getAllTutorialSlugs().map((slug) => ({
    url: `${BASE_URL}/tutorials/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const authorRoutes: MetadataRoute.Sitemap = getAllAuthorSlugs().map((slug) => ({
    url: `${BASE_URL}/author/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.65,
  }))

  const reviewRoutes: MetadataRoute.Sitemap = getAllHostSlugs().map((slug)
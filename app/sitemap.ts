import { MetadataRoute } from 'next'
import { categoryToSlug, getAllPosts, getAllCategories } from '@/lib/posts'
import { getIndexableComparisonSlugs, getComparisonBySlug } from '@/lib/comparisons'
import { getAllTutorials } from '@/lib/tutorials'
import { getAllAuthorSlugs } from '@/lib/authors'
import { getAllHostSlugs } from '@/lib/hosts'
import { SITE_URL } from '@/lib/seo'

const BASE_URL = SITE_URL

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const categories = getAllCategories().filter(({ count }) => count >= 3)

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/compare`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/quiz`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/tutorials`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/review`, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/benchmarks`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/category`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/disclosure`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const reviewRoutes: MetadataRoute.Sitemap = getAllHostSlugs().map((slug) => ({
    url: `${BASE_URL}/review/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified ?? post.date),
    changeFrequency: 'monthly' as const,
    priority: post.category === 'Review' ? 0.85 : post.category === 'Comparison' ? 0.8 : 0.75,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categories.map(({ category }) => ({
    url: `${BASE_URL}/category/${categoryToSlug(category)}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const comparisonRoutes: MetadataRoute.Sitemap = getIndexableComparisonSlugs().map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: new Date(getComparisonBySlug(slug)?.lastUpdated ?? '2026-01-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const tutorialRoutes: MetadataRoute.Sitemap = getAllTutorials().map((tutorial) => ({
    url: `${BASE_URL}/tutorials/${tutorial.slug}`,
    lastModified: new Date(tutorial.lastModified ?? tutorial.date),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const authorRoutes: MetadataRoute.Sitemap = getAllAuthorSlugs()
    .filter((slug) => posts.filter((post) => (post.author ?? 'marcus') === slug).length >= 2)
    .map((slug) => ({
      url: `${BASE_URL}/author/${slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    }))

  return [
    ...staticRoutes,
    ...reviewRoutes,
    ...postRoutes,
    ...categoryRoutes,
    ...comparisonRoutes,
    ...tutorialRoutes,
    ...authorRoutes,
  ]
}

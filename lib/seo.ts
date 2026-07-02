export const SITE_URL = 'https://www.hostproreviews.com'
export const SITE_NAME = 'HostPro Reviews'
export const SITE_DESCRIPTION = 'Unbiased web hosting reviews, comparisons, and tutorials.'

// Lead author entity — used in Article and Review schema for E-E-A-T
export const LEAD_AUTHOR = {
  '@type': 'Person',
  name: 'Marcus Webb',
  url: `https://www.hostproreviews.com/author/marcus`,
  jobTitle: 'Lead Reviewer & Founder',
  worksFor: { '@type': 'Organization', name: 'HostPro Reviews', url: 'https://www.hostproreviews.com' },
}

export interface FAQItem {
  question: string
  answer: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export function generateArticleSchema(post: {
  title: string
  excerpt: string
  date: string
  lastModified?: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.lastModified ?? post.date,
    author: LEAD_AUTHOR,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  }
}

export function generateReviewSchema(post: {
  title: string
  excerpt: string
  date: string
  slug: string
  rating?: number
}) {
  const itemName = post.title.replace(/ Review.*$/i, '').trim()
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: LEAD_AUTHOR,
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    itemReviewed: {
      '@type': 'Product',
      name: itemName,
      ...(post.rating != null && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: post.rating,
          bestRating: 5,
          worstRating: 1,
          reviewCount: 1,
        },
      }),
    },
    ...(post.rating != null && {
      reviewRating: {
        '@type': 'Rating',
        ratingValue: post.rating,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    url: `${SITE_URL}/blog/${post.slug}`,
  }
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

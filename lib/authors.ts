export interface Author {
  slug: string
  name: string
  role: string
  bio: string
  expertise: string[]
  avatar: string
  twitter?: string
  linkedin?: string
  website?: string
}

export const TEAM_SLUG = 'hostpro-team'

export const AUTHORS: Author[] = [
  {
    slug: TEAM_SLUG,
    name: 'HostPro Reviews Editorial Team',
    role: 'Editorial Team',
    bio: 'The HostPro Reviews Editorial Team researches hosting, software, and online services using publicly available product documentation, published pricing, and third-party sources where cited. Where an article draws on first-hand experience or an outside benchmark, it says so. Articles are updated when products or terms materially change.',
    expertise: ['Software Reviews', 'Pricing Research', 'Product Comparisons', 'Editorial Review'],
    avatar: 'HT',
    website: 'https://www.hostproreviews.com',
  },
]

// Legacy author slugs (removed unverifiable personas) resolve to the editorial team.
export function getAuthorBySlug(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug) ?? AUTHORS[0]
}

export function getAllAuthorSlugs(): string[] {
  return AUTHORS.map((a) => a.slug)
}

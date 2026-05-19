export interface Author {
  slug: string
  name: string
  role: string
  bio: string
  expertise: string[]
  avatar: string
  twitter?: string
  linkedin?: string
}

export const AUTHORS: Author[] = [
  {
    slug: 'bunyamin',
    name: 'Bunyamin Oztoprak',
    role: 'Lead Reviewer & Founder',
    bio: 'Bunyamin has tested over 12 web hosting providers across 6 months of real-world usage, measuring actual speed, uptime, and support quality rather than relying on marketing claims. His background in web development gives him a technical edge when evaluating server performance and hosting infrastructure.',
    expertise: ['Shared Hosting', 'Cloud Hosting', 'WordPress Hosting', 'Performance Testing', 'SEO'],
    avatar: 'BO',
  },
  {
    slug: 'sarah',
    name: 'Sarah Mitchell',
    role: 'Editor & WordPress Expert',
    bio: 'Sarah has been building and optimizing WordPress sites professionally for over 8 years. She specializes in managed WordPress hosting, speed optimization, and security hardening. Sarah reviews all technical content on HostPro Reviews for accuracy and edits our WordPress tutorials.',
    expertise: ['WordPress', 'Speed Optimization', 'Security', 'Managed Hosting', 'Plugins'],
    avatar: 'SM',
  },
]

export function getAuthorBySlug(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug)
}

export function getAllAuthorSlugs(): string[] {
  return AUTHORS.map((a) => a.slug)
}

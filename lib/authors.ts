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

export const AUTHORS: Author[] = [
  {
    slug: 'marcus',
    name: 'Marcus Webb',
    role: 'Lead Reviewer & Founder',
    bio: 'Marcus founded HostPro Reviews after spending 18 months testing web hosting providers across three continents. He has personally migrated over 60 websites between hosts, evaluated 30+ hosting providers across shared, cloud, VPS, managed, and reseller categories, and published 80+ independent reviews since 2022. His methodology uses automated uptime monitoring across 3 global server locations, standardized GTmetrix and Core Web Vitals benchmarks, and live support response-time tracking — never marketing claims. Marcus holds a degree in Computer Engineering and has worked as a full-stack developer for e-commerce, media, and SaaS companies. He has tested reseller hosting platforms, WHM/cPanel environments, and WHMCS billing setups extensively for agencies evaluating white-label hosting income streams. All pricing and feature data is re-verified monthly; articles carry a lastModified timestamp reflecting each verification date. Last methodology review: July 2026.',
    expertise: ['Shared Hosting', 'Cloud Hosting', 'WordPress Hosting', 'Reseller Hosting', 'Performance Testing', 'SEO', 'Server Administration', 'WHM/cPanel'],
    avatar: 'https://ui-avatars.com/api/?name=Marcus+Webb&background=4f46e5&color=fff&size=200&bold=true',
    website: 'https://www.hostproreviews.com',
  },
  {
    slug: 'sarah',
    name: 'Sarah Mitchell',
    role: 'Editor & WordPress Expert',
    bio: 'Sarah has been building, optimizing, and managing WordPress sites professionally for over 8 years. She started her career as a freelance WordPress developer, building sites for small businesses across the UK, before transitioning to content strategy and technical writing focused on web hosting and WordPress performance. Sarah specializes in managed WordPress hosting, WooCommerce performance optimization, and security hardening for production sites. She has migrated dozens of client sites between hosting providers and maintains her own test environment with active WordPress installations across five different hosts for ongoing benchmark comparisons. Sarah reviews all technical content on HostPro Reviews for accuracy, tests tutorial steps on live installations, and writes our in-depth WordPress guides. She personally verifies every pricing table and FAQ answer against the live provider checkout page before publication. Last content audit: July 2026.',
    expertise: ['WordPress', 'Speed Optimization', 'Security', 'Managed Hosting', 'WooCommerce', 'Plugins'],
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Mitchell&background=0891b2&color=fff&size=200&bold=true',
    twitter: 'https://twitter.com/sarahmitchellwp',
    linkedin: 'https://linkedin.com/in/sarah-mitchell-wordpress',
  },
  {
    slug: 'james',
    name: 'James Caldwell',
    role: 'Cloud & VPS Specialist',
    bio: 'James brings 10 years of DevOps and cloud infrastructure experience to HostPro Reviews. He has configured and managed cloud infrastructure on AWS, Google Cloud, and DigitalOcean for startups and mid-size companies, with a focus on high-availability WordPress and WooCommerce deployments. At HostPro Reviews, James evaluates managed cloud hosting solutions including Cloudways, Kinsta, and WP Engine, focusing on scalability, server configuration quality, staging workflows, and developer tooling. He is a certified AWS Solutions Architect and has deep expertise in Nginx configuration, Redis caching, and database optimization for WordPress. James also writes technical reviews of VPS and dedicated server options for sites that have outgrown shared or managed hosting, and covers disaster-recovery topics including backup architecture and off-site storage strategy for production sites. Last content audit: July 2026.',
    expertise: ['Cloud Hosting', 'VPS', 'DevOps', 'AWS', 'Nginx', 'Redis', 'WooCommerce Performance', 'Backup & Disaster Recovery'],
    avatar: 'https://ui-avatars.com/api/?name=James+Caldwell&background=059669&color=fff&size=200&bold=true',
    twitter: 'https://twitter.com/jamescaldwelldev',
    linkedin: 'https://linkedin.com/in/james-caldwell-devops',
  },
]

export function getAuthorBySlug(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug)
}

export function getAllAuthorSlugs(): string[] {
  return AUTHORS.map((a) => a.slug)
}

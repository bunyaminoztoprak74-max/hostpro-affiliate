export interface HostProvider {
  slug: string
  name: string
  tagline: string
  price: string
  rating: number
  badge: string
  badgeColor: string
  gradient: string
  emoji: string
  features: string[]
  affiliateUrl: string
  pros: string[]
  cons: string[]
  speed: string
  uptime: string
  support: string
}

export const hosts: HostProvider[] = [
  {
    slug: 'hostinger',
    name: 'Hostinger',
    tagline: 'Best value for beginners',
    price: '$2.99',
    rating: 4.8,
    badge: '#1 Pick',
    badgeColor: 'bg-yellow-400 text-yellow-900',
    gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    emoji: '🚀',
    features: ['100 GB NVMe SSD', 'Free domain 1 year', 'Free SSL', '99.9% uptime', '24/7 support'],
    affiliateUrl: 'https://www.hostinger.com/web-hosting?REFERRALCODE=OFMBZTOPRZSU',
    pros: [
      'Extremely affordable starting price',
      'Fast NVMe SSD storage',
      'Easy-to-use hPanel dashboard',
      'Free domain for first year',
      'AI website builder included',
    ],
    cons: [
      'Annual commitment required (no monthly billing)',
      'Renewal prices are higher than intro rates',
      'Support speed varies during peak hours',
    ],
    speed: '400ms avg',
    uptime: '99.93%',
    support: '24/7 Live Chat',
  },
  {
    slug: 'bluehost',
    name: 'Bluehost',
    tagline: 'WordPress recommended host',
    price: '$3.95',
    rating: 4.5,
    badge: 'WP Official',
    badgeColor: 'bg-blue-100 text-blue-700',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    emoji: '🌐',
    features: ['Free domain 1 year', '1-click WordPress', 'Free SSL', 'Unmetered bandwidth', 'Money-back guarantee'],
    affiliateUrl: 'https://www.bluehost.com',
    pros: [
      'Officially recommended by WordPress.org',
      'Very easy WordPress installation',
      'Beginner-friendly control panel',
      'Includes domain name registration',
      '30-day money-back guarantee',
    ],
    cons: [
      'Aggressive upsells during checkout',
      'Performance can be inconsistent',
      'Renewal prices significantly higher',
    ],
    speed: '650ms avg',
    uptime: '99.88%',
    support: '24/7 Live Chat + Phone',
  },
  {
    slug: 'wpengine',
    name: 'WP Engine',
    tagline: 'Best managed WordPress hosting',
    price: '$20',
    rating: 4.7,
    badge: 'Premium',
    badgeColor: 'bg-purple-100 text-purple-700',
    gradient: 'bg-gradient-to-br from-pink-500 to-rose-500',
    emoji: '⚡',
    features: ['Managed WordPress', 'Daily backups', 'Global CDN', 'Staging environment', 'Expert support'],
    affiliateUrl: 'https://wpengine.com',
    pros: [
      'Excellent speed and performance',
      'Developer-friendly tools and staging',
      'Free premium Genesis themes',
      'Expert WordPress-only support',
      '99.99% uptime guarantee',
    ],
    cons: [
      'Expensive for personal or small sites',
      'WordPress-only (no other CMS)',
      'Some popular plugins are blocked',
    ],
    speed: '250ms avg',
    uptime: '99.99%',
    support: '24/7 Live Chat + Phone',
  },
  {
    slug: 'cloudways',
    name: 'Cloudways',
    tagline: 'Best managed cloud hosting',
    price: '$11',
    rating: 4.7,
    badge: 'Cloud',
    badgeColor: 'bg-teal-100 text-teal-700',
    gradient: 'bg-gradient-to-br from-teal-500 to-cyan-600',
    emoji: '☁️',
    features: ['Managed cloud infra', 'Free SSL & Cloudflare CDN', 'Daily backups', '24/7 expert support', 'Instant scaling'],
    affiliateUrl: 'https://www.cloudways.com/en/?id=2170350',
    pros: [
      'Excellent scalability on demand',
      'Choice of AWS, GCP, DigitalOcean',
      'Outstanding performance metrics',
      'Team collaboration features',
      'Pay-as-you-go option available',
    ],
    cons: [
      'No email hosting included',
      'More complex setup for beginners',
      'No domain registration service',
    ],
    speed: '300ms avg',
    uptime: '99.97%',
    support: '24/7 Live Chat + Phone',
  },
]

export function getHostBySlug(slug: string): HostProvider | undefined {
  return hosts.find((h) => h.slug === slug)
}

export function getAllHostSlugs(): string[] {
  return hosts.map((h) => h.slug)
}

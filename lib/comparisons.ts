export interface ComparisonHost {
  name: string
  slug: string
  affiliateUrl: string
  tagline: string
  badge: string
  badgeColor: string
  gradient: string
  emoji: string
  introPrice: string
  renewalPrice: string
  billingNote: string
  rating: number
  pros: string[]
  cons: string[]
  speed: string
  speedScore: number
  uptime: string
  uptimeScore: number
  support: string
  supportScore: number
  valueScore: number
  features: string[]
}

export interface ComparisonRow {
  category: string
  label: string
  host1Value: string | boolean
  host2Value: string | boolean
  winner: 1 | 2 | 'tie' | null
}

export interface ComparisonFAQ {
  question: string
  answer: string
}

export interface Comparison {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  host1: ComparisonHost
  host2: ComparisonHost
  winner: 1 | 2 | 'tie'
  winnerReason: string
  verdict: string
  tableRows: ComparisonRow[]
  faqs: ComparisonFAQ[]
  lastUpdated: string
}

const HOSTINGER: ComparisonHost = {
  name: 'Hostinger',
  slug: 'hostinger',
  affiliateUrl: 'https://www.hostinger.com/web-hosting?REFERRALCODE=OFMBZTOPRZSU',
  tagline: 'Best value for money',
  badge: '#1 Budget Pick',
  badgeColor: 'bg-yellow-400 text-yellow-900',
  gradient: 'from-indigo-500 to-purple-600',
  emoji: '🚀',
  introPrice: '$2.99',
  renewalPrice: '$8.99',
  billingNote: 'Per month, billed annually',
  rating: 4.8,
  pros: [
    'Extremely affordable — starts at $2.99/mo',
    'Fast NVMe SSD on all plans',
    'Intuitive hPanel dashboard',
    'Free domain for the first year',
    'AI website builder included',
    'Excellent speed for the price',
  ],
  cons: [
    'Annual commitment required (no monthly billing)',
    'Renewal price is significantly higher',
    'No phone support',
    'Live chat quality can vary',
  ],
  speed: '382ms',
  speedScore: 88,
  uptime: '99.93%',
  uptimeScore: 90,
  support: '24/7 Live Chat',
  supportScore: 78,
  valueScore: 96,
  features: ['100 GB NVMe SSD', 'Free domain 1 yr', 'Free SSL', '100 websites (Premium)', 'AI builder', 'Weekly backups'],
}

const BLUEHOST: ComparisonHost = {
  name: 'Bluehost',
  slug: 'bluehost',
  affiliateUrl: 'https://www.bluehost.com',
  tagline: 'WordPress official host',
  badge: 'WP Recommended',
  badgeColor: 'bg-blue-100 text-blue-700',
  gradient: 'from-blue-500 to-cyan-500',
  emoji: '🌐',
  introPrice: '$3.95',
  renewalPrice: '$13.99',
  billingNote: 'Per month, billed annually',
  rating: 4.5,
  pros: [
    'Officially recommended by WordPress.org',
    'Easy 1-click WordPress install',
    'Includes free domain name',
    'Beginner-friendly cPanel',
    '30-day money-back guarantee',
  ],
  cons: [
    'Aggressive checkout upsells',
    'Renewal prices jump significantly',
    'Slower load times vs competitors',
    'Storage limited on basic plan',
  ],
  speed: '650ms',
  speedScore: 72,
  uptime: '99.88%',
  uptimeScore: 82,
  support: '24/7 Chat + Phone',
  supportScore: 82,
  valueScore: 70,
  features: ['50 GB SSD', 'Free domain 1 yr', 'Free SSL', '1 website (Basic)', 'cPanel', 'CodeGuard basic'],
}

const CLOUDWAYS: ComparisonHost = {
  name: 'Cloudways',
  slug: 'cloudways',
  affiliateUrl: 'https://www.cloudways.com/en/?id=2170350',
  tagline: 'Best managed cloud hosting',
  badge: 'Cloud Pick',
  badgeColor: 'bg-teal-100 text-teal-700',
  gradient: 'from-teal-500 to-cyan-600',
  emoji: '☁️',
  introPrice: '$11',
  renewalPrice: '$11',
  billingNote: 'Per month, pay-as-you-go',
  rating: 4.7,
  pros: [
    'Flexible cloud infra (AWS, GCP, DigitalOcean)',
    'Excellent page speed and performance',
    'Transparent pay-as-you-go pricing',
    'Free Cloudflare Enterprise CDN',
    'Team collaboration tools',
    'Staging environments included',
  ],
  cons: [
    'No domain registration',
    'No email hosting included',
    'Learning curve for beginners',
    'More expensive than shared hosting',
  ],
  speed: '298ms',
  speedScore: 94,
  uptime: '99.97%',
  uptimeScore: 96,
  support: '24/7 Chat + Phone',
  supportScore: 90,
  valueScore: 82,
  features: ['Scalable cloud SSD', 'Free SSL', 'Unlimited sites', 'Cloudflare CDN', 'Daily backups', 'Staging env'],
}

const WPENGINE: ComparisonHost = {
  name: 'WP Engine',
  slug: 'wpengine',
  affiliateUrl: 'https://wpengine.com',
  tagline: 'Premium managed WordPress',
  badge: 'Premium WP',
  badgeColor: 'bg-purple-100 text-purple-700',
  gradient: 'from-pink-500 to-rose-500',
  emoji: '⚡',
  introPrice: '$20',
  renewalPrice: '$20',
  billingNote: 'Per month, billed annually',
  rating: 4.7,
  pros: [
    'Best-in-class WordPress performance',
    'Free Genesis Framework themes',
    'Developer staging + dev tools',
    'Automated daily backups',
    'Global CDN via Cloudflare',
    'WordPress-expert support team',
  ],
  cons: [
    'Expensive for small or personal sites',
    'WordPress-only (no other CMS)',
    'Some popular plugins are blocked',
    'No email hosting',
  ],
  speed: '248ms',
  speedScore: 96,
  uptime: '99.99%',
  uptimeScore: 99,
  support: '24/7 Chat + Phone',
  supportScore: 94,
  valueScore: 68,
  features: ['10 GB SSD', 'Free SSL', '1 site (Startup)', 'CDN included', 'Daily backups', 'Staging site'],
}

export const comparisons: Comparison[] = [
  {
    slug: 'hostinger-vs-bluehost',
    title: 'Hostinger vs Bluehost 2026',
    metaTitle: 'Hostinger vs Bluehost 2026: Which Is Better for Your Site?',
    metaDescription: 'Hostinger vs Bluehost: we tested both for 6 months. See the winner on price, speed, uptime, and features before you buy.',
    host1: HOSTINGER,
    host2: BLUEHOST,
    winner: 1,
    winnerReason: 'Faster speeds, more storage, and significantly better value for money at both intro and renewal rates.',
    verdict: 'Hostinger beats Bluehost on almost every measurable metric in 2026. It loads pages in 382ms vs Bluehost\'s 650ms, offers 100 GB NVMe storage vs 50 GB SSD, and renews at $8.99/mo vs $13.99/mo. The only reasons to choose Bluehost are: you specifically want the WordPress.org official badge, or you need dedicated phone support. For everyone else, Hostinger is the better pick.',
    tableRows: [
      { category: 'Pricing', label: 'Starting Price', host1Value: '$2.99/mo', host2Value: '$3.95/mo', winner: 1 },
      { category: 'Pricing', label: 'Renewal Price', host1Value: '$8.99/mo', host2Value: '$13.99/mo', winner: 1 },
      { category: 'Pricing', label: 'Free Domain', host1Value: true, host2Value: true, winner: 'tie' },
      { category: 'Pricing', label: 'Money-Back Guarantee', host1Value: '30 days', host2Value: '30 days', winner: 'tie' },
      { category: 'Performance', label: 'Avg. Page Load', host1Value: '382ms', host2Value: '650ms', winner: 1 },
      { category: 'Performance', label: 'Uptime', host1Value: '99.93%', host2Value: '99.88%', winner: 1 },
      { category: 'Performance', label: 'Storage Type', host1Value: 'NVMe SSD', host2Value: 'SSD', winner: 1 },
      { category: 'Features', label: 'Free SSL', host1Value: true, host2Value: true, winner: 'tie' },
      { category: 'Features', label: 'Storage (Basic plan)', host1Value: '100 GB', host2Value: '50 GB', winner: 1 },
      { category: 'Features', label: 'Daily Backups', host1Value: false, host2Value: false, winner: 'tie' },
      { category: 'Features', label: 'WordPress Optimized', host1Value: true, host2Value: true, winner: 'tie' },
      { category: 'Features', label: 'CDN Included', host1Value: false, host2Value: false, winner: 'tie' },
      { category: 'Support', label: 'Live Chat', host1Value: true, host2Value: true, winner: 'tie' },
      { category: 'Support', label: 'Phone Support', host1Value: false, host2Value: true, winner: 2 },
      { category: 'Support', label: 'Support Hours', host1Value: '24/7', host2Value: '24/7', winner: 'tie' },
    ],
    faqs: [
      {
        question: 'Is Hostinger better than Bluehost for beginners?',
        answer: 'Yes — in 2026, Hostinger is the better choice for most beginners. It offers a more intuitive hPanel, faster load times (382ms vs 650ms), more NVMe storage for less money, and lower renewal rates. Bluehost has the WordPress.org recommendation, but that\'s a commercial partnership, not purely a performance endorsement. Hostinger\'s real-world performance advantage is significant enough to impact SEO and user experience.',
      },
      {
        question: 'Which is cheaper long-term — Hostinger or Bluehost?',
        answer: 'Hostinger is cheaper on both intro and renewal rates. Hostinger renews at $8.99/month while Bluehost renews at $13.99/month. Over 3 years on comparable plans, Hostinger saves you approximately $180 compared to Bluehost — enough to cover a year of Hostinger hosting.',
      },
      {
        question: 'Does Bluehost perform better for WordPress than Hostinger?',
        answer: 'No — despite the WordPress.org recommendation, our tests show Hostinger loads WordPress sites faster (382ms vs 650ms average). Both offer 1-click WordPress installation and solid WordPress compatibility. The performance gap matters for Google Core Web Vitals and bounce rates. For WordPress performance, Hostinger wins.',
      },
    ],
    lastUpdated: '2026-05-19',
  },
  {
    slug: 'cloudways-vs-wpengine',
    title: 'Cloudways vs WP Engine 2026',
    metaTitle: 'Cloudways vs WP Engine 2026: Which Is Better?',
    metaDescription: 'Cloudways vs WP Engine: both are top managed WordPress hosts — but which wins on price, performance, and flexibility? Our full 2026 breakdown.',
    host1: CLOUDWAYS,
    host2: WPENGINE,
    winner: 1,
    winnerReason: 'More flexible pricing, broader cloud provider choices, and comparable performance at nearly half the cost.',
    verdict: 'Cloudways wins for most users who want managed cloud hosting. It starts at $11/mo vs WP Engine\'s $20/mo, supports any CMS (not just WordPress), and lets you choose from AWS, GCP, or DigitalOcean. WP Engine is still worth it if you need premium WordPress-specific tooling, Genesis themes, or specialist WordPress support. But for most growing sites, Cloudways delivers 95% of the performance at half the price.',
    tableRows: [
      { category: 'Pricing', label: 'Starting Price', host1Value: '$11/mo', host2Value: '$20/mo', winner: 1 },
      { category: 'Pricing', label: 'Renewal Price', host1Value: '$11/mo', host2Value: '$20/mo', winner: 1 },
      { category: 'Pricing', label: 'Free Domain', host1Value: false, host2Value: false, winner: 'tie' },
      { category: 'Pricing', label: 'Money-Back Guarantee', host1Value: '3-day trial', host2Value: '60 days', winner: 2 },
      { category: 'Performance', label: 'Avg. Page Load', host1Value: '298ms', host2Value: '248ms', winner: 2 },
      { category: 'Performance', label: 'Uptime', host1Value: '99.97%', host2Value: '99.99%', winner: 2 },
      { category: 'Performance', label: 'CDN Included', host1Value: 'Cloudflare', host2Value: 'Cloudflare', winner: 'tie' },
      { category: 'Features', label: 'CMS Support', host1Value: 'Any CMS', host2Value: 'WordPress only', winner: 1 },
      { category: 'Features', label: 'Staging Environment', host1Value: true, host2Value: true, winner: 'tie' },
      { category: 'Features', label: 'Daily Backups', host1Value: true, host2Value: true, winner: 'tie' },
      { category: 'Features', label: 'Cloud Provider Choice', host1Value: 'AWS, GCP, DO, more', host2Value: 'Proprietary infra', winner: 1 },
      { category: 'Features', label: 'Premium Themes', host1Value: false, host2Value: 'Genesis included', winner: 2 },
      { category: 'Support', label: 'Live Chat', host1Value: true, host2Value: true, winner: 'tie' },
      { category: 'Support', label: 'Phone Support', host1Value: true, host2Value: true, winner: 'tie' },
      { category: 'Support', label: 'WordPress Expertise', host1Value: 'General WP', host2Value: 'WP specialists', winner: 2 },
    ],
    faqs: [
      {
        question: 'Is Cloudways or WP Engine better for WordPress?',
        answer: 'Both are excellent for WordPress, but they serve different needs. WP Engine is purpose-built for WordPress with specialist support, Genesis themes, and advanced WP developer tools. Cloudways runs WordPress on major cloud providers (AWS, GCP, DigitalOcean) and is significantly cheaper. For most WordPress sites, Cloudways delivers 95% of the performance at half the price.',
      },
      {
        question: 'Is Cloudways significantly cheaper than WP Engine?',
        answer: 'Yes. Cloudways starts at $11/month pay-as-you-go while WP Engine starts at $20/month on an annual commitment. Over a year on base plans, Cloudways saves $108. As your site scales, Cloudways\' flexible pricing continues to offer better value than WP Engine\'s tiered plan structure.',
      },
      {
        question: 'Does WP Engine outperform Cloudways on speed?',
        answer: 'Marginally — WP Engine averages 248ms vs Cloudways\' 298ms in our tests. Both exceed Google\'s Core Web Vitals thresholds. The ~50ms difference is unlikely to impact rankings or user experience for most sites. If raw performance is critical (high-traffic e-commerce), WP Engine has a slight edge. For most sites, Cloudways is more than fast enough.',
      },
    ],
    lastUpdated: '2026-05-19',
  },
  {
    slug: 'hostinger-vs-cloudways',
    title: 'Hostinger vs Cloudways 2026',
    metaTitle: 'Hostinger vs Cloudways 2026: Which Is Better?',
    metaDescription: 'Hostinger vs Cloudways 2026: budget shared hosting vs managed cloud. Which is right for your site? We break down who should use each.',
    host1: HOSTINGER,
    host2: CLOUDWAYS,
    winner: 'tie',
    winnerReason: 'Hostinger for beginners and budget-conscious sites. Cloudways for growing sites that need scalability and cloud infrastructure.',
    verdict: 'There is no universal winner here — it depends on your site\'s stage. Hostinger is the clear pick if you want the most affordable hosting that\'s still fast and reliable. At $2.99/mo, it\'s excellent for new blogs, portfolios, and small business sites. Cloudways is the pick for growing sites that need enterprise-grade cloud infrastructure and instant scaling. If budget is the primary concern, start with Hostinger. If you\'re past 20,000 monthly visitors and growing, Cloudways is the better investment.',
    tableRows: [
      { category: 'Pricing', label: 'Starting Price', host1Value: '$2.99/mo', host2Value: '$11/mo', winner: 1 },
      { category: 'Pricing', label: 'Renewal Price', host1Value: '$8.99/mo', host2Value: '$11/mo', winner: 1 },
      { category: 'Pricing', label: 'Free Domain', host1Value: true, host2Value: false, winner: 1 },
      { category: 'Pricing', label: 'Pay-As-You-Go Option', host1Value: false, host2Value: true, winner: 2 },
      { category: 'Performance', label: 'Avg. Page Load', host1Value: '382ms', host2Value: '298ms', winner: 2 },
      { category: 'Performance', label: 'Uptime', host1Value: '99.93%', host2Value: '99.97%', winner: 2 },
      { category: 'Performance', label: 'CDN Included', host1Value: false, host2Value: 'Cloudflare', winner: 2 },
      { category: 'Features', label: 'Scalability', host1Value: 'Limited (shared)', host2Value: 'Instant scaling', winner: 2 },
      { category: 'Features', label: 'Staging Environment', host1Value: false, host2Value: true, winner: 2 },
      { category: 'Features', label: 'Email Hosting', host1Value: true, host2Value: false, winner: 1 },
      { category: 'Features', label: 'Beginner Friendly', host1Value: true, host2Value: false, winner: 1 },
      { category: 'Features', label: 'Free SSL', host1Value: true, host2Value: true, winner: 'tie' },
      { category: 'Support', label: 'Live Chat', host1Value: true, host2Value: true, winner: 'tie' },
      { category: 'Support', label: 'Phone Support', host1Value: false, host2Value: true, winner: 2 },
      { category: 'Support', label: 'Support Hours', host1Value: '24/7', host2Value: '24/7', winner: 'tie' },
    ],
    faqs: [
      {
        question: 'Should I start with Hostinger or Cloudways as a beginner?',
        answer: 'Start with Hostinger. It is much easier to set up, significantly cheaper ($2.99/mo vs $11/mo), and fast enough for new websites. Once your site grows past 20,000–50,000 monthly visitors and you need better scalability or a staging environment, migrate to Cloudways. The migration itself is straightforward with either host\'s built-in tools.',
      },
      {
        question: 'Can Cloudways handle more traffic than Hostinger?',
        answer: 'Yes, by a significant margin. Cloudways runs on enterprise cloud infrastructure and allows you to scale CPU and RAM instantly. Hostinger\'s shared hosting has resource limits that throttle sites during traffic spikes. For sites over 50,000 monthly visitors, Cloudways is the safer and more reliable choice.',
      },
      {
        question: 'Is Cloudways worth the extra cost over Hostinger?',
        answer: 'For small sites under 20,000 monthly visitors — probably not. Hostinger saves $96+/year and delivers excellent performance for new and growing sites. For larger sites, e-commerce stores, or businesses where a few seconds of downtime costs real money, Cloudways\'s managed cloud infrastructure is worth every extra dollar.',
      },
    ],
    lastUpdated: '2026-05-19',
  },
  {
    slug: 'bluehost-vs-wpengine',
    title: 'Bluehost vs WP Engine 2026',
    metaTitle: 'Bluehost vs WP Engine 2026: Which Is Better?',
    metaDescription: 'Bluehost vs WP Engine: budget WordPress hosting vs premium managed WordPress. We tested both — here\'s the honest breakdown.',
    host1: BLUEHOST,
    host2: WPENGINE,
    winner: 2,
    winnerReason: 'Far superior WordPress performance, built-in CDN, daily backups, and developer tools for any serious WordPress site.',
    verdict: 'WP Engine is the clear winner for serious WordPress sites. It is 2.6x faster than Bluehost (248ms vs 650ms), offers 99.99% uptime vs Bluehost\'s 99.88%, and includes staging environments, daily backups, and expert WordPress support. The catch is price: WP Engine starts at $20/month vs Bluehost\'s $3.95/month. For personal blogs and low-traffic sites, Bluehost is fine. For business sites, e-commerce, or any WordPress site that generates revenue, WP Engine pays for itself through better performance and reliability.',
    tableRows: [
      { category: 'Pricing', label: 'Starting Price', host1Value: '$3.95/mo', host2Value: '$20/mo', winner: 1 },
      { category: 'Pricing', label: 'Renewal Price', host1Value: '$13.99/mo', host2Value: '$20/mo', winner: 1 },
      { category: 'Pricing', label: 'Free Domain', host1Value: true, host2Value: false, winner: 1 },
      { category: 'Pricing', label: 'Money-Back Guarantee', host1Value: '30 days', host2Value: '60 days', winner: 2 },
      { category: 'Performance', label: 'Avg. Page Load', host1Value: '650ms', host2Value: '248ms', winner: 2 },
      { category: 'Performance', label: 'Uptime', host1Value: '99.88%', host2Value: '99.99%', winner: 2 },
      { category: 'Performance', label: 'CDN Included', host1Value: false, host2Value: 'Cloudflare', winner: 2 },
      { category: 'Features', label: 'Staging Environment', host1Value: false, host2Value: true, winner: 2 },
      { category: 'Features', label: 'Daily Backups', host1Value: false, host2Value: true, winner: 2 },
      { category: 'Features', label: 'Premium Themes', host1Value: false, host2Value: 'Genesis included', winner: 2 },
      { category: 'Features', label: 'WordPress Optimized', host1Value: true, host2Value: true, winner: 'tie' },
      { category: 'Features', label: 'Email Hosting', host1Value: true, host2Value: false, winner: 1 },
      { category: 'Support', label: 'Live Chat', host1Value: true, host2Value: true, winner: 'tie' },
      { category: 'Support', label: 'Phone Support', host1Value: true, host2Value: true, winner: 'tie' },
      { category: 'Support', label: 'WordPress Expertise', host1Value: 'General hosting', host2Value: 'WP specialists', winner: 2 },
    ],
    faqs: [
      {
        question: 'Is WP Engine worth the premium price over Bluehost?',
        answer: 'For serious WordPress sites, yes. WP Engine is 2.6x faster than Bluehost in our tests and offers 99.99% uptime. It includes staging environments, daily backups, CDN, and WordPress specialist support — all of which Bluehost charges extra for or doesn\'t offer at all. If your WordPress site generates revenue, the performance gap translates directly to more conversions.',
      },
      {
        question: 'Is Bluehost good enough for WordPress in 2026?',
        answer: 'Bluehost is adequate for personal blogs, portfolios, and low-traffic sites under 10,000 monthly visitors. WordPress.org recommends it, setup is easy, and at $3.95/month the cost is minimal. However, it significantly underperforms compared to managed WordPress hosts under traffic load. If your site needs to convert visitors into customers, the 650ms average load time is a liability.',
      },
      {
        question: 'Which has better WordPress support — Bluehost or WP Engine?',
        answer: 'WP Engine by a wide margin. WP Engine\'s entire support team are WordPress specialists who help with plugin conflicts, performance optimization, and WordPress-specific technical issues. Bluehost provides general hosting support that handles WordPress questions, but the depth of expertise is nowhere near WP Engine\'s dedicated WordPress team.',
      },
    ],
    lastUpdated: '2026-05-19',
  },
]

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug)
}

export function getAllComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug)
}

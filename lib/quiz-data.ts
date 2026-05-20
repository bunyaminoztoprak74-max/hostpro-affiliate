export type WebsiteType = 'blog' | 'business' | 'ecommerce' | 'portfolio' | 'agency'
export type BudgetRange = 'budget' | 'low' | 'mid' | 'premium'
export type TrafficLevel = 'new_site' | 'small' | 'medium' | 'large'
export type TechLevel = 'beginner' | 'intermediate' | 'developer'
export type Priority = 'speed' | 'price' | 'support' | 'features'

export interface QuizAnswers {
  websiteType: WebsiteType | null
  budget: BudgetRange | null
  traffic: TrafficLevel | null
  techLevel: TechLevel | null
  priority: Priority | null
}

export interface HostProfile {
  id: string
  name: string
  emoji: string
  tagline: string
  price: string
  affiliateUrl: string
  badge: string
  badgeColor: string
  gradient: string
  rating: number
  uptime: string
  speed: string
  support: string
  scores: {
    websiteType: Record<WebsiteType, number>
    budget: Record<BudgetRange, number>
    traffic: Record<TrafficLevel, number>
    techLevel: Record<TechLevel, number>
    priority: Record<Priority, number>
  }
  reasonMap: {
    websiteType: Record<WebsiteType, string>
    budget: Record<BudgetRange, string>
    traffic: Record<TrafficLevel, string>
    techLevel: Record<TechLevel, string>
    priority: Record<Priority, string>
  }
}

export const hostProfiles: HostProfile[] = [
  {
    id: 'hostinger',
    name: 'Hostinger',
    emoji: '🚀',
    tagline: 'Best value for money',
    price: '$2.99/mo',
    affiliateUrl: 'https://www.hostinger.com/web-hosting?REFERRALCODE=OFMBZTOPRZSU',
    badge: '#1 Budget Pick',
    badgeColor: 'bg-yellow-400 text-yellow-900',
    gradient: 'from-indigo-500 to-purple-600',
    rating: 4.8,
    uptime: '99.93%',
    speed: '400ms avg',
    support: '24/7 Live Chat',
    scores: {
      websiteType: { blog: 9, business: 7, ecommerce: 6, portfolio: 9, agency: 5 },
      budget: { budget: 10, low: 9, mid: 5, premium: 2 },
      traffic: { new_site: 10, small: 9, medium: 6, large: 2 },
      techLevel: { beginner: 10, intermediate: 8, developer: 5 },
      priority: { speed: 7, price: 10, support: 7, features: 6 },
    },
    reasonMap: {
      websiteType: {
        blog: 'NVMe SSD and LiteSpeed servers keep your blog loading fast — ideal for growing your readership.',
        business: 'Reliable shared hosting with strong uptime and hPanel makes managing a business site effortless.',
        ecommerce: 'Handles lightweight WooCommerce stores well, though high-volume shops should consider cloud hosting.',
        portfolio: 'Fast, affordable, and simple — everything a portfolio needs without paying for resources you won\'t use.',
        agency: 'Premium plans support 100+ sites, making it workable for small agencies with budget-conscious clients.',
      },
      budget: {
        budget: 'At $2.99/mo, Hostinger delivers NVMe SSD speed and a free domain — unmatched value at this price.',
        low: 'Premium plans at $3.99/mo include 100 GB NVMe, a free domain, and 100 websites — excellent ROI.',
        mid: 'Hostinger Cloud plans in this range offer dedicated resources and significantly better performance.',
        premium: 'At higher budgets, managed cloud providers like Cloudways offer better scalability and infrastructure.',
      },
      traffic: {
        new_site: 'New sites get a free domain, SSL, and fast NVMe storage — everything you need to launch confidently.',
        small: 'Handles up to 10K monthly visitors comfortably with consistent 99.93% uptime and fast response times.',
        medium: 'Consider Hostinger Cloud or upgrading to managed hosting for reliable performance at this traffic level.',
        large: 'At 100K+ visitors, managed cloud hosting like Cloudways will serve you significantly better.',
      },
      techLevel: {
        beginner: 'hPanel is among the most intuitive control panels available — set up WordPress in under 5 minutes.',
        intermediate: 'SSH access, Git integration, and staging on higher plans give intermediate users real control.',
        developer: 'Limited compared to full cloud platforms — Cloudways is the better fit if you need infrastructure control.',
      },
      priority: {
        speed: 'NVMe SSD and LiteSpeed servers deliver 382ms average load times — fast for any shared hosting plan.',
        price: 'Best price-to-performance ratio of any web host we\'ve tested at any budget level.',
        support: '24/7 live chat covers most issues quickly, though premium managed hosts offer deeper expertise.',
        features: 'Free domain, SSL, AI website builder, and weekly backups — a strong feature set at the price.',
      },
    },
  },
  {
    id: 'bluehost',
    name: 'Bluehost',
    emoji: '🌐',
    tagline: 'WordPress official recommendation',
    price: '$3.95/mo',
    affiliateUrl: 'https://www.bluehost.com',
    badge: 'WP Recommended',
    badgeColor: 'bg-blue-100 text-blue-700',
    gradient: 'from-blue-500 to-cyan-500',
    rating: 4.5,
    uptime: '99.88%',
    speed: '650ms avg',
    support: '24/7 Live Chat + Phone',
    scores: {
      websiteType: { blog: 8, business: 7, ecommerce: 6, portfolio: 7, agency: 5 },
      budget: { budget: 7, low: 8, mid: 5, premium: 2 },
      traffic: { new_site: 9, small: 8, medium: 5, large: 2 },
      techLevel: { beginner: 9, intermediate: 7, developer: 4 },
      priority: { speed: 5, price: 7, support: 8, features: 6 },
    },
    reasonMap: {
      websiteType: {
        blog: 'WordPress.org\'s official recommended host — a trusted, proven choice for WordPress bloggers.',
        business: '1-click WordPress and a free domain make launching a professional business site fast and simple.',
        ecommerce: 'WooCommerce-ready with WordPress support, though performance can be inconsistent under traffic.',
        portfolio: 'Thousands of WordPress themes and simple setup make Bluehost solid for portfolio sites.',
        agency: 'Adequate for small agencies, though managing large client portfolios may require a cloud solution.',
      },
      budget: {
        budget: 'Competitive intro pricing, though Hostinger provides better value with faster NVMe storage.',
        low: 'Solid value at $3.95/mo — includes a free domain, SSL, and reliable WordPress hosting.',
        mid: 'Pro plans add more performance, though managed cloud hosts give better ROI at this range.',
        premium: 'Higher budgets are better invested in managed WordPress hosting like WP Engine.',
      },
      traffic: {
        new_site: 'Easy WordPress setup and reliable uptime make it ideal for new site owners with no experience.',
        small: 'Handles up to 10K visitors reliably with 99.9% uptime and solid WordPress compatibility.',
        medium: 'May struggle under sustained traffic — managed WordPress hosting is safer at this scale.',
        large: 'Not recommended for 100K+ monthly visitors without significant caching and CDN setup.',
      },
      techLevel: {
        beginner: 'cPanel and 1-click WordPress make Bluehost approachable for users who\'ve never hosted a site before.',
        intermediate: 'Offers enough control for intermediate users without overwhelming complexity or server management.',
        developer: 'Limited developer tooling — Cloudways or WP Engine better support developer-focused workflows.',
      },
      priority: {
        speed: 'Average 650ms load times are acceptable but noticeably slower than NVMe or cloud-based hosts.',
        price: 'Competitive intro pricing — just factor in the renewal rate jump before committing long-term.',
        support: '24/7 phone and live chat support is a genuine advantage, especially for non-technical users.',
        features: 'Free domain, SSL, and CodeGuard basic backup provide a solid baseline feature set.',
      },
    },
  },
  {
    id: 'cloudways',
    name: 'Cloudways',
    emoji: '☁️',
    tagline: 'Best managed cloud hosting',
    price: '$11/mo',
    affiliateUrl: 'https://www.cloudways.com/en/?id=2170350',
    badge: 'Cloud Pick',
    badgeColor: 'bg-teal-100 text-teal-700',
    gradient: 'from-teal-500 to-cyan-600',
    rating: 4.7,
    uptime: '99.97%',
    speed: '300ms avg',
    support: '24/7 Live Chat + Phone',
    scores: {
      websiteType: { blog: 6, business: 8, ecommerce: 9, portfolio: 5, agency: 10 },
      budget: { budget: 1, low: 4, mid: 9, premium: 9 },
      traffic: { new_site: 4, small: 6, medium: 9, large: 10 },
      techLevel: { beginner: 3, intermediate: 8, developer: 10 },
      priority: { speed: 9, price: 4, support: 9, features: 9 },
    },
    reasonMap: {
      websiteType: {
        blog: 'More infrastructure than most blogs need, but the right move if you\'re expecting significant traffic growth.',
        business: 'Managed cloud infrastructure ensures your business site is always fast, always available, and scales on demand.',
        ecommerce: 'Cloud infrastructure handles traffic spikes without throttling — critical for e-commerce revenue protection.',
        portfolio: 'More than a portfolio typically needs — Hostinger delivers better value for low-traffic showcase sites.',
        agency: 'The agency standard — team tools, staging, multi-cloud choice, and scalable resources per client.',
      },
      budget: {
        budget: 'Cloudways starts at $11/mo, above this range. Hostinger is the right pick at this budget.',
        low: 'Slightly above this range, though the pay-as-you-go model lets you start at the minimum server size.',
        mid: 'This is Cloudways\' sweet spot — enterprise cloud infrastructure at a fraction of enterprise pricing.',
        premium: 'Excellent value at higher budgets — choose AWS or GCP for mission-critical performance at scale.',
      },
      traffic: {
        new_site: 'More infrastructure than a new site needs — start with shared hosting and migrate when traffic grows.',
        small: 'Can handle this comfortably, though shared hosting is more cost-effective at under 10K visitors.',
        medium: 'This is where Cloudways earns its reputation — scale CPU and RAM instantly as traffic grows.',
        large: 'Built for exactly this scale — choose AWS or Google Cloud as your underlying provider for maximum reliability.',
      },
      techLevel: {
        beginner: 'Cloudways has a steeper learning curve than shared hosting — Hostinger is a better fit for beginners.',
        intermediate: 'Intermediate users appreciate cloud control without needing to manage Linux servers directly.',
        developer: 'Full SSH access, staging environments, and your choice of AWS, GCP, or DigitalOcean infrastructure.',
      },
      priority: {
        speed: 'Free Cloudflare Enterprise CDN is included — a feature that competitors charge hundreds per month for.',
        price: 'Pay-as-you-go provides cost efficiency at scale, but shared hosting is cheaper for low-traffic sites.',
        support: '24/7 expert support with sub-1-minute average response times via live chat.',
        features: 'Staging environments, team collaboration, automated backups, and multi-cloud infrastructure choice.',
      },
    },
  },
  {
    id: 'wpengine',
    name: 'WP Engine',
    emoji: '⚡',
    tagline: 'Premium managed WordPress',
    price: '$20/mo',
    affiliateUrl: 'https://wpengine.com',
    badge: 'Premium WP',
    badgeColor: 'bg-purple-100 text-purple-700',
    gradient: 'from-pink-500 to-rose-500',
    rating: 4.7,
    uptime: '99.99%',
    speed: '250ms avg',
    support: '24/7 Live Chat + Phone',
    scores: {
      websiteType: { blog: 7, business: 8, ecommerce: 9, portfolio: 5, agency: 9 },
      budget: { budget: 0, low: 1, mid: 6, premium: 10 },
      traffic: { new_site: 3, small: 5, medium: 8, large: 10 },
      techLevel: { beginner: 4, intermediate: 7, developer: 9 },
      priority: { speed: 10, price: 1, support: 10, features: 10 },
    },
    reasonMap: {
      websiteType: {
        blog: 'Premium WordPress performance for serious bloggers who can\'t afford downtime or slow load times.',
        business: 'Enterprise-grade reliability with 99.99% uptime — your business site will never let visitors down.',
        ecommerce: 'Mission-critical performance for e-commerce — every 100ms faster directly improves conversion rates.',
        portfolio: 'Significantly more than a portfolio needs — Hostinger is a better value choice for showcases.',
        agency: 'Industry standard for WordPress agencies — Genesis themes, staging, and scalable site management.',
      },
      budget: {
        budget: 'WP Engine starts at $20/mo, well above this range. Hostinger is the correct pick here.',
        low: 'WP Engine is outside this budget. Consider Bluehost for solid, affordable WordPress hosting.',
        mid: 'Entry-level WP Engine is reachable at the top of this range — worth it for serious WordPress sites.',
        premium: 'WP Engine is the premium investment that earns its cost through performance and conversion improvements.',
      },
      traffic: {
        new_site: 'Premium infrastructure for a new site — cost-effective alternatives exist while traffic is still low.',
        small: 'Delivers elite performance at this level, though managed cloud offers similar speed at lower cost.',
        medium: 'WP Engine handles this traffic comfortably with outstanding speed and 99.99% uptime.',
        large: 'Purpose-built for high-traffic scale — the platform that major WordPress publishers rely on.',
      },
      techLevel: {
        beginner: 'Managed hosting eliminates server work, but the price is high for users just getting started.',
        intermediate: 'Good balance — powerful WordPress tools without requiring server administration knowledge.',
        developer: 'Git push deployment, staging environments, and PHP version control built into every plan.',
      },
      priority: {
        speed: '248ms average load time — the fastest managed WordPress host in our 6-month independent testing.',
        price: 'Premium at $20/mo, but the ROI in speed, uptime, and reduced developer time justifies it.',
        support: 'WordPress-specialist support team available 24/7 — expert help, not generic hosting agents.',
        features: 'Genesis themes, staging, daily backups, CDN, and developer tools all included in every plan.',
      },
    },
  },
]

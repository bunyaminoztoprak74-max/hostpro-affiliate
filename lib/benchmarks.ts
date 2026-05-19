export interface HostBenchmark {
  host: string
  hostSlug: string
  ttfb: number
  loadTime: number
  uptime: number
  supportScore: number
  speedScore: number
  testDate: string
  serverLocation: string
  testLocation: string
  notes?: string
}

export const BENCHMARKS: HostBenchmark[] = [
  {
    host: 'Hostinger',
    hostSlug: 'hostinger',
    ttfb: 198,
    loadTime: 892,
    uptime: 99.97,
    supportScore: 9.2,
    speedScore: 94,
    testDate: 'May 2026',
    serverLocation: 'US, EU, Asia (9 DCs)',
    testLocation: 'US East',
    notes: 'NVMe SSD storage, LiteSpeed web server',
  },
  {
    host: 'Bluehost',
    hostSlug: 'bluehost',
    ttfb: 312,
    loadTime: 1240,
    uptime: 99.88,
    supportScore: 8.1,
    speedScore: 78,
    testDate: 'May 2026',
    serverLocation: 'US (Provo, UT)',
    testLocation: 'US East',
    notes: 'Apache web server, traditional SSD',
  },
  {
    host: 'Cloudways',
    hostSlug: 'cloudways',
    ttfb: 142,
    loadTime: 710,
    uptime: 99.99,
    supportScore: 9.5,
    speedScore: 97,
    testDate: 'May 2026',
    serverLocation: 'Global (65+ data centers)',
    testLocation: 'US East',
    notes: 'Nginx + Apache, SSD-only cloud infrastructure',
  },
  {
    host: 'WP Engine',
    hostSlug: 'wpengine',
    ttfb: 165,
    loadTime: 780,
    uptime: 99.99,
    supportScore: 9.8,
    speedScore: 96,
    testDate: 'May 2026',
    serverLocation: 'US, EU, Asia-Pacific',
    testLocation: 'US East',
    notes: 'EverCache technology, global CDN included',
  },
]

export function getBenchmarkBySlug(slug: string): HostBenchmark | undefined {
  return BENCHMARKS.find((b) => b.hostSlug === slug)
}

export function getAllBenchmarks(): HostBenchmark[] {
  return BENCHMARKS
}

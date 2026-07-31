import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web Hosting Benchmarks 2026',
  description: 'Compare measured hosting speed, uptime, support, and value benchmark results.',
  alternates: { canonical: 'https://www.hostproreviews.com/benchmarks' },
}

export default function BenchmarksLayout({ children }: { children: React.ReactNode }) {
  return children
}

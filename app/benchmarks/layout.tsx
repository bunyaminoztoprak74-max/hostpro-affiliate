import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Archived Hosting Benchmark Reference',
  description: 'An archived editorial reference that is not currently maintained as a live benchmark.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.hostproreviews.com/benchmarks' },
}

export default function BenchmarksLayout({ children }: { children: React.ReactNode }) {
  return children
}

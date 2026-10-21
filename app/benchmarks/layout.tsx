import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web Hosting Performance Benchmarks: Sources & How to Check (2026)',
  description: 'Where to find independent hosting speed and uptime benchmarks, and how to evaluate a host yourself. HostPro Reviews does not publish its own lab test numbers.',
  alternates: { canonical: 'https://www.hostproreviews.com/benchmarks' },
}

export default function BenchmarksLayout({ children }: { children: React.ReactNode }) {
  return children
}

import type { ComparisonHost } from '@/lib/comparisons'

interface Props {
  host: ComparisonHost
}

export default function ProsConsCard({ host }: Props) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl">{host.emoji}</span>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{host.name}</h3>
          <p className="text-gray-500 text-sm">{host.tagline}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Pros */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <h4 className="font-semibold text-green-800 text-xs uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <span className="text-green-600">✓</span> What We Like
          </h4>
          <ul className="space-y-2.5">
            {host.pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-green-800">
                <span className="text-green-500 font-bold mt-0.5 flex-shrink-0 text-base leading-none">+</span>
                <span className="leading-snug">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <h4 className="font-semibold text-red-800 text-xs uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <span className="text-red-500">✗</span> What We Don&apos;t Like
          </h4>
          <ul className="space-y-2.5">
            {host.cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-red-800">
                <span className="text-red-400 font-bold mt-0.5 flex-shrink-0 text-base leading-none">−</span>
                <span className="leading-snug">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

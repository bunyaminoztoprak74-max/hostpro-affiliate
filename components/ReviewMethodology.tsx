export default function ReviewMethodology() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 my-8">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🔬</span>
        <div>
          <h3 className="font-bold text-gray-900 mb-2 text-base">How We Evaluate Web Hosting</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Our hosting reviews are editorial evaluations based on each provider&apos;s published plans, pricing,
            documentation, and policies, plus attributed third-party benchmarks where we cite them. We do not
            publish our own speed or uptime test results. Ratings are editorial opinions, not customer or lab scores.
            Some links are affiliate links; see our disclosure.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: '📋', label: 'Plans', detail: 'Published features' },
              { icon: '💰', label: 'Pricing', detail: 'Intro + renewal' },
              { icon: '💬', label: 'Support', detail: 'Stated channels' },
              { icon: '📚', label: 'Sources', detail: 'Cited when used' },
            ].map(({ icon, label, detail }) => (
              <div key={label} className="bg-white rounded-xl p-3 text-center border border-blue-100">
                <div className="text-xl mb-1">{icon}</div>
                <div className="text-xs font-bold text-gray-900">{label}</div>
                <div className="text-xs text-gray-400">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

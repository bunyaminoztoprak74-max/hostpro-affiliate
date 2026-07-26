export default function ReviewMethodology() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 my-8">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🔬</span>
        <div>
          <h3 className="font-bold text-gray-900 mb-2 text-base">How We Test Web Hosting</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            We compare official plan documentation, current checkout terms, renewal pricing,
            support policies, and independently published performance evidence. A page describes
            hands-on testing only when the setup, date, plan, and reproducible evidence are documented.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: '📡', label: 'Reliability', detail: 'SLA + evidence' },
              { icon: '⚡', label: 'Performance', detail: 'Source + method' },
              { icon: '💬', label: 'Support', detail: 'Published terms' },
              { icon: '💰', label: 'Pricing', detail: 'Intro + renewal' },
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

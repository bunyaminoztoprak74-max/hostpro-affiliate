interface HostingCardProps {
  name: string
  tagline: string
  price: string
  rating: number
  badge?: string
  badgeColor?: string
  gradient: string
  features: string[]
  affiliateUrl: string
  emoji: string
}

export default function HostingCard({
  name, tagline, price, rating, badge, badgeColor,
  gradient, features, affiliateUrl, emoji
}: HostingCardProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(rating))

  return (
    <div className="card overflow-hidden group hover:-translate-y-1 transition-all duration-300">
      {/* Gradient Header */}
      <div className={`${gradient} p-6 text-white relative overflow-hidden`}>
        {badge && (
          <span className={`absolute top-3 right-3 badge ${badgeColor} text-xs`}>
            {badge}
          </span>
        )}
        <div className="text-4xl mb-2">{emoji}</div>
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-white/80 text-sm mt-1">{tagline}</p>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {stars.map((filled, i) => (
            <svg key={i} className={`w-4 h-4 ${filled ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm font-semibold text-gray-700 ml-1">{rating}/5</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-500 text-sm">/month</span>
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-5">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full text-center btn-primary justify-center"
        >
          Get Started →
        </a>
      </div>
    </div>
  )
}


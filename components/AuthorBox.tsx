import Link from 'next/link'

interface AuthorBoxProps {
  name?: string
  slug?: string
  bio?: string
  role?: string
}

export default function AuthorBox({
  name = 'HostPro Editorial Team',
  slug,
  bio = 'We test web hosting providers with real websites, uptime monitoring, and live support chats. Every review is based on measurable data — not marketing claims.',
  role = 'Hosting Analyst',
}: AuthorBoxProps) {
  return (
    <div className="flex items-start gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5 mt-10">
      {/* Avatar */}
      <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white font-extrabold text-xl flex-shrink-0">
        {name.charAt(0)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          {slug ? (
            <Link href={`/author/${slug}`} className="font-bold text-gray-900 hover:text-indigo-600 transition-colors">
              {name}
            </Link>
          ) : (
            <span className="font-bold text-gray-900">{name}</span>
          )}
          <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full">
            {role}
          </span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">{bio}</p>
        {slug && (
          <Link href={`/author/${slug}`} className="text-xs text-indigo-600 hover:underline mt-1 inline-block">
            View all articles →
          </Link>
        )}
      </div>
    </div>
  )
}

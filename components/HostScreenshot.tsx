'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Props {
  hostSlug: string
  hostName: string
  caption?: string
  width?: number
  height?: number
  priority?: boolean
}

const HOST_COLORS: Record<string, string> = {
  hostinger: 'from-indigo-500 to-purple-600',
  bluehost: 'from-blue-500 to-cyan-500',
  cloudways: 'from-teal-500 to-cyan-600',
  wpengine: 'from-pink-500 to-rose-500',
  siteground: 'from-orange-400 to-red-500',
  dreamhost: 'from-sky-400 to-blue-500',
  godaddy: 'from-green-500 to-emerald-600',
  hostgator: 'from-yellow-400 to-orange-500',
  kinsta: 'from-pink-500 to-fuchsia-600',
  namecheap: 'from-orange-500 to-yellow-500',
  a2hosting: 'from-red-500 to-rose-600',
}

function Placeholder({ hostName, hostSlug }: { hostName: string; hostSlug: string }) {
  const gradient = HOST_COLORS[hostSlug] ?? 'from-indigo-500 to-purple-600'
  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${gradient} text-white`}>
      <span className="text-5xl mb-2 opacity-80 select-none">🖥️</span>
      <span className="text-sm font-bold opacity-90">{hostName}</span>
      <span className="text-xs opacity-60 mt-1 select-none">Dashboard Preview</span>
    </div>
  )
}

export default function HostScreenshot({
  hostSlug,
  hostName,
  caption,
  width = 400,
  height = 300,
  priority = false,
}: Props) {
  const [imgError, setImgError] = useState(false)
  const screenshotSrc = `/screenshots/${hostSlug}-dashboard.webp`

  return (
    <figure className="my-6 not-prose inline-block">
      <div
        className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100"
        style={{ width, height }}
      >
        <Placeholder hostName={hostName} hostSlug={hostSlug} />
        {!imgError && (
          <Image
            src={screenshotSrc}
            alt={`${hostName} dashboard screenshot`}
            width={width}
            height={height}
            priority={priority}
            className="absolute inset-0 object-cover w-full h-full"
            onError={() => setImgError(true)}
            unoptimized
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-gray-500 text-center max-w-full" style={{ width }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

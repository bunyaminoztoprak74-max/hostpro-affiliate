'use client'

import { useEffect, useState } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
}

export default function TableOfContents({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (items.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-10% 0% -80% 0%' }
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="bg-gray-50 border border-gray-200 rounded-xl p-5">
      <h3 className="font-semibold text-gray-900 text-xs uppercase tracking-widest mb-3">
        Table of Contents
      </h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
            <a
              href={`#${item.id}`}
              className={`text-sm block py-1 leading-snug transition-colors ${
                activeId === item.id
                  ? 'text-indigo-600 font-semibold'
                  : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              {item.level === 3 && (
                <span className="text-gray-300 mr-1">›</span>
              )}
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

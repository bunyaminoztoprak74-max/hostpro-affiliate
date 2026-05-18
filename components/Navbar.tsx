'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">HostPro<span className="text-indigo-600">Reviews</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
            <Link href="/blog" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Reviews</Link>
            <Link href="/blog?cat=comparison" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Compare</Link>
            <Link href="/blog?cat=tutorial" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Tutorials</Link>
            <a
              href="https://www.hostinger.com/web-hosting?REFERRALCODE=OFMBZTOPRZSU"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="btn-primary text-sm py-2 px-4"
            >
              Best Deal ⚡
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-3 py-2 text-gray-600 hover:text-indigo-600 font-medium">Home</Link>
            <Link href="/blog" className="block px-3 py-2 text-gray-600 hover:text-indigo-600 font-medium">Reviews</Link>
            <Link href="/blog?cat=comparison" className="block px-3 py-2 text-gray-600 hover:text-indigo-600 font-medium">Compare</Link>
            <Link href="/blog?cat=tutorial" className="block px-3 py-2 text-gray-600 hover:text-indigo-600 font-medium">Tutorials</Link>
            <a
              href="https://www.hostinger.com/web-hosting?REFERRALCODE=OFMBZTOPRZSU"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block btn-primary text-sm text-center"
            >
              Best Deal ⚡
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}


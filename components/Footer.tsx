import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="font-bold text-white text-lg">HostPro<span className="text-indigo-400">Reviews</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Independent web hosting reviews and comparisons to help you make the right choice for your website.
            </p>
            <p className="text-xs mt-4 text-gray-600">
              * This site contains affiliate links. We may earn a commission when you purchase through our links, at no extra cost to you.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Reviews</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/best-web-hosting-2026" className="hover:text-white transition-colors">Best Hosting 2026</Link></li>
              <li><Link href="/blog/hostinger-vs-bluehost" className="hover:text-white transition-colors">Hostinger vs Bluehost</Link></li>
              <li><Link href="/blog/how-to-start-a-blog" className="hover:text-white transition-colors">How to Start a Blog</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">All Reviews</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Top Picks</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.hostinger.com/web-hosting?REFERRALCODE=OFMBZTOPRZSU" target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white transition-colors">
                  Hostinger →
                </a>
              </li>
              <li>
                <a href="https://www.bluehost.com" target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white transition-colors">
                  Bluehost →
                </a>
              </li>
              <li>
                <a href="https://wpengine.com" target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white transition-colors">
                  WP Engine →
                </a>
              </li>
              <li>
                <a href="https://www.cloudways.com/en/?id=2170350" target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white transition-colors">
                  Cloudways →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} HostProReviews. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


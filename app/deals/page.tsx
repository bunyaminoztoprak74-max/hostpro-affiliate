import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Exclusive Cloud VPS, Automated Bot Servers & Security Deals 2026 | HostProReviews',
  description:
    'Verified discounts on ultra-low-latency NVMe Cloud VPS hosting, encrypted password vaults, and Swiss privacy suites for AI agents and trading bots.',
  alternates: {
    canonical: 'https://www.hostproreviews.com/deals',
  },
};

const INFRA_DEALS = [
  {
    badge: '⚡ #1 FOR AI AGENTS & TRADING BOTS',
    title: 'Hostinger NVMe Cloud & KVM VPS — Up to 75% Off + Free Domain',
    partner: 'Hostinger Official Partner',
    highlight: 'From $2.99/mo (Web) & $4.99/mo (KVM NVMe VPS)',
    description:
      'Deploy 24/7 Python automation scripts, n8n workflows, and low-latency trading terminals on enterprise AMD EPYC NVMe servers.',
    ctaText: 'Claim 75% Off Hostinger VPS →',
    href: '/vps',
    btnClass: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
  },
  {
    badge: '🔐 ZERO-KNOWLEDGE KEY & RECOVERY VAULT',
    title: 'NordPass Business & Premium — Save 56% + 3 Months Free',
    partner: 'Nord Security Official',
    highlight: 'XChaCha20 Encryption for API Keys & Seed Phrases',
    description:
      'Protect your API tokens, SSH credentials, and cold-storage recovery phrases across all devices with biometric zero-knowledge encryption.',
    ctaText: 'Unlock NordPass Vault Deal →',
    href: '/vault',
    btnClass: 'bg-amber-500 hover:bg-amber-400 text-slate-950',
  },
  {
    badge: '🇨🇭 SWISS PRIVACY & ENCRYPTED ECOSYSTEM',
    title: 'Proton Unlimited & Pass — Swiss Offshore Data Protection',
    partner: 'Proton AG Geneva',
    highlight: 'Protected by Strict Swiss Federal Privacy Laws',
    description:
      'End-to-end encrypted email, calendar, drive, VPN, and password manager engineered in Switzerland for founders and investors.',
    ctaText: 'Get Proton Swiss Privacy Deal →',
    href: '/proton',
    btnClass: 'bg-indigo-500 hover:bg-indigo-400 text-white',
  },
];

export default function HostProDealsHubPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Synthetica Code &amp; Agentic Wealth Official Infrastructure Hub
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Cloud VPS, AI Server &amp; Security Deals
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            Tested server infrastructure and encrypted security vaults used in our automated deployments.
          </p>
        </div>

        <div className="space-y-6">
          {INFRA_DEALS.map((deal) => (
            <div
              key={deal.href}
              className="rounded-2xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {deal.badge}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">{deal.title}</h2>
                  <p className="text-sm text-slate-300 leading-relaxed">{deal.description}</p>
                  <div className="pt-1 text-xs font-semibold text-amber-300">
                    ✅ {deal.partner} &bull; {deal.highlight}
                  </div>
                </div>
                <div className="md:flex-shrink-0">
                  <a
                    href={deal.href}
                    target="_blank"
                    rel="nofollow noopener sponsored"
                    className={`block w-full md:w-auto text-center font-extrabold text-sm md:text-base px-6 py-4 rounded-xl shadow-lg transition transform hover:scale-105 ${deal.btnClass}`}
                  >
                    {deal.ctaText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-slate-400 space-y-2">
          <p>
            Direct Shortlinks: <code className="text-emerald-300">hostproreviews.com/vps</code> &bull;{' '}
            <code className="text-amber-300">hostproreviews.com/vault</code> &bull;{' '}
            <code className="text-indigo-300">hostproreviews.com/proton</code>
          </p>
          <p>
            <Link href="/disclosure" className="underline hover:text-white">
              Affiliate Disclosure
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

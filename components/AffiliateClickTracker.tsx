'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const CJ_HOSTS = new Set([
  'www.anrdoezrs.net',
  'www.dpbolvw.net',
  'www.jdoqocy.com',
  'www.kqzyfj.com',
  'www.tkqlhce.com',
])

const CJ_PARTNERS: Record<string, string> = {
  '13756265': 'NordVPN',
  '13796481': 'Contabo',
  '13942202': 'Sucuri',
  '13288049': 'The SSL Store',
  '15564479': 'MiniTool',
  '15831601': 'Proton Pass',
  '15834536': 'Proton VPN',
  '17168804': 'AOMEI Backupper',
  '15273272': 'NordPass',
  '15402688': 'Abelssoft',
  '15438547': 'Surfshark',
  '15733311': 'System Mechanic',
  '17235979': 'GearUP Booster',
  '17254962': 'CorelDRAW',
}

function affiliateDetails(url: URL) {
  if (CJ_HOSTS.has(url.hostname)) {
    const match = url.pathname.match(/\/click-\d+-(\d+)/)
    const linkId = match?.[1] ?? 'unknown'
    return {
      network: 'CJ',
      partner: CJ_PARTNERS[linkId] ?? 'CJ advertiser',
      linkId,
      sid: url.searchParams.get('sid') ?? 'not_set',
    }
  }

  if (url.hostname.endsWith('hostinger.com') && url.searchParams.has('REFERRALCODE')) {
    return { network: 'Direct', partner: 'Hostinger', linkId: 'OFMBZTOPRZSU', sid: 'not_set' }
  }

  if (url.hostname.endsWith('cloudways.com') && url.searchParams.get('id') === '2170350') {
    return { network: 'Direct', partner: 'Cloudways', linkId: '2170350', sid: 'not_set' }
  }

  if (url.hostname.endsWith('siteground.com') && url.pathname.startsWith('/go/')) {
    return { network: 'Direct', partner: 'SiteGround', linkId: url.pathname.slice(4), sid: 'not_set' }
  }

  if (url.hostname.endsWith('wpengine.com') && url.searchParams.has('via')) {
    return { network: 'Direct', partner: 'WP Engine', linkId: url.searchParams.get('via') ?? 'unknown', sid: 'not_set' }
  }

  return null
}

export default function AffiliateClickTracker() {
  useEffect(() => {
    const trackClick = (event: MouseEvent) => {
      const element = event.target
      if (!(element instanceof Element)) return

      const anchor = element.closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement)) return

      let url: URL
      try {
        url = new URL(anchor.href)
      } catch {
        return
      }

      const affiliate = affiliateDetails(url)
      if (!affiliate || typeof window.gtag !== 'function') return

      window.gtag('event', 'affiliate_click', {
        affiliate_network: affiliate.network,
        affiliate_partner: affiliate.partner,
        affiliate_link_id: affiliate.linkId,
        affiliate_sid: affiliate.sid,
        link_url: url.href,
        link_text: (anchor.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 100),
        page_path: window.location.pathname,
        transport_type: 'beacon',
      })
    }

    document.addEventListener('click', trackClick, true)
    return () => document.removeEventListener('click', trackClick, true)
  }, [])

  return null
}

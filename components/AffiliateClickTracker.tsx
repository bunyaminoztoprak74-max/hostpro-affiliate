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
  '12589508': 'Dynadot',
  '12644849': 'Paragon Backup & Recovery',
  '13756265': 'NordVPN',
  '13796481': 'Contabo',
  '13942202': 'Sucuri',
  '13288049': 'The SSL Store',
  '15564479': 'MiniTool',
  '15831601': 'Proton Pass',
  '15834536': 'Proton VPN',
  '17168804': 'AOMEI Backupper',
  '14380008': 'Ashampoo Office',
  '15178367': 'iubenda',
  '15734925': 'DirectDeals',
  '17175455': 'Drecov',
  '17226848': 'Hostinger',
  '15748555': 'Hostinger WordPress',
  '15753162': 'Hostinger WooCommerce',
  '15273272': 'NordPass',
  '15402688': 'Abelssoft',
  '15438547': 'Surfshark',
  '15733311': 'System Mechanic',
  '17235979': 'GearUP Booster',
  '17254962': 'CorelDRAW',
}

const HOSTINGER_CJ_LINKS = {
  general: 'https://www.dpbolvw.net/click-101761537-17226848-1767728255000',
  wordpress: 'https://www.anrdoezrs.net/click-101761537-15748555-1747102455000',
  ecommerce: 'https://www.kqzyfj.com/click-101761537-15753162-1747102516000',
}

function hostingerCjUrl(pagePath: string, position: number) {
  const normalized = pagePath.toLowerCase()
  const base =
    normalized.includes('woocommerce') || normalized.includes('ecommerce')
      ? HOSTINGER_CJ_LINKS.ecommerce
      : normalized.includes('wordpress')
        ? HOSTINGER_CJ_LINKS.wordpress
        : HOSTINGER_CJ_LINKS.general
  const slug = normalized.split('/').filter(Boolean).join('-') || 'homepage'
  return `${base}?sid=${encodeURIComponent(`${slug}-hostinger-${position + 1}`)}`
}

function rewriteLegacyHostingerLinks(root: ParentNode) {
  const anchors = root.querySelectorAll<HTMLAnchorElement>('a[href*="hostinger.com"]')
  anchors.forEach((anchor, index) => {
    try {
      const url = new URL(anchor.href)
      if (!url.hostname.endsWith('hostinger.com') || !url.searchParams.has('REFERRALCODE')) return
      anchor.href = hostingerCjUrl(window.location.pathname, index)
      anchor.rel = 'noopener noreferrer sponsored'
    } catch {
      // Ignore malformed third-party links.
    }
  })
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
    const pageParams = new URLSearchParams(window.location.search)
    if (
      pageParams.get('utm_source') === 'rss' &&
      pageParams.get('utm_medium') === 'syndication'
    ) {
      sessionStorage.setItem('hostpro_affiliate_source', 'rss')
      sessionStorage.setItem(
        'hostpro_rss_content',
        pageParams.get('utm_content') ?? window.location.pathname.split('/').filter(Boolean).pop() ?? 'rss'
      )
    }

    rewriteLegacyHostingerLinks(document)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof Element) rewriteLegacyHostingerLinks(node)
        }
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })

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

      const isRssVisit = sessionStorage.getItem('hostpro_affiliate_source') === 'rss'
      const isCjLink = CJ_HOSTS.has(url.hostname)
      if (isRssVisit && isCjLink) {
        const rssContent = sessionStorage.getItem('hostpro_rss_content') ?? 'rss'
        const currentSid = url.searchParams.get('sid')
        const rssSid = currentSid && currentSid !== 'not_set'
          ? `${currentSid.replace(/-rss$/, '')}-rss`
          : `${rssContent}-rss`
        url.searchParams.set('sid', rssSid.slice(0, 100))
        anchor.href = url.href
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
        traffic_source: isRssVisit ? 'rss' : 'website',
        rss_content: isRssVisit
          ? sessionStorage.getItem('hostpro_rss_content') ?? 'rss'
          : 'not_applicable',
        transport_type: 'beacon',
      })
    }

    document.addEventListener('click', trackClick, true)
    return () => {
      observer.disconnect()
      document.removeEventListener('click', trackClick, true)
    }
  }, [])

  return null
}

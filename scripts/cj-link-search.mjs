import fs from 'node:fs'
import path from 'node:path'

function loadLocalEnv() {
  const file = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(file)) throw new Error('.env.local not found')

  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const separator = line.indexOf('=')
    if (separator < 1 || line.trimStart().startsWith('#')) continue
    const key = line.slice(0, separator).trim()
    const value = line.slice(separator + 1).trim()
    if (!process.env[key]) process.env[key] = value
  }
}

function decodeXml(value = '') {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
}

function field(xml, name) {
  return decodeXml(xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`, 'i'))?.[1]?.trim() ?? '')
}

loadLocalEnv()

const token = process.env.CJ_PERSONAL_ACCESS_TOKEN
const websiteId = process.env.CJ_WEBSITE_ID
const keywords = process.argv.slice(2).join(' ').trim()

if (!token || !websiteId) throw new Error('CJ_PERSONAL_ACCESS_TOKEN and CJ_WEBSITE_ID are required')
if (!keywords) throw new Error('Usage: npm run cj:search -- <keywords>')

const params = new URLSearchParams({
  'website-id': websiteId,
  'advertiser-ids': 'joined',
  keywords,
  'records-per-page': '25',
})

const response = await fetch(`https://link-search.api.cj.com/v2/link-search?${params}`, {
  headers: { Authorization: `Bearer ${token}` },
})

if (!response.ok) throw new Error(`CJ API request failed with HTTP ${response.status}`)

const xml = await response.text()
const totalMatched = xml.match(/total-matched="(\d+)"/)?.[1] ?? '0'
const records = [...xml.matchAll(/<link>([\s\S]*?)<\/link>/gi)]
  .map((match) => match[1])
  .filter((record) => field(record, 'advertiser-name'))
  .map((record) => ({
    advertiser: field(record, 'advertiser-name'),
    advertiserId: field(record, 'advertiser-id'),
    linkName: field(record, 'link-name'),
    linkId: field(record, 'link-id'),
    clickUrl: field(record, 'clickUrl'),
    relationship: field(record, 'relationship-status'),
  }))

console.log(JSON.stringify({ keywords, totalMatched: Number(totalMatched), records }, null, 2))

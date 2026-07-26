import { createRssFeed, rssResponse } from '@/lib/rss'

export const dynamic = 'force-static'

export async function GET() {
  return rssResponse(
    await createRssFeed({
      feedPath: '/affiliate-products.rss',
    })
  )
}

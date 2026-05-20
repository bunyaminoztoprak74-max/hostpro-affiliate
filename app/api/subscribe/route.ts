import { NextRequest, NextResponse } from 'next/server'

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, source } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) {
      // In development / when env vars are not set, return mock success
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({
          success: true,
          message: 'Subscribed successfully (dev mode)',
        })
      }
      return NextResponse.json({ error: 'Newsletter service not configured' }, { status: 503 })
    }

    const beehiivRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: source ?? 'hostproreviews',
          utm_medium: 'website',
          utm_campaign: 'email-capture',
          custom_fields: [
            {
              name: 'Source',
              value: source ?? 'website',
            },
          ],
        }),
      }
    )

    if (!beehiivRes.ok) {
      const errData = await beehiivRes.json().catch(() => ({}))
      const message = (errData as { message?: string }).message ?? 'Subscription failed'

      // 409 = already subscribed — treat as success to avoid user confusion
      if (beehiivRes.status === 409) {
        return NextResponse.json({ success: true, message: 'Already subscribed' })
      }

      return NextResponse.json({ error: message }, { status: beehiivRes.status })
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' })
  } catch {
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}

---
title: "How to Add Google Analytics to WordPress (2026 Guide)"
excerpt: "Set up Google Analytics 4 on your WordPress site in under 10 minutes. Covers the Site Kit plugin method, manual gtag.js installation, and MonsterInsights for advanced tracking."
date: "2026-05-20"
readTime: "6 min read"
difficulty: "beginner"
tags: ["google analytics", "wordpress", "tracking", "seo", "analytics"]
lastModified: "2026-05-20"
steps:
  - name: "Create a Google Analytics 4 property"
    text: "Go to analytics.google.com, click Admin, then Create Property. Enter your site name, timezone, and currency. Select Web as the platform and enter your domain."
  - name: "Get your Measurement ID"
    text: "In your new GA4 property, go to Data Streams > Web. Click on your stream to see the Measurement ID (format: G-XXXXXXXXXX). Copy this ID."
  - name: "Install Site Kit by Google plugin"
    text: "In WordPress, go to Plugins > Add New and search for Site Kit by Google. Install and activate it."
  - name: "Connect Site Kit to Google Analytics"
    text: "Go to Site Kit in your WordPress menu and click Set up. Follow the Google account authorization steps and select your GA4 property."
  - name: "Verify tracking is working"
    text: "Visit your website in a separate browser tab, then check Google Analytics Realtime report to confirm your visit is being tracked."
---

Google Analytics 4 (GA4) is the standard analytics platform for tracking website traffic, user behavior, and conversions. Setting it up on WordPress takes under 10 minutes with the right method.

## What You'll Track with Google Analytics

- **Users and sessions:** How many people visit and how often they return
- **Traffic sources:** Where visitors come from (Google, social, direct, referral)
- **Page views:** Which pages are most popular
- **Engagement:** Bounce rate, time on page, scroll depth
- **Conversions:** Goal completions (form submissions, purchases, sign-ups)
- **Real-time data:** Active users right now, their location, and current pages

## Prerequisite: Create a Google Analytics 4 Property

Before connecting to WordPress, you need a GA4 property.

1. Go to [analytics.google.com](https://analytics.google.com)
2. Sign in with your Google account
3. Click **Admin** (gear icon, bottom left)
4. Under **Account**, click **Create Account** (or use existing account)
5. Under **Property**, click **Create Property**
6. Enter:
   - **Property name:** Your site name (e.g., "My Blog")
   - **Reporting time zone:** Your local time zone
   - **Currency:** Your local currency
7. Click **Next**, fill in business details, click **Create**
8. Select **Web** as your platform
9. Enter your **Website URL** and **Stream name**
10. Click **Create stream**
11. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

## Method 1: Site Kit by Google (Recommended for Beginners)

Google's official WordPress plugin — the easiest setup with no code required.

**Installation:**
1. In WordPress admin, go to **Plugins → Add New**
2. Search for **Site Kit by Google**
3. Click **Install Now** → **Activate**

**Setup:**
1. Go to **Site Kit** in the left menu
2. Click **Start Setup**
3. Click **Sign in with Google** and authorize with the Google account that owns your GA4 property
4. Grant the requested permissions
5. Verify site ownership (Site Kit handles this automatically)
6. On the "What do you want to connect?" screen, check **Google Analytics**
7. Select your GA4 property from the dropdown
8. Click **Configure Analytics**

**Benefits of Site Kit:**
- Also connects Google Search Console, PageSpeed Insights, and AdSense
- Shows analytics data directly in your WordPress dashboard
- Handles tracking code placement automatically
- Excludes WordPress admins from being tracked (can be toggled)

## Method 2: Manual Installation (No Plugin)

Add the Google tag directly to your WordPress theme — the cleanest method.

**Get your gtag.js code:**
1. In GA4, go to **Admin → Data Streams → [your stream]**
2. Under **Tagging Instructions**, click **Install manually**
3. Copy the `<script>` code block shown

**Add to WordPress theme:**

**Option A — Theme header.php:**
1. Go to **Appearance → Theme File Editor**
2. Select `header.php` (or `functions.php`)
3. Paste the GA code just before `</head>`

**Option B — Functions.php:**
1. Go to **Appearance → Theme File Editor**
2. Select `functions.php`
3. Add this code, replacing `G-XXXXXXXXXX` with your Measurement ID:

```php
function add_google_analytics() {
    ?>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>
    <?php
}
add_action('wp_head', 'add_google_analytics');
```

> **Warning:** Don't edit theme files directly if using a non-child theme — updates will overwrite your changes. Use a child theme or a code snippet plugin like WPCode instead.

**Option C — WPCode Plugin (Safest Manual Method):**
1. Install **WPCode** plugin (formerly Insert Headers and Footers)
2. Go to **WPCode → Header & Footer**
3. Paste the GA script in the **Header** section
4. Click **Save Changes**

This method survives theme updates and is easy to manage.

## Method 3: MonsterInsights (Best for Advanced Tracking)

MonsterInsights is the most popular GA plugin with 3+ million installs, offering advanced eCommerce and event tracking.

1. Install **MonsterInsights** (free version from WordPress.org)
2. Go to **Insights → Settings**
3. Click **Connect MonsterInsights**
4. Authorize with your Google account
5. Select your GA4 property
6. Click **Complete Connection**

**MonsterInsights advantages:**
- Enhanced eCommerce tracking for WooCommerce (Pro)
- Event tracking (button clicks, video plays, downloads) without code
- Author tracking, form tracking, custom dimensions
- Dashboard reports inside WordPress without opening GA

**Free vs Pro:**
- Free: Basic pageview tracking, audience reports, top pages
- Pro ($99.50/year): Enhanced eCommerce, form tracking, advanced reports

## Method 4: Google Tag Manager

For sites with multiple tracking tags (GA4, Facebook Pixel, Hotjar, etc.), GTM is the most efficient approach.

1. Create a GTM account at tagmanager.google.com
2. Create a **Container** for your website
3. Add the GTM container code to WordPress (use WPCode for header/body code)
4. In GTM, create a **GA4 Configuration tag** with your Measurement ID
5. Set the trigger to **All Pages**
6. **Submit** and **Publish** the container

Once GTM is set up, add all future tracking tags through GTM without editing WordPress code.

## Verifying Your Analytics Installation

**Check with GA4 Realtime Report:**
1. Open GA4 in one browser
2. Go to **Reports → Realtime**
3. In a different browser or incognito window, visit your website
4. The realtime report should show 1 active user in the past 30 minutes

**Check with GA Debugger Chrome Extension:**
1. Install "Google Analytics Debugger" from the Chrome Web Store
2. Enable it and reload your website
3. Open Chrome DevTools → Console
4. You should see GA4 event logs confirming the tag is firing

**Check the network tab:**
1. Open DevTools → Network tab
2. Filter by `google-analytics.com` or `gtag`
3. Reload your page
4. You should see a request to `google-analytics.com/g/collect`

## Exclude Your Own Traffic

You don't want your own visits inflating analytics data.

**Method 1 — IP Filter (GA4):**
1. In GA4, go to **Admin → Data Streams → [stream] → Tag Settings → Show All**
2. Click **Define internal traffic**
3. Add your IP address with the rule type **IP address equals**
4. In **Admin → Data Filters**, create a filter to exclude internal traffic

**Method 2 — Browser Extension:**
Install "Block Yourself from Analytics" Chrome extension — cookies-based, simpler than IP filters.

**Method 3 — Site Kit setting:**
In Site Kit settings, toggle **Track logged-in administrators** OFF.

## Important Events to Track

GA4 automatically tracks:
- Page views
- Scroll depth (90% scroll)
- Outbound link clicks
- Site search (if you have a search form)
- Video engagement (YouTube embeds)

Set up manual event tracking for:
- **Contact form submissions** → use WPForms or Contact Form 7 events
- **Button clicks** (affiliate links, CTAs)
- **File downloads** (PDF, ZIP files)
- **WooCommerce purchases** (requires MonsterInsights Pro or manual GTM setup)

---

**Already tracking your site's performance?** Pair Google Analytics with a fast host to ensure the site you're measuring delivers good experiences. [Hostinger](https://www.hostinger.com/web-hosting?REFERRALCODE=OFMBZTOPRZSU) starts at $2.99/month and includes everything you need to launch.

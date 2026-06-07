---
title: "How to Set Up a CDN for Your Website (2026 Guide)"
excerpt: "Speed up your website globally by setting up a CDN. Covers Cloudflare free CDN, BunnyCDN, and host-specific CDN options for WordPress. Step-by-step setup included."
date: "2026-05-20"
readTime: "7 min read"
difficulty: "intermediate"
tags: ["cdn", "cloudflare", "speed", "wordpress", "performance"]
lastModified: "2026-05-20"
steps:
  - name: "Choose a CDN provider"
    text: "Pick a CDN. Cloudflare Free is the most popular option for most sites. If your host (Cloudways, WP Engine, Kinsta) includes a CDN, use that instead — it's already optimized for your setup."
  - name: "Create a Cloudflare account"
    text: "Go to cloudflare.com and create a free account. Enter your domain name when prompted. Cloudflare will scan your existing DNS records."
  - name: "Update your nameservers"
    text: "Cloudflare gives you two new nameservers. Log in to your domain registrar and replace your current nameservers with the Cloudflare ones. This routes all traffic through Cloudflare."
  - name: "Configure Cloudflare settings"
    text: "In the Cloudflare dashboard, set SSL to Full (Strict), enable Auto Minify for HTML/CSS/JS, and turn on Brotli compression. These settings improve both security and speed."
  - name: "Install Cloudflare WordPress plugin"
    text: "In WordPress, install the Cloudflare plugin from the official repo. Connect it to your account. This lets you purge the cache and manage settings directly from WordPress."
  - name: "Test your CDN setup"
    text: "Use GTmetrix or WebPageTest to run a speed test before and after CDN setup. Check that your site loads from the CDN by looking for CF-Cache-Status headers in browser DevTools."
author: marcus
---

A CDN (Content Delivery Network) stores cached copies of your website's files on servers worldwide. When a visitor loads your site, they receive files from the nearest server — not your origin server in a single location. This reduces load times, especially for international visitors.

## Why Your Site Needs a CDN

Without a CDN, every visitor's browser fetches files from your hosting server's single location. A visitor in Tokyo loading a site hosted in Chicago experiences network latency alone of 150ms+ before a single byte downloads.

With a CDN:
- **Images, CSS, JS** are served from a server within milliseconds of the visitor
- **Origin server load** drops significantly — your host does less work
- **DDoS protection** improves because Cloudflare absorbs attack traffic
- **Google Core Web Vitals** scores improve, which can lift rankings

## Which CDN Should You Use?

| CDN | Best For | Price |
|-----|----------|-------|
| **Cloudflare Free** | Most websites | Free forever |
| **Cloudways Cloudflare Enterprise** | Cloudways users | Included |
| **Kinsta CDN** | Kinsta users | Included |
| **WP Engine Global CDN** | WP Engine users | Included |
| **BunnyCDN** | High-traffic sites needing custom rules | ~$0.01/GB |

**If your host already includes a CDN** (Cloudways, Kinsta, WP Engine), use theirs first — it's pre-configured and optimized for your server stack. Only add Cloudflare on top if you need DDoS protection or additional features.

## Option A: Set Up Cloudflare Free CDN

Cloudflare is the easiest and most popular CDN for independent websites. The free tier covers the needs of 95% of sites.

### Step 1: Sign Up and Add Your Site

1. Go to [cloudflare.com](https://cloudflare.com) and create a free account
2. Click **Add a Site** and enter your domain name
3. Select the **Free** plan
4. Cloudflare scans your existing DNS records — review them and confirm they're correct
5. Ensure all records for `A`, `AAAA`, `CNAME` pointing to your hosting have the **orange cloud icon** (proxied through Cloudflare)

### Step 2: Update Your Nameservers

Cloudflare provides two nameserver addresses (e.g., `aria.ns.cloudflare.com`).

1. Log in to your domain registrar (GoDaddy, Namecheap, etc.)
2. Navigate to your domain's **Nameservers** settings
3. Replace existing nameservers with Cloudflare's two nameservers
4. Save changes
5. Wait 1–24 hours for propagation

Once DNS propagates, all your traffic routes through Cloudflare's network.

### Step 3: Configure SSL/TLS

1. In Cloudflare dashboard, go to **SSL/TLS → Overview**
2. Set encryption mode to **Full (Strict)** if your origin server has a valid SSL certificate
3. If you haven't set up SSL at the origin yet, use **Full** (not Strict) temporarily
4. Enable **Always Use HTTPS** in SSL/TLS → Edge Certificates

### Step 4: Enable Performance Settings

Go to **Speed → Optimization** and enable:

- **Auto Minify:** Check HTML, CSS, and JavaScript
- **Brotli:** Toggle on (compresses files before sending)
- **Rocket Loader:** Test this — it can improve JavaScript load time but occasionally causes conflicts

Go to **Caching → Configuration** and set:
- **Browser Cache TTL:** 4 hours or longer for most sites
- **Caching Level:** Standard

### Step 5: Set Up WordPress Plugin (Optional but Recommended)

1. In WordPress admin, go to **Plugins → Add New**
2. Search for **Cloudflare** (official plugin by Cloudflare)
3. Click **Install Now** → **Activate**
4. Go to **Settings → Cloudflare** and connect your account
5. Now you can purge the Cloudflare cache directly from WordPress

## Option B: Set Up CDN via Your Host

### Cloudways CDN Setup

Cloudways includes Cloudflare Enterprise CDN free for all plans:

1. Log in to Cloudways console
2. Go to **Applications → [your app] → CloudwaysCDN**
3. Toggle **Enable CDN**
4. Choose the CDN plan (free Enterprise CDN available)
5. Cloudways automatically configures everything — no DNS changes needed

### Kinsta CDN Setup

Kinsta includes a CDN powered by Cloudflare:

1. Log in to MyKinsta
2. Go to **Sites → [your site] → CDN**
3. Click **Enable CDN**
4. Select zones to cache (WordPress CDN zone is recommended)
5. Click **Enable**

### WP Engine CDN Setup

WP Engine's Global Edge Security (Cloudflare) CDN:

1. Log in to the WP Engine User Portal
2. Go to **Sites → [your site] → CDN**
3. Click **Enable CDN**
4. Follow the domain verification steps
5. Update DNS if prompted

## Configuring WordPress Cache with CDN

For best results, use a caching plugin alongside your CDN:

**Recommended setup for Cloudflare + WordPress:**

1. Install **WP Super Cache** or **W3 Total Cache** (free) or **WP Rocket** (paid)
2. In your caching plugin settings, enable **Browser Caching**
3. Add Cloudflare CDN URL if prompted (leave empty for most setups)
4. Set cache expiry times for static assets (images, CSS, JS) to 1 month+
5. Exclude dynamic pages (cart, checkout, My Account) from caching

## Testing Your CDN

**Method 1 — Browser DevTools:**
1. Open Chrome DevTools (F12)
2. Go to **Network** tab and reload your page
3. Click on any image or CSS file
4. In the **Headers** tab, look for `CF-Cache-Status: HIT` — this confirms Cloudflare served the file

**Method 2 — GTmetrix:**
1. Visit [gtmetrix.com](https://gtmetrix.com)
2. Enter your URL and click **Analyze**
3. Check the **Waterfall** tab — CDN-served files will show low latency

**Method 3 — Multiple regions:**
Use [webpagetest.org](https://webpagetest.org) and test from multiple locations. CDN reduces the variance between regions.

## Troubleshooting Common CDN Issues

**Site shows as Not Secure after CDN setup:**
- Set Cloudflare SSL mode to **Full** instead of **Full (Strict)**
- Ensure your origin server has an SSL certificate installed

**CSS/JS not loading after CDN:**
- Purge the Cloudflare cache: in the dashboard, go to **Caching → Purge Cache → Purge Everything**
- Disable Rocket Loader temporarily (it can break some scripts)

**Infinite redirect loop:**
- If you have `Force HTTPS` enabled both in WordPress and Cloudflare, check your wp-config.php for conflicting settings
- Set Cloudflare SSL to **Full (Strict)** and ensure your origin server forces HTTPS too

## Performance Results You Can Expect

After a properly configured CDN, typical improvements:

- **First Contentful Paint:** 20–40% faster for international visitors
- **Total Blocking Time:** Reduced via Rocket Loader (when working)
- **Bandwidth usage** on your host: reduced 40–60% (CDN serves the traffic)
- **GTmetrix Grade:** Often improves from B to A for most sites

---

**Already on Cloudways?** The built-in Cloudflare Enterprise CDN is [already included in your plan](https://www.cloudways.com/en/?id=2170350). Enable it in one click from your dashboard.

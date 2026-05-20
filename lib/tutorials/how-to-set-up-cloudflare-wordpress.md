---
title: "How to Set Up Cloudflare with WordPress (2026 Guide)"
excerpt: "Connect Cloudflare to your WordPress site for free DDoS protection, CDN acceleration, and SSL. Full setup guide including DNS configuration and the best settings for WordPress."
date: "2026-05-20"
readTime: "7 min read"
difficulty: "intermediate"
tags: ["cloudflare", "wordpress", "cdn", "security", "dns", "speed"]
lastModified: "2026-05-20"
steps:
  - name: "Create a Cloudflare account and add your site"
    text: "Sign up at cloudflare.com and click Add a Site. Enter your domain name. Select the Free plan."
  - name: "Review and confirm DNS records"
    text: "Cloudflare scans your existing DNS records. Review the list — ensure A records for your domain point to your hosting IP with the orange cloud (proxied) enabled."
  - name: "Update your nameservers"
    text: "Cloudflare gives you two nameservers. Log in to your domain registrar and replace your current nameservers with Cloudflare's. Propagation takes 1-24 hours."
  - name: "Configure SSL to Full Strict"
    text: "In Cloudflare, go to SSL/TLS > Overview and set mode to Full (Strict). This encrypts traffic between Cloudflare and your origin server."
  - name: "Configure WordPress-specific settings"
    text: "Install the Cloudflare plugin for WordPress. Set up the correct IP restoration (Cloudflare's IPs replace visitor IPs by default). Configure page rules for the WordPress admin."
  - name: "Test and verify"
    text: "Check that your site loads over HTTPS, the padlock shows, and performance improves. Use browser DevTools to confirm CF-Cache-Status: HIT on cached resources."
---

Cloudflare is a reverse proxy and CDN that sits between your visitors and your hosting server. The free plan includes DDoS protection, global CDN, SSL, and basic security rules — significant value at no cost.

## What Cloudflare Does for Your WordPress Site

- **CDN:** Serves cached static files from 300+ edge locations globally
- **DDoS protection:** Absorbs attack traffic before it reaches your server
- **SSL:** Provides HTTPS at the edge (between visitor and Cloudflare)
- **DNS:** Fast, anycast DNS resolution
- **Security:** WAF rules, bot management, IP blocking
- **Speed:** Auto minification, Brotli compression, HTTP/2 & HTTP/3

**Free plan limitations:**
- Basic WAF rules (Pro plan gets more)
- No image optimization (needs Polish — Pro plan)
- No advanced analytics

## Step 1: Create Cloudflare Account and Add Your Site

1. Go to [cloudflare.com](https://cloudflare.com) and sign up
2. Click **Add a site** (or **Add domain** in the new dashboard)
3. Enter your domain name (e.g., `yourdomain.com`, without `www`)
4. Select the **Free** plan
5. Click **Continue**

## Step 2: Review DNS Records

Cloudflare scans your domain's current DNS records and imports them. Review carefully:

**What to check:**
- Your `A` record for `@` (root domain) should show your hosting server's IP
- Your `A` record for `www` should show your hosting IP
- The **Proxy status** column shows orange cloud (proxied) or grey cloud (DNS only)

**Orange cloud (proxied) vs grey cloud (DNS only):**
- **Orange cloud:** Traffic routes through Cloudflare (CDN + protection active)
- **Grey cloud:** Traffic goes directly to your server (bypasses Cloudflare)

**Enable orange cloud for:**
- `A` record for `@` (root domain)
- `A` record for `www`
- Any CNAME pointing to your primary domain

**Keep grey cloud for:**
- `MX` records (email — never proxy these)
- Records used for email verification (SPF, DKIM TXT records)
- Any subdomain you don't want routed through Cloudflare

Click **Continue** to proceed to nameserver setup.

## Step 3: Update Your Nameservers

Cloudflare provides two nameservers:
- Example: `aria.ns.cloudflare.com` and `ron.ns.cloudflare.com`

**Update at your registrar:**

**GoDaddy:**
My Products → Domains → click domain → DNS → Nameservers → Change → Custom → Enter both NS

**Namecheap:**
Dashboard → Domain List → Manage → Nameservers → Custom DNS → Enter both NS

**Google Domains/Squarespace:**
DNS → Custom name servers → Enter both NS

After saving, click **Done, check nameservers** in Cloudflare. Propagation takes 1–24 hours.

**Verify:** Go to [whatsmydns.net](https://whatsmydns.net) and check if your domain resolves to Cloudflare's IPs (any of the `104.x.x.x` range).

## Step 4: Configure SSL/TLS

This is the most important configuration step. Getting this wrong causes redirect loops.

1. In Cloudflare dashboard, go to **SSL/TLS → Overview**
2. Set encryption mode:

| SSL Mode | When to Use |
|----------|------------|
| **Off** | Never — removes all HTTPS |
| **Flexible** | No SSL on origin server (avoid if possible) |
| **Full** | Self-signed cert on origin, or unverified cert |
| **Full (Strict)** | Valid SSL certificate on origin (recommended) |

**Use Full (Strict)** if your hosting provider has installed a valid SSL certificate (virtually all modern hosts do). This is the most secure option.

**Enable additional SSL settings:**
- Go to **SSL/TLS → Edge Certificates**
- Toggle **Always Use HTTPS** ON
- Toggle **Automatic HTTPS Rewrites** ON (fixes some mixed content)
- Set **Minimum TLS Version** to TLS 1.2

## Step 5: Configure Speed Settings

Go to **Speed → Optimization:**

**Enable:**
- **Auto Minify:** Check HTML, CSS, JavaScript
- **Brotli:** ON (better than gzip compression)

**Rocket Loader:** Test this — it can improve JavaScript load time but occasionally breaks functionality. Start with OFF and enable it for one week to test.

Go to **Caching → Configuration:**
- **Browser Cache TTL:** 4 hours (or longer for very static sites)
- **Caching Level:** Standard

## Step 6: Install the Cloudflare WordPress Plugin

The official plugin integrates Cloudflare settings with WordPress and fixes the IP address issue.

1. In WordPress, go to **Plugins → Add New**
2. Search **Cloudflare** (official plugin)
3. Install and activate
4. Go to **Settings → Cloudflare**
5. Log in with your Cloudflare email and API key (or Global API key)
6. Select your zone (domain)
7. Click **Save API Credentials**

**Apply recommended settings:**
The plugin includes a WordPress-optimized preset:
1. In Cloudflare plugin → **Apply WordPress Optimized Settings**
2. This applies recommended caching, security, and performance settings

## Step 7: Configure WordPress Admin Bypass

The WordPress admin (`/wp-admin`) should bypass Cloudflare caching to prevent login issues.

**Method A — Cloudflare Page Rule:**
1. Go to **Rules → Page Rules**
2. Click **Create Page Rule**
3. URL: `yourdomain.com/wp-admin*`
4. Setting: **Cache Level → Bypass**
5. Click **Save and Deploy**

**Method B — WordPress plugin handles this automatically.**

## Step 8: Fix IP Address Logging

When Cloudflare is active, your server sees Cloudflare's IP addresses instead of visitor IPs. This affects ban lists, analytics, and security plugins.

**Fix for Apache (add to .htaccess or httpd.conf):**
```apache
# Restore original visitor IP
SetEnvIf X-Forwarded-For "(.*)" CF-Connecting-IP=$1
```

**Fix via Cloudflare plugin:**
The Cloudflare WordPress plugin handles this automatically when active.

**Fix via Really Simple SSL plugin:**
If you're also using Really Simple SSL, it includes Cloudflare IP restoration.

## Cloudflare Security Settings

Go to **Security → Settings:**

- **Security Level:** Medium (recommended) — challenges suspicious traffic
- **Bot Fight Mode:** ON (blocks bot traffic automatically)
- **Browser Integrity Check:** ON (blocks requests without valid User-Agent headers)

Go to **Security → WAF:**
- **Managed rules:** Enable all free managed rules

## Advanced: Cloudflare Workers for WordPress (Optional)

Cloudflare Workers can run edge code to modify responses before they reach the visitor. For advanced users:

**Common WordPress use cases:**
- Edge-side A/B testing
- Geo-based redirects
- Custom security headers
- Replacing external scripts with local copies

Workers require JavaScript knowledge and are outside the scope of basic setup.

## Testing Your Cloudflare Setup

**Check Cloudflare is active:**
In Chrome DevTools → Network tab → click your HTML page → Headers → Look for `cf-ray` header. If present, traffic is going through Cloudflare.

**Check CDN caching:**
Look for `cf-cache-status: HIT` or `MISS` in response headers. HIT means the file was served from Cloudflare's cache.

**Speed test:**
Run [GTmetrix](https://gtmetrix.com) before and after Cloudflare. You should see:
- Reduced TTFB (especially for visitors far from your origin)
- Faster resource load times for static files

## Common Cloudflare Issues with WordPress

**Redirect loop after enabling Cloudflare:**
Cause: Cloudflare SSL set to "Flexible" while WordPress forces HTTPS.
Fix: Set Cloudflare SSL to **Full (Strict)**.

**WordPress admin showing security challenge:**
Cause: Cloudflare's security level is challenging logged-in users.
Fix: Create a Page Rule for `yourdomain.com/wp-admin*` with **Security Level: Essentially Off**.

**Cached pages not updating:**
Cloudflare caches pages aggressively. After publishing new content:
- Go to **Caching → Purge Cache → Purge Everything**
- Or set up automatic cache purging via the Cloudflare WordPress plugin

**CSS/JS not loading after minification:**
Disable **Rocket Loader** and/or **Auto Minify** for JS in Cloudflare settings. Re-enable one at a time to identify the conflict.

---

**Already on Cloudways?** [Cloudways includes Cloudflare Enterprise CDN](https://www.cloudways.com/en/?id=2170350) in all plans — enterprise-tier performance at no extra cost. Enable it with one click from the Cloudways console.

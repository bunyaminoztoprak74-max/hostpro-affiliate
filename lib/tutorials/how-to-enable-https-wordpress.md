---
title: "How to Enable HTTPS on WordPress (Force SSL Redirect Guide)"
excerpt: "Switch your WordPress site from HTTP to HTTPS without breaking anything. Covers installing SSL, updating WordPress URLs, fixing mixed content, and setting up permanent redirects."
date: "2026-05-20"
readTime: "6 min read"
difficulty: "beginner"
tags: ["https", "ssl", "wordpress", "security", "redirect"]
lastModified: "2026-05-20"
steps:
  - name: "Install an SSL certificate"
    text: "Install a free Let's Encrypt SSL certificate via your hosting control panel. In cPanel, go to SSL/TLS > AutoSSL. In Hostinger hPanel, go to SSL under your domain settings."
  - name: "Update WordPress site URL to HTTPS"
    text: "In WordPress, go to Settings > General and change both WordPress Address and Site Address from http:// to https://. Save changes."
  - name: "Force HTTPS redirect"
    text: "Add redirect rules to .htaccess to automatically redirect all HTTP traffic to HTTPS. This ensures visitors always use the secure connection."
  - name: "Fix mixed content warnings"
    text: "After enabling HTTPS, fix any mixed content (HTTP resources on an HTTPS page). Use the Really Simple SSL plugin or manually update URLs in your database."
  - name: "Verify SSL is working"
    text: "Check that your site shows a padlock icon in the browser, all pages redirect to HTTPS, and Google Search Console shows no SSL errors."
---

Switching from HTTP to HTTPS is mandatory in 2026. HTTPS encrypts data between your visitor's browser and your server, protects user privacy, and is a ranking factor in Google Search. Chrome marks HTTP sites as "Not Secure" — a trust killer.

## Why HTTPS Matters

- **Security:** Encrypts login credentials, form submissions, and payment data
- **Trust:** Green padlock (or no warning) vs "Not Secure" warning
- **SEO:** Google has used HTTPS as a ranking signal since 2014
- **Speed:** HTTP/2 (faster protocol) is only available over HTTPS
- **Browser requirements:** Many modern browser features require HTTPS

## Step 1: Install SSL Certificate

Most hosts provide free SSL via Let's Encrypt. Check your specific host:

**Hostinger:**
1. Log in to hPanel → **Websites** → **Manage**
2. Go to **Security → SSL**
3. Under **Install SSL Certificate**, click **Install** next to your domain
4. Wait 5–10 minutes for installation

**Bluehost/HostGator (cPanel):**
1. Log in to cPanel → **Security → SSL/TLS**
2. Click **Manage SSL Sites**
3. Click **AutoSSL** or install Let's Encrypt from the interface

**Cloudways:**
1. Application Management → **SSL Certificate**
2. Choose **Let's Encrypt**
3. Enter your domain(s) and click **Install Certificate**

**SiteGround:**
1. Site Tools → **Security → SSL Manager**
2. SSL is auto-installed — if not, click the Let's Encrypt option

**WP Engine / Kinsta:**
SSL is provisioned automatically when you add a domain. No manual setup needed.

**If your host doesn't include free SSL:**
Use Cloudflare's free plan — it provides SSL at the CDN level, meaning your site has HTTPS even without a certificate at the origin (use "Flexible" mode only as temporary solution).

## Step 2: Update WordPress URLs to HTTPS

After SSL is installed, update WordPress's URL settings.

**Method A — WordPress Settings (easiest):**
1. Log in to WordPress admin at `http://yourdomain.com/wp-admin`
2. Go to **Settings → General**
3. Change **WordPress Address (URL)** from `http://` to `https://`
4. Change **Site Address (URL)** from `http://` to `https://`
5. Click **Save Changes**
6. WordPress will log you out — log back in at `https://yourdomain.com/wp-admin`

**Method B — wp-config.php (if you can't access admin):**
Add to `wp-config.php` before `/* That's all, stop editing! */`:
```php
define( 'WP_HOME', 'https://yourdomain.com' );
define( 'WP_SITEURL', 'https://yourdomain.com' );
```

## Step 3: Force HTTPS Redirects

Ensure all HTTP traffic automatically redirects to HTTPS.

**Method A — .htaccess (Apache servers):**
Add this at the top of your `.htaccess` file (above WordPress rules):
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

**Method B — Nginx config (for Nginx servers like Cloudways):**
Ask your host to add this to the Nginx configuration (usually managed by your host):
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://yourdomain.com$request_uri;
}
```

On Cloudways, this is done via **Application Settings → SSL Certificate → Force HTTPS Redirection** toggle.

**Method C — Cloudflare:**
In Cloudflare dashboard → **SSL/TLS → Edge Certificates** → Toggle **Always Use HTTPS** ON.

**Method D — Really Simple SSL Plugin:**
1. Install **Really Simple SSL** plugin
2. Activate — it automatically detects your SSL and updates `.htaccess`
3. Click **Go ahead, activate SSL!**

This is the easiest one-click solution for beginners.

## Step 4: Fix Mixed Content Warnings

After switching to HTTPS, some page elements may still load over HTTP (images, scripts, CSS from old URLs). This causes a "mixed content" warning — the padlock shows a warning symbol.

**Identify mixed content:**
1. Open Chrome DevTools (F12) → **Console** tab
2. Look for errors like: `Mixed Content: The page at 'https://...' was loaded over HTTPS, but requested an insecure resource 'http://...'`

**Fix Method 1 — Really Simple SSL (automatic):**
The Really Simple SSL plugin automatically rewrites HTTP to HTTPS in WordPress output. Install it and most mixed content issues resolve without manual work.

**Fix Method 2 — Better Search Replace (database):**
1. Install **Better Search Replace** plugin
2. In the Search field, enter `http://yourdomain.com`
3. In the Replace field, enter `https://yourdomain.com`
4. Select all tables
5. Uncheck **Run as dry run?** and click **Run Search/Replace**

This updates all stored URLs in your database from HTTP to HTTPS.

**Fix Method 3 — Manual hardcoded links:**
Some theme files may have hardcoded `http://` URLs. Use the Search and Replace tool to find them in your codebase, or use a child theme to override the specific template.

## Step 5: Update wp-config.php Security Keys

After migrating to HTTPS, regenerate your WordPress security keys. This logs out all users and forces re-authentication over HTTPS:

1. Visit [api.wordpress.org/secret-key/1.1/salt/](https://api.wordpress.org/secret-key/1.1/salt/)
2. Copy the generated keys
3. Replace the existing key definitions in `wp-config.php`

## Step 6: Verify HTTPS is Working

**Check SSL certificate:**
1. Visit your site — look for the padlock icon in the browser address bar
2. Click the padlock → **Certificate** to verify it's valid and for your domain
3. Check expiry date (Let's Encrypt certificates expire every 90 days — auto-renewal should handle this)

**Check redirects:**
1. Type `http://yourdomain.com` in your browser
2. It should automatically redirect to `https://yourdomain.com` (permanent 301 redirect)

**Check mixed content:**
1. Open Chrome DevTools → Console
2. No mixed content warnings should appear on any page

**Check SSL certificate quality:**
Visit [SSL Labs SSL Test](https://www.ssllabs.com/ssltest/) and enter your domain. You should score A or A+.

## Update Google Search Console

After switching to HTTPS:
1. Add `https://yourdomain.com` as a new property in Google Search Console
2. Submit your HTTPS sitemap
3. Request re-indexing of your homepage

Google will eventually discover the redirects, but submitting directly to Search Console speeds up re-indexing of your HTTPS pages.

## Common HTTPS Migration Issues

**Site shows security warning after SSL install:**
Check that your SSL certificate covers both `yourdomain.com` and `www.yourdomain.com`. Let's Encrypt allows both — ensure both variants are included in the certificate.

**Infinite redirect loop:**
Usually caused by Cloudflare Flexible SSL mode when WordPress also forces HTTPS. Set Cloudflare to **Full (Strict)** mode and ensure origin has a valid SSL certificate.

**Admin dashboard redirecting to login repeatedly:**
Update `WP_HOME` and `WP_SITEURL` in `wp-config.php` to use `https://`. Clear cookies and try again.

**Email links still use HTTP:**
Check WooCommerce email settings and other plugins that generate URLs. Update their base URL settings to use HTTPS.

---

**Choosing a host with automatic SSL?** [Hostinger](https://www.hostinger.com/web-hosting?REFERRALCODE=OFMBZTOPRZSU), [Cloudways](https://www.cloudways.com/en/?id=2170350), and [Kinsta](https://kinsta.com) all auto-provision and auto-renew SSL certificates for every domain you add.

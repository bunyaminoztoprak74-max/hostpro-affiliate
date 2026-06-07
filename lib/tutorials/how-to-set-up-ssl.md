---
title: "How to Set Up SSL on Your WordPress Site (Free & Paid Options)"
excerpt: "Enable HTTPS on your WordPress site in minutes. We cover free Let's Encrypt SSL setup for Hostinger, cPanel, and Cloudways — plus how to fix mixed content errors."
date: "2026-05-20"
readTime: "6 min read"
difficulty: "beginner"
tags: ["ssl certificate", "https wordpress", "free ssl", "lets encrypt", "secure website"]
steps:
  - name: "Check if SSL is already included"
    text: "Most modern hosts include free Let's Encrypt SSL. Log in to your hosting panel (hPanel, cPanel, or Cloudways) and look for an 'SSL' or 'HTTPS' section. Hostinger, SiteGround, and Cloudways all include free SSL automatically."
  - name: "Install the free SSL certificate"
    text: "In Hostinger hPanel: go to Hosting > Manage > SSL. Click 'Install SSL' next to your domain. In cPanel: find 'SSL/TLS' and use the Let's Encrypt option. The certificate installs in under 2 minutes."
  - name: "Force HTTPS in WordPress"
    text: "In WordPress, go to Settings > General. Change both 'WordPress Address' and 'Site Address' from http:// to https://. Save changes. This tells WordPress your site is now secure."
  - name: "Install Really Simple SSL plugin"
    text: "Install the free 'Really Simple SSL' plugin. Activate it and click 'Go ahead, activate SSL!' It automatically handles redirects, mixed content issues, and keeps your site fully secure."
  - name: "Fix mixed content errors"
    text: "If some pages still show a lock with a warning, you have mixed content: HTTP images or scripts on an HTTPS page. Use the 'Better Search Replace' plugin to update all http:// URLs to https:// in your database."
  - name: "Test your SSL installation"
    text: "Visit ssllabs.com/ssltest and enter your domain. A grade of A or A+ means your SSL is correctly installed. Also check that all pages show the green padlock in Chrome."
author: marcus
---

SSL certificates encrypt the connection between your site and your visitors. Google requires HTTPS for SEO, browsers show "Not Secure" warnings on HTTP sites, and SSL is now free with virtually every reputable hosting provider.

## Why SSL Matters in 2026

- **SEO:** Google uses HTTPS as a ranking signal
- **Trust:** Visitors see a padlock — no padlock means lost customers
- **Security:** Encrypts data in transit (especially important for contact forms and e-commerce)
- **Browser warnings:** Chrome, Safari, and Firefox all warn users on non-HTTPS sites

## Free SSL vs Paid SSL

For most websites, **free Let's Encrypt SSL is identical to paid SSL** in terms of security and browser trust. The main differences:

| | Free (Let's Encrypt) | Paid (Comodo, DigiCert) |
|---|---|---|
| Encryption strength | Same (TLS 1.3) | Same |
| Browser trust | Full | Full |
| Validity | 90 days (auto-renews) | 1–2 years |
| Cost | Free | $10–$300/year |
| Best for | Blogs, small sites | High-risk e-commerce, banks |

**Verdict:** Use free SSL unless you specifically need an Extended Validation (EV) certificate.

## Host-Specific Instructions

### Hostinger (hPanel)
1. Hosting → Manage → SSL
2. Find your domain → Install SSL
3. Done — takes 2 minutes

### cPanel (Bluehost, HostGator, etc.)
1. cPanel → Security → SSL/TLS
2. Let's Encrypt section → Issue
3. Select your domain → Install

### Cloudways
1. Application Management → SSL Certificate
2. Let's Encrypt tab → Enter your domain
3. Install Certificate

## Common SSL Errors and Fixes

**"Your connection is not private" error:**
Clear browser cache, or the certificate may not have propagated yet. Wait 15 minutes and try again.

**Mixed content warnings:**
Run a search-replace in your database to update all http:// references to https://. Use the Better Search Replace plugin or run: `UPDATE wp_posts SET post_content = REPLACE(post_content, 'http://yourdomain.com', 'https://yourdomain.com');`

**Certificate expired:**
Modern hosts auto-renew Let's Encrypt certificates. If yours expired, contact your host's support — they can manually trigger a renewal.

## Related Articles

- [WordPress Security Basics](/tutorials/wordpress-security-basics)
- [How to Speed Up WordPress](/tutorials/wordpress-speed-optimization)
- [Hostinger Review 2026](/blog/hostinger-review-2026)

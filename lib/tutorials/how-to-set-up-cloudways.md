---
title: "How to Set Up Cloudways: Complete Beginner's Guide (2026)"
excerpt: "Get your Cloudways server running with WordPress in under 20 minutes. This step-by-step guide covers server creation, application deployment, domain connection, and SSL setup."
date: "2026-05-20"
readTime: "10 min read"
difficulty: "intermediate"
tags: ["cloudways", "cloud hosting", "wordpress", "setup", "managed hosting"]
lastModified: "2026-05-20"
steps:
  - name: "Create a Cloudways account"
    text: "Go to cloudways.com and sign up. You get a 3-day free trial without entering a credit card. Choose your preferred cloud provider during signup."
  - name: "Launch a new server"
    text: "In the Cloudways console, click Launch and select your application (WordPress), server size (1 GB RAM is fine for most new sites), and cloud provider (DigitalOcean is cheapest at $11/mo)."
  - name: "Deploy your WordPress application"
    text: "After the server provisions (3–5 minutes), go to Applications and click on your WordPress app. Note your temporary application URL for testing."
  - name: "Connect your domain"
    text: "In Application Settings > Domain Management, add your domain name. Then update your domain's DNS A record to point to your Cloudways server IP."
  - name: "Install SSL certificate"
    text: "In SSL Certificate settings, enter your domain and click Install Certificate. Cloudways installs a free Let's Encrypt SSL in about 30 seconds."
  - name: "Complete WordPress setup"
    text: "Visit your domain/wp-admin to complete WordPress setup. Install your theme and plugins. Your site is now live on Cloudways managed cloud hosting."
---

Cloudways is a managed cloud hosting platform that gives you the power of cloud providers like DigitalOcean, AWS, and Google Cloud with a simplified interface that doesn't require server administration knowledge.

## Why Choose Cloudways?

- **Performance:** NVMe SSD + Cloudflare Enterprise CDN + object caching = among the fastest hosting available
- **Flexibility:** Choose your cloud provider, scale server resources instantly
- **No long-term contracts:** Pay-as-you-go, cancel anytime
- **Staging environments:** Built-in, one-click staging for every app
- **Starting price:** $11/month (DigitalOcean 1 GB RAM)

## Before You Start

You'll need:
- A credit card (or use the 3-day free trial without one)
- A domain name
- About 20 minutes

## Step 1: Create Your Cloudways Account

1. Go to [cloudways.com](https://www.cloudways.com/en/?id=2170350)
2. Click **Start Free** or **Get Started**
3. Fill in your name, email, and password
4. Verify your email address
5. Complete the account verification (phone number or payment method for full access)

> **3-day free trial:** You can explore Cloudways fully without a credit card for 3 days. You'll need to add a payment method to continue after the trial.

## Step 2: Launch Your First Server

After logging in, you'll see the main dashboard.

1. Click **Launch** in the top navigation (or the big **+** button)
2. A launch wizard appears with these choices:

**Select Application:** WordPress (for a standard WordPress site)
Other options include WooCommerce, Laravel, Magento, or PHP.

**Select Server:**
- **DigitalOcean 1 GB** — $11/month — Best for new sites and small blogs
- **DigitalOcean 2 GB** — $22/month — Recommended for growing sites
- **AWS** — More expensive but enterprise-grade (from ~$36/month)
- **GCP** — Google Cloud, excellent performance (from ~$33/month)

**Server Size Recommendation:**
| Site Stage | RAM | Monthly Cost |
|-----------|-----|-------------|
| New site / blog | 1 GB | ~$11 |
| Growing site (10K visitors/mo) | 2 GB | ~$22 |
| Established site (50K+ visitors/mo) | 4 GB | ~$44 |

**Select Server Location:** Choose the region closest to your primary audience.

**Application Name:** Enter a name for your WordPress app (e.g., `mysite-wordpress`)

**Server Name:** A name for the server (e.g., `myserver-do-nyc`)

3. Click **Launch Now**
4. Server provisioning takes **3–5 minutes** — you'll see a progress indicator

## Step 3: Access Your WordPress Application

Once the server is ready:

1. Go to **Applications** in the top menu
2. Click on your WordPress application name
3. You'll see the Application Management panel

**Key information here:**
- **Application URL:** A temporary `.cloudwaysapps.com` URL for testing before domain setup
- **Access Details:** WordPress admin URL, username, and password
- **Application IP:** The server IP you'll need for DNS

**Log in to WordPress:**
Click **WP Admin** in the Access Details section. You'll see a pre-generated admin username and password. Change the password immediately in **Users → Your Profile**.

## Step 4: Configure Application Settings

In the Application Settings panel, configure:

**General Settings:**
- Note the MySQL database name, username, and password for reference
- Under **Application Settings → PHP Settings**, set PHP version to 8.1 or 8.2 (recommended)

**Enable Redis Object Cache (Recommended):**
1. Go to **Application Settings → Packages**
2. Enable **Redis** toggle
3. In WordPress, install the **Redis Object Cache** plugin
4. Go to **Settings → Redis** and click **Enable Object Cache**

This dramatically speeds up database queries — particularly important for WooCommerce.

## Step 5: Connect Your Domain

1. In Application Management, go to **Domain Management**
2. In the **Domain** field, enter your domain (e.g., `yourdomain.com`)
3. Click **Save Changes**

**Update your domain's DNS:**
1. Log in to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find your domain's **A Record** settings
3. Point the A Record for `@` (root domain) to your Cloudways server IP
4. Point the A Record for `www` to the same IP
5. Wait 1–4 hours for DNS propagation

> **Note:** Cloudways doesn't use nameservers for domains — you always use A Records pointing to your server IP.

## Step 6: Install SSL Certificate

Cloudways installs free Let's Encrypt SSL certificates in seconds.

1. In Application Management, go to **SSL Certificate**
2. Under **Custom SSL**, choose **Let's Encrypt**
3. Enter your **Email address** and **Domain** (including www)
4. Click **Install Certificate**

The certificate installs in about 30 seconds. Cloudways also handles automatic renewal before expiry.

**Force HTTPS:**
After SSL is installed, return to **SSL Certificate** and toggle **Force HTTPS Redirection** to ON. This redirects all HTTP traffic to HTTPS automatically.

## Step 7: Enable CloudwaysCDN

Cloudways includes Cloudflare Enterprise CDN at no extra cost.

1. Go to **CloudwaysCDN** in Application Management
2. Click **Enable CloudwaysCDN**
3. Follow the setup wizard
4. Once enabled, all static assets (images, CSS, JS) serve from Cloudflare's edge network

## Step 8: Set Up Automated Backups

1. Go to **Application Backups**
2. Toggle **Application Backups** to ON
3. Set **Frequency:** Daily (recommended)
4. Set **Retention:** 7 days (free) or more (paid)
5. Click **Save Changes**

Backups run at your chosen frequency and retain for the set period. You can also take manual backups anytime before major changes.

## Step 9: Configure SMTP Email (Important)

Cloudways servers don't send email by default for spam prevention reasons. Configure an SMTP service for WordPress email to work.

**Free option — Brevo (Sendinblue):**
1. Create a free account at brevo.com
2. Get your SMTP credentials
3. In WordPress, install **WP Mail SMTP** plugin
4. Configure with your Brevo SMTP credentials

**Cloudways option — Elastic Email Add-on:**
1. In Cloudways console, go to **Add-Ons**
2. Enable **Elastic Email**
3. Configure SMTP credentials in WP Mail SMTP plugin

## Step 10: Test Your Setup

Before going live, verify:

- [ ] Domain loads your WordPress site over HTTPS
- [ ] WordPress admin (`/wp-admin`) is accessible
- [ ] Contact forms send email (test SMTP)
- [ ] All pages load correctly
- [ ] SSL certificate shows as valid (green padlock)

**Run a speed test:** Go to [gtmetrix.com](https://gtmetrix.com) and test your new Cloudways site. You should see TTFB under 300ms and overall load time under 2 seconds for a basic WordPress install.

## Cloudways Performance Tips

**Stack configuration for best WordPress performance:**
- **Web Server:** Nginx (faster than Apache for most use cases)
- **PHP Version:** 8.1 or 8.2
- **Object Cache:** Redis enabled
- **CDN:** CloudwaysCDN (Cloudflare Enterprise) enabled
- **Caching Plugin:** WP Rocket or W3 Total Cache with full-page caching

**When to scale your server:**
- CPU usage consistently above 80%: upgrade to next RAM tier
- TTFB increasing over time: often means Redis cache is filling up — restart Redis or upgrade
- Multiple sites: consider separate 1 GB servers per high-traffic site rather than one large server

---

**Ready to get started?** [Cloudways offers a 3-day free trial](https://www.cloudways.com/en/?id=2170350) — no credit card required. Try DigitalOcean 1 GB for your first server and experience managed cloud hosting.

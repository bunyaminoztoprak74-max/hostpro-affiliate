---
title: "How to Connect a Domain to Your Hosting: Step-by-Step Guide (2026)"
excerpt: "Learn how to point your domain name to your hosting account by updating DNS nameservers. Works with Hostinger, Bluehost, GoDaddy, Namecheap, and any registrar."
date: "2026-05-20"
readTime: "6 min read"
difficulty: "beginner"
tags: ["domain", "dns", "nameservers", "hostinger", "bluehost"]
lastModified: "2026-05-20"
steps:
  - name: "Find your hosting nameservers"
    text: "Log in to your hosting account and locate your nameserver addresses. These usually look like ns1.yourhostingprovider.com and ns2.yourhostingprovider.com. In Hostinger, go to Hosting > Manage > DNS / Nameservers."
  - name: "Log in to your domain registrar"
    text: "Go to the website where you registered your domain (GoDaddy, Namecheap, Google Domains, etc.) and log in to your account dashboard."
  - name: "Find DNS or Nameserver settings"
    text: "Navigate to your domain's DNS settings. Look for 'Nameservers', 'DNS Management', or 'Domain Settings'. The exact location varies by registrar."
  - name: "Replace existing nameservers"
    text: "Delete the current nameserver entries and enter your hosting provider's nameservers. Save your changes. Most registrars require at least 2 nameservers."
  - name: "Wait for DNS propagation"
    text: "DNS changes take 24–48 hours to fully propagate worldwide, though most users see the change within 1–4 hours. Use dnschecker.org to monitor propagation."
  - name: "Verify the connection"
    text: "Once propagation is complete, visit your domain in a browser. You should see your hosting account's default page or your website. Set up SSL next."
author: marcus
---

Connecting a domain to hosting is one of the first steps every website owner must complete. The process is the same regardless of which registrar or host you use — you're simply telling the internet's DNS system where your domain's files live.

## What Is DNS and Why It Matters

DNS (Domain Name System) translates human-readable domain names like `yoursite.com` into IP addresses like `104.21.35.67` that computers use to locate servers. When you update your domain's nameservers, you're redirecting all DNS queries for your domain to your hosting provider's DNS servers.

**Key terms to know:**
- **Nameservers** — the DNS servers managed by your hosting provider (e.g., `ns1.hostinger.com`)
- **DNS propagation** — the time it takes for the change to spread across the global DNS network (up to 48 hours)
- **A Record** — an alternative to nameservers; points your domain directly to an IP address

## Step 1: Find Your Hosting Nameservers

Log in to your hosting control panel and locate your nameserver addresses.

**Hostinger:**
1. Go to **Hosting** in the top menu
2. Click **Manage** next to your hosting plan
3. Scroll to **DNS / Nameservers** section
4. You'll see something like: `ns1.dns-parking.com` and `ns2.dns-parking.com`

**Bluehost:**
1. Go to **Hosting > cPanel** dashboard
2. In the **Domains** section, click **Zone Editor**
3. Your nameservers are shown at the top: `ns1.bluehost.com` and `ns2.bluehost.com`

**Cloudways:**
1. Log in to your Cloudways console
2. Go to **Applications** and select your app
3. Under **Access Details**, find the **Public IP**
4. With Cloudways, you use an A Record pointing to this IP, not nameservers

> **Note for Hostinger users:** If you bought your domain through Hostinger, DNS is already connected automatically.

## Step 2: Log In to Your Domain Registrar

Go to the website where you purchased your domain:

| Registrar | Dashboard URL |
|-----------|---------------|
| GoDaddy | My Products → Domains |
| Namecheap | Dashboard → Domain List |
| Google Domains | domains.google.com |
| Porkbun | porkbun.com → Account |

## Step 3: Find the Nameserver Settings

The location varies by registrar, but you're looking for something labeled **Nameservers**, **DNS**, or **Domain Settings**.

**GoDaddy:**
- My Products → Domains → click on domain → **DNS** tab → Scroll to **Nameservers** section → **Change**

**Namecheap:**
- Dashboard → Domain List → **Manage** next to your domain → **Nameservers** tab

**Google Domains (now Squarespace):**
- DNS → **Custom name servers**

## Step 4: Update the Nameservers

1. Select **Custom nameservers** (or equivalent option)
2. Remove existing nameserver entries
3. Enter your hosting provider's nameservers exactly as provided
4. Add at least 2 nameservers (ns1 and ns2)
5. Click **Save** or **Update**

**Example — Hostinger nameservers:**
```
ns1.hostinger.com
ns2.hostinger.com
```

**Example — SiteGround nameservers:**
```
ns1.siteground.net
ns2.siteground.net
```

## Step 5: Wait for DNS Propagation

DNS changes do not take effect instantly. Propagation typically takes:

- **Best case:** 15–60 minutes (if your old TTL was low)
- **Typical case:** 2–8 hours
- **Worst case:** Up to 48 hours in some regions

**Check propagation status:**
Visit [dnschecker.org](https://dnschecker.org) and enter your domain name. Once you see your hosting provider's IP address from most locations, propagation is complete.

## Step 6: Verify the Connection

Once DNS has propagated:
1. Open a private/incognito browser window
2. Type your domain name in the address bar
3. You should see either your web host's default page or your website

## Using A Records Instead of Nameservers

If you want to keep your domain's DNS at the registrar (useful if you're using the registrar's email), use an **A Record** instead:

1. Stay in your registrar's DNS settings
2. Find the **A Record** for `@` (root domain)
3. Point it to your hosting server's **IP address**
4. Add another A Record for `www` pointing to the same IP
5. Propagation still applies (24–48 hours)

This method is common with Cloudways, which provides a public IP for each server.

## Host-Specific Notes

**Hostinger:** The fastest option is buying your domain through Hostinger — DNS connects automatically. For external domains, go to **Hosting → Manage → DNS / Nameservers** for your nameserver addresses.

**Cloudways:** Cloudways doesn't use traditional nameservers. Point your domain's A Record directly to your server's IP address found under **Application Access Details**.

**Bluehost:** After updating nameservers, Bluehost automatically installs an SSL certificate and configures your hosting once propagation completes.

**SiteGround:** SiteGround provides nameservers in your welcome email and in **Client Area → Websites → [your site] → DNS Settings**.

## Troubleshooting

**Domain shows "This site can't be reached":**
- DNS hasn't propagated yet — wait longer and check dnschecker.org
- You may have entered nameservers with a typo — double-check

**Domain shows old hosting / old site:**
- Your browser cached the old DNS — clear your browser cache or use private mode
- Try a different device or mobile data connection

**Domain shows the registrar's parking page:**
- Nameservers weren't saved correctly — go back and verify the settings

## Next Steps After Connecting Your Domain

Once your domain is pointing to your hosting:

1. **Install an SSL certificate** — see our [SSL setup guide](/tutorials/how-to-set-up-ssl)
2. **Install WordPress** — see our [WordPress installation guide](/tutorials/how-to-install-wordpress)
3. **Set up business email** — see our [email setup guide](/tutorials/how-to-set-up-email)

Connecting a domain is a one-time task. Once it's done, your domain is permanently linked to your hosting until you decide to change it.

---

**Ready to get started?** [Hostinger](https://www.hostinger.com/web-hosting?REFERRALCODE=OFMBZTOPRZSU) makes domain connection automatic when you purchase both domain and hosting together — the fastest way to get online.

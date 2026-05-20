---
title: "How to Fix WordPress Email (Set Up SMTP) – 2026 Guide"
excerpt: "WordPress email not sending? Set up SMTP with WP Mail SMTP and a free service like Brevo or Gmail to ensure contact forms, order emails, and notifications always deliver."
date: "2026-05-20"
readTime: "6 min read"
difficulty: "beginner"
tags: ["smtp", "email", "wordpress", "wp mail smtp", "contact form"]
lastModified: "2026-05-20"
steps:
  - name: "Install WP Mail SMTP"
    text: "Go to Plugins > Add New, search for WP Mail SMTP by WPForms, install and activate it. This is the most popular WordPress SMTP plugin with 3M+ installs."
  - name: "Choose an SMTP provider"
    text: "Select a free SMTP service. Brevo (300 emails/day free), SendGrid (100 emails/day free), or Gmail (for personal sites) are the best free options."
  - name: "Create SMTP credentials"
    text: "Sign up for your chosen SMTP service and generate API keys or SMTP credentials from their dashboard."
  - name: "Configure WP Mail SMTP"
    text: "In WordPress, go to WP Mail SMTP > Settings. Enter your From Email, From Name, choose your mailer, and enter the credentials from step 3."
  - name: "Send a test email"
    text: "In WP Mail SMTP, go to the Email Test tab. Enter a test recipient email and click Send Test. Verify the email arrives in your inbox."
---

By default, WordPress uses PHP's `mail()` function to send emails. Most shared hosting servers block or restrict this function because spammers abuse it, which means contact form submissions, order confirmations, and password reset emails never arrive.

SMTP (Simple Mail Transfer Protocol) sends email through a proper mail server with authentication — solving the delivery problem.

## Why WordPress Emails Fail

- **PHP mail() blocked:** Most hosts (especially Cloudways) block PHP mail by default
- **Spam filtering:** Emails sent without proper authentication land in spam or get blocked
- **No DKIM/SPF records:** Without these DNS records, your emails fail deliverability checks
- **Shared hosting IP reputation:** Shared hosting IPs are often blacklisted from prior abuse

The fix: bypass PHP mail entirely and use a dedicated SMTP service with proper authentication.

## Best Free SMTP Services for WordPress

| Service | Free Tier | Best For |
|---------|-----------|----------|
| **Brevo (Sendinblue)** | 300 emails/day | General use, transactional + marketing |
| **SendGrid** | 100 emails/day | Developers, high volume |
| **Mailgun** | 1,000 emails/month (3-month trial) | Technical users |
| **Gmail SMTP** | Unlimited | Personal sites only |
| **Postmark** | 100 emails/month | Transactional emails |

**Recommendation:** Brevo for most sites. 300 emails/day is enough for small and medium sites, and their setup is the simplest.

## Step 1: Install WP Mail SMTP

1. In WordPress admin, go to **Plugins → Add New**
2. Search for **WP Mail SMTP** (by WPForms — the most downloaded version)
3. Click **Install Now** → **Activate**
4. A setup wizard launches — click **Let's Get Started** or go to **WP Mail SMTP → Settings**

## Step 2: Get SMTP Credentials

### Option A: Brevo (Recommended)

1. Go to [brevo.com](https://www.brevo.com) and create a free account
2. Verify your email address
3. In the Brevo dashboard, go to **SMTP & API** (top right menu)
4. Under **SMTP**, you'll see:
   - **SMTP Server:** `smtp-relay.brevo.com`
   - **Port:** `587`
   - **Login:** your Brevo account email
   - **Password:** the SMTP password shown (generate one if not shown)

### Option B: SendGrid

1. Go to [sendgrid.com](https://sendgrid.com) and create a free account
2. Verify your sender identity (add your domain)
3. Go to **Settings → API Keys → Create API Key**
4. Give it "Mail Send" permission
5. Copy the API key (you won't see it again)

### Option C: Gmail SMTP (For Personal Sites Only)

**Warning:** Using Gmail SMTP with your personal account ties your site's email to your Gmail. Not recommended for business use.

1. Enable 2-Step Verification on your Google account
2. Go to Google Account → Security → **App passwords**
3. Create an app password for "WordPress"
4. Save the 16-character password

**Gmail SMTP settings:**
- Server: `smtp.gmail.com`
- Port: 587
- Encryption: TLS
- Username: your Gmail address
- Password: the app password (not your Gmail login)

**Important:** Gmail limits SMTP to 500 emails/day per account.

## Step 3: Configure WP Mail SMTP

Go to **WP Mail SMTP → Settings → General** tab:

**From Email:** Enter the email address WordPress will send from.
- For Brevo/SendGrid: use a professional address like `noreply@yourdomain.com`
- For Gmail: use your Gmail address

**From Name:** The display name recipients see (e.g., "YourSite Notifications" or your company name)

**Mailer:** Select your SMTP provider:
- **Brevo:** Select "Brevo" (has dedicated integration)
- **SendGrid:** Select "SendGrid" (dedicated integration, just paste API key)
- **Gmail:** Select "Gmail"
- **Other:** Select "Other SMTP" and enter settings manually

**For Brevo manual configuration (Other SMTP):**
```
SMTP Host: smtp-relay.brevo.com
Encryption: TLS
SMTP Port: 587
Authentication: ON
SMTP Username: your Brevo account email
SMTP Password: your Brevo SMTP password
```

Click **Save Settings**.

## Step 4: Send a Test Email

1. In WP Mail SMTP, click the **Email Test** tab
2. In **Send To**, enter your personal email
3. Click **Send Test**
4. Check your inbox — you should receive a test email within a minute

If the test fails, click **Debug** to see the error message. Common errors:
- **Connection refused / timeout:** Wrong SMTP host or port
- **Authentication failed:** Wrong username or password
- **SSL certificate error:** Try changing encryption from SSL to TLS or vice versa

## Step 5: Set Up SPF and DKIM Records (Recommended)

SPF and DKIM records prove your emails are legitimate, improving deliverability and preventing your emails from landing in spam.

**Brevo SPF record:**
1. Go to Brevo → **Senders, Domains & Dedicated IPs → Domains**
2. Add your domain
3. Brevo shows you the DNS records to add (SPF, DKIM)
4. Add these records in your domain registrar's DNS settings
5. Brevo verifies them automatically

**What these records look like:**
```
Type: TXT
Host: @
Value: v=spf1 include:spf.sendinblue.com mx ~all
```

```
Type: TXT
Host: mail._domainkey
Value: (long DKIM key provided by Brevo)
```

DNS propagation takes 24–48 hours.

## Setting Up Email for WooCommerce

WooCommerce sends many emails: order confirmation, shipping notifications, admin new order alerts. All of these use WordPress's email system, so SMTP fixes them automatically.

**Verify WooCommerce emails are working:**
1. In WordPress, go to **WooCommerce → Settings → Emails**
2. Click on any email type (e.g., **New Order**)
3. Click **Send test email** (enter recipient)
4. Verify delivery

**Common WooCommerce email setting:**
- **From Address:** Your store's email (should match your SMTP From Email)
- **From Name:** Your store name

## Troubleshooting SMTP Issues

**Test email arrives but contact form emails don't:**
The contact form plugin may have its own "From" email setting. In WPForms or Contact Form 7, ensure the From Email matches your configured SMTP From Email.

**Emails land in spam:**
- Set up SPF and DKIM records for your domain
- Avoid spam trigger words in email subjects
- Ensure your "From" domain matches your actual domain (not a free Gmail)

**"SMTP Authentication Failed" error:**
- For Gmail: ensure you're using an App Password, not your regular Gmail password
- For Brevo: use the SMTP-specific password, not your Brevo account login password
- For SendGrid: use the full API key, not the API key ID

**Cloudways email not sending:**
Cloudways blocks PHP mail by default. SMTP is the required solution. Follow the Brevo setup above — Cloudways also offers an Elastic Email add-on in their Add-Ons section.

---

**Hosting on Hostinger?** Hostinger includes email hosting with business hosting plans — you can create `you@yourdomain.com` addresses directly in hPanel. For other providers, [Hostinger Business](https://www.hostinger.com/web-hosting?REFERRALCODE=OFMBZTOPRZSU) starts at $3.99/month with email included.

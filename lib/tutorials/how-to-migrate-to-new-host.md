---
title: "How to Migrate Any Website to a New Host: WordPress, HTML, PHP & cPanel Transfer (2026)"
excerpt: "Not just WordPress — migrate HTML sites, PHP apps, or entire cPanel accounts to a new host without downtime. Covers all platforms, cPanel Transfer Tool, and the DNS timing strategy that eliminates downtime."
date: "2026-05-20"
readTime: "10 min read"
difficulty: "intermediate"
tags: ["website migration", "cpanel transfer", "html site migration", "migrate hosting", "dns migration", "hostinger", "cloudways"]
lastModified: "2026-05-20"
steps:
  - name: "Back up your current site"
    text: "Before touching anything, create a full backup of your site files and database. Use UpdraftPlus, your host's built-in backup, or download via FTP + phpMyAdmin export."
  - name: "Set up new hosting account"
    text: "Sign up for your new host and create a hosting plan. Don't point your domain yet — you'll test on the new server first."
  - name: "Copy files and database to new host"
    text: "Use All-in-One WP Migration plugin, Duplicator, or manual FTP + phpMyAdmin to copy all site files and your database to the new hosting account."
  - name: "Test the site on new host"
    text: "Use the new host's temporary URL or edit your hosts file to preview the site before changing DNS. Verify all pages, forms, and media load correctly."
  - name: "Update DNS to point to new host"
    text: "Once the site is verified on the new host, update your domain's nameservers or A Record to point to the new server. Propagation takes 1-48 hours."
  - name: "Verify live and cancel old hosting"
    text: "After DNS propagates and your site is live on the new host, wait 48 hours then cancel your old hosting. Download a final backup from the old host first."
author: marcus
---

Migrating a website to a new host sounds intimidating but it's a straightforward process when done in the right order. The key is to set up everything on the new host before changing DNS — so you can test thoroughly before going live.

## Before You Start

**Why are you migrating?**
- Moving to faster/cheaper hosting → plan migration carefully to minimize downtime
- Moving from shared to cloud hosting → use this guide for full site migration
- Host cancellation → urgent migration, follow the same steps but faster

**What you'll need:**
- Access to old hosting account (FTP or File Manager)
- Access to old hosting phpMyAdmin or cPanel database tools
- New hosting account already set up
- Access to your domain registrar

## Step 1: Create a Full Backup

**Never start a migration without a backup.** If anything goes wrong, you need to restore quickly.

**Using UpdraftPlus (recommended):**
1. Install and activate **UpdraftPlus** on WordPress
2. Go to **Settings → UpdraftPlus Backups**
3. Click **Backup Now**
4. Select **Include database** and **Include files**
5. Download the backup files after completion (store locally or in Google Drive)

**Manual backup:**
1. **Files:** Connect via FTP, download the entire `public_html` folder
2. **Database:** Go to cPanel → phpMyAdmin, select your database, click **Export**, choose SQL format, click **Go**

## Step 2: Set Up New Hosting

Sign up for your new hosting account and install WordPress (or prepare the empty hosting environment).

**For Cloudways:**
1. Create your server and application (see our [Cloudways setup guide](/tutorials/how-to-set-up-cloudways))
2. Note your application's temporary URL (e.g., `yourdomain.temp.cloudwaysapps.com`)
3. Access the WordPress admin at the temp URL

**For Hostinger/Bluehost/SiteGround (cPanel-based):**
1. Log in to the new hosting account
2. Install a fresh WordPress via Softaculous (we'll overwrite it)
3. Note the temporary/default URL before DNS is pointed

## Step 3: Choose Your Migration Method

### Method A: All-in-One WP Migration Plugin (Easiest)

Perfect for sites under 512MB (free limit).

**On your OLD site:**
1. Install **All-in-One WP Migration**
2. Go to **All-in-One WP Migration → Export**
3. Click **File** to export to a downloadable archive
4. Download the `.wpress` file

**On your NEW site:**
1. Install **All-in-One WP Migration** on the new WordPress
2. Go to **All-in-One WP Migration → Import**
3. Click **Import From → File**
4. Upload the `.wpress` file
5. Wait for import to complete (can take minutes for large sites)
6. The plugin will update all URLs automatically
7. Flush permalinks: **Settings → Permalinks → Save Changes**

**For sites over 512MB:** The Pro version ($69) removes the file size limit. Alternatively, use Duplicator (free up to any size with some configuration).

### Method B: Duplicator Plugin

Better for large sites or when you need precise control.

**On your OLD site:**
1. Install **Duplicator** plugin
2. Go to **Duplicator → Packages → Create New**
3. Name it and click **Next** → **Build**
4. Download both the **Installer** file (`installer.php`) and **Archive** file (`yourdomain.zip`)

**On your NEW site:**
1. Upload both files to your new hosting's `public_html/` via FTP or File Manager
2. Visit `newdomain.com/installer.php` in your browser
3. Follow the installation wizard:
   - Enter your new hosting's database credentials
   - Confirm the URL change
   - Click **Run Deployment**
4. Delete `installer.php` and `installer-log.txt` after completing

### Method C: Manual Migration (Most Control)

Best for developers or when plugins fail.

**Transfer files:**
1. Download your old site's `public_html/` via FTP
2. Upload to new host's `public_html/` via FTP

**Transfer database:**
1. On old host: cPanel → phpMyAdmin → select database → **Export** → SQL
2. On new host: Create a new MySQL database + user in cPanel → MySQL Databases
3. cPanel → phpMyAdmin → select new database → **Import** → upload SQL file
4. Update `wp-config.php` on new host with new database credentials

**Update URLs in database:**
WordPress stores the old domain in the database. Update with WP-CLI or SQL:
```sql
UPDATE wp_options SET option_value = replace(option_value, 'http://oldsite.com', 'http://newsite.com') WHERE option_name = 'home' OR option_name = 'siteurl';
UPDATE wp_posts SET guid = replace(guid, 'http://oldsite.com', 'http://newsite.com');
UPDATE wp_posts SET post_content = replace(post_content, 'http://oldsite.com', 'http://newsite.com');
UPDATE wp_postmeta SET meta_value = replace(meta_value, 'http://oldsite.com', 'http://newsite.com');
```

Or use the **Better Search Replace** plugin (simpler, no SQL knowledge needed).

## Step 4: Test the Site on New Hosting

Before changing DNS, test your site on the new server.

**Method A — Temporary URL:**
Your new host likely provides a temporary URL. Log in to WordPress at `temp.domain.com/wp-admin` and verify:
- All pages load
- Images display
- Navigation works
- Forms function
- WooCommerce (if applicable) works end-to-end

**Method B — Edit your hosts file (local preview):**
Your local `hosts` file lets you preview the site at your real domain before DNS changes:

**Windows:** Edit `C:\Windows\System32\drivers\etc\hosts`
**Mac/Linux:** Edit `/etc/hosts`

Add this line (replace IP with your new host's IP):
```
123.456.789.012   yourdomain.com
```

Now visiting `yourdomain.com` on your computer goes to the new host while everyone else still sees the old host. Remove this line after DNS propagates.

## Step 5: Reduce DNS TTL (Optional but Helpful)

**24+ hours before migration:** Lower your domain's DNS TTL to 300 seconds (5 minutes).

This means DNS changes will propagate in 5 minutes instead of 24–48 hours, dramatically reducing the time when some visitors hit the old server and some hit the new server.

Find TTL in your registrar's DNS settings. Not all registrars allow changing TTL.

## Step 6: Point Domain to New Host

Once you've verified the site on the new host:

**Option A — Update Nameservers:**
Change your domain's nameservers to your new host's nameservers. Takes 1–24 hours to propagate.

**Option B — Update A Record (faster):**
Change the A Record for `@` and `www` to point to your new host's IP. With reduced TTL, propagates in 5 minutes.

## Step 7: Post-Migration Checklist

After DNS propagates:

- [ ] Visit your domain — it should load from the new host
- [ ] Log in to WordPress admin
- [ ] Test all pages, posts, and media
- [ ] Test contact forms
- [ ] Check SSL certificate (should auto-install on new host)
- [ ] Check email (if hosted — may need separate configuration on new host)
- [ ] Run a speed test on the new host
- [ ] Check Google Search Console for crawl errors
- [ ] Set up backups on the new host

## Step 8: Cancel Old Hosting

Wait **at least 48 hours** after DNS propagation before canceling old hosting. This ensures any remaining visitors hitting the old server are negligible.

Before canceling:
1. Download a final backup from the old host
2. Export all email if you hosted email there
3. Transfer any email archives

Most hosts offer a grace period — you can usually re-enable within 30 days if something goes wrong.

## Common Migration Issues

**Images not loading after migration:**
Run a search-replace for the old domain URL in the database. Use **Better Search Replace** plugin — check both `http://` and `https://` variants.

**WordPress admin not accessible:**
Update URLs in `wp-config.php`:
```php
define( 'WP_HOME', 'https://yourdomain.com' );
define( 'WP_SITEURL', 'https://yourdomain.com' );
```

**SSL certificate not working:**
Install SSL on the new host (usually via cPanel → SSL/TLS or your host's dashboard). Let's Encrypt SSL is free and installs in seconds on most hosts.

**Email stopped working:**
If your email was hosted with your old provider, configure email separately. Cloudways and cloud hosts don't include email — use Google Workspace, Zoho Mail, or your registrar's email hosting.

---

## Migrating Non-WordPress Sites

### HTML / Static Sites

The simplest migration: no database, no URLs to update.

1. Download all files from old host via FTP (FileZilla, Cyberduck)
2. Upload to new host's `public_html/` via FTP
3. Test on new host's temporary URL
4. Update DNS

**Common gotcha:** Check for absolute URLs in your HTML that reference your old domain (e.g., `<a href="http://olddomain.com/about">`) — these need manual updating.

### PHP Sites (Non-WordPress: Laravel, CodeIgniter, Custom PHP)

1. Download all PHP files via FTP
2. Export any MySQL databases via phpMyAdmin
3. Import databases on new host
4. Upload PHP files to new host
5. Update `.env` file or config file with new database credentials
6. Test on temporary URL
7. Update DNS

**Key difference from WordPress:** PHP frameworks store database credentials in their own config files (`.env` for Laravel, `config/database.php`, etc.) — not `wp-config.php`. Find the correct config file for your framework.

### cPanel Transfer Tool (Fastest Full Account Migration)

If both old and new host use cPanel, you can transfer everything at once:

**On new host (cPanel → Transfers):**
1. Log in to new host's cPanel
2. Go to **Transfer Tool** (or "Transfer Websites" in some versions)
3. Enter old host's cPanel login URL, username, and password
4. Select which domains/databases/email accounts to transfer
5. Click **Copy**

The tool copies all files, databases, email accounts, and DNS zones automatically. Best option for migrating multiple sites at once.

**Hosts that support cPanel Transfer Tool:** SiteGround, Hostinger (with cPanel add-on), A2 Hosting, DreamHost, Bluehost.

**Hosts that DON'T use cPanel:** Kinsta, WP Engine, Cloudways — require manual migration or their own migration tools.

### Free Migration Services by Host

| Host | Free Migration? | Method | Turnaround |
|------|----------------|--------|-----------|
| **Hostinger** | ✓ 1 free migration | Support team | 24–48 hours |
| **SiteGround** | ✓ 1 free migration | Migration plugin | 24 hours |
| **Cloudways** | ✓ Unlimited | Support team | 2–4 hours |
| **WP Engine** | ✓ Unlimited | Migration plugin + team | 1–24 hours |
| **Kinsta** | ✓ Limited free | Support team | 24 hours |
| **DreamHost** | ✗ | Self-service | DIY |
| **Bluehost** | ✗ (paid service) | $149 service | 1–3 days |

**Thinking about migrating to Cloudways?** [Cloudways](https://www.cloudways.com/en/?id=2170350) offers a free migration service — their support team will move your site for you when you sign up.

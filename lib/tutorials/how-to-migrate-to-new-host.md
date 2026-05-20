---
title: "How to Migrate Your Website to a New Host (Zero Downtime Guide)"
excerpt: "Move your WordPress site to a new hosting provider without any downtime or data loss. Step-by-step guide covering plugin migration, manual migration, and DNS cutover timing."
date: "2026-05-20"
readTime: "9 min read"
difficulty: "intermediate"
tags: ["migration", "wordpress", "hosting", "dns", "cloudways", "hostinger"]
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

**Thinking about migrating to Cloudways?** [Cloudways](https://www.cloudways.com/en/?id=2170350) offers a free migration service — their support team will move your site for you when you sign up.

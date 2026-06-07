---
title: "How to Back Up Your WordPress Site (Free & Automatic Methods)"
excerpt: "Never lose your WordPress site again. We show you three backup methods — using your host, a free plugin, and manually — with step-by-step instructions for each."
date: "2026-05-20"
readTime: "7 min read"
difficulty: "beginner"
tags: ["wordpress backup", "backup website", "updraftplus", "site backup", "wordpress safety"]
steps:
  - name: "Check if your host backs up automatically"
    text: "Log in to your hosting panel and check if automatic backups are enabled. Hostinger (Premium+) backs up weekly. Cloudways backs up daily. WP Engine backs up daily and stores for 30 days. These are your safety net — but not enough on their own."
  - name: "Install UpdraftPlus (free)"
    text: "Install the free UpdraftPlus plugin from the WordPress plugin directory. It's the most trusted backup plugin with 3 million+ active installs. Activate it and go to Settings > UpdraftPlus Backups."
  - name: "Configure remote storage"
    text: "In UpdraftPlus settings, choose a remote storage destination: Google Drive, Dropbox, Amazon S3, or OneDrive (all free). Never store backups only on your hosting server — if the server fails, your backups are lost too."
  - name: "Set your backup schedule"
    text: "Configure files to back up weekly and database to back up daily. For e-commerce or high-activity sites, back up both daily. Click 'Save Changes' to activate the schedule."
  - name: "Run your first manual backup"
    text: "Go to UpdraftPlus > Backup Now. Check both 'Database' and 'Files'. Click 'Backup Now'. Your first backup will run immediately. Verify it appears in your remote storage (Google Drive, etc.)."
  - name: "Test your backup by restoring"
    text: "A backup you've never tested is not a backup. Set up a staging site (or use Hostinger's test environment) and restore your backup to confirm it works before you ever need it in an emergency."
author: marcus
---

The only thing worse than losing your website is realizing you have no backup when it happens. Backups take 5 minutes to set up and can save you weeks of lost work.

## The 3-2-1 Backup Rule

Follow the professional standard:
- **3** copies of your data
- **2** different storage types (e.g., hosting server + cloud storage)
- **1** offsite copy (Google Drive, Dropbox, or Amazon S3)

UpdraftPlus + remote storage gives you this automatically.

## What Gets Backed Up

A complete WordPress backup includes:
- **Database:** all your posts, pages, settings, user accounts, comments
- **wp-content folder:** your theme, plugins, and uploaded images
- **wp-config.php:** your database credentials (critical)

## Backup Options Compared

| Method | Cost | Frequency | Effort |
|--------|------|-----------|--------|
| Host automatic backup | Free (most plans) | Weekly/daily | None |
| UpdraftPlus (free) | Free | Custom schedule | 5 min setup |
| UpdraftPlus Premium | $70/year | Incremental | Easy |
| Jetpack Backup | $9.95/mo | Real-time | Easy |
| Manual (FTP + phpMyAdmin) | Free | Manual | High |

## How to Restore a Backup

**Using UpdraftPlus:**
1. Go to Settings > UpdraftPlus Backups
2. Click the backup you want to restore
3. Click Restore
4. Select what to restore (database, plugins, themes, uploads)
5. Click Restore — process takes 5–15 minutes

**For catastrophic failures** (site completely down):
1. Re-install WordPress fresh on your host
2. Install UpdraftPlus
3. Connect your remote storage
4. Import the backup file and restore

## What About Your Host's Built-in Backups?

Host backups are convenient but shouldn't be your only protection:
- **Hostinger:** 7-day or 30-day backups (plan-dependent)
- **Cloudways:** Daily automated off-server backups
- **WP Engine:** Daily backups, 30-day retention
- **Bluehost:** Weekly CodeGuard backup (paid add-on)

Use host backups as a secondary layer, not your primary protection.

## Related Articles

- [WordPress Security Basics](/tutorials/wordpress-security-basics)
- [How to Migrate WordPress to a New Host](/tutorials/how-to-migrate-wordpress)
- [Hostinger Review 2026](/blog/hostinger-review-2026)

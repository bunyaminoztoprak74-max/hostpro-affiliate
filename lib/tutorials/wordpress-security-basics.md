---
title: "WordPress Security: Protect Your Site from Hackers (2026 Guide)"
excerpt: "Essential security steps every WordPress site owner needs. From strong passwords to two-factor authentication — protect your site in under an hour, no coding required."
date: "2026-05-20"
readTime: "7 min read"
difficulty: "beginner"
tags: ["wordpress", "security", "hacking", "wordfence", "2fa", "backup"]
steps:
  - name: "Keep WordPress, themes, and plugins updated"
    text: "Enable auto-updates for WordPress security releases. Update themes and plugins weekly — most hacks exploit known vulnerabilities in outdated software that haven't been patched."
  - name: "Use strong, unique passwords"
    text: "Use a free password manager like Bitwarden to generate and store 16+ character passwords for your WordPress admin, hosting panel, and database. Never reuse passwords."
  - name: "Install Wordfence Security"
    text: "Install the free Wordfence plugin and enable the Web Application Firewall (WAF). Run a full malware scan and set up email alerts for failed logins and suspicious activity."
  - name: "Enable two-factor authentication"
    text: "Use Wordfence's built-in 2FA or the WP 2FA plugin. Add two-factor authentication to your admin account using Google Authenticator or Authy on your phone."
  - name: "Set up automated backups"
    text: "Install UpdraftPlus and configure daily backups to Google Drive or Dropbox. Test restoring a backup at least once to confirm it actually works before you need it in an emergency."
  - name: "Harden your login page"
    text: "Change your admin username from 'admin' to something unique. Install Limit Login Attempts Reloaded to block brute force bots that try thousands of password combinations."
author: marcus
---

WordPress powers 43% of all websites on the internet — which makes it the #1 target for automated hacking bots. These bots aren't targeting you personally; they're scanning millions of sites simultaneously looking for known weaknesses.

The good news: **95% of WordPress hacks are preventable** with the six steps in this guide. None of them require coding knowledge.

## How WordPress Sites Get Hacked

Most attacks fall into three categories:

1. **Outdated software** — Plugins and themes with publicly known security holes that haven't been patched
2. **Weak passwords** — Automated tools try thousands of password combinations against `/wp-admin` in minutes
3. **Pirated (nulled) plugins** — Free versions of premium plugins from shady sites that contain hidden malware

Avoid all three and you're ahead of the vast majority of WordPress sites.

## Step 1: Keep Everything Updated

Every WordPress, plugin, and theme update patches security vulnerabilities. Hackers specifically target sites running outdated versions because exploits are publicly documented.

**Enable automatic updates:**
1. Go to **Dashboard → Updates** in WordPress admin
2. Click **Enable automatic updates** for WordPress core
3. For each plugin in your plugins list, click **Enable auto-updates**
4. Under **Appearance → Themes**, click **Enable auto-updates** for each theme

For major WordPress version updates (e.g. 6.4 → 6.5), read the release notes first. Most minor updates (security patches) are completely safe to auto-update.

> **Tip:** Schedule 10 minutes every Monday to check for any updates that didn't auto-update and apply them manually.

## Step 2: Use Strong, Unique Passwords

Your admin password is the key to your entire website. A 6-character password can be cracked in seconds. A 16-character random password would take centuries.

**Requirements for every password:**
- 16+ characters minimum
- Mix of uppercase, lowercase, numbers, and symbols
- Never reused from another site or service
- Never something guessable (your name, site name, "password123")

**Use Bitwarden (free password manager):**
[Bitwarden](https://bitwarden.com) is free, open-source, and generates strong passwords automatically. You only need to remember one master password.

**Change your passwords now:**
- WordPress admin: **Users → Your Profile → New Password** (use WordPress's strong password generator)
- Hosting panel: change in your host's account settings
- Email account: change this separately since password resets go to email

## Step 3: Install and Configure Wordfence

Wordfence is the most popular WordPress security plugin with 5+ million active installations. The free version includes a Web Application Firewall and malware scanner.

**Setup:**
1. Go to **Plugins → Add New**, search "Wordfence Security"
2. Install and activate
3. Go to **Wordfence → Dashboard** and get a free license
4. Click **Scan** to run your first malware scan — fix any critical issues found
5. Go to **Wordfence → Firewall**, click **Manage WAF**, and set to **Enabled and Protecting**

**Configure email alerts:**
Go to **Wordfence → All Options → Email Alert Preferences** and enable:
- Admin user login
- Non-admin user login (for sites with multiple users)
- Failed login alerts (set threshold to 20+/hour to avoid noise)

## Step 4: Enable Two-Factor Authentication

Two-factor authentication (2FA) means that even if someone steals your password, they still can't log in without your phone. This single step blocks 99.9% of automated account takeover attacks.

**Enable via Wordfence (easiest method):**
1. Go to **Wordfence → Login Security**
2. Download **Google Authenticator** or **Authy** on your smartphone
3. Open the app and scan the QR code shown on the Wordfence screen
4. Enter the 6-digit code to confirm the connection
5. **Save your recovery codes** somewhere safe — you'll need them if you lose your phone

2FA is now active. Every login will require your password + a fresh 6-digit code from your phone.

## Step 5: Set Up Automated Backups

Backups are your last line of defense. If your site is hacked or corrupted despite all precautions, a recent backup means you can restore everything in minutes rather than rebuilding from scratch.

**Install UpdraftPlus (free):**
1. Search "UpdraftPlus" in the plugin directory, install and activate
2. Go to **Settings → UpdraftPlus Backups → Settings tab**
3. Set backup frequency: **Daily** for both files and database
4. Choose remote storage: **Google Drive** or **Dropbox** (both free)
5. Click **Save Changes**

**Test your backup NOW:**
1. Click **Backup Now** to create a manual backup
2. Download a copy to your local computer
3. If you have a staging site, test restoring it there

A backup you've never tested may not work when you need it most. Test yours.

**Backup storage rules:**
- Always keep backups in a different location than your website (not on your hosting server)
- Keep at least 7 days of backups so you can roll back before an infection began
- Keep one long-term backup (30 days) for catastrophic cases

## Step 6: Harden Your Login Page

The default WordPress login at `/wp-admin` is targeted by automated bots around the clock. Every hosting server sees hundreds or thousands of login attempts per day.

### Change Your Admin Username

If your username is "admin", you're making hackers' jobs easier:

1. Create a new account: go to **Users → Add New**
2. Set the role to **Administrator**, choose a unique username
3. Log out, log in as the new user
4. Delete the old "admin" user — when prompted, assign their posts to your new account

### Limit Login Attempts

1. Install **Limit Login Attempts Reloaded** from the plugin directory
2. Activate it — works immediately with sensible defaults (3 attempts, then 20-minute lockout)
3. Check **Dashboard → Limit Login Attempts** to see blocked IPs

### (Optional) Change the Login URL

The **WPS Hide Login** plugin lets you change `/wp-login.php` to a custom URL like `/my-portal-2026`. This stops bots from even finding your login page.

After installing, go to **Settings → WPS Hide Login** and set your custom URL. Write it down — if you forget it, you'll need FTP access to your server to recover.

## Step 7: Use HTTPS (Free SSL)

All reputable hosts now include free SSL certificates. HTTPS encrypts data between your site and visitors — critical for trust and for Google rankings.

**Check your SSL status:**
- Visit your site — the browser should show a padlock icon
- The URL should start with `https://`

**If you need SSL:**
1. Go to your hosting control panel
2. Find **SSL/TLS** or **Free SSL** (often under Security)
3. Issue a Let's Encrypt certificate — it's free and automatic
4. Install the **Really Simple SSL** plugin to redirect all traffic to HTTPS

## Security Checklist

- ✅ WordPress, all themes, and all plugins are up to date
- ✅ Strong, unique passwords for admin, hosting, and email accounts
- ✅ Wordfence installed with firewall enabled
- ✅ Two-factor authentication active on admin account
- ✅ Daily backups to Google Drive or Dropbox (and tested)
- ✅ Admin username changed from "admin"
- ✅ Login attempts limited
- ✅ HTTPS/SSL active on your domain

## What to Do If You Get Hacked

Even well-protected sites can occasionally get compromised. If you suspect a hack:

1. **Take the site offline** — contact your host to temporarily suspend the site
2. **Run a Wordfence scan** — identify and remove malware files
3. **Restore from backup** — the safest option if malware is widespread
4. **Change all passwords** — WordPress admin, hosting panel, FTP, and database
5. **Contact your host's support** — they often have security teams who help

[Cloudways](/blog/cloudways-review-2026) and [WP Engine](/compare/cloudways-vs-wpengine) include hack-fix assistance and malware removal for managed WordPress customers.

---

*Not sure which WordPress host is the most secure? [Take our quiz](/quiz) to get a personalized recommendation.*

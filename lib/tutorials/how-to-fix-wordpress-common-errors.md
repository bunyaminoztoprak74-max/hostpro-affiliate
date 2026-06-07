---
title: "How to Fix the Most Common WordPress Errors (2026)"
excerpt: "Step-by-step fixes for the most frequent WordPress errors: white screen of death, 500 internal server error, 404 not found, database connection error, and more."
date: "2026-05-20"
readTime: "10 min read"
difficulty: "intermediate"
tags: ["wordpress", "errors", "troubleshooting", "debugging", "white screen"]
lastModified: "2026-05-20"
steps:
  - name: "Enable WordPress debug mode"
    text: "Add WP_DEBUG true to your wp-config.php file to see detailed error messages instead of blank pages. This is always the first diagnostic step."
  - name: "Deactivate all plugins"
    text: "Plugins cause the majority of WordPress errors. Rename the plugins folder via FTP or File Manager to deactivate all plugins at once, then reactivate one by one to find the culprit."
  - name: "Switch to a default theme"
    text: "If deactivating plugins doesn't fix the error, switch to a default WordPress theme (Twenty Twenty-Three) to rule out a theme conflict."
  - name: "Check error logs"
    text: "Your hosting control panel's error logs (cPanel > Metrics > Errors) show PHP errors with file names and line numbers — much faster than guessing."
  - name: "Increase PHP memory limit"
    text: "Many errors are caused by insufficient PHP memory. Add define('WP_MEMORY_LIMIT', '256M') to wp-config.php to increase the limit."
author: marcus
---

WordPress is reliable, but errors happen — usually after a plugin update, theme change, or hosting migration. Most errors have straightforward fixes once you know where to look.

## Essential First Step: Enable Debug Mode

Before troubleshooting any error, enable WordPress debug mode to see the actual error message.

Open `wp-config.php` in your hosting File Manager and find this line:
```php
define( 'WP_DEBUG', false );
```

Change it to:
```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
```

This writes errors to `wp-content/debug.log` without showing them to visitors. Check this file for exact error messages after reloading the problem page.

---

## Error 1: White Screen of Death (WSoD)

**Symptoms:** The page is completely blank — no content, no error message.

**Most common causes:** PHP memory exhausted, fatal plugin/theme error, corrupted file.

### Fix 1: Increase PHP Memory Limit

In `wp-config.php`, add before the `/* That's all, stop editing! */` line:
```php
define( 'WP_MEMORY_LIMIT', '256M' );
```

### Fix 2: Deactivate All Plugins

1. Log in to your hosting **File Manager** (cPanel → File Manager)
2. Navigate to `public_html/wp-content/`
3. Right-click the `plugins` folder → **Rename** to `plugins_backup`
4. Reload your site — if the white screen is gone, a plugin caused it
5. Rename the folder back to `plugins`
6. Reactivate plugins one by one in WordPress admin to find the culprit

### Fix 3: Switch to Default Theme

1. In File Manager, navigate to `public_html/wp-content/themes/`
2. Rename your active theme folder (e.g., `mytheme` → `mytheme_backup`)
3. WordPress will fall back to the default theme (Twenty Twenty-Three)
4. If the site loads, your theme caused the error

### Fix 4: Check PHP Version Compatibility

If you recently upgraded PHP, an old plugin or theme may be incompatible:
1. In cPanel → **Software → PHP Version**, downgrade to the previous PHP version
2. If the site loads again, the issue is a PHP incompatibility
3. Update the conflicting plugin/theme, then upgrade PHP again

---

## Error 2: Internal Server Error (500)

**Symptoms:** "500 Internal Server Error" page — the server encountered an unexpected condition.

### Fix 1: Deactivate Plugins

Same process as WSoD Fix 2 — rename the plugins folder.

### Fix 2: Restore `.htaccess` File

A corrupt `.htaccess` file is a common cause of 500 errors.

1. In File Manager, navigate to `public_html/`
2. Find `.htaccess` (enable hidden files if not visible: Settings → Show Hidden Files)
3. Rename it to `.htaccess_old`
4. In WordPress admin, go to **Settings → Permalinks** and click **Save Changes** — this regenerates a clean `.htaccess`

### Fix 3: Check File Permissions

WordPress files should have `644` permissions, directories `755`.

In cPanel File Manager, right-click a folder → **Change Permissions**.

Or via SSH:
```bash
find /public_html -type f -exec chmod 644 {} \;
find /public_html -type d -exec chmod 755 {} \;
```

### Fix 4: Increase PHP Memory and Execution Time

Add to `wp-config.php`:
```php
define( 'WP_MEMORY_LIMIT', '256M' );
```

Add to `.htaccess`:
```
php_value memory_limit 256M
php_value max_execution_time 300
php_value upload_max_filesize 64M
php_value post_max_size 64M
```

---

## Error 3: Error Establishing a Database Connection

**Symptoms:** "Error establishing a database connection" on all pages.

This means WordPress can't connect to its MySQL database.

### Fix 1: Verify Database Credentials in wp-config.php

Open `wp-config.php` and check:
```php
define( 'DB_NAME', 'your_database_name' );
define( 'DB_USER', 'your_database_user' );
define( 'DB_PASSWORD', 'your_database_password' );
define( 'DB_HOST', 'localhost' );
```

Compare these against your actual database credentials in cPanel → **MySQL Databases**. Passwords are case-sensitive.

### Fix 2: Repair the Database

Add to `wp-config.php`:
```php
define( 'WP_ALLOW_REPAIR', true );
```

Then visit: `yourdomain.com/wp-admin/maint/repair.php`

Click **Repair and Optimize Database**. Remove the `WP_ALLOW_REPAIR` line afterward.

### Fix 3: Check if MySQL Service is Running

Contact your hosting support — the MySQL server may be down or overloaded. This is most common on shared hosting with high traffic. If it's a recurring issue, consider upgrading to a VPS or managed hosting like Cloudways.

---

## Error 4: 404 Not Found on Posts/Pages

**Symptoms:** Your homepage works but individual post/page URLs return 404.

**Cause:** Almost always a corrupted `.htaccess` file or wrong permalink settings.

### Fix: Regenerate Permalinks

1. Go to **Settings → Permalinks** in WordPress admin
2. Select your preferred permalink structure (Post name is recommended)
3. Click **Save Changes** — WordPress rewrites `.htaccess` automatically
4. Test your post URLs

If this doesn't work, recreate `.htaccess` manually (see 500 error fix above).

---

## Error 5: Too Many Redirects

**Symptoms:** Browser shows "This page isn't redirecting properly" or "ERR_TOO_MANY_REDIRECTS"

### Fix 1: Check WordPress URL Settings

In WordPress admin, go to **Settings → General** and verify:
- **WordPress Address (URL):** `https://yourdomain.com`
- **Site Address (URL):** `https://yourdomain.com`

If you recently enabled SSL, these must start with `https://` not `http://`.

### Fix 2: Check .htaccess for Redirect Loops

Open `.htaccess` and look for conflicting redirect rules. A common conflict:
```apache
# Bad — conflicts with WordPress rewrites
Redirect 301 / https://yourdomain.com/
```

Remove manual redirect rules that conflict with WordPress's built-in rewrites.

### Fix 3: Check Cloudflare SSL Mode

If using Cloudflare, a redirect loop often means SSL is misconfigured:
1. Go to Cloudflare → SSL/TLS
2. Set mode to **Full (Strict)** (not Flexible)
3. The Flexible mode causes redirect loops when WordPress forces HTTPS

---

## Error 6: WordPress Login Loop

**Symptoms:** You enter credentials, page refreshes, back to login screen — never logs in.

### Fix 1: Clear Browser Cookies

Clear your browser cookies for your domain and try again.

### Fix 2: Fix Cookie Path in wp-config.php

Add to `wp-config.php`:
```php
define( 'COOKIE_DOMAIN', '' );
define( 'COOKIEPATH', '' );
define( 'SITECOOKIEPATH', '' );
```

### Fix 3: Check WordPress URL Settings

If your site URL doesn't match the actual domain (e.g., it still has `http://` after enabling SSL), login cookies fail. Fix via wp-config.php:
```php
define( 'WP_HOME', 'https://yourdomain.com' );
define( 'WP_SITEURL', 'https://yourdomain.com' );
```

---

## Error 7: WordPress Updates Fail / Plugin Install Fails

**Symptoms:** "Update Failed" or "Installation failed: Could not create directory" when updating WordPress core, themes, or plugins.

### Fix 1: Check File Permissions

WordPress needs write access to update files. In cPanel → File Manager, check that `wp-content/` has `755` permissions and your hosting user owns the files.

### Fix 2: Fix FTP Credentials

If WordPress asks for FTP credentials when updating, add to `wp-config.php`:
```php
define( 'FS_METHOD', 'direct' );
```

This tells WordPress to write files directly without FTP. Works on most shared hosting environments.

### Fix 3: Increase Upload Size Limits

For large theme/plugin uploads, add to `.htaccess`:
```
php_value upload_max_filesize 64M
php_value post_max_size 64M
```

---

## Quick Reference: Error Diagnostic Checklist

| Error | First Check |
|-------|-------------|
| White Screen | Plugins → Rename plugins folder |
| 500 Error | `.htaccess` → Rename and regenerate |
| Database Error | `wp-config.php` credentials |
| 404 on posts | Settings → Permalinks → Save Changes |
| Redirect loop | WordPress URL settings + Cloudflare SSL mode |
| Login loop | Clear cookies + wp-config.php COOKIE_DOMAIN |
| Update fails | Add `FS_METHOD direct` to wp-config.php |

## Preventing Errors with Good Practices

- **Always back up before updates** — a pre-update backup is your insurance policy
- **Use a staging site** — test updates on staging before applying to production
- **Keep WordPress, themes, and plugins updated** — most security issues exploit outdated software
- **Choose quality plugins** — plugins with 1M+ installs and recent updates are less likely to cause conflicts

---

**Tired of dealing with server errors?** [Cloudways](https://www.cloudways.com/en/?id=2170350) and [Kinsta](https://kinsta.com) handle server management for you with automatic PHP updates and expert WordPress support available 24/7.

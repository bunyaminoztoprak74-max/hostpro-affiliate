---
title: "How to Optimize Your WordPress Database for Speed (2026)"
excerpt: "Clean and optimize your WordPress database to improve query performance, reduce disk usage, and fix slow admin dashboards. Covers WP-Optimize, manual cleanup, and scheduled maintenance."
date: "2026-05-20"
readTime: "6 min read"
difficulty: "intermediate"
tags: ["wordpress", "database", "optimization", "mysql", "performance"]
lastModified: "2026-05-20"
steps:
  - name: "Back up your database first"
    text: "Before any database optimization, create a backup. In phpMyAdmin, select your database and click Export. In UpdraftPlus, run a database-only backup."
  - name: "Install WP-Optimize plugin"
    text: "Install WP-Optimize from the WordPress plugin directory. It's the most trusted free database cleanup tool with 1M+ active installs."
  - name: "Clean post revisions, drafts, and spam"
    text: "In WP-Optimize, run cleanup for post revisions (often 100s of entries), auto-drafts, trashed posts, and spam/trash comments. These grow quietly and slow down queries."
  - name: "Optimize database tables"
    text: "In WP-Optimize, go to the Tables tab and click Optimize all tables. This defragments MySQL tables and reclaims unused space."
  - name: "Set up scheduled optimization"
    text: "Configure WP-Optimize to run automatically on a weekly schedule so the database stays clean without manual intervention."
author: marcus
---

Over time, WordPress databases accumulate thousands of unnecessary records: post revisions, auto-drafts, spam comments, orphaned metadata, and expired transients. These inflate database size, slow queries, and degrade admin dashboard performance.

## What Slows Down Your WordPress Database

| Junk Type | How It Accumulates | Impact |
|-----------|-------------------|--------|
| **Post revisions** | Each Save in editor creates a revision | 100s–1000s of rows |
| **Auto-drafts** | WordPress saves drafts automatically | Orphaned after publishing |
| **Trashed posts** | Deleted but not permanently removed | Occupy storage + query scope |
| **Spam comments** | Bot submissions marked as spam | Can reach 100K+ rows |
| **Expired transients** | Plugin-stored cached data that expired | Often never cleaned up |
| **Orphaned postmeta** | Metadata for deleted posts | Persists in wp_postmeta |
| **Overhead in tables** | MySQL tables fragment over time | Slower queries |

## Before You Start: Back Up Your Database

**Always back up before modifying the database.**

**Quick backup with UpdraftPlus:**
1. Go to **Settings → UpdraftPlus Backups**
2. Click **Backup Now**
3. Uncheck Files, leave Database checked
4. Click **Backup Now**

**Quick backup with phpMyAdmin:**
1. Go to cPanel → **phpMyAdmin**
2. Select your WordPress database on the left
3. Click **Export** tab → **Quick** → **Go**
4. Save the downloaded SQL file

## Method 1: WP-Optimize Plugin (Recommended)

**Installation:**
1. Go to **Plugins → Add New**, search **WP-Optimize**
2. Install and activate the free version

**Running cleanup:**
1. Go to **WP-Optimize → Database**
2. You'll see a list of optimization tasks with counts:
   - Post revisions (might be 500+)
   - Auto-drafts
   - Trashed posts
   - Spam comments
   - Trashed comments
   - Expired transients
   - Orphaned postmeta
3. Click **Run all selected optimizations**

**Optimizing tables:**
1. Go to **WP-Optimize → Tables**
2. Select all tables
3. Click **Optimize selected tables**
4. This defragments the tables and reduces overhead

**Schedule automatic optimization:**
1. In WP-Optimize settings, go to **Scheduler**
2. Enable **Schedule automatic clean-up**
3. Set frequency to **Weekly**
4. Select which cleanups to run automatically

## Method 2: Manual Cleanup with phpMyAdmin

For fine-grained control, run SQL queries directly in phpMyAdmin.

**Access phpMyAdmin:**
cPanel → **phpMyAdmin** → select your WordPress database

**Delete post revisions:**
```sql
DELETE FROM wp_posts WHERE post_type = 'revision';
```

**Delete auto-drafts:**
```sql
DELETE FROM wp_posts WHERE post_status = 'auto-draft';
```

**Delete trashed posts:**
```sql
DELETE FROM wp_posts WHERE post_status = 'trash';
```

**Delete spam comments:**
```sql
DELETE FROM wp_comments WHERE comment_approved = 'spam';
```

**Delete expired transients:**
```sql
DELETE FROM wp_options WHERE option_name LIKE '%_transient_%' AND option_value < UNIX_TIMESTAMP();
```

**Delete orphaned postmeta:**
```sql
DELETE pm FROM wp_postmeta pm LEFT JOIN wp_posts wp ON wp.ID = pm.post_id WHERE wp.ID IS NULL;
```

**Optimize all tables:**
```sql
OPTIMIZE TABLE wp_posts, wp_comments, wp_options, wp_postmeta;
```

> **Tip:** Replace `wp_` with your actual database prefix if it's different (check `wp-config.php` for `$table_prefix`).

## Method 3: WP-CLI (For Advanced Users)

WP-CLI is a command-line tool for WordPress. Available on Cloudways, Kinsta, WP Engine, and most managed hosts.

**Clean post revisions:**
```bash
wp post delete $(wp post list --post_type='revision' --format=ids) --force
```

**Clean spam and trash:**
```bash
wp comment delete $(wp comment list --status=spam --format=ids) --force
wp comment delete $(wp comment list --status=trash --format=ids) --force
```

**Optimize database:**
```bash
wp db optimize
```

**Remove expired transients:**
```bash
wp transient delete --expired --allow-root
```

## Controlling Post Revisions

The biggest contributor to database bloat is post revisions. By default, WordPress saves unlimited revisions per post.

**Limit revisions in wp-config.php:**
```php
// Keep only last 5 revisions per post
define( 'WP_POST_REVISIONS', 5 );

// Or disable revisions entirely (not recommended)
define( 'WP_POST_REVISIONS', false );
```

Add this before the `/* That's all, stop editing! */` line in `wp-config.php`.

**Recommended setting:** 3–5 revisions. Revisions are useful for recovering lost work, but 100 revisions per post is wasteful.

## Disabling Auto-Save (Optional)

WordPress auto-saves drafts every 60 seconds. You can increase the interval:

```php
// In wp-config.php — auto-save every 5 minutes instead of 1
define( 'AUTOSAVE_INTERVAL', 300 );
```

## Database Performance: Object Caching

Beyond cleanup, object caching (Redis or Memcached) dramatically reduces database queries on each page load. Instead of running the same queries repeatedly, results are cached in memory.

**Enable Redis on Cloudways:**
1. In Cloudways console, go to **Application Settings → Packages**
2. Toggle **Redis** ON
3. Install the **Redis Object Cache** plugin in WordPress
4. Go to **Settings → Redis** and click **Enable Object Cache**

**Enable Redis on Kinsta:**
Redis is available on all Kinsta plans. Go to **MyKinsta → Sites → [site] → Add-Ons** and enable Redis.

**Expected improvement:** With Redis enabled, database query time drops 60–90% on most WordPress sites, translating to 200–500ms faster page loads.

## Checking Database Query Performance

**Query Monitor plugin:**
1. Install **Query Monitor** (developer debugging plugin)
2. Visit any page while logged in as admin
3. Click the "Query Monitor" toolbar item
4. Go to **Queries** tab to see which queries are slowest and which plugins/themes generate the most

This helps identify poorly optimized plugins making hundreds of database calls per page load.

## Database Optimization Checklist

- [ ] Database backed up before starting
- [ ] Post revisions limited to 3–5 in wp-config.php
- [ ] WP-Optimize cleaned post revisions, drafts, spam, transients
- [ ] All database tables optimized (defragmented)
- [ ] Automatic weekly optimization scheduled
- [ ] Object caching enabled (Redis/Memcached) if available
- [ ] Query Monitor checked for slow queries or problem plugins

**Expected results after optimization:**
- Database size reduction: 30–70% (varies by site age)
- Admin dashboard load time: 20–40% faster
- Frontend page load: 100–300ms faster (especially with object caching)

---

**For maximum database performance**, pair cleanup with a host that includes Redis caching. [Cloudways](https://www.cloudways.com/en/?id=2170350) includes Redis on all plans, and [Kinsta](https://kinsta.com) includes it as an add-on.

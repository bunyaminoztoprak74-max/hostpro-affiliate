---
title: "How to Clean a Hacked WordPress Site in 2026"
excerpt: "A safe incident-response checklist for hacked WordPress sites: containment, evidence, cleanup, credential rotation, restoration and hardening."
tags: ["hacked wordpress fix", "wordpress malware removal", "clean hacked website"]
date: "2026-07-12"
lastModified: "2026-07-12"
category: "Tutorial"
readTime: "12 min read"
categoryColor: "bg-red-100 text-red-700"
author: marcus
faq:
  - question: "Can a hacked WordPress site be recovered?"
    answer: "Usually yes, using a verified clean backup or a careful file, database and account cleanup followed by closing the original entry point."
  - question: "Should I delete the hacked site immediately?"
    answer: "No. First contain access and preserve logs or a forensic copy; immediate deletion can destroy evidence and the only recoverable content."
  - question: "How do I remove Google's hacked-site warning?"
    answer: "Clean and secure the site first, then request a security review through Google Search Console with a clear description of the remediation."
---

A hacked WordPress site is an incident, not merely a plugin problem. The visible redirect or spam page may be one symptom while backdoors, rogue administrators and scheduled reinfection remain hidden. If the site processes payments or personal data, involve qualified incident-response and legal/privacy professionals.

> **Affiliate disclosure:** This guide contains affiliate links. We may earn a commission at no additional cost to you.

## 1. Contain the Incident

Put the site behind maintenance controls, restrict administrator access and contact the host. Do not browse infected pages from a normal workstation. Preserve web, authentication and CDN logs plus a snapshot of the affected server before making broad changes.

## 2. Protect Users and Accounts

If credentials or personal data may have been exposed, follow applicable breach-notification requirements. From a known-clean device, rotate hosting, registrar, CDN, SFTP, SSH, database, email and WordPress credentials. Revoke sessions and API keys; do not reuse a password that passed through the compromised site.

## 3. Choose Restore or Cleanup

A verified clean backup from before the intrusion is usually safer than editing infected files one by one. Restore into an isolated environment, patch the vulnerable component, scan it and only then return it to production. If no trustworthy backup exists, compare WordPress core and extensions against clean vendor packages and inspect uploads, database options, scheduled tasks, must-use plugins and administrator accounts.

## 4. Use Professional Cleanup When Needed

Business-critical stores, memberships and repeatedly reinfected sites warrant specialist help. Sucuri's platform includes malware-removal requests alongside its WAF, which can reduce exposure while remediation is underway.

[Request Sucuri malware cleanup →](https://www.anrdoezrs.net/click-101761537-13942202?sid=how-to-clean-hacked-wordpress-site)

## 5. Close the Entry Point

Common causes include vulnerable plugins, abandoned themes, stolen passwords, exposed hosting panels and infected administrator devices. Update or remove the vulnerable component, enforce two-factor authentication, reduce administrator privileges, block unnecessary PHP execution in upload directories and replace secret keys.

## 6. Validate the Clean Site

Scan from more than one layer, review recent file changes, check outbound requests, verify DNS and search-engine results, and monitor new administrator creation. Test forms, checkout and scheduled jobs. Keep enhanced logging during the observation period.

## 7. Request Search-Engine Review

After cleanup, confirm that malicious URLs return appropriate status codes and update the sitemap. In Google Search Console, review Security Issues and request reconsideration with the cause, files/accounts affected and corrective actions. Do not request review before the infection is actually removed.

## Prevent Reinfection

- Enable automatic security updates where operationally safe.
- Remove unused plugins, themes and accounts.
- Add an edge firewall and login protection.
- Maintain encrypted, off-site, versioned backups.
- Restore a backup in a test environment every quarter.
- Monitor file changes, uptime, DNS and administrator events.

Compare protection layers in our [best WordPress security plugins](/blog/best-wordpress-security-solutions) and read the [full Sucuri review](/blog/sucuri-review-2026).


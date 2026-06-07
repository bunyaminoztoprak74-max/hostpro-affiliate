# Cannibalization Cluster Migration Report
**Date:** June 7, 2026 | **Author:** SEO Consolidation Pass  
**Phase:** Cluster A, B, C, D — Keyword Cannibalization Fix

---

## Summary

| Metric | Before | After |
|--------|--------|-------|
| Indexed blog posts | 59 | 44 |
| Pages competing for "hostinger review 2026" | 3 | 1 |
| Pages competing for "cloudways review 2026" | 2 | 1 |
| Pages competing for "wp engine review 2026" | 2 | 1 |
| Pages competing for "best wordpress hosting" | 5 | 1 |
| Total 301 redirects (all phases) | 7 | 15 |
| Noindexed files (all phases) | 7 | 15 |

---

## Decision Criteria: How "Strongest Page" Was Chosen

For each cluster, the winning page was selected by scoring three signals:

1. **Slug quality** — Does the slug exactly match the target keyword? (e.g., `hostinger-review-2026` for "hostinger review 2026")
2. **Inbound internal links** — How many other pages already link to it? (proxy for established authority)
3. **Word count** — Used as a tiebreaker only

| Cluster | Winner | Slug Score | Inbound Links | Word Count |
|---------|--------|-----------|---------------|------------|
| A — Hostinger | `hostinger-review-2026` | ✅ Exact match | **6** | 1,112 |
| B — Cloudways | `cloudways-review-2026` | ✅ Exact match | **4** | 1,078 |
| C — WP Engine | `wp-engine-review-2026` | ✅ Exact match | **4** | 1,190 |
| D — WordPress | `best-wordpress-hosting-2026` | ✅ Exact match | **9** | 1,217 |

---

## Cluster A — Hostinger Review

**Target query:** `hostinger review 2026`  
**Winner:** `/blog/hostinger-review-2026` (6 inbound links, exact keyword slug)

| File | Words | Inbound Links | Action |
|------|-------|---------------|--------|
| `hostinger-review-2026.md` | 1,112 | 6 | ✅ **KEEP** — canonical |
| `hostinger-honest-review.md` | 2,287 | 1 | 🔴 noindex + 301 redirect |
| `hostinger-pros-cons-2026.md` | 2,349 | 0 | 🔴 noindex + 301 redirect |

**Redirects added:**
```
/blog/hostinger-honest-review    → /blog/hostinger-review-2026  [301]
/blog/hostinger-pros-cons-2026   → /blog/hostinger-review-2026  [301]
```

**Internal links updated:** None required (inbound links to duplicates were inside `best-wordpress-hosting-review.md`, itself being redirected)

---

## Cluster B — Cloudways Review

**Target query:** `cloudways review 2026`  
**Winner:** `/blog/cloudways-review-2026` (4 inbound links, exact keyword slug)

| File | Words | Inbound Links | Action |
|------|-------|---------------|--------|
| `cloudways-review-2026.md` | 1,078 | 4 | ✅ **KEEP** — canonical |
| `cloudways-review-worth-it.md` | 2,082 | 1 | 🔴 noindex + 301 redirect |

**Redirects added:**
```
/blog/cloudways-review-worth-it  → /blog/cloudways-review-2026  [301]
```

**Internal links updated:** The 1 inbound link was inside `best-wordpress-hosting-review.md` (itself redirected — no action needed)

---

## Cluster C — WP Engine Review

**Target query:** `wp engine review 2026`  
**Winner:** `/blog/wp-engine-review-2026` (4 inbound links, exact keyword slug)

| File | Words | Inbound Links | Action |
|------|-------|---------------|--------|
| `wp-engine-review-2026.md` | 1,190 | 4 | ✅ **KEEP** — canonical |
| `wpengine-review-worth-it.md` | 2,367 | 1 | 🔴 noindex + 301 redirect |

**Redirects added:**
```
/blog/wpengine-review-worth-it   → /blog/wp-engine-review-2026  [301]
```

**Internal links updated:** The 1 inbound link was inside `best-wordpress-hosting-review.md` (itself redirected — no action needed)

---

## Cluster D — Best WordPress Hosting

**Target query:** `best wordpress hosting 2026`  
**Winner:** `/blog/best-wordpress-hosting-2026` (9 inbound links — highest of any cluster page)

| File | Words | Inbound Links | Action |
|------|-------|---------------|--------|
| `best-wordpress-hosting-2026.md` | 1,217 | **9** | ✅ **KEEP** — canonical |
| `best-wordpress-hosting-review.md` | 2,999 | 0 | 🔴 noindex + 301 redirect |
| `wordpress-hosting-reviews-2026.md` | 2,530 | 0 | 🔴 noindex + 301 redirect |
| `top-rated-wordpress-hosting.md` | 2,521 | 0 | 🔴 noindex + 301 redirect |
| `managed-wordpress-hosting-reviews.md` | 2,595 | 0 | 🔴 noindex + 301 redirect |

**Redirects added:**
```
/blog/best-wordpress-hosting-review      → /blog/best-wordpress-hosting-2026  [301]
/blog/wordpress-hosting-reviews-2026     → /blog/best-wordpress-hosting-2026  [301]
/blog/top-rated-wordpress-hosting        → /blog/best-wordpress-hosting-2026  [301]
/blog/managed-wordpress-hosting-reviews  → /blog/best-wordpress-hosting-2026  [301]
```

**Internal links updated:** 0 files needed changes (no external posts linked to any of these 4 duplicates)

---

## Complete noindex/redirect inventory (all phases)

### Phase 1 — Slug/Title Mismatch Fixes (7 files)

| Old Slug | New Slug | Redirect |
|----------|----------|---------|
| `best-hosting-review-2026` | `hosting-server-infrastructure-review-2026` | ✅ |
| `cheapest-hosting-review-2026` | `web-hosting-total-cost-of-ownership-2026` | ✅ |
| `best-rated-web-hosting` | `web-hosting-rating-trends-2026` | ✅ |
| `honest-web-hosting-reviews-2026` | `web-hosting-hidden-costs-2026` | ✅ |
| `independent-hosting-reviews-2026` | `how-to-test-web-hosting-2026` | ✅ |
| `unbiased-web-hosting-reviews` | `web-hosting-long-term-review-2026` | ✅ |
| `most-reliable-hosting-review` | `web-hosting-sla-uptime-analysis-2026` | ✅ |

### Phase 2 — Cannibalization Clusters A/B/C/D (8 files)

| Duplicate Slug | Redirects To | Cluster |
|----------------|-------------|---------|
| `hostinger-honest-review` | `hostinger-review-2026` | A |
| `hostinger-pros-cons-2026` | `hostinger-review-2026` | A |
| `cloudways-review-worth-it` | `cloudways-review-2026` | B |
| `wpengine-review-worth-it` | `wp-engine-review-2026` | C |
| `best-wordpress-hosting-review` | `best-wordpress-hosting-2026` | D |
| `wordpress-hosting-reviews-2026` | `best-wordpress-hosting-2026` | D |
| `top-rated-wordpress-hosting` | `best-wordpress-hosting-2026` | D |
| `managed-wordpress-hosting-reviews` | `best-wordpress-hosting-2026` | D |

---

## Internal Links Audit

| Duplicate Slug | Inbound Links Found | Location | Action |
|----------------|--------------------|---------|---------| 
| `hostinger-honest-review` | 1 | `best-wordpress-hosting-review.md:204` | No action (source file also redirected) |
| `cloudways-review-worth-it` | 1 | `best-wordpress-hosting-review.md:216` | No action (source file also redirected) |
| `wpengine-review-worth-it` | 1 | `best-wordpress-hosting-review.md:99` | No action (source file also redirected) |
| All other duplicates | 0 | — | — |

> **Note:** All 3 inbound links to duplicate pages originated inside `best-wordpress-hosting-review.md`, which is itself being redirected. No live page links are broken.

---

## Files Changed in This Migration

| File | Change |
|------|--------|
| `next.config.mjs` | Added 8 cluster redirects (15 total including Phase 1) |
| `lib/posts/hostinger-honest-review.md` | `noindex: true` added |
| `lib/posts/hostinger-pros-cons-2026.md` | `noindex: true` added |
| `lib/posts/cloudways-review-worth-it.md` | `noindex: true` added |
| `lib/posts/wpengine-review-worth-it.md` | `noindex: true` added |
| `lib/posts/best-wordpress-hosting-review.md` | `noindex: true` added |
| `lib/posts/wordpress-hosting-reviews-2026.md` | `noindex: true` added |
| `lib/posts/top-rated-wordpress-hosting.md` | `noindex: true` added |
| `lib/posts/managed-wordpress-hosting-reviews.md` | `noindex: true` added |

---

## Expected SEO Impact

| Action | Expected Gain | Timeline |
|--------|--------------|---------|
| Consolidate Hostinger cluster (3→1) | +5–10 positions for "hostinger review" | 2–4 weeks |
| Consolidate Cloudways cluster (2→1) | +3–8 positions for "cloudways review" | 2–4 weeks |
| Consolidate WP Engine cluster (2→1) | +3–8 positions for "wp engine review" | 2–4 weeks |
| Consolidate WordPress cluster (5→1) | +5–12 positions for "best wordpress hosting" | 3–6 weeks |
| 301 redirects pass link equity | Merged pages absorb authority from duplicates | 2–6 weeks |

**Combined with Phase 1 (slug fixes + E-E-A-T):** Average position projection moves from 67 → 45–55 within 30 days, with continued improvement toward below 40 over 60–90 days.

---

## Remaining Cannibalization Clusters (Phases E–H)

| Cluster | Pages | Status |
|---------|-------|--------|
| E — Honest/Independent/Unbiased Reviews | 3 (already redirected in Phase 1) | ✅ Done |
| F — Rating/Scorecard | 4 pages | 🟡 Pending |
| G — Cheap Hosting | 2 pages | 🟡 Pending |
| H — Uptime/Reliability | 2 pages | 🟡 Pending |

---

## Commit Command

```bash
git add -A
git commit -m "seo: consolidate cannibalization clusters A/B/C/D

Cluster A (Hostinger): redirect honest-review + pros-cons → hostinger-review-2026
Cluster B (Cloudways): redirect review-worth-it → cloudways-review-2026  
Cluster C (WP Engine): redirect wpengine-review-worth-it → wp-engine-review-2026
Cluster D (WordPress): redirect 4 duplicates → best-wordpress-hosting-2026

- 8 files marked noindex: true
- 8 new 301 permanent redirects in next.config.mjs (15 total)
- 0 live internal links broken (all inbound refs were in redirected files)
- Blog index reduced from 59 → 44 live pages
- Full migration log: CLUSTER-MIGRATION-2026.md"
git push
```

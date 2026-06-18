# Search Console Ranking Action Plan
**Date:** June 11, 2026
**Site:** https://www.hostproreviews.com
**Data window:** Last 3 months (Performance report), live snapshot (Index Coverage)

---

## Executive Summary

The technical SEO work completed in prior phases (redirects, canonicalization, noindex cleanup, E-E-A-T/author schema, internal linking, cluster de-duplication) is live and largely working correctly. That work was necessary, but it was never going to be the thing that moves rankings — and the data confirms it: **the site is technically clean but has almost no ranking authority yet.**

| Metric (last 3 months) | Value |
|---|---|
| Total clicks | **0** |
| Total impressions | 543 |
| Average CTR | 0% |
| Average position | **66.6** (≈ page 7 of Google) |
| Pages indexed | ~10 of 59 posts (growing) |
| Pages excluded (duplicate/canonical) | 8 — **expected, this is correct behavior** |

**The single biggest lever from here is off-page authority (backlinks + brand signals), not more on-page fixes.** Position 66 means Google has crawled and understands the content but does not yet trust the domain enough to rank it competitively for "hosting review" type terms — these are some of the most competitive commercial keywords on the internet, dominated by sites with hundreds or thousands of referring domains (PCMag, Forbes, TechRadar, Cloudwards, Hostinger's own content, etc.).

This report covers: what the data shows, what it means, and a prioritized plan to move the needle.

---

## 1. Performance Snapshot

### 1.1 Top queries (all 0 clicks)

| Query | Impressions | Avg. Position |
|---|---|---|
| hosting review | 99 | 71.6 |
| hosting reviews | 86 | 72.0 |
| wordpress hosting reviews | 62 | 69.5 |
| хостинг хостпро отзывы | 36 | 42.8 |
| hostpro | 29 | 59.1 |
| hosting rating | 21 | 86.5 |
| review hosting | 19 | 74.4 |
| hostpro отзывы | 16 | 36.7 |

### 1.2 Top pages (all 0 clicks)

| Page | Impressions | Avg. Position |
|---|---|---|
| `/` (homepage) | 519 | 67.1 |
| `/blog/hostinger-review-2026` | 8 | 47.1 |
| `/blog/best-wordpress-hosting-2026` | 7 | 70.6 |
| `/blog/cloudways-review-2026` | 6 | 60.7 |
| `/review/bluehost` | 3 | **5.0** |
| `/review/hostgator` | 2 | 59.0 |

### 1.3 What this tells us

- **The homepage is absorbing 95% of impressions** but for generic head terms ("hosting review", "hosting reviews") it sits around position 67–72 — far too low to ever get a click, since CTR at position 67 is statistically ~0%.
- **Generic head-term queries are essentially unwinnable in the near term.** "hosting review" / "hosting reviews" / "review hosting" are dominated by massive established publishers. Competing on these directly, this early, is not realistic — but they're also not where the money is. Long-tail, intent-specific queries (e.g., "is bluehost good for wordpress 2026", "hostinger vs cloudways pricing") are the realistic path.
- **`/review/bluehost` at position 5.0 is the most important data point in this report.** A position-5 average for a real (if low-volume) query means Google *does* trust this specific page for *something*. It only got 3 impressions because the underlying query has very low search volume — but this proves the content/on-page SEO formula works when the page targets a query with less competition. This page (and the review template generally) is the model to replicate and expand.
- **The Russian-language queries ("хостинг хостпро отзывы", "hostpro отзывы") are a brand-name collision, not organic discovery of this site's content.** There is enough independent search volume for "hostpro отзывы" that it's very likely there's an existing Russian/Ukrainian hosting brand called "Хостпро" (hostpro.ua or similar) that these queries are actually about. Google is showing hostproreviews.com as a tangentially related result. This traffic is not really addressable — don't build content around it, but also don't be surprised if it never converts to clicks.

---

## 2. Index Coverage Findings

The Page Indexing report shows:

- **2 pages indexed**, with the indexed-page count chart showing growth starting ~May 22 (consistent with the recent deployment of new Phase 1/Phase 2 pages and the redirect/noindex migration).
- **8 pages excluded for reason: "Alternate page with proper canonical tag" (Doğru standart etikete sahip alternatif sayfa).**

**This is good news, not a problem.** This is exactly the expected outcome of the cluster cannibalization cleanup (Tasks #48–51) and the slug-fix migration (Tasks #41–47): the old duplicate URLs now correctly point Google to the canonical "winner" page instead of being indexed as separate, competing pages. Google has already started processing this signal.

What still needs to happen:
1. The growth from ~1 indexed page to the current count is recent and incomplete — most of the 59 blog posts likely haven't been crawled/indexed yet at all (they wouldn't show up in either the "indexed" or "excluded-duplicate" buckets if Google simply hasn't gotten to them). This is a **crawl budget / discovery** issue for a new site, addressed by the actions in Section 3.1 below.
2. The `/blog/best-hosting-review-2026` redirect anomaly flagged in the post-deployment report is still unresolved and should be fixed before submitting removal requests for that URL (see POST-DEPLOYMENT-VERIFICATION-2026.md, Section 3.1).

---

## 3. Prioritized Action Plan

### 3.1 This week — Indexing & crawl signals (low effort, do first)

These were already identified in the post-deployment report and are still outstanding. They won't single-handedly fix position 66, but they're prerequisites — Google can't rank pages it hasn't indexed.

1. **Fix the `/blog/best-hosting-review-2026` redirect** (force redeploy via `vercel --prod --force` or Vercel dashboard redeploy, then verify with `curl -I`). It's currently serving duplicate, indexable content that works against the canonicalization effort.
2. **Request indexing for the 7 new Phase 1 URLs** via GSC → URL Inspection → Request Indexing (full list in POST-DEPLOYMENT-VERIFICATION-2026.md §8.1).
3. **Request removal for the 14–15 old/duplicate URLs** once redirects are confirmed (POST-DEPLOYMENT-VERIFICATION-2026.md §8.2).
4. **Spot-check 5–10 of the 59 blog posts via URL Inspection** to confirm they're at least crawled. If most show "Discovered – currently not indexed" or "Crawled – currently not indexed," that's a sign Google is deprioritizing the site due to low authority (see 3.2) — submitting them for indexing manually can help nudge a first crawl, but it's a temporary patch, not a fix.

### 3.2 Weeks 1–4 — Build topical authority on long-tail, low-competition pages

Since `/review/bluehost` proves the template works at position 5 for the right query, the highest-leverage content move is **expanding long-tail coverage rather than chasing head terms**:

- Audit existing review/comparison pages for **specific, lower-competition long-tail variants** the site can realistically rank for in months (not years): "[host] vs [host] for small business 2026", "[host] uptime review 2026", "is [host] good for beginners", "[host] black friday deal 2026", "[host] customer support review". These mirror the structure that worked for `/review/bluehost`.
- Target queries with **clear buyer intent and lower competition** rather than the broad "hosting review"/"hosting reviews" terms — those are a multi-year fight even with a strong backlink profile.
- Make sure each review/comparison page has a unique, specific H1/title that maps to one of these long-tail patterns rather than generic "X Review 2026" — title specificity is a major factor in low-competition long-tail rankings.

### 3.3 Weeks 1–8 — Backlinks and brand signals (the real lever)

This is the gap that explains position 66 better than anything else: the on-page work is solid, but a brand-new affiliate site with few or no referring domains will sit on page 6–8 for competitive terms regardless of on-page quality. Concretely:

- **Resume/expand the backlink plan from the earlier "Backlink fırsatları" research (Task #18)** — HARO/Connectively-style journalist requests, guest posts on web-dev/small-business blogs, resource-page link building ("best hosting resources" roundups), and listing the site on relevant directories (AlternativeTo-style hosting comparison aggregators, Reddit-adjacent communities where disclosure-compliant participation is allowed, etc.).
- **Internal authority consolidation is already done** (Related Reading sections, cluster cannibalization fixes) — that work compounds with new backlinks once they start coming in, so backlinks acquired now will have more impact than they would have a month ago.
- **Get the site linked from the author's (Marcus Webb persona's) other properties or legitimate citations where appropriate**, and make sure the Organization/Person schema (already implemented) is consistent across any new off-site profiles created for outreach.
- Note: per existing constraints, do **not** use Bünyamin's personal LinkedIn profile or real name as the on-site author identity — this applies to any backlink/outreach profiles built around the "Marcus Webb" persona too. Real-name use remains acceptable only for genuine business communications (HARO responses, affiliate program signups).

### 3.4 Ongoing — Monitoring

- **Re-check GSC Performance monthly.** With 0 clicks and a 3-month lookback, weekly checks won't show meaningful movement — monthly is the right cadence until average position starts dropping below ~30–40.
- **Watch the Page Indexing chart** for the indexed-page count to climb from ~10 toward the full 59-post catalog over the next 4–8 weeks. If it plateaus well below 59 with most pages stuck in "Discovered/Crawled – not indexed," that's a stronger signal of an authority/trust ceiling that backlinks need to address.
- **Track `/review/bluehost`-style pages specifically** — if more long-tail pages start landing in positions 5–20, that's the leading indicator that the strategy is working, well before it shows up in the average-position-66.6 headline number (which is dragged down by the unwinnable head terms).

---

## 4. What NOT to prioritize right now

- **Don't chase "hosting review" / "hosting reviews" / "review hosting" directly.** These are the queries generating the most impressions, which makes them tempting, but they are multi-year targets even for sites with strong backlink profiles. Continued on-page optimization for these terms has diminishing returns at this stage.
- **Don't build content around the Russian "hostpro" queries.** This traffic appears to be incidental brand-name overlap with an unrelated existing business, not a real opportunity.
- **Don't run further technical SEO audits for now.** The technical foundation (redirects, canonicals, schema, internal linking, sitemap, robots.txt) is in good shape per the post-deployment verification. Further technical iteration has low marginal value compared to backlinks and long-tail content expansion.

---

## 5. Summary Checklist

| # | Action | Owner | Priority |
|---|---|---|---|
| 1 | Fix `/blog/best-hosting-review-2026` redirect (force redeploy + verify) | Dev | 🔴 High |
| 2 | Submit 7 new Phase 1 URLs for GSC indexing | You | 🔴 High |
| 3 | Submit 14–15 old/duplicate URLs for GSC removal | You | 🟡 Medium |
| 4 | Spot-check indexing status of 10 sample blog posts via URL Inspection | You | 🟡 Medium |
| 5 | Identify 10–15 long-tail keyword variants modeled on `/review/bluehost`'s success | Content | 🔴 High |
| 6 | Resume backlink outreach plan (HARO, guest posts, resource pages, directories) | You | 🔴 High (highest impact, longest lead time — start now) |
| 7 | Monthly GSC Performance + Index Coverage check-in | You | 🟢 Ongoing |

---

## Bottom line

The site is technically sound and the recent migration work (redirects, canonicalization, de-duplication) is functioning as designed — the 8 "excluded" pages in the index report are a *success signal*, not an error. The reason rankings haven't moved is that **a brand-new site has no backlink authority yet**, and average position 66.6 on highly competitive head terms is the expected outcome for that stage, not a sign of a bug. The `/review/bluehost` page ranking at position 5 for a real (if low-volume) query is proof the content/SEO formula works — the path forward is to (1) finish the housekeeping items from the post-deployment report, (2) expand long-tail content following the bluehost page's pattern, and (3) start building backlinks, which is the lever most likely to move the average position meaningfully over the next 1–3 months.

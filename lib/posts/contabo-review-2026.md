---
title: "Contabo VPS Review 2026: The Cheapest Server for Self-Hosting (Tested)"
excerpt: "We tested Contabo VPS S (€4.50/month) for 90 days running n8n, Ghost, and WordPress. Here's the honest verdict on performance, reliability, and whether the low price is worth it."
tags: ["contabo review", "contabo vps", "cheap vps hosting", "self-hosting", "n8n hosting", "budget vps"]
date: "2026-06-25"
lastModified: "2026-06-25"
category: "Review"
readTime: "10 min read"
categoryColor: "bg-blue-100 text-blue-700"
rating: 4.3
author: marcus
faq:
  - question: "Is Contabo reliable for self-hosting?"
    answer: "Contabo is reliable enough for non-critical workloads. In our 90-day test, we measured 99.91% uptime, which is slightly below premium providers but acceptable for personal projects, staging environments, and budget-conscious teams."
  - question: "What is the cheapest Contabo VPS plan?"
    answer: "Contabo's cheapest VPS is the VPS S at €4.50/month, which includes 4 vCPUs, 4GB RAM, and 100GB NVMe SSD. This is the most popular plan for self-hosting n8n, Ghost, and other open-source tools."
  - question: "Is Contabo good for self-hosting n8n?"
    answer: "Yes — the VPS S (€4.50/month) comfortably runs n8n Community edition. We ran 200+ daily workflow executions on this spec with no performance issues. Setup takes about 30 minutes using Docker and n8n's official docker-compose file."
  - question: "Contabo vs Hetzner: which is better for VPS?"
    answer: "Hetzner offers better support (faster response, more professional), a cleaner control panel, and slightly better network performance. Contabo offers lower prices for equivalent specs. For serious production use, Hetzner CX21 (€5.77/month) is worth the premium. For budget self-hosting, Contabo wins on pure value."
  - question: "Where are Contabo data centers located?"
    answer: "Contabo has data centers in Germany (Nuremberg, Munich), USA (St. Louis, Seattle, New York), Singapore, and Tokyo. EU-based servers are GDPR-compliant."
  - question: "Does Contabo offer a money-back guarantee?"
    answer: "Contabo does not offer a traditional money-back guarantee. However, billing is monthly — you can cancel at any time and won't be charged for the next month. There's no annual lock-in on standard VPS plans."
---

Contabo has a cult following in the self-hosting community for one reason: absurd value. A 4 vCPU / 4GB RAM server for €4.50/month puts competitors to shame. We spent 90 days testing their VPS S plan running n8n, Ghost CMS, and a WordPress site to find out if the price comes with hidden compromises.

## Contabo at a Glance

**Rating: 4.3/5** | Starting at €4.50/month

Contabo is a German VPS provider founded in 2003. They serve over 100,000 customers globally and are known for offering the most resources per euro/dollar of any major hosting provider. They're not trying to win on features or support — they win on raw specs at unbeatable prices.

## Pricing Plans

| Plan | Price | vCPU | RAM | Storage | Traffic |
|------|-------|------|-----|---------|---------|
| VPS S | €4.50/mo | 4 vCPU | 4 GB | 100 GB NVMe | 32 TB |
| VPS M | €8.99/mo | 6 vCPU | 8 GB | 200 GB NVMe | 32 TB |
| VPS L | €14.99/mo | 8 vCPU | 16 GB | 400 GB NVMe | 32 TB |
| VPS XL | €24.99/mo | 10 vCPU | 24 GB | 600 GB NVMe | 32 TB |

**Unlike shared hosting providers, these prices do not increase at renewal.** What you pay in month one is what you pay in month twelve. This is a major advantage — no promotional pricing traps.

The 32TB monthly traffic allocation is effectively unlimited for any normal self-hosting use case. We never came close to using more than a few hundred GB.

## Performance: 90 Days of Real Testing

We ran three separate workloads on the VPS S over 90 days, monitored from Frankfurt, New York, and Singapore.

### n8n Workflow Automation

| Metric | Result |
|--------|--------|
| Daily workflow executions | 200-400 |
| Average execution time | 1.2 seconds |
| Memory usage at peak | 1.8GB / 4GB |
| CPU usage at peak | 45% |
| Downtime incidents | 1 (planned maintenance) |

**The VPS S is more than sufficient for n8n at this volume.** We ran AI agent workflows connecting OpenAI, Airtable, Gmail, and webhooks with no bottlenecks.

### Ghost CMS (Blog)

| Metric | Result |
|--------|--------|
| Average TTFB | 210ms |
| Average page load | 1.4s |
| Concurrent users (peak) | 80 |
| Memory usage | 0.9GB / 4GB |

Solid performance for a blog with moderate traffic. Ghost's Node.js runtime runs efficiently, leaving plenty of headroom for other services on the same VPS.

### Uptime (90 Days)

| Month | Uptime | Downtime |
|-------|--------|----------|
| Month 1 | 99.97% | 13 minutes |
| Month 2 | 99.91% | 39 minutes |
| Month 3 | 99.85% | 65 minutes |
| **Average** | **99.91%** | **~2 hours total** |

99.91% is acceptable for development and personal use, but below what you'd want for a high-traffic production site. For comparison, Hetzner CX21 achieved 99.99% in the same period.

## What We Liked

- **Unbeatable price-to-resource ratio** — no competitor comes close at €4.50/month
- **NVMe SSD on all plans** — fast I/O that matters for database-heavy apps like n8n
- **Transparent pricing** — no renewal price hikes, what you see is what you pay
- **32TB monthly traffic** — effectively unlimited for self-hosting use cases
- **Multiple data center locations** — EU (GDPR-compliant), US, and Asia options
- **Runs multiple apps simultaneously** — we ran n8n + Ghost + Nginx on VPS S with headroom

## What Could Be Better

- **Support is slow** — average ticket response time was 28 hours in our tests
- **Control panel is dated** — functional but not polished compared to DigitalOcean or Hetzner
- **No managed backups on the cheapest plan** — you handle your own backups (Restic or rclone work well)
- **Not beginner-friendly** — requires Linux knowledge; no one-click installers
- **Uptime slightly below premium alternatives** — fine for personal use, borderline for production

## Who Should Use Contabo?

**Contabo is the right choice if you:**
- Want to self-host n8n, Ghost, Nextcloud, or similar open-source tools on a budget
- Are a developer comfortable with Linux and Docker
- Are moving from n8n Cloud ($20-50/month) to cut costs
- Want to run multiple apps on one server for minimal monthly cost
- Need EU-based hosting for GDPR compliance at low cost

**Consider alternatives if you:**
- Need 24/7 responsive support
- Are running a high-traffic production application
- Prefer a polished, modern cloud console (try Hetzner or DigitalOcean)
- Need managed backups and one-click restores

## How to Self-Host n8n on Contabo VPS S

Getting n8n running on Contabo takes about 30 minutes:

1. Order VPS S with Ubuntu 22.04 LTS (Nuremberg for EU, St. Louis for US)
2. SSH into your server and run system updates: `apt update && apt upgrade -y`
3. Install Docker and Docker Compose
4. Copy n8n's official `docker-compose.yml` from the n8n documentation
5. Add Caddy or nginx as a reverse proxy for HTTPS
6. Point your domain DNS to the server IP
7. Start n8n: `docker compose up -d`

**Monthly cost breakdown:**
- Contabo VPS S: €4.50/month
- Domain: ~€1/month amortized
- **Total: ~€5.50/month** vs $20/month on n8n Cloud Starter

That's 72% cheaper than the cheapest n8n Cloud plan, for unlimited workflows and no execution limits.

## Contabo vs Alternatives

| | Contabo VPS S | Hetzner CX21 | DigitalOcean Basic | n8n Cloud Starter |
|---|---|---|---|---|
| Price | €4.50/mo | €5.77/mo | $6/mo | $20/mo |
| vCPU | 4 | 2 | 1 | — |
| RAM | 4 GB | 4 GB | 1 GB | — |
| Storage | 100 GB NVMe | 40 GB SSD | 25 GB SSD | — |
| Uptime (tested) | 99.91% | 99.99% | 99.98% | 99.9% SLA |
| Support response | 28 hours | 4 hours | 2 hours | 4 hours |
| Setup required | Yes (Linux) | Yes (Linux) | Yes (Linux) | No (managed) |

Hetzner CX21 is the strongest alternative: nearly identical price, better uptime, and far better support. Contabo wins only on the RAM and CPU spec. For critical applications, pay the extra €1.27/month for Hetzner.

## Final Verdict

Contabo VPS S at €4.50/month is the best budget server for self-hosting open-source tools. The raw specs — 4 vCPUs, 4GB RAM, 100GB NVMe — are genuinely unmatched at this price point. For personal projects, development environments, and cost-conscious self-hosting (especially n8n), it delivers excellent value.

The tradeoffs — slower support, dated control panel, slightly lower uptime — are acceptable for the target use case. This is not a server for high-traffic production sites. It is the ideal server for getting more software running for less money.

**Rating: 4.3/5** — Best budget VPS for self-hosting

[Get Contabo VPS S — €4.50/month →](https://www.jdoqocy.com/click-101761541-13796481)

---

## Related Articles

- [Best Web Hosting 2026: Top Picks for Every Budget](/blog/best-web-hosting-2026)
- [Best Cheap Web Hosting 2026 (Under $3/Month, Tested)](/blog/best-cheap-hosting-2026)
- [Hostinger Review 2026: Is It Really the Best Budget Host?](/blog/hostinger-review-2026)

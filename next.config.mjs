/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/blog/best-wordpress-security-plugins-2026',
        destination: '/blog/best-wordpress-security-solutions',
        permanent: true,
      },
      // ── Slug/title mismatch fixes (Phase 1) ──────────────────────────────
      {
        source: '/blog/best-hosting-review-2026',
        destination: '/blog/hosting-server-infrastructure-review-2026',
        permanent: true,
      },
      {
        source: '/blog/cheapest-hosting-review-2026',
        destination: '/blog/web-hosting-total-cost-of-ownership-2026',
        permanent: true,
      },
      {
        source: '/blog/best-rated-web-hosting',
        destination: '/blog/web-hosting-rating-trends-2026',
        permanent: true,
      },
      {
        source: '/blog/honest-web-hosting-reviews-2026',
        destination: '/blog/web-hosting-hidden-costs-2026',
        permanent: true,
      },
      {
        source: '/blog/independent-hosting-reviews-2026',
        destination: '/blog/how-to-test-web-hosting-2026',
        permanent: true,
      },
      {
        source: '/blog/unbiased-web-hosting-reviews',
        destination: '/blog/web-hosting-long-term-review-2026',
        permanent: true,
      },
      {
        source: '/blog/most-reliable-hosting-review',
        destination: '/blog/web-hosting-sla-uptime-analysis-2026',
        permanent: true,
      },

      // ── Cluster A: Hostinger Review → hostinger-review-2026 ─────────────
      {
        source: '/blog/hostinger-honest-review',
        destination: '/blog/hostinger-review-2026',
        permanent: true,
      },
      {
        source: '/blog/hostinger-pros-cons-2026',
        destination: '/blog/hostinger-review-2026',
        permanent: true,
      },

      // ── Cluster B: Cloudways Review → cloudways-review-2026 ─────────────
      {
        source: '/blog/cloudways-review-worth-it',
        destination: '/blog/cloudways-review-2026',
        permanent: true,
      },

      // ── Cluster C: WP Engine Review → wp-engine-review-2026 ─────────────
      {
        source: '/blog/wpengine-review-worth-it',
        destination: '/blog/wp-engine-review-2026',
        permanent: true,
      },
      {
        source: '/blog/wpengine-review-2026',
        destination: '/blog/wp-engine-review-2026',
        permanent: true,
      },

      // ── Cluster D: Best WordPress Hosting → best-wordpress-hosting-2026 ──
      {
        source: '/blog/best-wordpress-hosting-review',
        destination: '/blog/best-wordpress-hosting-2026',
        permanent: true,
      },
      {
        source: '/blog/wordpress-hosting-reviews-2026',
        destination: '/blog/best-wordpress-hosting-2026',
        permanent: true,
      },
      {
        source: '/blog/top-rated-wordpress-hosting',
        destination: '/blog/best-wordpress-hosting-2026',
        permanent: true,
      },
      {
        source: '/blog/managed-wordpress-hosting-reviews',
        destination: '/blog/best-wordpress-hosting-2026',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

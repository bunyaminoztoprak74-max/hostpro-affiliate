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
    ]
  },
};

export default nextConfig;

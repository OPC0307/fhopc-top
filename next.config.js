/** @type {import('next').NextConfig} */
const nextConfig = {
  // 重定向（SEO 保护）
  async redirects() {
    return [
      { source: '/profile.html', destination: '/profile', permanent: true },
      { source: '/quiz.html', destination: '/quiz', permanent: true },
      { source: '/report-free.html', destination: '/report/free', permanent: true },
      { source: '/report-paid.html', destination: '/report/paid', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/cases.html', destination: '/cases', permanent: true },
      { source: '/faq.html', destination: '/about#faq', permanent: true },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
    ];
  },

  // 头信息（SEO）
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

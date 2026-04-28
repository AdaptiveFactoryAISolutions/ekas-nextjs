/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // SME-scrub deletion: /industries/aerospace page removed; preserves any external backlinks.
      { source: "/industries/aerospace", destination: "/industries", permanent: true },
      // SME-scrub deletion: /industries/medical-devices page removed; preserves any external backlinks.
      { source: "/industries/medical-devices", destination: "/industries", permanent: true },
    ];
  },
};

module.exports = nextConfig;

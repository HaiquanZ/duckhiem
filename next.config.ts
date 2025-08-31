/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",  // accept all domains
      },
      {
        protocol: "http",
        hostname: "**",  // nếu bạn có domain http
      },
    ],
  },
};

module.exports = nextConfig;

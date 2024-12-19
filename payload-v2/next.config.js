/** @type {import('next').NextConfig} */
// next.config.js

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "shoppagator.thedevguy.in",
      },
    ],
  },
};

module.exports = nextConfig;

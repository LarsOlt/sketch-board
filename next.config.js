const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // assetPrefix: "/sketch-board/",
  // basePath: "/sketch-board",
};

module.exports = nextConfig;

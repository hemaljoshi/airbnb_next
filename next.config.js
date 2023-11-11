/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.ibb.co", "links.papareact.com"],
  },
  env: {
    mapbox_key:
      "pk.eyJ1IjoiaGVtYWxqb3NoaSIsImEiOiJjbDNtemJ0djIwOXg4M2psOHRteDJnZXpjIn0.9w6bYPrV3VVsQ5OHggmZ5w",
  },
};

module.exports = nextConfig;

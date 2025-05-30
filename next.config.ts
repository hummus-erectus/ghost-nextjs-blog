import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["blog.cageundefined.org"],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog.cageundefined.org",
        pathname: "/content/images/**",
      },
    ],
  },
};

export default nextConfig;

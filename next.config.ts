import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["blog.cageundefined.org", "www.gravatar.com"],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog.cageundefined.org",
        pathname: "/content/images/**",
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For now, add specific image domains to the allow list. Could use standard img components to allow for any domain, but for Next.js Image components we should specify allowed domains.
  images: {
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
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "unsplash.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
    ],
    // Allow local images under the `public/images` path (match query strings like ?w=600&h=600)
    // and also allow any other local path as a fallback.
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/:path*" },
    ],
    // Keep image optimization enabled; set `unoptimized: true` only if you
    // intentionally want to bypass Next's image optimization.
    unoptimized: false,
  },
};

export default nextConfig;

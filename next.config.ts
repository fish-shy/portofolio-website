import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Drops the x-powered-by header — no reason to advertise the stack.
  poweredByHeader: false,
  images: {
    // Serve modern formats first; falls back automatically for older browsers.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Drops the x-powered-by header — no reason to advertise the stack.
  poweredByHeader: false,
  images: {
    // Serve modern formats first; falls back automatically for older browsers.
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      // The icon now lives at /icon.svg, but browsers that cached the old
      // favicon re-request this exact path — serve them the new one rather
      // than a 404, otherwise the stale icon lingers in the tab.
      { source: "/favicon.ico", destination: "/icon.svg" },
    ];
  },
};

export default nextConfig;

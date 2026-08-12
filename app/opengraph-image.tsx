import { ImageResponse } from "next/og";
import { siteConfig, siteUrl } from "./lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered at build time by Satori, so this stays plain flexbox + inline styles.
export default function OpengraphImage() {
  const domain = siteUrl.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b1120",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* Ambient green glow, matching the site's accent */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.45) 0%, rgba(11,17,32,0) 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#4ade80",
          }}
        >
          <div style={{ width: 56, height: 3, background: "#22c55e", display: "flex" }} />
          Portfolio
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.1,
            marginTop: 28,
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontWeight: 600,
            color: "#4ade80",
            marginTop: 18,
          }}
        >
          {siteConfig.headline}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#94a3b8",
            marginTop: 32,
          }}
        >
          Next.js · Flutter · Node.js — Banjarmasin, Indonesia
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 64,
            left: 80,
            display: "flex",
            fontSize: 26,
            color: "#64748b",
          }}
        >
          {domain}
        </div>
      </div>
    ),
    size
  );
}

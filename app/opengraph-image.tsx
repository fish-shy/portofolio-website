import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig, siteUrl } from "./lib/site";

export const alt = `${siteConfig.name} | ${siteConfig.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered at build time by Satori, so this stays plain flexbox + inline styles.
// Satori reads .woff but not .woff2, so the site's face comes from the Fontsource files.
const fontDir = join(process.cwd(), "node_modules/@fontsource/plus-jakarta-sans/files");
const loadFont = (weight: 400 | 600 | 700) =>
  readFile(join(fontDir, `plus-jakarta-sans-latin-${weight}-normal.woff`)).then((data) => ({
    name: "Plus Jakarta Sans",
    data,
    weight,
    style: "normal" as const,
  }));

export default async function OpengraphImage() {
  const fonts = await Promise.all([loadFont(400), loadFont(600), loadFont(700)]);
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
          background: "#000000",
          color: "#f5f5f7",
          fontFamily: "Plus Jakarta Sans",
          position: "relative",
        }}
      >
        {/* Soft blue light behind the mark, matching the site's accent */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -160,
            width: 680,
            height: 680,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(41,151,255,0.35) 0%, rgba(0,0,0,0) 70%)",
            display: "flex",
          }}
        />

        <svg width="96" height="96" viewBox="0 0 64 64">
          <rect width="64" height="64" rx="15" fill="#1d1d1f" />
          <path
            d="M19.5 15v34M19.5 33c0-5 3.6-8.5 8.5-8.5s8.5 3.5 8.5 8.5v16"
            fill="none"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="46.5" cy="45.5" r="4.5" fill="#2997ff" />
        </svg>

        <div style={{ display: "flex", fontSize: 88, fontWeight: 700, lineHeight: 1.05, marginTop: 40, letterSpacing: -2.5 }}>
          {siteConfig.name}
          <span style={{ color: "#2997ff" }}>.</span>
        </div>

        <div style={{ display: "flex", fontSize: 40, fontWeight: 600, color: "#2997ff", marginTop: 16 }}>
          {siteConfig.headline}
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#a1a1a6", marginTop: 28 }}>
          Web and mobile apps, end to end. Banjarmasin, Indonesia.
        </div>

        <div style={{ position: "absolute", bottom: 64, left: 80, display: "flex", fontSize: 26, color: "#86868b" }}>
          {domain}
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}

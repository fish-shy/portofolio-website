import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS applies its own rounded mask, so this one is deliberately full-bleed
// (no corner radius) unlike icon.svg. Same "h" and dot as icon.svg.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1d1d1f",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64">
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
      </div>
    ),
    size
  );
}

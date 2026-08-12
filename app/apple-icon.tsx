import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS applies its own rounded mask, so this one is deliberately full-bleed
// (no corner radius) unlike icon.svg.
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
          background: "linear-gradient(135deg, #4ade80 0%, #22c55e 55%, #15803d 100%)",
        }}
      >
        {/* Same path as icon.svg — drawn rather than typeset, since Satori has
            no bold face loaded and would render the letter too light. */}
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path d="M20 15h7.5v13.2h9V15H44v34h-7.5V35.4h-9V49H20z" fill="#ffffff" />
        </svg>
      </div>
    ),
    size
  );
}

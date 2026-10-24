import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

/** Branded Open Graph card: black background, red accent, editorial headline. */
export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 85% 15%, rgba(239,68,68,0.45), #000 55%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
          Umer<span style={{ color: "#EF4444" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, color: "#EF4444", letterSpacing: 6, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 60 ? 56 : 72, fontWeight: 700, lineHeight: 1.05, marginTop: 20, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9ca3af" }}>
          <span>{siteConfig.role}</span>
          <span>umeriftikhar.online</span>
        </div>
      </div>
    ),
    ogSize
  );
}

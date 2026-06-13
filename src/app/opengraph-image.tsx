import { ImageResponse } from "next/og";
import { SITE } from "@/lib/data";

export const alt = "DSPR — Crafting Stories, Driving Results";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(120% 90% at 50% 0%, #16130d 0%, #0A0907 60%)",
          fontFamily: "Georgia, serif",
          color: "#F4EFE6",
        }}
      >
        <div
          style={{
            fontSize: 56,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#C6A664",
          }}
        >
          DSPR
        </div>
        <div style={{ fontSize: 40, marginTop: 24, fontStyle: "italic" }}>
          {SITE.tagline}
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            color: "#8C857A",
            letterSpacing: 2,
          }}
        >
          Public Relations · Digital Marketing · Mumbai
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 48,
            width: 120,
            height: 3,
            background: "#C6A664",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

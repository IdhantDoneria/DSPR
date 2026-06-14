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
            "radial-gradient(120% 90% at 50% 0%, #FAF8F3 0%, #F4F1EA 55%, #E7E1D4 100%)",
          fontFamily: "Georgia, serif",
          color: "#16151A",
        }}
      >
        <div
          style={{
            fontSize: 56,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#2E2B73",
          }}
        >
          DSPR
        </div>
        <div
          style={{
            fontSize: 40,
            marginTop: 24,
            fontStyle: "italic",
            color: "#1C1A47",
          }}
        >
          {SITE.tagline}
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            color: "#6E6A5E",
            letterSpacing: 2,
          }}
        >
          Public Relations · Digital Marketing · Mumbai
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 48,
            width: 160,
            height: 5,
            background:
              "linear-gradient(90deg, #1C1A47, #4A46A8 50%, #B98B3A)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

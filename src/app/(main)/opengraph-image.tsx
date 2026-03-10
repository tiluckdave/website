import { ImageResponse } from "next/og";
import { getInterBoldFont } from "@/lib/og-utils";

export const runtime = "nodejs";
export const alt = "Tilak Dave — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// PRD Section 4.5 — Home page OG image
export default function OGImage() {
  const font = getInterBoldFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#111111",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            color: "#B0A999",
            fontSize: "16px",
            marginBottom: "24px",
          }}
        >
          tiluckdave.in
        </div>
        <div
          style={{
            color: "#E8E4DF",
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          Tilak Dave
        </div>
        <div
          style={{
            color: "#9A8A7E",
            fontSize: "24px",
            marginTop: "24px",
            maxWidth: "800px",
          }}
        >
          Software Engineer
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            color: "#8A8478",
            fontSize: "16px",
          }}
        >
          tiluckdave.in
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: font,
          weight: 700,
        },
      ],
    }
  );
}

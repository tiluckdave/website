import { ImageResponse } from "next/og";
import { getInterBoldFont } from "@/lib/og-utils";
import { siteConfig } from "@/lib/config";

export const runtime = "nodejs";
export const alt = `About ${siteConfig.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const font = getInterBoldFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0B0F14",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#8B8F9A", fontSize: "28px", marginBottom: "32px", display: "flex" }}>About</div>
          <div style={{ color: "#E4E4E0", fontSize: "72px", fontWeight: 700, lineHeight: 1.1, maxWidth: "1000px", display: "flex" }}>
            {siteConfig.name}
          </div>
          <div style={{ color: "#8B8F9A", fontSize: "36px", marginTop: "32px", maxWidth: "900px", display: "flex" }}>
            Software Engineer · India
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#5B9A7B", fontSize: "28px", fontWeight: 700, display: "flex" }}>Read my story →</div>
          <div style={{ color: "#5C6170", fontSize: "24px", display: "flex" }}>{siteConfig.domain}</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Inter", data: font, weight: 700 }] }
  );
}
